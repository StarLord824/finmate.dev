"use client";

import { Bookmark, ExternalLink, Share2, MoreHorizontal } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { ReactElement, useState } from "react";
import { motion } from "framer-motion";
import { cn, formatRelativeTime } from "@/lib/utils";
import type { Article } from "@/lib/types";

interface FeedCardProps {
  article: Article;
  index?: number;
  isBookmarked?: boolean;
  onBookmarkToggle?: (articleId: string, isBookmarked: boolean) => Promise<void> | void;
}

export function FeedCard({ article, index = 0, isBookmarked: isBookmarkedProp, onBookmarkToggle }: FeedCardProps): ReactElement {
  const [isBookmarked, setIsBookmarked] = useState(isBookmarkedProp ?? article.isBookmarked ?? false);
  const [showMenu, setShowMenu] = useState(false);

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
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(window.location.origin + `/article/${article.id}`);
    }
  };

  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
      className={cn(
        "group relative bg-light-card dark:bg-dark-card rounded-xl border border-light-border dark:border-dark-border",
        "hover:shadow-card-hover dark:hover:shadow-card-hover-dark transition-all duration-300",
        "hover:-translate-y-1.5 hover:scale-[1.01]"
      )}
      role="article"
      aria-labelledby={`article-title-${article.id}`}
    >
      <Link href={`/article/${article.id}`} className="block p-4">
        <div className="flex gap-4">
          {/* Tags */}
          <div className="flex flex-col gap-2 min-w-0">
            {article.tags.length > 0 && (
              <div className="flex flex-wrap gap-1.5">
                {article.tags.slice(0, 2).map((tag) => (
                  <span
                    key={tag}
                    className="px-2 py-0.5 text-xs font-medium rounded-md bg-accent/10 text-accent border border-accent/20"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}

            {/* Title */}
            <h3
              id={`article-title-${article.id}`}
              className="font-semibold text-base leading-snug line-clamp-2 text-foreground group-hover:text-accent transition-colors"
            >
              {article.title}
            </h3>

            {/* Summary */}
            <p className="text-sm text-muted line-clamp-2 leading-relaxed">
              {article.summary || "No summary available"}
            </p>

            {/* Meta */}
            <div className="flex items-center gap-3 text-xs text-muted mt-1">
              <div className="flex items-center gap-1.5">
                <span className="font-medium">{article.source}</span>
              </div>
              <span>•</span>
              <time dateTime={article.publishedAt}>
                {formatRelativeTime(article.publishedAt)}
              </time>
              {article.readingTime && (
                <>
                  <span>•</span>
                  <span>{article.readingTime} min read</span>
                </>
              )}
            </div>
          </div>

          {/* Thumbnail */}
          {article.imageUrl && (
            <div className="relative w-24 h-20 flex-shrink-0 rounded-lg overflow-hidden bg-muted/10">
              <Image
                src={article.imageUrl}
                alt={article.title}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-300"
                sizes="96px"
                loading="lazy"
              />
            </div>
          )}
        </div>
      </Link>

      {/* Action Buttons */}
      <div className="absolute top-3 right-3 flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
        <button
          onClick={handleBookmark}
          className={cn(
            "p-1.5 rounded-md transition-all duration-200",
            isBookmarked
              ? "bg-accent2 text-white"
              : "bg-light-bg/80 dark:bg-dark-bg/80 hover:bg-accent/10 text-muted hover:text-accent backdrop-blur-sm"
          )}
          aria-label={isBookmarked ? "Remove bookmark" : "Bookmark article"}
        >
          <Bookmark className={cn("h-4 w-4", isBookmarked && "fill-current")} />
        </button>

        <button
          onClick={handleShare}
          className="p-1.5 rounded-md bg-light-bg/80 dark:bg-dark-bg/80 hover:bg-accent/10 text-muted hover:text-accent backdrop-blur-sm transition-all duration-200"
          aria-label="Share article"
        >
          <Share2 className="h-4 w-4" />
        </button>

        <a
          href={article.link}
          target="_blank"
          rel="noopener noreferrer"
          onClick={(e) => e.stopPropagation()}
          className="p-1.5 rounded-md bg-light-bg/80 dark:bg-dark-bg/80 hover:bg-accent/10 text-muted hover:text-accent backdrop-blur-sm transition-all duration-200"
          aria-label="Open original article"
        >
          <ExternalLink className="h-4 w-4" />
        </a>
      </div>
    </motion.article>
  );
}
