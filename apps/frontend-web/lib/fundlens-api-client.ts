import type {
  ApiResponse,
  AmcSummary,
  Amc,
  SchemeSummary,
  Scheme,
  Holding,
  HoldingDiff,
  StockHolder,
  NavPoint,
} from "@repo/fundlens-types";

const BASE =
  (process.env.NEXT_PUBLIC_FUNDLENS_API_URL ?? "http://localhost:5000") +
  "/fundlens/api/v1";

async function get<T>(path: string): Promise<T> {
  const res = await fetch(`${BASE}${path}`, { next: { revalidate: 60 } });
  if (!res.ok) throw new Error(`fundlens API error: ${res.status} ${path}`);
  const body: ApiResponse<T> = await res.json();
  return body.data;
}

export const fundlensApi = {
  listAmcs: () => get<AmcSummary[]>("/amcs"),
  getAmc: (slug: string) => get<Amc>(`/amcs/${slug}`),
  getScheme: (slug: string) => get<Scheme>(`/schemes/${slug}`),
  listHoldings: (slug: string) => get<Holding[]>(`/schemes/${slug}/holdings`),
  listDiffs: (slug: string) => get<HoldingDiff[]>(`/schemes/${slug}/diffs`),
  listNav: (slug: string) => get<NavPoint[]>(`/schemes/${slug}/nav`),
  listStockHolders: (isin: string) => get<StockHolder[]>(`/stocks/${isin}/holders`),
};
