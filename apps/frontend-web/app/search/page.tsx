"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { SearchInput } from "@/components/search/SearchInput";
import { SearchResultCard } from "@/components/search/SearchResultCard";
import { SearchEmptyState } from "@/components/search/SearchEmptyState";
import { apiClient } from "@/lib/api-client";
import { Skeleton } from "@/components/ui/skeleton";
import type { ReactElement } from "react";

function SearchContent(): ReactElement {
  const searchParams = useSearchParams();
  const initialQuery = searchParams.get("q") || "";
  const [searchQuery, setSearchQuery] = useState(initialQuery);
  const [debouncedQuery, setDebouncedQuery] = useState(initialQuery);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedQuery(searchQuery);
    }, 300);

    return () => clearTimeout(timer);
  }, [searchQuery]);

  const { data, isLoading } = useQuery({
    queryKey: ["search", debouncedQuery],
    queryFn: async () => {
      if (!debouncedQuery || debouncedQuery.length < 2) {
        return { articles: [], total: 0 };
      }
      return await apiClient.searchArticles(debouncedQuery);
    },
    enabled: debouncedQuery.length >= 2,
  });

  return (
    <main className="flex-1 w-full max-w-[1000px] mx-auto px-6 py-8">
      {/* Search Header */}
      <div className="mb-8 max-w-2xl mx-auto text-center">
        <h1 className="text-3xl font-bold tracking-tight text-foreground mb-6">Search</h1>
        
        {/* Search Input */}
        <SearchInput 
          value={searchQuery} 
          onChange={setSearchQuery} 
          onClear={() => setSearchQuery("")} 
        />
        
        {/* Results Count */}
        {debouncedQuery.length >= 2 && data && !isLoading && (
          <p className="text-sm text-muted-foreground mt-4 text-left px-2">
            {data.total} result{data.total !== 1 ? "s" : ""} for &quot;{debouncedQuery}&quot;
          </p>
        )}
      </div>

      {/* Results */}
      <div className="space-y-4 max-w-3xl mx-auto">
        {!debouncedQuery || debouncedQuery.length < 2 ? (
          <SearchEmptyState 
            query="" 
            onSuggestionClick={(suggestion) => setSearchQuery(suggestion)} 
          />
        ) : isLoading ? (
          <div className="space-y-4">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="flex gap-4 p-4 border border-border rounded-xl">
                <Skeleton className="w-24 h-16 sm:w-32 sm:h-20 rounded-md shrink-0" />
                <div className="flex-1 space-y-2">
                  <Skeleton className="h-5 w-full" />
                  <Skeleton className="h-5 w-2/3" />
                  <div className="flex gap-2 mt-4">
                    <Skeleton className="h-4 w-16" />
                    <Skeleton className="h-4 w-20" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : data && data.articles.length > 0 ? (
          data.articles.map((article) => (
            <SearchResultCard
              key={article.id}
              article={article}
            />
          ))
        ) : (
          <SearchEmptyState query={debouncedQuery} />
        )}
      </div>
    </main>
  );
}

export function SearchSkeleton(): ReactElement {
  return (
    <main className="flex-1 w-full max-w-[1000px] mx-auto px-6 py-8">
      <div className="mb-8 max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold tracking-tight text-foreground mb-6 text-center">Search</h1>
        <Skeleton className="h-14 w-full rounded-xl" />
      </div>
    </main>
  );
}

export default function SearchPage(): ReactElement {
  return (
    <Suspense fallback={<SearchSkeleton />}>
      <SearchContent />
    </Suspense>
  );
}
