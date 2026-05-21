import Link from "next/link";
import { notFound } from "next/navigation";
import { Building2, ArrowLeft, ChevronRight } from "lucide-react";
import type { ReactElement } from "react";

const PLACEHOLDER_AMC_DATA: Record<
  string,
  {
    name: string;
    aumCr: number;
    schemeCount: number;
    sebiRegNo: string;
    schemes: Array<{ slug: string; name: string; category: string; subCategory: string; aumCr: number }>;
  }
> = {
  "sbi-mf": {
    name: "SBI Mutual Fund",
    aumCr: 1042000,
    schemeCount: 142,
    sebiRegNo: "MF/047/96/3",
    schemes: [
      { slug: "sbi-bluechip-fund", name: "SBI Bluechip Fund", category: "Equity", subCategory: "Large Cap", aumCr: 47800 },
      { slug: "sbi-small-cap-fund", name: "SBI Small Cap Fund", category: "Equity", subCategory: "Small Cap", aumCr: 32100 },
      { slug: "sbi-magnum-midcap", name: "SBI Magnum Midcap Fund", category: "Equity", subCategory: "Mid Cap", aumCr: 18900 },
      { slug: "sbi-equity-hybrid", name: "SBI Equity Hybrid Fund", category: "Hybrid", subCategory: "Aggressive", aumCr: 71400 },
      { slug: "sbi-banking-financial", name: "SBI Banking & Financial Services Fund", category: "Equity", subCategory: "Sectoral", aumCr: 8400 },
    ],
  },
  "hdfc-mf": {
    name: "HDFC Mutual Fund",
    aumCr: 658000,
    schemeCount: 118,
    sebiRegNo: "MF/044/00/3",
    schemes: [
      { slug: "hdfc-top-100", name: "HDFC Top 100 Fund", category: "Equity", subCategory: "Large Cap", aumCr: 32700 },
      { slug: "hdfc-mid-cap-opportunities", name: "HDFC Mid-Cap Opportunities Fund", category: "Equity", subCategory: "Mid Cap", aumCr: 71200 },
      { slug: "hdfc-flexi-cap", name: "HDFC Flexi Cap Fund", category: "Equity", subCategory: "Flexi Cap", aumCr: 58300 },
    ],
  },
};

export default async function AmcPage({ params }: { params: Promise<{ slug: string }> }): Promise<ReactElement> {
  const { slug } = await params;
  const amc = PLACEHOLDER_AMC_DATA[slug];

  if (!amc) {
    // Render a generic preview for any unknown slug (since this is sample data)
    return <UnknownAmcPlaceholder slug={slug} />;
  }

  const schemesByCategory = amc.schemes.reduce<Record<string, typeof amc.schemes>>((acc, s) => {
    acc[s.category] = acc[s.category] ?? [];
    acc[s.category]!.push(s);
    return acc;
  }, {});

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
      <div className="mb-6 pb-5 border-b border-[#c8ddf5] flex items-start gap-4">
        <div className="h-14 w-14 rounded-2xl bg-gradient-to-br from-[#003366] to-[#007acc] flex items-center justify-center shadow-md shadow-blue-900/20">
          <Building2 className="h-7 w-7 text-white" />
        </div>
        <div className="flex-1 min-w-0">
          <h1 className="text-2xl font-extrabold text-[#003366]">{amc.name}</h1>
          <div className="flex flex-wrap items-center gap-3 mt-2 text-xs text-[#4a6890]">
            <span><strong className="text-[#003366]">SEBI Reg:</strong> {amc.sebiRegNo}</span>
            <span>•</span>
            <span><strong className="text-[#003366]">Schemes:</strong> {amc.schemeCount}</span>
            <span>•</span>
            <span><strong className="text-[#003366]">AUM:</strong> ₹{(amc.aumCr / 100000).toFixed(2)}L Cr</span>
          </div>
        </div>
      </div>

      {/* Schemes by category */}
      {Object.entries(schemesByCategory).map(([category, schemes]) => (
        <div key={category} className="mb-8">
          <h2 className="text-sm font-extrabold text-[#003366] uppercase tracking-wide mb-3">
            {category}
          </h2>
          <div className="bg-white border border-[#c8ddf5] rounded-2xl divide-y divide-[#c8ddf5] overflow-hidden">
            {schemes.map((scheme) => (
              <Link
                key={scheme.slug}
                href={`/fundlens/scheme/${scheme.slug}`}
                className="group flex items-center px-5 py-4 hover:bg-[#f0f7ff] transition-colors"
              >
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-bold text-[#003366] group-hover:text-[#007acc] transition-colors truncate">
                    {scheme.name}
                  </p>
                  <p className="text-xs text-[#4a6890] mt-0.5">{scheme.subCategory}</p>
                </div>
                <div className="text-right shrink-0 ml-4">
                  <p className="text-sm font-bold font-mono text-[#003366]">
                    ₹{scheme.aumCr.toLocaleString("en-IN")} Cr
                  </p>
                  <p className="text-xs text-[#4a6890]">AUM</p>
                </div>
                <ChevronRight className="h-4 w-4 text-[#4a6890] group-hover:text-[#007acc] transition-colors ml-3 shrink-0" />
              </Link>
            ))}
          </div>
        </div>
      ))}

      <SampleDataBanner />
    </div>
  );
}

function UnknownAmcPlaceholder({ slug }: { slug: string }): ReactElement {
  return (
    <div className="max-w-7xl mx-auto w-full px-6 py-8">
      <Link
        href="/fundlens"
        className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#4a6890] hover:text-[#003366] mb-4 transition-colors"
      >
        <ArrowLeft className="h-3.5 w-3.5" />
        Back to FundLens
      </Link>
      <div className="bg-white border border-[#c8ddf5] rounded-2xl p-8 text-center">
        <Building2 className="h-12 w-12 text-[#007acc] mx-auto mb-3" />
        <h1 className="text-xl font-extrabold text-[#003366] mb-2">AMC: {slug}</h1>
        <p className="text-sm text-[#4a6890]">
          Detailed view coming soon. The scraper for this AMC is on the Phase 1 build list.
        </p>
      </div>
    </div>
  );
}

function SampleDataBanner(): ReactElement {
  return (
    <div className="rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 mt-6">
      <p className="text-xs font-semibold text-amber-900">
        Sample data. Live AMC portfolios will populate once the FundLens scraper goes live.
      </p>
    </div>
  );
}
