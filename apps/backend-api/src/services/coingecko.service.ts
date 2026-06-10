import { getRedis } from "../lib/redis";

export interface CryptoQuote {
  symbol: string;
  label: string;
  category: "crypto";
  price: number;
  change: number;
  changePercent: number;
  marketCap: number;
  image: string;
}

const CACHE_KEY = "market:crypto:top";
const TTL = 300; // 5 min

interface CoinGeckoCoin {
  id: string;
  symbol: string;
  name: string;
  image: string;
  current_price: number;
  market_cap: number;
  price_change_24h: number | null;
  price_change_percentage_24h: number | null;
}

export async function getTopCrypto(limit = 50): Promise<CryptoQuote[]> {
  const redis = getRedis();
  const cached = await redis.get(CACHE_KEY);
  if (cached) return JSON.parse(cached) as CryptoQuote[];

  try {
    const url =
      `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc` +
      `&per_page=${limit}&page=1&sparkline=false&price_change_percentage=24h`;
    const res = await fetch(url, {
      headers: { "User-Agent": "FinMate/1.0" },
      signal: AbortSignal.timeout(8000),
    });
    if (!res.ok) {
      console.warn(`[coingecko] HTTP ${res.status}`);
      return [];
    }
    const data = (await res.json()) as CoinGeckoCoin[];

    const quotes: CryptoQuote[] = data.map((c) => ({
      symbol: c.symbol.toUpperCase(),
      label: c.name,
      category: "crypto" as const,
      price: c.current_price,
      change: c.price_change_24h ?? 0,
      changePercent: c.price_change_percentage_24h ?? 0,
      marketCap: c.market_cap,
      image: c.image,
    }));

    if (quotes.length > 0) {
      await redis.set(CACHE_KEY, JSON.stringify(quotes), "EX", TTL);
    }
    return quotes;
  } catch (err) {
    console.error("[coingecko] getTopCrypto failed", err);
    return [];
  }
}
