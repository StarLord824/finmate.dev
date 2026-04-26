"use client";

import { useInfiniteQuery } from "@tanstack/react-query";
import { apiClient } from "@/lib/api-client";
import { authClient } from "@/lib/auth-client";
import { FeedCard } from "@/components/FeedCard";
import Link from "next/link";
import { Header } from "@/components/Header";

export default function HistoryPage() {
  const { data: session } = authClient.useSession();

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, status } =
    useInfiniteQuery({
      queryKey: ["history"],
      queryFn: ({ pageParam }) =>
        apiClient.getHistory(pageParam as string | undefined),
      initialPageParam: undefined as string | undefined,
      getNextPageParam: (lastPage) => lastPage.nextCursor ?? undefined,
      enabled: !!session?.user,
    });

  if (!session?.user) {
    return (
      <div className="min-h-screen bg-light-bg dark:bg-dark-bg">
        <Header />
        <div className="max-w-2xl mx-auto py-20 text-center">
          <p className="text-muted mb-4">Sign in to view your reading history.</p>
          <Link href="/login" className="text-accent underline">
            Sign in
          </Link>
        </div>
      </div>
    );
  }

  const items = data?.pages.flatMap((p) => p.items) ?? [];

  return (
    <div className="min-h-screen bg-light-bg dark:bg-dark-bg">
      <Header />
      <div className="max-w-2xl mx-auto py-8 px-4">
        <h1 className="text-2xl font-bold text-foreground mb-6">Reading History</h1>

        {status === "pending" && (
          <div className="space-y-4">
            {Array.from({ length: 5 }).map((_, i) => (
              <div key={i} className="h-28 bg-light-card dark:bg-dark-card rounded-xl animate-pulse" />
            ))}
          </div>
        )}

        {status === "success" && items.length === 0 && (
          <p className="text-muted text-center py-16">
            No history yet. Start reading articles to build it up.
          </p>
        )}

        <div className="space-y-3">
          {items.map((entry) => (
            <div key={entry.id} className="relative">
              <FeedCard article={entry.article as any} index={0} />
              <span className="absolute top-3 right-3 text-xs text-muted bg-light-bg/80 dark:bg-dark-bg/80 px-2 py-0.5 rounded-full backdrop-blur-sm">
                {entry.readTime ? `${entry.readTime}s read` : "visited"}
                {" · "}
                {new Date(entry.readAt).toLocaleDateString()}
              </span>
            </div>
          ))}
        </div>

        {hasNextPage && (
          <button
            onClick={() => fetchNextPage()}
            disabled={isFetchingNextPage}
            className="mt-8 w-full py-2 text-sm text-muted border border-light-border dark:border-dark-border rounded-lg hover:bg-light-card dark:hover:bg-dark-card disabled:opacity-50 transition-colors"
          >
            {isFetchingNextPage ? "Loading…" : "Load more"}
          </button>
        )}
      </div>
    </div>
  );
}
