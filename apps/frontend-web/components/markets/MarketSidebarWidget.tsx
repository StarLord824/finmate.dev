"use client";

import { useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { apiClient } from "@/lib/api-client";
import { SparklineChart } from "./SparklineChart";
import { Skeleton } from "@/components/ui/skeleton";
import { BarChart2 } from "lucide-react";
import type { ReactElement } from "react";
import type { MarketHistory } from "@/lib/types";

export function MarketSidebarWidget(): ReactElement {
  const router = useRouter();

  const { data: quotes, isLoading: quotesLoading, isError: quotesError } = useQuery({
    queryKey: ["market"],
    queryFn: () => apiClient.getMarket(),
    refetchInterval: 60000,
    staleTime: 60000,
  });

  // Fetch 1d history for all symbols in parallel (only when quotes loaded)
  const symbols = useMemo(() => quotes?.map((q) => q.symbol) ?? [], [quotes]);
  const { data: histories } = useQuery({
    queryKey: ["market-sparklines", symbols],
    queryFn: async () => {
      const results = await Promise.all(
        symbols.map((s) => apiClient.getMarketHistory(s, "1d").catch(() => null))
      );
      const map: Record<string, MarketHistory> = {};
      symbols.forEach((s, i) => { if (results[i]) map[s] = results[i]; });
      return map;
    },
    enabled: symbols.length > 0,
    staleTime: 300000, // 5 min — matches server cache
  });

  return (
    <div className="bg-white border border-[#c8ddf5] rounded-2xl p-4 shadow-sm shadow-blue-900/4">
      <h3 className="flex items-center gap-2 text-sm font-semibold text-[#003366] mb-3">
        <BarChart2 className="h-4 w-4 text-[#007acc]" />
        Markets
      </h3>

      {quotesLoading ? (
        <div className="space-y-3">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <Skeleton key={i} className="h-14 w-full rounded-xl bg-[#e8f2ff]" />
          ))}
        </div>
      ) : quotesError ? (
        <p className="text-xs text-[#4a6890] py-2 text-center">Unable to load market data.</p>
      ) : (
        <div className="space-y-2">
          {(quotes ?? []).slice(0, 6).map((quote) => {
            const isPositive = quote.change >= 0;
            const history = histories?.[quote.symbol];

            return (
              <button
                key={quote.symbol}
                onClick={() =>
                  router.push(`/markets?symbol=${encodeURIComponent(quote.symbol)}`)
                }
                className="w-full text-left rounded-xl px-3 py-2 hover:bg-[#f0f7ff] transition-colors group"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs font-bold text-[#003366] group-hover:text-[#007acc] transition-colors">
                      {quote.label}
                    </p>
                    <p className="text-xs font-mono text-[#4a6890] mt-0.5">
                      {quote.price.toLocaleString("en-US", {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                      })}
                    </p>
                  </div>
                  <div className="text-right">
                    <span
                      className={`text-xs font-semibold ${
                        isPositive ? "text-emerald-600" : "text-red-500"
                      }`}
                    >
                      {isPositive ? "+" : ""}
                      {quote.changePercent.toFixed(2)}%
                    </span>
                    {history && (
                      <div className="w-20 h-8 mt-0.5 ml-auto">
                        <SparklineChart
                          points={history.points}
                          isPositive={isPositive}
                          height={32}
                        />
                      </div>
                    )}
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      )}

      <button
        onClick={() => router.push("/markets")}
        className="mt-3 w-full text-center text-xs font-semibold text-[#007acc] hover:text-[#003366] transition-colors py-1"
      >
        View all markets →
      </button>
    </div>
  );
}
