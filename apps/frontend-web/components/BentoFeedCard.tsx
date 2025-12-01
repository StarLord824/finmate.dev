"use client";

import { Bookmark, ExternalLink, Share2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { ReactElement, useState } from "react";
import { cn, formatRelativeTime } from "@/lib/utils";
import type { Article } from "@/lib/types";

interface BentoFeedCardProps {
  article: Article;
  index?: number;
  onBookmarkToggle?: (articleId: string, isBookmarked: boolean) => void;
}

export function BentoFeedCard({ article, index = 0, onBookmarkToggle }: BentoFeedCardProps): ReactElement {
  const [isBookmarked, setIsBookmarked] = useState(article.isBookmarked || false);

  const handleBookmark = (e: React.MouseEvent) => {
    e.preventDefault();
    const newState = !isBookmarked;
    setIsBookmarked(newState);
    onBookmarkToggle?.(article.id, newState);
  };

  const handleShare = async (e: React.MouseEvent) => {
    e.preventDefault();
    if (navigator.share) {
      try {
        await navigator.share({
          title: article.title,
          text: article.summary || "",
          url: `/article/${article.id}`,
        });
      } catch (err) {
        console.log("Share cancelled");
      }
    } else {
      navigator.clipboard.writeText(window.location.origin + `/article/${article.id}`);
    }
  };

  return (
    <Link
      href={`/article/${article.id}`}
      target="_blank"
      rel="noopener noreferrer"
      className={cn(
        "group relative bg-light-card dark:bg-dark-card rounded-xl border border-light-border dark:border-dark-border",
        "hover:shadow-card-hover dark:hover:shadow-card-hover-dark transition-all duration-300",
        "hover:scale-[1.02] overflow-hidden flex flex-col h-full"
      )}
      role="article"
      aria-labelledby={`article-title-${article.id}`}
    >
      {/* Image Header */}
      {article.imageUrl && (
        <div className="relative w-full h-48 bg-muted/10 flex-shrink-0">
          <Image
            src={article.imageUrl}
            alt={article.title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            loading="lazy"
          />
          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
          
          {/* Tags on Image */}
          <div className="absolute top-3 left-3 flex flex-wrap gap-1.5">
            {article.tags.slice(0, 2).map((tag: string) => (
              <span
                key={tag}
                className="px-2 py-1 text-xs font-medium rounded-md bg-accent text-white backdrop-blur-sm"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Content */}
      <div className="p-4 flex flex-col flex-1">
        {/* Title */}
        <h3
          id={`article-title-${article.id}`}
          className="font-bold text-base leading-snug line-clamp-3 text-foreground group-hover:text-accent transition-colors mb-2"
        >
          {article.title}
        </h3>

        {/* Summary */}
        {article.summary && (
          <p className="text-sm text-muted line-clamp-2 leading-relaxed mb-3 flex-1">
            {article.summary}
          </p>
        )}

        {/* Meta */}
        <div className="flex items-center justify-between text-xs text-muted mt-auto">
          <div className="flex items-center gap-2">
            <span className="font-medium">{article.source}</span>
            <span>•</span>
            <time dateTime={article.publishedAt}>
              {formatRelativeTime(article.publishedAt)}
            </time>
          </div>
          {article.readingTime && (
            <span>{article.readingTime} min</span>
          )}
        </div>
      </div>

      {/* Action Buttons */}
      <div className="absolute top-3 right-3 flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
        <button
          onClick={handleBookmark}
          className={cn(
            "p-2 rounded-lg transition-all duration-200 backdrop-blur-sm",
            isBookmarked
              ? "bg-accent2 text-white"
              : "bg-white/90 dark:bg-dark-bg/90 hover:bg-accent/10 text-muted hover:text-accent"
          )}
          aria-label={isBookmarked ? "Remove bookmark" : "Bookmark article"}
        >
          <Bookmark className={cn("h-4 w-4", isBookmarked && "fill-current")} />
        </button>

        <button
          onClick={handleShare}
          className="p-2 rounded-lg bg-white/90 dark:bg-dark-bg/90 hover:bg-accent/10 text-muted hover:text-accent backdrop-blur-sm transition-all duration-200"
          aria-label="Share article"
        >
          <Share2 className="h-4 w-4" />
        </button>

        <a
          href={article.link}
          target="_blank"
          rel="noopener noreferrer"
          onClick={(e) => e.stopPropagation()}
          className="p-2 rounded-lg bg-accent text-white hover:bg-accent-dark backdrop-blur-sm transition-all duration-200"
          aria-label="Open original article"
        >
          <ExternalLink className="h-4 w-4" />
        </a>
      </div>
    </Link>
  );
}
