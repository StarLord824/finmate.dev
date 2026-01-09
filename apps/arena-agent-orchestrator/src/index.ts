import Redis from 'ioredis';
import type { 
  ArenaEvent, 
  SimulationTickEvent, 
  AgentDecisionEvent,
  AgentAction,
} from '@repo/arena-types';
import { prisma } from '@repo/db';
import { pino } from 'pino';
import { v4 as uuidv4 } from 'uuid';
import { AgentFactory, TradingAgent, TradingAgentContext } from './langchain/agentFactory';

const logger = pino({ 
  name: 'arena-orchestrator',
  transport: {
    target: 'pino-pretty',
    options: { colorize: true }
  }
});

const REDIS_URL = process.env.REDIS_URL || 'redis://localhost:6379';
const MARKET_SIMULATOR_URL = process.env.MARKET_SIMULATOR_URL || 'http://localhost:4001';

interface OrchestratorState {
  simulationId: string;
  agentFactory: AgentFactory;
  agents: Map<string, TradingAgent>;
  agentStates: Map<string, { cash: number; positions: Record<string, number>; totalValue: number; pnl: number; trades: number }>;
  priceHistory: { price: number; timestamp: Date }[];
  currentMarket: any;
  isActive: boolean;
}

const activeOrchestrators: Map<string, OrchestratorState> = new Map();

/**
 * Initialize orchestration for a simulation
 */
export async function initializeOrchestration(simulationId: string): Promise<void> {
  const simulation = await prisma.arenaSimulation.findUnique({
    where: { id: simulationId },
    include: {
      participants: {
        include: { agent: true },
      },
    },
  });

  if (!simulation) {
    throw new Error(`Simulation ${simulationId} not found`);
  }

  const agentFactory = new AgentFactory();
  const agents = new Map<string, TradingAgent>();
  const agentStates = new Map();

  // Create agents
  for (const participant of simulation.participants) {
    const agent = agentFactory.createAgent({
      id: participant.agent.id,
      name: participant.agent.name,
      model: participant.agent.model,
      personality: participant.agent.personality || undefined,
      strategy: participant.agent.strategy || undefined,
    });
    agents.set(participant.agent.id, agent);
    
    // Initialize agent state
    agentStates.set(participant.agent.id, {
      cash: simulation.initialBalance,
      positions: {},
      totalValue: simulation.initialBalance,
      pnl: 0,
      trades: 0,
    });
  }

  const state: OrchestratorState = {
    simulationId,
    agentFactory,
    agents,
    agentStates,
    priceHistory: [],
    currentMarket: null,
    isActive: true,
  };

  activeOrchestrators.set(simulationId, state);

  // Subscribe to simulation events
  await subscribeToSimulation(simulationId, state);

  logger.info({ simulationId, agents: agents.size }, 'Orchestration initialized');
}

/**
 * Subscribe to simulation tick events and process agent decisions
 */
async function subscribeToSimulation(simulationId: string, state: OrchestratorState): Promise<void> {
  const redis = new Redis(REDIS_URL);
  const channel = `arena:simulation:${simulationId}`;

  redis.subscribe(channel, (err) => {
    if (err) {
      logger.error({ error: err, channel }, 'Failed to subscribe');
      return;
    }
    logger.info({ channel }, 'Subscribed to simulation events');
  });

  redis.on('message', async (ch, message) => {
    if (ch !== channel) return;

    try {
      const event: ArenaEvent = JSON.parse(message);

      if (event.type === 'simulation:tick') {
        await handleTick(state, event as SimulationTickEvent);
      } else if (event.type === 'simulation:completed') {
        state.isActive = false;
        await redis.unsubscribe(channel);
        await redis.quit();
        activeOrchestrators.delete(simulationId);
        logger.info({ simulationId }, 'Simulation completed, orchestrator stopped');
      }
    } catch (error) {
      logger.error({ error, message }, 'Failed to process event');
    }
  });
}

/**
 * Handle a simulation tick - get decisions from all agents
 */
async function handleTick(state: OrchestratorState, tickEvent: SimulationTickEvent): Promise<void> {
  if (!state.isActive) return;

  // Update market state
  state.currentMarket = tickEvent.state.market;
  
  // Update price history
  state.priceHistory.push({
    price: tickEvent.state.market.price,
    timestamp: new Date(tickEvent.state.market.timestamp),
  });
  
  // Keep only last 100 prices
  if (state.priceHistory.length > 100) {
    state.priceHistory = state.priceHistory.slice(-100);
  }

  // Update agent states from simulation
  for (const [agentId, agentState] of Object.entries(tickEvent.state.agents)) {
    state.agentStates.set(agentId, agentState as any);
  }

  // Process each agent's decision in parallel
  const decisionPromises = Array.from(state.agents.entries()).map(async ([agentId, agent]) => {
    const agentState = state.agentStates.get(agentId);
    if (!agentState) return;

    const context: TradingAgentContext = {
      state: { agentId, ...agentState },
      market: state.currentMarket,
      priceHistory: state.priceHistory,
      executeTrade: async (action, quantity) => {
        return executeTradeOnSimulator(state.simulationId, agentId, action, quantity);
      },
    };

    try {
      const decision = await agent.decide(context);
      
      // Publish decision event
      await publishDecisionEvent(state.simulationId, agentId, decision);

      // Execute trade if not hold
      if (decision.action !== 'hold' && decision.quantity > 0) {
        await executeTradeOnSimulator(
          state.simulationId,
          agentId,
          decision.action,
          decision.quantity,
          decision.reasoning
        );
      }
    } catch (error) {
      logger.error({ error, agentId }, 'Agent decision failed');
    }
  });

  await Promise.all(decisionPromises);
}

/**
 * Execute trade on market simulator
 */
async function executeTradeOnSimulator(
  simulationId: string,
  agentId: string,
  action: 'buy' | 'sell',
  quantity: number,
  reasoning?: string
): Promise<boolean> {
  try {
    // In production, this would be an HTTP/gRPC call to the market simulator
    // For now, we publish to Redis and let the simulator handle it
    const redis = new Redis(REDIS_URL);
    const channel = `arena:trades:${simulationId}`;
    
    await redis.publish(channel, JSON.stringify({
      agentId,
      action,
      quantity,
      reasoning,
      timestamp: new Date().toISOString(),
    }));
    
    await redis.quit();
    return true;
  } catch (error) {
    logger.error({ error, simulationId, agentId }, 'Failed to execute trade');
    return false;
  }
}

/**
 * Publish agent decision event
 */
async function publishDecisionEvent(
  simulationId: string,
  agentId: string,
  decision: { action: 'buy' | 'sell' | 'hold'; quantity: number; reasoning: string }
): Promise<void> {
  const redis = new Redis(REDIS_URL);
  const channel = `arena:simulation:${simulationId}`;
  
  const event: AgentDecisionEvent = {
    id: uuidv4(),
    type: 'agent:decision',
    simulationId,
    timestamp: new Date(),
    agentId,
    action: decision.action === 'hold' 
      ? { type: 'hold', reasoning: decision.reasoning }
      : { type: decision.action, asset: '', quantity: decision.quantity, reasoning: decision.reasoning },
    reasoning: decision.reasoning,
  };

  await redis.publish(channel, JSON.stringify(event));
  await redis.quit();
}

/**
 * Stop orchestration for a simulation
 */
export function stopOrchestration(simulationId: string): void {
  const state = activeOrchestrators.get(simulationId);
  if (state) {
    state.isActive = false;
    activeOrchestrators.delete(simulationId);
    logger.info({ simulationId }, 'Orchestration stopped');
  }
}

// Main entry point
async function main() {
  logger.info({ redis: REDIS_URL }, 'Arena Agent Orchestrator starting...');

  // Listen for orchestration commands via Redis
  const redis = new Redis(REDIS_URL);
  const commandChannel = 'arena:orchestrator:commands';

  redis.subscribe(commandChannel, (err) => {
    if (err) {
      logger.error({ error: err }, 'Failed to subscribe to command channel');
      return;
    }
    logger.info('Agent Orchestrator ready');
  });

  redis.on('message', async (channel, message) => {
    if (channel !== commandChannel) return;

    try {
      const command = JSON.parse(message);
      
      if (command.type === 'start') {
        await initializeOrchestration(command.simulationId);
      } else if (command.type === 'stop') {
        stopOrchestration(command.simulationId);
      }
    } catch (error) {
      logger.error({ error, message }, 'Failed to process command');
    }
  });

  // Keep process alive
  process.on('SIGINT', async () => {
    logger.info('Shutting down...');
    for (const [id] of activeOrchestrators) {
      stopOrchestration(id);
    }
    await redis.quit();
    process.exit(0);
  });
}

main().catch(error => {
  logger.fatal({ error }, 'Failed to start Agent Orchestrator');
  process.exit(1);
});

// Exports
export { AgentFactory, TradingAgent } from './langchain/agentFactory';
export { ChatOpenRouter, AVAILABLE_MODELS } from './langchain/openRouterModel';
