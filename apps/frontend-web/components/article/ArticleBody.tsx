import DOMPurify from "dompurify";
import type { ReactElement } from "react";
import type { Article } from "@/lib/types";

interface ArticleBodyProps {
  article: Article;
}

export function ArticleBody({ article }: ArticleBodyProps): ReactElement | null {
  // If we only have summary and no content, show summary
  const content = article.content || article.summary;

  if (!content) {
    return <div className="mt-8 text-muted-foreground italic">No content available for this article.</div>;
  }

  // Use a simple sanitize if in browser, otherwise rely on backend parsing or raw html (assuming trusted or server purified)
  const isBrowser = typeof window !== "undefined";
  const safeContent = isBrowser ? DOMPurify.sanitize(content) : content;

  return (
    <article 
      className="prose prose-zinc prose-a:text-accent hover:prose-a:text-accent/80 prose-headings:font-bold max-w-none mt-6"
      dangerouslySetInnerHTML={{ __html: safeContent }}
    />
  );
}
