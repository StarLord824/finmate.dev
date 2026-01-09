import type { AgentConfig, AgentState } from './agent';
import type { MarketConfig, MarketSnapshot } from './market';

// Simulation Types
export type SimulationStatus = 'pending' | 'running' | 'paused' | 'completed' | 'failed';

export interface SimulationConfig {
  id: string;
  name: string;
  market: MarketConfig;
  startDate: Date;
  endDate: Date;
  initialBalance: number;
  agents: AgentConfig[];
  tickIntervalMs: number; // simulation speed
  priceImpactFactor: number; // how much agent trades affect price
}

export interface SimulationState {
  id: string;
  status: SimulationStatus;
  currentTime: Date;
  market: MarketSnapshot;
  agents: Record<string, AgentState>;
  tickCount: number;
  startedAt?: Date;
  completedAt?: Date;
}

export interface SimulationResult {
  simulationId: string;
  rankings: AgentRanking[];
  totalTicks: number;
  duration: number; // in ms
}

export interface AgentRanking {
  agentId: string;
  agentName: string;
  rank: number;
  finalBalance: number;
  pnl: number;
  pnlPercent: number;
  sharpeRatio: number;
  winRate: number;
  totalTrades: number;
}

export interface SimulationSnapshot {
  timestamp: Date;
  price: number;
  portfolios: Record<string, { cash: number; positions: Record<string, number>; totalValue: number }>;
  recentTrades: Array<{
    agentId: string;
    action: 'buy' | 'sell';
    asset: string;
    quantity: number;
    price: number;
  }>;
}
