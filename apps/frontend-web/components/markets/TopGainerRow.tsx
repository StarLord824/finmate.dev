"use client";

import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { apiClient } from "@/lib/api-client";
import { Flame } from "lucide-react";
import type { ReactElement } from "react";

export function TopGainerRow(): ReactElement | null {
  const router = useRouter();
  const { data: movers } = useQuery({
    queryKey: ["market-movers"],
    queryFn: () => apiClient.getMarketMovers(),
    refetchInterval: 60000,
    staleTime: 60000,
  });

  const top = movers?.gainers[0];
  if (!top) return null;

  return (
    <button
      onClick={() => router.push(`/markets?symbol=${encodeURIComponent(top.symbol)}`)}
      className="w-full text-left rounded-xl px-3 py-2 mb-2 bg-gradient-to-r from-emerald-50 to-white border border-emerald-200 hover:from-emerald-100 hover:to-emerald-50 transition-colors"
    >
      <div className="flex items-center gap-2">
        <Flame className="h-4 w-4 text-emerald-600 shrink-0" />
        <div className="flex-1 min-w-0">
          <p className="text-xs font-bold text-emerald-700 truncate">
            🔥 Top Gainer · {top.label}
          </p>
          <p className="text-xs font-mono text-emerald-600 mt-0.5">
            +{top.changePercent.toFixed(2)}%
          </p>
        </div>
      </div>
    </button>
  );
}
