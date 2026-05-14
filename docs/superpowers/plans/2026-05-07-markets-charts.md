# Markets Charts Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add live price sparklines to the feed sidebar and a dedicated `/markets` page with full interactive charts for crypto, stocks, and commodities.

**Architecture:** Extend the existing Yahoo Finance backend service to return historical OHLCV data via a new `/meta/market/history` endpoint. The frontend installs recharts and uses it in two places: a compact `MarketSidebarWidget` (sparklines in the feed sidebar) and a full `/markets` page (area chart with range selector and asset tabs). All history is Redis-cached server-side.

**Tech Stack:** Yahoo Finance v8 API (free, no key), recharts, ioredis cache, Next.js App Router, TanStack Query, Tailwind CSS

---

## File Map

**Create:**
- `apps/frontend-web/components/markets/SparklineChart.tsx` — tiny recharts LineChart for sidebar
- `apps/frontend-web/components/markets/MarketSidebarWidget.tsx` — sidebar section with sparklines per asset
- `apps/frontend-web/components/markets/FullChart.tsx` — recharts AreaChart for markets page
- `apps/frontend-web/app/(app)/markets/page.tsx` — full markets page

**Modify:**
- `apps/backend-api/src/services/market.service.ts` — add ETH, Gold, Silver + `getMarketHistory()`
- `apps/backend-api/src/routes/meta.ts` — add `GET /meta/market/history`
- `apps/frontend-web/lib/api-client.ts` — add `getMarketHistory()`
- `apps/frontend-web/lib/types.ts` — add `MarketQuote`, `HistoryPoint`, `MarketHistory` types
- `apps/frontend-web/components/feed/FeedSidebar.tsx` — add `<MarketSidebarWidget />` below Top Sources
- `apps/frontend-web/components/layout/Sidebar.tsx` — add Markets nav item

---

## Task 1: Extend backend market service — more assets + history endpoint

**Files:**
- Modify: `apps/backend-api/src/services/market.service.ts`
- Modify: `apps/backend-api/src/routes/meta.ts`

- [ ] **Step 1: Replace `market.service.ts` with the extended version**

```typescript
// apps/backend-api/src/services/market.service.ts
import { getRedis } from "../lib/redis";

export const SYMBOLS = [
  { symbol: "BTC-USD",  label: "Bitcoin",  category: "crypto" },
  { symbol: "ETH-USD",  label: "Ethereum", category: "crypto" },
  { symbol: "^GSPC",   label: "S&P 500",   category: "stocks" },
  { symbol: "^IXIC",   label: "Nasdaq",    category: "stocks" },
  { symbol: "GC=F",    label: "Gold",      category: "commodities" },
  { symbol: "SI=F",    label: "Silver",    category: "commodities" },
];

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
  if (!res.ok) return null;
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
  const cfg = RANGE_CONFIG[range] ?? RANGE_CONFIG["1d"];
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
  } catch {
    return null;
  }
}
```

- [ ] **Step 2: Check that `meta.service.ts` calls `getMarketQuotes` (not the old function name)**

Open `apps/backend-api/src/services/meta.service.ts` and find where `getMarketData` is defined. It should call `getMarketQuotes()` from market.service.ts. If it's an inline implementation, update it to re-export from market.service.ts:

```typescript
// In meta.service.ts — find the getMarketData function and replace with:
import { getMarketQuotes } from "./market.service";
export { getMarketQuotes as getMarketData };
// (keep the rest of meta.service.ts unchanged)
```

If `getMarketData` in meta.service.ts already calls `getMarketQuotes`, skip this step.

- [ ] **Step 3: Add the history route to `apps/backend-api/src/routes/meta.ts`**

Add before `export default router;`:

```typescript
import { getMarketHistory, SYMBOLS } from "../services/market.service";

/**
 * GET /meta/market/history?symbol=BTC-USD&range=1d
 * range: "1d" | "1w" | "1m"
 */
router.get("/market/history", async (req, res, next) => {
  try {
    const symbol = String(req.query.symbol || "BTC-USD");
    const range = String(req.query.range || "1d");
    const allowed = SYMBOLS.map((s) => s.symbol);
    if (!allowed.includes(symbol)) {
      return res.status(400).json({ error: "unknown_symbol" });
    }
    const data = await getMarketHistory(symbol, range);
    if (!data) return res.status(502).json({ error: "upstream_failed" });
    res.json(data);
  } catch (err) {
    next(err);
  }
});

/**
 * GET /meta/market/symbols
 * Returns list of tracked symbols with labels and categories
 */
router.get("/market/symbols", async (_req, res) => {
  res.json(SYMBOLS);
});
```

Also add the two imports at the top of `meta.ts` (after existing imports):
```typescript
import { getMarketHistory, SYMBOLS } from "../services/market.service";
```

- [ ] **Step 4: Test the endpoints manually**

With the backend running (`pnpm dev:backend`):

```powershell
# Should return 6 symbols including ETH, Gold, Silver
curl http://localhost:4000/meta/market

# Should return sparkline points for BTC 1-day
curl "http://localhost:4000/meta/market/history?symbol=BTC-USD&range=1d"

# Should return Gold 1-week
curl "http://localhost:4000/meta/market/history?symbol=GC=F&range=1w"
```

Expected: JSON with `symbol`, `points` (array of `{t, c}`), `currentPrice`, `change`, `changePercent`.

- [ ] **Step 5: Commit**

```bash
git add apps/backend-api/src/services/market.service.ts apps/backend-api/src/routes/meta.ts
git commit -m "feat(api): add ETH/Gold/Silver quotes + market history endpoint"
```

---

## Task 2: Install recharts + add frontend types + API client method

**Files:**
- Modify: `apps/frontend-web/package.json` (via pnpm install)
- Modify: `apps/frontend-web/lib/types.ts`
- Modify: `apps/frontend-web/lib/api-client.ts`

- [ ] **Step 1: Install recharts**

```powershell
pnpm --filter frontend-web add recharts
```

Expected output: recharts added to `apps/frontend-web/package.json` dependencies.

- [ ] **Step 2: Add market types to `apps/frontend-web/lib/types.ts`**

Append to the end of the file:

```typescript
export interface MarketQuote {
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

export interface MarketSymbol {
  symbol: string;
  label: string;
  category: string;
}
```

- [ ] **Step 3: Add `getMarketHistory` and `getMarketSymbols` to `apps/frontend-web/lib/api-client.ts`**

In the `ApiClient` class, add these methods after `getMarket()`:

```typescript
async getMarketHistory(symbol: string, range: string): Promise<import("./types").MarketHistory> {
  return this.fetch(`/meta/market/history?symbol=${encodeURIComponent(symbol)}&range=${range}`);
}

async getMarketSymbols(): Promise<import("./types").MarketSymbol[]> {
  return this.fetch("/meta/market/symbols");
}
```

Also update the return type of `getMarket()` from `Array<{label,symbol,price,change,changePercent}>` to `import("./types").MarketQuote[]`:

```typescript
async getMarket(): Promise<import("./types").MarketQuote[]> {
  return this.fetch("/meta/market");
}
```

- [ ] **Step 4: Verify TypeScript compiles**

```powershell
pnpm --filter frontend-web check-types
```

Expected: no errors.

- [ ] **Step 5: Commit**

```bash
git add apps/frontend-web/package.json apps/frontend-web/lib/types.ts apps/frontend-web/lib/api-client.ts pnpm-lock.yaml
git commit -m "feat(frontend): install recharts + add market history types and API client methods"
```

---

## Task 3: SparklineChart component

**Files:**
- Create: `apps/frontend-web/components/markets/SparklineChart.tsx`

- [ ] **Step 1: Create `apps/frontend-web/components/markets/SparklineChart.tsx`**

```typescript
"use client";

import {
  ResponsiveContainer,
  LineChart,
  Line,
  Tooltip,
  YAxis,
} from "recharts";
import type { HistoryPoint } from "@/lib/types";
import type { ReactElement } from "react";

interface SparklineChartProps {
  points: HistoryPoint[];
  isPositive: boolean;
  height?: number;
}

export function SparklineChart({
  points,
  isPositive,
  height = 40,
}: SparklineChartProps): ReactElement {
  const color = isPositive ? "#10b981" : "#ef4444";

  return (
    <ResponsiveContainer width="100%" height={height}>
      <LineChart data={points} margin={{ top: 2, right: 2, bottom: 2, left: 2 }}>
        <YAxis domain={["auto", "auto"]} hide />
        <Tooltip
          content={({ active, payload }) => {
            if (!active || !payload?.length) return null;
            const val = payload[0]?.value as number;
            return (
              <div className="bg-white border border-[#c8ddf5] rounded-lg px-2 py-1 text-xs font-mono text-[#003366] shadow-md">
                {val?.toFixed(2)}
              </div>
            );
          }}
        />
        <Line
          type="monotone"
          dataKey="c"
          stroke={color}
          strokeWidth={1.5}
          dot={false}
          isAnimationActive={false}
        />
      </LineChart>
    </ResponsiveContainer>
  );
}
```

- [ ] **Step 2: Verify no TypeScript errors**

```powershell
pnpm --filter frontend-web check-types
```

Expected: no errors.

- [ ] **Step 3: Commit**

```bash
git add apps/frontend-web/components/markets/SparklineChart.tsx
git commit -m "feat(frontend): add SparklineChart component"
```

---

## Task 4: MarketSidebarWidget component

**Files:**
- Create: `apps/frontend-web/components/markets/MarketSidebarWidget.tsx`
- Modify: `apps/frontend-web/components/feed/FeedSidebar.tsx`

- [ ] **Step 1: Create `apps/frontend-web/components/markets/MarketSidebarWidget.tsx`**

```typescript
"use client";

import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { apiClient } from "@/lib/api-client";
import { SparklineChart } from "./SparklineChart";
import { Skeleton } from "@/components/ui/skeleton";
import { BarChart2 } from "lucide-react";
import type { ReactElement } from "react";

export function MarketSidebarWidget(): ReactElement {
  const router = useRouter();

  const { data: quotes, isLoading: quotesLoading } = useQuery({
    queryKey: ["market"],
    queryFn: () => apiClient.getMarket(),
    refetchInterval: 60000,
    staleTime: 30000,
  });

  // Fetch 1d history for all symbols in parallel (only when quotes loaded)
  const symbols = quotes?.map((q) => q.symbol) ?? [];
  const { data: histories } = useQuery({
    queryKey: ["market-sparklines", symbols],
    queryFn: async () => {
      const results = await Promise.all(
        symbols.map((s) => apiClient.getMarketHistory(s, "1d").catch(() => null))
      );
      const map: Record<string, typeof results[0]> = {};
      symbols.forEach((s, i) => { if (results[i]) map[s] = results[i]; });
      return map;
    },
    enabled: symbols.length > 0,
    staleTime: 300000, // 5 min — matches server cache
  });

  return (
    <div className="bg-white border border-[#c8ddf5] rounded-2xl p-4 shadow-sm shadow-blue-900/4">
      <h3 className="flex items-center gap-2 text-sm font-semibold text-[#003366] mb-3">
        <BarChart2 className="h-4 w-4 text-[#007acc]" />
        Markets
      </h3>

      {quotesLoading ? (
        <div className="space-y-3">
          {[1, 2, 3, 4].map((i) => (
            <Skeleton key={i} className="h-14 w-full rounded-xl bg-[#e8f2ff]" />
          ))}
        </div>
      ) : (
        <div className="space-y-2">
          {(quotes ?? []).slice(0, 6).map((quote) => {
            const isPositive = quote.change >= 0;
            const history = histories?.[quote.symbol];

            return (
              <button
                key={quote.symbol}
                onClick={() =>
                  router.push(`/markets?symbol=${encodeURIComponent(quote.symbol)}`)
                }
                className="w-full text-left rounded-xl px-3 py-2 hover:bg-[#f0f7ff] transition-colors group"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs font-bold text-[#003366] group-hover:text-[#007acc] transition-colors">
                      {quote.label}
                    </p>
                    <p className="text-xs font-mono text-[#4a6890] mt-0.5">
                      {quote.price.toLocaleString("en-US", {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                      })}
                    </p>
                  </div>
                  <div className="text-right">
                    <span
                      className={`text-xs font-semibold ${
                        isPositive ? "text-emerald-600" : "text-red-500"
                      }`}
                    >
                      {isPositive ? "+" : ""}
                      {quote.changePercent.toFixed(2)}%
                    </span>
                    {history && (
                      <div className="w-20 h-8 mt-0.5 ml-auto">
                        <SparklineChart
                          points={history.points}
                          isPositive={isPositive}
                          height={32}
                        />
                      </div>
                    )}
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      )}

      <button
        onClick={() => router.push("/markets")}
        className="mt-3 w-full text-center text-xs font-semibold text-[#007acc] hover:text-[#003366] transition-colors py-1"
      >
        View all markets →
      </button>
    </div>
  );
}
```

- [ ] **Step 2: Add `MarketSidebarWidget` to `FeedSidebar.tsx`**

Open `apps/frontend-web/components/feed/FeedSidebar.tsx`. Add the import at the top:

```typescript
import { MarketSidebarWidget } from "@/components/markets/MarketSidebarWidget";
```

Then add `<MarketSidebarWidget />` at the end of the returned `<aside>`, before the closing `</aside>` tag. The final JSX structure should be:

```typescript
return (
  <aside className="w-64 shrink-0 hidden lg:block sticky top-24 self-start space-y-6">
    {/* Trending Topics */}
    <div ...>...</div>

    <Separator className="bg-[#c8ddf5]" />

    {/* Top Sources */}
    <div ...>...</div>

    <Separator className="bg-[#c8ddf5]" />

    {/* Markets widget */}
    <MarketSidebarWidget />
  </aside>
);
```

- [ ] **Step 3: Verify TypeScript**

```powershell
pnpm --filter frontend-web check-types
```

Expected: no errors.

- [ ] **Step 4: Visually verify in browser**

Start frontend (`pnpm dev:frontend`) and open `http://localhost:3000/feed`. The right sidebar should show a "Markets" section below "Top Sources" with asset names, prices, change%, and sparklines.

- [ ] **Step 5: Commit**

```bash
git add apps/frontend-web/components/markets/MarketSidebarWidget.tsx apps/frontend-web/components/feed/FeedSidebar.tsx
git commit -m "feat(frontend): add markets sparkline widget to feed sidebar"
```

---

## Task 5: FullChart component

**Files:**
- Create: `apps/frontend-web/components/markets/FullChart.tsx`

- [ ] **Step 1: Create `apps/frontend-web/components/markets/FullChart.tsx`**

```typescript
"use client";

import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";
import { format } from "date-fns";
import type { HistoryPoint } from "@/lib/types";
import type { ReactElement } from "react";

interface FullChartProps {
  points: HistoryPoint[];
  isPositive: boolean;
  range: string;
}

function formatTick(t: number, range: string): string {
  if (range === "1d") return format(new Date(t), "HH:mm");
  if (range === "1w") return format(new Date(t), "EEE HH:mm");
  return format(new Date(t), "MMM d");
}

function tickCount(range: string): number {
  if (range === "1d") return 6;
  if (range === "1w") return 5;
  return 8;
}

export function FullChart({ points, isPositive, range }: FullChartProps): ReactElement {
  const color = isPositive ? "#10b981" : "#ef4444";
  const fillId = `fill-${isPositive ? "green" : "red"}`;

  return (
    <ResponsiveContainer width="100%" height={320}>
      <AreaChart data={points} margin={{ top: 8, right: 16, bottom: 0, left: 8 }}>
        <defs>
          <linearGradient id={fillId} x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor={color} stopOpacity={0.15} />
            <stop offset="95%" stopColor={color} stopOpacity={0} />
          </linearGradient>
        </defs>
        <CartesianGrid strokeDasharray="3 3" stroke="#e8f2ff" />
        <XAxis
          dataKey="t"
          tickFormatter={(v) => formatTick(v as number, range)}
          tickCount={tickCount(range)}
          tick={{ fontSize: 11, fill: "#4a6890" }}
          axisLine={false}
          tickLine={false}
        />
        <YAxis
          domain={["auto", "auto"]}
          tick={{ fontSize: 11, fill: "#4a6890" }}
          axisLine={false}
          tickLine={false}
          tickFormatter={(v: number) =>
            v >= 1000 ? `${(v / 1000).toFixed(1)}k` : v.toFixed(2)
          }
          width={60}
        />
        <Tooltip
          content={({ active, payload }) => {
            if (!active || !payload?.length) return null;
            const point = payload[0]?.payload as HistoryPoint;
            return (
              <div className="bg-white border border-[#c8ddf5] rounded-xl px-3 py-2 shadow-lg text-xs">
                <p className="text-[#4a6890] mb-0.5">
                  {format(new Date(point.t), "MMM d, yyyy HH:mm")}
                </p>
                <p className="font-bold text-[#003366] font-mono text-sm">
                  {(point.c).toLocaleString("en-US", {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  })}
                </p>
              </div>
            );
          }}
        />
        <Area
          type="monotone"
          dataKey="c"
          stroke={color}
          strokeWidth={2}
          fill={`url(#${fillId})`}
          dot={false}
          isAnimationActive={false}
        />
      </AreaChart>
    </ResponsiveContainer>
  );
}
```

- [ ] **Step 2: TypeScript check**

```powershell
pnpm --filter frontend-web check-types
```

- [ ] **Step 3: Commit**

```bash
git add apps/frontend-web/components/markets/FullChart.tsx
git commit -m "feat(frontend): add FullChart area chart component"
```

---

## Task 6: Markets page

**Files:**
- Create: `apps/frontend-web/app/(app)/markets/page.tsx`

- [ ] **Step 1: Create `apps/frontend-web/app/(app)/markets/page.tsx`**

```typescript
"use client";

import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";
import { apiClient } from "@/lib/api-client";
import { FullChart } from "@/components/markets/FullChart";
import { Skeleton } from "@/components/ui/skeleton";
import { TrendingUp, TrendingDown } from "lucide-react";
import type { ReactElement } from "react";
import type { MarketSymbol } from "@/lib/types";

const RANGES = [
  { label: "1D", value: "1d" },
  { label: "1W", value: "1w" },
  { label: "1M", value: "1m" },
];

const CATEGORIES = [
  { label: "All", value: "all" },
  { label: "Crypto", value: "crypto" },
  { label: "Stocks", value: "stocks" },
  { label: "Commodities", value: "commodities" },
];

export default function MarketsPage(): ReactElement {
  const searchParams = useSearchParams();
  const initialSymbol = searchParams.get("symbol") ?? "BTC-USD";

  const [selectedSymbol, setSelectedSymbol] = useState(initialSymbol);
  const [selectedRange, setSelectedRange] = useState("1d");
  const [selectedCategory, setSelectedCategory] = useState("all");

  const { data: symbols } = useQuery<MarketSymbol[]>({
    queryKey: ["market-symbols"],
    queryFn: () => apiClient.getMarketSymbols(),
    staleTime: Infinity,
  });

  const { data: quotes } = useQuery({
    queryKey: ["market"],
    queryFn: () => apiClient.getMarket(),
    refetchInterval: 60000,
    staleTime: 30000,
  });

  const { data: history, isLoading: historyLoading } = useQuery({
    queryKey: ["market-history", selectedSymbol, selectedRange],
    queryFn: () => apiClient.getMarketHistory(selectedSymbol, selectedRange),
    staleTime: 300000,
  });

  const currentQuote = quotes?.find((q) => q.symbol === selectedSymbol);
  const isPositive = (currentQuote?.change ?? history?.change ?? 0) >= 0;

  const filteredSymbols = (symbols ?? []).filter(
    (s) => selectedCategory === "all" || s.category === selectedCategory
  );

  return (
    <div className="max-w-7xl mx-auto w-full px-6 py-8">
      {/* Header */}
      <div className="mb-8 pb-5 border-b border-[#c8ddf5]">
        <h1 className="text-3xl font-extrabold tracking-tight text-[#003366]">Markets</h1>
        <p className="text-sm text-[#4a6890] mt-1">
          Live prices for crypto, stocks, and commodities
        </p>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Left: Asset List */}
        <div className="w-full lg:w-64 shrink-0">
          {/* Category filter */}
          <div className="flex flex-wrap gap-1 mb-4">
            {CATEGORIES.map((cat) => (
              <button
                key={cat.value}
                onClick={() => setSelectedCategory(cat.value)}
                className={`px-3 py-1 rounded-full text-xs font-semibold transition-colors ${
                  selectedCategory === cat.value
                    ? "bg-[#003366] text-white"
                    : "bg-[#e8f2ff] text-[#00509e] hover:bg-[#cce0ff]"
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          <div className="space-y-1">
            {filteredSymbols.map((sym) => {
              const quote = quotes?.find((q) => q.symbol === sym.symbol);
              const isActive = selectedSymbol === sym.symbol;
              const pos = (quote?.change ?? 0) >= 0;

              return (
                <button
                  key={sym.symbol}
                  onClick={() => setSelectedSymbol(sym.symbol)}
                  className={`w-full text-left px-4 py-3 rounded-xl transition-all ${
                    isActive
                      ? "bg-linear-to-r from-[#003366] to-[#00509e] text-white shadow-md shadow-blue-900/20"
                      : "hover:bg-[#e8f2ff] text-[#4a6890]"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <p className={`text-sm font-bold ${isActive ? "text-white" : "text-[#003366]"}`}>
                        {sym.label}
                      </p>
                      <p className={`text-xs font-mono mt-0.5 ${isActive ? "text-white/70" : "text-[#4a6890]"}`}>
                        {quote
                          ? quote.price.toLocaleString("en-US", {
                              minimumFractionDigits: 2,
                              maximumFractionDigits: 2,
                            })
                          : "—"}
                      </p>
                    </div>
                    {quote && (
                      <span
                        className={`text-xs font-semibold ${
                          isActive
                            ? pos
                              ? "text-emerald-300"
                              : "text-red-300"
                            : pos
                            ? "text-emerald-600"
                            : "text-red-500"
                        }`}
                      >
                        {pos ? "+" : ""}
                        {quote.changePercent.toFixed(2)}%
                      </span>
                    )}
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Right: Chart panel */}
        <div className="flex-1 min-w-0">
          <div className="bg-white border border-[#c8ddf5] rounded-2xl p-6 shadow-sm shadow-blue-900/4">
            {/* Asset header */}
            <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 mb-6">
              <div>
                <h2 className="text-2xl font-extrabold text-[#003366]">
                  {history?.label ?? currentQuote?.label ?? selectedSymbol}
                </h2>
                {currentQuote || history ? (
                  <div className="flex items-baseline gap-3 mt-1">
                    <span className="text-3xl font-bold font-mono text-[#0a1628]">
                      {(currentQuote?.price ?? history?.currentPrice ?? 0).toLocaleString("en-US", {
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
                      {(currentQuote?.change ?? history?.change ?? 0).toFixed(2)}
                      {" ("}
                      {isPositive ? "+" : ""}
                      {(currentQuote?.changePercent ?? history?.changePercent ?? 0).toFixed(2)}%
                      {")"}
                    </span>
                  </div>
                ) : null}
              </div>

              {/* Range selector */}
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

            {/* Chart */}
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
                No chart data available
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
```

- [ ] **Step 2: TypeScript check**

```powershell
pnpm --filter frontend-web check-types
```

Expected: no errors.

- [ ] **Step 3: Open `http://localhost:3000/markets` in browser**

Verify:
- Category filter buttons (All / Crypto / Stocks / Commodities) work
- Clicking an asset updates the chart
- Range buttons (1D / 1W / 1M) update the chart
- Price and change% display correctly

- [ ] **Step 4: Commit**

```bash
git add apps/frontend-web/app/\(app\)/markets/page.tsx
git commit -m "feat(frontend): add /markets page with full area chart and range selector"
```

---

## Task 7: Add Markets to sidebar navigation

**Files:**
- Modify: `apps/frontend-web/components/layout/Sidebar.tsx`

- [ ] **Step 1: Add `BarChart2` to the lucide import and add Markets nav item**

In `apps/frontend-web/components/layout/Sidebar.tsx`, update the import line:

```typescript
import {
  Home,
  Search,
  Bookmark,
  Clock,
  Swords,
  Settings,
  TrendingUp,
  LogOut,
  PanelLeftClose,
  PanelLeftOpen,
  BarChart2,
} from "lucide-react";
```

Update the `navItems` array:

```typescript
const navItems = [
  { label: "Feed",     href: "/feed",     icon: Home      },
  { label: "Markets",  href: "/markets",  icon: BarChart2 },
  { label: "Search",   href: "/search",   icon: Search    },
  { label: "Bookmarks",href: "/bookmarks",icon: Bookmark  },
  { label: "History",  href: "/history",  icon: Clock     },
  { label: "Arena",    href: "/arena",    icon: Swords    },
];
```

- [ ] **Step 2: Verify in browser**

Navigate to `http://localhost:3000/feed`. The sidebar should now show "Markets" between "Feed" and "Search". Clicking it should navigate to `/markets`.

- [ ] **Step 3: Commit**

```bash
git add apps/frontend-web/components/layout/Sidebar.tsx
git commit -m "feat(frontend): add Markets link to sidebar navigation"
```

---

## Self-Review

**Spec coverage:**
- ✅ Rise/drop sparkline chart in sidebar — `MarketSidebarWidget` with `SparklineChart`
- ✅ Latest crypto (BTC, ETH) — added to SYMBOLS
- ✅ Gold, Silver — GC=F, SI=F added to SYMBOLS
- ✅ Stocks (S&P 500, Nasdaq) — already tracked, now exposed
- ✅ Dedicated markets page — `app/(app)/markets/page.tsx`
- ✅ Category filtering (Crypto / Stocks / Commodities) — CATEGORIES filter
- ✅ Range selector (1D / 1W / 1M) — RANGES buttons
- ✅ Sidebar navigation link — `Sidebar.tsx` update
- ✅ Clicking sidebar widget navigates to markets page

**Placeholder scan:** None found. All code blocks are complete.

**Type consistency:**
- `HistoryPoint { t: number, c: number }` — consistent across `market.service.ts`, `types.ts`, `SparklineChart`, `FullChart`
- `MarketHistory { symbol, label, range, points, currentPrice, change, changePercent }` — consistent
- `getMarketHistory(symbol, range)` — matches backend route params and api-client method signature
