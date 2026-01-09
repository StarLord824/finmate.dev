import type { AgentAction, AgentState } from './agent';
import type { MarketSnapshot, Trade } from './market';
import type { SimulationState } from './simulation';

// Event Types for Redis Pub/Sub
export type ArenaEventType =
  | 'simulation:started'
  | 'simulation:tick'
  | 'simulation:paused'
  | 'simulation:resumed'
  | 'simulation:completed'
  | 'simulation:failed'
  | 'agent:decision'
  | 'agent:trade'
  | 'market:update'
  | 'market:price';

export interface BaseEvent {
  id: string;
  type: ArenaEventType;
  simulationId: string;
  timestamp: Date;
}

export interface SimulationStartedEvent extends BaseEvent {
  type: 'simulation:started';
  config: {
    market: string;
    agents: string[];
    startDate: Date;
    endDate: Date;
  };
}

export interface SimulationTickEvent extends BaseEvent {
  type: 'simulation:tick';
  tick: number;
  state: SimulationState;
}

export interface SimulationCompletedEvent extends BaseEvent {
  type: 'simulation:completed';
  result: {
    rankings: Array<{ agentId: string; pnl: number; rank: number }>;
  };
}

export interface AgentDecisionEvent extends BaseEvent {
  type: 'agent:decision';
  agentId: string;
  action: AgentAction;
  reasoning?: string;
}

export interface AgentTradeEvent extends BaseEvent {
  type: 'agent:trade';
  agentId: string;
  trade: Trade;
  portfolioAfter: AgentState;
}

export interface MarketUpdateEvent extends BaseEvent {
  type: 'market:update';
  snapshot: MarketSnapshot;
}

export type ArenaEvent =
  | SimulationStartedEvent
  | SimulationTickEvent
  | SimulationCompletedEvent
  | AgentDecisionEvent
  | AgentTradeEvent
  | MarketUpdateEvent;

// Channel names
export const ARENA_CHANNELS = {
  SIMULATION: (id: string) => `arena:simulation:${id}`,
  MARKET: (id: string) => `arena:market:${id}`,
  AGENT: (id: string, agentId: string) => `arena:agent:${id}:${agentId}`,
} as const;
