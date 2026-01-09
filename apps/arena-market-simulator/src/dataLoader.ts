import type { Candle, MarketSnapshot } from '@repo/arena-types';
import { prisma } from '@repo/db';

export interface DataLoaderConfig {
  symbol: string;
  type: 'crypto' | 'stock';
  interval: string;
  startDate: Date;
  endDate: Date;
}

/**
 * DataLoader fetches and caches historical market data
 */
export class DataLoader {
  private config: DataLoaderConfig;
  private candles: Candle[] = [];
  private currentIndex: number = 0;

  constructor(config: DataLoaderConfig) {
    this.config = config;
  }

  /**
   * Load data from cache or fetch from external API
   */
  async loadData(): Promise<Candle[]> {
    // Try to load from cache first
    const cached = await this.loadFromCache();
    if (cached.length > 0) {
      this.candles = cached;
      return this.candles;
    }

    // Fetch from external API
    if (this.config.type === 'crypto') {
      this.candles = await this.fetchBinanceData();
    } else {
      this.candles = await this.fetchYahooData();
    }

    // Cache the data
    if (this.candles.length > 0) {
      await this.saveToCache(this.candles);
    }

    return this.candles;
  }

  /**
   * Load historical data from database cache
   */
  private async loadFromCache(): Promise<Candle[]> {
    try {
      const cached = await prisma.marketDataCache.findFirst({
        where: {
          symbol: this.config.symbol,
          type: this.config.type,
          interval: this.config.interval,
          startTime: { lte: this.config.startDate },
          endTime: { gte: this.config.endDate },
        },
      });

      if (cached) {
        const data = cached.data as unknown as Candle[];
        // Filter to requested date range
        return data.filter(c => {
          const ts = new Date(c.timestamp);
          return ts >= this.config.startDate && ts <= this.config.endDate;
        });
      }
    } catch (error) {
      console.error('Cache load error:', error);
    }

    return [];
  }

  /**
   * Save data to database cache
   */
  private async saveToCache(candles: Candle[]): Promise<void> {
    try {
      await prisma.marketDataCache.create({
        data: {
          symbol: this.config.symbol,
          type: this.config.type,
          interval: this.config.interval,
          startTime: this.config.startDate,
          endTime: this.config.endDate,
          dataCount: candles.length,
          data: candles as unknown as object,
        },
      });
    } catch (error) {
      console.error('Cache save error:', error);
    }
  }

  /**
   * Fetch cryptocurrency data from Binance API
   */
  private async fetchBinanceData(): Promise<Candle[]> {
    try {
      const symbol = this.config.symbol.replace('/', ''); // "BTC/USDT" -> "BTCUSDT"
      const intervalMap: Record<string, string> = {
        '1m': '1m', '5m': '5m', '15m': '15m',
        '1h': '1h', '4h': '4h', '1d': '1d',
      };
      const interval = intervalMap[this.config.interval] || '1h';
      
      const startTime = this.config.startDate.getTime();
      const endTime = this.config.endDate.getTime();
      
      const url = `https://api.binance.com/api/v3/klines?symbol=${symbol}&interval=${interval}&startTime=${startTime}&endTime=${endTime}&limit=1000`;
      
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`Binance API error: ${response.status}`);
      }
      
      const data = await response.json();
      
      return data.map((k: (string | number)[]) => ({
        timestamp: new Date(k[0] as number),
        open: parseFloat(k[1] as string),
        high: parseFloat(k[2] as string),
        low: parseFloat(k[3] as string),
        close: parseFloat(k[4] as string),
        volume: parseFloat(k[5] as string),
      }));
    } catch (error) {
      console.error('Binance fetch error:', error);
      return this.generateMockData();
    }
  }

  /**
   * Fetch stock data from Yahoo Finance
   */
  private async fetchYahooData(): Promise<Candle[]> {
    try {
      const symbol = this.config.symbol;
      const period1 = Math.floor(this.config.startDate.getTime() / 1000);
      const period2 = Math.floor(this.config.endDate.getTime() / 1000);
      
      const intervalMap: Record<string, string> = {
        '1m': '1m', '5m': '5m', '15m': '15m',
        '1h': '1h', '1d': '1d',
      };
      const interval = intervalMap[this.config.interval] || '1d';
      
      const url = `https://query1.finance.yahoo.com/v8/finance/chart/${symbol}?period1=${period1}&period2=${period2}&interval=${interval}`;
      
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`Yahoo API error: ${response.status}`);
      }
      
      const json = await response.json();
      const result = json.chart?.result?.[0];
      
      if (!result) {
        return this.generateMockData();
      }
      
      const timestamps = result.timestamp || [];
      const quotes = result.indicators?.quote?.[0] || {};
      
      return timestamps.map((ts: number, i: number) => ({
        timestamp: new Date(ts * 1000),
        open: quotes.open?.[i] ?? 0,
        high: quotes.high?.[i] ?? 0,
        low: quotes.low?.[i] ?? 0,
        close: quotes.close?.[i] ?? 0,
        volume: quotes.volume?.[i] ?? 0,
      })).filter((c: Candle) => c.open > 0);
    } catch (error) {
      console.error('Yahoo fetch error:', error);
      return this.generateMockData();
    }
  }

  /**
   * Generate mock data for testing/fallback
   */
  private generateMockData(): Candle[] {
    const candles: Candle[] = [];
    let price = 50000; // Starting price
    let current = new Date(this.config.startDate);
    
    const intervalMs: Record<string, number> = {
      '1m': 60000, '5m': 300000, '15m': 900000,
      '1h': 3600000, '4h': 14400000, '1d': 86400000,
    };
    const step = intervalMs[this.config.interval] || 3600000;

    while (current <= this.config.endDate) {
      const volatility = 0.02;
      const change = (Math.random() - 0.5) * volatility;
      const open = price;
      const close = price * (1 + change);
      const high = Math.max(open, close) * (1 + Math.random() * 0.01);
      const low = Math.min(open, close) * (1 - Math.random() * 0.01);
      
      candles.push({
        timestamp: new Date(current),
        open,
        high,
        low,
        close,
        volume: Math.random() * 1000000,
      });
      
      price = close;
      current = new Date(current.getTime() + step);
    }

    return candles;
  }

  /**
   * Get next candle in sequence
   */
  getNextCandle(): Candle | null {
    if (this.currentIndex >= this.candles.length) {
      return null;
    }
    return this.candles[this.currentIndex++];
  }

  /**
   * Get candle at specific index
   */
  getCandleAt(index: number): Candle | null {
    return this.candles[index] || null;
  }

  /**
   * Reset to beginning
   */
  reset(): void {
    this.currentIndex = 0;
  }

  /**
   * Get current market snapshot
   */
  getCurrentSnapshot(): MarketSnapshot | null {
    const candle = this.candles[this.currentIndex - 1];
    if (!candle) return null;

    const prevCandle = this.candles[this.currentIndex - 2];
    const change24h = prevCandle 
      ? ((candle.close - prevCandle.close) / prevCandle.close) * 100
      : 0;

    return {
      timestamp: candle.timestamp,
      symbol: this.config.symbol,
      price: candle.close,
      change24h,
      volume24h: candle.volume,
      lastCandle: candle,
    };
  }

  getTotalCandles(): number {
    return this.candles.length;
  }

  getCurrentIndex(): number {
    return this.currentIndex;
  }
}
