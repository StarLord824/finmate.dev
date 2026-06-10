export interface FundManager {
  id: number;
  name: string;
  sinceDate: string | null;
  bio: string | null;
  photoUrl: string | null;
}

export interface SchemeSummary {
  id: number;
  slug: string;
  name: string;
  category: string | null;
  subCategory: string | null;
  aumCr: number | null;
  expenseRatio: number | null;
}

export interface Scheme extends SchemeSummary {
  amcId: number;
  amcSlug: string;
  amcName: string;
  manager: FundManager | null;
  amfiCode: string | null;
  isinGrowth: string | null;
  isinIdcw: string | null;
  benchmark: string | null;
  latestDisclosureDate: string | null;
  createdAt: string;
  updatedAt: string;
}
