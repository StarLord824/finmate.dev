import type { Holding } from "@repo/fundlens-types";
import type { ReactElement } from "react";

interface Props {
  holdings: Holding[];
}

export function HoldingsTable({ holdings }: Props): ReactElement {
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        <thead>
          <tr className="text-[#4a6890] text-xs font-semibold border-b border-[#c8ddf5]">
            <th className="text-left py-3 px-4">Company</th>
            <th className="text-left py-3 px-4 hidden md:table-cell">Sector</th>
            <th className="text-right py-3 px-4">Qty</th>
            <th className="text-right py-3 px-4">Value (₹ Cr)</th>
            <th className="text-right py-3 px-4">% NAV</th>
          </tr>
        </thead>
        <tbody>
          {holdings.map((h, i) => (
            <tr key={h.isin ?? i} className="border-b border-[#e8f2ff] hover:bg-[#f0f7ff] transition-colors">
              <td className="py-3 px-4">
                <p className="font-semibold text-[#003366]">{h.companyName}</p>
                {h.isin && <p className="text-xs text-[#4a6890] font-mono">{h.isin}</p>}
              </td>
              <td className="py-3 px-4 text-[#4a6890] hidden md:table-cell">{h.sector ?? "—"}</td>
              <td className="py-3 px-4 text-right font-mono text-[#003366]">
                {h.quantity != null ? Number(h.quantity).toLocaleString("en-IN") : "—"}
              </td>
              <td className="py-3 px-4 text-right font-mono text-[#003366]">
                {h.marketValueCr != null ? Number(h.marketValueCr).toFixed(2) : "—"}
              </td>
              <td className="py-3 px-4 text-right font-mono text-[#4a6890]">
                {h.pctOfNav != null ? `${Number(h.pctOfNav).toFixed(2)}%` : "—"}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {holdings.length === 0 && (
        <div className="py-12 text-center text-[#4a6890] text-sm">No holdings data available.</div>
      )}
    </div>
  );
}
