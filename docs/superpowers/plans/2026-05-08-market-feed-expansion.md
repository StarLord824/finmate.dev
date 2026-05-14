# Market Feed Expansion Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Expand the markets surface from 6 symbols to a multi-category, India-first universe with top movers, top-50 crypto from CoinGecko, NIFTY 50, US blue chips, world indices, commodities, and forex.

**Architecture:** Backend gets a new CoinGecko service, a shared symbol catalog file, three new endpoints (`/meta/market/category`, `/meta/market/crypto-top`, `/meta/market/movers`), and an extended marquee symbol list. Frontend rewrites `/markets` into a tabbed layout (Movers / Crypto / Indian Stocks / US Stocks / Indices / Commodities / Forex), keeps the sidebar widget lean with India-first marquee + a top-gainer highlight, and reuses the existing FullChart panel.

**Tech Stack:** Express 5, Node 26 ESM, ioredis, Yahoo Finance v8 (existing), CoinGecko v3 (new, free), Next.js 16 App Router, TanStack Query v5, recharts.

---

## File Map

**Create:**
- `apps/backend-api/src/services/market-catalog.ts` — static symbol catalog (NSE 50, US 30, indices 9, commodities 4, forex 5, marquee 6)
- `apps/backend-api/src/services/coingecko.service.ts` — CoinGecko client for top-N crypto
- `apps/frontend-web/components/markets/CategoryList.tsx` — ranked list for one category (rank/label/price/change%/sparkline)
- `apps/frontend-web/components/markets/MoversPanel.tsx` — top gainers / top losers two-column panel
- `apps/frontend-web/components/markets/MarketTabs.tsx` — sticky tab bar
- `apps/frontend-web/components/markets/TopGainerRow.tsx` — single highlighted gainer row used in the sidebar

**Modify:**
- `apps/backend-api/src/services/market.service.ts` — switch marquee to catalog, add `getCategoryQuotes()` and `getMovers()`
- `apps/backend-api/src/routes/meta.ts` — three new routes
- `apps/frontend-web/lib/types.ts` — new types
- `apps/frontend-web/lib/api-client.ts` — new client methods
- `apps/frontend-web/components/markets/MarketSidebarWidget.tsx` — switch to marquee constant + add `TopGainerRow`
- `apps/frontend-web/app/(app)/markets/page.tsx` — rewrite as tabbed layout

---

## Task 1: Backend symbol catalog

**Files:**
- Create: `apps/backend-api/src/services/market-catalog.ts`

- [ ] **Step 1: Create catalog file**

Write `apps/backend-api/src/services/market-catalog.ts`:

```typescript
export interface CatalogEntry {
  symbol: string;
  label: string;
  category: string;
}

// Lean set shown in the sidebar & marquee — India-first
export const MARQUEE_SYMBOLS: CatalogEntry[] = [
  { symbol: "BTC-USD", label: "Bitcoin",  category: "crypto" },
  { symbol: "ETH-USD", label: "Ethereum", category: "crypto" },
  { symbol: "^NSEI",   label: "NIFTY 50", category: "indices" },
  { symbol: "^BSESN",  label: "SENSEX",   category: "indices" },
  { symbol: "INR=X",   label: "USD/INR",  category: "forex" },
  { symbol: "GC=F",    label: "Gold",     category: "commodities" },
];

export const NSE_SYMBOLS: CatalogEntry[] = [
  { symbol: "RELIANCE.NS",   label: "Reliance Industries",      category: "nse" },
  { symbol: "TCS.NS",        label: "Tata Consultancy Services",category: "nse" },
  { symbol: "HDFCBANK.NS",   label: "HDFC Bank",                category: "nse" },
  { symbol: "ICICIBANK.NS",  label: "ICICI Bank",               category: "nse" },
  { symbol: "INFY.NS",       label: "Infosys",                  category: "nse" },
  { symbol: "HINDUNILVR.NS", label: "Hindustan Unilever",       category: "nse" },
  { symbol: "ITC.NS",        label: "ITC",                      category: "nse" },
  { symbol: "SBIN.NS",       label: "State Bank of India",      category: "nse" },
  { symbol: "BHARTIARTL.NS", label: "Bharti Airtel",            category: "nse" },
  { symbol: "KOTAKBANK.NS",  label: "Kotak Mahindra Bank",      category: "nse" },
  { symbol: "LT.NS",         label: "Larsen & Toubro",          category: "nse" },
  { symbol: "AXISBANK.NS",   label: "Axis Bank",                category: "nse" },
  { symbol: "ASIANPAINT.NS", label: "Asian Paints",             category: "nse" },
  { symbol: "MARUTI.NS",     label: "Maruti Suzuki",            category: "nse" },
  { symbol: "HCLTECH.NS",    label: "HCL Technologies",         category: "nse" },
  { symbol: "BAJFINANCE.NS", label: "Bajaj Finance",            category: "nse" },
  { symbol: "WIPRO.NS",      label: "Wipro",                    category: "nse" },
  { symbol: "M&M.NS",        label: "Mahindra & Mahindra",      category: "nse" },
  { symbol: "TITAN.NS",      label: "Titan Company",            category: "nse" },
  { symbol: "ULTRACEMCO.NS", label: "UltraTech Cement",         category: "nse" },
  { symbol: "SUNPHARMA.NS",  label: "Sun Pharmaceutical",       category: "nse" },
  { symbol: "NTPC.NS",       label: "NTPC",                     category: "nse" },
  { symbol: "POWERGRID.NS",  label: "Power Grid",               category: "nse" },
  { symbol: "NESTLEIND.NS",  label: "Nestle India",             category: "nse" },
  { symbol: "ADANIENT.NS",   label: "Adani Enterprises",        category: "nse" },
  { symbol: "TATAMOTORS.NS", label: "Tata Motors",              category: "nse" },
  { symbol: "JSWSTEEL.NS",   label: "JSW Steel",                category: "nse" },
  { symbol: "ONGC.NS",       label: "ONGC",                     category: "nse" },
  { symbol: "TATASTEEL.NS",  label: "Tata Steel",               category: "nse" },
  { symbol: "COALINDIA.NS",  label: "Coal India",               category: "nse" },
  { symbol: "BAJAJFINSV.NS", label: "Bajaj Finserv",            category: "nse" },
  { symbol: "TECHM.NS",      label: "Tech Mahindra",            category: "nse" },
  { symbol: "HDFCLIFE.NS",   label: "HDFC Life Insurance",      category: "nse" },
  { symbol: "SBILIFE.NS",    label: "SBI Life Insurance",       category: "nse" },
  { symbol: "DRREDDY.NS",    label: "Dr. Reddy's Labs",         category: "nse" },
  { symbol: "BRITANNIA.NS",  label: "Britannia Industries",     category: "nse" },
  { symbol: "GRASIM.NS",     label: "Grasim Industries",        category: "nse" },
  { symbol: "CIPLA.NS",      label: "Cipla",                    category: "nse" },
  { symbol: "INDUSINDBK.NS", label: "IndusInd Bank",            category: "nse" },
  { symbol: "DIVISLAB.NS",   label: "Divi's Labs",              category: "nse" },
  { symbol: "BAJAJ-AUTO.NS", label: "Bajaj Auto",               category: "nse" },
  { symbol: "ADANIPORTS.NS", label: "Adani Ports",              category: "nse" },
  { symbol: "EICHERMOT.NS",  label: "Eicher Motors",            category: "nse" },
  { symbol: "APOLLOHOSP.NS", label: "Apollo Hospitals",         category: "nse" },
  { symbol: "HEROMOTOCO.NS", label: "Hero MotoCorp",            category: "nse" },
  { symbol: "TATACONSUM.NS", label: "Tata Consumer Products",   category: "nse" },
  { symbol: "BPCL.NS",       label: "BPCL",                     category: "nse" },
  { symbol: "UPL.NS",        label: "UPL",                      category: "nse" },
  { symbol: "SHRIRAMFIN.NS", label: "Shriram Finance",          category: "nse" },
  { symbol: "LTIM.NS",       label: "LTIMindtree",              category: "nse" },
];

export const US_SYMBOLS: CatalogEntry[] = [
  { symbol: "AAPL",  label: "Apple",            category: "us" },
  { symbol: "MSFT",  label: "Microsoft",        category: "us" },
  { symbol: "NVDA",  label: "Nvidia",           category: "us" },
  { symbol: "GOOGL", label: "Alphabet",         category: "us" },
  { symbol: "AMZN",  label: "Amazon",           category: "us" },
  { symbol: "META",  label: "Meta Platforms",   category: "us" },
  { symbol: "TSLA",  label: "Tesla",            category: "us" },
  { symbol: "BRK-B", label: "Berkshire Hathaway", category: "us" },
  { symbol: "JPM",   label: "JPMorgan Chase",   category: "us" },
  { symbol: "V",     label: "Visa",             category: "us" },
  { symbol: "WMT",   label: "Walmart",          category: "us" },
  { symbol: "MA",    label: "Mastercard",       category: "us" },
  { symbol: "JNJ",   label: "Johnson & Johnson",category: "us" },
  { symbol: "PG",    label: "Procter & Gamble", category: "us" },
  { symbol: "XOM",   label: "ExxonMobil",       category: "us" },
  { symbol: "HD",    label: "Home Depot",       category: "us" },
  { symbol: "CVX",   label: "Chevron",          category: "us" },
  { symbol: "ABBV",  label: "AbbVie",           category: "us" },
  { symbol: "KO",    label: "Coca-Cola",        category: "us" },
  { symbol: "PEP",   label: "PepsiCo",          category: "us" },
  { symbol: "AVGO",  label: "Broadcom",         category: "us" },
  { symbol: "MRK",   label: "Merck",            category: "us" },
  { symbol: "LLY",   label: "Eli Lilly",        category: "us" },
  { symbol: "BAC",   label: "Bank of America",  category: "us" },
  { symbol: "ORCL",  label: "Oracle",           category: "us" },
  { symbol: "COST",  label: "Costco",           category: "us" },
  { symbol: "ADBE",  label: "Adobe",            category: "us" },
  { symbol: "MCD",   label: "McDonald's",       category: "us" },
  { symbol: "CSCO",  label: "Cisco",            category: "us" },
  { symbol: "CRM",   label: "Salesforce",       category: "us" },
];

export const INDEX_SYMBOLS: CatalogEntry[] = [
  { symbol: "^NSEI",   label: "NIFTY 50",   category: "indices" },
  { symbol: "^BSESN",  label: "SENSEX",     category: "indices" },
  { symbol: "^GSPC",   label: "S&P 500",    category: "indices" },
  { symbol: "^IXIC",   label: "Nasdaq",     category: "indices" },
  { symbol: "^DJI",    label: "Dow Jones",  category: "indices" },
  { symbol: "^N225",   label: "Nikkei 225", category: "indices" },
  { symbol: "^FTSE",   label: "FTSE 100",   category: "indices" },
  { symbol: "^GDAXI",  label: "DAX",        category: "indices" },
  { symbol: "^HSI",    label: "Hang Seng",  category: "indices" },
];

export const COMMODITY_SYMBOLS: CatalogEntry[] = [
  { symbol: "GC=F", label: "Gold",        category: "commodities" },
  { symbol: "SI=F", label: "Silver",      category: "commodities" },
  { symbol: "CL=F", label: "Crude Oil",   category: "commodities" },
  { symbol: "NG=F", label: "Natural Gas", category: "commodities" },
];

export const FOREX_SYMBOLS: CatalogEntry[] = [
  { symbol: "INR=X",    label: "USD/INR", category: "forex" },
  { symbol: "EURINR=X", label: "EUR/INR", category: "forex" },
  { symbol: "GBPINR=X", label: "GBP/INR", category: "forex" },
  { symbol: "EUR=X",    label: "USD/EUR", category: "forex" },
  { symbol: "JPY=X",    label: "USD/JPY", category: "forex" },
];

export const CATEGORY_MAP: Record<string, CatalogEntry[]> = {
  nse: NSE_SYMBOLS,
  us: US_SYMBOLS,
  indices: INDEX_SYMBOLS,
  commodities: COMMODITY_SYMBOLS,
  forex: FOREX_SYMBOLS,
};

// Used by the movers endpoint — union of all non-crypto Yahoo symbols
export const ALL_YAHOO_SYMBOLS: CatalogEntry[] = [
  ...NSE_SYMBOLS,
  ...US_SYMBOLS,
  ...INDEX_SYMBOLS,
  ...COMMODITY_SYMBOLS,
  ...FOREX_SYMBOLS,
];
```

- [ ] **Step 2: TypeScript check**

```
pnpm --filter backend-api check-types
```

Expected: no errors.

- [ ] **Step 3: Commit**

```bash
git add apps/backend-api/src/services/market-catalog.ts
git commit -m "feat(api): add multi-category market symbol catalog"
```

---

## Task 2: CoinGecko service

**Files:**
- Create: `apps/backend-api/src/services/coingecko.service.ts`

- [ ] **Step 1: Create the CoinGecko service**

Write `apps/backend-api/src/services/coingecko.service.ts`:

```typescript
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
```

- [ ] **Step 2: TypeScript check**

```
pnpm --filter backend-api check-types
```

- [ ] **Step 3: Commit**

```bash
git add apps/backend-api/src/services/coingecko.service.ts
git commit -m "feat(api): add CoinGecko service for top-N crypto"
```

---

## Task 3: Extend market service — marquee switch + category + movers

**Files:**
- Modify: `apps/backend-api/src/services/market.service.ts`

- [ ] **Step 1: Replace SYMBOLS with the marquee constant and add new exports**

Open `apps/backend-api/src/services/market.service.ts` and read the existing content. The file currently has a hardcoded `SYMBOLS` array. Replace that array's definition with an import from the catalog and add new functions.

At the top of the file, after the existing `import { getRedis } from "../lib/redis";` line, add:

```typescript
import {
  MARQUEE_SYMBOLS,
  CATEGORY_MAP,
  ALL_YAHOO_SYMBOLS,
  type CatalogEntry,
} from "./market-catalog";
```

Replace the existing `SYMBOLS` definition (the hardcoded array of 6 objects) with:

```typescript
export const SYMBOLS: CatalogEntry[] = MARQUEE_SYMBOLS;
```

This preserves the existing `SYMBOLS` export name so the routes don't break.

- [ ] **Step 2: Add `getCategoryQuotes()` to market.service.ts**

Find the end of `getMarketQuotes()` (it ends with `return quotes;`). Below it, add:

```typescript
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
```

- [ ] **Step 3: Add `getMovers()` to market.service.ts**

After `getCategoryQuotes`, add:

```typescript
import { getTopCrypto } from "./coingecko.service";

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

  // Fetch all yahoo symbols + crypto in parallel
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
```

Also move the `import { getTopCrypto }` line to the top of the file with the other imports (don't leave it mid-file).

- [ ] **Step 4: TypeScript check**

```
pnpm --filter backend-api check-types
```

Expected: no errors.

- [ ] **Step 5: Commit**

```bash
git add apps/backend-api/src/services/market.service.ts
git commit -m "feat(api): add category quotes + global movers to market service"
```

---

## Task 4: Backend routes for category, crypto-top, and movers

**Files:**
- Modify: `apps/backend-api/src/routes/meta.ts`

- [ ] **Step 1: Add the imports**

Open `apps/backend-api/src/routes/meta.ts`. After the existing `import { getMarketHistory, SYMBOLS } from "../services/market.service";` line, add:

```typescript
import { getCategoryQuotes, getMovers } from "../services/market.service";
import { getTopCrypto } from "../services/coingecko.service";
import { CATEGORY_MAP } from "../services/market-catalog";
```

- [ ] **Step 2: Add the three new routes**

Find `export default router;` near the end of the file. Add these routes BEFORE that line:

```typescript
const ALLOWED_CATEGORIES = Object.keys(CATEGORY_MAP);

/**
 * GET /meta/market/category?name=nse
 */
router.get("/market/category", async (req, res, next) => {
  try {
    const name = String(req.query.name || "");
    if (!ALLOWED_CATEGORIES.includes(name)) {
      return res.status(400).json({ error: "unknown_category" });
    }
    const quotes = await getCategoryQuotes(name);
    res.json(quotes);
  } catch (err) {
    next(err);
  }
});

/**
 * GET /meta/market/crypto-top?limit=50
 */
router.get("/market/crypto-top", async (req, res, next) => {
  try {
    const raw = Number(req.query.limit ?? 50);
    const limit = Number.isFinite(raw) && raw > 0 && raw <= 100 ? raw : 50;
    const quotes = await getTopCrypto(limit);
    res.json(quotes);
  } catch (err) {
    next(err);
  }
});

/**
 * GET /meta/market/movers
 */
router.get("/market/movers", async (_req, res, next) => {
  try {
    const movers = await getMovers();
    res.json(movers);
  } catch (err) {
    next(err);
  }
});
```

- [ ] **Step 3: TypeScript check**

```
pnpm --filter backend-api check-types
```

Expected: no errors.

- [ ] **Step 4: Manual smoke test**

In a separate terminal start the backend (`pnpm dev:backend`), then run:

```powershell
curl http://localhost:4000/meta/market
curl "http://localhost:4000/meta/market/category?name=nse"
curl "http://localhost:4000/meta/market/category?name=indices"
curl http://localhost:4000/meta/market/crypto-top
curl http://localhost:4000/meta/market/movers
```

Expected:
- `/meta/market` returns 6 marquee assets including NIFTY 50, SENSEX, USD/INR, Gold, BTC, ETH
- `/meta/market/category?name=nse` returns ~50 NSE quotes
- `/meta/market/crypto-top` returns 50 crypto quotes with `marketCap` and `image`
- `/meta/market/movers` returns `{ gainers: [5], losers: [5] }`

- [ ] **Step 5: Commit**

```bash
git add apps/backend-api/src/routes/meta.ts
git commit -m "feat(api): add category, crypto-top, and movers routes"
```

---

## Task 5: Frontend types + API client methods

**Files:**
- Modify: `apps/frontend-web/lib/types.ts`
- Modify: `apps/frontend-web/lib/api-client.ts`

- [ ] **Step 1: Add new types**

Open `apps/frontend-web/lib/types.ts`. Append at the end:

```typescript
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

export interface Movers {
  gainers: MarketQuote[];
  losers: MarketQuote[];
}

export type MarketCategory = "nse" | "us" | "indices" | "commodities" | "forex";
```

- [ ] **Step 2: Update API client**

Open `apps/frontend-web/lib/api-client.ts`. Add `CryptoQuote`, `Movers`, `MarketCategory` to the existing top-level `import type` from `./types`:

```typescript
import type { Article, FeedResponse, SearchResult, UserPreferences, CategoriesResponse, SourcesResponse, MarketQuote, MarketHistory, MarketSymbol, CryptoQuote, Movers, MarketCategory } from "./types";
```

Then add these three methods inside the `ApiClient` class, after `getMarketSymbols()` and before the closing brace:

```typescript
async getMarketCategory(name: MarketCategory): Promise<MarketQuote[]> {
  return this.fetch(`/meta/market/category?name=${name}`);
}

async getCryptoTop(limit = 50): Promise<CryptoQuote[]> {
  return this.fetch(`/meta/market/crypto-top?limit=${limit}`);
}

async getMarketMovers(): Promise<Movers> {
  return this.fetch("/meta/market/movers");
}
```

- [ ] **Step 3: TypeScript check**

```
pnpm --filter frontend-web check-types
```

Expected: no errors.

- [ ] **Step 4: Commit**

```bash
git add apps/frontend-web/lib/types.ts apps/frontend-web/lib/api-client.ts
git commit -m "feat(frontend): add types + client methods for category/crypto/movers"
```

---

## Task 6: TopGainerRow component + sidebar widget integration

**Files:**
- Create: `apps/frontend-web/components/markets/TopGainerRow.tsx`
- Modify: `apps/frontend-web/components/markets/MarketSidebarWidget.tsx`

- [ ] **Step 1: Create `TopGainerRow.tsx`**

```typescript
"use client";

import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { apiClient } from "@/lib/api-client";
import { Flame } from "lucide-react";
import type { ReactElement } from "react";

export function TopGainerRow(): ReactElement | null {
  const router = useRouter();
  const { data: movers } = useQuery({
    queryKey: ["market-movers"],
    queryFn: () => apiClient.getMarketMovers(),
    refetchInterval: 60000,
    staleTime: 60000,
  });

  const top = movers?.gainers[0];
  if (!top) return null;

  return (
    <button
      onClick={() => router.push(`/markets?symbol=${encodeURIComponent(top.symbol)}`)}
      className="w-full text-left rounded-xl px-3 py-2 mb-2 bg-gradient-to-r from-emerald-50 to-white border border-emerald-200 hover:from-emerald-100 hover:to-emerald-50 transition-colors"
    >
      <div className="flex items-center gap-2">
        <Flame className="h-4 w-4 text-emerald-600 shrink-0" />
        <div className="flex-1 min-w-0">
          <p className="text-xs font-bold text-emerald-700 truncate">
            🔥 Top Gainer · {top.label}
          </p>
          <p className="text-xs font-mono text-emerald-600 mt-0.5">
            +{top.changePercent.toFixed(2)}%
          </p>
        </div>
      </div>
    </button>
  );
}
```

- [ ] **Step 2: Wire `TopGainerRow` into `MarketSidebarWidget`**

Open `apps/frontend-web/components/markets/MarketSidebarWidget.tsx`. Add the import after existing imports:

```typescript
import { TopGainerRow } from "./TopGainerRow";
```

Inside the returned JSX, add `<TopGainerRow />` immediately after the `<h3>` header and before the `{quotesLoading ? (...) : (...)}` block. So the structure becomes:

```typescript
return (
  <div className="bg-white border border-[#c8ddf5] rounded-2xl p-4 shadow-sm shadow-blue-900/4">
    <h3 className="flex items-center gap-2 text-sm font-semibold text-[#003366] mb-3">
      <BarChart2 className="h-4 w-4 text-[#007acc]" />
      Markets
    </h3>

    <TopGainerRow />

    {quotesLoading ? (
      // existing loading block ...
```

- [ ] **Step 3: TypeScript check**

```
pnpm --filter frontend-web check-types
```

- [ ] **Step 4: Commit**

```bash
git add apps/frontend-web/components/markets/TopGainerRow.tsx apps/frontend-web/components/markets/MarketSidebarWidget.tsx
git commit -m "feat(frontend): add top gainer highlight row to sidebar widget"
```

---

## Task 7: MoversPanel component

**Files:**
- Create: `apps/frontend-web/components/markets/MoversPanel.tsx`

- [ ] **Step 1: Create the component**

```typescript
"use client";

import { useQuery } from "@tanstack/react-query";
import { apiClient } from "@/lib/api-client";
import { Skeleton } from "@/components/ui/skeleton";
import { TrendingUp, TrendingDown } from "lucide-react";
import type { ReactElement } from "react";
import type { MarketQuote } from "@/lib/types";

interface MoversPanelProps {
  onSelectSymbol: (symbol: string) => void;
}

function MoverRow({
  rank,
  quote,
  positive,
  onClick,
}: {
  rank: number;
  quote: MarketQuote;
  positive: boolean;
  onClick: () => void;
}): ReactElement {
  return (
    <button
      onClick={onClick}
      className="w-full flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-[#f0f7ff] transition-colors text-left"
    >
      <span className="text-xs font-bold text-[#4a6890] w-5 shrink-0">{rank}</span>
      <div className="flex-1 min-w-0">
        <p className="text-sm font-bold text-[#003366] truncate">{quote.label}</p>
        <p className="text-xs font-mono text-[#4a6890]">
          {quote.price.toLocaleString("en-US", {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          })}
        </p>
      </div>
      <span
        className={`text-sm font-semibold shrink-0 ${
          positive ? "text-emerald-600" : "text-red-500"
        }`}
      >
        {positive ? "+" : ""}
        {quote.changePercent.toFixed(2)}%
      </span>
    </button>
  );
}

export function MoversPanel({ onSelectSymbol }: MoversPanelProps): ReactElement {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["market-movers"],
    queryFn: () => apiClient.getMarketMovers(),
    refetchInterval: 60000,
    staleTime: 60000,
  });

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {/* Gainers */}
      <div className="bg-white border border-[#c8ddf5] rounded-2xl p-5 shadow-sm shadow-blue-900/4">
        <h3 className="flex items-center gap-2 text-sm font-bold text-emerald-700 mb-4">
          <TrendingUp className="h-4 w-4" />
          Top Gainers
        </h3>
        {isLoading ? (
          <div className="space-y-2">
            {[1, 2, 3, 4, 5].map((i) => (
              <Skeleton key={i} className="h-12 w-full rounded-lg bg-[#e8f2ff]" />
            ))}
          </div>
        ) : isError || !data ? (
          <p className="text-xs text-[#4a6890] py-2">Unable to load movers.</p>
        ) : (
          <div className="space-y-1">
            {data.gainers.map((quote, i) => (
              <MoverRow
                key={quote.symbol}
                rank={i + 1}
                quote={quote}
                positive
                onClick={() => onSelectSymbol(quote.symbol)}
              />
            ))}
          </div>
        )}
      </div>

      {/* Losers */}
      <div className="bg-white border border-[#c8ddf5] rounded-2xl p-5 shadow-sm shadow-blue-900/4">
        <h3 className="flex items-center gap-2 text-sm font-bold text-red-600 mb-4">
          <TrendingDown className="h-4 w-4" />
          Top Losers
        </h3>
        {isLoading ? (
          <div className="space-y-2">
            {[1, 2, 3, 4, 5].map((i) => (
              <Skeleton key={i} className="h-12 w-full rounded-lg bg-[#e8f2ff]" />
            ))}
          </div>
        ) : isError || !data ? (
          <p className="text-xs text-[#4a6890] py-2">Unable to load movers.</p>
        ) : (
          <div className="space-y-1">
            {data.losers.map((quote, i) => (
              <MoverRow
                key={quote.symbol}
                rank={i + 1}
                quote={quote}
                positive={false}
                onClick={() => onSelectSymbol(quote.symbol)}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
```

- [ ] **Step 2: TypeScript check**

```
pnpm --filter frontend-web check-types
```

- [ ] **Step 3: Commit**

```bash
git add apps/frontend-web/components/markets/MoversPanel.tsx
git commit -m "feat(frontend): add MoversPanel (top gainers / top losers)"
```

---

## Task 8: CategoryList component (used by Crypto + non-crypto category tabs)

**Files:**
- Create: `apps/frontend-web/components/markets/CategoryList.tsx`

- [ ] **Step 1: Create the component**

```typescript
"use client";

import { useMemo, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { apiClient } from "@/lib/api-client";
import { SparklineChart } from "./SparklineChart";
import { Skeleton } from "@/components/ui/skeleton";
import type { ReactElement } from "react";
import type { MarketQuote, CryptoQuote, MarketCategory, MarketHistory } from "@/lib/types";

interface CategoryListProps {
  // Either "crypto" (uses /crypto-top) or a MarketCategory (uses /category)
  category: MarketCategory | "crypto";
  onSelectSymbol: (symbol: string) => void;
}

type Row = {
  symbol: string;
  label: string;
  price: number;
  changePercent: number;
  image?: string;
};

export function CategoryList({ category, onSelectSymbol }: CategoryListProps): ReactElement {
  const [sortBy, setSortBy] = useState<"change" | "label">("change");

  const cryptoQuery = useQuery<CryptoQuote[]>({
    queryKey: ["market-crypto-top"],
    queryFn: () => apiClient.getCryptoTop(50),
    enabled: category === "crypto",
    staleTime: 300000,
  });

  const categoryQuery = useQuery<MarketQuote[]>({
    queryKey: ["market-category", category],
    queryFn: () => apiClient.getMarketCategory(category as MarketCategory),
    enabled: category !== "crypto",
    staleTime: 300000,
  });

  const rows: Row[] = useMemo(() => {
    if (category === "crypto") {
      return (cryptoQuery.data ?? []).map((c) => ({
        symbol: c.symbol,
        label: c.label,
        price: c.price,
        changePercent: c.changePercent,
        image: c.image,
      }));
    }
    return (categoryQuery.data ?? []).map((q) => ({
      symbol: q.symbol,
      label: q.label,
      price: q.price,
      changePercent: q.changePercent,
    }));
  }, [category, cryptoQuery.data, categoryQuery.data]);

  const sorted = useMemo(() => {
    const out = [...rows];
    if (sortBy === "change") out.sort((a, b) => b.changePercent - a.changePercent);
    else out.sort((a, b) => a.label.localeCompare(b.label));
    return out;
  }, [rows, sortBy]);

  // Sparkline 1d for visible symbols (yahoo-backed categories only — crypto sparklines would
  // require a separate endpoint, deferred)
  const symbolsForSparklines = category === "crypto" ? [] : sorted.map((r) => r.symbol);
  const { data: histories } = useQuery({
    queryKey: ["market-sparklines", category, symbolsForSparklines],
    queryFn: async () => {
      const results = await Promise.all(
        symbolsForSparklines.map((s) =>
          apiClient.getMarketHistory(s, "1d").catch(() => null)
        )
      );
      const map: Record<string, MarketHistory> = {};
      symbolsForSparklines.forEach((s, i) => {
        const r = results[i];
        if (r) map[s] = r;
      });
      return map;
    },
    enabled: symbolsForSparklines.length > 0,
    staleTime: 300000,
  });

  const isLoading = category === "crypto" ? cryptoQuery.isLoading : categoryQuery.isLoading;
  const isError = category === "crypto" ? cryptoQuery.isError : categoryQuery.isError;

  return (
    <div className="bg-white border border-[#c8ddf5] rounded-2xl shadow-sm shadow-blue-900/4">
      {/* Header / sort */}
      <div className="flex items-center justify-between px-5 py-4 border-b border-[#c8ddf5]">
        <p className="text-sm font-semibold text-[#003366]">
          {sorted.length} {sorted.length === 1 ? "asset" : "assets"}
        </p>
        <div className="flex gap-1 p-1 bg-[#f0f7ff] rounded-lg">
          <button
            onClick={() => setSortBy("change")}
            className={`px-3 py-1 rounded text-xs font-semibold transition-colors ${
              sortBy === "change" ? "bg-[#003366] text-white" : "text-[#4a6890] hover:text-[#003366]"
            }`}
          >
            By % change
          </button>
          <button
            onClick={() => setSortBy("label")}
            className={`px-3 py-1 rounded text-xs font-semibold transition-colors ${
              sortBy === "label" ? "bg-[#003366] text-white" : "text-[#4a6890] hover:text-[#003366]"
            }`}
          >
            A–Z
          </button>
        </div>
      </div>

      {/* List */}
      <div className="max-h-[600px] overflow-y-auto">
        {isLoading ? (
          <div className="p-5 space-y-2">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <Skeleton key={i} className="h-14 w-full rounded-xl bg-[#e8f2ff]" />
            ))}
          </div>
        ) : isError ? (
          <p className="p-5 text-sm text-[#4a6890]">Unable to load data.</p>
        ) : sorted.length === 0 ? (
          <p className="p-5 text-sm text-[#4a6890]">No data available for this category.</p>
        ) : (
          <ul>
            {sorted.map((row, i) => {
              const positive = row.changePercent >= 0;
              const history = histories?.[row.symbol];
              return (
                <li key={row.symbol}>
                  <button
                    onClick={() => onSelectSymbol(row.symbol)}
                    className="w-full flex items-center gap-3 px-5 py-3 hover:bg-[#f0f7ff] transition-colors text-left border-b border-[#e8f2ff] last:border-b-0"
                  >
                    <span className="text-xs font-bold text-[#4a6890] w-6 shrink-0">
                      {i + 1}
                    </span>
                    {row.image ? (
                      <img
                        src={row.image}
                        alt=""
                        className="h-7 w-7 rounded-full shrink-0"
                      />
                    ) : (
                      <div className="h-7 w-7 rounded-full bg-[#e8f2ff] shrink-0" />
                    )}
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-bold text-[#003366] truncate">
                        {row.label}
                      </p>
                      <p className="text-xs font-mono text-[#4a6890]">
                        {row.price.toLocaleString("en-US", {
                          minimumFractionDigits: 2,
                          maximumFractionDigits: 2,
                        })}
                      </p>
                    </div>
                    {history && history.points.length > 0 && (
                      <div className="w-24 h-10 shrink-0">
                        <SparklineChart
                          points={history.points}
                          isPositive={positive}
                          height={40}
                        />
                      </div>
                    )}
                    <span
                      className={`text-sm font-semibold shrink-0 min-w-[64px] text-right ${
                        positive ? "text-emerald-600" : "text-red-500"
                      }`}
                    >
                      {positive ? "+" : ""}
                      {row.changePercent.toFixed(2)}%
                    </span>
                  </button>
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </div>
  );
}
```

- [ ] **Step 2: TypeScript check**

```
pnpm --filter frontend-web check-types
```

- [ ] **Step 3: Commit**

```bash
git add apps/frontend-web/components/markets/CategoryList.tsx
git commit -m "feat(frontend): add CategoryList component for multi-category market view"
```

---

## Task 9: MarketTabs component

**Files:**
- Create: `apps/frontend-web/components/markets/MarketTabs.tsx`

- [ ] **Step 1: Create the component**

```typescript
"use client";

import type { ReactElement } from "react";

export type MarketTabKey =
  | "movers"
  | "crypto"
  | "nse"
  | "us"
  | "indices"
  | "commodities"
  | "forex";

const TABS: { key: MarketTabKey; label: string }[] = [
  { key: "movers",      label: "Movers" },
  { key: "crypto",      label: "Crypto" },
  { key: "nse",         label: "Indian Stocks" },
  { key: "us",          label: "US Stocks" },
  { key: "indices",     label: "Indices" },
  { key: "commodities", label: "Commodities" },
  { key: "forex",       label: "Forex" },
];

interface MarketTabsProps {
  active: MarketTabKey;
  onChange: (tab: MarketTabKey) => void;
}

export function MarketTabs({ active, onChange }: MarketTabsProps): ReactElement {
  return (
    <div className="sticky top-0 z-10 bg-[#f8fafd] -mx-6 px-6 mb-6 border-b border-[#c8ddf5]">
      <div className="flex gap-1 overflow-x-auto scrollbar-hide py-3">
        {TABS.map((tab) => (
          <button
            key={tab.key}
            onClick={() => onChange(tab.key)}
            className={`px-4 py-2 rounded-xl text-sm font-semibold whitespace-nowrap transition-colors ${
              active === tab.key
                ? "bg-[#003366] text-white shadow-sm shadow-blue-900/20"
                : "text-[#4a6890] hover:text-[#003366] hover:bg-[#e8f2ff]"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>
    </div>
  );
}

export { TABS as MARKET_TABS };
```

- [ ] **Step 2: TypeScript check**

```
pnpm --filter frontend-web check-types
```

- [ ] **Step 3: Commit**

```bash
git add apps/frontend-web/components/markets/MarketTabs.tsx
git commit -m "feat(frontend): add MarketTabs sticky tab bar"
```

---

## Task 10: Rewrite `/markets` page with tabbed layout

**Files:**
- Modify: `apps/frontend-web/app/(app)/markets/page.tsx`

- [ ] **Step 1: Replace the existing page content**

Open `apps/frontend-web/app/(app)/markets/page.tsx`. Replace the **entire file** with:

```typescript
"use client";

import { useState, useEffect, Suspense } from "react";
import { useQuery } from "@tanstack/react-query";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { apiClient } from "@/lib/api-client";
import { FullChart } from "@/components/markets/FullChart";
import { MoversPanel } from "@/components/markets/MoversPanel";
import { CategoryList } from "@/components/markets/CategoryList";
import { MarketTabs, type MarketTabKey } from "@/components/markets/MarketTabs";
import { Skeleton } from "@/components/ui/skeleton";
import { TrendingUp, TrendingDown } from "lucide-react";
import type { ReactElement } from "react";

const RANGES = [
  { label: "1D", value: "1d" },
  { label: "1W", value: "1w" },
  { label: "1M", value: "1m" },
];

const VALID_TABS: MarketTabKey[] = [
  "movers", "crypto", "nse", "us", "indices", "commodities", "forex",
];

function MarketsPageContent(): ReactElement {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const initialTabRaw = (searchParams.get("tab") ?? "movers") as MarketTabKey;
  const initialTab = VALID_TABS.includes(initialTabRaw) ? initialTabRaw : "movers";
  const initialSymbol = searchParams.get("symbol") ?? "BTC-USD";

  const [activeTab, setActiveTab] = useState<MarketTabKey>(initialTab);
  const [selectedSymbol, setSelectedSymbol] = useState(initialSymbol);
  const [selectedRange, setSelectedRange] = useState("1d");

  // Sync state from URL changes (back/forward, deep links)
  useEffect(() => {
    const t = searchParams.get("tab") as MarketTabKey | null;
    if (t && VALID_TABS.includes(t)) setActiveTab(t);
    const s = searchParams.get("symbol");
    if (s) setSelectedSymbol(s);
  }, [searchParams]);

  const updateUrl = (tab: MarketTabKey, symbol: string) => {
    const params = new URLSearchParams();
    params.set("tab", tab);
    params.set("symbol", symbol);
    router.replace(`${pathname}?${params.toString()}`, { scroll: false });
  };

  const handleTabChange = (tab: MarketTabKey) => {
    setActiveTab(tab);
    updateUrl(tab, selectedSymbol);
  };

  const handleSelectSymbol = (symbol: string) => {
    setSelectedSymbol(symbol);
    updateUrl(activeTab, symbol);
  };

  const { data: history, isLoading: historyLoading } = useQuery({
    queryKey: ["market-history", selectedSymbol, selectedRange],
    queryFn: () => apiClient.getMarketHistory(selectedSymbol, selectedRange),
    staleTime: 300000,
    enabled: !!selectedSymbol,
  });

  const { data: quotes } = useQuery({
    queryKey: ["market"],
    queryFn: () => apiClient.getMarket(),
    refetchInterval: 60000,
    staleTime: 60000,
  });

  const currentQuote = quotes?.find((q) => q.symbol === selectedSymbol);
  const isPositive = (currentQuote?.change ?? history?.change ?? 0) >= 0;
  const displayLabel = history?.label ?? currentQuote?.label ?? selectedSymbol;
  const displayPrice = currentQuote?.price ?? history?.currentPrice ?? 0;
  const displayChange = currentQuote?.change ?? history?.change ?? 0;
  const displayChangePct = currentQuote?.changePercent ?? history?.changePercent ?? 0;

  return (
    <div className="max-w-7xl mx-auto w-full px-6 py-8">
      {/* Page header */}
      <div className="mb-6">
        <h1 className="text-3xl font-extrabold tracking-tight text-[#003366]">Markets</h1>
        <p className="text-sm text-[#4a6890] mt-1">
          Top movers, crypto, Indian and global stocks, indices, commodities, and forex
        </p>
      </div>

      <MarketTabs active={activeTab} onChange={handleTabChange} />

      {/* Tab content */}
      <div className="mb-10">
        {activeTab === "movers" ? (
          <MoversPanel onSelectSymbol={handleSelectSymbol} />
        ) : (
          <CategoryList
            category={activeTab}
            onSelectSymbol={handleSelectSymbol}
          />
        )}
      </div>

      {/* Chart panel — always rendered at the bottom */}
      <div className="bg-white border border-[#c8ddf5] rounded-2xl p-6 shadow-sm shadow-blue-900/4">
        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 mb-6">
          <div>
            <h2 className="text-2xl font-extrabold text-[#003366]">{displayLabel}</h2>
            {(currentQuote || history) && (
              <div className="flex items-baseline gap-3 mt-1">
                <span className="text-3xl font-bold font-mono text-[#0a1628]">
                  {displayPrice.toLocaleString("en-US", {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  })}
                </span>
                <span
                  className={`flex items-center gap-1 text-sm font-semibold ${
                    isPositive ? "text-emerald-600" : "text-red-500"
                  }`}
                >
                  {isPositive ? (
                    <TrendingUp className="h-4 w-4" />
                  ) : (
                    <TrendingDown className="h-4 w-4" />
                  )}
                  {isPositive ? "+" : ""}
                  {displayChange.toFixed(2)} ({isPositive ? "+" : ""}
                  {displayChangePct.toFixed(2)}%)
                </span>
              </div>
            )}
          </div>

          <div className="flex gap-1 p-1 bg-[#f0f7ff] rounded-xl">
            {RANGES.map((r) => (
              <button
                key={r.value}
                onClick={() => setSelectedRange(r.value)}
                className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all ${
                  selectedRange === r.value
                    ? "bg-[#003366] text-white shadow-sm"
                    : "text-[#4a6890] hover:text-[#003366]"
                }`}
              >
                {r.label}
              </button>
            ))}
          </div>
        </div>

        {historyLoading ? (
          <Skeleton className="w-full h-80 rounded-xl bg-[#e8f2ff]" />
        ) : history && history.points.length > 0 ? (
          <FullChart
            points={history.points}
            isPositive={isPositive}
            range={selectedRange}
          />
        ) : (
          <div className="flex items-center justify-center h-80 text-[#4a6890] text-sm">
            No chart data available for {displayLabel}
          </div>
        )}
      </div>
    </div>
  );
}

export default function MarketsPage(): ReactElement {
  return (
    <Suspense>
      <MarketsPageContent />
    </Suspense>
  );
}
```

- [ ] **Step 2: TypeScript check**

```
pnpm --filter frontend-web check-types
```

Expected: no errors.

- [ ] **Step 3: Manual smoke test in browser**

Start `pnpm dev:all` and open `http://localhost:3000/markets`. Verify:
- Default view shows Movers tab with Top Gainers / Top Losers
- Clicking a mover symbol updates the chart panel at the bottom
- Clicking Crypto tab shows ~50 crypto rows with coin icons
- Clicking Indian Stocks tab shows NIFTY 50 names like Reliance, TCS
- Sort toggle (% change / A–Z) reorders the list
- URL updates as you click tabs and rows (`?tab=...&symbol=...`)
- Back/forward in the browser restores the prior tab + symbol

- [ ] **Step 4: Commit**

```bash
git add "apps/frontend-web/app/(app)/markets/page.tsx"
git commit -m "feat(frontend): rewrite /markets as tabbed multi-category layout"
```

---

## Task 11: Note — history endpoint must accept non-marquee symbols

**Files:**
- Modify: `apps/backend-api/src/services/market.service.ts`
- Modify: `apps/backend-api/src/routes/meta.ts`

**Why this task exists:** The existing `getMarketHistory` accepts any symbol, but the existing route validates against `SYMBOLS` (marquee only). Now that the chart panel can be opened for any symbol in the broader catalog, the route's allowlist must widen.

- [ ] **Step 1: Widen the symbol allowlist in the history route**

Open `apps/backend-api/src/routes/meta.ts`. The history route currently has:

```typescript
const allowed = SYMBOLS.map((s) => s.symbol);
if (!allowed.includes(symbol)) {
  return res.status(400).json({ error: "unknown_symbol" });
}
```

Replace those three lines with:

```typescript
const allowed = new Set([
  ...SYMBOLS.map((s) => s.symbol),
  ...ALL_YAHOO_SYMBOLS.map((s) => s.symbol),
]);
if (!allowed.has(symbol)) {
  return res.status(400).json({ error: "unknown_symbol" });
}
```

Add `ALL_YAHOO_SYMBOLS` to the existing market-catalog import at the top of the file:

```typescript
import { CATEGORY_MAP, ALL_YAHOO_SYMBOLS } from "../services/market-catalog";
```

(If the existing `import { CATEGORY_MAP }` line is missing, add the full import.)

**Crypto symbols** (`BTC`, `ETH`, etc.) are NOT in the Yahoo allowlist. For crypto history, the chart will show "No chart data available" — acceptable for v1 (crypto history endpoint can be added later via CoinGecko's `/coins/{id}/market_chart` if needed).

The marquee `BTC-USD` and `ETH-USD` symbols (Yahoo format) are still in `SYMBOLS`, so those still chart correctly via the existing path.

- [ ] **Step 2: TypeScript check**

```
pnpm --filter backend-api check-types
```

- [ ] **Step 3: Manual test**

With the backend running:

```powershell
curl "http://localhost:4000/meta/market/history?symbol=RELIANCE.NS&range=1d"
curl "http://localhost:4000/meta/market/history?symbol=AAPL&range=1w"
curl "http://localhost:4000/meta/market/history?symbol=%5ENSEI&range=1m"
```

Expected: each returns history JSON with `points` array.

- [ ] **Step 4: Commit**

```bash
git add apps/backend-api/src/routes/meta.ts
git commit -m "fix(api): widen history endpoint allowlist to full catalog"
```

---

## Self-Review

**Spec coverage:**
- ✅ Top 50 crypto from CoinGecko — Task 2 + Task 4 (crypto-top route) + Task 8 (CategoryList crypto path)
- ✅ NIFTY 50 NSE stocks — Task 1 catalog + Task 3 getCategoryQuotes + Task 4 category route + Task 8/10 frontend
- ✅ US blue chips, world indices, commodities, forex — same chain
- ✅ Top Movers (gainers + losers) — Task 3 getMovers + Task 4 movers route + Task 7 MoversPanel + Task 10 default tab
- ✅ Sidebar: 6 India-first marquee + Top Gainer highlight — Task 1 MARQUEE_SYMBOLS + Task 3 SYMBOLS switch + Task 6 TopGainerRow
- ✅ /markets tabbed layout — Task 9 MarketTabs + Task 10 rewrite
- ✅ Existing FullChart reused at the bottom — Task 10
- ✅ URL state sync (`?tab=&symbol=`) — Task 10 useEffect + updateUrl
- ✅ Chart works for any catalog symbol — Task 11 widened allowlist
- ✅ Redis caching (60s movers/marquee/category, 300s crypto-top) — Tasks 2, 3
- ✅ Error/empty states — Task 7 isError, Task 8 isError + empty case, Task 10 historyLoading + no-data fallback

**Placeholder scan:** None. All code blocks are complete; no "implement later" or vague references.

**Type consistency:**
- `Quote` (backend) ↔ `MarketQuote` (frontend) — same field shape (label, symbol, category, price, change, changePercent)
- `CryptoQuote` adds `marketCap` and `image` on top of Quote shape, with `category: "crypto"` literal — consistent in `coingecko.service.ts` and `lib/types.ts`
- `Movers { gainers, losers }` — consistent in market.service.ts and lib/types.ts
- `MarketCategory = "nse" | "us" | "indices" | "commodities" | "forex"` — used identically in api-client and CategoryList
- `MarketTabKey` adds `"movers"` and `"crypto"` on top of `MarketCategory` — distinct type, intentional
- `CATEGORY_MAP` keys match `MarketCategory` union exactly
- `MARKET_TABS` in MarketTabs is re-exported (not used in this plan, but available for future)

**Spec gaps found and added during review:** Task 11 (widening history allowlist) was added after realising the existing history route would reject every new symbol — without it the chart panel would 400 on every non-marquee row click.
