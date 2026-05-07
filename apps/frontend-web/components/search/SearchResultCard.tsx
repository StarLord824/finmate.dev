import Link from "next/link";
import { formatDistanceToNow } from "date-fns";
import { Badge } from "@/components/ui/badge";
import type { Article } from "@/lib/types";
import type { ReactElement } from "react";

interface SearchResultCardProps {
  article: Article;
}

export function SearchResultCard({ article }: SearchResultCardProps): ReactElement {
  const publishedDate = article.publishedAt
    ? formatDistanceToNow(new Date(article.publishedAt), { addSuffix: true })
    : "";

  return (
    <Link href={`/article/${article.id}`} className="block group">
      <div className="flex gap-4 items-start p-4 bg-white border border-[#c8ddf5] rounded-2xl hover:border-[#66a3ff] hover:shadow-md hover:shadow-blue-900/8 transition-all duration-200">
        {/* Image */}
        <div className="w-24 h-20 sm:w-32 sm:h-24 shrink-0 rounded-xl bg-gradient-to-br from-[#e8f2ff] to-[#cce0ff] overflow-hidden">
          {article.imageUrl ? (
            <img
              src={article.imageUrl}
              alt={article.title}
              className="w-full h-full object-cover transition-transform group-hover:scale-105"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <span className="text-[#66a3ff] font-bold text-xs">FinMate</span>
            </div>
          )}
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-2">
            <Badge
              variant="secondary"
              className="bg-[#e8f2ff] text-[#00509e] hover:bg-[#cce0ff] border-none font-semibold text-xs"
            >
              {article.source}
            </Badge>
            <span className="text-xs text-[#4a6890]">{publishedDate}</span>
          </div>

          <h3 className="text-base font-semibold leading-snug text-[#0a1628] group-hover:text-[#007acc] transition-colors line-clamp-2">
            {article.title}
          </h3>

          {article.summary && (
            <p className="text-sm text-[#4a6890] line-clamp-1 mt-1.5 hidden sm:block leading-relaxed">
              {article.summary}
            </p>
          )}
        </div>
      </div>
    </Link>
  );
}
