import type { HoldingDiff } from "@repo/fundlens-types";
import { DiffBadge } from "./DiffBadge";
import type { ReactElement } from "react";

interface Props {
  diffs: HoldingDiff[];
}

export function DiffTable({ diffs }: Props): ReactElement {
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        <thead>
          <tr className="text-[#4a6890] text-xs font-semibold border-b border-[#c8ddf5]">
            <th className="text-left py-3 px-4">ISIN</th>
            <th className="text-left py-3 px-4">Action</th>
            <th className="text-right py-3 px-4">Prev Qty</th>
            <th className="text-right py-3 px-4">Curr Qty</th>
            <th className="text-right py-3 px-4">Δ Value (₹ Cr)</th>
          </tr>
        </thead>
        <tbody>
          {diffs.map((d, i) => (
            <tr key={`${d.isin}-${i}`} className="border-b border-[#e8f2ff] hover:bg-[#f0f7ff] transition-colors">
              <td className="py-3 px-4 font-mono text-xs text-[#003366]">{d.isin}</td>
              <td className="py-3 px-4"><DiffBadge action={d.action} /></td>
              <td className="py-3 px-4 text-right font-mono text-[#4a6890]">
                {d.prevQty != null ? Number(d.prevQty).toLocaleString("en-IN") : "—"}
              </td>
              <td className="py-3 px-4 text-right font-mono text-[#003366]">
                {d.currQty != null ? Number(d.currQty).toLocaleString("en-IN") : "—"}
              </td>
              <td className="py-3 px-4 text-right font-mono">
                {d.currValueCr != null && d.prevValueCr != null ? (
                  <span className={Number(d.currValueCr) >= Number(d.prevValueCr) ? "text-emerald-600" : "text-red-500"}>
                    {(Number(d.currValueCr) - Number(d.prevValueCr)).toFixed(2)}
                  </span>
                ) : "—"}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {diffs.length === 0 && (
        <div className="py-12 text-center text-[#4a6890] text-sm">No diff data available.</div>
      )}
    </div>
  );
}
