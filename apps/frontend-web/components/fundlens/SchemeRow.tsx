import Link from "next/link";
import type { SchemeSummary } from "@repo/fundlens-types";
import type { ReactElement } from "react";

interface Props {
  scheme: SchemeSummary;
}

export function SchemeRow({ scheme }: Props): ReactElement {
  const aum = scheme.aumCr != null ? `₹${Number(scheme.aumCr).toLocaleString("en-IN")} Cr` : "—";
  const er = scheme.expenseRatio != null ? `${Number(scheme.expenseRatio).toFixed(2)}%` : "—";

  return (
    <Link
      href={`/fundlens/scheme/${scheme.slug}`}
      className="flex items-center justify-between px-4 py-3 hover:bg-[#f0f7ff] rounded-xl transition-colors group"
    >
      <div className="min-w-0 flex-1">
        <p className="text-sm font-semibold text-[#003366] truncate group-hover:text-[#007acc]">{scheme.name}</p>
        <p className="text-xs text-[#4a6890] mt-0.5">{scheme.category ?? "—"} · {scheme.subCategory ?? "—"}</p>
      </div>
      <div className="text-right shrink-0 ml-4">
        <p className="text-sm font-bold font-mono text-[#003366]">{aum}</p>
        <p className="text-xs text-[#4a6890]">ER {er}</p>
      </div>
    </Link>
  );
}
