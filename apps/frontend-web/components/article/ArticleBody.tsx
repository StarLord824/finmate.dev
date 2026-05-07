import DOMPurify from "dompurify";
import type { ReactElement } from "react";
import type { Article } from "@/lib/types";

interface ArticleBodyProps {
  article: Article;
}

export function ArticleBody({ article }: ArticleBodyProps): ReactElement {
  const rawContent = article.content || article.summary;
  const isBrowser = typeof window !== "undefined";

  return (
    <div className="mt-6">
      {/* AI summary — shown when enriched and no full content */}
      {!rawContent && article.aiSummary && (
        <div className="bg-blue-50 border border-blue-100 rounded-lg px-5 py-4 mb-6">
          <p className="text-xs font-semibold text-blue-500 uppercase tracking-wider mb-2">AI Summary</p>
          <p className="text-base text-foreground leading-relaxed">{article.aiSummary}</p>
        </div>
      )}

      {/* Full article content or summary */}
      {rawContent ? (
        <article
          className="prose prose-zinc prose-a:text-accent hover:prose-a:text-accent/80 prose-headings:font-bold max-w-none"
          dangerouslySetInnerHTML={{
            __html: isBrowser ? DOMPurify.sanitize(rawContent) : rawContent,
          }}
        />
      ) : !article.aiSummary ? (
        <p className="text-muted-foreground italic">No content available for this article.</p>
      ) : null}

      {/* Always show link to original */}
      <a
        href={article.link}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-1.5 mt-6 text-sm font-medium text-blue-600 hover:text-blue-800 transition-colors"
      >
        Read full article on {article.source}
        <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
        </svg>
      </a>
    </div>
  );
}
