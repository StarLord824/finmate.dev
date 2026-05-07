"use client";

import { useQuery } from "@tanstack/react-query";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { ArticleBody } from "@/components/article/ArticleBody";
import { ArticleMeta } from "@/components/article/ArticleMeta";
import { RelatedArticles } from "@/components/article/RelatedArticles";
import { ArticleSkeleton } from "@/components/Skeletons";
import { apiClient } from "@/lib/api-client";
import { authClient } from "@/lib/auth-client";
import { ReadTracker } from "./ReadTracker";
import type { ReactElement } from "react";

export default function ArticlePage(): ReactElement {
  const params = useParams();
  const articleId = params.id as string;
  const { data: session } = authClient.useSession();
  const isAuthenticated = !!session?.user;

  const { data: article, isLoading, isError } = useQuery({
    queryKey: ["article", articleId],
    queryFn: async () => {
      const fetchedArticle = await apiClient.getArticle(articleId);
      
      // Calculate reading time if not provided
      const readingTime = fetchedArticle.readingTime || calculateReadingTime(fetchedArticle);
      
      return {
        ...fetchedArticle,
        readingTime,
      };
    },
  });

  // Helper function to calculate reading time (average 200 words per minute)
  const calculateReadingTime = (article: { summary: string | null; content?: string | null }): number => {
    const text = `${article.summary || ""} ${article.content ?? ""}`;
    const wordCount = text.split(/\s+/).length;
    return Math.max(1, Math.ceil(wordCount / 200));
  };

  if (isLoading) {
    return (
      <div className="max-w-[1200px] mx-auto w-full px-6 py-8">
        <ArticleSkeleton />
      </div>
    );
  }

  if (isError || !article) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <div className="max-w-md mx-auto">
          <div className="h-16 w-16 bg-gradient-to-br from-[#e8f2ff] to-[#cce0ff] rounded-full flex items-center justify-center mx-auto mb-6">
            <span className="text-[#007acc] font-bold text-2xl">?</span>
          </div>
          <h1 className="text-2xl font-bold text-[#003366] mb-4">Article not found</h1>
          <Link href="/feed" className="text-[#007acc] hover:text-[#003366] font-semibold transition-colors">
            ← Return to feed
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-[1200px] mx-auto w-full px-6 py-8 flex flex-col lg:flex-row gap-12 items-start relative">
      {/* Main Content */}
      <div className="flex-1 min-w-0">
        {/* Back Button */}
        <Link
          href="/feed"
          className="inline-flex items-center gap-1.5 text-sm font-medium text-[#4a6890] hover:text-[#007acc] transition-colors"
        >
          ← Back to Feed
        </Link>

        {/* Article Meta */}
        <ArticleMeta article={article} readingTime={article.readingTime} />

        {/* Hero Image */}
        {article.imageUrl && (
          <img
            src={article.imageUrl}
            alt={article.title}
            className="w-full max-h-[420px] object-cover rounded-2xl mt-6 shadow-lg shadow-blue-900/10"
          />
        )}

        {/* Article Prose Body */}
        <ArticleBody article={article} />

        {/* Tags Row — prefer AI tags when enriched */}
        {(() => {
          const displayTags = article.aiTags?.length ? article.aiTags : (article.tags ?? []);
          if (!displayTags.length) return null;
          return (
            <div className="flex flex-wrap gap-2 mt-8 pt-6 border-t border-[#c8ddf5]">
              {displayTags.map((tag) => (
                <Badge
                  key={tag}
                  variant="outline"
                  className="font-medium text-[#00509e] border-[#c8ddf5] bg-[#e8f2ff]/50 hover:bg-[#e8f2ff] transition-colors"
                >
                  {tag}
                </Badge>
              ))}
            </div>
          );
        })()}
      </div>

      {/* Right Rail */}
      <div className="w-full lg:w-72 shrink-0 lg:sticky lg:top-8">
        <RelatedArticles articleId={articleId} />
      </div>

      {/* Read tracker — fires recordRead on unmount */}
      <ReadTracker articleId={articleId} isAuthenticated={isAuthenticated} />
    </div>
  );
}
