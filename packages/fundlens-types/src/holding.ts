export interface Holding {
  isin: string | null;
  tickerNse: string | null;
  tickerBse: string | null;
  companyName: string;
  sector: string | null;
  quantity: number | null;
  marketValueCr: number | null;
  pctOfNav: number | null;
}

export interface HoldingsSnapshot {
  schemeSlug: string;
  schemeName: string;
  disclosureDate: string;
  aumAtDisclosure: number | null;
  parserVersion: string;
  holdings: Holding[];
}
