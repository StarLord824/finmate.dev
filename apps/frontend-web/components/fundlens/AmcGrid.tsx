import type { AmcSummary } from "@repo/fundlens-types";
import { AmcCard } from "./AmcCard";
import type { ReactElement } from "react";

interface Props {
  amcs: AmcSummary[];
}

export function AmcGrid({ amcs }: Props): ReactElement {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {amcs.map((amc) => (
        <AmcCard key={amc.slug} amc={amc} />
      ))}
    </div>
  );
}
