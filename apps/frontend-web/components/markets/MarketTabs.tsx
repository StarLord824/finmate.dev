"use client";

import type { ReactElement } from "react";

export type MarketTabKey =
  | "movers"
  | "crypto"
  | "nse"
  | "us"
  | "indices"
  | "commodities"
  | "forex";

const TABS: { key: MarketTabKey; label: string }[] = [
  { key: "movers",      label: "Movers" },
  { key: "crypto",      label: "Crypto" },
  { key: "nse",         label: "Indian Stocks" },
  { key: "us",          label: "US Stocks" },
  { key: "indices",     label: "Indices" },
  { key: "commodities", label: "Commodities" },
  { key: "forex",       label: "Forex" },
];

interface MarketTabsProps {
  active: MarketTabKey;
  onChange: (tab: MarketTabKey) => void;
}

export function MarketTabs({ active, onChange }: MarketTabsProps): ReactElement {
  return (
    <div className="sticky top-0 z-10 bg-[#f8fafd] -mx-6 px-6 mb-6 border-b border-[#c8ddf5]">
      <div className="flex gap-1 overflow-x-auto scrollbar-hide py-3">
        {TABS.map((tab) => (
          <button
            key={tab.key}
            onClick={() => onChange(tab.key)}
            className={`px-4 py-2 rounded-xl text-sm font-semibold whitespace-nowrap transition-colors ${
              active === tab.key
                ? "bg-[#003366] text-white shadow-sm shadow-blue-900/20"
                : "text-[#4a6890] hover:text-[#003366] hover:bg-[#e8f2ff]"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>
    </div>
  );
}

export { TABS as MARKET_TABS };
