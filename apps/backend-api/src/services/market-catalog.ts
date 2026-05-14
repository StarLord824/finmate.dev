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
