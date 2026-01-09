// Market Data Types
export interface Candle {
  timestamp: Date;
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
}

export interface OrderBookEntry {
  price: number;
  quantity: number;
}

export interface OrderBook {
  bids: OrderBookEntry[]; // sorted desc by price
  asks: OrderBookEntry[]; // sorted asc by price
  spread: number;
  midPrice: number;
}

export interface Trade {
  id: string;
  timestamp: Date;
  side: 'buy' | 'sell';
  price: number;
  quantity: number;
  agentId?: string;
}

export interface MarketSnapshot {
  timestamp: Date;
  symbol: string;
  price: number;
  change24h: number;
  volume24h: number;
  orderBook?: OrderBook;
  lastCandle?: Candle;
}

export type MarketType = 'crypto' | 'stock';

export interface MarketConfig {
  symbol: string;
  type: MarketType;
  interval: '1m' | '5m' | '15m' | '1h' | '4h' | '1d';
}
