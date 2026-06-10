export type ScraperStatus = "active" | "broken" | "disabled";

export interface AmcSummary {
  id: number;
  slug: string;
  name: string;
  logoUrl: string | null;
  totalAumCr: number | null;
  schemeCount: number | null;
  scraperStatus: ScraperStatus;
  lastScrapedAt: string | null;
}

export interface Amc extends AmcSummary {
  sebiRegNo: string | null;
  website: string | null;
  createdAt: string;
  updatedAt: string;
}
