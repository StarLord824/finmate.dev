import type { ReactElement } from "react";
import type { ScraperStatus } from "@repo/fundlens-types";

interface Props {
  status: ScraperStatus;
  lastScrapedAt?: string | null;
}

export function ScraperStatusPill({ status, lastScrapedAt }: Props): ReactElement {
  const color =
    status === "active"
      ? "bg-emerald-50 text-emerald-700 border-emerald-200"
      : status === "broken"
      ? "bg-red-50 text-red-700 border-red-200"
      : "bg-gray-50 text-gray-500 border-gray-200";

  return (
    <span className={`inline-flex items-center gap-1 text-xs font-semibold px-2 py-0.5 rounded-full border ${color}`}>
      <span className={`h-1.5 w-1.5 rounded-full ${status === "active" ? "bg-emerald-500" : status === "broken" ? "bg-red-500" : "bg-gray-400"}`} />
      {status === "active" && lastScrapedAt
        ? `Updated ${new Date(lastScrapedAt).toLocaleDateString("en-IN", { day: "numeric", month: "short" })}`
        : status}
    </span>
  );
}
