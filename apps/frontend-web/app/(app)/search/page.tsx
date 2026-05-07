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
    <main className="flex-1 w-full max-w-[1000px] mx-auto px-6 py-10">
      {/* Search Header */}
      <div className="mb-10 max-w-2xl mx-auto text-center">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#e8f2ff] text-[#007acc] text-sm font-semibold mb-4">
          <span className="h-2 w-2 rounded-full bg-[#007acc] animate-pulse" />
          Search
        </div>
        <h1 className="text-3xl font-extrabold tracking-tight text-[#003366] mb-6">
          What are you looking for?
        </h1>

        {/* Search Input */}
        <SearchInput
          value={searchQuery}
          onChange={setSearchQuery}
          onClear={() => setSearchQuery("")}
        />

        {/* Results Count */}
        {debouncedQuery.length >= 2 && data && !isLoading && (
          <p className="text-sm text-[#4a6890] mt-4 text-left px-1">
            <span className="font-semibold text-[#003366]">{data.total}</span>
            {" "}result{data.total !== 1 ? "s" : ""} for{" "}
            <span className="font-semibold text-[#007acc]">&quot;{debouncedQuery}&quot;</span>
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
          <div className="space-y-3">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="flex gap-4 p-4 border border-[#c8ddf5] bg-white rounded-2xl">
                <div className="w-24 h-20 sm:w-32 sm:h-24 rounded-xl bg-[#e8f2ff] shrink-0" />
                <div className="flex-1 space-y-2 pt-1">
                  <div className="h-5 bg-[#e8f2ff] rounded-lg w-full" />
                  <div className="h-5 bg-[#e8f2ff] rounded-lg w-2/3" />
                  <div className="flex gap-2 mt-4">
                    <div className="h-4 bg-[#e8f2ff] rounded-full w-16" />
                    <div className="h-4 bg-[#e8f2ff] rounded-full w-20" />
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
    <main className="flex-1 w-full max-w-[1000px] mx-auto px-6 py-10">
      <div className="mb-10 max-w-2xl mx-auto text-center">
        <div className="h-7 w-32 mx-auto bg-[#e8f2ff] rounded-full mb-4" />
        <div className="h-10 w-64 mx-auto bg-[#e8f2ff] rounded-lg mb-6" />
        <div className="h-14 w-full bg-[#e8f2ff] rounded-2xl" />
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
