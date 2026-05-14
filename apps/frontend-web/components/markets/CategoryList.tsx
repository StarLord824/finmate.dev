"use client";

import { useMemo, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { apiClient } from "@/lib/api-client";
import { SparklineChart } from "./SparklineChart";
import { Skeleton } from "@/components/ui/skeleton";
import type { ReactElement } from "react";
import type { MarketQuote, CryptoQuote, MarketCategory, MarketHistory } from "@/lib/types";

interface CategoryListProps {
  category: MarketCategory | "crypto";
  onSelectSymbol: (symbol: string) => void;
}

type Row = {
  symbol: string;
  label: string;
  price: number;
  changePercent: number;
  image?: string;
};

export function CategoryList({ category, onSelectSymbol }: CategoryListProps): ReactElement {
  const [sortBy, setSortBy] = useState<"change" | "label">("change");

  const cryptoQuery = useQuery<CryptoQuote[]>({
    queryKey: ["market-crypto-top"],
    queryFn: () => apiClient.getCryptoTop(50),
    enabled: category === "crypto",
    staleTime: 300000,
  });

  const categoryQuery = useQuery<MarketQuote[]>({
    queryKey: ["market-category", category],
    queryFn: () => apiClient.getMarketCategory(category as MarketCategory),
    enabled: category !== "crypto",
    staleTime: 300000,
  });

  const rows: Row[] = useMemo(() => {
    if (category === "crypto") {
      return (cryptoQuery.data ?? []).map((c) => ({
        symbol: c.symbol,
        label: c.label,
        price: c.price,
        changePercent: c.changePercent,
        image: c.image,
      }));
    }
    return (categoryQuery.data ?? []).map((q) => ({
      symbol: q.symbol,
      label: q.label,
      price: q.price,
      changePercent: q.changePercent,
    }));
  }, [category, cryptoQuery.data, categoryQuery.data]);

  const sorted = useMemo(() => {
    const out = [...rows];
    if (sortBy === "change") out.sort((a, b) => b.changePercent - a.changePercent);
    else out.sort((a, b) => a.label.localeCompare(b.label));
    return out;
  }, [rows, sortBy]);

  const symbolsForSparklines = useMemo(
    () => (category === "crypto" ? [] : sorted.map((r) => r.symbol)),
    [category, sorted]
  );

  const { data: histories } = useQuery({
    queryKey: ["market-sparklines", category, symbolsForSparklines],
    queryFn: async () => {
      const results = await Promise.all(
        symbolsForSparklines.map((s) =>
          apiClient.getMarketHistory(s, "1d").catch(() => null)
        )
      );
      const map: Record<string, MarketHistory> = {};
      symbolsForSparklines.forEach((s, i) => {
        const r = results[i];
        if (r) map[s] = r;
      });
      return map;
    },
    enabled: symbolsForSparklines.length > 0,
    staleTime: 300000,
  });

  const isLoading = category === "crypto" ? cryptoQuery.isLoading : categoryQuery.isLoading;
  const isError = category === "crypto" ? cryptoQuery.isError : categoryQuery.isError;

  return (
    <div className="bg-white border border-[#c8ddf5] rounded-2xl shadow-sm shadow-blue-900/4">
      <div className="flex items-center justify-between px-5 py-4 border-b border-[#c8ddf5]">
        <p className="text-sm font-semibold text-[#003366]">
          {sorted.length} {sorted.length === 1 ? "asset" : "assets"}
        </p>
        <div className="flex gap-1 p-1 bg-[#f0f7ff] rounded-lg">
          <button
            onClick={() => setSortBy("change")}
            className={`px-3 py-1 rounded text-xs font-semibold transition-colors ${
              sortBy === "change" ? "bg-[#003366] text-white" : "text-[#4a6890] hover:text-[#003366]"
            }`}
          >
            By % change
          </button>
          <button
            onClick={() => setSortBy("label")}
            className={`px-3 py-1 rounded text-xs font-semibold transition-colors ${
              sortBy === "label" ? "bg-[#003366] text-white" : "text-[#4a6890] hover:text-[#003366]"
            }`}
          >
            A–Z
          </button>
        </div>
      </div>

      <div className="max-h-[600px] overflow-y-auto">
        {isLoading ? (
          <div className="p-5 space-y-2">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <Skeleton key={i} className="h-14 w-full rounded-xl bg-[#e8f2ff]" />
            ))}
          </div>
        ) : isError ? (
          <p className="p-5 text-sm text-[#4a6890]">Unable to load data.</p>
        ) : sorted.length === 0 ? (
          <p className="p-5 text-sm text-[#4a6890]">No data available for this category.</p>
        ) : (
          <ul>
            {sorted.map((row, i) => {
              const positive = row.changePercent >= 0;
              const history = histories?.[row.symbol];
              return (
                <li key={row.symbol}>
                  <button
                    onClick={() => onSelectSymbol(row.symbol)}
                    className="w-full flex items-center gap-3 px-5 py-3 hover:bg-[#f0f7ff] transition-colors text-left border-b border-[#e8f2ff] last:border-b-0"
                  >
                    <span className="text-xs font-bold text-[#4a6890] w-6 shrink-0">
                      {i + 1}
                    </span>
                    {row.image ? (
                      <img
                        src={row.image}
                        alt=""
                        className="h-7 w-7 rounded-full shrink-0"
                      />
                    ) : (
                      <div className="h-7 w-7 rounded-full bg-[#e8f2ff] shrink-0" />
                    )}
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-bold text-[#003366] truncate">
                        {row.label}
                      </p>
                      <p className="text-xs font-mono text-[#4a6890]">
                        {row.price.toLocaleString("en-US", {
                          minimumFractionDigits: 2,
                          maximumFractionDigits: 2,
                        })}
                      </p>
                    </div>
                    {history && history.points.length > 0 && (
                      <div className="w-24 h-10 shrink-0">
                        <SparklineChart
                          points={history.points}
                          isPositive={positive}
                          height={40}
                        />
                      </div>
                    )}
                    <span
                      className={`text-sm font-semibold shrink-0 min-w-[64px] text-right ${
                        positive ? "text-emerald-600" : "text-red-500"
                      }`}
                    >
                      {positive ? "+" : ""}
                      {row.changePercent.toFixed(2)}%
                    </span>
                  </button>
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </div>
  );
}
