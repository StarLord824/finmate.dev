import { notFound } from "next/navigation";
import Link from "next/link";
import type { ReactElement } from "react";
import { fundlensApi } from "@/lib/fundlens-api-client";
import { HoldingsTable } from "@/components/fundlens/HoldingsTable";
import { ChevronRight, Landmark } from "lucide-react";

interface Props {
  params: Promise<{ slug: string }>;
}

export default async function SchemePage({ params }: Props): Promise<ReactElement> {
  const { slug } = await params;
  let scheme: Awaited<ReturnType<typeof fundlensApi.getScheme>>;
  let holdings: import("@repo/fundlens-types").Holding[] = [];
  try {
    scheme = await fundlensApi.getScheme(slug);
  } catch {
    notFound();
    return null as never; // unreachable, satisfies TS
  }
  try {
    holdings = await fundlensApi.listHoldings(slug);
  } catch {
    // holdings not yet available — show empty table
  }

  return (
    <div className="max-w-7xl mx-auto w-full px-6 py-8">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-1.5 text-xs text-[#4a6890] mb-6">
        <Link href="/fundlens" className="hover:text-[#003366]">FundLens</Link>
        <ChevronRight className="h-3 w-3" />
        <Link href={`/fundlens/amc/${scheme.amcSlug}`} className="hover:text-[#003366]">{scheme.amcName}</Link>
        <ChevronRight className="h-3 w-3" />
        <span className="text-[#003366] font-semibold">{scheme.name}</span>
      </nav>

      {/* Header */}
      <div className="mb-6 flex items-start gap-3">
        <div className="h-12 w-12 rounded-xl bg-linear-to-br from-[#e8f2ff] to-[#cce0ff] flex items-center justify-center shrink-0">
          <Landmark className="h-6 w-6 text-[#007acc]" />
        </div>
        <div>
          <h1 className="text-2xl font-extrabold text-[#003366]">{scheme.name}</h1>
          <p className="text-sm text-[#4a6890] mt-0.5">{scheme.category} · {scheme.subCategory}</p>
        </div>
      </div>

      {/* Holdings */}
      <div className="bg-white border border-[#c8ddf5] rounded-2xl shadow-sm shadow-blue-900/4 overflow-hidden">
        <div className="px-6 py-4 border-b border-[#c8ddf5] flex items-center justify-between">
          <h2 className="text-base font-extrabold text-[#003366]">Current Holdings</h2>
          <Link href={`/fundlens/scheme/${slug}/diffs`} className="text-xs text-[#007acc] hover:underline">
            View diffs →
          </Link>
        </div>
        <HoldingsTable holdings={holdings} />
      </div>
    </div>
  );
}
