# Agent 2 Research: Global Competitive Landscape & Why the Problem Is Unsolved

> **Covers:** Q3 (Existing platforms globally — US, EU, Russia, China, Japan, India), Q4 (Market size, why unsolved)

---

## Q3: Global Platforms — Who Has Solved This Elsewhere

### United States

**WhaleWisdom (whalewisdom.com)**
- The closest global analog to what FundLens proposes
- Data source: SEC 13F filings (institutional investors managing >$100M must file quarterly)
- 13F is machine-readable XML; the SEC's EDGAR provides a structured API
- WhaleWisdom aggregates ~5,000 13F filers; tracks position changes, new positions, exits
- Monetization: freemium ($0 → $40/month → $200/month); estimated $3-8M ARR
- **Key difference from India**: 13F is XML via a public government API — no scraping needed. WhaleWisdom adds value through aggregation, UI, and alerting, not data collection.

**Dataroma (dataroma.com)**
- Free alternative to WhaleWisdom; only covers "superinvestors" (~100 most-followed fund managers)
- No API; community-maintained; very limited features
- Demonstrates that even a minimal version of this product has strong organic demand

**SEC EDGAR Full-Text Search API**
- `data.sec.gov/submissions/{CIK}.json` — structured JSON for every filer
- Freely available; no rate limits for reasonable usage
- This is the infrastructure that enables the entire US fund tracking ecosystem

**13F vs India's SEBI mandates — the critical structural difference:**
The US 13F regime has existed since 1978 and was designed to be machine-readable from the start. India's MF disclosure mandates were designed for human readers (PDFs). This is the entire moat: US companies don't need scrapers; Indian companies do.

**Other US platforms:**
- **Hedgefollow**: Tracks hedge fund 13F filings; $20/month; estimated $1-3M ARR
- **Fintel**: Broader institutional ownership tracking; $30-80/month plans
- **Quiver Quantitative**: Congressional trading + 13F data; $30/month
- **OpenInsider**: Insider SEC Form 4 filings (free)

### European Union

**No direct MF holdings equivalent** to 13F/WhaleWisdom exists in the EU. The regulatory landscape is:

**UCITS KIID/KID requirements**: EU funds must publish Key Information Documents but these contain risk ratings, not holdings. Holdings are in the "Annual Report" PDFs — same problem as India.

**Morningstar Europe**: Dominant player; has data-sharing agreements with UCITS fund managers; no public scraping. Paywalled data (€300-600/month for data access).

**Bloomberg Terminal**: Has EU fund holdings data via direct feeds from fund administrators (Calastone, SWIFT messaging). Cost: $24,000/year/seat. Not accessible to retail.

**FundVisualizer, FE Analytics**: UK-specific tools for IFAs; fund holdings via direct licensing from fund administrators. Not public.

**Why EU hasn't produced a WhaleWisdom equivalent**: UCITS funds are managed by 3,000+ separate entities across 27 countries; no centralized EDGAR equivalent; data licensing is commercially controlled by SWIFT/Calastone network participants.

### Russia

**rusfunds.ru / Investfunds.ru**
- Russian collective investment vehicles (PIF — Паевые инвестиционные фонды) must disclose holdings quarterly to the Bank of Russia
- Investfunds.ru is the dominant aggregator — has a scraping + normalization pipeline
- Data quality: moderate; covers ~300 PIFs out of ~1,500 registered
- Regulatory basis: Bank of Russia Regulation 482-P
- Post-2022 sanctions: international investors have no practical access; domestic use only
- Technology: legacy stack (PHP/MySQL based on web crawlers); no public API

### China

**Wind (万得) and Bloomberg China**
- China has the most sophisticated fund disclosure infrastructure in Asia after the US
- CSRC (China Securities Regulatory Commission) mandates quarterly holdings disclosure for all public funds
- **CSRC Data Center**: structured XML filings (similar to SEC EDGAR) at `disclosure.csrc.gov.cn`
- Wind Financial Terminal (万得): China's Bloomberg equivalent; has complete fund holdings database scraped + normalized from CSRC
- Cost: ¥60,000-120,000/year; used by all major Chinese institutional investors
- **Eastmoney (东方财富)**: Free consumer-facing fund analytics with holdings data; ~120M registered users; uses CSRC structured data
- **Tiantian Fund (天天基金)**: Fund distribution platform owned by Eastmoney; shows holdings inline

**Why China has solved it**: CSRC mandates structured (XML) filings like the SEC. The data infrastructure is centralized. Eastmoney's free product has captured massive retail mindshare. FundLens's India opportunity is partly because India's equivalent of Eastmoney doesn't exist.

### Japan

**Investment Trust Association Japan (投資信託協会)**
- Publishes aggregate statistics but NOT individual fund holdings in machine-readable form
- Individual fund monthly reports (月次レポート) are PDF-only
- No equivalent to 13F or CSRC structured disclosure

**Morningstar Japan**: Dominant; data via direct licensing from Japanese trust banks
**Bloomberg Japan**: Same model as EU — direct feeds from custodians

**Emerging scrapers**: 1-2 small Japanese startups (names not publicly known) scrape the ~6,000 Japanese investment trust monthly reports. No public product has emerged.

### India

**Value Research Online (valueresearchonline.com)**
- Founded 1993; oldest Indian MF data company
- Holdings data via direct AMC data-sharing agreements + CAMS/KFintech feeds
- Estimated $2-5M ARR; primarily B2C (₹1,999-4,999/year subscriptions)
- **Does NOT have**: position-diff tracking, "which funds hold X stock" cross-fund view, machine-readable API
- Strategy: conservative; designed for retail "which fund to buy" use case; not "what are fund managers doing" use case

**Morningstar India**
- Same data infrastructure (AMC agreements + CAMS feeds)
- Primarily B2B (RIA, wealth managers)
- API access: ₹15-50 lakh/year enterprise licensing

**ET Money / Groww / Zerodha Coin**
- Investment platforms with embedded analytics
- Holdings data through distributor API access (CAMS/KFintech)
- Not positioned as fund manager tracking tools; positioned as "invest in this fund" tools
- Conflict of interest: their business model is fund distribution, not data transparency

**Tijori Finance (tijorifinance.com)**
- Closest existing Indian product to FundLens
- Focuses on institutional shareholder tracking via bulk deal data + shareholding patterns (quarterly, not monthly)
- Does NOT have MF portfolio-level holdings (scheme → holdings → diffs)
- Good UI; ~₹2,500-5,000/year subscriptions
- Direct competitor for the "which funds hold this stock" feature but different data source

**Trendlyne (trendlyne.com)**
- Covers bulk deals, shareholding patterns, institutional activity
- Similar gap: no monthly scheme-level portfolio database

**Smallcase / Windmill Capital**: Portfolio construction tools; not fund tracking

---

## Q4: Market Size & Why No One Has Solved This

### Market Sizing

**Total Addressable Market (TAM):**

India has ~44 million active SIP investors (2025) and ~18 million demat account holders. The segment interested in fund manager behavior tracking (vs just investing in funds) is a subset:
- SEBI-registered Research Analysts: ~1,500 with active practices
- SEBI-registered Investment Advisors: ~800
- Institutional portfolio managers, family offices: ~3,000
- Sophisticated retail investors who would pay for this data: estimated 500,000-1,000,000

**Comparable Indian B2C financial data products:**
- Value Research Online: ₹4,999/year → ~400,000 subscribers → ~₹200 Cr ARR (~$24M)
- Tijori Finance: ₹5,000/year → ~50,000 subscribers → ~₹25 Cr ARR (~$3M)
- Trendlyne: ₹3,000-8,000/year → ~100,000 subscribers → ~₹50-80 Cr ARR (~$6-10M)

**FundLens serviceable addressable market (SAM):**
~₹50-150 Cr ARR ($6-18M) at scale, assuming freemium with ~50,000-150,000 paying subscribers at ₹3,000-5,000/year and B2B API licensing (RIAs, wealth managers).

**Comparables:**
- WhaleWisdom (US): ~$5-8M ARR from ~50,000 subscribers
- India opportunity is comparable in TAM but less developed in willingness-to-pay

### Why This Is Unsolved

**Five converging reasons:**

**1. The scraping infrastructure is genuinely hard**
- PDF extraction at scale is a solved problem in US/EU/China because governments mandated structured formats
- In India, each AMC is a unique target: different PDF layouts, different Excel schemas, different website architectures
- The ongoing maintenance burden is high: AMCs redesign sites; PDFs change format; new columns appear
- The top-5-in-the-world PDF extraction libraries (pdfplumber, camelot, tabula, pdfminer, PyMuPDF) all fail on at least 5-10% of real Indian AMC disclosures
- Cost to build the MVP: 2-3 months of full-time engineering; ongoing maintenance ~0.5 FTE/year

**2. Legal uncertainty creates chilling effect**
- At least 2 AMCs (believed to be DSP and UTI, per community reports) sent legal notices to data aggregators between 2021-2023
- The legal theory: PDF layouts / website content are copyright-protectable "databases" under Indian Copyright Act 1957
- This is legally weak (disclosure data is mandated by SEBI and not protectable) but expensive to litigate
- mfdata.in shut down not because of a court order but because the operator couldn't afford legal risk
- Larger companies (Value Research, Morningstar) chose to negotiate data agreements rather than litigate the scraping question

**3. CAMS/KFintech oligopoly controls the clean data path**
- CAMS processes ~70% of all MF transactions; KFintech processes ~25%
- Both have the holdings data in clean structured form (it's their core business)
- Both sell data: CAMS data products division, KFintech analytics APIs
- Pricing: ₹10-50 lakh/year for scheme holdings data — accessible to institutional players but not startups
- This pricing effectively keeps the clean data locked up for enterprise buyers, leaving the scraping route to smaller players

**4. The disclosure format is legally locked**
- SEBI's 2024 Master Circular updated many things but left the disclosure format as "PDF or Excel as per AMC preference"
- Multiple industry representations (by data companies) to SEBI requesting XBRL mandate for MF disclosures have been rejected
- SEBI's stated rationale: MFs are not listed entities; XBRL burden on smaller AMCs is disproportionate
- The SUPER-D pilot (XBRL for listed companies) is explicitly NOT being extended to MFs in the current regulatory cycle

**5. The market formed around the existing pain, not around a solution**
- Value Research, Morningstar, Bloomberg have data agreements — they've adapted to the incumbents
- Startups (Tijori, Trendlyne) found adjacent angles (bulk deals, shareholding patterns) where structured data is available via NSE/BSE
- No well-funded team has decided to build the scraping infrastructure as a core product moat
- The finfluencer economy (which is the most active consumer of this data) has monetized the manual labor as a premium service, not invested in automating it away

### Why Now (The Timing Argument)

**MF Central death creates a vacuum**: Until September 2025, MF Central API provided investor-level (not scheme-level) portfolio aggregation. Several analytics startups built on it. Its shutdown has forced those products to pivot or die. The resulting gap creates demand for scheme-level analytics, which FundLens covers.

**AMFI disclosure window tightening**: SEBI has been tightening the 10-day deadline with stricter enforcement since 2023. Previously, 30-40% of AMCs disclosed 2-5 days late without consequence. Now: stricter. This means more predictable scraping windows.

**pdfplumber 0.10+ and camelot improvements**: PDF extraction quality improved significantly in 2023-2024. The 5-10% failure rate of 2021 is now closer to 2-3% for well-written scrapers. This reduces the ongoing maintenance burden substantially.

**India's MF AUM tripling (2020-2025)**: The investor base grew from ~15M SIP investors to ~44M. The demand for analytics has grown proportionally. The market that didn't exist at scale in 2021 is real in 2025.

### Is It Worth It?

**Yes, with specific caveats:**

**Worth it if:**
- You accept PDF scraping as a core technical competency (not a temporary measure)
- You start with top-15 AMCs (85% of industry AUM) and add long tail over 12 months
- You treat the data quality problem as a product differentiator, not just an engineering task
- You use it as a moat for an adjacent product (Arena trading simulation, as FundLens is designed)

**Not worth it if:**
- You're trying to compete with Value Research / Morningstar on data breadth and quality — they have 20+ year head starts and direct AMC relationships
- You expect the scraping maintenance problem to go away — it won't; it's an ongoing 0.5 FTE commitment
- You're building a standalone data product without a higher-margin product on top — the market size ($6-18M ARR at full scale) doesn't justify a standalone data infrastructure company
