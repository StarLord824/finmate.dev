"use client";

import { useQuery } from "@tanstack/react-query";
import { apiClient } from "@/lib/api-client";
import { Skeleton } from "@/components/ui/skeleton";
import { TrendingUp, TrendingDown } from "lucide-react";
import type { ReactElement } from "react";
import type { MarketQuote } from "@/lib/types";

interface MoversPanelProps {
  onSelectSymbol: (symbol: string) => void;
}

function MoverRow({
  rank,
  quote,
  positive,
  onClick,
}: {
  rank: number;
  quote: MarketQuote;
  positive: boolean;
  onClick: () => void;
}): ReactElement {
  return (
    <button
      onClick={onClick}
      className="w-full flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-[#f0f7ff] transition-colors text-left"
    >
      <span className="text-xs font-bold text-[#4a6890] w-5 shrink-0">{rank}</span>
      <div className="flex-1 min-w-0">
        <p className="text-sm font-bold text-[#003366] truncate">{quote.label}</p>
        <p className="text-xs font-mono text-[#4a6890]">
          {quote.price.toLocaleString("en-US", {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          })}
        </p>
      </div>
      <span
        className={`text-sm font-semibold shrink-0 ${
          positive ? "text-emerald-600" : "text-red-500"
        }`}
      >
        {positive ? "+" : ""}
        {quote.changePercent.toFixed(2)}%
      </span>
    </button>
  );
}

export function MoversPanel({ onSelectSymbol }: MoversPanelProps): ReactElement {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["market-movers"],
    queryFn: () => apiClient.getMarketMovers(),
    refetchInterval: 60000,
    staleTime: 60000,
  });

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {/* Gainers */}
      <div className="bg-white border border-[#c8ddf5] rounded-2xl p-5 shadow-sm shadow-blue-900/4">
        <h3 className="flex items-center gap-2 text-sm font-bold text-emerald-700 mb-4">
          <TrendingUp className="h-4 w-4" />
          Top Gainers
        </h3>
        {isLoading ? (
          <div className="space-y-2">
            {[1, 2, 3, 4, 5].map((i) => (
              <Skeleton key={i} className="h-12 w-full rounded-lg bg-[#e8f2ff]" />
            ))}
          </div>
        ) : isError || !data ? (
          <p className="text-xs text-[#4a6890] py-2">Unable to load movers.</p>
        ) : (
          <div className="space-y-1">
            {data.gainers.map((quote, i) => (
              <MoverRow
                key={quote.symbol}
                rank={i + 1}
                quote={quote}
                positive
                onClick={() => onSelectSymbol(quote.symbol)}
              />
            ))}
          </div>
        )}
      </div>

      {/* Losers */}
      <div className="bg-white border border-[#c8ddf5] rounded-2xl p-5 shadow-sm shadow-blue-900/4">
        <h3 className="flex items-center gap-2 text-sm font-bold text-red-600 mb-4">
          <TrendingDown className="h-4 w-4" />
          Top Losers
        </h3>
        {isLoading ? (
          <div className="space-y-2">
            {[1, 2, 3, 4, 5].map((i) => (
              <Skeleton key={i} className="h-12 w-full rounded-lg bg-[#e8f2ff]" />
            ))}
          </div>
        ) : isError || !data ? (
          <p className="text-xs text-[#4a6890] py-2">Unable to load movers.</p>
        ) : (
          <div className="space-y-1">
            {data.losers.map((quote, i) => (
              <MoverRow
                key={quote.symbol}
                rank={i + 1}
                quote={quote}
                positive={false}
                onClick={() => onSelectSymbol(quote.symbol)}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
