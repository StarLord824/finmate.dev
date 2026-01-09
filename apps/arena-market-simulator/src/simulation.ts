import type { 
  SimulationConfig, 
  SimulationState, 
  AgentState,
  MarketSnapshot,
  SimulationTickEvent,
  SimulationStartedEvent,
  SimulationCompletedEvent,
  AgentTradeEvent,
} from '@repo/arena-types';
import { prisma } from '@repo/db';
import { v4 as uuidv4 } from 'uuid';
import { pino } from 'pino';
import { OrderBookEngine } from './orderBook';
import { DataLoader } from './dataLoader';
import { EventPublisher } from './events/publisher';

const logger = pino({ name: 'arena-simulation' });

export interface SimulationEngineConfig {
  simulationId: string;
  redisUrl: string;
}

export interface TradeRequest {
  agentId: string;
  action: 'buy' | 'sell';
  quantity: number;
  reasoning?: string;
}

/**
 * SimulationEngine orchestrates the market simulation
 * - Loads historical data and replays it
 * - Manages order book and price dynamics
 * - Tracks agent portfolios
 * - Publishes events for real-time updates
 */
export class SimulationEngine {
  private config!: SimulationConfig;
  private state!: SimulationState;
  private orderBook!: OrderBookEngine;
  private dataLoader!: DataLoader;
  private eventPublisher!: EventPublisher;
  private agentStates: Map<string, AgentState> = new Map();
  private isRunning: boolean = false;
  private isPaused: boolean = false;
  private tickTimer: NodeJS.Timeout | null = null;

  constructor(private engineConfig: SimulationEngineConfig) {}

  /**
   * Initialize the simulation from database
   */
  async initialize(simulationId: string): Promise<void> {
    const simulation = await prisma.arenaSimulation.findUnique({
      where: { id: simulationId },
      include: { 
        participants: { 
          include: { agent: true } 
        } 
      },
    });

    if (!simulation) {
      throw new Error(`Simulation ${simulationId} not found`);
    }

    // Build config from database
    this.config = {
      id: simulation.id,
      name: simulation.name,
      market: {
        symbol: simulation.market,
        type: simulation.marketType as 'crypto' | 'stock',
        interval: simulation.interval as '1m' | '5m' | '15m' | '1h' | '4h' | '1d',
      },
      startDate: simulation.startDate,
      endDate: simulation.endDate,
      initialBalance: simulation.initialBalance,
      agents: simulation.participants.map(p => ({
        id: p.agent.id,
        name: p.agent.name,
        model: p.agent.model,
        personality: p.agent.personality || undefined,
        strategy: p.agent.strategy || undefined,
      })),
      tickIntervalMs: simulation.tickIntervalMs,
      priceImpactFactor: simulation.priceImpact,
    };

    // Initialize data loader
    this.dataLoader = new DataLoader({
      symbol: this.config.market.symbol,
      type: this.config.market.type,
      interval: this.config.market.interval,
      startDate: this.config.startDate,
      endDate: this.config.endDate,
    });

    // Load historical data
    await this.dataLoader.loadData();

    // Get initial price
    const firstCandle = this.dataLoader.getCandleAt(0);
    if (!firstCandle) {
      throw new Error('No market data available');
    }

    // Initialize order book
    this.orderBook = new OrderBookEngine(firstCandle.open, this.config.priceImpactFactor);

    // Initialize agent states
    for (const agent of this.config.agents) {
      this.agentStates.set(agent.id, {
        agentId: agent.id,
        cash: this.config.initialBalance,
        positions: {},
        totalValue: this.config.initialBalance,
        pnl: 0,
        trades: 0,
      });
    }

    // Initialize state
    this.state = {
      id: this.config.id,
      status: 'pending',
      currentTime: this.config.startDate,
      market: {
        timestamp: this.config.startDate,
        symbol: this.config.market.symbol,
        price: firstCandle.open,
        change24h: 0,
        volume24h: 0,
      },
      agents: Object.fromEntries(this.agentStates),
      tickCount: 0,
    };

    // Initialize event publisher
    this.eventPublisher = new EventPublisher(
      this.engineConfig.redisUrl, 
      this.config.id
    );

    logger.info({ simulationId, agents: this.config.agents.length }, 'Simulation initialized');
  }

  /**
   * Start the simulation
   */
  async start(): Promise<void> {
    if (this.isRunning) {
      logger.warn('Simulation already running');
      return;
    }

    this.isRunning = true;
    this.state.status = 'running';
    this.state.startedAt = new Date();

    // Update database status
    await prisma.arenaSimulation.update({
      where: { id: this.config.id },
      data: { status: 'running', startedAt: new Date() },
    });

    // Publish start event
    const startEvent: SimulationStartedEvent = {
      id: uuidv4(),
      type: 'simulation:started',
      simulationId: this.config.id,
      timestamp: new Date(),
      config: {
        market: this.config.market.symbol,
        agents: this.config.agents.map(a => a.id),
        startDate: this.config.startDate,
        endDate: this.config.endDate,
      },
    };
    await this.eventPublisher.publish(startEvent);
    await this.eventPublisher.storeEvent(startEvent);

    logger.info({ simulationId: this.config.id }, 'Simulation started');

    // Start tick loop
    this.runTickLoop();
  }

  /**
   * Main simulation loop
   */
  private runTickLoop(): void {
    this.tickTimer = setInterval(async () => {
      if (this.isPaused) return;

      try {
        await this.tick();
      } catch (error) {
        logger.error({ error }, 'Tick error');
        await this.fail(String(error));
      }
    }, this.config.tickIntervalMs);
  }

  /**
   * Process one simulation tick
   */
  private async tick(): Promise<void> {
    // Get next candle
    const candle = this.dataLoader.getNextCandle();
    if (!candle) {
      // Simulation complete
      await this.complete();
      return;
    }

    this.state.tickCount++;
    this.state.currentTime = candle.timestamp;

    // Update order book with new price
    this.orderBook.updatePrice(candle.close);

    // Update market snapshot
    this.state.market = {
      timestamp: candle.timestamp,
      symbol: this.config.market.symbol,
      price: candle.close,
      change24h: 0, // Calculate if needed
      volume24h: candle.volume,
      lastCandle: candle,
      orderBook: this.orderBook.getOrderBook(),
    };

    // Update agent total values
    for (const [agentId, state] of this.agentStates) {
      const positionValue = Object.values(state.positions).reduce((sum, qty) => {
        return sum + qty * candle.close;
      }, 0);
      state.totalValue = state.cash + positionValue;
      state.pnl = state.totalValue - this.config.initialBalance;
    }

    // Save snapshot to database (every 10 ticks to reduce DB writes)
    if (this.state.tickCount % 10 === 0) {
      await this.saveSnapshot();
    }

    // Publish tick event
    const tickEvent: SimulationTickEvent = {
      id: uuidv4(),
      type: 'simulation:tick',
      simulationId: this.config.id,
      timestamp: new Date(),
      tick: this.state.tickCount,
      state: { ...this.state, agents: Object.fromEntries(this.agentStates) },
    };
    await this.eventPublisher.publish(tickEvent);

    logger.debug({ 
      tick: this.state.tickCount, 
      price: candle.close,
      progress: `${this.dataLoader.getCurrentIndex()}/${this.dataLoader.getTotalCandles()}`
    }, 'Tick processed');
  }

  /**
   * Execute a trade request from an agent
   */
  async executeTrade(request: TradeRequest): Promise<boolean> {
    const agentState = this.agentStates.get(request.agentId);
    if (!agentState) {
      logger.warn({ agentId: request.agentId }, 'Agent not found');
      return false;
    }

    const asset = this.config.market.symbol;
    let trade;

    if (request.action === 'buy') {
      // Check if agent has enough cash
      const estimatedCost = request.quantity * this.orderBook.getBestAsk();
      if (agentState.cash < estimatedCost) {
        logger.warn({ agentId: request.agentId, cash: agentState.cash, cost: estimatedCost }, 'Insufficient funds');
        return false;
      }

      trade = this.orderBook.executeBuy(request.quantity, request.agentId);
      if (trade) {
        const totalCost = trade.quantity * trade.price;
        agentState.cash -= totalCost;
        agentState.positions[asset] = (agentState.positions[asset] || 0) + trade.quantity;
      }
    } else {
      // Check if agent has enough position
      const position = agentState.positions[asset] || 0;
      if (position < request.quantity) {
        logger.warn({ agentId: request.agentId, position, requested: request.quantity }, 'Insufficient position');
        return false;
      }

      trade = this.orderBook.executeSell(request.quantity, request.agentId);
      if (trade) {
        const totalValue = trade.quantity * trade.price;
        agentState.cash += totalValue;
        agentState.positions[asset] = (agentState.positions[asset] || 0) - trade.quantity;
      }
    }

    if (!trade) {
      return false;
    }

    agentState.trades++;

    // Get participation ID for trade record
    const participation = await prisma.arenaParticipation.findFirst({
      where: {
        simulationId: this.config.id,
        agentId: request.agentId,
      },
    });

    if (participation) {
      // Save trade to database
      await prisma.arenaTrade.create({
        data: {
          simulationId: this.config.id,
          participationId: participation.id,
          timestamp: new Date(),
          action: request.action,
          asset,
          quantity: trade.quantity,
          price: trade.price,
          total: trade.quantity * trade.price,
          reasoning: request.reasoning,
        },
      });
    }

    // Publish trade event
    const tradeEvent: AgentTradeEvent = {
      id: uuidv4(),
      type: 'agent:trade',
      simulationId: this.config.id,
      timestamp: new Date(),
      agentId: request.agentId,
      trade,
      portfolioAfter: { ...agentState },
    };
    await this.eventPublisher.publish(tradeEvent);
    await this.eventPublisher.storeEvent(tradeEvent);

    logger.info({ 
      agentId: request.agentId, 
      action: request.action, 
      quantity: trade.quantity,
      price: trade.price 
    }, 'Trade executed');

    return true;
  }

  /**
   * Save current state snapshot
   */
  private async saveSnapshot(): Promise<void> {
    const portfolios: Record<string, { cash: number; positions: Record<string, number>; totalValue: number }> = {};
    for (const [agentId, state] of this.agentStates) {
      portfolios[agentId] = {
        cash: state.cash,
        positions: state.positions,
        totalValue: state.totalValue,
      };
    }

    await prisma.arenaSnapshot.create({
      data: {
        simulationId: this.config.id,
        timestamp: this.state.currentTime,
        tick: this.state.tickCount,
        price: this.state.market.price,
        data: {
          orderBook: this.orderBook.getOrderBook(),
          portfolios,
        },
      },
    });
  }

  /**
   * Pause the simulation
   */
  pause(): void {
    this.isPaused = true;
    this.state.status = 'paused';
    logger.info({ simulationId: this.config.id }, 'Simulation paused');
  }

  /**
   * Resume the simulation
   */
  resume(): void {
    this.isPaused = false;
    this.state.status = 'running';
    logger.info({ simulationId: this.config.id }, 'Simulation resumed');
  }

  /**
   * Stop the simulation
   */
  async stop(): Promise<void> {
    if (this.tickTimer) {
      clearInterval(this.tickTimer);
    }
    this.isRunning = false;
    await this.complete();
  }

  /**
   * Complete the simulation
   */
  private async complete(): Promise<void> {
    if (this.tickTimer) {
      clearInterval(this.tickTimer);
    }
    this.isRunning = false;
    this.state.status = 'completed';
    this.state.completedAt = new Date();

    // Calculate final rankings
    const rankings = Array.from(this.agentStates.values())
      .sort((a, b) => b.totalValue - a.totalValue)
      .map((state, index) => ({
        ...state,
        rank: index + 1,
        pnlPercent: ((state.totalValue - this.config.initialBalance) / this.config.initialBalance) * 100,
      }));

    // Update participation records
    for (const ranking of rankings) {
      await prisma.arenaParticipation.updateMany({
        where: {
          simulationId: this.config.id,
          agentId: ranking.agentId,
        },
        data: {
          finalBalance: ranking.totalValue,
          pnl: ranking.pnl,
          pnlPercent: ranking.pnlPercent,
          totalTrades: ranking.trades,
          rank: ranking.rank,
        },
      });

      // Update leaderboard
      await this.updateLeaderboard(ranking);
    }

    // Update simulation status
    await prisma.arenaSimulation.update({
      where: { id: this.config.id },
      data: { status: 'completed', completedAt: new Date() },
    });

    // Publish completion event
    const completedEvent: SimulationCompletedEvent = {
      id: uuidv4(),
      type: 'simulation:completed',
      simulationId: this.config.id,
      timestamp: new Date(),
      result: {
        rankings: rankings.map(r => ({
          agentId: r.agentId,
          pnl: r.pnl,
          rank: r.rank,
        })),
      },
    };
    await this.eventPublisher.publish(completedEvent);
    await this.eventPublisher.storeEvent(completedEvent);

    await this.eventPublisher.close();

    logger.info({ 
      simulationId: this.config.id, 
      winner: rankings[0]?.agentId,
      ticks: this.state.tickCount 
    }, 'Simulation completed');
  }

  /**
   * Update agent leaderboard stats
   */
  private async updateLeaderboard(
    ranking: AgentState & { rank: number; pnlPercent: number }
  ): Promise<void> {
    const existing = await prisma.arenaLeaderboard.findUnique({
      where: { agentId: ranking.agentId },
    });

    const agent = this.config.agents.find(a => a.id === ranking.agentId);

    if (existing) {
      const newTotalSims = existing.totalSimulations + 1;
      const newAvgPnl = (existing.avgPnl * existing.totalSimulations + ranking.pnl) / newTotalSims;
      const newAvgPnlPercent = (existing.avgPnlPercent * existing.totalSimulations + ranking.pnlPercent) / newTotalSims;

      await prisma.arenaLeaderboard.update({
        where: { agentId: ranking.agentId },
        data: {
          totalWins: ranking.rank === 1 ? existing.totalWins + 1 : existing.totalWins,
          totalSimulations: newTotalSims,
          avgPnl: newAvgPnl,
          avgPnlPercent: newAvgPnlPercent,
          bestPnl: Math.max(existing.bestPnl, ranking.pnl),
          worstPnl: Math.min(existing.worstPnl, ranking.pnl),
          lastUpdated: new Date(),
        },
      });
    } else {
      await prisma.arenaLeaderboard.create({
        data: {
          agentId: ranking.agentId,
          agentName: agent?.name || 'Unknown',
          totalWins: ranking.rank === 1 ? 1 : 0,
          totalSimulations: 1,
          avgPnl: ranking.pnl,
          avgPnlPercent: ranking.pnlPercent,
          bestPnl: ranking.pnl,
          worstPnl: ranking.pnl,
        },
      });
    }
  }

  /**
   * Handle simulation failure
   */
  private async fail(errorMessage: string): Promise<void> {
    if (this.tickTimer) {
      clearInterval(this.tickTimer);
    }
    this.isRunning = false;
    this.state.status = 'failed';

    await prisma.arenaSimulation.update({
      where: { id: this.config.id },
      data: { status: 'failed', errorMessage },
    });

    await this.eventPublisher.close();

    logger.error({ simulationId: this.config.id, error: errorMessage }, 'Simulation failed');
  }

  getState(): SimulationState {
    return { ...this.state, agents: Object.fromEntries(this.agentStates) };
  }

  getMarketSnapshot(): MarketSnapshot {
    return this.state.market;
  }

  getAgentState(agentId: string): AgentState | undefined {
    return this.agentStates.get(agentId);
  }
}
