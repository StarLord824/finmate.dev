# Market Feed Expansion — Design

**Date:** 2026-05-08
**Status:** Approved (pending spec review)

## Goal

Expand the markets surface from 6 hardcoded symbols to a multi-category universe (top 50 crypto, NIFTY 50, US blue chips, world indices, commodities, forex) with a "Top Movers" view, oriented for Indian retail users.

## Architecture

**Backend** adds a CoinGecko client for crypto and an extended Yahoo Finance symbol catalog for everything else. Two new endpoints serve category lists and a global movers panel. All responses are Redis-cached.

**Frontend** keeps the sidebar widget lean (6 India-first marquee assets + a "🔥 Top Gainer" highlight row). The `/markets` page becomes a tabbed interface: Movers (default) → Crypto → Indian Stocks → US Stocks → Indices → Commodities → Forex. Clicking a row in any tab opens the existing detail chart panel.

## Symbol Catalog

A new file `apps/backend-api/src/services/market-catalog.ts` exports the static catalog:

```ts
export const MARQUEE_SYMBOLS = [
  "BTC-USD", "ETH-USD", "^NSEI", "^BSESN", "INR=X", "GC=F"
];

export const NSE_SYMBOLS = [
  "RELIANCE.NS", "TCS.NS", "HDFCBANK.NS", "ICICIBANK.NS", "INFY.NS",
  "HINDUNILVR.NS", "ITC.NS", "SBIN.NS", "BHARTIARTL.NS", "KOTAKBANK.NS",
  "LT.NS", "AXISBANK.NS", "ASIANPAINT.NS", "MARUTI.NS", "HCLTECH.NS",
  "BAJFINANCE.NS", "WIPRO.NS", "M&M.NS", "TITAN.NS", "ULTRACEMCO.NS",
  "SUNPHARMA.NS", "NTPC.NS", "POWERGRID.NS", "NESTLEIND.NS", "ADANIENT.NS",
  "TATAMOTORS.NS", "JSWSTEEL.NS", "ONGC.NS", "TATASTEEL.NS", "COALINDIA.NS",
  "BAJAJFINSV.NS", "TECHM.NS", "HDFCLIFE.NS", "SBILIFE.NS", "DRREDDY.NS",
  "BRITANNIA.NS", "GRASIM.NS", "CIPLA.NS", "INDUSINDBK.NS", "DIVISLAB.NS",
  "BAJAJ-AUTO.NS", "ADANIPORTS.NS", "EICHERMOT.NS", "APOLLOHOSP.NS", "HEROMOTOCO.NS",
  "TATACONSUM.NS", "BPCL.NS", "UPL.NS", "SHRIRAMFIN.NS", "LTIM.NS"
]; // NIFTY 50

export const US_SYMBOLS = [
  "AAPL", "MSFT", "NVDA", "GOOGL", "AMZN", "META", "TSLA", "BRK-B", "JPM", "V",
  "WMT", "MA", "JNJ", "PG", "XOM", "HD", "CVX", "ABBV", "KO", "PEP",
  "AVGO", "MRK", "LLY", "BAC", "ORCL", "COST", "ADBE", "MCD", "CSCO", "CRM"
];

export const INDEX_SYMBOLS = [
  { symbol: "^NSEI",   label: "NIFTY 50" },
  { symbol: "^BSESN",  label: "SENSEX" },
  { symbol: "^GSPC",   label: "S&P 500" },
  { symbol: "^IXIC",   label: "Nasdaq" },
  { symbol: "^DJI",    label: "Dow Jones" },
  { symbol: "^N225",   label: "Nikkei 225" },
  { symbol: "^FTSE",   label: "FTSE 100" },
  { symbol: "^GDAXI",  label: "DAX" },
  { symbol: "^HSI",    label: "Hang Seng" }
];

export const COMMODITY_SYMBOLS = [
  { symbol: "GC=F", label: "Gold" },
  { symbol: "SI=F", label: "Silver" },
  { symbol: "CL=F", label: "Crude Oil" },
  { symbol: "NG=F", label: "Natural Gas" }
];

export const FOREX_SYMBOLS = [
  { symbol: "INR=X",    label: "USD/INR" },
  { symbol: "EURINR=X", label: "EUR/INR" },
  { symbol: "GBPINR=X", label: "GBP/INR" },
  { symbol: "EUR=X",    label: "USD/EUR" },
  { symbol: "JPY=X",    label: "USD/JPY" }
];
```

**Crypto** (top 50) comes from CoinGecko, not the static catalog — we fetch live so that the universe stays current.

## Backend

### CoinGecko client

`apps/backend-api/src/services/coingecko.service.ts`

- `getTopCrypto(limit = 50)` calls `GET https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=50&page=1&sparkline=false&price_change_percentage=24h`
- Returns `{ symbol, label, price, change, changePercent, marketCap, image }[]`
- Redis cache key `market:crypto:top`, TTL 300s
- 8s timeout, returns `[]` on failure with `console.warn`

### Extended market service

`apps/backend-api/src/services/market.service.ts` (existing file, extend):

- Keep existing `getMarketQuotes()` for the marquee bar (use `MARQUEE_SYMBOLS` instead of current hardcoded list)
- Add `getCategoryQuotes(category: "nse" | "us" | "indices" | "commodities" | "forex")` — fetches Yahoo quotes for the catalog list and returns `Quote[]` (with `label` and `category`)
- Add `getMovers()` — fetches all non-crypto symbols + top-50 crypto, sorts by `changePercent`, returns `{ gainers: Quote[], losers: Quote[] }` (top 5 each). Redis cache key `market:movers`, TTL 60s
- Yahoo fetches batch-friendly: still one HTTP call per symbol on cache miss, but bounded by `Promise.all` over the symbol list. Movers cold-miss is ~120 requests; cached path is one Redis read

### Routes

`apps/backend-api/src/routes/meta.ts` adds:

- `GET /meta/market/category?name=<nse|us|indices|commodities|forex>` → category quote list
- `GET /meta/market/crypto-top` → CoinGecko top 50
- `GET /meta/market/movers` → `{ gainers, losers }`

Existing `/meta/market` continues to serve the marquee 6.

## Frontend

### Sidebar widget

`MarketSidebarWidget.tsx` (existing) — content changes:
- Display the 6 marquee assets (BTC, ETH, NIFTY 50, SENSEX, USD/INR, Gold)
- Add a single highlighted "🔥 Top Gainer" row at the top fetched from `/meta/market/movers` (just `gainers[0]`)
- Click row → `/markets?symbol=<encoded>`

### `/markets` page redesign

`app/(app)/markets/page.tsx` — rewrite to tabbed layout:

**Top-level tabs** (sticky horizontal bar): Movers | Crypto | Indian Stocks | US Stocks | Indices | Commodities | Forex

**Movers tab (default):**
- Two columns side-by-side: "Top Gainers" / "Top Losers"
- Each shows 5 ranked rows with rank number, label, price, change%
- Click row → switches selected symbol, scrolls to chart panel below

**Category tabs (Crypto, Indian Stocks, US Stocks, Indices, Commodities, Forex):**
- Scrollable ranked list (1-based rank column)
- Each row: rank, label, symbol, price, change%, small sparkline (1D)
- Sortable by change% (default) or alphabetical
- Click row → opens chart panel

**Chart panel** (always at bottom of the page):
- Same `FullChart` from existing page with range selector (1D / 1W / 1M)
- Shows price, change, and history for the currently selected symbol
- Default selected symbol on first load: `searchParams.get("symbol")` ?? `BTC-USD`

**State management:**
- `selectedTab` (URL param `?tab=`, default `movers`)
- `selectedSymbol` (URL param `?symbol=`, default `BTC-USD`)
- Both synced via `useEffect` from `useSearchParams`
- Tab clicks update URL without full reload

### TanStack Query keys

- `["market"]` — marquee 6 (existing, no change)
- `["market-movers"]` — gainers/losers
- `["market-category", name]` — per-category list
- `["market-crypto-top"]` — CoinGecko top 50
- `["market-history", symbol, range]` — chart data (existing)
- `["market-sparklines", symbols]` — multi-symbol 1d for visible list (existing pattern)

`staleTime`: 60s for marquee/movers, 300s for category lists and crypto top, 300s for sparklines.

## Types

Add to `apps/frontend-web/lib/types.ts`:

```ts
export interface CryptoQuote {
  symbol: string;   // e.g. "BTC"
  label: string;    // "Bitcoin"
  price: number;
  change: number;
  changePercent: number;
  marketCap: number;
  image: string;
}

export interface MoversResponse {
  gainers: MarketQuote[];
  losers: MarketQuote[];
}

export type MarketCategory = "nse" | "us" | "indices" | "commodities" | "forex";
```

API client gets `getMarketCategory(name)`, `getCryptoTop()`, `getMarketMovers()`.

## Error / Empty States

- Yahoo or CoinGecko upstream failure → endpoint returns 502, frontend query shows "Unable to load data" placeholder
- Empty list (e.g., all upstream failed for a category) → "No data available for this category"
- Sparkline empty array → render nothing (no skeleton, no broken chart)

## Out of Scope

- Real-time WebSocket prices (still polling at 60s)
- Watchlist / favorite stars
- Historical screener / filters (P/E, market cap range)
- Mutual funds (separate doc in progress)
- Indian crypto pricing in INR (CoinGecko returns USD; INR display would need conversion via USD/INR quote — can be added later as a toggle)

## Open Questions

None for this iteration. Watchlist and INR-toggle deferred to a follow-up spec.
