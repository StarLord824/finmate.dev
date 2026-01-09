"use client";

import { Bookmark, ExternalLink, Share2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { ReactElement, useState } from "react";
import { motion } from "framer-motion";
import { cn, formatRelativeTime } from "@/lib/utils";
import type { Article } from "@/lib/types";

interface FeedCardProps {
  article: Article;
  index?: number;
  onBookmarkToggle?: (articleId: string, isBookmarked: boolean) => void;
  isBookmarked?: boolean;
}

export function FeedCard({ article, index = 0, onBookmarkToggle }: FeedCardProps): ReactElement {
  const [isBookmarked, setIsBookmarked] = useState(article.isBookmarked || false);
  // const [showMenu, setShowMenu] = useState(false);

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
      } catch (_err) {
        console.log("Share cancelled");
      }
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(window.location.origin + `/article/${article.id}`);
    }
  };

  return (
    <motion.article
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.05 }}
      className={cn(
        "group relative bg-white rounded-xl border border-border p-4 h-full flex flex-col",
        "hover:border-primary/20 transition-colors duration-200"
      )}
      role="article"
      aria-labelledby={`article-title-${article.id}`}
    >
      <Link href={`/article/${article.id}`} className="flex-1 flex flex-col gap-4">
        <div className="flex gap-4">
          {/* Tags - Simplified */}
          <div className="flex flex-col gap-2 min-w-0 flex-1">
            {article.tags.length > 0 && (
              <div className="flex flex-wrap gap-1.5">
                {article.tags.slice(0, 2).map((tag) => (
                  <span
                    key={tag}
                    className="px-2 py-0.5 text-[10px] uppercase tracking-wider font-semibold rounded-full bg-slate-100 text-slate-600"
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
      {/* Action Buttons - Minimalist */}
      <div className="absolute top-4 right-4 flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
        <button
          onClick={handleBookmark}
          className={cn(
            "p-2 rounded-full border transition-colors bg-white",
            isBookmarked
              ? "border-primary text-primary bg-primary/5"
              : "border-slate-200 text-slate-400 hover:text-primary hover:border-primary/30"
          )}
          aria-label={isBookmarked ? "Remove bookmark" : "Bookmark article"}
        >
          <Bookmark className={cn("h-4 w-4", isBookmarked && "fill-current")} />
        </button>

        <button
          onClick={handleShare}
          className="p-2 rounded-full border border-slate-200 bg-white text-slate-400 hover:text-primary hover:border-primary/30 transition-colors"
          aria-label="Share article"
        >
          <Share2 className="h-4 w-4" />
        </button>

        <a
          href={article.link}
          target="_blank"
          rel="noopener noreferrer"
          onClick={(e) => e.stopPropagation()}
          className="p-2 rounded-full border border-slate-200 bg-white text-slate-400 hover:text-primary hover:border-primary/30 transition-colors"
          aria-label="Open original article"
        >
          <ExternalLink className="h-4 w-4" />
        </a>
      </div>
    </motion.article>
  );
}
