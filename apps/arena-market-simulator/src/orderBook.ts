import type { OrderBookEntry, OrderBook, Trade } from '@repo/arena-types';
import { v4 as uuidv4 } from 'uuid';

/**
 * OrderBookEngine manages a limit order book with bid/ask matching.
 * Supports market orders with price impact simulation.
 */
export class OrderBookEngine {
  private bids: OrderBookEntry[] = []; // sorted desc by price
  private asks: OrderBookEntry[] = []; // sorted asc by price
  private currentPrice: number;
  private priceImpactFactor: number;

  constructor(initialPrice: number, priceImpactFactor: number = 0.001) {
    this.currentPrice = initialPrice;
    this.priceImpactFactor = priceImpactFactor;
    this.initializeOrderBook();
  }

  /**
   * Initialize synthetic order book around current price
   */
  private initializeOrderBook(): void {
    const spread = this.currentPrice * 0.001; // 0.1% spread
    const levels = 10;
    const baseQuantity = 100;

    // Generate bid levels (descending price)
    for (let i = 0; i < levels; i++) {
      const price = this.currentPrice - spread - (i * spread * 0.5);
      const quantity = baseQuantity * (1 + Math.random() * 0.5);
      this.bids.push({ price, quantity });
    }

    // Generate ask levels (ascending price)
    for (let i = 0; i < levels; i++) {
      const price = this.currentPrice + spread + (i * spread * 0.5);
      const quantity = baseQuantity * (1 + Math.random() * 0.5);
      this.asks.push({ price, quantity });
    }

    this.sortOrderBook();
  }

  private sortOrderBook(): void {
    this.bids.sort((a, b) => b.price - a.price);
    this.asks.sort((a, b) => a.price - b.price);
  }

  /**
   * Execute a market buy order
   * @returns Trade details with executed price
   */
  executeBuy(quantity: number, agentId?: string): Trade | null {
    if (this.asks.length === 0) return null;

    let remainingQty = quantity;
    let totalCost = 0;
    let filledQty = 0;

    while (remainingQty > 0 && this.asks.length > 0) {
      const bestAsk = this.asks[0];
      const fillQty = Math.min(remainingQty, bestAsk.quantity);
      
      totalCost += fillQty * bestAsk.price;
      filledQty += fillQty;
      remainingQty -= fillQty;
      bestAsk.quantity -= fillQty;

      if (bestAsk.quantity <= 0) {
        this.asks.shift();
      }
    }

    if (filledQty === 0) return null;

    const avgPrice = totalCost / filledQty;
    
    // Apply price impact
    this.currentPrice = avgPrice * (1 + this.priceImpactFactor * filledQty / 100);
    this.regenerateOrderBook();

    return {
      id: uuidv4(),
      timestamp: new Date(),
      side: 'buy',
      price: avgPrice,
      quantity: filledQty,
      agentId,
    };
  }

  /**
   * Execute a market sell order
   * @returns Trade details with executed price
   */
  executeSell(quantity: number, agentId?: string): Trade | null {
    if (this.bids.length === 0) return null;

    let remainingQty = quantity;
    let totalValue = 0;
    let filledQty = 0;

    while (remainingQty > 0 && this.bids.length > 0) {
      const bestBid = this.bids[0];
      const fillQty = Math.min(remainingQty, bestBid.quantity);
      
      totalValue += fillQty * bestBid.price;
      filledQty += fillQty;
      remainingQty -= fillQty;
      bestBid.quantity -= fillQty;

      if (bestBid.quantity <= 0) {
        this.bids.shift();
      }
    }

    if (filledQty === 0) return null;

    const avgPrice = totalValue / filledQty;
    
    // Apply price impact (negative for sells)
    this.currentPrice = avgPrice * (1 - this.priceImpactFactor * filledQty / 100);
    this.regenerateOrderBook();

    return {
      id: uuidv4(),
      timestamp: new Date(),
      side: 'sell',
      price: avgPrice,
      quantity: filledQty,
      agentId,
    };
  }

  /**
   * Regenerate order book around new price
   */
  private regenerateOrderBook(): void {
    this.bids = [];
    this.asks = [];
    this.initializeOrderBook();
  }

  /**
   * Update price from historical data (external price feed)
   */
  updatePrice(newPrice: number): void {
    this.currentPrice = newPrice;
    this.regenerateOrderBook();
  }

  /**
   * Get current order book snapshot
   */
  getOrderBook(): OrderBook {
    const bestBid = this.bids[0]?.price ?? 0;
    const bestAsk = this.asks[0]?.price ?? 0;
    
    return {
      bids: [...this.bids.slice(0, 5)],
      asks: [...this.asks.slice(0, 5)],
      spread: bestAsk - bestBid,
      midPrice: (bestBid + bestAsk) / 2,
    };
  }

  getCurrentPrice(): number {
    return this.currentPrice;
  }

  /**
   * Get best bid price
   */
  getBestBid(): number {
    return this.bids[0]?.price ?? this.currentPrice * 0.999;
  }

  /**
   * Get best ask price
   */
  getBestAsk(): number {
    return this.asks[0]?.price ?? this.currentPrice * 1.001;
  }
}
