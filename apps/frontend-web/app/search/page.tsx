"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { Header } from "@/components/Header";
import { FeedCard } from "@/components/FeedCard";
import { FeedSkeleton } from "@/components/Skeletons";
import { EmptyState } from "@/components/EmptyState";
import { apiClient } from "@/lib/api-client";
import { Search } from "lucide-react";
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

  const handleBookmarkToggle = async (articleId: string, isBookmarked: boolean) => {
    try {
      await apiClient.toggleBookmark(articleId, isBookmarked);
    } catch (error) {
      console.error("Failed to toggle bookmark:", error);
    }
  };

  return (
    <main className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        {/* Search Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-4">Search</h1>
          
          {/* Search Input */}
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search news, tickers, topics..."
              className="w-full pl-12 pr-4 py-3 rounded-lg border border-light-border dark:border-dark-border bg-light-card dark:bg-dark-card focus:outline-none focus:ring-2 focus:ring-accent/50 focus:border-accent transition-all text-lg"
              autoFocus
            />
          </div>

          {/* Results Count */}
          {debouncedQuery && data && (
            <p className="text-muted mt-4">
              Found {data.total} result{data.total !== 1 ? "s" : ""} for &quot;{debouncedQuery}&quot;
            </p>
          )}
        </div>

        {/* Results */}
        <div className="space-y-4">
          {!debouncedQuery || debouncedQuery.length < 2 ? (
            <div className="text-center py-16">
              <Search className="h-16 w-16 text-muted mx-auto mb-4 opacity-50" />
              <h3 className="text-xl font-semibold text-foreground mb-2">
                Start searching
              </h3>
              <p className="text-muted">
                Enter at least 2 characters to search for articles
              </p>
            </div>
          ) : isLoading ? (
            <FeedSkeleton count={5} />
          ) : data && data.articles.length > 0 ? (
            data.articles.map((article, index) => (
              <FeedCard
                key={article.id}
                article={article}
                index={index}
                onBookmarkToggle={handleBookmarkToggle}
              />
            ))
          ) : (
            <EmptyState
              title={`No results found for "${debouncedQuery}"`}
              description="Try different keywords or check your spelling"
              actionLabel="Clear Search"
              actionHref="/search"
            />
          )}
        </div>
      </div>
    </main>
  );
}

export default function SearchPage(): ReactElement {
  return (
    <div className="min-h-screen bg-light-bg dark:bg-dark-bg">
      <Header />
      <Suspense fallback={<FeedSkeleton count={5} />}>
        <SearchContent />
      </Suspense>
    </div>
  );
}
