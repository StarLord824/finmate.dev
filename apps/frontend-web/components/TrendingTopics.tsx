"use client";

import { type ReactElement } from "react";
import { useQuery } from "@tanstack/react-query";
import { apiClient } from "@/lib/api-client";
import { TrendingUp } from "lucide-react";

interface Props {
  onTagClick?: (tag: string) => void;
  selectedTags?: string[];
}

export function TrendingTopics({ onTagClick, selectedTags = [] }: Props): ReactElement | null {
  const { data, isLoading } = useQuery({
    queryKey: ["trending"],
    queryFn: () => apiClient.getTrending(),
    staleTime: 5 * 60 * 1000, // 5 minutes
  });

  if (isLoading) {
    return (
      <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-none">
        {Array.from({ length: 8 }).map((_, i) => (
          <div key={i} className="h-7 w-20 bg-light-card dark:bg-dark-card rounded-full animate-pulse shrink-0" />
        ))}
      </div>
    );
  }

  if (!data?.length) return null;

  return (
    <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
      <TrendingUp className="w-4 h-4 text-muted shrink-0" />
      {data.map(({ tag, count }) => {
        const active = selectedTags.includes(tag);
        return (
          <button
            key={tag}
            onClick={() => onTagClick?.(tag)}
            className={`shrink-0 px-3 py-1 rounded-full text-xs font-medium transition-colors ${
              active
                ? "bg-accent text-white"
                : "bg-light-card dark:bg-dark-card text-muted hover:bg-accent/10 hover:text-accent border border-light-border dark:border-dark-border"
            }`}
          >
            {tag}
            <span className="ml-1 text-[10px] opacity-60">{count}</span>
          </button>
        );
      })}
    </div>
  );
}
