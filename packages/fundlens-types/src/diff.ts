export type DiffAction = "NEW" | "ADD" | "TRIM" | "EXIT" | "HOLD";

export interface HoldingDiff {
  isin: string;
  companyName: string;
  sector: string | null;
  prevQty: number | null;
  currQty: number | null;
  qtyDelta: number | null;
  prevValueCr: number | null;
  currValueCr: number | null;
  action: DiffAction;
}
