import Link from "next/link";
import { ArrowLeft, ArrowUpDown, GitCompareArrows, TrendingUp } from "lucide-react";
import type { ReactElement } from "react";

// Reliance ISIN as the placeholder anchor
const PLACEHOLDER_HOLDINGS = [
  { isin: "INE002A01018", company: "Reliance Industries Ltd", sector: "Energy", qty: 2_140_000, valueCr: 6280.4, pctOfNav: 8.91 },
  { isin: "INE040A01034", company: "HDFC Bank Ltd", sector: "Financials", qty: 3_840_000, valueCr: 5710.2, pctOfNav: 8.11 },
  { isin: "INE009A01021", company: "Infosys Ltd", sector: "IT", qty: 2_980_000, valueCr: 4830.8, pctOfNav: 6.86 },
  { isin: "INE062A01020", company: "State Bank of India", sector: "Financials", qty: 6_120_000, valueCr: 4640.5, pctOfNav: 6.59 },
  { isin: "INE467B01029", company: "Tata Consultancy Services", sector: "IT", qty: 1_120_000, valueCr: 4250.3, pctOfNav: 6.03 },
  { isin: "INE090A01021", company: "ICICI Bank Ltd", sector: "Financials", qty: 3_240_000, valueCr: 3870.9, pctOfNav: 5.49 },
  { isin: "INE154A01025", company: "ITC Ltd", sector: "Consumer", qty: 7_840_000, valueCr: 3520.4, pctOfNav: 5.0 },
  { isin: "INE585B01010", company: "Maruti Suzuki India", sector: "Auto", qty: 280_000, valueCr: 3120.7, pctOfNav: 4.43 },
  { isin: "INE239A01016", company: "Nestlé India Ltd", sector: "Consumer", qty: 92_000, valueCr: 2710.2, pctOfNav: 3.85 },
  { isin: "INE018A01030", company: "Larsen & Toubro Ltd", sector: "Industrials", qty: 760_000, valueCr: 2540.1, pctOfNav: 3.6 },
];

export default async function SchemePage({ params }: { params: Promise<{ slug: string }> }): Promise<ReactElement> {
  const { slug } = await params;
  const schemeName = formatSchemeName(slug);

  return (
    <div className="max-w-7xl mx-auto w-full px-6 py-8">
      <Link
        href="/fundlens"
        className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#4a6890] hover:text-[#003366] mb-4 transition-colors"
      >
        <ArrowLeft className="h-3.5 w-3.5" />
        Back to FundLens
      </Link>

      {/* Header */}
      <div className="mb-6 pb-5 border-b border-[#c8ddf5]">
        <h1 className="text-2xl font-extrabold text-[#003366]">{schemeName}</h1>
        <div className="flex flex-wrap items-center gap-3 mt-2 text-xs text-[#4a6890]">
          <span><strong className="text-[#003366]">Category:</strong> Equity / Large Cap</span>
          <span>•</span>
          <span><strong className="text-[#003366]">Manager:</strong> R. Srinivasan</span>
          <span>•</span>
          <span><strong className="text-[#003366]">AUM:</strong> ₹47,800 Cr</span>
          <span>•</span>
          <span><strong className="text-[#003366]">Expense ratio:</strong> 0.94%</span>
          <span>•</span>
          <span><strong className="text-[#003366]">As of:</strong> 30 Apr 2026</span>
        </div>
      </div>

      {/* Tab strip */}
      <div className="flex gap-2 mb-6">
        <div className="px-4 py-2 rounded-xl bg-[#003366] text-white text-xs font-bold">
          Current Holdings
        </div>
        <Link
          href={`/fundlens/scheme/${slug}/diffs`}
          className="px-4 py-2 rounded-xl bg-[#e8f2ff] text-[#00509e] hover:bg-[#cce0ff] text-xs font-bold inline-flex items-center gap-1.5 transition-colors"
        >
          <GitCompareArrows className="h-3.5 w-3.5" />
          Monthly Diffs
        </Link>
      </div>

      {/* NAV mini-chart placeholder */}
      <div className="mb-6 bg-white border border-[#c8ddf5] rounded-2xl p-5 shadow-sm shadow-blue-900/4">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-sm font-extrabold text-[#003366] flex items-center gap-2">
            <TrendingUp className="h-4 w-4 text-[#007acc]" />
            NAV — last 90 days
          </h3>
          <span className="text-sm font-bold font-mono text-emerald-600">+8.42%</span>
        </div>
        <div className="h-24 rounded-xl bg-gradient-to-r from-[#f0f7ff] via-[#e8f2ff] to-[#cce0ff] flex items-center justify-center">
          <span className="text-xs text-[#4a6890] font-medium">NAV chart wires to /fundlens/api/v1/schemes/{slug}/nav</span>
        </div>
      </div>

      {/* Holdings table */}
      <div className="mb-4 flex items-baseline justify-between">
        <h2 className="text-sm font-extrabold text-[#003366] uppercase tracking-wide">
          Top Holdings ({PLACEHOLDER_HOLDINGS.length})
        </h2>
        <span className="text-xs text-[#4a6890]">Sample data</span>
      </div>

      <div className="bg-white border border-[#c8ddf5] rounded-2xl overflow-hidden">
        <table className="w-full">
          <thead className="bg-[#f0f7ff]">
            <tr>
              <ColumnHeader>Company</ColumnHeader>
              <ColumnHeader>Sector</ColumnHeader>
              <ColumnHeader align="right">Quantity</ColumnHeader>
              <ColumnHeader align="right">Value (₹ Cr)</ColumnHeader>
              <ColumnHeader align="right">% of NAV</ColumnHeader>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#c8ddf5]">
            {PLACEHOLDER_HOLDINGS.map((h) => (
              <tr key={h.isin} className="hover:bg-[#f0f7ff] transition-colors">
                <td className="px-4 py-3">
                  <Link href={`/fundlens/stock/${h.isin}`} className="text-sm font-bold text-[#003366] hover:text-[#007acc] transition-colors">
                    {h.company}
                  </Link>
                </td>
                <td className="px-4 py-3">
                  <span className="text-xs font-semibold text-[#4a6890] bg-[#e8f2ff] px-2 py-0.5 rounded-full">
                    {h.sector}
                  </span>
                </td>
                <td className="px-4 py-3 text-right text-sm font-mono text-[#4a6890]">
                  {h.qty.toLocaleString("en-IN")}
                </td>
                <td className="px-4 py-3 text-right text-sm font-mono font-bold text-[#003366]">
                  {h.valueCr.toLocaleString("en-IN", { minimumFractionDigits: 1, maximumFractionDigits: 1 })}
                </td>
                <td className="px-4 py-3 text-right text-sm font-bold text-[#007acc]">
                  {h.pctOfNav.toFixed(2)}%
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 mt-6">
        <p className="text-xs font-semibold text-amber-900">
          Sample holdings. Real data will load from /fundlens/api/v1/schemes/{slug}/holdings once the pipeline is live.
        </p>
      </div>
    </div>
  );
}

function ColumnHeader({
  children,
  align = "left",
}: {
  children: React.ReactNode;
  align?: "left" | "right";
}): ReactElement {
  return (
    <th className={`px-4 py-3 text-xs font-extrabold uppercase tracking-wide text-[#4a6890] text-${align}`}>
      <span className="inline-flex items-center gap-1">
        {children}
        <ArrowUpDown className="h-3 w-3 opacity-40" />
      </span>
    </th>
  );
}

function formatSchemeName(slug: string): string {
  return slug
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}
