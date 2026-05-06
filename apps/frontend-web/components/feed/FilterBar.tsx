"use client";

import { useQuery } from "@tanstack/react-query";
import { Badge } from "@/components/ui/badge";
import { X } from "lucide-react";
import { apiClient } from "@/lib/api-client";
import { Skeleton } from "@/components/ui/skeleton";

interface FilterBarProps {
  selectedCategories: string[];
  onCategoryToggle: (category: string) => void;
  selectedSources: string[];
  onSourceToggle: (source: string) => void;
  onClearAll: () => void;
}

export function FilterBar({
  selectedCategories,
  onCategoryToggle,
  selectedSources,
  onSourceToggle,
  onClearAll,
}: FilterBarProps) {
  const { data: sources, isLoading: isLoadingSources } = useQuery({
    queryKey: ["sources"],
    queryFn: () => apiClient.getSources(),
  });

  const { data: categories, isLoading: isLoadingCategories } = useQuery({
    queryKey: ["categories"],
    queryFn: () => apiClient.getCategories(),
  });

  const hasFilters = selectedCategories.length > 0 || selectedSources.length > 0;

  return (
    <div className="flex items-center gap-2 overflow-x-auto scrollbar-hide py-2">
      {hasFilters && (
        <button
          onClick={onClearAll}
          className="text-xs font-medium text-muted-foreground hover:text-foreground shrink-0 px-2"
        >
          Clear all
        </button>
      )}

      {isLoadingSources ? (
        <>
          <Skeleton className="h-6 w-16 rounded-full" />
          <Skeleton className="h-6 w-20 rounded-full" />
        </>
      ) : (
        sources?.map((source) => {
          const isActive = selectedSources.includes(source.id);
          return (
            <Badge
              key={`source-${source.id}`}
              variant={isActive ? "default" : "outline"}
              className={`shrink-0 cursor-pointer transition-colors ${
                isActive ? "bg-zinc-900 text-white hover:bg-zinc-800" : "bg-transparent hover:bg-zinc-100"
              }`}
              onClick={() => onSourceToggle(source.id)}
            >
              {source.name}
              {isActive && <X className="ml-1 h-3 w-3" />}
            </Badge>
          );
        })
      )}

      {/* Divider if both exist */}
      {(sources?.length || 0) > 0 && (categories?.length || 0) > 0 && (
        <div className="w-px h-4 bg-border shrink-0 mx-1" />
      )}

      {isLoadingCategories ? (
        <>
          <Skeleton className="h-6 w-16 rounded-full" />
          <Skeleton className="h-6 w-24 rounded-full" />
        </>
      ) : (
        categories?.map((category) => {
          const isActive = selectedCategories.includes(category);
          return (
            <Badge
              key={`category-${category}`}
              variant={isActive ? "default" : "outline"}
              className={`shrink-0 cursor-pointer transition-colors ${
                isActive ? "bg-zinc-900 text-white hover:bg-zinc-800" : "bg-transparent hover:bg-zinc-100"
              }`}
              onClick={() => onCategoryToggle(category)}
            >
              {category}
              {isActive && <X className="ml-1 h-3 w-3" />}
            </Badge>
          );
        })
      )}
    </div>
  );
}
