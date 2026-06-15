# FinMate.dev

> The finance intelligence platform retail investors actually need — curated news, live multi-market data, AI-enriched articles, an LLM-driven trader simulator, and India-first mutual fund analytics, all in one place.

## What is FinMate?

Retail investors today juggle five tabs to do basic research: a news site for headlines, TradingView for charts, Moneycontrol for fund data, Reddit for sentiment, ChatGPT to make sense of any of it. **FinMate is one app that does all of it — personalized, AI-enriched, India-first.**

We treat each piece of financial information as a *signal* — an article, a price move, a fund's quarterly rebalance, a simulated agent's trade — and surface them in formats the user can actually act on. Built as a Turborepo monorepo spanning **TypeScript, Python, and Go**, with a multi-provider AI failover layer that keeps quality high while staying on free tiers at our current scale.

**Inspired by daily.dev for the developer audience — built for the finance audience.**

### Why three languages?

Because no single language is best at all three jobs:
- **TypeScript** for the frontend and API layer (Next.js + Express are unbeatable here)
- **Python** for the FundLens scraper because the PDF/Excel parsing ecosystem (`pdfplumber`, `pandas`, `openpyxl`) is mature only in Python
- **Go** for the FundLens read API because it produces a 15 MB binary that starts in 50 ms — the right tool for a high-traffic read endpoint serving SEC-grade structured data

Each service does one job well. They share data through Postgres + Redis, never through code coupling.

---

## Features at a Glance

| Feature | Where it lives | Status |
|---------|----------------|--------|
| Personalized finance news feed | `frontend-web` `/feed` | ✅ Live |
| AI-enriched articles (summary, tags, sentiment, embeddings) | `enrichment-worker` + `backend-api` | ✅ Live |
| Smart search (text + future semantic via pgvector) | `frontend-web` `/search` | ✅ Live |
| Bookmarks + reading history | `backend-api` | ✅ Live |
| Multi-source aggregation (Bloomberg, WSJ, Reuters, etc.) | `ingestion-worker` | ✅ Live |
| Live markets (top movers, crypto, NSE/BSE, US stocks, indices, commodities, forex) | `frontend-web` `/markets` | ✅ Live |
| Traders Arena (LLM-driven trading sim) | `arena-market-simulator` + `arena-agent-orchestrator` | 🚧 In progress |
| FundLens (Indian mutual fund disclosures + holdings) | `fundlens-scraper` (Python) + `fundlens-api` (Go) | ✅ Live (beta) |
| Authentication + OAuth | better-auth in `frontend-web` | ✅ Live |
| Chrome extension | `chrome-extension` | 🚧 In progress |
| Dark mode | `frontend-web` | ✅ Live |

---

## Modules in Depth

Each app in the monorepo is a self-contained service with a single purpose. Here's what each one does, why it exists, and how it works.

### 📰 `ingestion-worker` — The Firehose
**Purpose:** Pull finance news from across the internet into one place, so users don't have to.

**What it does:** Polls RSS feeds and APIs from 20+ finance sources (Bloomberg, WSJ, Reuters, CNBC, Moneycontrol, Economic Times, Mint, Livemint, etc.) on a schedule. Deduplicates, normalizes article shape, persists to Postgres.

**How it works:**
- One scraper module per source (`src/scrapers/`) — handles source-specific quirks
- Content processors normalize titles, strip tracking params, extract clean body text
- Hourly cron in production (GitHub Actions in free tier, Fly.io in paid)
- Writes raw articles with `enrichStatus: "pending"` for the enrichment worker to pick up

**Why this matters:** Aggregation is table stakes for any news product. Doing it right (dedup, source diversity, regional coverage) is what separates a news app from a news *graveyard*.

---

### 🤖 `enrichment-worker` — The AI Brain
**Purpose:** Turn raw article text into structured, queryable, recommendable content.

**What it does:** For every newly ingested article, runs a 4-step AI pipeline:
1. **Summary** — 2-3 sentence neutral summary (Groq Llama 3.3 70B)
2. **Tag extraction** — JSON list of finance tags: tickers, themes, sectors (Groq Llama 3.1 8B)
3. **Sentiment classification** — POSITIVE/NEGATIVE/NEUTRAL specific to financial framing (HuggingFace FinBERT)
4. **Embeddings** — 384-dim vector for semantic search and related-article retrieval (HuggingFace MiniLM)

**How it works:**
- Multi-provider failover router: when Groq throttles, automatically routes to Cerebras → OpenRouter free pool → Gemini
- Token-bucket counter in Redis per provider so we skip exhausted providers before paying the 429 latency cost
- Sentiment uses a finance-tuned BERT model, not a general LLM — domain-specific beats general at this task
- All output stored on the `Article` row (`aiSummary`, `aiTags`, `sentiment`, `embedding`)

**Why this matters:** Search, recommendations, sentiment-based filtering, and the "related articles" feature all depend on this enrichment. Without it, FinMate is just an RSS reader.

---

### 🔌 `backend-api` — The Hub
**Purpose:** Single REST API surface for the frontend (and extensions, mobile apps in the future).

**What it does:** Serves user-facing data — feed, search, bookmarks, history, market quotes, user preferences. Handles authentication callbacks, rate limiting, and request validation. Caches expensive computations in Redis.

**How it works:**
- Express 5 + Prisma + ioredis
- Reads from `public` schema (FinMate's main DB)
- Talks to Yahoo Finance v8 and CoinGecko for live market data (Redis-cached, 60-300s TTL)
- Auth handled by **better-auth** integration — sessions in DB, OAuth providers (Google, GitHub)
- Health endpoint, structured logging via `pino`

**Why this matters:** The boundary between your data layer and your clients. A clean API surface means we can ship a mobile app, browser extension, or third-party integrations without rewriting business logic.

---

### 🌐 `frontend-web` — The Product
**Purpose:** What the user actually sees. A modern, responsive, India-first finance dashboard.

**What it does:** Next.js 16 App Router app. Authenticated pages for feed, search, markets, bookmarks, history, arena, fundlens, settings. Marketing pages for landing, login, signup.

**How it works:**
- **App Router** with server components by default; client components only where needed (charts, interactions)
- **TanStack Query v5** for server state — automatic refetch, cache invalidation, stale-while-revalidate
- **Tailwind v4** for styling; corporate-blue palette tuned for finance
- **recharts** for price charts (sparklines + full area charts)
- **better-auth** for sign-in/up flows with OAuth
- Server-side renders article content (SEO-critical) where possible

**Why this matters:** This is the product. Everything else is plumbing. Speed, polish, and information density here determine whether users come back.

---

### 📊 Markets Surface (in `frontend-web` + `backend-api`)
**Purpose:** Give Indian retail investors a one-glance view of every market that matters.

**What it does:** The `/markets` page is a tabbed interface with 7 tabs:
- **Movers** (default) — Top 5 gainers + losers across the entire universe
- **Crypto** — Top 50 by market cap from CoinGecko
- **Indian Stocks** — NIFTY 50 components
- **US Stocks** — 30 blue chips (AAPL, MSFT, NVDA, etc.)
- **Indices** — NIFTY, SENSEX, S&P 500, Nasdaq, Dow, Nikkei, FTSE, DAX, Hang Seng
- **Commodities** — Gold, Silver, Crude, Natural Gas
- **Forex** — USD/INR, EUR/INR, GBP/INR, USD/EUR, USD/JPY

Each row is clickable → expands a full interactive chart with 1D/1W/1M range selector. Sidebar widget on the feed page shows 6 marquee assets + a "🔥 Top Gainer" highlight.

**How it works:**
- **Free data sources only**: Yahoo Finance v8 for stocks/indices/commodities/forex, CoinGecko for crypto. No API keys required.
- Server-side Redis caching: 60s for quotes, 300s for category lists, ensures we stay within unwritten free-tier limits
- Symbol catalog is static and explicit (`market-catalog.ts`) — adding a new symbol is a one-line change
- Frontend uses URL state (`?tab=&symbol=`) so deep links work and browser back/forward feel native

**Why this matters:** Most Indian investors juggle 3+ apps to track domestic + global markets. We collapse that into one screen, India-first by default.

---

### ⚔️ `arena-market-simulator` + `arena-agent-orchestrator` — Traders Arena
**Purpose:** A live, watchable LLM-driven trading simulation. Think Twitch for AI traders.

**What it does:** Multiple AI agents — each with a distinct persona (Cathie Wood-style growth investor, Ackman-style activist, Burry-style contrarian, etc.) — trade in a simulated market reacting to real news. Users can watch their reasoning, see their portfolios, and rank them on a leaderboard.

**How it works:**
- **`arena-market-simulator`** — Runs the simulated exchange. Maintains order book, settles trades, marks portfolios to market, generates synthetic-but-realistic price action seeded by real market data.
- **`arena-agent-orchestrator`** — Every 5-15 min per agent, builds the prompt (persona + memory + market state + recent news), calls an LLM via OpenRouter, parses the structured trade action, submits it to the simulator.
- Different agents use **different LLM models** — Llama 70B, Gemini Flash, DeepSeek, Qwen — so their reasoning *actually differs*. That's the entertainment value.
- All state in shared Postgres (`ArenaAgent`, `ArenaSimulation`, `ArenaTrade`, `ArenaSnapshot`, `ArenaLeaderboard`) — both services are stateless workers.

**Why this matters:** Education through entertainment. Watching an AI agent reason through a market move teaches more about investing than any textbook. Also: it's *fun*, and finance products desperately need to be fun.

---

### 🇮🇳 `fundlens-scraper` (Python) — The Disclosure Pipeline
**Purpose:** Make Indian mutual fund holdings searchable and diff-able — for the first time.

**What it does:** Every month, Indian Asset Management Companies (AMCs) publish portfolio disclosures as PDFs and Excel sheets. Each AMC uses a different format. There's no API. FundLens scrapes all of them, parses the holdings, normalizes them to a common schema, and computes period-over-period diffs ("what did this fund buy/sell since last month?").

**How it works:**
- **FastAPI service** (port 8001) — health check + manual trigger endpoints
- **Celery worker** with Redis broker — runs scheduled scrape jobs per AMC
- Per-AMC scrapers in `src/fundlens_scraper/scrapers/` — each handles one AMC's quirks
- Parsers in `src/fundlens_scraper/parsers/` — generic PDF table extraction (`pdfplumber`) + Excel parsing (`openpyxl`)
- Header detector + normalizer turn arbitrary column layouts into a canonical schema
- Holdings diff computation runs after every snapshot — flags new positions, exits, weight changes ≥ X%
- Owns the `fundlens` Postgres schema (separate from FinMate's `public` schema), migrations via Alembic

**Why this matters:** This data is *public* but *not accessible*. Even paid platforms (Value Research, Morningstar) charge for what FundLens gives away. Owning a fund? You should know what it owns. We make that one search away.

---

### ⚡ `fundlens-api` (Go) — The Read Path
**Purpose:** Serve fundlens data to the frontend at low latency, low memory, low cost.

**What it does:** Read-only HTTP API over the `fundlens` schema. Endpoints for AMC details, scheme details, holdings, diffs, NAV history, "which funds hold this stock" reverse lookup.

**How it works:**
- **Go 1.23 + Fiber** — produces a single 15 MB binary, starts in <100 ms
- **sqlc** generates type-safe DB layer from hand-written SQL queries in `internal/queries/*.sql`
- Schema snapshot at `internal/schema/schema.sql` kept in sync with Alembic migrations
- Redis caching for hot queries (fund listings, AMC summaries)
- No ORM overhead, no JIT warmup — predictable sub-50ms response times

**Why this matters:** A Python or Node server doing the same job costs 3-5× the RAM. Since the FundLens read path can become the highest-traffic part of FinMate (if any AMC's holdings go viral), having a tiny, fast Go binary keeps deployment cheap forever.

---

### 🧩 `chrome-extension` — Research Where You Already Are
**Purpose:** Bring FinMate context into wherever the user is already reading finance content.

**What it does:** When the user is on a finance article (Moneycontrol, ET, Bloomberg, etc.), the extension surfaces:
- Related FinMate articles on the same companies/themes
- One-click bookmark to read later in FinMate
- AI-generated TL;DR (using the same enrichment pipeline)
- (Future) Asset price overlay on tickers mentioned in the article

**How it works:**
- Vite + React, packaged as a Chrome MV3 extension
- Content script detects finance pages and tickers
- Calls `backend-api` for related articles, bookmarks, summaries
- Sidebar UI overlays the host page

**Why this matters:** Users don't want to migrate their habits — they want their tools to come with them. The extension is the lowest-friction surface to deliver FinMate value.

---

### 📦 Shared Packages

The monorepo's `packages/` are not products — they're plumbing that makes the apps cohesive.

| Package | Purpose |
|---------|---------|
| `@repo/db` | **Single source of truth for the FinMate Prisma schema.** Every backend imports the Prisma client from here, never installs Prisma directly. Migrations live here. |
| `@repo/ui` | Shared React component library — buttons, dialogs, skeletons, form primitives. Used by `frontend-web` and `chrome-extension`. |
| `@repo/shared-types` | TS types used across the frontend and Express API (Article, FeedResponse, etc.) |
| `@repo/arena-types` | Types specific to Traders Arena — agent personas, trade actions, leaderboard rows |
| `@repo/fundlens-types` | TS contracts mirroring the Go API's JSON envelope shape — kept in sync by hand |
| `@repo/shared-utils` | Pure utility functions reused across services |
| `@repo/eslint-config` | Lint configs (base, next-js, react-internal) |
| `@repo/typescript-config` | TS configs (base, nextjs, react-library) |

---

### 🔒 Cross-Cutting Concerns

| Concern | Approach |
|---------|----------|
| **Authentication** | better-auth with email/password + Google/GitHub OAuth. Session cookies (`finmate.session_token`). Server-side validation on every protected endpoint. |
| **Caching** | Redis for everything ephemeral — market quotes, rate limits, Celery broker, ML provider quotas |
| **AI cost control** | Multi-provider failover with per-provider daily-quota tracking. System runs 24×7 entirely on free tiers at current scale. |
| **Type safety** | TypeScript everywhere on Node; sqlc for Go; Pydantic for Python. Errors caught at compile time, not in production. |
| **Monitoring** | Pino structured logs across Node services; Python uses `structlog`; Go uses Fiber's built-in logger. Sentry recommended for production. |
| **Deployment** | Polyglot Docker-friendly. Each service has its own deploy target — Vercel for frontend, Render/Fly for Node, Fly for Python + Go. |

---

## Architecture

**Turborepo monorepo** spanning three languages (TypeScript, Python, Go).

```
finmate.dev/
├── apps/
│   ├── frontend-web/                # Next.js 16 App Router — port 3000
│   ├── backend-api/                 # Express 5 REST API — port 4000
│   ├── ingestion-worker/            # RSS scraping (Node)
│   ├── enrichment-worker/           # AI enrichment via Groq (Node)
│   ├── arena-market-simulator/      # Trading sim engine (Node) — port 4001
│   ├── arena-agent-orchestrator/    # LLM agent orchestration (Node) — port 4002
│   ├── fundlens-scraper/            # Indian MF disclosures scraper (Python + Celery) — port 8001
│   ├── fundlens-api/                # Read API for fundlens schema (Go + Fiber) — port 5000
│   ├── chrome-extension/            # Vite + React browser extension
│   └── analytics/                   # Placeholder
├── packages/
│   ├── db/                          # Shared Prisma schema (public schema)
│   ├── ui/                          # React component library (@repo/ui)
│   ├── shared-types/                # Cross-app TS types
│   ├── arena-types/                 # Traders Arena types
│   ├── fundlens-types/              # Contracts for fundlens-api JSON envelope
│   ├── shared-utils/                # Utility functions
│   ├── eslint-config/               # Lint presets
│   └── typescript-config/           # TS configs (base / nextjs / react-library)
├── docs/superpowers/                # Specs and implementation plans
└── docker-compose.yml               # Postgres (pgvector) + Redis + optional fundlens profile
```

### Tech Stack

| Layer | Stack |
|-------|-------|
| **Frontend** | Next.js 16 (App Router), React 19, Tailwind v4, TanStack Query v5, recharts, better-auth |
| **Backend API** | Express 5, Prisma 6, ioredis, TypeScript, Node 22+ |
| **Workers (Node)** | ts-node-dev, groq-sdk, pino |
| **FundLens scraper** | Python 3.12, FastAPI, Celery (Redis broker), SQLAlchemy, Alembic, pdfplumber |
| **FundLens API** | Go 1.23, Fiber, sqlc |
| **Database** | PostgreSQL 16 with **pgvector** extension |
| **Cache / queue** | Redis 7 (caches + Celery broker) |
| **ML providers** | Groq (Llama 3.3 70B), HuggingFace (FinBERT, sentence-transformers), OpenRouter (Arena agents) |
| **Auth** | better-auth + Google/GitHub OAuth |
| **Monorepo** | Turborepo, pnpm workspaces |

---

## Prerequisites

- **Node.js** ≥ 22
- **pnpm** ≥ 9.0.0
- **Docker** + Docker Compose (Postgres + Redis)
- **Python 3.12+** *(only if running FundLens scraper locally without Docker)*
- **Go 1.23+** *(only if running FundLens API locally without Docker)*

---

## Quick Start

### 1. Clone & install
```bash
git clone https://github.com/StarLord824/finmate.dev.git
cd finmate.dev
pnpm install
```

### 2. Create env files

**`packages/db/.env`**
```env
DATABASE_URL="postgresql://postgres:password@localhost:5432/finmate"
DIRECT_URL="postgresql://postgres:password@localhost:5432/finmate"
```

**`apps/backend-api/.env`**
```env
DATABASE_URL="postgresql://postgres:password@localhost:5432/finmate"
REDIS_URL="redis://localhost:6379"
PORT=4000
NODE_ENV=development
FRONTEND_URL=http://localhost:3000
```

**`apps/frontend-web/.env.local`**
```env
NEXT_PUBLIC_API_URL=http://localhost:4000
NEXT_PUBLIC_FUNDLENS_API_URL=http://localhost:5000
NEXT_PUBLIC_APP_URL=http://localhost:3000
BETTER_AUTH_URL=http://localhost:3000
BETTER_AUTH_SECRET=<generate-32-byte-hex>
DATABASE_URL="postgresql://postgres:password@localhost:5432/finmate"
DIRECT_URL="postgresql://postgres:password@localhost:5432/finmate"
```

**`apps/ingestion-worker/.env`**
```env
DATABASE_URL="postgresql://postgres:password@localhost:5432/finmate"
REDIS_URL="redis://localhost:6379"
```

**`apps/enrichment-worker/.env`**
```env
DATABASE_URL="postgresql://postgres:password@localhost:5432/finmate"
REDIS_URL="redis://localhost:6379"
GROQ_API_KEY=<get from console.groq.com>
HUGGINGFACE_API_KEY=<get from huggingface.co/settings/tokens>
```

**`apps/arena-agent-orchestrator/.env`** *(optional, only if running Arena)*
```env
DATABASE_URL="postgresql://postgres:password@localhost:5432/finmate"
REDIS_URL="redis://localhost:6379"
OPENROUTER_API_KEY=<get from openrouter.ai>
PORT=4002
```

### 3. Start Postgres + Redis
```bash
pnpm db:up
```

### 4. Run migrations (FinMate `public` schema)
```bash
pnpm --filter @repo/db migrate
```

### 5. Start the core stack
```bash
pnpm dev:all
```

Spins up:
- 🌐 Frontend → http://localhost:3000
- 🔌 Backend API → http://localhost:4000
- 📰 Ingestion worker (RSS poll)
- 🤖 Enrichment worker (AI enrichment loop)
- 🗄️ Postgres → localhost:5432
- 💾 Redis → localhost:6379

### 6. (Optional) Start FundLens services
```bash
pnpm fundlens:migrate    # Run alembic migrations against fundlens schema
pnpm fundlens:up         # Start scraper + Celery worker + Go API
```

- 🐍 FundLens scraper → http://localhost:8001/health
- 🚀 FundLens Go API → http://localhost:5000

### 7. (Optional) Run Arena services
Run in separate terminals:
```bash
pnpm --filter arena-market-simulator dev
pnpm --filter arena-agent-orchestrator dev
```

---

## Scripts (root)

| Script | What it does |
|--------|--------------|
| `pnpm dev:all` | Postgres + Redis + Backend + Worker + Enrichment + Frontend |
| `pnpm dev:frontend` | Just Next.js (port 3000) |
| `pnpm dev:backend` | Just Express API (port 4000) |
| `pnpm dev:worker` | Just RSS ingestion worker |
| `pnpm dev:enrichment` | Just AI enrichment worker |
| `pnpm db:up` / `db:down` / `db:logs` | Manage Postgres + Redis containers |
| `pnpm fundlens:up` / `fundlens:down` / `fundlens:logs` | FundLens services (Docker profile) |
| `pnpm fundlens:migrate` | Run Alembic migrations against `fundlens` schema |
| `pnpm build` | Build all apps via Turborepo |
| `pnpm lint` | Lint all packages |
| `pnpm check-types` | TypeScript check across the monorepo |
| `pnpm format` | Prettier write (.ts, .tsx, .md) |

---

## Database

### Two schemas, two ownership models

| Schema | Owner | Migrations | Models |
|--------|-------|-----------|--------|
| `public` | `@repo/db` (Prisma) | `pnpm --filter @repo/db migrate` | Article, Source, User, Session, Account, Verification, Bookmark, ReadHistory, ArenaAgent, ArenaSimulation, ArenaParticipation, ArenaTrade, ArenaSnapshot, ArenaLeaderboard, MarketDataCache |
| `fundlens` | `fundlens-scraper` (Alembic) | `pnpm fundlens:migrate` | amc, fund_manager, scheme, holdings_snapshot, holding, holding_diff, isin_master, nav |

**Important:** Prisma does NOT manage the `fundlens` schema. The Go API in `fundlens-api` reads from it via sqlc-generated code; the Python scraper is the single writer. Schema snapshot for sqlc lives at `apps/fundlens-api/internal/schema/schema.sql` — keep in sync with the Alembic migrations.

### Prisma commands (FinMate schema)
```bash
cd packages/db

pnpm prisma generate                          # Regenerate client
pnpm prisma migrate dev --name <description>  # New migration
pnpm prisma migrate deploy                    # Apply in production
pnpm prisma studio                            # GUI on localhost:5555
```

### pgvector
The `Article` table has an `embedding vector(384)` column. The enrichment worker computes embeddings via HuggingFace `sentence-transformers/all-MiniLM-L6-v2`. Used for "related articles" and (future) semantic search.

---

## API Endpoints

### Backend API (Express, port 4000)

**Feed / Articles**
- `GET /feed?limit=20&after=<iso>&tags=<csv>&sources=<csv>` — paginated feed
- `GET /article/:id` — single article
- `GET /article/:id/related?limit=5` — related articles (vector similarity)
- `GET /search?q=<query>` — text search

**Meta**
- `GET /meta/categories` — all tags
- `GET /meta/sources` — all sources
- `GET /meta/trending?hours=24` — trending tags
- `GET /meta/market` — 6 marquee assets (India-first)
- `GET /meta/market/history?symbol=<>&range=<1d|1w|1m>` — chart history
- `GET /meta/market/symbols` — symbol catalog
- `GET /meta/market/category?name=<nse|us|indices|commodities|forex>` — category list
- `GET /meta/market/crypto-top?limit=50` — top crypto from CoinGecko
- `GET /meta/market/movers` — top 5 gainers + 5 losers across all assets

**User (requires auth)**
- `GET /user/preferences` / `POST /user/preferences`
- `POST /user/bookmark` — toggle bookmark
- `GET /user/bookmarks`
- `POST /user/history` — record read
- `GET /user/history?cursor=<>&limit=20`

**Auth**
- `/api/auth/*` — handled by better-auth (sign-in, sign-up, OAuth callbacks, session)

**Health**
- `GET /health`

### FundLens API (Go + Fiber, port 5000)
See `apps/fundlens-api/README.md`. Reads from `fundlens` schema.

### FundLens Scraper (Python + FastAPI, port 8001)
- `GET /health`
- Internal endpoints for triggering Celery scrape jobs

---

## ML / AI Configuration

The enrichment worker uses multiple free-tier providers with failover:

| Task | Primary | Fallbacks |
|------|---------|-----------|
| Article summary | Groq `llama-3.3-70b-versatile` | Cerebras, OpenRouter (`:free` models) |
| Tag extraction | Groq `llama-3.1-8b-instant` | Groq `gemma2-9b-it`, Gemini Flash |
| Sentiment | HuggingFace `ProsusAI/finbert` | Groq 8b as fallback classifier |
| Embeddings | HuggingFace `sentence-transformers/all-MiniLM-L6-v2` | HF `bge-small-en-v1.5` |
| Arena agent reasoning | OpenRouter free pool (Llama, Gemini, DeepSeek, Qwen) | Groq 8b |

Required env keys (free signups):
- `GROQ_API_KEY` — [console.groq.com](https://console.groq.com)
- `HUGGINGFACE_API_KEY` — [huggingface.co/settings/tokens](https://huggingface.co/settings/tokens)
- `OPENROUTER_API_KEY` — [openrouter.ai](https://openrouter.ai)

Optional:
- `GEMINI_API_KEY` — [aistudio.google.com](https://aistudio.google.com)
- `CEREBRAS_API_KEY` — [cloud.cerebras.ai](https://cloud.cerebras.ai)

---

## Frontend Routes

| Route | Description | Auth |
|-------|-------------|------|
| `/` | Landing page | Public |
| `/login` / `/signup` | Auth | Public |
| `/feed` | Personalized article feed | Required |
| `/search` | Article search | Required |
| `/bookmarks` | Saved articles | Required |
| `/history` | Reading history | Required |
| `/markets` | Tabbed multi-category markets (Movers / Crypto / Indian / US / Indices / Commodities / Forex) | Required |
| `/arena` | Traders Arena | Required |
| `/settings` | User preferences | Required |
| `/fundlens` | FundLens dashboard | Required |
| `/fundlens/amc/[slug]` | AMC detail | Required |
| `/fundlens/scheme/[slug]` | Scheme detail | Required |
| `/fundlens/scheme/[slug]/diffs` | Period-over-period holding changes | Required |
| `/fundlens/stock/[isin]` | Stock → funds holding it | Required |

---

## Deployment

| Service | Recommended host | Notes |
|---------|------------------|-------|
| `frontend-web` | Vercel | Already deployed |
| `backend-api` | Render Starter ($7) | Avoid free-tier cold starts |
| `ingestion-worker` | GitHub Actions cron | Hourly schedule |
| `enrichment-worker` | Fly.io 256 MB | Always-on, polls DB for unenriched articles |
| `arena-market-simulator` | Fly.io 512 MB | Always-on |
| `arena-agent-orchestrator` | Fly.io 512 MB | Always-on |
| `fundlens-scraper` (FastAPI + Celery) | Fly.io 512 MB × 2 | Web + Celery worker |
| `fundlens-api` | Fly.io 256 MB | Tiny Go binary |
| Postgres | Neon (pgvector enabled) | Free → Launch when needed |
| Redis | Upstash (`rediss://` for TLS) | Pay-as-you-go |

Run migrations on deploy:
```bash
pnpm --filter @repo/db migrate-deploy    # Prisma (public schema)
pnpm fundlens:migrate                    # Alembic (fundlens schema)
```

See `CLAUDE.md` for canonical project guidance and `docs/superpowers/` for specs and implementation plans.

---

## Project Layout (per-app)

### `apps/frontend-web/`
- `app/(marketing)/` — public pages (landing, login, signup)
- `app/(app)/` — authenticated routes (feed, markets, arena, fundlens, etc.)
- `components/` — feature components grouped by domain (`feed/`, `markets/`, `arena/`, `fundlens/`)
- `lib/` — API client, types, auth-client
- `proxy.ts` — auth-aware middleware (replaces `middleware.ts` in Next.js 16)

### `apps/backend-api/`
- `src/routes/` — Express route handlers grouped by domain
- `src/services/` — business logic
- `src/middleware/` — auth, error handling, request logging
- `src/lib/redis.ts` — Redis client singleton

### `apps/ingestion-worker/`
- `src/scrapers/` — per-source RSS scrapers
- `src/processors/` — content normalization

### `apps/enrichment-worker/`
- `src/ai/` — provider clients + failover router
- `src/index.ts` — main loop, polls for unenriched articles

### `apps/fundlens-scraper/`
- `src/fundlens_scraper/scrapers/` — per-AMC scrapers
- `src/fundlens_scraper/parsers/` — PDF/Excel extraction
- `alembic/versions/` — schema migrations

### `apps/fundlens-api/`
- `cmd/server/` — entrypoint
- `internal/handlers/` — Fiber handlers
- `internal/db/` — sqlc-generated DB layer
- `internal/queries/*.sql` — hand-written SQL (sqlc input)

---

## Contributing

```bash
git checkout -b feat/your-feature
# ... changes ...
pnpm check-types && pnpm lint
git commit -m "feat(scope): describe change"
git push -u origin feat/your-feature
gh pr create
```

See `CLAUDE.md` for detailed project guidance.

---

## License

MIT

---

## Acknowledgments

- Inspired by [daily.dev](https://daily.dev)
- Built with [Turborepo](https://turbo.build), [Next.js](https://nextjs.org), [Prisma](https://www.prisma.io), [Fiber](https://gofiber.io), [FastAPI](https://fastapi.tiangolo.com)
