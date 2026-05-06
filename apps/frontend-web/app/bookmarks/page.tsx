"use client";

import { useQuery, useQueryClient } from "@tanstack/react-query";
import { ArticleGrid } from "@/components/feed/ArticleGrid";
import { Badge } from "@/components/ui/badge";
import { Button, buttonVariants } from "@/components/ui/button";
import { authClient } from "@/lib/auth-client";
import { apiClient } from "@/lib/api-client";
import { Loader2, Bookmark, Lock } from "lucide-react";
import Link from "next/link";
import type { Article } from "@/lib/types";

export default function BookmarksPage(): React.ReactNode {
  const { data: session, isPending: sessionLoading } = authClient.useSession();
  const queryClient = useQueryClient();

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
      await apiClient.toggleBookmark(articleId, currentState);
      queryClient.invalidateQueries({ queryKey: ["bookmarks"] });
    } catch (error) {
      console.error("Failed to toggle bookmark:", error);
    }
  };

  if (sessionLoading) {
    return (
      <div className="flex-1 w-full max-w-[1280px] mx-auto px-6 py-8">
        <div className="flex items-center justify-center min-h-[60vh]">
          <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
        </div>
      </div>
    );
  }

  if (!session?.user) {
    return (
      <div className="flex-1 w-full max-w-[1280px] mx-auto px-6 py-8">
        <div className="flex flex-col items-center justify-center min-h-[60vh] text-center max-w-md mx-auto">
          <div className="h-16 w-16 bg-zinc-100 rounded-full flex items-center justify-center mb-6">
            <Lock className="h-8 w-8 text-zinc-400" />
          </div>
          <h1 className="text-2xl font-bold text-foreground mb-4">
            Sign in to view bookmarks
          </h1>
          <p className="text-muted-foreground mb-8">
            Create an account or sign in to save and access your bookmarked articles.
          </p>
          <div className="flex gap-4 w-full">
            <Link href="/login" className={buttonVariants({ variant: "default", className: "flex-1" })}>
              Sign In
            </Link>
            <Link href="/signup" className={buttonVariants({ variant: "outline", className: "flex-1" })}>
              Sign Up
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <main className="flex-1 w-full max-w-[1280px] mx-auto px-6 py-8">
      {/* Topbar */}
      <div className="flex items-center justify-between mb-8 pb-4 border-b border-border">
        <h1 className="text-3xl font-bold tracking-tight text-foreground">Bookmarks</h1>
        {!isLoading && !error && bookmarks.length > 0 && (
          <Badge variant="secondary" className="bg-zinc-100 text-zinc-700 font-medium px-3 py-1">
            {bookmarks.length} {bookmarks.length === 1 ? "Article" : "Articles"}
          </Badge>
        )}
      </div>

      {/* Loading State */}
      {isLoading && (
        <ArticleGrid articles={[]} isLoading={true} />
      )}

      {/* Error State */}
      {error && (
        <div className="bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-900 rounded-lg p-6 text-center">
          <p className="text-red-600 dark:text-red-400">
            Failed to load bookmarks. Please try again.
          </p>
        </div>
      )}

      {/* Empty State */}
      {!isLoading && !error && bookmarks.length === 0 && (
        <div className="flex flex-col items-center justify-center py-24 text-center">
          <div className="h-16 w-16 bg-zinc-50 rounded-full flex items-center justify-center mb-6 border border-zinc-100">
            <Bookmark className="h-8 w-8 text-zinc-300" />
          </div>
          <h3 className="text-xl font-semibold text-foreground mb-2">
            No bookmarks yet
          </h3>
          <p className="text-muted-foreground mb-8 max-w-sm">
            Start bookmarking articles to read them later.
          </p>
          <Link href="/" className={buttonVariants({ variant: "default" })}>
            Browse Feed
          </Link>
        </div>
      )}

      {/* Bookmarks Grid */}
      {!isLoading && !error && bookmarks.length > 0 && (
        <ArticleGrid
          articles={bookmarks}
          showRemoveBookmark={true}
          onBookmarkToggle={handleBookmarkToggle}
        />
      )}
    </main>
  );
}
