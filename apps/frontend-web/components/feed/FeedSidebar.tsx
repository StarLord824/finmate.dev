"use client";

import { useQuery } from "@tanstack/react-query";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { apiClient } from "@/lib/api-client";
import { TrendingUp, Newspaper } from "lucide-react";

interface FeedSidebarProps {
  onTagClick: (tag: string) => void;
  onSourceClick: (source: string) => void;
  selectedTags: string[];
  selectedSources: string[];
}

import type { ReactElement } from "react";

export function FeedSidebar({
  onTagClick,
  onSourceClick,
  selectedTags,
  selectedSources,
}: FeedSidebarProps): ReactElement {
  const { data: trending, isLoading: isLoadingTrending } = useQuery({
    queryKey: ["trending"],
    queryFn: () => apiClient.getTrending(24),
  });

  const { data: sources, isLoading: isLoadingSources } = useQuery({
    queryKey: ["sources"],
    queryFn: () => apiClient.getSources(),
  });

  return (
    <aside className="w-64 shrink-0 hidden lg:block sticky top-24 self-start space-y-6">
      {/* Trending Tags */}
      <div>
        <h3 className="flex items-center gap-2 text-sm font-semibold text-foreground mb-3">
          <TrendingUp className="h-4 w-4 text-accent" />
          Trending Topics
        </h3>
        
        {isLoadingTrending ? (
          <div className="flex flex-wrap gap-2">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <Skeleton key={i} className="h-6 w-16 rounded-full" />
            ))}
          </div>
        ) : (
          <div className="flex flex-wrap gap-2">
            {trending?.slice(0, 8).map((item) => {
              const isActive = selectedTags.includes(item.tag);
              return (
                <Badge
                  key={item.tag}
                  variant={isActive ? "default" : "secondary"}
                  className={`cursor-pointer transition-colors ${
                    isActive 
                      ? "bg-zinc-900 text-white hover:bg-zinc-800" 
                      : "bg-zinc-100 text-zinc-700 hover:bg-zinc-200"
                  }`}
                  onClick={() => onTagClick(item.tag)}
                >
                  {item.tag}
                </Badge>
              );
            })}
          </div>
        )}
      </div>

      <Separator className="bg-border" />

      {/* Top Sources */}
      <div>
        <h3 className="flex items-center gap-2 text-sm font-semibold text-foreground mb-3">
          <Newspaper className="h-4 w-4 text-muted-foreground" />
          Top Sources
        </h3>
        
        {isLoadingSources ? (
          <div className="space-y-2">
            {[1, 2, 3, 4, 5].map((i) => (
              <Skeleton key={i} className="h-4 w-full rounded-md" />
            ))}
          </div>
        ) : (
          <div className="flex flex-col gap-1">
            {sources?.slice(0, 6).map((source) => {
              const isActive = selectedSources.includes(source.id);
              return (
                <button
                  key={source.id}
                  onClick={() => onSourceClick(source.id)}
                  className={`text-left px-2 py-1.5 text-sm rounded-md transition-colors ${
                    isActive
                      ? "bg-zinc-100 text-zinc-900 font-medium"
                      : "text-muted-foreground hover:text-foreground hover:bg-zinc-50"
                  }`}
                >
                  {source.name}
                </button>
              );
            })}
          </div>
        )}
      </div>
    </aside>
  );
}
