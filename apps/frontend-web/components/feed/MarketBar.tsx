"use client";

import { useQuery } from "@tanstack/react-query";
import { apiClient } from "@/lib/api-client";
import type { ReactElement } from "react";

export function MarketBar(): ReactElement | null {
  const { data: marketData, isLoading } = useQuery({
    queryKey: ["market"],
    queryFn: () => apiClient.getMarket(),
    refetchInterval: 60000, // Refresh every minute
  });

  if (isLoading) {
    return (
      <div className="flex items-center gap-2 overflow-x-auto scrollbar-hide py-2 animate-pulse">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="h-6 w-24 bg-muted rounded-full shrink-0" />
        ))}
      </div>
    );
  }

  if (!marketData || marketData.length === 0) {
    return null;
  }

  return (
    <div className="flex items-center gap-3 overflow-x-auto scrollbar-hide py-2">
      {marketData.map((item) => {
        const isPositive = item.change >= 0;
        return (
          <div
            key={item.symbol}
            className="flex items-center gap-2 text-xs bg-white border border-border rounded-full px-3 py-1 shrink-0 whitespace-nowrap shadow-sm"
          >
            <span className="font-medium text-foreground">{item.symbol}</span>
            <span className="text-muted-foreground">{item.price.toFixed(2)}</span>
            <span className={isPositive ? "text-positive" : "text-destructive"}>
              {isPositive ? "+" : ""}
              {item.changePercent.toFixed(2)}%
            </span>
          </div>
        );
      })}
    </div>
  );
}
