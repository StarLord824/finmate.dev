import { format } from "date-fns";
import { Badge } from "@/components/ui/badge";
import { Clock } from "lucide-react";
import type { Article } from "@/lib/types";
import type { ReactElement } from "react";

interface ArticleMetaProps {
  article: Article;
  readingTime: number;
}

export function ArticleMeta({ article, readingTime }: ArticleMetaProps): ReactElement {
  const publishedDate = article.publishedAt 
    ? format(new Date(article.publishedAt), "MMM d, yyyy • h:mm a")
    : "";

  return (
    <div className="mt-4">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-3">
          <Badge variant="secondary" className="bg-zinc-100 text-zinc-800 hover:bg-zinc-200 border-none font-medium text-xs">
            {article.source}
          </Badge>
          <span className="flex items-center gap-1 text-xs text-muted-foreground">
            <Clock className="h-3 w-3" />
            {readingTime} min read
          </span>
        </div>
        <span className="text-xs text-muted-foreground">{publishedDate}</span>
      </div>

      <h1 className="text-3xl sm:text-4xl font-bold tracking-tight leading-tight mt-4 text-foreground">
        {article.title}
      </h1>

      {article.author && (
        <div className="text-sm text-muted-foreground mt-3">
          By <span className="font-medium text-zinc-700">{article.author}</span>
        </div>
      )}
    </div>
  );
}
