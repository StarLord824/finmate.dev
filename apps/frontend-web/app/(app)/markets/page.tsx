"use client";

import { useState, useEffect, Suspense } from "react";
import { useQuery } from "@tanstack/react-query";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { apiClient } from "@/lib/api-client";
import { FullChart } from "@/components/markets/FullChart";
import { MoversPanel } from "@/components/markets/MoversPanel";
import { CategoryList } from "@/components/markets/CategoryList";
import { MarketTabs, type MarketTabKey } from "@/components/markets/MarketTabs";
import { Skeleton } from "@/components/ui/skeleton";
import { TrendingUp, TrendingDown } from "lucide-react";
import type { ReactElement } from "react";

const RANGES = [
  { label: "1D", value: "1d" },
  { label: "1W", value: "1w" },
  { label: "1M", value: "1m" },
];

const VALID_TABS: MarketTabKey[] = [
  "movers", "crypto", "nse", "us", "indices", "commodities", "forex",
];

function MarketsPageContent(): ReactElement {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const initialTabRaw = (searchParams.get("tab") ?? "movers") as MarketTabKey;
  const initialTab = VALID_TABS.includes(initialTabRaw) ? initialTabRaw : "movers";
  const initialSymbol = searchParams.get("symbol") ?? "BTC-USD";

  const [activeTab, setActiveTab] = useState<MarketTabKey>(initialTab);
  const [selectedSymbol, setSelectedSymbol] = useState(initialSymbol);
  const [selectedRange, setSelectedRange] = useState("1d");

  useEffect(() => {
    const t = searchParams.get("tab") as MarketTabKey | null;
    if (t && VALID_TABS.includes(t)) setActiveTab(t);
    const s = searchParams.get("symbol");
    if (s) setSelectedSymbol(s);
  }, [searchParams]);

  const updateUrl = (tab: MarketTabKey, symbol: string) => {
    const params = new URLSearchParams();
    params.set("tab", tab);
    params.set("symbol", symbol);
    router.replace(`${pathname}?${params.toString()}`, { scroll: false });
  };

  const handleTabChange = (tab: MarketTabKey) => {
    setActiveTab(tab);
    updateUrl(tab, selectedSymbol);
  };

  const handleSelectSymbol = (symbol: string) => {
    setSelectedSymbol(symbol);
    updateUrl(activeTab, symbol);
  };

  const { data: history, isLoading: historyLoading } = useQuery({
    queryKey: ["market-history", selectedSymbol, selectedRange],
    queryFn: () => apiClient.getMarketHistory(selectedSymbol, selectedRange),
    staleTime: 300000,
    enabled: !!selectedSymbol,
  });

  const { data: quotes } = useQuery({
    queryKey: ["market"],
    queryFn: () => apiClient.getMarket(),
    refetchInterval: 60000,
    staleTime: 60000,
  });

  const currentQuote = quotes?.find((q) => q.symbol === selectedSymbol);
  const isPositive = (currentQuote?.change ?? history?.change ?? 0) >= 0;
  const displayLabel = history?.label ?? currentQuote?.label ?? selectedSymbol;
  const displayPrice = currentQuote?.price ?? history?.currentPrice ?? 0;
  const displayChange = currentQuote?.change ?? history?.change ?? 0;
  const displayChangePct = currentQuote?.changePercent ?? history?.changePercent ?? 0;

  return (
    <div className="max-w-7xl mx-auto w-full px-6 py-8">
      <div className="mb-6">
        <h1 className="text-3xl font-extrabold tracking-tight text-[#003366]">Markets</h1>
        <p className="text-sm text-[#4a6890] mt-1">
          Top movers, crypto, Indian and global stocks, indices, commodities, and forex
        </p>
      </div>

      <MarketTabs active={activeTab} onChange={handleTabChange} />

      <div className="mb-10">
        {activeTab === "movers" ? (
          <MoversPanel onSelectSymbol={handleSelectSymbol} />
        ) : (
          <CategoryList
            category={activeTab}
            onSelectSymbol={handleSelectSymbol}
          />
        )}
      </div>

      <div className="bg-white border border-[#c8ddf5] rounded-2xl p-6 shadow-sm shadow-blue-900/4">
        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 mb-6">
          <div>
            <h2 className="text-2xl font-extrabold text-[#003366]">{displayLabel}</h2>
            {(currentQuote || history) && (
              <div className="flex items-baseline gap-3 mt-1">
                <span className="text-3xl font-bold font-mono text-[#0a1628]">
                  {displayPrice.toLocaleString("en-US", {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  })}
                </span>
                <span
                  className={`flex items-center gap-1 text-sm font-semibold ${
                    isPositive ? "text-emerald-600" : "text-red-500"
                  }`}
                >
                  {isPositive ? (
                    <TrendingUp className="h-4 w-4" />
                  ) : (
                    <TrendingDown className="h-4 w-4" />
                  )}
                  {isPositive ? "+" : ""}
                  {displayChange.toFixed(2)} ({isPositive ? "+" : ""}
                  {displayChangePct.toFixed(2)}%)
                </span>
              </div>
            )}
          </div>

          <div className="flex gap-1 p-1 bg-[#f0f7ff] rounded-xl">
            {RANGES.map((r) => (
              <button
                key={r.value}
                onClick={() => setSelectedRange(r.value)}
                className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all ${
                  selectedRange === r.value
                    ? "bg-[#003366] text-white shadow-sm"
                    : "text-[#4a6890] hover:text-[#003366]"
                }`}
              >
                {r.label}
              </button>
            ))}
          </div>
        </div>

        {historyLoading ? (
          <Skeleton className="w-full h-80 rounded-xl bg-[#e8f2ff]" />
        ) : history && history.points.length > 0 ? (
          <FullChart
            points={history.points}
            isPositive={isPositive}
            range={selectedRange}
          />
        ) : (
          <div className="flex items-center justify-center h-80 text-[#4a6890] text-sm">
            No chart data available for {displayLabel}
          </div>
        )}
      </div>
    </div>
  );
}

export default function MarketsPage(): ReactElement {
  return (
    <Suspense>
      <MarketsPageContent />
    </Suspense>
  );
}
