"use client";

import { useQuery } from "@tanstack/react-query";
import { apiClient } from "@/lib/api-client";
import type { ReactElement } from "react";
import { TrendingUp, TrendingDown, Minus } from "lucide-react";

export function MarketBar(): ReactElement | null {
  const { data: marketData, isLoading } = useQuery({
    queryKey: ["market"],
    queryFn: () => apiClient.getMarket(),
    refetchInterval: 60000,
    staleTime: 60000,
  });

  if (isLoading) {
    return (
      <div className="flex items-center gap-2 overflow-x-auto scrollbar-hide py-2 px-6 border-b border-[#c8ddf5] bg-[#f8fafd] animate-pulse">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="h-7 w-28 bg-[#e8f2ff] rounded-full shrink-0" />
        ))}
      </div>
    );
  }

  if (!marketData || marketData.length === 0) {
    return null;
  }

  return (
    <div className="flex items-center gap-2 overflow-x-auto scrollbar-hide py-2 px-6 border-b border-[#c8ddf5] bg-[#f8fafd]">
      {marketData.map((item) => {
        const isPositive = item.change >= 0;
        const isNeutral = item.change === 0;
        const ChangeIcon = isNeutral ? Minus : isPositive ? TrendingUp : TrendingDown;

        return (
          <div
            key={item.symbol}
            className="flex items-center gap-2 text-xs bg-white border border-[#c8ddf5] rounded-full px-3.5 py-1.5 shrink-0 whitespace-nowrap shadow-sm shadow-blue-900/4 hover:border-[#66a3ff] transition-colors"
          >
            <span className="font-bold text-[#003366]">{item.symbol}</span>
            <span className="text-[#4a6890] font-mono">{item.price.toFixed(2)}</span>
            <span
              className={`flex items-center gap-0.5 font-semibold ${
                isNeutral
                  ? "text-[#4a6890]"
                  : isPositive
                  ? "text-emerald-600"
                  : "text-red-500"
              }`}
            >
              <ChangeIcon className="h-3 w-3" />
              {isPositive && !isNeutral ? "+" : ""}
              {item.changePercent.toFixed(2)}%
            </span>
          </div>
        );
      })}
    </div>
  );
}
