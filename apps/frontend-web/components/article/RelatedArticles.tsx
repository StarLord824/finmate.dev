"use client";

import Link from "next/link";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { Share2, Check } from "lucide-react";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { apiClient } from "@/lib/api-client";

interface RelatedArticlesProps {
  articleId: string;
}

export function RelatedArticles({ articleId }: RelatedArticlesProps) {
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
      <div>
        <h3 className="text-sm font-semibold text-foreground mb-4">Related Articles</h3>
        
        {isLoading ? (
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="flex gap-3">
                <Skeleton className="w-16 h-16 rounded-md shrink-0" />
                <div className="flex-1 space-y-2 py-1">
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-2/3" />
                </div>
              </div>
            ))}
          </div>
        ) : related && related.length > 0 ? (
          <div className="space-y-4">
            {related.map((article) => (
              <Link 
                key={article.id} 
                href={`/article/${article.id}`}
                className="flex gap-3 group items-start"
              >
                <div className="w-16 h-16 rounded-md bg-zinc-100 shrink-0 overflow-hidden">
                  {article.imageUrl ? (
                    <img 
                      src={article.imageUrl} 
                      alt="" 
                      className="w-full h-full object-cover transition-transform group-hover:scale-105"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-zinc-300 font-bold text-xs">
                      F
                    </div>
                  )}
                </div>
                <div className="flex-1 min-w-0 py-0.5">
                  <h4 className="text-sm font-medium leading-snug text-foreground group-hover:text-accent transition-colors line-clamp-2">
                    {article.title}
                  </h4>
                  <span className="text-xs text-muted-foreground mt-1 block">
                    {article.source}
                  </span>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <p className="text-sm text-muted-foreground">No related articles found.</p>
        )}
      </div>

      <Separator />

      <Tooltip>
        <TooltipTrigger asChild>
          <Button 
            variant="outline" 
            className="w-full justify-center gap-2"
            onClick={handleShare}
          >
            {copied ? <Check className="h-4 w-4 text-positive" /> : <Share2 className="h-4 w-4" />}
            {copied ? "Copied to clipboard" : "Share Article"}
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          <p>Copy link</p>
        </TooltipContent>
      </Tooltip>
    </div>
  );
}
