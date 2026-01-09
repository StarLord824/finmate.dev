import type { MarketSnapshot } from './market';

// Agent Types
export interface AgentConfig {
  id: string;
  name: string;
  model: string; // e.g. "openai/gpt-4o", "anthropic/claude-3.5-sonnet"
  personality?: string;
  strategy?: string;
  temperature?: number;
  maxTokens?: number;
}

export interface AgentState {
  agentId: string;
  cash: number;
  positions: Record<string, number>; // asset -> quantity
  totalValue: number;
  pnl: number;
  trades: number;
}

export type AgentAction = 
  | { type: 'buy'; asset: string; quantity: number; reasoning?: string }
  | { type: 'sell'; asset: string; quantity: number; reasoning?: string }
  | { type: 'hold'; reasoning?: string };

export interface AgentDecision {
  agentId: string;
  timestamp: Date;
  action: AgentAction;
  marketContext: MarketSnapshot;
}
