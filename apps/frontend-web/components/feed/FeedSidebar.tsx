"use client";

import { useQuery } from "@tanstack/react-query";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { apiClient } from "@/lib/api-client";
import { TrendingUp, Newspaper } from "lucide-react";
import type { ReactElement } from "react";

interface FeedSidebarProps {
  onTagClick: (tag: string) => void;
  onSourceClick: (source: string) => void;
  selectedTags: string[];
  selectedSources: string[];
}

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
      {/* Trending Topics */}
      <div className="bg-white border border-[#c8ddf5] rounded-2xl p-4 shadow-sm shadow-blue-900/4">
        <h3 className="flex items-center gap-2 text-sm font-semibold text-[#003366] mb-3">
          <TrendingUp className="h-4 w-4 text-[#007acc]" />
          Trending Topics
        </h3>

        {isLoadingTrending ? (
          <div className="flex flex-wrap gap-2">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <Skeleton key={i} className="h-6 w-16 rounded-full bg-[#e8f2ff]" />
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
                  className={`cursor-pointer transition-all text-xs ${
                    isActive
                      ? "bg-[#003366] text-white hover:bg-[#00509e] shadow-sm shadow-blue-900/20"
                      : "bg-[#e8f2ff] text-[#00509e] hover:bg-[#cce0ff] border-none"
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

      <Separator className="bg-[#c8ddf5]" />

      {/* Top Sources */}
      <div className="bg-white border border-[#c8ddf5] rounded-2xl p-4 shadow-sm shadow-blue-900/4">
        <h3 className="flex items-center gap-2 text-sm font-semibold text-[#003366] mb-3">
          <Newspaper className="h-4 w-4 text-[#007acc]" />
          Top Sources
        </h3>

        {isLoadingSources ? (
          <div className="space-y-2">
            {[1, 2, 3, 4, 5].map((i) => (
              <Skeleton key={i} className="h-8 w-full rounded-lg bg-[#e8f2ff]" />
            ))}
          </div>
        ) : (
          <div className="flex flex-col gap-1">
            {sources?.slice(0, 6).map((source) => {
              const isActive = selectedSources.includes(source.name);
              return (
                <button
                  key={source.id}
                  onClick={() => onSourceClick(source.name)}
                  className={`text-left px-3 py-2 text-sm rounded-xl transition-all font-medium ${
                    isActive
                      ? "bg-gradient-to-r from-[#003366] to-[#00509e] text-white shadow-sm shadow-blue-900/20"
                      : "text-[#4a6890] hover:text-[#003366] hover:bg-[#e8f2ff]"
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
