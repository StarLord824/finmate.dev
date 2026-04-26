"use client";

import { useQuery } from "@tanstack/react-query";
import { apiClient } from "@/lib/api-client";
import { TrendingUp, TrendingDown } from "lucide-react";

export function MarketBar() {
  const { data } = useQuery({
    queryKey: ["market"],
    queryFn: () => apiClient.getMarket(),
    staleTime: 60 * 1000,       // 1 minute — matches backend cache TTL
    refetchInterval: 60 * 1000,
  });

  if (!data?.length) return null;

  return (
    <div className="flex gap-4 overflow-x-auto pb-1 scrollbar-none">
      {data.map((q) => {
        const positive = q.change >= 0;
        return (
          <div key={q.symbol} className="shrink-0 flex items-center gap-1.5">
            <span className="text-xs font-semibold text-foreground">{q.label}</span>
            <span className="text-xs text-muted">
              {q.price.toLocaleString(undefined, {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })}
            </span>
            <span
              className={`flex items-center gap-0.5 text-xs font-medium ${
                positive ? "text-green-600" : "text-red-500"
              }`}
            >
              {positive ? (
                <TrendingUp className="w-3 h-3" />
              ) : (
                <TrendingDown className="w-3 h-3" />
              )}
              {positive ? "+" : ""}
              {q.changePercent.toFixed(2)}%
            </span>
          </div>
        );
      })}
    </div>
  );
}
