"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { useInfiniteQuery, useQueryClient } from "@tanstack/react-query";
import { MarketBar } from "@/components/feed/MarketBar";
import { FilterBar } from "@/components/feed/FilterBar";
import { ArticleGrid } from "@/components/feed/ArticleGrid";
import { FeedSidebar } from "@/components/feed/FeedSidebar";
import { EmptyState } from "@/components/EmptyState";
import { apiClient } from "@/lib/api-client";
import { useLiveFeed } from "@/hooks/useLiveFeed";
import type { Category, Article } from "@/lib/types";
import { Loader2 } from "lucide-react";
import type { ReactElement } from "react";

export default function FeedPage(): ReactElement {
  const [selectedCategories, setSelectedCategories] = useState<Category[]>([]);
  const [selectedSources, setSelectedSources] = useState<string[]>([]);
  const queryClient = useQueryClient();
  const { newCount, reset } = useLiveFeed();

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    isError,
  } = useInfiniteQuery({
    queryKey: ["feed", selectedCategories, selectedSources],
    queryFn: async ({ pageParam }: { pageParam?: string }) => {
      const response = await apiClient.getFeed({
        limit: 20,
        after: pageParam,
        tags: selectedCategories.length > 0 ? selectedCategories : undefined,
        sources: selectedSources.length > 0 ? selectedSources : undefined,
      });

      const articlesWithReadingTime = response.data.map((article: Article) => ({
        ...article,
        readingTime: article.readingTime || calculateReadingTime(article),
      }));

      const nextCursor = articlesWithReadingTime.length > 0
        ? articlesWithReadingTime[articlesWithReadingTime.length - 1]?.publishedAt
        : undefined;

      return { articles: articlesWithReadingTime, nextCursor };
    },
    getNextPageParam: (lastPage) => lastPage.nextCursor,
    initialPageParam: undefined,
  });

  const calculateReadingTime = (article: { summary: string | null; content?: string | null }): number => {
    const text = `${article.summary || ""} ${article.content ?? ""}`;
    const wordCount = text.split(/\s+/).length;
    return Math.max(1, Math.ceil(wordCount / 200));
  };

  const handleCategoryToggle = (category: string) => {
    setSelectedCategories((prev) => {
      const newCategories = prev.includes(category as Category)
        ? prev.filter((c) => c !== category)
        : [...prev, category as Category];
      return newCategories;
    });
  };

  const handleSourceToggle = (source: string) => {
    setSelectedSources((prev) =>
      prev.includes(source) ? prev.filter((s) => s !== source) : [...prev, source]
    );
  };

  const handleBookmarkToggle = async (articleId: string, isBookmarked: boolean) => {
    try {
      await apiClient.toggleBookmark(articleId, isBookmarked);
    } catch (error) {
      console.error("Failed to toggle bookmark:", error);
    }
  };

  // IntersectionObserver sentinel — works with the layout's overflow-y-auto <main>
  const sentinelRef = useRef<HTMLDivElement>(null);
  const fetchNextPageStable = useCallback(() => {
    if (hasNextPage && !isFetchingNextPage) fetchNextPage();
  }, [hasNextPage, isFetchingNextPage, fetchNextPage]);

  useEffect(() => {
    const el = sentinelRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      (entries) => { if (entries[0].isIntersecting) fetchNextPageStable(); },
      { threshold: 0.1 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [fetchNextPageStable]);

  const allArticles = data?.pages.flatMap((page) => page.articles) || [];

  return (
    <div className="flex flex-col min-h-full">
      {/* Topbar */}
      <div className="flex items-center justify-between px-6 py-4 border-b border-[#c8ddf5] bg-white sticky top-0 z-20 shadow-sm shadow-blue-900/4">
        <h1 className="text-2xl font-bold tracking-tight text-[#003366]">Feed</h1>
        <div className="flex items-center gap-2">
          {newCount > 0 ? (
            <button
              onClick={() => {
                reset();
                window.scrollTo({ top: 0, behavior: "smooth" });
                queryClient.invalidateQueries({ queryKey: ["feed"] });
              }}
              className="flex items-center gap-2 bg-[#003366] hover:bg-[#00509e] text-white px-4 py-1.5 rounded-full transition-colors text-sm font-semibold shadow-sm shadow-blue-900/20"
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#66a3ff] opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#cce0ff]"></span>
              </span>
              {newCount} new
            </button>
          ) : (
            <div className="flex items-center gap-2 px-3 py-1.5 text-sm font-medium text-[#4a6890]">
              <span className="relative flex h-2 w-2">
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#c8ddf5]"></span>
              </span>
              Live
            </div>
          )}
        </div>
      </div>

      <MarketBar />

      <div className="border-b border-[#c8ddf5] px-6 bg-white">
        <FilterBar
          selectedCategories={selectedCategories}
          onCategoryToggle={handleCategoryToggle}
          selectedSources={selectedSources}
          onSourceToggle={handleSourceToggle}
          onClearAll={() => {
            setSelectedCategories([]);
            setSelectedSources([]);
          }}
        />
      </div>

      <div className="flex-1 max-w-[1280px] mx-auto w-full px-6 py-8 flex gap-8">
        {/* Main Content */}
        <div className="flex-1 min-w-0">
          {isError ? (
            <EmptyState
              title="Failed to load articles"
              description="There was an error loading the feed. Please try again later."
              actionLabel="Retry"
              actionHref="/feed"
            />
          ) : allArticles.length === 0 && !isLoading ? (
            <EmptyState />
          ) : (
            <ArticleGrid
              articles={allArticles}
              isLoading={isLoading}
              onBookmarkToggle={handleBookmarkToggle}
            />
          )}

          {/* Sentinel for IntersectionObserver — must stay in layout scroll context */}
          <div ref={sentinelRef} className="h-4" />

          {isFetchingNextPage && (
            <div className="flex justify-center py-8">
              <Loader2 className="h-8 w-8 animate-spin text-accent" />
            </div>
          )}

          {!hasNextPage && allArticles.length > 0 && (
            <div className="text-center py-8">
              <span className="inline-block px-4 py-1.5 rounded-full text-sm text-[#4a6890] bg-[#e8f2ff] font-medium">
                You've reached the end of the feed
              </span>
            </div>
          )}
        </div>

        {/* Right Rail */}
        <FeedSidebar
          onTagClick={handleCategoryToggle}
          onSourceClick={handleSourceToggle}
          selectedTags={selectedCategories}
          selectedSources={selectedSources}
        />
      </div>
    </div>
  );
}
