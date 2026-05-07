import { format } from "date-fns";
import { Badge } from "@/components/ui/badge";
import { Clock, Calendar } from "lucide-react";
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
      {/* Source + Reading time row */}
      <div className="flex flex-wrap items-center gap-3">
        <Badge
          variant="secondary"
          className="bg-[#e8f2ff] text-[#00509e] hover:bg-[#cce0ff] border-none font-semibold text-xs px-3 py-1"
        >
          {article.source}
        </Badge>
        <span className="flex items-center gap-1.5 text-xs text-[#4a6890] font-medium">
          <Clock className="h-3.5 w-3.5 text-[#007acc]" />
          {readingTime} min read
        </span>
        {publishedDate && (
          <span className="flex items-center gap-1.5 text-xs text-[#4a6890]">
            <Calendar className="h-3.5 w-3.5 text-[#007acc]" />
            {publishedDate}
          </span>
        )}
      </div>

      {/* Title */}
      <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight leading-tight mt-5 text-[#003366]">
        {article.title}
      </h1>

      {/* Author */}
      {article.author && (
        <div className="flex items-center gap-2 mt-4">
          <div className="h-8 w-8 rounded-full bg-gradient-to-br from-[#003366] to-[#007acc] flex items-center justify-center shrink-0">
            <span className="text-white text-xs font-bold">{article.author[0]?.toUpperCase()}</span>
          </div>
          <div>
            <span className="text-sm font-semibold text-[#003366]">{article.author}</span>
            <p className="text-xs text-[#4a6890]">{article.source}</p>
          </div>
        </div>
      )}
    </div>
  );
}
