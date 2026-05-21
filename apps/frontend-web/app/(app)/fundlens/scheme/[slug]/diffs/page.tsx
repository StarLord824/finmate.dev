import Link from "next/link";
import { ArrowLeft, GitCompareArrows, TrendingUp, TrendingDown, Minus, Plus, X } from "lucide-react";
import type { ReactElement } from "react";

type DiffAction = "NEW" | "ADD" | "TRIM" | "EXIT" | "HOLD";

const PLACEHOLDER_DIFFS: Array<{
  isin: string;
  company: string;
  sector: string;
  action: DiffAction;
  prevQty: number | null;
  currQty: number | null;
  prevValueCr: number | null;
  currValueCr: number | null;
}> = [
  { isin: "INE066A01021", company: "Adani Green Energy", sector: "Energy", action: "NEW", prevQty: null, currQty: 1_200_000, prevValueCr: null, currValueCr: 894.3 },
  { isin: "INE742F01042", company: "Adani Ports & SEZ", sector: "Industrials", action: "NEW", prevQty: null, currQty: 680_000, prevValueCr: null, currValueCr: 412.1 },
  { isin: "INE002A01018", company: "Reliance Industries Ltd", sector: "Energy", action: "ADD", prevQty: 1_840_000, currQty: 2_140_000, prevValueCr: 5410.1, currValueCr: 6280.4 },
  { isin: "INE009A01021", company: "Infosys Ltd", sector: "IT", action: "ADD", prevQty: 2_640_000, currQty: 2_980_000, prevValueCr: 4280.3, currValueCr: 4830.8 },
  { isin: "INE040A01034", company: "HDFC Bank Ltd", sector: "Financials", action: "TRIM", prevQty: 4_120_000, currQty: 3_840_000, prevValueCr: 6120.8, currValueCr: 5710.2 },
  { isin: "INE154A01025", company: "ITC Ltd", sector: "Consumer", action: "TRIM", prevQty: 8_640_000, currQty: 7_840_000, prevValueCr: 3880.5, currValueCr: 3520.4 },
  { isin: "INE752E01010", company: "Power Grid Corp", sector: "Utilities", action: "EXIT", prevQty: 2_400_000, currQty: null, prevValueCr: 720.4, currValueCr: null },
  { isin: "INE528G01035", company: "Yes Bank Ltd", sector: "Financials", action: "EXIT", prevQty: 14_200_000, currQty: null, prevValueCr: 280.9, currValueCr: null },
];

const ACTION_CONFIG: Record<DiffAction, { label: string; bg: string; text: string; icon: typeof Plus }> = {
  NEW: { label: "New", bg: "bg-emerald-100", text: "text-emerald-700", icon: Plus },
  ADD: { label: "Added", bg: "bg-green-50", text: "text-green-700", icon: TrendingUp },
  TRIM: { label: "Trimmed", bg: "bg-amber-50", text: "text-amber-700", icon: TrendingDown },
  EXIT: { label: "Exited", bg: "bg-red-50", text: "text-red-700", icon: X },
  HOLD: { label: "Held", bg: "bg-gray-50", text: "text-gray-600", icon: Minus },
};

export default async function DiffsPage({ params }: { params: Promise<{ slug: string }> }): Promise<ReactElement> {
  const { slug } = await params;
  const schemeName = slug.split("-").map((w) => w.charAt(0).toUpperCase() + w.slice(1)).join(" ");

  const summary = PLACEHOLDER_DIFFS.reduce<Record<DiffAction, number>>(
    (acc, d) => ({ ...acc, [d.action]: (acc[d.action] ?? 0) + 1 }),
    { NEW: 0, ADD: 0, TRIM: 0, EXIT: 0, HOLD: 0 }
  );

  return (
    <div className="max-w-7xl mx-auto w-full px-6 py-8">
      <Link
        href={`/fundlens/scheme/${slug}`}
        className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#4a6890] hover:text-[#003366] mb-4 transition-colors"
      >
        <ArrowLeft className="h-3.5 w-3.5" />
        Back to {schemeName}
      </Link>

      {/* Header */}
      <div className="mb-6 pb-5 border-b border-[#c8ddf5]">
        <div className="flex items-center gap-3 mb-2">
          <GitCompareArrows className="h-6 w-6 text-[#007acc]" />
          <h1 className="text-2xl font-extrabold text-[#003366]">Monthly Diff — {schemeName}</h1>
        </div>
        <p className="text-sm text-[#4a6890]">
          April 2026 vs March 2026 — what changed in this portfolio
        </p>
      </div>

      {/* Summary strip */}
      <div className="grid grid-cols-5 gap-3 mb-6">
        {(Object.entries(ACTION_CONFIG) as [DiffAction, typeof ACTION_CONFIG[DiffAction]][]).map(([action, cfg]) => {
          const Icon = cfg.icon;
          return (
            <div key={action} className={`rounded-xl border border-[#c8ddf5] ${cfg.bg} p-3`}>
              <div className="flex items-center gap-1.5 mb-1">
                <Icon className={`h-3.5 w-3.5 ${cfg.text}`} />
                <span className={`text-[10px] font-extrabold uppercase tracking-wide ${cfg.text}`}>
                  {cfg.label}
                </span>
              </div>
              <p className={`text-2xl font-extrabold ${cfg.text}`}>{summary[action]}</p>
            </div>
          );
        })}
      </div>

      {/* Diff table */}
      <div className="bg-white border border-[#c8ddf5] rounded-2xl overflow-hidden">
        <table className="w-full">
          <thead className="bg-[#f0f7ff]">
            <tr>
              <th className="px-4 py-3 text-xs font-extrabold uppercase tracking-wide text-[#4a6890] text-left">Company</th>
              <th className="px-4 py-3 text-xs font-extrabold uppercase tracking-wide text-[#4a6890] text-left">Action</th>
              <th className="px-4 py-3 text-xs font-extrabold uppercase tracking-wide text-[#4a6890] text-right">Prev Qty</th>
              <th className="px-4 py-3 text-xs font-extrabold uppercase tracking-wide text-[#4a6890] text-right">Curr Qty</th>
              <th className="px-4 py-3 text-xs font-extrabold uppercase tracking-wide text-[#4a6890] text-right">Δ Value (₹ Cr)</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#c8ddf5]">
            {PLACEHOLDER_DIFFS.map((d) => {
              const cfg = ACTION_CONFIG[d.action];
              const Icon = cfg.icon;
              const deltaValue = (d.currValueCr ?? 0) - (d.prevValueCr ?? 0);
              return (
                <tr key={d.isin} className="hover:bg-[#f0f7ff] transition-colors">
                  <td className="px-4 py-3">
                    <Link href={`/fundlens/stock/${d.isin}`} className="text-sm font-bold text-[#003366] hover:text-[#007acc] transition-colors">
                      {d.company}
                    </Link>
                    <p className="text-xs text-[#4a6890] mt-0.5">{d.sector}</p>
                  </td>
                  <td className="px-4 py-3">
                    <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-extrabold ${cfg.bg} ${cfg.text}`}>
                      <Icon className="h-3 w-3" />
                      {cfg.label.toUpperCase()}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-right text-sm font-mono text-[#4a6890]">
                    {d.prevQty?.toLocaleString("en-IN") ?? "—"}
                  </td>
                  <td className="px-4 py-3 text-right text-sm font-mono text-[#003366]">
                    {d.currQty?.toLocaleString("en-IN") ?? "—"}
                  </td>
                  <td className={`px-4 py-3 text-right text-sm font-mono font-bold ${deltaValue >= 0 ? "text-emerald-600" : "text-red-500"}`}>
                    {deltaValue >= 0 ? "+" : ""}
                    {deltaValue.toLocaleString("en-IN", { minimumFractionDigits: 1, maximumFractionDigits: 1 })}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <div className="rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 mt-6">
        <p className="text-xs font-semibold text-amber-900">
          Sample diff data. Real month-over-month changes will populate from /fundlens/api/v1/schemes/{slug}/diffs.
        </p>
      </div>
    </div>
  );
}
