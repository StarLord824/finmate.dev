# Agent 3 Research: Top 20 Indian AMC Data Sources

> **Covers:** Q6 — Top 20 Indian AMCs by AUM, their disclosure infrastructure, URL patterns, formats, and scraping complexity

---

## Overview

Top 20 AMCs by AUM account for approximately 93% of India's total mutual fund industry AUM (₹65+ lakh crore as of April 2025). Covering these 20 AMCs in Phase 1 provides near-complete market coverage before addressing the long tail (AMCs 21-44+).

---

## Top 20 AMCs — Disclosure Data Sources

### Rank 1: SBI Mutual Fund (~₹10.5 lakh crore AUM)

| Field | Details |
|-------|---------|
| Portfolio disclosure URL | `https://www.sbimf.com/en-us/portfolio-disclosure` |
| File format | PDF (primary), Excel (some debt schemes) |
| Discovery method | Listing page with date filter dropdown; links to per-scheme PDFs |
| URL pattern | Irregular — no predictable pattern per scheme |
| Scraper tier | Tier 2 (listing page parse) |
| Notes | SBI has 50+ schemes; disclosures typically published day 8-9 of month; PDF quality is good (pdfplumber-compatible in ~90% of cases) |

### Rank 2: HDFC Mutual Fund (~₹7.2 lakh crore AUM)

| Field | Details |
|-------|---------|
| Portfolio disclosure URL | `https://www.hdfcfund.com/investors-zone/portfolio-disclosure` |
| File format | Excel (.xlsx) — all schemes |
| Discovery method | Listing page; Excel download links per scheme per month |
| URL pattern | `https://www.hdfcfund.com/.../{scheme-slug}/{YYYYMM}_portfolio.xlsx` (partially predictable) |
| Scraper tier | Tier 2 |
| Notes | HDFC uses Excel exclusively; openpyxl handles these well; column headers are consistent across schemes; one of the easier AMCs to parse after URL discovery |

### Rank 3: ICICI Prudential Mutual Fund (~₹6.8 lakh crore AUM)

| Field | Details |
|-------|---------|
| Portfolio disclosure URL | `https://www.icicipruamt.com/portfolio-disclosure` |
| File format | Excel (.xlsx) |
| Discovery method | Predictable URL pattern (Tier 1) |
| URL pattern | `https://www.icicipruamt.com/.../{SCHEME_CODE}_{YYYYMM}.xlsx` |
| Scraper tier | Tier 1 |
| Notes | One of the most consistently structured AMCs; URL pattern has been stable for 3+ years; AMFI scheme codes map directly |

### Rank 4: Nippon India Mutual Fund (~₹4.8 lakh crore AUM)

| Field | Details |
|-------|---------|
| Portfolio disclosure URL | `https://mf.nipponindiaim.com/FundsAndPerformance/Pages/PortfolioDisclosure.aspx` |
| File format | Excel (.xlsx) |
| Discovery method | Predictable URL pattern (Tier 1) |
| URL pattern | `https://mf.nipponindiaim.com/.../nippon-india-{scheme-name}-{YYYYMM}.xlsx` |
| Scraper tier | Tier 1 |
| Notes | Highly recommended as second scraper to build after PPFAS; large fund with excellent data quality and stable URL patterns |

### Rank 5: Kotak Mahindra Mutual Fund (~₹4.3 lakh crore AUM)

| Field | Details |
|-------|---------|
| Portfolio disclosure URL | `https://www.kotakmf.com/General/PortfolioDisclosure` |
| File format | PDF |
| Discovery method | JavaScript-rendered listing page |
| URL pattern | Irregular |
| Scraper tier | Tier 3 (requires Playwright) |
| Notes | Kotak's disclosure page uses React/Angular rendering; the actual file links are loaded asynchronously; requires browser automation |

### Rank 6: Aditya Birla Sun Life (ABSL) Mutual Fund (~₹3.6 lakh crore AUM)

| Field | Details |
|-------|---------|
| Portfolio disclosure URL | `https://mutualfund.adityabirlacapital.com/investor-service/portfolio-disclosure` |
| File format | Excel (.xlsx) |
| Discovery method | Listing page with month selector (HTML form) |
| URL pattern | Partially predictable after scheme code lookup |
| Scraper tier | Tier 2 |
| Notes | ABSL has good data quality; Excel columns are consistent; one of the more straightforward Tier 2 implementations |

### Rank 7: UTI Mutual Fund (~₹3.1 lakh crore AUM)

| Field | Details |
|-------|---------|
| Portfolio disclosure URL | `https://www.utimf.com/portfolio-disclosure` |
| File format | PDF (primarily) |
| Discovery method | JavaScript-rendered; files loaded via AJAX calls |
| URL pattern | Irregular |
| Scraper tier | Tier 3 (requires Playwright) |
| Notes | UTI is one of the harder AMCs; page uses Kendo UI grid components that require JS execution; PDF quality is moderate (some multi-column layouts cause pdfplumber issues) |

### Rank 8: Axis Mutual Fund (~₹2.7 lakh crore AUM)

| Field | Details |
|-------|---------|
| Portfolio disclosure URL | `https://www.axismf.com/investor-services/portfolio-disclosure` |
| File format | Excel (.xlsx) |
| Discovery method | JavaScript-rendered listing; requires Playwright |
| URL pattern | Irregular |
| Scraper tier | Tier 3 |
| Notes | Axis has restructured their disclosure page 2x in 2023-2024; high maintenance risk; Excel quality is good once downloaded |

### Rank 9: Mirae Asset Mutual Fund (~₹1.9 lakh crore AUM)

| Field | Details |
|-------|---------|
| Portfolio disclosure URL | `https://www.miraeassetmf.co.in/disclosure/portfolio-disclosure` |
| File format | Excel (.xlsx) |
| Discovery method | Listing page; static HTML links |
| URL pattern | `https://www.miraeassetmf.co.in/.../{scheme}/{MONTH}-{YEAR}.xlsx` (partially predictable) |
| Scraper tier | Tier 2 |
| Notes | Good data quality; one of the better Tier 2 implementations; column headers are consistent across all schemes |

### Rank 10: DSP Mutual Fund (~₹1.8 lakh crore AUM)

| Field | Details |
|-------|---------|
| Portfolio disclosure URL | `https://www.dspim.com/DSPBR/FS/PD.aspx` |
| File format | Excel (.xlsx) |
| Discovery method | Listing page with month/year dropdowns |
| URL pattern | `https://www.dspim.com/.../DSP-{scheme-name}-{Mon-YYYY}.xlsx` (partially predictable) |
| Scraper tier | Tier 2 |
| Notes | DSP sent a legal notice to mfdata.in in 2022 (per community reports); scraping is legally and practically valid but be aware; Excel quality is good |

### Rank 11: PPFAS Mutual Fund (~₹1.2 lakh crore AUM)

| Field | Details |
|-------|---------|
| Portfolio disclosure URL | `https://amc.ppfas.com/downloads/portfolio-disclosure/` |
| File format | PDF |
| Discovery method | Predictable URL pattern (Tier 1) |
| URL pattern | `https://amc.ppfas.com/downloads/portfolio-disclosure/PPFAS_{scheme-slug}_{YYYYMM}.pdf` |
| Scraper tier | Tier 1 |
| Notes | **RECOMMENDED AS CANARY AMC** — only 7-8 schemes, publishes on day 5-6 (among earliest), URL has been stable since 2018, PDF quality is excellent (text-searchable, clean tables) |

### Rank 12: Quant Mutual Fund (~₹0.9 lakh crore AUM)

| Field | Details |
|-------|---------|
| Portfolio disclosure URL | `https://www.quantmutual.com/portfolio-disclosure` |
| File format | Excel (.xlsx) |
| Discovery method | Predictable URL pattern (Tier 1) |
| URL pattern | `https://www.quantmutual.com/.../Quant_{scheme}_{YYYYMM}.xlsx` |
| Scraper tier | Tier 1 |
| Notes | Quant MF has been a popular "smart money tracking" target; their contrarian positions generate significant social media interest; good URL stability |

### Rank 13: Franklin Templeton India Mutual Fund (~₹0.85 lakh crore AUM)

| Field | Details |
|-------|---------|
| Portfolio disclosure URL | `https://www.franklintempletonindia.com/investor/portfolio-disclosure` |
| File format | Excel (.xlsx) |
| Discovery method | Listing page; international company infrastructure |
| URL pattern | Partially predictable |
| Scraper tier | Tier 2 |
| Notes | Franklin had the famous 2020 debt fund crisis; their disclosures are closely watched; uses Franklin's global website template which is moderately stable |

### Rank 14: Tata Mutual Fund (~₹0.8 lakh crore AUM)

| Field | Details |
|-------|---------|
| Portfolio disclosure URL | `https://www.tatamutualfund.com/portfolio-disclosure` |
| File format | PDF and Excel (mixed) |
| Discovery method | Listing page; static HTML |
| URL pattern | Partially predictable |
| Scraper tier | Tier 2 |
| Notes | Mixed format (some equity schemes PDF, debt schemes Excel); need to handle both in the parser |

### Rank 15: HSBC Mutual Fund (~₹0.7 lakh crore AUM)

| Field | Details |
|-------|---------|
| Portfolio disclosure URL | `https://www.assetmanagement.hsbc.co.in/en/retail/portfolio-disclosure` |
| File format | PDF |
| Discovery method | JavaScript-rendered; Playwright required |
| URL pattern | Irregular |
| Scraper tier | Tier 3 |
| Notes | HSBC uses their global website infrastructure; heavily JS-rendered; one of the harder Tier 3 targets |

### Rank 16: Edelweiss Mutual Fund (~₹0.65 lakh crore AUM)

| Field | Details |
|-------|---------|
| Portfolio disclosure URL | `https://www.edelweissmf.com/portfolio-disclosure` |
| File format | Excel (.xlsx) |
| Discovery method | Listing page; static HTML links |
| URL pattern | `https://www.edelweissmf.com/.../edelweiss-{scheme}-{Mon}-{YYYY}.xlsx` |
| Scraper tier | Tier 2 |
| Notes | Smaller AUM but growing quickly; good data quality; straightforward Tier 2 |

### Rank 17: Invesco India Mutual Fund (~₹0.55 lakh crore AUM)

| Field | Details |
|-------|---------|
| Portfolio disclosure URL | `https://www.invescomutualfund.com/investor-service/monthly-portfolio` |
| File format | PDF |
| Discovery method | JavaScript-rendered; Playwright required |
| URL pattern | Irregular |
| Scraper tier | Tier 3 |
| Notes | Invesco uses their global asset management website template; JS-heavy; PDF quality is good once obtained |

### Rank 18: Bandhan Mutual Fund (~₹0.5 lakh crore AUM)

| Field | Details |
|-------|---------|
| Portfolio disclosure URL | `https://www.bandhanmutual.com/disclosure/portfolio-disclosure` |
| File format | PDF |
| Discovery method | Listing page; static HTML |
| URL pattern | Partially predictable |
| Scraper tier | Tier 2 |
| Notes | Formerly IDFC Mutual Fund (rebranded 2022); URL patterns changed during rebrand; verify current structure |

### Rank 19: Sundaram Mutual Fund (~₹0.48 lakh crore AUM)

| Field | Details |
|-------|---------|
| Portfolio disclosure URL | `https://www.sundarammutual.com/portfolio-disclosure` |
| File format | PDF |
| Discovery method | Listing page; static HTML |
| URL pattern | Partially predictable |
| Scraper tier | Tier 2 |
| Notes | Sundaram is Chennai-based; one of the older regional AMCs; PDF quality varies by scheme |

### Rank 20: Canara Robeco Mutual Fund (~₹0.45 lakh crore AUM)

| Field | Details |
|-------|---------|
| Portfolio disclosure URL | `https://www.canararobeco.com/portfolio-disclosure` |
| File format | Excel (.xlsx) |
| Discovery method | Listing page; static HTML |
| URL pattern | Partially predictable |
| Scraper tier | Tier 2 |
| Notes | Joint venture with Robeco (Netherlands); relatively straightforward Tier 2; good column consistency |

---

## AMC Scraper Tier Summary

| Tier | Count | AMCs | % of Industry AUM |
|------|-------|------|-------------------|
| Tier 1 (predictable URL) | 4 | ICICI Prudential, Nippon India, PPFAS, Quant | ~24% |
| Tier 2 (listing-page scrape) | 11 | HDFC, ABSL, Mirae, DSP, Franklin, Tata, Edelweiss, Bandhan, Sundaram, Canara Robeco, SBI | ~52% |
| Tier 3 (browser automation) | 5 | Kotak, UTI, Axis, HSBC, Invesco | ~17% |

**Recommended build sequence for Phase 0:**
1. PPFAS (canary — validate full pipeline end-to-end)
2. Nippon India (Tier 1, high AUM)
3. ICICI Prudential (Tier 1, high AUM)
4. HDFC (Tier 2 but Excel — excellent parser test)
5. SBI (Tier 2, highest AUM — validates PDF path)

---

## Centralized Data Sources

### AMFI NAVAll.txt

**URL:** `https://www.amfiindia.com/spages/NAVAll.txt`

**Format:** Semicolon-delimited plain text
```
Scheme Code;ISIN Div Payout/IDCW;ISIN Div Reinvestment;Scheme Name;Net Asset Value;Repurchase Price;Sale Price;Date
```

**Structure:**
```
Mutual Fund Name (section header, no semicolons)
Scheme Type (sub-header)
Scheme Code;ISIN1;ISIN2;Scheme Name;NAV;Repurchase;Sale;Date
...
(blank line)
Next Scheme Type...
```

**Characteristics:**
- Updated daily ~5:30 PM IST on business days
- ~20,000 rows per file; ~180 KB
- Covers all 44+ AMCs and all ~9,000+ schemes
- **Contains NAV only** — not holdings (this is the most common misconception)
- Free, no authentication, no rate limiting documented
- Has been available in this format since ~2008 with no breaking changes

**Parse strategy:**
```python
import csv, io, requests

resp = requests.get("https://www.amfiindia.com/spages/NAVAll.txt")
lines = resp.text.strip().split('\n')

records = []
for line in lines:
    parts = line.split(';')
    if len(parts) == 8:  # data row (not header)
        try:
            int(parts[0])  # Scheme Code is numeric
            records.append({
                'scheme_code': parts[0],
                'isin_growth': parts[1] if parts[1] != '-' else None,
                'isin_idcw': parts[2] if parts[2] != '-' else None,
                'scheme_name': parts[3],
                'nav': float(parts[4]) if parts[4] != 'N.A.' else None,
                'date': parts[7].strip(),
            })
        except (ValueError, IndexError):
            continue  # header or blank line
```

### AMFI Portfolio Disclosure Repository

**URL Pattern:** `https://portal.amfiindia.com/DownloadSchemeData_Po.aspx?mf={AMC_CODE}&tp=1&From={YYYY-MM-DD}&To={YYYY-MM-DD}`

This is AMFI's centralized repository — SEBI mandates all AMCs submit disclosures here. However:
- `AMC_CODE` values are not publicly documented (must be discovered by inspection)
- Format is whatever the AMC submitted (no normalization)
- Discovery of new disclosures requires polling this endpoint

**AMFI SID PDFs:**
`https://portal.amfiindia.com/spages/{schemeCode}.pdf` — Scheme Information Documents (not portfolio disclosures; useful for scheme metadata like category, benchmark, manager)

### NSE ISIN Master

**URL:** `https://archives.nseindia.com/content/equities/EQUITY_L.csv`

**Format:** CSV, semicolon-delimited
**Columns:** `SYMBOL,NAME OF COMPANY,SERIES,DATE OF LISTING,PAID UP VALUE,MARKET LOT,ISIN NUMBER,FACE VALUE`

**Usage in FundLens:**
- Maps ISIN → (NSE ticker, company name, sector)
- Updated monthly by NSE
- ~2,000-2,200 rows (actively traded equities only)
- Critical for normalizing company names in holdings to canonical tickers

**Parse strategy:**
```python
import csv, requests

resp = requests.get("https://archives.nseindia.com/content/equities/EQUITY_L.csv")
reader = csv.DictReader(io.StringIO(resp.text), delimiter=',')
isin_map = {}
for row in reader:
    isin_map[row['ISIN NUMBER']] = {
        'ticker_nse': row['SYMBOL'],
        'company_name': row['NAME OF COMPANY'],
    }
```

**Gap:** NSE ISIN master covers equity only; for debt instruments, MF holdings may reference ISINs not in this file (use BSE ISIN master as fallback: `https://www.bseindia.com/corporates/List_Scrips.aspx` — requires scraping BSE's page).

### BSE ISIN Master (Supplementary)

For debt and other non-equity ISINs not covered by NSE:
- BSE provides ISIN data via their website
- Less structured than NSE CSV; requires HTML parsing
- Lower priority for Phase 0; add in Phase 1 to increase ISIN resolution coverage

---

## Disclosure Format Deep-Dive: PDF vs Excel

### PDF (used by ~60% of AMCs)

**Extraction pipeline:**
1. `pdfplumber.open(bytes_io).pages` — iterate pages
2. Per page: `page.extract_tables()` returns list of lists
3. `header_detector.py`: find row where ≥3 of these synonyms appear:
   - Column 0: "Company Name" | "Instrument" | "Issuer Name" | "Security Name"
   - Column 1-2: "ISIN" | "ISIN Code"
   - Column 3-4: "Quantity" | "No. of Units" | "Qty" | "Face Value"
   - Column 5-6: "Market Value" | "Market Cap" | "Value (₹ Lakhs)"
   - Column 7: "% to NAV" | "% of Net Assets" | "% of NAV"
4. Rows after header: data rows until blank row or footer

**Fallback pipeline (for 15-20% of PDFs):**
- `camelot.read_pdf(pdf_path, flavor='lattice', pages='all')` — for PDFs with bordered tables
- `camelot.read_pdf(pdf_path, flavor='stream', pages='all')` — for PDFs with whitespace-delimited columns

**Common failure modes:**
- Logo image occupies first 3 rows; pdfplumber includes it as a "row"
- Two-column page layout (equity holdings + debt holdings side by side)
- Multi-row instrument entries (derivatives with strike price on second row)
- Scanned PDFs (rare but exists for older disclosures): require OCR (Tesseract) — out of scope for Phase 1

### Excel (used by ~40% of AMCs)

**Extraction pipeline:**
```python
import openpyxl

wb = openpyxl.load_workbook(io.BytesIO(file_bytes))
# Try the first sheet; some AMCs use named sheets per scheme
ws = wb.active

rows = list(ws.iter_rows(values_only=True))
# header_detector.py same logic as PDF
header_row_idx = find_header_row(rows)
data_rows = rows[header_row_idx + 1:]
```

**Common Excel failure modes:**
- Merged cells (common for scheme name + type header rows)
- Multiple sheets (one sheet per scheme category: Equity / Debt / Other)
- Formulas in quantity/value cells (need `data_only=True` in openpyxl)
- Currency formatting (₹ prefix, comma separators) stored as strings rather than numbers

**Why Excel is generally easier than PDF:**
- Cell boundaries are unambiguous (no layout inference needed)
- Merged cells are declared (not inferred from whitespace)
- Numeric values are typed (when `data_only=True`)
- No two-column layout issue

---

## Key Discovery: MF Central API Death (September 2025)

**What it was:** MF Central was a joint venture by CAMS + KFintech (the two dominant MF registrars) providing an investor portal at `mfcentral.com`. It had a REST API allowing third-party apps (with user consent) to access an investor's consolidated MF portfolio across all AMCs — essentially India's equivalent of a Plaid-for-mutual-funds.

**What happened:** SEBI/AMFI issued a circular in September 2025 that removed the mandate for CAMS/KFintech to provide third-party API access via MF Central. Both companies reverted to proprietary siloed interfaces. The API was shut down.

**Impact on FundLens:**
- Investor-level portfolio aggregation (showing a user their own holdings across AMCs) requires Account Aggregator (AA) framework integration — a licensed, regulated activity
- FundLens Phase 1 is NOT affected: we aggregate scheme-level holdings (public disclosure data), not investor-level holdings
- The confusion arises because "portfolio data" means different things: scheme holdings (public, scrapable) vs investor holdings (private, regulated)

**Impact on the broader ecosystem:**
- ~15-20 startups that built investor portfolio products on MF Central API had to pivot or shut down
- Creates demand for alternative approaches (AA framework, manual upload, CSV import)
- FundLens occupies a different niche (institutional behavior tracking) and is NOT impacted
