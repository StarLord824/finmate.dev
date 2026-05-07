"use client";

import Link from "next/link";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { Share2, Check, ExternalLink } from "lucide-react";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { apiClient } from "@/lib/api-client";
import type { ReactElement } from "react";

interface RelatedArticlesProps {
  articleId: string;
}

export function RelatedArticles({ articleId }: RelatedArticlesProps): ReactElement {
  const [copied, setCopied] = useState(false);

  const { data: related, isLoading } = useQuery({
    queryKey: ["related", articleId],
    queryFn: () => apiClient.getRelatedArticles(articleId, 3),
  });

  const handleShare = () => {
    if (typeof window !== "undefined") {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="space-y-6">
      {/* Related Articles */}
      <div className="bg-white border border-[#c8ddf5] rounded-2xl p-5 shadow-sm shadow-blue-900/4">
        <h3 className="text-sm font-bold text-[#003366] mb-4 uppercase tracking-wide">
          Related Articles
        </h3>

        {isLoading ? (
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="flex gap-3">
                <Skeleton className="w-16 h-16 rounded-xl shrink-0 bg-[#e8f2ff]" />
                <div className="flex-1 space-y-2 py-1">
                  <Skeleton className="h-4 w-full bg-[#e8f2ff]" />
                  <Skeleton className="h-4 w-2/3 bg-[#e8f2ff]" />
                </div>
              </div>
            ))}
          </div>
        ) : related && related.length > 0 ? (
          <div className="space-y-3">
            {related.map((article) => (
              <Link
                key={article.id}
                href={`/article/${article.id}`}
                className="flex gap-3 group items-start p-2 rounded-xl hover:bg-[#e8f2ff] transition-colors -mx-2"
              >
                <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-[#e8f2ff] to-[#cce0ff] shrink-0 overflow-hidden">
                  {article.imageUrl ? (
                    <img
                      src={article.imageUrl}
                      alt=""
                      className="w-full h-full object-cover transition-transform group-hover:scale-105"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <span className="text-[#66a3ff] font-bold text-xs">FM</span>
                    </div>
                  )}
                </div>
                <div className="flex-1 min-w-0 py-0.5">
                  <h4 className="text-sm font-semibold leading-snug text-[#0a1628] group-hover:text-[#007acc] transition-colors line-clamp-2">
                    {article.title}
                  </h4>
                  <span className="text-xs text-[#4a6890] mt-1 block font-medium">
                    {article.source}
                  </span>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <p className="text-sm text-[#4a6890]">No related articles found.</p>
        )}
      </div>

      <Separator className="bg-[#c8ddf5]" />

      {/* Share button */}
      <Tooltip>
        <TooltipTrigger
          render={
            <button
              onClick={handleShare}
              className={`w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl border text-sm font-semibold transition-all ${
                copied
                  ? "bg-emerald-50 border-emerald-200 text-emerald-700"
                  : "bg-white border-[#c8ddf5] text-[#003366] hover:bg-[#e8f2ff] hover:border-[#66a3ff]"
              }`}
            />
          }
        >
          {copied ? (
            <Check className="h-4 w-4 text-emerald-600" />
          ) : (
            <Share2 className="h-4 w-4 text-[#007acc]" />
          )}
          {copied ? "Link copied!" : "Share Article"}
          {!copied && <ExternalLink className="h-3.5 w-3.5 text-[#66a3ff]" />}
        </TooltipTrigger>
        <TooltipContent>
          <p>Copy link to clipboard</p>
        </TooltipContent>
      </Tooltip>
    </div>
  );
}
