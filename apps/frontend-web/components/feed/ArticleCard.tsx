import Link from "next/link";
import { formatDistanceToNow } from "date-fns";
import { Bookmark, X } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import type { Article } from "@/lib/types";

interface ArticleCardProps {
  article: Article;
  onBookmarkToggle?: (articleId: string, isBookmarked: boolean) => void;
  showRemoveBookmark?: boolean;
}

import type { ReactElement } from "react";

export function ArticleCard({ article, onBookmarkToggle, showRemoveBookmark }: ArticleCardProps): ReactElement {
  const publishedDate = article.publishedAt 
    ? formatDistanceToNow(new Date(article.publishedAt), { addSuffix: true })
    : "";

  return (
    <Card className="overflow-hidden border-border bg-card hover:shadow-card-hover transition-shadow duration-200 group relative">
      {/* Remove Bookmark Button (visible on hover if configured) */}
      {showRemoveBookmark && onBookmarkToggle && (
        <button
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            onBookmarkToggle(article.id, false);
          }}
          className="absolute top-2 right-2 z-10 p-1.5 bg-black/50 hover:bg-black/70 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
          title="Remove bookmark"
        >
          <X className="h-4 w-4" />
        </button>
      )}

      <Link href={`/article/${article.id}`} className="block h-full">
        {/* Image */}
        <div className="relative aspect-video w-full bg-zinc-100 overflow-hidden">
          {article.imageUrl ? (
            <img 
              src={article.imageUrl} 
              alt={article.title} 
              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-zinc-100 text-zinc-300">
              <span className="font-medium text-lg">FinMate</span>
            </div>
          )}
        </div>

        <CardContent className="p-4">
          {/* Source + Date */}
          <div className="flex items-center gap-2 mt-1">
            <Badge variant="secondary" className="bg-zinc-100 text-zinc-700 hover:bg-zinc-200 border-none font-medium text-xs">
              {article.source}
            </Badge>
            <span className="text-xs text-muted-foreground">{publishedDate}</span>
          </div>

          {/* Title */}
          <h3 className="text-base font-semibold leading-snug line-clamp-2 mt-2 text-foreground group-hover:text-accent transition-colors">
            {article.title}
          </h3>

          {/* Summary */}
          {article.summary && (
            <p className="text-sm text-muted-foreground line-clamp-3 mt-2">
              {article.summary}
            </p>
          )}

          {/* Tags */}
          {article.tags && article.tags.length > 0 && (
            <div className="flex flex-wrap gap-1 mt-4">
              {article.tags.slice(0, 3).map((tag) => (
                <Badge key={tag} variant="outline" className="text-[10px] py-0 px-1.5 font-normal text-muted-foreground border-border">
                  {tag}
                </Badge>
              ))}
              {article.tags.length > 3 && (
                <Badge variant="outline" className="text-[10px] py-0 px-1.5 font-normal text-muted-foreground border-border">
                  +{article.tags.length - 3}
                </Badge>
              )}
            </div>
          )}
        </CardContent>
      </Link>
    </Card>
  );
}

export function ArticleCardSkeleton(): ReactElement {
  return (
    <Card className="overflow-hidden border-border bg-card">
      <Skeleton className="aspect-video w-full rounded-none" />
      <CardContent className="p-4">
        <div className="flex items-center gap-2 mt-1">
          <Skeleton className="h-5 w-20 rounded-full" />
          <Skeleton className="h-4 w-16" />
        </div>
        <Skeleton className="h-5 w-full mt-3" />
        <Skeleton className="h-5 w-2/3 mt-1" />
        <Skeleton className="h-4 w-full mt-3" />
        <Skeleton className="h-4 w-full mt-1" />
        <Skeleton className="h-4 w-4/5 mt-1" />
        <div className="flex gap-1 mt-4">
          <Skeleton className="h-4 w-12 rounded-full" />
          <Skeleton className="h-4 w-16 rounded-full" />
        </div>
      </CardContent>
    </Card>
  );
}
