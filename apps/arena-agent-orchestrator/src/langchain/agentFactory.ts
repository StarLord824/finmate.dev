import { ChatPromptTemplate, HumanMessagePromptTemplate, SystemMessagePromptTemplate } from '@langchain/core/prompts';
import { StringOutputParser } from '@langchain/core/output_parsers';
import type { AgentConfig, AgentState, AgentAction, MarketSnapshot } from '@repo/arena-types';
import { pino } from 'pino';
import { ChatOpenRouter } from './openRouterModel';
import { getPromptForPersonality } from './prompts/traderPrompt';
import {
  createPortfolioTool,
  createMarketTool,
  createTradeTool,
  createPriceHistoryTool,
} from './tools/tradingTools';

const logger = pino({ name: 'agent-factory' });

export interface TradingAgentContext {
  state: AgentState;
  market: MarketSnapshot | null;
  priceHistory: { price: number; timestamp: Date }[];
  executeTrade: (action: 'buy' | 'sell', quantity: number) => Promise<boolean>;
}

export interface TradingAgentDecision {
  action: 'buy' | 'sell' | 'hold';
  quantity: number;
  reasoning: string;
}

/**
 * TradingAgent - LangChain-based trading agent
 */
export class TradingAgent {
  private config: AgentConfig;
  private model: ChatOpenRouter;
  private systemPrompt: string;

  constructor(config: AgentConfig) {
    this.config = config;
    
    // Initialize LLM
    this.model = new ChatOpenRouter({
      modelName: config.model,
      temperature: config.temperature ?? 0.7,
      maxTokens: config.maxTokens ?? 1024,
    });

    // Get system prompt based on personality
    this.systemPrompt = config.personality 
      ? getPromptForPersonality(config.personality)
      : getPromptForPersonality('base');

    // If custom strategy is provided, append it
    if (config.strategy) {
      this.systemPrompt += `\n\n## Additional Strategy Instructions:\n${config.strategy}`;
    }
  }

  /**
   * Make a trading decision based on current context
   */
  async decide(context: TradingAgentContext): Promise<TradingAgentDecision> {
    try {
      // Build context strings
      const portfolioStr = `
Cash: $${context.state.cash.toFixed(2)}
Positions: ${JSON.stringify(context.state.positions)}
Total Value: $${context.state.totalValue.toFixed(2)}
P&L: $${context.state.pnl.toFixed(2)} (${((context.state.pnl / (context.state.totalValue - context.state.pnl)) * 100).toFixed(2)}%)
`;

      const marketStr = context.market ? `
Symbol: ${context.market.symbol}
Current Price: $${context.market.price.toFixed(2)}
24h Change: ${context.market.change24h.toFixed(2)}%
24h Volume: ${context.market.volume24h.toFixed(2)}
Last Candle: O:${context.market.lastCandle?.open.toFixed(2)} H:${context.market.lastCandle?.high.toFixed(2)} L:${context.market.lastCandle?.low.toFixed(2)} C:${context.market.lastCandle?.close.toFixed(2)}
Bid/Ask: ${context.market.orderBook?.bids[0]?.price.toFixed(2)} / ${context.market.orderBook?.asks[0]?.price.toFixed(2)}
` : 'Market data unavailable';

      // Add price history
      const historyStr = context.priceHistory.slice(-5).map(h => 
        `${h.timestamp.toISOString()}: $${h.price.toFixed(2)}`
      ).join('\n');

      // Fill in the prompt template
      const filledPrompt = this.systemPrompt
        .replace('{{portfolio}}', portfolioStr)
        .replace('{{market}}', marketStr + '\n\nRecent Price History:\n' + historyStr);

      // Create chat prompt
      const prompt = ChatPromptTemplate.fromMessages([
        SystemMessagePromptTemplate.fromTemplate(filledPrompt),
        HumanMessagePromptTemplate.fromTemplate('What is your trading decision for this tick?'),
      ]);

      // Get response
      const chain = prompt.pipe(this.model).pipe(new StringOutputParser());
      const response = await chain.invoke({});

      // Parse response
      const decision = this.parseDecision(response);
      
      logger.info({ 
        agentId: this.config.id, 
        decision,
        model: this.config.model 
      }, 'Agent decision made');

      return decision;
    } catch (error) {
      logger.error({ error, agentId: this.config.id }, 'Agent decision error');
      return {
        action: 'hold',
        quantity: 0,
        reasoning: `Error making decision: ${error}`,
      };
    }
  }

  /**
   * Parse LLM response into a trading decision
   */
  private parseDecision(response: string): TradingAgentDecision {
    try {
      // Try to extract JSON from response
      const jsonMatch = response.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        const parsed = JSON.parse(jsonMatch[0]);
        return {
          action: parsed.action || 'hold',
          quantity: Number(parsed.quantity) || 0,
          reasoning: parsed.reasoning || 'No reasoning provided',
        };
      }
    } catch (error) {
      logger.warn({ error, response }, 'Failed to parse JSON response');
    }

    // Fallback: try to parse text response
    const lowerResponse = response.toLowerCase();
    if (lowerResponse.includes('buy')) {
      const qtyMatch = response.match(/(\d+(?:\.\d+)?)/);
      return {
        action: 'buy',
        quantity: qtyMatch ? parseFloat(qtyMatch[1]) : 1,
        reasoning: response,
      };
    } else if (lowerResponse.includes('sell')) {
      const qtyMatch = response.match(/(\d+(?:\.\d+)?)/);
      return {
        action: 'sell',
        quantity: qtyMatch ? parseFloat(qtyMatch[1]) : 1,
        reasoning: response,
      };
    }

    return {
      action: 'hold',
      quantity: 0,
      reasoning: response,
    };
  }

  getId(): string {
    return this.config.id;
  }

  getName(): string {
    return this.config.name;
  }

  getModel(): string {
    return this.config.model;
  }
}

/**
 * AgentFactory - Creates and manages trading agents
 */
export class AgentFactory {
  private agents: Map<string, TradingAgent> = new Map();

  /**
   * Create a new trading agent
   */
  createAgent(config: AgentConfig): TradingAgent {
    const agent = new TradingAgent(config);
    this.agents.set(config.id, agent);
    logger.info({ agentId: config.id, model: config.model }, 'Agent created');
    return agent;
  }

  /**
   * Get an existing agent
   */
  getAgent(agentId: string): TradingAgent | undefined {
    return this.agents.get(agentId);
  }

  /**
   * Remove an agent
   */
  removeAgent(agentId: string): void {
    this.agents.delete(agentId);
  }

  /**
   * Get all agents
   */
  getAllAgents(): TradingAgent[] {
    return Array.from(this.agents.values());
  }

  /**
   * Clear all agents
   */
  clear(): void {
    this.agents.clear();
  }
}
