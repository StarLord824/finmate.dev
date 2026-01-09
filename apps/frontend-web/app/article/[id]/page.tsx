"use client";

import { useQuery } from "@tanstack/react-query";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import DOMPurify from "dompurify";
import { ArrowLeft, Bookmark, Share2, ExternalLink, Clock } from "lucide-react";
import { ReactElement, useState } from "react";
import { Header } from "@/components/Header";
import { FeedCard } from "@/components/FeedCard";
import { ArticleSkeleton } from "@/components/Skeletons";
import { apiClient } from "@/lib/api-client";
import { formatRelativeTime, cn } from "@/lib/utils";
import type { Article } from "@/lib/types";

export default function ArticlePage(): ReactElement {
  const params = useParams();
  const router = useRouter();
  const articleId = params.id as string;
  const [isBookmarked, setIsBookmarked] = useState(false);

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

  const { data: relatedArticles } = useQuery({
    queryKey: ["related", articleId, article?.tags[0]],
    queryFn: async () => {
      if (!article || article.tags.length === 0) return [];
      
      const response = await apiClient.getFeed({
        limit: 3,
        tags: article.tags.length > 0 ? [article.tags[0]!] : undefined, // Use the first tag for related articles
      });

      // Filter out the current article and calculate reading time
      return response.data
        .filter((a: Article) => a.id !== articleId)
        .slice(0, 3)
        .map((a: Article) => ({
          ...a,
          readingTime: a.readingTime || calculateReadingTime(a),
        }));
    },
    enabled: !!article, // Only fetch when we have the article
  });

  const handleBookmark = () => {
    const newState = !isBookmarked;
    setIsBookmarked(newState);
    if (article) {
      apiClient.toggleBookmark(article.id, newState);
    }
  };

  const handleShare = async () => {
    if (navigator.share && article) {
      try {
        await navigator.share({
          title: article.title,
          text: article.summary || "",
          url: window.location.href,
        });
      } catch {
        console.log("Share cancelled");
      }
    } else {
      navigator.clipboard.writeText(window.location.href);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-light-bg dark:bg-dark-bg">
        <Header />
        <ArticleSkeleton />
      </div>
    );
  }

  if (isError || !article) {
    return (
      <div className="min-h-screen bg-light-bg dark:bg-dark-bg">
        <Header />
        <div className="container mx-auto px-4 py-16 text-center">
          <h1 className="text-2xl font-bold text-foreground mb-4">Article not found</h1>
          <Link href="/" className="text-accent hover:text-accent-dark">
            Return to feed
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-light-bg dark:bg-dark-bg">
      <Header />

      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Back Button */}
          <button
            onClick={() => router.back()}
            className="flex items-center gap-2 text-muted hover:text-accent transition-colors mb-6"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>Back to feed</span>
          </button>

          {/* Article Header */}
          <article className="bg-light-card dark:bg-dark-card rounded-xl border border-light-border dark:border-dark-border overflow-hidden">
            {/* Tags */}
            <div className="p-6 pb-4">
              <div className="flex flex-wrap gap-2 mb-4">
                {article.tags.map((tag: string) => (
                  <span
                    key={tag}
                    className="px-3 py-1 text-sm font-medium rounded-lg bg-accent/10 text-accent border border-accent/20"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {/* Title */}
              <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4 leading-tight">
                {article.title}
              </h1>

              {/* Meta */}
              <div className="flex flex-wrap items-center gap-4 text-sm text-muted">
                <div className="flex items-center gap-2">
                  <span className="font-medium">{article.source}</span>
                </div>
                {article.author && (
                  <>
                    <span>•</span>
                    <span>By {article.author}</span>
                  </>
                )}
                <span>•</span>
                <time dateTime={article.publishedAt}>
                  {formatRelativeTime(article.publishedAt)}
                </time>
                {article.readingTime && (
                  <>
                    <span>•</span>
                    <div className="flex items-center gap-1">
                      <Clock className="h-4 w-4" />
                      <span>{article.readingTime} min read</span>
                    </div>
                  </>
                )}
              </div>

              {/* Action Buttons */}
              <div className="flex gap-2 mt-6">
                <button
                  onClick={handleBookmark}
                  className={cn(
                    "flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all",
                    isBookmarked
                      ? "bg-accent2 text-white"
                      : "bg-light-bg dark:bg-dark-bg text-muted hover:text-accent hover:bg-accent/10 border border-light-border dark:border-dark-border"
                  )}
                >
                  <Bookmark className={cn("h-4 w-4", isBookmarked && "fill-current")} />
                  {isBookmarked ? "Bookmarked" : "Bookmark"}
                </button>

                <button
                  onClick={handleShare}
                  className="flex items-center gap-2 px-4 py-2 rounded-lg font-medium bg-light-bg dark:bg-dark-bg text-muted hover:text-accent hover:bg-accent/10 border border-light-border dark:border-dark-border transition-all"
                >
                  <Share2 className="h-4 w-4" />
                  Share
                </button>

                <a
                  href={article.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-4 py-2 rounded-lg font-medium bg-accent text-white hover:bg-accent-dark transition-all"
                >
                  <ExternalLink className="h-4 w-4" />
                  Read Original
                </a>
              </div>
            </div>

            {/* Hero Image */}
            {article.imageUrl && (
              <div className="relative w-full h-96 bg-muted/10">
                <Image
                  src={article.imageUrl}
                  alt={article.title}
                  fill
                  className="object-cover"
                  priority
                />
              </div>
            )}

            {/* Content */}
            <div className="p-6 md:p-8">
              <div className="prose prose-lg dark:prose-invert max-w-none">
                <p className="text-xl text-muted leading-relaxed mb-6">
                  {article.summary}
                </p>
                <div
                  className="text-foreground leading-relaxed space-y-4"
                  dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(article.content || "") }}
                />
              </div>
            </div>
          </article>

          {/* Related Articles */}
          {relatedArticles && relatedArticles.length > 0 && (
            <div className="mt-12">
              <h2 className="text-2xl font-bold text-foreground mb-6">Related Articles</h2>
              <div className="space-y-4">
                {relatedArticles.map((relatedArticle: Article, index: number) => (
                  <FeedCard
                    key={relatedArticle.id}
                    article={relatedArticle}
                    index={index}
                  />
                ))}
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
