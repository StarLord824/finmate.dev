import Link from "next/link";
import { ArrowLeft, Users, TrendingUp, TrendingDown, Plus, X } from "lucide-react";
import type { ReactElement } from "react";

const STOCK_LOOKUP: Record<string, { name: string; ticker: string; sector: string }> = {
  INE002A01018: { name: "Reliance Industries Ltd", ticker: "RELIANCE", sector: "Energy" },
  INE040A01034: { name: "HDFC Bank Ltd", ticker: "HDFCBANK", sector: "Financials" },
  INE009A01021: { name: "Infosys Ltd", ticker: "INFY", sector: "IT" },
  INE062A01020: { name: "State Bank of India", ticker: "SBIN", sector: "Financials" },
  INE467B01029: { name: "Tata Consultancy Services", ticker: "TCS", sector: "IT" },
  INE090A01021: { name: "ICICI Bank Ltd", ticker: "ICICIBANK", sector: "Financials" },
  INE154A01025: { name: "ITC Ltd", ticker: "ITC", sector: "Consumer" },
};

const PLACEHOLDER_HOLDERS = [
  { schemeSlug: "sbi-bluechip-fund", schemeName: "SBI Bluechip Fund", amcName: "SBI MF", qty: 2_140_000, valueCr: 6280.4, pctOfNav: 8.91 },
  { schemeSlug: "hdfc-top-100", schemeName: "HDFC Top 100 Fund", amcName: "HDFC MF", qty: 1_810_000, valueCr: 5310.8, pctOfNav: 7.84 },
  { schemeSlug: "icici-bluechip", schemeName: "ICICI Prudential Bluechip Fund", amcName: "ICICI Prudential MF", qty: 1_640_000, valueCr: 4810.2, pctOfNav: 6.92 },
  { schemeSlug: "nippon-large-cap", schemeName: "Nippon India Large Cap Fund", amcName: "Nippon MF", qty: 1_440_000, valueCr: 4220.7, pctOfNav: 6.18 },
  { schemeSlug: "mirae-large-cap", schemeName: "Mirae Asset Large Cap Fund", amcName: "Mirae Asset MF", qty: 1_120_000, valueCr: 3290.4, pctOfNav: 5.71 },
  { schemeSlug: "axis-bluechip", schemeName: "Axis Bluechip Fund", amcName: "Axis MF", qty: 980_000, valueCr: 2880.1, pctOfNav: 5.34 },
];

const PLACEHOLDER_RECENT_DIFFS = [
  { schemeName: "Quant Active Fund", action: "NEW" as const, qty: 480_000 },
  { schemeName: "PPFAS Flexi Cap", action: "ADD" as const, qty: 320_000 },
  { schemeName: "Kotak Bluechip", action: "ADD" as const, qty: 240_000 },
  { schemeName: "Aditya Birla SL Frontline", action: "TRIM" as const, qty: -180_000 },
  { schemeName: "DSP Top 100", action: "EXIT" as const, qty: -1_240_000 },
];

const ACTION_STYLE: Record<"NEW" | "ADD" | "TRIM" | "EXIT", { bg: string; text: string; icon: typeof Plus }> = {
  NEW: { bg: "bg-emerald-100", text: "text-emerald-700", icon: Plus },
  ADD: { bg: "bg-green-50", text: "text-green-700", icon: TrendingUp },
  TRIM: { bg: "bg-amber-50", text: "text-amber-700", icon: TrendingDown },
  EXIT: { bg: "bg-red-50", text: "text-red-700", icon: X },
};

export default async function StockPage({ params }: { params: Promise<{ isin: string }> }): Promise<ReactElement> {
  const { isin } = await params;
  const stock = STOCK_LOOKUP[isin] ?? { name: "Unknown Stock", ticker: isin, sector: "—" };

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
        <h1 className="text-3xl font-extrabold text-[#003366]">{stock.name}</h1>
        <div className="flex flex-wrap items-center gap-3 mt-2 text-xs text-[#4a6890]">
          <span><strong className="text-[#003366]">Ticker (NSE):</strong> {stock.ticker}</span>
          <span>•</span>
          <span><strong className="text-[#003366]">ISIN:</strong> {isin}</span>
          <span>•</span>
          <span><strong className="text-[#003366]">Sector:</strong> {stock.sector}</span>
        </div>
      </div>

      {/* Headline */}
      <div className="mb-8 bg-gradient-to-br from-[#003366] to-[#007acc] rounded-2xl p-6 text-white shadow-lg shadow-blue-900/20">
        <div className="flex items-center gap-3 mb-2">
          <Users className="h-6 w-6" />
          <p className="text-sm font-semibold opacity-90">Smart money positioning</p>
        </div>
        <p className="text-4xl font-extrabold">
          {PLACEHOLDER_HOLDERS.length}+ funds
        </p>
        <p className="text-sm opacity-90 mt-1">currently hold {stock.name}</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Holders table (2/3) */}
        <div className="lg:col-span-2">
          <h2 className="text-sm font-extrabold text-[#003366] uppercase tracking-wide mb-3">
            Funds Currently Holding
          </h2>
          <div className="bg-white border border-[#c8ddf5] rounded-2xl overflow-hidden">
            <table className="w-full">
              <thead className="bg-[#f0f7ff]">
                <tr>
                  <th className="px-4 py-3 text-xs font-extrabold uppercase tracking-wide text-[#4a6890] text-left">Scheme</th>
                  <th className="px-4 py-3 text-xs font-extrabold uppercase tracking-wide text-[#4a6890] text-right">Value (₹ Cr)</th>
                  <th className="px-4 py-3 text-xs font-extrabold uppercase tracking-wide text-[#4a6890] text-right">% of NAV</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#c8ddf5]">
                {PLACEHOLDER_HOLDERS.map((h) => (
                  <tr key={h.schemeSlug} className="hover:bg-[#f0f7ff] transition-colors">
                    <td className="px-4 py-3">
                      <Link href={`/fundlens/scheme/${h.schemeSlug}`} className="text-sm font-bold text-[#003366] hover:text-[#007acc] transition-colors">
                        {h.schemeName}
                      </Link>
                      <p className="text-xs text-[#4a6890] mt-0.5">{h.amcName}</p>
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
        </div>

        {/* Recent activity (1/3) */}
        <div>
          <h2 className="text-sm font-extrabold text-[#003366] uppercase tracking-wide mb-3">
            Last 60 Days
          </h2>
          <div className="bg-white border border-[#c8ddf5] rounded-2xl divide-y divide-[#c8ddf5] overflow-hidden">
            {PLACEHOLDER_RECENT_DIFFS.map((d) => {
              const style = ACTION_STYLE[d.action];
              const Icon = style.icon;
              return (
                <div key={d.schemeName} className="px-4 py-3 hover:bg-[#f0f7ff] transition-colors">
                  <div className="flex items-center justify-between gap-2 mb-1">
                    <p className="text-sm font-bold text-[#003366] truncate">{d.schemeName}</p>
                    <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-extrabold ${style.bg} ${style.text} shrink-0`}>
                      <Icon className="h-3 w-3" />
                      {d.action}
                    </span>
                  </div>
                  <p className="text-xs font-mono text-[#4a6890]">
                    {d.qty > 0 ? "+" : ""}
                    {d.qty.toLocaleString("en-IN")} shares
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <div className="rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 mt-6">
        <p className="text-xs font-semibold text-amber-900">
          Sample fund holders. Real data will load from /fundlens/api/v1/stocks/{isin}/holders once the pipeline is live.
        </p>
      </div>
    </div>
  );
}
