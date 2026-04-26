# FinMate Project Audit

> Generated: 2026-04-26

---

## Table of Contents

1. [Architecture Overview](#architecture-overview)
2. [Database Schema](#database-schema)
3. [Backend API](#backend-api)
4. [Frontend Web](#frontend-web)
5. [Ingestion Worker](#ingestion-worker)
6. [Arena Market Simulator](#arena-market-simulator)
7. [Arena Agent Orchestrator](#arena-agent-orchestrator)
8. [Authentication Flow](#authentication-flow)
9. [Arena Simulation — End-to-End Flow](#arena-simulation-end-to-end-flow)
10. [Environment Variables](#environment-variables)
11. [Bugs & Issues (Prioritized)](#bugs--issues-prioritized)
12. [Improvement Backlog](#improvement-backlog)

---

## Architecture Overview

FinMate is a Turborepo monorepo (pnpm workspaces) with the following apps and packages:

```
apps/
  backend-api/               — Express 5 REST API, port 4000
  frontend-web/              — Next.js 15 App Router + React 19, port 3000
  ingestion-worker/          — RSS scraping cron worker
  arena-market-simulator/    — Historical-data trading simulation engine
  arena-agent-orchestrator/  — LLM agent decision-making via OpenRouter
  chrome-extension/          — Vite + React scaffold (stub only, no FinMate logic)

packages/
  db/                        — Single Prisma schema + singleton PrismaClient
  ui/                        — Minimal React component stubs (button, card, code)
  shared-types/              — Article, User, Preference, FeedItem interfaces
  arena-types/               — All Traders Arena TypeScript types + event contracts
  shared-utils/              — Placeholder (only exports add(a,b))
  eslint-config/             — Shared ESLint configs
  typescript-config/         — Shared TSConfig presets
```

**Key architectural decisions:**
- `@repo/db` is the single source of truth — all backend apps import the generated Prisma client from here; Prisma is never installed directly in an app.
- The frontend (Next.js) and backend (Express) are completely separate processes. The frontend calls the backend via `NEXT_PUBLIC_API_URL`.
- Arena is split into two decoupled services communicating through Redis pub/sub: the simulator runs tick loops and executes trades; the orchestrator hosts LLM agents and emits trade decisions.
- better-auth handles auth entirely through the Next.js API route at `/api/auth/[...all]`. The Express backend validates sessions independently by querying Prisma directly.

---

## Database Schema

Schema: `packages/db/prisma/schema.prisma`
Generated client: `packages/db/src/generated/client`
Singleton export: `packages/db/src/index.ts`

### Core News Content

| Model | Key Fields | Notes |
|---|---|---|
| `Article` | id (uuid), title, link (unique), source (name string), author, publishedAt, ingestedAt, summary, content, imageUrl, fingerprint (sha256, unique), tags[], createdAt | Index on `publishedAt` |
| `Source` | id, name (unique), url, type, tags[], active, schedule | Used for ingestion config — not fully surfaced in API |

### Auth (managed by better-auth)

| Model | Key Fields | Notes |
|---|---|---|
| `User` | id (string, set by better-auth), name, email (unique), emailVerified, image, preferences (Json), bookmarks (string[]) | |
| `Session` | id, userId, token (unique), expiresAt, ipAddress, userAgent | Index on userId |
| `Account` | providerId, accountId, accessToken, refreshToken | OAuth account links |
| `Verification` | — | Email verification flows |

### Traders Arena

| Model | Key Fields | Notes |
|---|---|---|
| `ArenaAgent` | id, name, model, personality, strategy, config (Json), isActive | Soft-deleted via isActive=false |
| `ArenaSimulation` | id, name, status (enum), market, marketType, interval, startDate, endDate, initialBalance (10000), tickIntervalMs (1000), priceImpact (0.001) | |
| `ArenaParticipation` | simulationId, agentId, finalBalance, pnl, pnlPercent, sharpeRatio, winRate, totalTrades, rank | Unique on (simulationId, agentId) |
| `ArenaTrade` | simulationId, participationId, timestamp, action, asset, quantity, price, total, reasoning | |
| `ArenaSnapshot` | simulationId, tick, price, data (Json: { orderBook, portfolios }) | Saved every 10 ticks |
| `ArenaLeaderboard` | agentId (unique), totalWins, totalSimulations, avgPnl, avgPnlPercent, avgSharpe, bestPnl, worstPnl | Rolling aggregates |
| `MarketDataCache` | symbol, type, interval, startTime, endTime, data (Json) | Unique on (symbol, type, interval, startTime, endTime) |

---

## Backend API

Entry: `apps/backend-api/src/server.ts`
App setup: `apps/backend-api/src/app.ts`

### Boot Sequence

1. `dotenv/config` loads env vars
2. `prisma.$connect()` — test DB connection
3. `app.listen(4000)`
4. SIGINT/SIGTERM → graceful shutdown (close HTTP, disconnect Prisma, 10s force-kill)

### Middleware Stack

`requestIdMiddleware` → `httpLogger` (pino-http) → `helmet` → `cors` → `express.json(1mb)` → `cookieParser`

CORS origin: `FRONTEND_URL` with `credentials: true`.

### Routes

| Method | Path | Auth | Handler |
|---|---|---|---|
| GET | `/health` | — | `{ status: "ok" }` |
| GET | `/feed` | — | Ranked feed with recency + preferences |
| GET | `/article/:id` | — | Article detail |
| GET | `/search?q=&limit=` | — | Raw SQL ILIKE on title/summary/content |
| GET | `/user/me` | Required | Returns `req.user` |
| POST | `/user/preferences` | Required | Upsert user preferences |
| POST | `/user/bookmark` | Required | Add/remove bookmark |
| GET | `/user/bookmarks` | Required | User bookmark list |
| GET | `/meta/categories` | — | Unique tags from all articles |
| GET | `/meta/sources` | — | Distinct sources from articles |
| GET | `/arena/agents` | — | Active agents list |
| GET | `/arena/agents/:id` | — | Agent + last 10 participations |
| POST | `/arena/agents` | — | Create agent |
| PUT | `/arena/agents/:id` | — | Update agent |
| DELETE | `/arena/agents/:id` | — | Soft-delete (isActive=false) |
| GET | `/arena/simulations` | — | Simulations (filterable by status) |
| GET | `/arena/simulations/:id` | — | Simulation + participants + last 50 trades |
| POST | `/arena/simulations` | — | Create simulation with participants |
| POST | `/arena/simulations/:id/start` | — | Publish Redis start commands |
| POST | `/arena/simulations/:id/stop` | — | Publish Redis stop commands |
| POST | `/arena/simulations/:id/pause` | — | Redis pause + DB update |
| POST | `/arena/simulations/:id/resume` | — | Redis resume + DB update |
| DELETE | `/arena/simulations/:id` | — | Hard delete |
| GET | `/arena/leaderboards` | — | Sorted leaderboard |
| GET | `/arena/leaderboards/:agentId` | — | Agent stats + recent participations |
| GET | `/arena/replay/:id` | — | Full replay data (snapshots + trades) |
| GET | `/arena/replay/:id/snapshots` | — | Paginated snapshots by tick range |
| GET | `/arena/replay/:id/trades` | — | Trades in time range |

### Feed Ranking Algorithm

File: `apps/backend-api/src/utils/ranking.ts`

- `recencyScore`: exponential decay, 24-hour half-life → [0, 1]
- `preferenceBoost`: +0.25 if article has any preferred tag
- `computeScore`: `recencyScore * 0.8 + preferenceBoost * 0.2`
- Buffer: fetches `max(200, limit * 5)` articles, re-ranks, slices to `limit`

### Auth Middleware

File: `apps/backend-api/src/middleware/auth.ts`

- Reads `finmate.session_token` cookie
- Looks up `Session` → `User` in Prisma
- Checks `session.expiresAt < new Date()`
- Attaches `req.user = { id, email, name, image }`
- `optionalAuthMiddleware` variant does not reject unauthenticated requests

---

## Frontend Web

Entry: `apps/frontend-web/app/layout.tsx`
Framework: Next.js 15, React 19, App Router
State: TanStack React Query v5 (staleTime 2min, gcTime 10min, retry 1)
Auth client: better-auth (`lib/auth-client.ts`)
Theme: forced light mode (`forcedTheme="light"`)

### Pages

| Route | File | Status |
|---|---|---|
| `/` | `app/page.tsx` | Live — infinite scroll feed, BentoGrid, filters |
| `/article/[id]` | `app/article/[id]/page.tsx` | Live — DOMPurify sanitized content, related articles |
| `/search` | `app/search/page.tsx` | Live — 300ms debounce, min 2 chars |
| `/login` | `app/login/page.tsx` | Live (email/password); OAuth buttons exist but broken |
| `/signup` | `app/signup/page.tsx` | Live |
| `/bookmarks` | `app/bookmarks/page.tsx` | Live — auth-gated |
| `/settings` | `app/settings/page.tsx` | Live — category/source preference picker |
| `/arena` | `app/arena/page.tsx` | Static hero with hardcoded stats |
| `/arena/admin` | `app/arena/admin/page.tsx` | **Mock data — not wired to API** |
| `/arena/replay` | `app/arena/replay/page.tsx` | **Mock data — not wired to API** |
| `/arena/replay/[id]` | `app/arena/replay/[id]/page.tsx` | **Mock data — not wired to API** |
| `/arena/leaderboards` | `app/arena/leaderboards/page.tsx` | **Mock data — not wired to API** |
| `/api/auth/[...all]` | `app/api/auth/[...all]/route.ts` | better-auth catch-all |

### API Client

There are **two api-client files** (only one should exist):
- `apps/frontend-web/lib/api-client.ts` — correct, typed, uses `credentials: "include"` ✓
- `apps/frontend-web/app/lib/api-client.ts` — old stub with `userId: "demo-user"` hardcoded ✗ (dead code)

### Key Components

`Header`, `BentoGrid`, `BentoFeedCard`, `FeedCard`, `FiltersPanel`, `Footer`, `Skeletons`, `EmptyState`

---

## Ingestion Worker

Entry: `apps/ingestion-worker/src/index.ts`
Config: `apps/ingestion-worker/config/ingestion-sources.json` (18 RSS sources)

### Pipeline

1. `startScheduler()` reads sources JSON and creates a `CronJob` per active source
2. On trigger: `fetchRss(url)` via rss-parser
3. Per item: `normalizeFeedItem()` → `isValidArticle()` → `upsertArticle()`
4. `fingerprintFor()`: SHA-256 of `"title|link"`
5. `upsertArticle()`: checks fingerprint uniqueness first, then `prisma.article.create()`

### RSS Sources (18 configured)

MarketWatch, CNBC Finance, Yahoo Finance, Investopedia, Motley Fool, Seeking Alpha, MoneyControl, Financial Samurai, CoinDesk, Blockworks, FRED Blog, IMF Blog, and others.

Schedules: every 15 minutes (most) to every 4 hours.

---

## Arena Market Simulator

Entry: `apps/arena-market-simulator/src/index.ts`
Core: `apps/arena-market-simulator/src/simulation.ts` (SimulationEngine)

### SimulationEngine Execution Flow

**`initialize(simulationId)`:**
1. Fetch simulation + participants + agents from Prisma
2. Build `SimulationConfig`, create `DataLoader`, `OrderBookEngine`, `AgentState` map
3. Create `EventPublisher` (Redis)

**`start()`:**
1. Update DB: `status = "running"`, `startedAt`
2. Publish `simulation:started` event
3. Call `runTickLoop()`

**`tick()` (runs at `tickIntervalMs`, default 1s):**
1. `dataLoader.getNextCandle()` — sequential historical data playback
2. `orderBook.updatePrice(candle.close)` — regenerate synthetic order book
3. Update agent portfolio values and PnL
4. Every 10 ticks: `saveSnapshot()` → `prisma.arenaSnapshot.create()`
5. Publish `simulation:tick` event with full state

**`executeTrade(request)`:**
1. Validate cash/position sufficiency
2. Execute via `orderBook.executeBuy()` / `executeSell()`
3. Update `agentState` cash and positions
4. `prisma.arenaTrade.create()`
5. Publish `agent:trade` event

**`complete()`:**
1. Sort agents by totalValue, assign ranks
2. Update all `ArenaParticipation` records with final stats
3. `updateLeaderboard()` per agent (rolling averages)
4. Set `ArenaSimulation.status = "completed"`
5. Publish `simulation:completed`

### OrderBookEngine

File: `apps/arena-market-simulator/src/orderBook.ts`

- Synthetic order book: 10 bid levels below price, 10 ask levels above, 0.1% spread
- Market buy/sell walks the book, computes average fill price
- Price impact: `newPrice = avgFillPrice * (1 ± priceImpactFactor * quantity / 100)`
- Order book is fully regenerated after each trade

### DataLoader

File: `apps/arena-market-simulator/src/dataLoader.ts`

- Cache-first: checks `MarketDataCache` in DB
- Crypto: Binance API `/api/v3/klines`
- Stocks: Yahoo Finance `/v8/finance/chart/`
- Fallback: `generateMockData()` — random walk starting at $50,000
- Saves fetched data to `MarketDataCache`

---

## Arena Agent Orchestrator

Entry: `apps/arena-agent-orchestrator/src/index.ts`

### Orchestration Flow

1. Subscribe to `arena:orchestrator:commands` Redis channel
2. On `type: "start"` → `initializeOrchestration(simulationId)`
3. Fetch simulation + participants, create one `TradingAgent` per participant
4. Subscribe to `arena:simulation:{id}` Redis channel
5. On each `simulation:tick` → `handleTick()` for all agents in parallel
6. On `simulation:completed` → unsubscribe and clean up

**`handleTick()`:**
1. Update price history (last 100 prices)
2. Sync agent states from tick event
3. For each agent: build `TradingAgentContext`, call `agent.decide(context)`
4. If buy/sell with quantity > 0: publish to `arena:trades:{id}` Redis channel
5. Publish `agent:decision` event

### TradingAgent

File: `apps/arena-agent-orchestrator/src/langchain/agentFactory.ts`

- LangChain `ChatPromptTemplate` + `StringOutputParser` chain
- System prompt is personality-specific (6 personalities: base, aggressive, conservative, technical, value, momentum)
- Template vars `{{portfolio}}` and `{{market}}` are filled via string replace (not LangChain template system)
- Response parsing: tries JSON `{action, quantity, reasoning}`, falls back to keyword matching
- Error fallback: `{ action: "hold", quantity: 0, reasoning: error }`

### ChatOpenRouter

File: `apps/arena-agent-orchestrator/src/langchain/openRouterModel.ts`

- Extends LangChain's `ChatOpenAI`
- `baseURL: "https://openrouter.ai/api/v1"`
- Supported: GPT-4o, GPT-4-turbo, GPT-3.5, Claude 3.5/Opus/Haiku, Gemini Pro/1.5, Llama 3.1 70b/8b, Mistral Large, Mixtral 8x7b

---

## Authentication Flow

**Sign-up / Sign-in:**
1. User submits via `authClient.signIn.email()` (browser)
2. POST to `/api/auth/sign-in/email` → Next.js catch-all route
3. better-auth uses `prismaAdapter` → creates `Session` + `User` in PostgreSQL
4. Sets `finmate.session_token` cookie (7-day expiry)

**Backend session validation:**
- `authMiddleware` reads `finmate.session_token` cookie, queries `Session` → `User` via Prisma
- Does NOT use better-auth SDK — validates independently by checking `session.expiresAt`

**Social auth:**
- Google/GitHub buttons exist in the UI but providers are commented out in `lib/auth.ts`
- Will fail at runtime without enabling in auth config + setting env vars

---

## Arena Simulation — End-to-End Flow

```
Admin: POST /arena/simulations/:id/start
  → Backend publishes to:
      arena:orchestrator:commands { type: "start", simulationId }
      arena:simulator:commands    { type: "start", simulationId }

Orchestrator (arena-agent-orchestrator):
  → initializeOrchestration() → creates TradingAgents
  → subscribes to arena:simulation:{id}

Simulator (arena-market-simulator):
  → startSimulation() → SimulationEngine.initialize() → start()
  → tick loop every tickIntervalMs:
      1. getNextCandle()
      2. updatePrice() + portfolio values
      3. Every 10 ticks: saveSnapshot() to DB
      4. publish simulation:tick → arena:simulation:{id}

Orchestrator receives simulation:tick:
  → each agent: TradingAgent.decide() via OpenRouter LLM
  → if buy/sell: publish to arena:trades:{id}
  → publish agent:decision event

On completion:
  → Simulator: calc rankings, update ArenaParticipation + ArenaLeaderboard
  → Set simulation status = "completed"
  → Publish simulation:completed
  → Orchestrator: unsubscribe + cleanup

Frontend: GET /arena/replay/:id → snapshots + trades
```

**Known wiring gap:** The simulator does NOT subscribe to `arena:trades:{id}`. Trade requests from the orchestrator are published but never executed by the simulator. The `executeTrade()` method is only callable in-process. This means agent decisions currently do not affect portfolio balances.

---

## Environment Variables

| Variable | Used By | Required | Default |
|---|---|---|---|
| `DATABASE_URL` | All backend apps, `@repo/db` | Yes | — |
| `REDIS_URL` | backend-api, ingestion-worker, arena apps | Yes | — |
| `OPENROUTER_API_KEY` | arena-agent-orchestrator | Yes for Arena | — |
| `FRONTEND_URL` | backend-api (CORS) | Yes | `http://localhost:3000` |
| `NEXT_PUBLIC_API_URL` | frontend-web | Yes | `http://localhost:4000` |
| `NEXT_PUBLIC_APP_URL` | frontend-web (auth callbacks) | Yes | — |
| `PORT` | backend-api | No | `4000` |
| `NODE_ENV` | All | No | — |
| `APP_URL` | frontend-web (better-auth) | Yes | — |

---

## Bugs & Issues (Prioritized)

### Critical

1. **Arena trade execution is broken** — Orchestrator publishes agent trade decisions to `arena:trades:{id}` Redis channel, but `SimulationEngine` never subscribes to this channel. Agent decisions never reach `executeTrade()`. All portfolios remain at initial balance; rankings are meaningless.
   - **File:** `apps/arena-market-simulator/src/index.ts` (command wiring) + orchestrator trade publish

2. **Simulator command listener not wired** — `main()` in `apps/arena-market-simulator/src/index.ts` creates an `EventSubscriber` but does not attach handlers for `start`/`stop`/`pause`/`resume` commands on `arena:simulator:commands`. The exported `startSimulation()` function is never called via Redis commands.

### High

3. **All Arena API routes are unauthenticated** — Anyone can create/modify/delete agents and start/stop simulations. No auth middleware on any `/arena/*` route.

4. **Dead duplicate API client** — `apps/frontend-web/app/lib/api-client.ts` contains `userId: "demo-user"` in bookmark calls (line 29) and uses no auth. It should be deleted; the correct client is at `apps/frontend-web/lib/api-client.ts`.

5. **All Arena frontend pages use mock data** — `/arena/admin`, `/arena/replay`, `/arena/replay/[id]`, `/arena/leaderboards` all use hardcoded mock arrays instead of calling the backend API.

6. **Google/GitHub OAuth is broken at runtime** — UI buttons exist but providers are commented out in `apps/frontend-web/lib/auth.ts`. Will produce misleading errors for users.

7. **`sharpeRatio` and `winRate` are never calculated** — Fields exist on `ArenaParticipation` but `complete()` in `simulation.ts` never computes them. They are stored as `null`.

### Medium

8. **`meta.service.ts` getCategories() is slow at scale** — Fetches all articles to extract unique tags. No dedicated aggregation or index. Will degrade with article growth.
   - **File:** `apps/backend-api/src/services/meta.service.ts`

9. **`meta.service.ts` getSources() queries articles, not Source model** — Returns `url: "#"` for all sources. The `Source` model has real URLs but they are unused here.

10. **`upsertArticle()` has a race window** — Does `findUnique` then `create` separately instead of using Prisma's `upsert`. Concurrent ingestion runs can create duplicate fingerprint errors.
    - **File:** `apps/ingestion-worker/src/processors/persist.ts`

11. **Search uses `$queryRawUnsafe` without full-text index** — Performs ILIKE scan on title/summary/content. Slow on large tables. A `@@fulltext` directive is commented out in the schema.
    - **File:** `apps/backend-api/src/services/article.service.ts` (line 41)

12. **`apps/backend-api/src/routes/index.ts` is dead code** — Old route stub file not mounted in `app.ts`. Causes confusion.

13. **`packages/shared-utils` is a placeholder** — Only exports `add(a, b)`. Not used anywhere. Either add real utilities or remove it.

### Low

14. **Debug `console.log` left in production** — `apps/frontend-web/app/page.tsx` line 69: `console.log("Selected categories:", newCategories)`.

15. **Theme switcher is partially disabled** — `forcedTheme="light"` in providers, but theme selector UI still appears in settings and creates a confusing experience.

16. **Arena hero page (`/arena`) has hardcoded stats** — "12 agents", "47 simulations", "$2.3M simulated" are static strings unrelated to real data.

17. **`FiltersPanel.tsx` "Markets Today" widget shows static values** — S&P 500, Nasdaq, Dow Jones numbers are hardcoded.

18. **`chrome-extension` app is a default Vite scaffold** — No FinMate-specific functionality. Should either be built out or removed from the monorepo.

---

## Improvement Backlog

### Arena — Core Fixes (Required for Arena to work)
- [ ] Wire simulator to subscribe to `arena:trades:{id}` and call `executeTrade()` on each message
- [ ] Fix `arena:simulator:commands` listener in `main()` to handle start/stop/pause/resume
- [ ] Add auth middleware to all `/arena/*` write routes
- [ ] Calculate and persist `sharpeRatio` and `winRate` in `complete()`

### Arena — Frontend Wiring
- [ ] Wire `/arena/admin` to real API (`GET /arena/agents`, `GET /arena/simulations`)
- [ ] Wire `/arena/leaderboards` to `GET /arena/leaderboards`
- [ ] Wire `/arena/replay` to `GET /arena/simulations` (with status=completed filter)
- [ ] Wire `/arena/replay/[id]` to `GET /arena/replay/:id`
- [ ] Replace hardcoded stats on `/arena` hero page with real API counts

### Auth
- [ ] Enable Google/GitHub OAuth in `lib/auth.ts` or remove the dead UI buttons
- [ ] Add auth to Arena admin/write operations

### Code Cleanup
- [ ] Delete `apps/frontend-web/app/lib/api-client.ts` (old stub with demo-user)
- [ ] Delete `apps/backend-api/src/routes/index.ts` (dead code)
- [ ] Remove `console.log` from `apps/frontend-web/app/page.tsx`
- [ ] Fix or remove `packages/shared-utils` placeholder

### Performance
- [ ] Add `@@fulltext` index to Article model for proper search (or use pg full-text search via raw SQL)
- [ ] Rewrite `getCategories()` to use a proper aggregation query (GROUP BY + unnest)
- [ ] Fix `getSources()` to use the `Source` model and return real URLs
- [ ] Replace manual findUnique+create in `upsertArticle()` with proper Prisma upsert

### Features (Future)
- [ ] Real-time feed updates via WebSocket or SSE
- [ ] Dark mode (unblock `forcedTheme`)
- [ ] Chrome extension FinMate functionality
- [ ] Live market price widget in FiltersPanel
- [ ] Arena simulation real-time dashboard with live tick updates
