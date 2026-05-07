import Link from "next/link";
import { formatDistanceToNow } from "date-fns";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import type { Article } from "@/lib/types";
import { ReactElement } from "react";

interface SearchResultCardProps {
  article: Article;
}

export function SearchResultCard({ article }: SearchResultCardProps): ReactElement {
  const publishedDate = article.publishedAt
    ? formatDistanceToNow(new Date(article.publishedAt), { addSuffix: true })
    : "";

  return (
    <Card className="overflow-hidden border-border bg-card hover:shadow-sm transition-shadow group">
      <Link href={`/article/${article.id}`} className="block">
        <CardContent className="p-4 flex gap-4 items-start sm:items-center">
          {/* Image */}
          <div className="w-24 h-16 sm:w-32 sm:h-20 shrink-0 rounded-md bg-zinc-100 overflow-hidden">
            {article.imageUrl ? (
              <img
                src={article.imageUrl}
                alt={article.title}
                className="w-full h-full object-cover transition-transform group-hover:scale-105"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-zinc-300 font-bold text-xs">
                FinMate
              </div>
            )}
          </div>

          {/* Content */}
          <div className="flex-1 min-w-0">
            <h3 className="text-base font-semibold leading-snug text-foreground group-hover:text-accent transition-colors line-clamp-2">
              {article.title}
            </h3>

            <div className="flex items-center gap-2 mt-2">
              <Badge
                variant="secondary"
                className="bg-zinc-100 text-zinc-700 hover:bg-zinc-200 border-none font-medium text-xs"
              >
                {article.source}
              </Badge>
              <span className="text-xs text-muted-foreground">
                {publishedDate}
              </span>
            </div>

            {article.summary && (
              <p className="text-sm text-muted-foreground line-clamp-1 mt-2 hidden sm:block">
                {article.summary}
              </p>
            )}
          </div>
        </CardContent>
      </Link>
    </Card>
  );
}
