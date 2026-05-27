import type { DiffAction } from "./diff";

export interface StockDetail {
  isin: string;
  tickerNse: string | null;
  tickerBse: string | null;
  companyName: string;
  sector: string | null;
  industry: string | null;
}

export interface StockHolder {
  schemeSlug: string;
  schemeName: string;
  amcName: string;
  quantity: number | null;
  marketValueCr: number | null;
  pctOfNav: number | null;
  asOfDate: string;
}

export interface StockRecentDiff {
  schemeSlug: string;
  schemeName: string;
  action: DiffAction;
  qtyDelta: number | null;
  valueDeltaCr: number | null;
  disclosureDate: string;
}
