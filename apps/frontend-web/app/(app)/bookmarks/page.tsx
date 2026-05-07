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
    queryFn: () => apiClient.getBookmarks(),
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
          <Loader2 className="h-8 w-8 animate-spin text-[#007acc]" />
        </div>
      </div>
    );
  }

  if (!session?.user) {
    return (
      <div className="flex-1 w-full max-w-[1280px] mx-auto px-6 py-8">
        <div className="flex flex-col items-center justify-center min-h-[60vh] text-center max-w-md mx-auto">
          <div className="h-20 w-20 bg-gradient-to-br from-[#e8f2ff] to-[#cce0ff] rounded-full flex items-center justify-center mb-6 shadow-lg shadow-blue-900/10">
            <Lock className="h-9 w-9 text-[#007acc]" />
          </div>
          <h1 className="text-2xl font-bold text-[#003366] mb-4">
            Sign in to view bookmarks
          </h1>
          <p className="text-[#4a6890] mb-8 leading-relaxed">
            Create an account or sign in to save and access your bookmarked articles.
          </p>
          <div className="flex gap-4 w-full">
            <Link
              href="/login"
              className="flex-1 text-center px-6 py-3 rounded-xl bg-[#003366] text-white font-semibold text-sm hover:bg-[#00509e] transition-colors shadow-md shadow-blue-900/20"
            >
              Sign In
            </Link>
            <Link
              href="/signup"
              className="flex-1 text-center px-6 py-3 rounded-xl border border-[#c8ddf5] text-[#003366] font-semibold text-sm hover:bg-[#e8f2ff] hover:border-[#66a3ff] transition-colors"
            >
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
      <div className="flex items-center justify-between mb-8 pb-5 border-b border-[#c8ddf5]">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight text-[#003366]">Bookmarks</h1>
          <p className="text-sm text-[#4a6890] mt-1">Your saved articles</p>
        </div>
        {!isLoading && !error && bookmarks.length > 0 && (
          <span className="inline-flex items-center px-4 py-1.5 rounded-full bg-[#e8f2ff] text-[#00509e] text-sm font-bold">
            {bookmarks.length} {bookmarks.length === 1 ? "Article" : "Articles"}
          </span>
        )}
      </div>

      {/* Loading State */}
      {isLoading && (
        <ArticleGrid articles={[]} isLoading={true} />
      )}

      {/* Error State */}
      {error && (
        <div className="bg-red-50 border border-red-200 rounded-2xl p-6 text-center">
          <p className="text-red-600 font-medium">Failed to load bookmarks. Please try again.</p>
        </div>
      )}

      {/* Empty State */}
      {!isLoading && !error && bookmarks.length === 0 && (
        <div className="flex flex-col items-center justify-center py-24 text-center">
          <div className="h-20 w-20 bg-gradient-to-br from-[#e8f2ff] to-[#cce0ff] rounded-full flex items-center justify-center mb-6 shadow-lg shadow-blue-900/10">
            <Bookmark className="h-9 w-9 text-[#007acc]" />
          </div>
          <h3 className="text-xl font-bold text-[#003366] mb-2">
            No bookmarks yet
          </h3>
          <p className="text-[#4a6890] mb-8 max-w-sm leading-relaxed">
            Start bookmarking articles to read them later.
          </p>
          <Link
            href="/feed"
            className="px-6 py-3 rounded-xl bg-[#003366] text-white font-semibold text-sm hover:bg-[#00509e] transition-colors shadow-md shadow-blue-900/20"
          >
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
