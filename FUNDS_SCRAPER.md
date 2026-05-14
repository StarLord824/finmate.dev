# FundLens — Project Definition & Master Plan
> Indian Mutual Fund Intelligence & Simulation Platform
> Version 1.0 — May 2026

---

## Table of Contents

1. [Background & Inspiration](#1-background--inspiration)
2. [What the Problem Actually Is](#2-what-the-problem-actually-is)
3. [How Fund Data Works in India](#3-how-fund-data-works-in-india)
4. [Project Definition](#4-project-definition)
5. [Expanded Vision — Simulation Engine](#5-expanded-vision--simulation-engine)
6. [Market Feasibility & Expansion Strategy](#6-market-feasibility--expansion-strategy)
7. [Technical Architecture](#7-technical-architecture)
8. [Data Model](#8-data-model)
9. [Feature Roadmap](#9-feature-roadmap)
10. [Timeline](#10-timeline)
11. [Monetization Strategy](#11-monetization-strategy)
12. [Career & IP Strategy](#12-career--ip-strategy)
13. [Risks & Mitigations](#13-risks--mitigations)
14. [Next Steps](#14-next-steps)

---

## 1. Background & Inspiration

### The US Precedent

In the US, any institutional investment manager controlling over $100M in US equities must file a **Form 13F** quarterly with the SEC, listing all long positions. These filings live on EDGAR as structured XML and are the foundation of tools like WhaleWisdom, HedgeFollow, and Fintel — platforms that track where institutional money is moving, what's being bought and sold, and what smart money consensus looks like.

The data pipeline for US firms:
- Poll EDGAR's full-text search / RSS feeds for new 13F-HR filings
- Parse XML info tables (issuer name, CUSIP, share count, value)
- Diff quarter-over-quarter to detect new buys, trims, exits
- Resolve CUSIPs to tickers via OpenFIGI API
- Classify fund type (stock-picker vs quant hedge) to weight signal value

### The India Gap

India has **more frequent** mandatory disclosures than the US — monthly, not quarterly — but no central structured database equivalent to EDGAR. The data is scattered across 40+ AMC websites as PDFs and Excel files with no standardized format. This fragmentation is precisely why no serious intelligence tool exists for the Indian market yet.

---

## 2. What the Problem Actually Is

### For Retail Investors
They have no easy way to know what India's top fund managers are actually buying or selling each month. The data is public but buried in PDFs across dozens of websites.

### For RIAs and Analysts
No tool gives them a clean, queryable view of cross-fund overlap, sector rotation, or manager-level conviction tracking.

### For Quant Researchers
No clean historical holdings API exists for Indian mutual funds. The closest is mfapi.in — which gives NAV data only, not holdings intelligence.

### For the Market
Nobody has built the equivalent of WhaleWisdom for India, despite:
- 40+ AMCs
- 1500+ schemes
- 10Cr+ SIP accounts
- Monthly disclosure mandates from SEBI
- A retail investor base growing rapidly post-Zerodha/Coin

---

## 3. How Fund Data Works in India

### Regulatory Framework

| Entity | Role |
|--------|------|
| **SEBI** | Regulator — mandates all disclosure requirements |
| **AMFI** | Industry body — publishes daily NAVs, monthly industry data, links to AMC portfolio pages |
| **AMCs** | Individual fund houses — publish monthly portfolio disclosures on their own websites |
| **CAMS / KFintech** | RTAs (Registrar & Transfer Agents) — process transactions, hold investor data |

### Disclosure Types

| Disclosure | Frequency | Format | Where |
|------------|-----------|--------|-------|
| Portfolio holdings | Monthly | PDF / Excel | AMC websites |
| Debt portfolio | Fortnightly | PDF / Excel | AMC websites |
| Daily NAV | Daily | Plain text | `amfiindia.com/spages/NAVAll.txt` |
| Monthly AAUM | Monthly | Structured | AMFI website |
| Overlap disclosures | Monthly (from 2026) | AMC websites | Post SEBI Feb 2026 circular |

### Key SEBI 2026 Regulatory Changes (Relevant to This Project)
- **SEBI Mutual Funds Regulations 2026** — lower base expense ratios, unbundled levies, implemented April 1, 2026
- **Portfolio overlap limits** — sectoral/thematic funds can't have >50% overlap with other equity schemes from same AMC; monthly overlap disclosures mandated
- **Base Expense Ratio (BER)** — fund houses must show base fee separately from GST/STT

These changes are actively creating demand for analysis tools that can surface overlap, cost comparison, and positioning data.

### Existing Tools & Their Gaps

| Tool | Coverage | Gap |
|------|----------|-----|
| mfapi.in | NAV data, 14k+ schemes | No holdings, no intelligence |
| mfdata.in | NAV + basic holdings | No diffs, no signals, no manager tracking |
| AMFI portal | Links to AMC pages | Not queryable, no aggregation |
| Morningstar India | Some fund data | Expensive, not India-first, no signal layer |
| WhaleWisdom | US 13F only | No India coverage |

---

## 4. Project Definition

### Purpose

A data intelligence platform that aggregates, normalizes, and analyzes publicly disclosed mutual fund portfolio data — making institutional-grade fund tracking accessible without a Bloomberg terminal. The "WhaleWisdom for India" — but with a better intelligence layer.

### Goals

- Scrape and normalize SEBI-mandated portfolio disclosures across all Indian AMCs into a structured, queryable database
- Surface meaningful signals: new positions, exits, consensus buys, sector rotation, fund manager moves
- Expose this via a clean UI and developer API
- Expand to a simulation engine powered by real fund data and LLMs

### Stakeholders & Their Needs

| Stakeholder | Primary Need |
|-------------|-------------|
| **Retail investors** | Know what smart money is buying; mirror high-conviction funds |
| **SEBI-registered advisors (RIAs)** | Portfolio overlap analysis, fund comparison, compliance-safe data |
| **Independent analysts / finfluencers** | Content generation, trend spotting, sector rotation narratives |
| **Quant researchers / algo traders** | Clean historical holdings API, diff data, signal generation |
| **Fintech startups** | White-label data API to power their own portfolio tools |
| **Financial journalists** | Verify fund activity claims, spot emerging themes |
| **ML researchers** | RL training environment with real institutional data as ground truth |

### Audience & Requirements

**Primary — Retail + semi-pro investors (India)**
- No jargon — "Fund X added ₹340Cr in Reliance this month" not raw table dumps
- Mobile-first (India is mobile-primary)
- WhatsApp / email alerts (WhatsApp is primary notification channel in India)
- Free tier must be genuinely useful (India's price sensitivity)
- Hindi/regional language support (roadmap)

**Secondary — RIAs and analysts**
- CSV/Excel export (they live in spreadsheets)
- Overlap analysis across client-held funds
- Historical data 3-5 years minimum
- SEBI-compliant disclaimers baked in

**Tertiary — Developers / quants**
- REST API with clean OpenAPI documentation
- Webhook support for real-time alerts on new disclosures
- Rate-limited free tier, paid tier for bulk/historical access

---

## 5. Expanded Vision — Simulation Engine

The platform has two compounding layers:

```
Layer 1 — Data Intelligence
  └── Fund holdings, diffs, sector rotation, manager tracking, signals

Layer 2 — Simulation Engine
  └── Virtual trading environment powered by live data + LLMs
```

### Three Simulation Use Cases

**A. Mirror Mode (User-facing, Phase 3)**
- User picks a fund manager to "follow"
- Platform auto-executes virtual trades matching that manager's disclosed moves
- User sees P&L of following that strategy with zero real money at risk
- Massive user engagement and retention mechanic

**B. LLM Market Simulator (User-facing, Phase 3)**
- Feed the LLM: current macro context, fund positioning, sector rotation, historical patterns
- Users ask natural language questions: "What is Quant MF buying aggressively this quarter?"
- What-if scenarios: "What if Mirae exits their entire HDFC Bank position?"
- Scenario outputs simulated price implications based on historical pattern matching

**C. RL Training Environment (Institutional, Phase 4)**
- OpenAI Gym / Gymnasium-compatible Python interface
- State: fund holdings snapshot + NSE price data
- Action space: buy/sell/hold
- Reward signal: derived from subsequent actual price movements
- Unique differentiation — uses real institutional positioning as a state variable, not price data alone

### Why This Is Defensible

Most trading simulators use synthetic or price-only data. This platform uses:
- Actual institutional positioning (what smart money holds)
- Behavioral patterns of specific fund managers over years
- LLM reasoning that understands market narratives, not just numbers

That combination — real institutional data + LLM simulation — does not exist as a product today.

---

## 6. Market Feasibility & Expansion Strategy

### India First — Strong Case
- 40+ AMCs, 1500+ schemes, mandatory monthly disclosures
- No serious competitor in this exact niche
- SIP investor accounts crossed 10 Cr; retail interest is massive and growing
- SEBI 2026 regulations actively creating demand for overlap and transparency tools
- Stack (Next.js, Supabase, TypeScript) maps directly to the build

### US Expansion — Phase 3
- Data is cleaner (EDGAR XML) but the space is crowded
- Makes sense as Phase 3 once India is proven
- Adding a data source, not rebuilding the platform
- Cross-market angle: "global funds buying Indian ADRs" is genuinely new

### International — Phase 4+
- UK: FCA disclosures
- EU: UCITS fund disclosures under ESMA
- Each jurisdiction is a separate engineering cost
- Evaluate based on user demand signals from Phase 2-3

---

## 7. Technical Architecture

### Guiding Principles

- **Right tool for the right layer** — not a uniform stack
- **BaaS first, migrate deliberately** — Supabase early, self-hosted at scale
- **Build in public** — open source the non-moat parts, keep intelligence layer proprietary
- **Migration is the story** — migrating off Supabase at 50M rows is a better engineering narrative than never using it

### Stack by Layer

```
┌─────────────────────────────────────────────────────┐
│              SCRAPING & PARSING LAYER                │
│  Language: Python                                    │
│  ├── pdfplumber / camelot    PDF table extraction    │
│  ├── openpyxl / pandas       Excel parsing           │
│  ├── httpx + asyncio         Async HTTP requests     │
│  └── APScheduler / Celery    Job scheduling          │
└─────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────┐
│                DATA STORAGE LAYER                    │
│  Phase 1-3: Supabase (Postgres + Storage)            │
│  Phase 4+:  Self-hosted Postgres on Hetzner          │
│             + Cloudflare R2 (S3-compatible storage)  │
│             + Redis + BullMQ (job queues)            │
│             + Redpanda (Kafka-compatible event stream)│
└─────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────┐
│                  API LAYER                           │
│  Language: Go                                        │
│  Framework: Fiber or Chi                             │
│  Serves: public data API                            │
│  Reason: high-concurrency reads, low memory cost     │
└─────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────┐
│                WEB APPLICATION LAYER                 │
│  Language: TypeScript                                │
│  Framework: Next.js 15 (App Router)                  │
│  Client state: TanStack Query                        │
│  Auth: Better-Auth                                   │
│  Utility scripts: Bun (cron jobs, CLI tools)         │
└─────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────┐
│              ML / SIMULATION LAYER                   │
│  Language: Python                                    │
│  ├── FastAPI             Simulation endpoints        │
│  ├── Gymnasium           RL environment interface    │
│  ├── PyTorch             Model training              │
│  └── Anthropic SDK       LLM layer (Claude)          │
└─────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────┐
│           INFRASTRUCTURE (Phase 4+)                  │
│  ├── Hetzner VPS         Cheap, powerful hosting     │
│  ├── Coolify             Self-hosted PaaS            │
│  ├── Cloudflare          CDN, DDoS, R2 storage       │
│  └── Better-Auth         Custom auth (off Supabase)  │
└─────────────────────────────────────────────────────┘
```

### Language Rationale

| Language | Where | Why |
|----------|-------|-----|
| **Python** | Scraping, parsing, ML | Unmatched ecosystem: pdfplumber, pandas, PyTorch, Gymnasium |
| **Go** | API gateway, data serving | Goroutines for concurrent scraping; low memory for high-throughput API |
| **TypeScript** | Web app, utility scripts | App Router familiarity; TanStack Query; type safety across data contracts |
| **Bun** | Standalone scripts only | Fast startup for cron/CLI tools; NOT primary runtime for Next.js |

### BaaS Migration Path

```
Phase 1-3:  Supabase (fast iteration, validate product)
Phase 4:    Hit real limits → migrate piece by piece
            └── Supabase Auth → Better-Auth (custom)
            └── Supabase Storage → Cloudflare R2
            └── Supabase Postgres → Self-hosted on Hetzner
            └── Vercel → Coolify (self-hosted PaaS)
```

---

## 8. Data Model

### Core Hierarchy

```
AMC (fund house)
  └── Fund Manager
        └── Scheme (individual fund)
              └── Holdings Snapshot (monthly)
                    └── Holding (stock, qty, value, ISIN)
                          └── Diff (vs previous month)
```

### Primary Tables

```sql
-- Fund houses
amc (
  id, name, sebi_reg_no, website, logo_url,
  created_at, updated_at
)

-- Individual fund managers
fund_manager (
  id, amc_id, name, since_date,
  bio, photo_url
)

-- Individual schemes
scheme (
  id, amc_id, manager_id,
  amfi_code, isin_growth, isin_idcw,
  name, category, sub_category,
  benchmark, aum_cr, expense_ratio,
  created_at, updated_at
)

-- Monthly holdings snapshots
holdings_snapshot (
  id, scheme_id,
  disclosure_date, aum_at_disclosure,
  raw_file_url, parsed_at
)

-- Individual stock holdings
holding (
  id, snapshot_id,
  isin, ticker_nse, ticker_bse,
  company_name, sector,
  quantity, market_value_cr,
  pct_of_nav
)

-- Month-over-month diffs
holding_diff (
  id, scheme_id,
  isin, ticker_nse,
  prev_snapshot_id, curr_snapshot_id,
  prev_qty, curr_qty, qty_delta,
  prev_value_cr, curr_value_cr,
  action  -- NEW | ADD | TRIM | EXIT | HOLD
)

-- Virtual portfolios (simulation layer)
virtual_portfolio (
  id, user_id, name,
  mirror_scheme_id,  -- null if custom
  created_at
)

virtual_trade (
  id, portfolio_id, isin,
  action, qty, price,
  source,  -- MIRROR | MANUAL | LLM_SIGNAL
  executed_at
)
```

### ISIN Resolution

- Source: NSE ISIN master file (free, updated monthly at nseindia.com)
- Maps: ISIN → NSE ticker, company name, sector, industry
- Refreshed: Monthly cron job
- Fallback: BSE scrip master for BSE-only listings

---

## 9. Feature Roadmap

### Phase 1 — MVP (Month 1–3)
**Tagline: Something real users can open and get value from**

- [ ] AMC directory — all fund houses with AUM, scheme count
- [ ] Scheme detail page — current month holdings table
- [ ] Stock page — "which funds currently hold Reliance"
- [ ] Basic diff view — what changed this month per scheme
- [ ] AMFI NAV integration — daily updated
- [ ] Scraper coverage: all 40+ AMCs

### Phase 2 — Intelligence Layer (Month 4–6)
**Tagline: Better than anything that exists today**

- [ ] Fund manager profile pages with cross-scheme aggregation
- [ ] Smart money consensus — stocks accumulated by 5+ funds simultaneously
- [ ] Sector rotation tracker with time-series charts
- [ ] New position alerts (email)
- [ ] Full-text search — any stock, any AMC, any manager
- [ ] Portfolio overlap analysis (two schemes side by side)
- [ ] SEBI 2026 overlap compliance tracker
- [ ] SEO pages for every AMC, scheme, and stock
- [ ] WhatsApp alerts (via WhatsApp Business API)

### Phase 3 — Simulation Engine (Month 7–9)
**Tagline: Paper trade with real institutional data**

- [ ] Virtual portfolio engine — paper trades tied to fund disclosures
- [ ] Mirror mode — follow a fund manager's moves automatically
- [ ] P&L simulation dashboard
- [ ] LLM natural language query layer
  - "What is Quant MF aggressively buying this quarter?"
  - "Which funds have been reducing IT exposure for 3+ months?"
- [ ] Scenario simulator — "what if fund X exits stock Y entirely?"

### Phase 4 — Monetization + Public Launch (Month 10–12)
**Tagline: First revenue**

- [ ] Freemium model — free tier vs paid tier
- [ ] Developer REST API with OpenAPI docs
- [ ] Rate limiting and API key management
- [ ] CSV/Excel export for RIA audience
- [ ] Webhook support for real-time disclosure alerts
- [ ] Product Hunt launch
- [ ] Technical blog post — architecture deep dive

### Phase 5 — US Expansion (Month 13–18)
**Tagline: International data, same platform**

- [ ] EDGAR 13F scraper pipeline
- [ ] CUSIP → ticker resolution via OpenFIGI
- [ ] US fund intelligence pages
- [ ] Cross-market view — "global funds buying Indian ADRs"

### Phase 6 — RL Training Environment (Month 18–24)
**Tagline: Institutional / quant tier**

- [ ] Python SDK with Gymnasium-compatible interface
- [ ] Historical simulation environment (real holdings as state)
- [ ] LLM market simulator for scenario testing
- [ ] Institutional pricing tier
- [ ] Documentation and research examples

---

## 10. Timeline

### Summary

| Phase | What | Duration | Milestone |
|-------|------|----------|-----------|
| 0 | Data pipeline, 3-5 AMCs | Weeks 1–3 | End-to-end pipeline working |
| 1 | MVP, all AMCs, basic UI | Month 2–3 | Live public URL |
| 2 | Intelligence layer | Month 4–6 | Real differentiated value |
| 3 | Simulation + LLM | Month 7–9 | Unique product exists |
| 4 | Monetization + launch | Month 10–12 | First paying users |
| 5 | US expansion | Month 13–18 | International data |
| 6 | RL environment | Month 18–24 | Quant/institutional tier |

### Phase 0 Detail (Weeks 1–3)

Critical path:
1. Set up Supabase schema
2. Scraper for SBI MF, HDFC MF, Nippon (largest AMCs, most consistent formats)
3. PDF parser extracting holdings table into normalized rows
4. ISIN → NSE ticker resolver
5. Basic diff engine (month-over-month delta)

> **Warning:** PDF parsing will break your assumptions multiple times. AMC formats are inconsistent. Budget 40% extra time here.

### Known Slowdowns

- AMC PDF format changes break parsers without warning — budget 1 day/month for parser maintenance once covering all 40+ AMCs
- SEBI disclosure timelines are inconsistent — some AMCs upload on the 10th, some on the 25th; some backfill
- LLM financial queries need careful prompt engineering — hallucinations on financial data destroy user trust
- Finding first 100 real users takes longer than building the product
- RL environment requires ML expertise — do not underestimate

### The One Variable That Changes Everything

One good distribution moment — a viral tweet, a mention by a finance YouTuber, a Zerodha blog reference — compresses the timeline to monetization significantly. Building in public from Phase 1 creates those moments intentionally.

---

## 11. Monetization Strategy

### Freemium Structure

| Tier | Price | Access |
|------|-------|--------|
| **Free** | ₹0 | Last 3 months data, 5 AMCs, basic diff view, 100 API calls/day |
| **Pro** | ₹499/month | Full history, all AMCs, alerts, overlap analysis, mirror mode |
| **Analyst** | ₹1999/month | Excel export, advanced signals, RIA-friendly disclaimers, 10k API calls/day |
| **Developer API** | ₹4999/month | Unlimited API, webhooks, OpenAPI docs, bulk historical download |
| **Institutional** | Custom | RL environment access, white-label, SLA |

### B2B Data Licensing

- Sell normalized holdings data as API to smaller fintechs
- ₹5–15k/month per API client is realistic for a niche B2B data product
- Builds revenue and credibility simultaneously

### Acquisition / Acqui-hire Path

If the platform reaches 5–10k active users, firms like Smallcase, Coin (Zerodha), or HDFC Securities would evaluate it seriously — not as a billion-dollar acquisition, but as an acqui-hire of a team that built something they want.

---

## 12. Career & IP Strategy

### Protecting the Work

| Asset | Protection |
|-------|------------|
| **Brand / name** | Trademark registration via IP India (~₹5–10k per class) |
| **Codebase** | Automatic copyright from day one; formally register |
| **Intelligence algorithms** | Trade secret — do not publish the diff/signal engine |
| **Database** | Database protection under Indian copyright law (with substantial creative structure added) |
| **Moat** | Data network effect — years of normalized historical data + parser coverage across all AMCs |

> Note: Ideas cannot be patented. The moat is the execution, the historical data, and the intelligence layer — not the concept itself.

### Career Path

**Why educational background is not the blocker:**
- Zerodha's founders are not IIT graduates
- Quant firms evaluate via problem-solving tests, not degree filters
- The IIT filter exists primarily at mass campus recruitment — not relevant when approaching with a live product
- A live platform with real users, clean code, and technical writing outweighs a college tag at any serious fintech firm

**What this project signals to Zerodha / Groww / quant firms:**
- Deep understanding of SEBI regulatory infrastructure
- Ability to build scraper-to-signal pipeline end to end
- Systems thinking across data, product, and infrastructure
- Finance domain knowledge that most engineers lack
- Shipped something real people use

**Build in Public Strategy:**
- Document every technical decision — why Go for the API, how the PDF parser handles format changes, how ISIN resolution works
- Open source non-moat parts: AMFI NAV scraper, ISIN resolver, AMC portfolio scraper templates
- Keep proprietary: diff engine, signal generation, LLM simulator, classification algorithms
- Publish one technical blog post per major milestone

**Realistic Hiring / Acquisition Paths:**

- **Path A (Direct):** Live product + technical writing → LinkedIn visibility → inbound interest from fintech PMs and engineering heads
- **Path B (Acqui-hire):** 5–10k users → Smallcase / Coin conversation
- **Path C (Consulting):** Data API licensing to smaller fintechs builds revenue + credibility simultaneously

---

## 13. Risks & Mitigations

| Risk | Likelihood | Mitigation |
|------|------------|------------|
| AMC changes PDF format | High (ongoing) | Parser monitoring with automated regression tests; alert on parse failure |
| SEBI centralizes data portal | Low | Intelligence layer remains valuable regardless of data source |
| AMFI restricts third-party data sharing | Medium | Use only public disclosure pages, not MF Central APIs |
| Regulatory classification as investment advice | Medium | SEBI-compliant disclaimers; frame as educational/informational; no forward-looking recommendations |
| RL environment complexity underestimated | High | Needs dedicated ML co-builder; don't attempt solo |
| User acquisition slower than expected | High | Build in public from day one; target finance Twitter and Reddit (r/IndiaInvestments) |
| Scraper coverage gaps for smaller AMCs | Medium | Prioritize top 15 AMCs (cover 85%+ of industry AUM) before expanding to all 40+ |

### Legal Note on SEBI Compliance

SEBI has strict rules around investment advice. If simulation outputs are framed as recommendations ("fund X is buying Y, you should too"), it enters regulated territory. Design framing from day one as:
- Simulated/educational
- Historical analysis only
- No forward-looking recommendations

This is solvable with disclaimers and careful UX copy but must be designed in from Phase 1, not retrofitted.

---

## 14. Next Steps

### Immediate (This Week)
- [ ] Finalize project name
- [ ] Set up monorepo structure (Turborepo / pnpm workspaces)
- [ ] Initialize Supabase project
- [ ] Write the initial schema migration
- [ ] Build first scraper: SBI MF monthly portfolio page

### Step 2 (Next Session)
- Schema design in detail
- Scraper architecture — how to handle 40+ AMCs with varying formats
- ISIN resolution pipeline design
- Diff engine logic

### Step 3 (After Schema)
- PDF parsing strategy per AMC category
- Job queue design for scraper workers
- First working end-to-end pipeline for 3 AMCs

---

## Appendix A — Key Data Sources

| Source | URL | What it provides |
|--------|-----|-----------------|
| AMFI daily NAV | `amfiindia.com/spages/NAVAll.txt` | All scheme NAVs, updated daily |
| AMFI portfolio disclosure | `amfiindia.com/online-center/portfolio-disclosure` | Links to all AMC portfolio pages |
| NSE ISIN master | `nseindia.com` | ISIN → NSE ticker mapping |
| BSE scrip master | `bseindia.com` | ISIN → BSE ticker mapping |
| SEBI MF list | `sebi.gov.in` | Official registered AMC list |
| mfdata.in | `mfdata.in/api/v1` | Community API — use for reference/validation only |

## Appendix B — Competitive Landscape

| Tool | Market | Strength | Weakness |
|------|--------|----------|----------|
| WhaleWisdom | US | Deep 13F coverage, clean UX | No India coverage |
| HedgeFollow | US | 10k+ institutional investors | No India |
| Fintel.io | US | 13F + NPORT aggregation | No India |
| mfapi.in | India | Free, reliable NAV | No holdings, no intelligence |
| mfdata.in | India | Holdings + NAV | No diffs, no signals, no manager tracking |
| Morningstar India | India | Brand recognition | Expensive, not India-first |
| **This platform** | **India-first** | **Full stack: data + intelligence + simulation** | **To be built** |

---

*Document maintained by: Abhinav*
*Last updated: May 2026*
*Status: Phase 0 — Pre-build*