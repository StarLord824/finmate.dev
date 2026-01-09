import { DynamicStructuredTool } from '@langchain/core/tools';
import { z } from 'zod';
import type { AgentState, MarketSnapshot } from '@repo/arena-types';

/**
 * Tool for checking current portfolio state
 */
export function createPortfolioTool(getState: () => AgentState) {
  return new DynamicStructuredTool({
    name: 'check_portfolio',
    description: 'Check your current portfolio including cash balance and positions',
    schema: z.object({}),
    func: async () => {
      const state = getState();
      return JSON.stringify({
        cash: state.cash.toFixed(2),
        positions: state.positions,
        totalValue: state.totalValue.toFixed(2),
        pnl: state.pnl.toFixed(2),
        pnlPercent: ((state.pnl / (state.totalValue - state.pnl)) * 100).toFixed(2) + '%',
      }, null, 2);
    },
  });
}

/**
 * Tool for getting market data
 */
export function createMarketTool(getMarket: () => MarketSnapshot | null) {
  return new DynamicStructuredTool({
    name: 'get_market_data',
    description: 'Get current market data including price, volume, and order book',
    schema: z.object({}),
    func: async () => {
      const market = getMarket();
      if (!market) {
        return 'Market data not available';
      }
      return JSON.stringify({
        symbol: market.symbol,
        price: market.price.toFixed(2),
        change24h: market.change24h.toFixed(2) + '%',
        volume24h: market.volume24h.toFixed(2),
        lastCandle: market.lastCandle ? {
          open: market.lastCandle.open.toFixed(2),
          high: market.lastCandle.high.toFixed(2),
          low: market.lastCandle.low.toFixed(2),
          close: market.lastCandle.close.toFixed(2),
        } : null,
        orderBook: market.orderBook ? {
          bestBid: market.orderBook.bids[0]?.price.toFixed(2),
          bestAsk: market.orderBook.asks[0]?.price.toFixed(2),
          spread: market.orderBook.spread.toFixed(2),
        } : null,
      }, null, 2);
    },
  });
}

/**
 * Tool for executing trades
 */
export function createTradeTool(
  executeTrade: (action: 'buy' | 'sell', quantity: number) => Promise<boolean>
) {
  return new DynamicStructuredTool({
    name: 'execute_trade',
    description: 'Execute a buy or sell trade',
    schema: z.object({
      action: z.enum(['buy', 'sell']).describe('Whether to buy or sell'),
      quantity: z.number().positive().describe('Amount to trade'),
    }),
    func: async ({ action, quantity }) => {
      const success = await executeTrade(action, quantity);
      return success 
        ? `Trade executed: ${action} ${quantity} units`
        : `Trade failed: ${action} ${quantity} units - check balance/position`;
    },
  });
}

/**
 * Tool for getting price history
 */
export function createPriceHistoryTool(getHistory: () => { price: number; timestamp: Date }[]) {
  return new DynamicStructuredTool({
    name: 'get_price_history',
    description: 'Get recent price history for technical analysis',
    schema: z.object({
      periods: z.number().min(1).max(50).default(10).describe('Number of periods to retrieve'),
    }),
    func: async ({ periods }) => {
      const history = getHistory().slice(-periods);
      return JSON.stringify(history.map(h => ({
        timestamp: h.timestamp.toISOString(),
        price: h.price.toFixed(2),
      })), null, 2);
    },
  });
}
