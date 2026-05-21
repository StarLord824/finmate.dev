import Link from "next/link";
import { Landmark, TrendingUp, Search, Building2 } from "lucide-react";
import type { ReactElement } from "react";

// Placeholder data — replaced by GET /fundlens/api/v1/amcs once fundlens-api ships
const PLACEHOLDER_AMCS = [
  { slug: "sbi-mf", name: "SBI Mutual Fund", aumCr: 1042000, schemeCount: 142 },
  { slug: "hdfc-mf", name: "HDFC Mutual Fund", aumCr: 658000, schemeCount: 118 },
  { slug: "icici-mf", name: "ICICI Prudential MF", aumCr: 824000, schemeCount: 156 },
  { slug: "nippon-mf", name: "Nippon India MF", aumCr: 491000, schemeCount: 97 },
  { slug: "axis-mf", name: "Axis Mutual Fund", aumCr: 312000, schemeCount: 89 },
  { slug: "kotak-mf", name: "Kotak Mahindra MF", aumCr: 387000, schemeCount: 102 },
  { slug: "aditya-birla-mf", name: "Aditya Birla Sun Life MF", aumCr: 358000, schemeCount: 113 },
  { slug: "uti-mf", name: "UTI Mutual Fund", aumCr: 296000, schemeCount: 95 },
  { slug: "mirae-mf", name: "Mirae Asset MF", aumCr: 184000, schemeCount: 51 },
  { slug: "dsp-mf", name: "DSP Mutual Fund", aumCr: 167000, schemeCount: 73 },
  { slug: "tata-mf", name: "Tata Mutual Fund", aumCr: 143000, schemeCount: 68 },
  { slug: "quant-mf", name: "Quant Mutual Fund", aumCr: 92000, schemeCount: 34 },
];

function formatCr(cr: number): string {
  if (cr >= 100000) return `₹${(cr / 100000).toFixed(2)}L Cr`;
  return `₹${cr.toLocaleString("en-IN")} Cr`;
}

export default function FundLensPage(): ReactElement {
  return (
    <div className="max-w-7xl mx-auto w-full px-6 py-8">
      {/* Hero */}
      <div className="mb-8 pb-6 border-b border-[#c8ddf5]">
        <div className="flex items-center gap-3 mb-3">
          <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-[#003366] to-[#007acc] flex items-center justify-center shadow-md shadow-blue-900/20">
            <Landmark className="h-6 w-6 text-white" />
          </div>
          <div>
            <h1 className="text-3xl font-extrabold tracking-tight text-[#003366]">FundLens</h1>
            <p className="text-sm text-[#4a6890]">
              Indian mutual fund intelligence — what every fund manager is actually buying
            </p>
          </div>
          <span className="ml-auto text-xs font-bold text-[#007acc] bg-[#e8f2ff] px-3 py-1 rounded-full">
            Preview
          </span>
        </div>
      </div>

      {/* Stat strip */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <StatCard label="AMCs tracked" value="40+" icon={Building2} />
        <StatCard label="Schemes" value="1,500+" icon={TrendingUp} />
        <StatCard label="Disclosures" value="Monthly" icon={Landmark} />
        <StatCard label="History" value="Coming soon" icon={Search} muted />
      </div>

      {/* AMC directory */}
      <div className="mb-4 flex items-baseline justify-between">
        <h2 className="text-xl font-extrabold text-[#003366]">AMC Directory</h2>
        <span className="text-xs text-[#4a6890]">Sample data — pipeline in development</span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {PLACEHOLDER_AMCS.map((amc) => (
          <Link
            key={amc.slug}
            href={`/fundlens/amc/${amc.slug}`}
            className="group bg-white border border-[#c8ddf5] rounded-2xl p-5 shadow-sm shadow-blue-900/4 hover:shadow-md hover:shadow-blue-900/10 hover:border-[#007acc] transition-all"
          >
            <div className="flex items-start gap-3 mb-3">
              <div className="h-11 w-11 rounded-xl bg-gradient-to-br from-[#e8f2ff] to-[#cce0ff] flex items-center justify-center shrink-0">
                <Building2 className="h-5 w-5 text-[#007acc]" />
              </div>
              <div className="min-w-0">
                <p className="text-sm font-extrabold text-[#003366] truncate group-hover:text-[#007acc] transition-colors">
                  {amc.name}
                </p>
                <p className="text-xs text-[#4a6890] mt-0.5">{amc.schemeCount} schemes</p>
              </div>
            </div>
            <div className="flex items-baseline justify-between">
              <span className="text-xs text-[#4a6890]">Total AUM</span>
              <span className="text-sm font-bold font-mono text-[#003366]">{formatCr(amc.aumCr)}</span>
            </div>
          </Link>
        ))}
      </div>

      {/* Roadmap note */}
      <div className="mt-10 rounded-2xl border border-[#c8ddf5] bg-[#f0f7ff] p-5">
        <h3 className="text-sm font-extrabold text-[#003366] mb-2">What FundLens will track</h3>
        <ul className="text-sm text-[#4a6890] space-y-1.5 leading-relaxed">
          <li>• Monthly portfolio holdings across all 40+ Indian AMCs</li>
          <li>• Month-over-month diffs — what each fund manager bought, added, trimmed, or exited</li>
          <li>• &quot;Which funds hold Reliance?&quot; — institutional positioning for any listed stock</li>
          <li>• Daily NAV from AMFI for every scheme</li>
          <li>• Fund manager profiles with cross-scheme aggregation (Phase 2)</li>
        </ul>
      </div>
    </div>
  );
}

function StatCard({
  label,
  value,
  icon: Icon,
  muted = false,
}: {
  label: string;
  value: string;
  icon: typeof Landmark;
  muted?: boolean;
}): ReactElement {
  return (
    <div className="bg-white border border-[#c8ddf5] rounded-2xl p-4 shadow-sm shadow-blue-900/4">
      <div className="flex items-center gap-2 mb-2">
        <Icon className={`h-4 w-4 ${muted ? "text-[#4a6890]" : "text-[#007acc]"}`} />
        <span className="text-xs font-semibold text-[#4a6890]">{label}</span>
      </div>
      <p className={`text-2xl font-extrabold ${muted ? "text-[#4a6890]" : "text-[#003366]"}`}>{value}</p>
    </div>
  );
}
