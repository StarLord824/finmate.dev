import Link from "next/link";
import { Building2 } from "lucide-react";
import type { AmcSummary } from "@repo/fundlens-types";
import { ScraperStatusPill } from "./ScraperStatusPill";
import type { ReactElement } from "react";

interface Props {
  amc: AmcSummary;
}

function formatCr(cr?: number | null): string {
  if (cr == null) return "—";
  if (cr >= 100000) return `₹${(cr / 100000).toFixed(2)}L Cr`;
  return `₹${cr.toLocaleString("en-IN")} Cr`;
}

export function AmcCard({ amc }: Props): ReactElement {
  return (
    <Link
      href={`/fundlens/amc/${amc.slug}`}
      className="group bg-white border border-[#c8ddf5] rounded-2xl p-5 shadow-sm shadow-blue-900/4 hover:shadow-md hover:shadow-blue-900/10 hover:border-[#007acc] transition-all block"
    >
      <div className="flex items-start gap-3 mb-3">
        <div className="h-11 w-11 rounded-xl bg-linear-to-br from-[#e8f2ff] to-[#cce0ff] flex items-center justify-center shrink-0">
          <Building2 className="h-5 w-5 text-[#007acc]" />
        </div>
        <div className="min-w-0 flex-1">
          <p className="text-sm font-extrabold text-[#003366] truncate group-hover:text-[#007acc] transition-colors">
            {amc.name}
          </p>
          <p className="text-xs text-[#4a6890] mt-0.5">{amc.schemeCount ?? "—"} schemes</p>
        </div>
      </div>
      <div className="flex items-center justify-between mt-2">
        <span className="text-sm font-bold font-mono text-[#003366]">{formatCr(amc.totalAumCr)}</span>
        <ScraperStatusPill status={amc.scraperStatus} lastScrapedAt={amc.lastScrapedAt} />
      </div>
    </Link>
  );
}
