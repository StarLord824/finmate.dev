"use client";

import { useState, useEffect, useMemo, Suspense } from "react";
import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";
import { apiClient } from "@/lib/api-client";
import { FullChart } from "@/components/markets/FullChart";
import { Skeleton } from "@/components/ui/skeleton";
import { TrendingUp, TrendingDown } from "lucide-react";
import type { ReactElement } from "react";
import type { MarketSymbol } from "@/lib/types";

const RANGES = [
  { label: "1D", value: "1d" },
  { label: "1W", value: "1w" },
  { label: "1M", value: "1m" },
];

const CATEGORIES = [
  { label: "All", value: "all" },
  { label: "Crypto", value: "crypto" },
  { label: "Stocks", value: "stocks" },
  { label: "Commodities", value: "commodities" },
];

function MarketsPageContent(): ReactElement {
  const searchParams = useSearchParams();
  const initialSymbol = searchParams.get("symbol") ?? "BTC-USD";

  const [selectedSymbol, setSelectedSymbol] = useState(initialSymbol);
  const [selectedRange, setSelectedRange] = useState("1d");
  const [selectedCategory, setSelectedCategory] = useState("all");

  useEffect(() => {
    const sym = searchParams.get("symbol");
    if (sym) setSelectedSymbol(sym);
  }, [searchParams]);

  const { data: symbols } = useQuery<MarketSymbol[]>({
    queryKey: ["market-symbols"],
    queryFn: () => apiClient.getMarketSymbols(),
    staleTime: Infinity,
  });

  const { data: quotes, isError: quotesError } = useQuery({
    queryKey: ["market"],
    queryFn: () => apiClient.getMarket(),
    refetchInterval: 60000,
    staleTime: 60000,
  });

  const { data: history, isLoading: historyLoading } = useQuery({
    queryKey: ["market-history", selectedSymbol, selectedRange],
    queryFn: () => apiClient.getMarketHistory(selectedSymbol, selectedRange),
    staleTime: 300000,
    enabled: !!selectedSymbol,
  });

  const currentQuote = quotes?.find((q) => q.symbol === selectedSymbol);
  const isPositive = (currentQuote?.change ?? history?.change ?? 0) >= 0;

  const filteredSymbols = useMemo(
    () => (symbols ?? []).filter((s) => selectedCategory === "all" || s.category === selectedCategory),
    [symbols, selectedCategory]
  );

  useEffect(() => {
    if (filteredSymbols.length > 0 && !filteredSymbols.find((s) => s.symbol === selectedSymbol)) {
      setSelectedSymbol(filteredSymbols[0]!.symbol);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedCategory]);

  return (
    <div className="max-w-7xl mx-auto w-full px-6 py-8">
      {/* Header */}
      <div className="mb-8 pb-5 border-b border-[#c8ddf5]">
        <h1 className="text-3xl font-extrabold tracking-tight text-[#003366]">Markets</h1>
        <p className="text-sm text-[#4a6890] mt-1">
          Live prices for crypto, stocks, and commodities
        </p>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Left: Asset List */}
        <div className="w-full lg:w-64 shrink-0">
          {/* Category filter */}
          <div className="flex flex-wrap gap-1 mb-4">
            {CATEGORIES.map((cat) => (
              <button
                key={cat.value}
                onClick={() => setSelectedCategory(cat.value)}
                className={`px-3 py-1 rounded-full text-xs font-semibold transition-colors ${
                  selectedCategory === cat.value
                    ? "bg-[#003366] text-white"
                    : "bg-[#e8f2ff] text-[#00509e] hover:bg-[#cce0ff]"
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {quotesError && (
            <p className="text-xs text-[#4a6890] mb-2">Unable to load prices.</p>
          )}
          <div className="space-y-1">
            {filteredSymbols.map((sym) => {
              const quote = quotes?.find((q) => q.symbol === sym.symbol);
              const isActive = selectedSymbol === sym.symbol;
              const pos = (quote?.change ?? 0) >= 0;

              return (
                <button
                  key={sym.symbol}
                  onClick={() => setSelectedSymbol(sym.symbol)}
                  className={`w-full text-left px-4 py-3 rounded-xl transition-all ${
                    isActive
                      ? "bg-linear-to-r from-[#003366] to-[#00509e] text-white shadow-md shadow-blue-900/20"
                      : "hover:bg-[#e8f2ff] text-[#4a6890]"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <p className={`text-sm font-bold ${isActive ? "text-white" : "text-[#003366]"}`}>
                        {sym.label}
                      </p>
                      <p className={`text-xs font-mono mt-0.5 ${isActive ? "text-white/70" : "text-[#4a6890]"}`}>
                        {quote
                          ? quote.price.toLocaleString("en-US", {
                              minimumFractionDigits: 2,
                              maximumFractionDigits: 2,
                            })
                          : "—"}
                      </p>
                    </div>
                    {quote && (
                      <span
                        className={`text-xs font-semibold ${
                          isActive
                            ? pos
                              ? "text-emerald-300"
                              : "text-red-300"
                            : pos
                            ? "text-emerald-600"
                            : "text-red-500"
                        }`}
                      >
                        {pos ? "+" : ""}
                        {quote.changePercent.toFixed(2)}%
                      </span>
                    )}
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Right: Chart panel */}
        <div className="flex-1 min-w-0">
          <div className="bg-white border border-[#c8ddf5] rounded-2xl p-6 shadow-sm shadow-blue-900/4">
            {/* Asset header */}
            <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 mb-6">
              <div>
                <h2 className="text-2xl font-extrabold text-[#003366]">
                  {history?.label ?? currentQuote?.label ?? selectedSymbol}
                </h2>
                {currentQuote || history ? (
                  <div className="flex items-baseline gap-3 mt-1">
                    <span className="text-3xl font-bold font-mono text-[#0a1628]">
                      {(currentQuote?.price ?? history?.currentPrice ?? 0).toLocaleString("en-US", {
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
                      {(currentQuote?.change ?? history?.change ?? 0).toFixed(2)}
                      {" ("}
                      {isPositive ? "+" : ""}
                      {(currentQuote?.changePercent ?? history?.changePercent ?? 0).toFixed(2)}%
                      {")"}
                    </span>
                  </div>
                ) : null}
              </div>

              {/* Range selector */}
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

            {/* Chart */}
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
                No chart data available
              </div>
            )}
          </div>
        </div>
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
