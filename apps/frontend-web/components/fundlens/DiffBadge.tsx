import type { DiffAction } from "@repo/fundlens-types";
import type { ReactElement } from "react";

const STYLES: Record<DiffAction, string> = {
  NEW: "bg-emerald-50 text-emerald-700 border-emerald-200",
  ADD: "bg-green-50 text-green-700 border-green-200",
  TRIM: "bg-amber-50 text-amber-700 border-amber-200",
  EXIT: "bg-red-50 text-red-700 border-red-200",
  HOLD: "bg-gray-50 text-gray-500 border-gray-200",
};

interface Props {
  action: DiffAction;
}

export function DiffBadge({ action }: Props): ReactElement {
  return (
    <span className={`inline-block text-xs font-bold px-2 py-0.5 rounded-full border ${STYLES[action]}`}>
      {action}
    </span>
  );
}
