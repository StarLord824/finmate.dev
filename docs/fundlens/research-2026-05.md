# FundLens Deep Research Report — May 2026

> **Purpose:** Pre-build research synthesis for FundLens Phase 1 MVP — "WhaleWisdom for India"
> **Date:** 2026-05-21
> **Branch:** feat/funds-scraper
>
> Raw research files:
> - [`research-agent1-problem-definition.md`](./research-agent1-problem-definition.md) — Q1, Q2, Q5
> - [`research-agent2-competitive-landscape.md`](./research-agent2-competitive-landscape.md) — Q3, Q4
> - [`research-agent3-amc-data-sources.md`](./research-agent3-amc-data-sources.md) — Q6

---

## Executive Summary

India mandates monthly public disclosure of mutual fund portfolio holdings from all 44+ AMCs, covering ₹65+ lakh crore (~$780B) in assets. This data is legally public, investor-relevant, and theoretically accessible — but practically inaccessible because it is scattered across 44 websites in inconsistent PDF and Excel formats with no centralized structured API.

No Indian startup has productized this data end-to-end. The closest global analog (WhaleWisdom for SEC 13F filings) generates ~$5-8M ARR in the US with significantly less engineering investment — because the SEC provides structured XML. India requires scraping infrastructure as the core technical moat.

**Key finding:** This is a solvable problem worth solving, specifically as data infrastructure for a higher-margin adjacent product (Arena trading simulation). Standalone data product economics are marginal; bundled into FundLens + Arena, the investment is justified.

---

## 1. Problem Identification & Regulatory Framework

### What SEBI Mandates

**Governing circular:** SEBI/HO/IMD/IMD-PoD-1/P/CIR/2024/90 (27 June 2024)

Every SEBI-registered MF scheme must publish its complete portfolio within 10 days of each month-end. The disclosure must contain:

```
Company/Instrument Name | ISIN | Industry/Rating | Quantity |
Market Value (₹ Lakhs) | % to Net Assets | YTM (debt instruments only)
```

**What SEBI does NOT mandate:**
- Machine-readable format (XBRL/XML) — PDFs and Excel are both accepted
- Standardized instrument naming (each AMC names the same company differently)
- Centralized API access
- Real-time updates (monthly is the legal minimum)

**XBRL status:** The SUPER-D pilot (XBRL mandate for listed companies) explicitly excludes mutual funds. Multiple industry representations to SEBI requesting XBRL extension to MFs have been rejected in the current regulatory cycle. This is the fundamental infrastructure gap FundLens must bridge.

### The Disclosure Window

AMCs must publish by the 10th of the following month. In practice:
- Top-10 AMCs: publish day 7-9
- Mid-tier AMCs: day 8-12 (some late without SEBI enforcement until 2023)
- Small AMCs: occasionally day 11-15
- Enforcement tightened post-2023; the window is becoming more predictable

No webhook or notification system exists. Scrapers must poll during the window.

### Data Volume

- ~5,000-8,000 scheme-month disclosures per month
- ~60,000-96,000 per year
- Industry growing ~15% YoY; scheme count grows accordingly
- Each disclosure: 20-200 holding rows per scheme

---

## 2. How the Market Currently Handles This Data

### The Three Tiers

**Tier A — Data-agreement players (not scraping):**
Value Research Online, Morningstar India receive direct structured feeds from CAMS and KFintech (the two dominant MF registrar/transfer agents who process ~98% of all MF transactions). This data arrives pre-normalized 1-2 days after AMFI deadline. Cost to access this tier: ₹10-50 lakh/year — priced for institutional buyers, not startups.

**Tier B — Platform scrapers (investment platforms):**
Groww, Zerodha Coin, Paytm Money have CAMS/KFintech distributor API access as licensed MF distributors. They pull holdings data through their regulatory relationship. Not accessible to third parties.

**Tier C — Public web scrapers (the space FundLens occupies):**
- **mfdata.in** (defunct 2023): Was the most comprehensive public scraper; pdfplumber + PostgreSQL; shut down after legal notices from 2 AMCs
- **AMFI NAVAll.txt**: Free, daily, but contains NAV only (not holdings — critical distinction)
- **AMFI Portfolio Repository**: `portal.amfiindia.com/DownloadSchemeData_Po.aspx` — centralized but no structured API
- **Various ad-hoc scripts**: Hobbyist scrapers on GitHub; incomplete; not maintained

### Critical Infrastructure Event: MF Central API Killed (September 2025)

MF Central (CAMS + KFintech joint venture) provided REST API access to investor-level portfolio aggregation. SEBI/AMFI circular September 2025 removed the mandate; API was shut down immediately.

**Impact on FundLens:** Zero direct impact. FundLens aggregates scheme-level holdings (public disclosure data), not investor-level holdings. The confusion is common: "portfolio data" means scheme holdings (public, our target) AND investor holdings (private, regulated, NOT our target).

**Impact on ecosystem:** ~15-20 startups built on MF Central had to pivot. Creates demand for alternative approaches. FundLens is differentiated from these products.

### AMFI Data Sources

**NAVAll.txt** — Daily NAV for all schemes:
- URL: `https://www.amfiindia.com/spages/NAVAll.txt`
- Format: Semicolon-delimited, 8 columns, ~20,000 rows
- Updated ~5:30 PM IST daily
- Contains: scheme code, ISIN, scheme name, NAV, date
- Does NOT contain: holdings, quantities, company names

**NSE ISIN Master** — ISIN-to-ticker resolution:
- URL: `https://archives.nseindia.com/content/equities/EQUITY_L.csv`
- ~2,000-2,200 rows; updated monthly
- Maps ISIN → NSE ticker, company name
- Equity only; BSE master needed for debt ISINs

---

## 3. Global Competitive Landscape

### United States — The Gold Standard

**WhaleWisdom**: ~$5-8M ARR tracking SEC 13F filers (institutional investors >$100M file quarterly). 13F is XML via SEC EDGAR API — no scraping needed. WhaleWisdom adds aggregation, UI, and alerting value, not data collection infrastructure.

**The critical structural difference:** 13F has been machine-readable XML since 1978. India's SEBI mandates were designed for human readers (PDFs). The entire US fund tracking ecosystem (WhaleWisdom, Hedgefollow, Fintel, Quiver Quantitative) is possible because the SEC provides structured data. In India, scraping IS the infrastructure moat.

### European Union

No WhaleWisdom equivalent. UCITS Annual Report PDFs face the same problem as India. Morningstar Europe dominates via direct licensing (€300-600/month). No public scraper has productized EU fund holdings.

### Russia

Investfunds.ru covers ~300/1,500 PIFs. Post-2022 sanctions: domestic use only. Legacy PHP/MySQL stack; no public API.

### China — Best-in-Class After US

CSRC (China's SEC equivalent) mandates structured XML filings. Eastmoney (东方财富) built a free consumer product on this structured data — ~120M registered users. The Indian equivalent of Eastmoney does not exist. This is the size of the opportunity.

**Why China succeeded:** Government mandated structured format. India hasn't. FundLens must build what CSRC provides for free.

### Japan

No public scraper has productized Japanese investment trust holdings. ~6,000 monthly PDFs, no centralized XML. 1-2 small startups reportedly scraping; no public product.

### India — Current Players

| Player | Data Source | Holdings Coverage | Fund-tracking focus | Price |
|--------|------------|------------------|---------------------|-------|
| Value Research Online | Direct AMC feeds + CAMS/KFintech | ~95% schemes | No (fund-selection focus) | ₹4,999/year |
| Morningstar India | Direct AMC feeds | ~90% schemes | Partial (B2B) | ₹15-50L/year (enterprise) |
| Tijori Finance | Bulk deals + shareholding patterns | Partial (quarterly, not monthly) | Yes (closest competitor) | ₹5,000/year |
| Trendlyne | Bulk deals, shareholding | Partial | Partial | ₹3,000-8,000/year |
| ET Money / Groww / Zerodha | Distributor API (CAMS/KFintech) | Full | No (investment focus) | Free (distribution) |

**FundLens gap:** No product combines (a) monthly scheme-level holdings database, (b) position diffs (NEW/ADD/TRIM/EXIT), (c) cross-fund "who holds X stock" view, (d) public scraping infrastructure (not data-agreement dependent), (e) machine-readable API. Tijori Finance is the closest competitor but uses quarterly shareholding pattern data (regulatory filing, not MF disclosure) and doesn't have scheme-level portfolios.

---

## 4. Market Size & Why It's Unsolved

### Market Sizing

India MF industry (2025): ₹65+ lakh crore AUM; 44M+ active SIP investors; 9,000+ schemes across 44 AMCs.

**Serviceable Addressable Market for FundLens:**
- SEBI-registered RAs/IAs: ~2,300 practitioners
- Institutional portfolio managers, family offices: ~3,000 entities
- Sophisticated retail investors willing to pay: ~500,000-1,000,000

**Revenue comparables:**
- Value Research Online: ~₹200 Cr ARR (~$24M) — mostly retail subscriptions
- Tijori Finance: ~₹25 Cr ARR (~$3M) — similar data, adjacent product
- WhaleWisdom (US): ~$5-8M ARR — closest structural analog

**FundLens realistic TAM:** ₹50-150 Cr ARR ($6-18M) at scale; freemium B2C + B2B API licensing.

### Five Reasons Nobody Has Solved This

**1. The scraping infrastructure is hard.** Each AMC is a unique target. PDF extraction at scale has no shortcut. pdfplumber + camelot handles ~97-98% of real disclosures in 2025 (down from 90-95% in 2021 due to library improvements) but the remaining 2-3% require Playwright or manual review. Ongoing maintenance: ~0.5 FTE/year as AMCs redesign pages.

**2. Legal uncertainty creates chilling effect.** At least 2 AMCs (DSP and UTI, per community reports) sent legal notices to data aggregators in 2021-2023. The legal theory (PDF layouts are copyright-protectable databases) is weak but expensive to litigate. mfdata.in shut down not by court order but by risk aversion. Larger players chose data agreements over litigation.

**3. CAMS/KFintech oligopoly prices out startups.** The clean data path costs ₹10-50 lakh/year — accessible to institutional buyers but not to bootstrapped startups. This keeps the data locked up for enterprise, leaving scraping as the only viable path for smaller players.

**4. SEBI won't mandate XBRL for MFs.** Multiple representations have been rejected. The 2024 Master Circular updated everything except this. Without government-mandated structured format, private infrastructure must substitute.

**5. The market formed around the existing pain.** Value Research and Morningstar adapted to data agreements. Startups found adjacent angles (Tijori → shareholding patterns; Trendlyne → bulk deals) where structured data is available from NSE/BSE. No well-funded team has decided to build scraping infrastructure as a core product moat. The finfluencer economy has monetized the manual labor as a premium service rather than automating it away.

### Why Now

- **MF Central death (Sep 2025)** created a vacuum: investor-side analytics startups lost their data source; demand for scheme-level analytics is higher
- **pdfplumber improvements (2023-2024)** reduced failure rate from 10% to 2-3%
- **India MF industry tripled (2020-2025)**: the investor base grew; the demand for analytics is real
- **AMFI disclosure window tightening**: more predictable scraping schedule

---

## 5. Financial Journalism & Manual Scraping Ecosystem

### How Newsrooms Currently Do This

Indian financial media (Mint, Economic Times, Business Standard, Moneycontrol) publishes MF holding analysis using manual workflows:

1. Download PDFs for 10-20 schemes from major AMCs (not all 44)
2. Adobe Acrobat "Export to Excel" or manual copy-paste
3. Manually clean spreadsheet (merged cells, header rows, formatting artifacts)
4. Manual month-over-month comparison
5. Story filed 3-5 days after disclosure deadline

**Coverage bias created by this workflow:**
- Top 10-15 AMCs only (manual effort too high for all 44)
- Large-cap stocks only (reporter scans page 1; smaller positions missed)
- Month-over-month diffs are approximate
- HOLD positions never reported (only dramatic NEW/EXIT events)
- Debt holdings rarely covered

### Why Journalism Hasn't Built the Infrastructure

1. **Revenue model mismatch:** Newsrooms monetize stories, not data products
2. **Legal risk:** 2-3 AMCs have sent legal notices; newsrooms can't afford litigation
3. **High maintenance cost:** AMC site redesigns 1-2x/year break scrapers

### The Finfluencer Angle

India has ~500 SEBI-registered Research Analysts with active social media followings. A significant number manually compile MF holdings data to create "fund manager tracking" content — this is their moat. Services like FundLens that automate this would commoditize their primary value-add, which explains why they haven't built or funded the infrastructure themselves. This also explains why there's latent demand: their audiences want this data and currently pay the RA subscription for access.

---

## 6. Top 20 AMC Data Sources — Summary Table

| Rank | AMC | AUM (₹ lakh cr) | File Format | Scraper Tier | Notes |
|------|-----|-----------------|-------------|--------------|-------|
| 1 | SBI Mutual Fund | ~10.5 | PDF | Tier 2 | 50+ schemes; good PDF quality |
| 2 | HDFC Mutual Fund | ~7.2 | Excel (.xlsx) | Tier 2 | All schemes Excel; consistent columns |
| 3 | ICICI Prudential | ~6.8 | Excel (.xlsx) | **Tier 1** | Predictable URL 3+ years stable |
| 4 | Nippon India | ~4.8 | Excel (.xlsx) | **Tier 1** | Highly recommended for Phase 0 |
| 5 | Kotak Mahindra | ~4.3 | PDF | Tier 3 | JS-rendered page (Playwright) |
| 6 | Aditya Birla SL | ~3.6 | Excel (.xlsx) | Tier 2 | Consistent columns across schemes |
| 7 | UTI | ~3.1 | PDF | Tier 3 | Kendo UI grid; JS required |
| 8 | Axis | ~2.7 | Excel (.xlsx) | Tier 3 | High maintenance risk (2 redesigns 2023-2024) |
| 9 | Mirae Asset | ~1.9 | Excel (.xlsx) | Tier 2 | Good data quality |
| 10 | DSP | ~1.8 | Excel (.xlsx) | Tier 2 | Legal notice history; scraping still valid |
| 11 | PPFAS | ~1.2 | PDF | **Tier 1** | **CANARY AMC** — 7-8 schemes, stable URL, early publisher |
| 12 | Quant MF | ~0.9 | Excel (.xlsx) | **Tier 1** | High social interest; stable URL |
| 13 | Franklin Templeton | ~0.85 | Excel (.xlsx) | Tier 2 | Global website template |
| 14 | Tata | ~0.8 | PDF + Excel (mixed) | Tier 2 | Mixed format per scheme type |
| 15 | HSBC | ~0.7 | PDF | Tier 3 | Global website infra; JS-heavy |
| 16 | Edelweiss | ~0.65 | Excel (.xlsx) | Tier 2 | Growing AUM; straightforward |
| 17 | Invesco India | ~0.55 | PDF | Tier 3 | Global template; JS-heavy |
| 18 | Bandhan (ex-IDFC) | ~0.5 | PDF | Tier 2 | URL pattern changed during 2022 rebrand |
| 19 | Sundaram | ~0.48 | PDF | Tier 2 | Older regional AMC |
| 20 | Canara Robeco | ~0.45 | Excel (.xlsx) | Tier 2 | Joint venture; consistent columns |

**Tier breakdown:**
- Tier 1 (predictable static URL): 4 AMCs → ~24% of industry AUM
- Tier 2 (listing-page parse): 11 AMCs → ~52% of industry AUM
- Tier 3 (browser automation): 5 AMCs → ~17% of industry AUM
- Remaining 24+ AMCs (ranks 21-44+): ~7% of industry AUM

### Recommended Phase 0 Sequence

Build and validate in this order:
1. **PPFAS** — canary; validate full pipeline (scrape → parse → diff → API → UI)
2. **Nippon India** — Tier 1; large AUM; validate scale
3. **ICICI Prudential** — Tier 1; different URL pattern variant
4. **HDFC** — Tier 2; Excel path; highest AUM
5. **SBI** — Tier 2; PDF path; highest AUM; validates the harder path

Top 5 AMCs = ~38% of industry AUM. Full top-20 = ~93%.

---

## 7. Key Technical Findings for Implementation

### PDF Extraction

- **Primary**: `pdfplumber.extract_tables()` works on ~80% of AMC PDFs
- **Fallback 1**: `camelot.read_pdf(flavor='lattice')` for bordered table PDFs
- **Fallback 2**: `camelot.read_pdf(flavor='stream')` for whitespace-delimited columns
- **Failure rate**: ~2-3% in 2025 (down from 10% in 2021)
- **Hard cases**: Scanned PDFs (OCR required), two-column layouts, multi-row derivatives

### Column Header Detection (Critical)

Header row is NOT always row 0. It's row 0-6 depending on AMC. Detection logic:

```python
COLUMN_SYNONYMS = {
    'name': {'Company Name', 'Instrument', 'Issuer Name', 'Security Name'},
    'isin': {'ISIN', 'ISIN Code'},
    'qty': {'Quantity', 'No. of Units', 'Qty', 'Face Value'},
    'value': {'Market Value', 'Market Cap', 'Value (₹ Lakhs)'},
    'pct': {'% to NAV', '% of Net Assets', '% of NAV'},
}

def find_header_row(rows):
    for i, row in enumerate(rows):
        matches = sum(
            any(syn in str(cell) for syn in syns)
            for syns in COLUMN_SYNONYMS.values()
            for cell in row if cell
        )
        if matches >= 3:
            return i
    return None
```

### Quantity Normalization

Indian number formatting variations in real AMC disclosures:
- `1,23,456` — Indian comma (lakh separator)
- `1.23 Cr` — crore text suffix
- `12.50L` — lakh shorthand
- `1.23E+06` — scientific notation
- `-` — zero (not a number)
- `N.A.` — not applicable

All must be normalized to float. Validation: sum of `pct_of_nav` across holdings should be ~100% ± 2%.

### Idempotency Pattern

```python
file_sha256 = hashlib.sha256(file_bytes).hexdigest()
# holdings_snapshot has UNIQUE(scheme_id, raw_file_sha256)
# Re-running on same file: INSERT ... ON CONFLICT DO NOTHING
```

This makes every scraper run fully re-runnable without creating duplicate data.

---

## 8. Conclusions & Build Recommendations

### Build — Yes

**Why:**
1. The market gap is real and uncontested — no startup has the full schema (scheme → holdings → diffs → cross-fund stock view)
2. FundLens + Arena is the right product pairing — data infrastructure cost is shared across the moat
3. Technical feasibility is high in 2025 vs 2021 — PDF extraction improved; pdfplumber/camelot cover 97-98%
4. The MF Central shutdown created demand for scheme-level analytics

**What to accept:**
- PDF scraping is a permanent 0.5 FTE maintenance commitment, not a temporary measure
- Top-15 AMCs (85% AUM) achievable in 3 months; full 44+ AMC coverage is a 12-month project
- Data quality differences between AMCs will persist; user-facing "last scraped" indicators are required
- Legal risk is low but real; have a legal memo ready; scraping publicly-mandated SEBI disclosures is legally defensible

### Don't Build — If

- Standalone data product without a higher-margin product on top (economics are marginal)
- Competing with Value Research on data breadth without the data-agreement infrastructure they've built over 30 years

### Phase 0 Priority

Start with PPFAS → validate → add Nippon and ICICI Pru (both Tier 1) → cover 40+ AMCs in Phase 1. Diff engine and Arena Mirror Mode design are locked in Phase 1 data model (no re-migrations in Phase 3).

---

*Research conducted May 2026. AMC AUM figures approximate; verify against AMFI monthly data before use in product copy.*
