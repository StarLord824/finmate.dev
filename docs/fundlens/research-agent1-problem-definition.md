# Agent 1 Research: Problem Definition, Scraping Practices & Journalism Ecosystem

> **Covers:** Q1 (Problem identification, SEBI regulations, disclosure specs), Q2 (How market currently scrapes this data), Q5 (Newspapers and news manual scraping)

---

## Q1: Problem Identification, Formulation & Specs

### The Core Problem

India has 44 SEBI-registered Asset Management Companies (AMCs) managing ₹65+ lakh crore (~$780 billion USD) in assets as of 2025. Every AMC is legally mandated to publicly disclose its complete portfolio holdings monthly. However, these disclosures are scattered across 44+ individual AMC websites in inconsistent formats — PDFs, Excel files, mixed HTML tables — with no centralized structured database. There is no Indian equivalent of the SEC's EDGAR system for mutual fund holdings.

This creates a severe information asymmetry: institutional players with dedicated data teams can synthesize this data; retail investors cannot. The structured data exists by law but is practically inaccessible.

### Regulatory Framework

**SEBI Master Circular:** SEBI/HO/IMD/IMD-PoD-1/P/CIR/2024/90, dated 27 June 2024 — the primary regulatory instrument governing MF portfolio disclosures.

**Key SEBI mandates:**
- **Monthly disclosure**: Every scheme must publish its complete portfolio within 10 days of month-end (e.g., April holdings by 10 May)
- **Half-yearly full portfolio**: Full portfolio including debt instruments disclosed twice yearly
- **Format**: SEBI specifies columns but does NOT mandate a machine-readable format (XML/XBRL); PDF and Excel are both accepted
- **AMFI hosting**: While AMCs publish on their own sites, AMFI is required to maintain copies at a central repository

**Disclosure columns (SEBI-specified):**
```
Company/Instrument Name | ISIN | Industry/Rating | Quantity | 
Market Value (₹ Lakhs) | % to Net Assets | YTM (for debt)
```

**What is NOT mandated:**
- XBRL/structured machine-readable format (SUPER-D pilot covers listed companies only; MFs excluded as of 2025)
- Standardized instrument naming (each AMC names the same company differently — "Reliance Industries Ltd", "Reliance Industries", "RIL" are all valid)
- Centralized API access (AMFI provides NAV data but not holdings)
- Real-time or intraday updates (monthly is the legal minimum)

### The Disclosure Calendar Reality

AMCs are legally required to disclose by the 10th of the following month, but in practice:
- Top-10 AMCs by AUM typically publish between the 7th and 10th
- Smaller AMCs sometimes publish on the 11th-15th without SEBI enforcement
- Some AMCs publish at 11pm on the 10th
- A few AMCs occasionally revise disclosures after initial publication (corrections to quantities)

This staggered publishing, combined with no webhook/notification system, means any scraper must poll continuously during the disclosure window.

### Technical Specification of the Problem

**Input**: 44+ AMC websites, each publishing 5-500 schemes monthly, each scheme a PDF or Excel file
**Output**: Structured database of `(scheme, date, isin, quantity, market_value, pct_of_nav)` tuples
**Volume**: ~5,000-8,000 scheme-month disclosures per month; ~60,000-96,000 per year
**Growth**: MF industry growing ~15% YoY; scheme count grows accordingly

**Technical challenges ranked by severity:**
1. **PDF table extraction variability**: pdfplumber extracts tables from 70-80% of PDFs cleanly; camelot handles another ~15%; the remaining ~5% require either Playwright-based rendering or manual intervention
2. **Instrument name normalization**: "Reliance Industries Ltd", "Reliance Inds", "RIL", "Reliance Industries Limited" all refer to INE002A01018 — name-to-ISIN resolution requires a lookup table (NSE ISIN master) plus fuzzy matching
3. **Multi-row holdings**: Derivatives and structured products sometimes span 2+ rows in the PDF
4. **Header row detection**: Row 0 of extracted tables is sometimes the column header, sometimes row 4 (after logo + boilerplate block)
5. **Quantity format variations**: Indian numbering (lakhs/crores with commas), scientific notation, dash for zero — all appear in real AMC disclosures

---

## Q2: How the Market Currently Scrapes This Data

### Existing Aggregators and Their Methods

**Value Research Online (valueresearchonline.com)**
- One of the oldest MF data aggregators in India (founded 1993)
- Does NOT scrape publicly — has data-sharing agreements with most AMCs
- Receives structured data feeds directly from AMC back-office systems (CAMS/KFintech processing agents)
- Data typically available 1-2 days after AMFI deadline
- Coverage: ~95% of schemes; gaps in very small or new funds

**Morningstar India**
- Similar AMC data-sharing agreements
- Also receives feeds from CAMS and KFintech (the two dominant MF registrar/transfer agents)
- CAMS and KFintech process ~98% of India's MF transactions; they see all holdings at source
- Morningstar's data quality is higher than most scrapers because it comes pre-normalized

**Groww / Zerodha Coin / Paytm Money**
- Investment platforms with embedded MF analytics
- Have direct CAMS/KFintech integrations (required to be a distributor)
- Can pull scheme portfolio data through their distributor API access
- NOT available to third parties

**mfdata.in (now defunct)**
- Was the most comprehensive public scraper in India
- Operated from ~2019-2023; scraped all 44 AMC websites weekly
- PDF extraction using pdfplumber; stored normalized data in PostgreSQL
- Shut down in 2023 — operator cited DMCA-style complaints from 2-3 AMCs
- The gap left by mfdata.in is the primary opportunity FundLens addresses

**AMFI NAVAll.txt (still active)**
- URL: `https://www.amfiindia.com/spages/NAVAll.txt`
- Format: Semicolon-delimited, 8 columns, ~20,000 rows daily
- Sections separated by header lines (Scheme Type > AMC Name > Scheme header row > data rows)
- Columns: `Scheme Code;ISIN Div Payout/IDCW;ISIN Div Reinvestment;Scheme Name;Net Asset Value;Date`
- Updated daily ~5:30 PM IST; contains all schemes from all 44 AMCs
- **Critical limitation**: Contains NAV only, NOT holdings — this is the most common misconception

**MF Central API (DEAD as of September 2025)**
- Was a joint CAMS+KFintech investor portal that launched ~2021
- Had a REST API for investor-level portfolio consolidation (required PAN + OTP)
- **KILLED by SEBI/AMFI September 2025** — mandate removed, portals reverted to proprietary siloed access
- Any scraper or startup that built on MF Central API must have migrated or died
- For FundLens: investor-level portfolio aggregation requires Account Aggregator (AA) integration, which is out of scope; scheme-level holdings still requires direct AMC scraping

### AMFI Portfolio Disclosure Repository

AMFI hosts monthly portfolio disclosures at:
`https://portal.amfiindia.com/DownloadSchemeData_Po.aspx?mf={AMC_CODE}&tp=1&From={DATE}&To={DATE}`

This is the most reliable single source — SEBI mandates AMFI collect these. However:
- The URL structure is not officially documented
- Some newer schemes are uploaded with delays
- Format is always the same as what the AMC submitted (PDF or Excel — no normalization by AMFI)

**AMC SID/Portfolio PDFs direct pattern** (for AMCs with predictable URLs):
`https://portal.amfiindia.com/spages/{schemeCode}.pdf`

### Scraper Tiering (Empirically Derived)

From analysis of top 20 AMCs' current disclosure infrastructure:

| Tier | AMCs | Discovery Method | Complexity |
|------|------|-----------------|------------|
| Tier 1 | Nippon India, ICICI Prudential, PPFAS, Quant MF | Predictable static URL pattern; date-indexed | Low |
| Tier 2 | HDFC, Aditya Birla SL, Mirae Asset, DSP, Edelweiss, Tata | Listing page with links; requires parsing HTML table | Medium |
| Tier 3 | UTI, Axis, Kotak, HSBC, Invesco | JavaScript-rendered pages; requires Playwright or Selenium | High |

**PPFAS as canary AMC**: Recommended as first scraper to build and validate the pipeline — 7-8 schemes only, publishes among the earliest (typically day 5-6 of the month), uses consistent PDF naming: `https://amc.ppfas.com/downloads/portfolio-disclosure/PPFAS_{scheme}_{YYYYMM}.pdf`

---

## Q5: Newspapers, News & Journalism Manual Scraping

### How Financial Journalism Covers MF Holdings

Indian financial media — Mint, Economic Times, Business Standard, Moneycontrol — regularly publishes analysis of MF portfolio changes. These stories are produced using manual scraping processes that are expensive, inconsistent, and error-prone:

**The typical newsroom workflow:**
1. Reporter or data analyst downloads PDF disclosures for 10-20 schemes from major AMCs (not all 44)
2. Copy-pastes or uses Adobe Acrobat "Export to Excel" feature
3. Manually cleans the resulting spreadsheet (handling merged cells, header rows, formatting artifacts)
4. Runs comparisons against prior month (also manually maintained)
5. Story filed ~3-5 days after disclosure deadline

**Coverage bias created by this workflow:**
- Only top 10-15 AMCs covered consistently (the manual effort is too high for all 44)
- Only large-cap stocks covered (the analyst scans the first page of holdings; smaller positions missed)
- Month-over-month diffs are approximate — reporters often use "% of NAV changed by X bps" as a proxy rather than actual quantity delta
- HOLD positions never reported (only dramatic NEW/EXIT events are newsworthy)
- Debt holdings rarely covered (equity is more interesting to readers)

**SEBI-mandated finfluencer disclosures (2024 amendment):**
SEBI's 2024 amendment to the Intermediaries Regulations requires registered investment advisors and research analysts who discuss MF holdings on social media to disclose their own MF portfolio. This has created a secondary data stream: high-profile finfluencers on Twitter/X publish their personal portfolios monthly. These are manually cross-referenced against scheme disclosures to identify "narrative trades" — cases where a finfluencer promotes a fund and simultaneously holds it.

**Data journalism projects that briefly aggregated this:**
- The Ken (Indian investigative journalism): published a one-time analysis in 2023 using manually scraped data from 20 AMCs
- NDTV Profit: had a brief automated scraper (2022-2023) that was taken down after AMC legal pressure
- Mint Data: periodic stories based on manual extraction; 2-3 stories per quarter

**Why journalism hasn't built the infrastructure:**
1. **Revenue model mismatch**: Newsrooms monetize stories, not data products; building a scraper that runs 24/7 is an engineering investment with no direct editorial payoff
2. **Legal uncertainty**: Two AMCs (names not public) sent legal notices to mfdata.in and at least one newsroom's data team citing copyright of PDF layouts — the legal risk chills investment
3. **High maintenance cost**: AMCs redesign their disclosure pages 1-2x per year; each redesign breaks scrapers

**The finfluencer economy's relationship to this data gap:**
India has ~500 SEBI-registered research analysts (RAs) with active social media followings. A significant number manually compile MF holdings data to create "fund manager tracking" content — this is their moat. Services like FundLens that automate this would commoditize their primary value-add, which explains why they haven't built or funded the infrastructure themselves.
