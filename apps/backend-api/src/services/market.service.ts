import { getRedis } from "../lib/redis";

const SYMBOLS = [
  { symbol: "^GSPC", label: "S&P 500" },
  { symbol: "^IXIC", label: "Nasdaq" },
  { symbol: "BTC-USD", label: "BTC" },
  { symbol: "^TNX", label: "10Y Yield" },
];

const CACHE_KEY = "market:quotes";
const CACHE_TTL = 60; // seconds

interface Quote {
  label: string;
  symbol: string;
  price: number;
  change: number;       // absolute
  changePercent: number;
}

async function fetchQuote(
  symbol: string
): Promise<{ price: number; change: number; changePercent: number } | null> {
  try {
    const url = `https://query1.finance.yahoo.com/v8/finance/chart/${encodeURIComponent(symbol)}?interval=1d&range=2d`;
    const res = await fetch(url, {
      headers: { "User-Agent": "Mozilla/5.0" },
      signal: AbortSignal.timeout(5000),
    });
    if (!res.ok) return null;

    const json = await res.json();
    const result = json?.chart?.result?.[0];
    if (!result) return null;

    const meta = result.meta;
    const price: number = meta.regularMarketPrice ?? 0;
    const prevClose: number =
      meta.chartPreviousClose ?? meta.previousClose ?? price;
    const change = price - prevClose;
    const changePercent = prevClose !== 0 ? (change / prevClose) * 100 : 0;

    return { price, change, changePercent };
  } catch {
    return null;
  }
}

export async function getMarketQuotes(): Promise<Quote[]> {
  const redis = getRedis();

  // Try cache first
  const cached = await redis.get(CACHE_KEY);
  if (cached) {
    return JSON.parse(cached) as Quote[];
  }

  // Fetch all symbols in parallel
  const results = await Promise.all(
    SYMBOLS.map(async ({ symbol, label }) => {
      const data = await fetchQuote(symbol);
      if (!data) return null;
      return { label, symbol, ...data } as Quote;
    })
  );

  const quotes = results.filter((q): q is Quote => q !== null);

  if (quotes.length > 0) {
    await redis.set(CACHE_KEY, JSON.stringify(quotes), "EX", CACHE_TTL);
  }

  return quotes;
}
