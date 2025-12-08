"use client";

import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Header } from "@/components/Header";
import { FeedCard } from "@/components/FeedCard";
import { authClient } from "@/lib/auth-client";
import { apiClient } from "@/lib/api-client";
import { Loader2, Bookmark, Lock } from "lucide-react";
import Link from "next/link";
import type { Article } from "@/lib/types";

export default function BookmarksPage(): React.ReactNode {
  const { data: session, isPending: sessionLoading } = authClient.useSession();
  const [bookmarkedArticles, setBookmarkedArticles] = useState<Set<string>>(new Set());

  // Fetch bookmarks only if user is logged in
  const { data: bookmarks = [], isLoading, error } = useQuery({
    queryKey: ["bookmarks"],
    queryFn: async () => {
      // This endpoint requires authentication
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/user/bookmarks`, {
        credentials: "include",
      });
      
      if (!response.ok) {
        throw new Error("Failed to fetch bookmarks");
      }
      
      const data = await response.json();
      return data.data as Article[];
    },
    enabled: !!session?.user,
  });

  const handleBookmarkToggle = async (articleId: string, currentState: boolean) => {
    try {
      // Optimistic update
      setBookmarkedArticles(prev => {
        const next = new Set(prev);
        if (currentState) {
          next.delete(articleId);
        } else {
          next.add(articleId);
        }
        return next;
      });

      await apiClient.toggleBookmark(articleId, !currentState);
    } catch (error) {
      console.error("Failed to toggle bookmark:", error);
      // Revert on error
      setBookmarkedArticles(prev => {
        const next = new Set(prev);
        if (currentState) {
          next.add(articleId);
        } else {
          next.delete(articleId);
        }
        return next;
      });
    }
  };

  if (sessionLoading) {
    return (
      <div className="min-h-screen bg-light-bg dark:bg-dark-bg">
        <Header />
        <div className="flex items-center justify-center min-h-[60vh]">
          <Loader2 className="h-8 w-8 animate-spin text-accent" />
        </div>
      </div>
    );
  }

  if (!session?.user) {
    return (
      <div className="min-h-screen bg-light-bg dark:bg-dark-bg">
        <Header />
        <main className="container mx-auto px-4 py-12">
          <div className="max-w-2xl mx-auto text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-accent/10 mb-6">
              <Lock className="h-8 w-8 text-accent" />
            </div>
            <h1 className="text-3xl font-bold text-foreground mb-4">
              Sign in to view bookmarks
            </h1>
            <p className="text-muted mb-8">
              Create an account or sign in to save and access your bookmarked articles.
            </p>
            <div className="flex gap-4 justify-center">
              <Link
                href="/login"
                className="px-6 py-3 bg-accent text-white rounded-lg hover:bg-accent-dark transition-colors font-medium"
              >
                Sign In
              </Link>
              <Link
                href="/signup"
                className="px-6 py-3 border border-accent text-accent rounded-lg hover:bg-accent/5 transition-colors font-medium"
              >
                Sign Up
              </Link>
            </div>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-light-bg dark:bg-dark-bg">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <div className="flex items-center gap-3 mb-2">
              <Bookmark className="h-8 w-8 text-accent" />
              <h1 className="text-3xl font-bold text-foreground">My Bookmarks</h1>
            </div>
            <p className="text-muted">
              {bookmarks.length > 0
                ? `${bookmarks.length} saved ${bookmarks.length === 1 ? "article" : "articles"}`
                : "No bookmarks yet"}
            </p>
          </div>

          {/* Loading State */}
          {isLoading && (
            <div className="flex items-center justify-center py-12">
              <Loader2 className="h-8 w-8 animate-spin text-accent" />
            </div>
          )}

          {/* Error State */}
          {error && (
            <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-6 text-center">
              <p className="text-red-600 dark:text-red-400">
                Failed to load bookmarks. Please try again.
              </p>
            </div>
          )}

          {/* Empty State */}
          {!isLoading && !error && bookmarks.length === 0 && (
            <div className="text-center py-12">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-muted/10 mb-4">
                <Bookmark className="h-8 w-8 text-muted" />
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-2">
                No bookmarks yet
              </h3>
              <p className="text-muted mb-6">
                Start bookmarking articles to read them later
              </p>
              <Link
                href="/"
                className="inline-block px-6 py-3 bg-accent text-white rounded-lg hover:bg-accent-dark transition-colors font-medium"
              >
                Browse Articles
              </Link>
            </div>
          )}

          {/* Bookmarks Grid */}
          {!isLoading && !error && bookmarks.length > 0 && (
            <div className="grid gap-6">
              {bookmarks.map((article) => (
                <FeedCard
                  key={article.id}
                  article={article}
                  isBookmarked={true}
                  onBookmarkToggle={handleBookmarkToggle}
                />
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
