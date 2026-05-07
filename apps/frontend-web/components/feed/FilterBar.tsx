"use client";

import { useQuery } from "@tanstack/react-query";
import { Badge } from "@/components/ui/badge";
import { X } from "lucide-react";
import { apiClient } from "@/lib/api-client";
import { Skeleton } from "@/components/ui/skeleton";
import { ReactElement } from "react";

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
}: FilterBarProps): ReactElement {
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
    <div className="flex items-center gap-2 overflow-x-auto scrollbar-hide py-2.5">
      {hasFilters && (
        <button
          onClick={onClearAll}
          className="text-xs font-semibold text-[#007acc] hover:text-[#003366] shrink-0 px-2 transition-colors"
        >
          Clear all
        </button>
      )}

      {isLoadingSources ? (
        <>
          <Skeleton className="h-6 w-16 rounded-full bg-[#e8f2ff]" />
          <Skeleton className="h-6 w-20 rounded-full bg-[#e8f2ff]" />
        </>
      ) : (
        sources?.map((source) => {
          const isActive = selectedSources.includes(source.id);
          return (
            <Badge
              key={`source-${source.id}`}
              variant={isActive ? "default" : "outline"}
              className={`shrink-0 cursor-pointer transition-all text-xs font-medium ${
                isActive
                  ? "bg-[#003366] text-white hover:bg-[#00509e] border-transparent shadow-sm shadow-blue-900/20"
                  : "bg-transparent text-[#00509e] border-[#66a3ff] hover:bg-[#e8f2ff] hover:border-[#007acc]"
              }`}
              onClick={() => onSourceToggle(source.id)}
            >
              {source.name}
              {isActive && <X className="ml-1 h-3 w-3" />}
            </Badge>
          );
        })
      )}

      {/* Divider */}
      {(sources?.length || 0) > 0 && (categories?.length || 0) > 0 && (
        <div className="w-px h-4 bg-[#c8ddf5] shrink-0 mx-1" />
      )}

      {isLoadingCategories ? (
        <>
          <Skeleton className="h-6 w-16 rounded-full bg-[#e8f2ff]" />
          <Skeleton className="h-6 w-24 rounded-full bg-[#e8f2ff]" />
        </>
      ) : (
        categories?.map((category) => {
          const isActive = selectedCategories.includes(category);
          return (
            <Badge
              key={`category-${category}`}
              variant={isActive ? "default" : "outline"}
              className={`shrink-0 cursor-pointer transition-all text-xs font-medium ${
                isActive
                  ? "bg-[#007acc] text-white hover:bg-[#00509e] border-transparent shadow-sm shadow-blue-800/20"
                  : "bg-transparent text-[#4a6890] border-[#c8ddf5] hover:bg-[#e8f2ff] hover:text-[#003366] hover:border-[#66a3ff]"
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
