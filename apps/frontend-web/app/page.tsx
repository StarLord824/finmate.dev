"use client";

import { useState, useEffect } from "react";
import { useInfiniteQuery } from "@tanstack/react-query";
import { Header } from "@/components/Header";
import { FeedCard } from "@/components/FeedCard";
import { FiltersPanel } from "@/components/FiltersPanel";
import { FeedSkeleton } from "@/components/Skeletons";
import { EmptyState } from "@/components/EmptyState";
import { apiClient } from "@/lib/api-client";
import type { Category, Article } from "@/lib/types";
import { Loader2 } from "lucide-react";
import type { ReactElement } from "react";

export default function Home(): ReactElement {
  const [selectedCategories, setSelectedCategories] = useState<Category[]>([]);
  const [selectedSources, setSelectedSources] = useState<string[]>([]);

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

      // Calculate reading time for articles that don't have it (based on summary + content length)
      const articlesWithReadingTime = response.data.map((article: Article) => ({
        ...article,
        readingTime: article.readingTime || calculateReadingTime(article),
      }));

      // Derive nextCursor from the last article's publishedAt
      const nextCursor = articlesWithReadingTime.length > 0 
        ? articlesWithReadingTime[articlesWithReadingTime.length - 1]?.publishedAt 
        : undefined;

      return {
        articles: articlesWithReadingTime,
        nextCursor,
      };
    },
    getNextPageParam: (lastPage) => lastPage.nextCursor,
    initialPageParam: undefined,
  });

  // Helper function to calculate reading time (average 200 words per minute)
  const calculateReadingTime = (article: { summary: string | null; content?: string | null }): number => {
    const text = `${article.summary || ""} ${article.content ?? ""}`;
    const wordCount = text.split(/\s+/).length;
    return Math.max(1, Math.ceil(wordCount / 200));
  };

  const handleCategoryToggle = (category: Category) => {
    setSelectedCategories((prev) =>
      prev.includes(category)
        ? prev.filter((c) => c !== category)
        : [...prev, category]
    );
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

  // Infinite scroll
  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 1000 &&
        hasNextPage &&
        !isFetchingNextPage
      ) {
        fetchNextPage();
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [hasNextPage, isFetchingNextPage, fetchNextPage]);

  const allArticles = data?.pages.flatMap((page) => page.articles) || [];

  return (
    <div className="min-h-screen bg-light-bg dark:bg-dark-bg">
      <Header />

      <main className="container mx-auto px-4 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-6">
          {/* Feed */}
          <div className="space-y-4">
            {isLoading ? (
              <FeedSkeleton count={8} />
            ) : isError ? (
              <EmptyState
                title="Failed to load articles"
                description="There was an error loading the feed. Please try again later."
                actionLabel="Retry"
                actionHref="/"
              />
            ) : allArticles.length === 0 ? (
              <EmptyState />
            ) : (
              <>
                {allArticles.map((article, index) => (
                  <FeedCard
                    key={article.id}
                    article={article}
                    index={index}
                    onBookmarkToggle={handleBookmarkToggle}
                  />
                ))}

                {isFetchingNextPage && (
                  <div className="flex justify-center py-8">
                    <Loader2 className="h-8 w-8 animate-spin text-accent" />
                  </div>
                )}

                {!hasNextPage && allArticles.length > 0 && (
                  <div className="text-center py-8 text-muted text-sm">
                    You've reached the end of the feed
                  </div>
                )}
              </>
            )}
          </div>

          {/* Sidebar */}
          <div className="hidden lg:block">
            <div className="sticky top-20">
              <FiltersPanel
                selectedCategories={selectedCategories}
                onCategoryToggle={handleCategoryToggle}
                selectedSources={selectedSources}
                onSourceToggle={handleSourceToggle}
              />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

