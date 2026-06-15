import Link from "next/link";
import { formatDistanceToNow } from "date-fns";
import { Bookmark, X } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import type { Article } from "@/lib/types";
import type { ReactElement } from "react";

interface ArticleCardProps {
  article: Article;
  onBookmarkToggle?: (articleId: string, isBookmarked: boolean) => void;
  showRemoveBookmark?: boolean;
}

export function ArticleCard({ article, onBookmarkToggle, showRemoveBookmark }: ArticleCardProps): ReactElement {
  const publishedDate = article.publishedAt
    ? formatDistanceToNow(new Date(article.publishedAt), { addSuffix: true })
    : "";

  return (
    <Card className="overflow-hidden border-[#c8ddf5] bg-white hover:shadow-lg hover:shadow-blue-900/8 hover:-translate-y-0.5 transition-all duration-200 group relative">
      {/* Remove Bookmark Button */}
      {showRemoveBookmark && onBookmarkToggle && (
        <button
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            onBookmarkToggle(article.id, false);
          }}
          className="absolute top-2 right-2 z-10 p-1.5 bg-[#003366]/70 hover:bg-[#003366] text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
          title="Remove bookmark"
        >
          <X className="h-4 w-4" />
        </button>
      )}

      <Link href={`/article/${article.id}`} className="block h-full">
        {/* Image */}
        <div className="relative aspect-video w-full overflow-hidden bg-gradient-to-br from-[#e8f2ff] to-[#cce0ff]">
          {article.imageUrl ? (
            <img
              src={article.imageUrl}
              alt={article.title}
              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <span className="font-bold text-xl text-[#66a3ff]/60">FinMate</span>
            </div>
          )}
        </div>

        <CardContent className="p-4">
          {/* Source + Date */}
          <div className="flex items-center gap-2 mt-1">
            <Badge
              variant="secondary"
              className="bg-[#e8f2ff] text-[#00509e] hover:bg-[#cce0ff] border-none font-semibold text-xs"
            >
              {article.source}
            </Badge>
            <span className="text-xs text-[#4a6890]">{publishedDate}</span>
          </div>

          {/* Title */}
          <h3 className="text-base font-semibold leading-snug line-clamp-2 mt-2 text-[#0a1628] group-hover:text-[#007acc] transition-colors">
            {article.title}
          </h3>

          {/* Summary — prefer AI summary when enriched */}
          {(article.aiSummary || article.summary) && (
            <p className="text-sm text-[#4a6890] line-clamp-3 mt-2 leading-relaxed">
              {article.aiSummary || article.summary}
            </p>
          )}

          {/* Tags — prefer AI-extracted tags when enriched */}
          {(() => {
            const displayTags = [...new Set(article.aiTags?.length ? article.aiTags : (article.tags ?? []))];
            if (!displayTags.length) return null;
            return (
              <div className="flex flex-wrap gap-1 mt-4">
                {displayTags.slice(0, 3).map((tag) => (
                  <Badge
                    key={tag}
                    variant="outline"
                    className="text-[10px] py-0 px-1.5 font-normal text-[#4a6890] border-[#c8ddf5]"
                  >
                    {tag}
                  </Badge>
                ))}
                {displayTags.length > 3 && (
                  <Badge
                    variant="outline"
                    className="text-[10px] py-0 px-1.5 font-normal text-[#4a6890] border-[#c8ddf5]"
                  >
                    +{displayTags.length - 3}
                  </Badge>
                )}
              </div>
            );
          })()}
        </CardContent>
      </Link>
    </Card>
  );
}

export function ArticleCardSkeleton(): ReactElement {
  return (
    <Card className="overflow-hidden border-[#c8ddf5] bg-white">
      <Skeleton className="aspect-video w-full rounded-none bg-[#e8f2ff]" />
      <CardContent className="p-4">
        <div className="flex items-center gap-2 mt-1">
          <Skeleton className="h-5 w-20 rounded-full bg-[#e8f2ff]" />
          <Skeleton className="h-4 w-16 bg-[#e8f2ff]" />
        </div>
        <Skeleton className="h-5 w-full mt-3 bg-[#e8f2ff]" />
        <Skeleton className="h-5 w-2/3 mt-1 bg-[#e8f2ff]" />
        <Skeleton className="h-4 w-full mt-3 bg-[#e8f2ff]" />
        <Skeleton className="h-4 w-full mt-1 bg-[#e8f2ff]" />
        <Skeleton className="h-4 w-4/5 mt-1 bg-[#e8f2ff]" />
        <div className="flex gap-1 mt-4">
          <Skeleton className="h-4 w-12 rounded-full bg-[#e8f2ff]" />
          <Skeleton className="h-4 w-16 rounded-full bg-[#e8f2ff]" />
        </div>
      </CardContent>
    </Card>
  );
}
