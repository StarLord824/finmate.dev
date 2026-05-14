import { getRedis } from "../lib/redis";
import {
  MARQUEE_SYMBOLS,
  CATEGORY_MAP,
  ALL_YAHOO_SYMBOLS,
  type CatalogEntry,
} from "./market-catalog";
import { getTopCrypto } from "./coingecko.service";

export const SYMBOLS: CatalogEntry[] = MARQUEE_SYMBOLS;

const QUOTE_CACHE_KEY = "market:quotes";
const QUOTE_TTL = 60; // seconds

export interface Quote {
  label: string;
  symbol: string;
  category: string;
  price: number;
  change: number;
  changePercent: number;
}

export interface HistoryPoint {
  t: number; // unix ms
  c: number; // close price
}

export interface MarketHistory {
  symbol: string;
  label: string;
  range: string;
  points: HistoryPoint[];
  currentPrice: number;
  change: number;
  changePercent: number;
}

const RANGE_CONFIG: Record<string, { interval: string; range: string; ttl: number }> = {
  "1d": { interval: "5m",  range: "1d",  ttl: 300  },
  "1w": { interval: "1h",  range: "5d",  ttl: 1800 },
  "1m": { interval: "1d",  range: "1mo", ttl: 7200 },
};

async function yahooFetch(symbol: string, interval: string, range: string): Promise<any> {
  const url = `https://query1.finance.yahoo.com/v8/finance/chart/${encodeURIComponent(symbol)}?interval=${interval}&range=${range}`;
  const res = await fetch(url, {
    headers: { "User-Agent": "Mozilla/5.0" },
    signal: AbortSignal.timeout(8000),
  });
  if (!res.ok) {
    console.warn(`[market] yahooFetch ${symbol} HTTP ${res.status}`);
    return null;
  }
  const json = await res.json();
  return json?.chart?.result?.[0] ?? null;
}

async function fetchQuote(
  symbol: string
): Promise<{ price: number; change: number; changePercent: number } | null> {
  try {
    const result = await yahooFetch(symbol, "1d", "2d");
    if (!result) return null;
    const meta = result.meta;
    const price: number = meta.regularMarketPrice ?? 0;
    const prevClose: number = meta.chartPreviousClose ?? meta.previousClose ?? price;
    const change = price - prevClose;
    const changePercent = prevClose !== 0 ? (change / prevClose) * 100 : 0;
    return { price, change, changePercent };
  } catch {
    return null;
  }
}

export async function getMarketQuotes(): Promise<Quote[]> {
  const redis = getRedis();
  const cached = await redis.get(QUOTE_CACHE_KEY);
  if (cached) return JSON.parse(cached) as Quote[];

  const results = await Promise.all(
    SYMBOLS.map(async ({ symbol, label, category }) => {
      const data = await fetchQuote(symbol);
      if (!data) return null;
      return { label, symbol, category, ...data } as Quote;
    })
  );

  const quotes = results.filter((q): q is Quote => q !== null);
  if (quotes.length > 0) {
    await redis.set(QUOTE_CACHE_KEY, JSON.stringify(quotes), "EX", QUOTE_TTL);
  }
  return quotes;
}

export async function getMarketHistory(
  symbol: string,
  range: string
): Promise<MarketHistory | null> {
  const cfg = RANGE_CONFIG[range]!;
  const cacheKey = `market:history:${symbol}:${range}`;
  const redis = getRedis();

  const cached = await redis.get(cacheKey);
  if (cached) return JSON.parse(cached) as MarketHistory;

  try {
    const result = await yahooFetch(symbol, cfg.interval, cfg.range);
    if (!result) return null;

    const timestamps: number[] = result.timestamp ?? [];
    const closes: (number | null)[] = result.indicators?.quote?.[0]?.close ?? [];
    const meta = result.meta;

    const points: HistoryPoint[] = timestamps
      .map((t, i) => ({ t: t * 1000, c: closes[i] }))
      .filter((p): p is HistoryPoint => p.c !== null && p.c !== undefined && !isNaN(p.c));

    const price: number = meta.regularMarketPrice ?? 0;
    const prevClose: number = meta.chartPreviousClose ?? meta.previousClose ?? price;
    const change = price - prevClose;
    const changePercent = prevClose !== 0 ? (change / prevClose) * 100 : 0;

    const sym = SYMBOLS.find((s) => s.symbol === symbol);
    const history: MarketHistory = {
      symbol,
      label: sym?.label ?? symbol,
      range,
      points,
      currentPrice: price,
      change,
      changePercent,
    };

    await redis.set(cacheKey, JSON.stringify(history), "EX", cfg.ttl);
    return history;
  } catch (err) {
    console.error(`[market] getMarketHistory ${symbol}:${range} failed`, err);
    return null;
  }
}

const CATEGORY_TTL = 60; // seconds — category list quotes refresh on the same rhythm as the marquee

export async function getCategoryQuotes(category: string): Promise<Quote[]> {
  const entries = CATEGORY_MAP[category];
  if (!entries) return [];

  const cacheKey = `market:category:${category}`;
  const redis = getRedis();
  const cached = await redis.get(cacheKey);
  if (cached) return JSON.parse(cached) as Quote[];

  const results = await Promise.all(
    entries.map(async ({ symbol, label, category: cat }) => {
      const data = await fetchQuote(symbol);
      if (!data) return null;
      return { label, symbol, category: cat, ...data } as Quote;
    })
  );

  const quotes = results.filter((q): q is Quote => q !== null);
  if (quotes.length > 0) {
    await redis.set(cacheKey, JSON.stringify(quotes), "EX", CATEGORY_TTL);
  }
  return quotes;
}

const MOVERS_TTL = 60;

export interface Movers {
  gainers: Quote[];
  losers: Quote[];
}

export async function getMovers(): Promise<Movers> {
  const cacheKey = "market:movers";
  const redis = getRedis();
  const cached = await redis.get(cacheKey);
  if (cached) return JSON.parse(cached) as Movers;

  const yahooResults = await Promise.all(
    ALL_YAHOO_SYMBOLS.map(async ({ symbol, label, category }) => {
      const data = await fetchQuote(symbol);
      if (!data) return null;
      return { label, symbol, category, ...data } as Quote;
    })
  );
  const yahooQuotes = yahooResults.filter((q): q is Quote => q !== null);

  const crypto = await getTopCrypto(50);
  const cryptoQuotes: Quote[] = crypto.map((c) => ({
    label: c.label,
    symbol: c.symbol,
    category: "crypto",
    price: c.price,
    change: c.change,
    changePercent: c.changePercent,
  }));

  const all = [...yahooQuotes, ...cryptoQuotes];
  const sorted = [...all].sort((a, b) => b.changePercent - a.changePercent);
  const gainers = sorted.slice(0, 5);
  const losers = sorted.slice(-5).reverse();

  const movers: Movers = { gainers, losers };
  await redis.set(cacheKey, JSON.stringify(movers), "EX", MOVERS_TTL);
  return movers;
}
