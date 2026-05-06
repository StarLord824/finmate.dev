import { ArticleCard, ArticleCardSkeleton } from "./ArticleCard";
import type { Article } from "@/lib/types";

interface ArticleGridProps {
  articles: Article[];
  isLoading?: boolean;
  skeletonCount?: number;
  onBookmarkToggle?: (articleId: string, isBookmarked: boolean) => void;
  showRemoveBookmark?: boolean;
}

export function ArticleGrid({ 
  articles, 
  isLoading, 
  skeletonCount = 6,
  onBookmarkToggle,
  showRemoveBookmark 
}: ArticleGridProps) {
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {Array.from({ length: skeletonCount }).map((_, i) => (
          <ArticleCardSkeleton key={i} />
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {articles.map((article) => (
        <ArticleCard 
          key={article.id} 
          article={article} 
          onBookmarkToggle={onBookmarkToggle}
          showRemoveBookmark={showRemoveBookmark}
        />
      ))}
    </div>
  );
}
