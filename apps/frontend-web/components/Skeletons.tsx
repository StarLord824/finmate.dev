// import { cn } from "@/lib/utils";
import type { ReactElement } from "react";

export function FeedCardSkeleton(): ReactElement {
  return (
    <div className="bg-light-card dark:bg-dark-card rounded-xl border border-light-border dark:border-dark-border p-4">
      <div className="flex gap-4">
        <div className="flex-1 space-y-3">
          {/* Tags */}
          <div className="flex gap-2">
            <div className="h-5 w-16 bg-muted/20 rounded-md shimmer" />
            <div className="h-5 w-20 bg-muted/20 rounded-md shimmer" />
          </div>

          {/* Title */}
          <div className="space-y-2">
            <div className="h-5 bg-muted/20 rounded shimmer" />
            <div className="h-5 w-4/5 bg-muted/20 rounded shimmer" />
          </div>

          {/* Summary */}
          <div className="space-y-2">
            <div className="h-4 bg-muted/20 rounded shimmer" />
            <div className="h-4 w-3/4 bg-muted/20 rounded shimmer" />
          </div>

          {/* Meta */}
          <div className="flex gap-2">
            <div className="h-4 w-24 bg-muted/20 rounded shimmer" />
            <div className="h-4 w-16 bg-muted/20 rounded shimmer" />
          </div>
        </div>

        {/* Thumbnail */}
        <div className="w-24 h-20 bg-muted/20 rounded-lg shimmer flex-shrink-0" />
      </div>
    </div>
  );
}

export function FeedSkeleton({ count = 6 }: { count?: number }): ReactElement {
  return (
    <div className="space-y-4">
      {Array.from({ length: count }).map((_, i) => (
        <FeedCardSkeleton key={i} />
      ))}
    </div>
  );
}

export function ArticleSkeleton(): ReactElement {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8 space-y-6">
      {/* Title */}
      <div className="space-y-3">
        <div className="h-8 bg-muted/20 rounded shimmer" />
        <div className="h-8 w-3/4 bg-muted/20 rounded shimmer" />
      </div>

      {/* Meta */}
      <div className="flex gap-4">
        <div className="h-5 w-32 bg-muted/20 rounded shimmer" />
        <div className="h-5 w-24 bg-muted/20 rounded shimmer" />
      </div>

      {/* Hero Image */}
      <div className="w-full h-96 bg-muted/20 rounded-xl shimmer" />

      {/* Content */}
      <div className="space-y-4">
        {Array.from({ length: 8 }).map((_, i) => (
          <div key={i} className="space-y-2">
            <div className="h-4 bg-muted/20 rounded shimmer" />
            <div className="h-4 bg-muted/20 rounded shimmer" />
            <div className="h-4 w-5/6 bg-muted/20 rounded shimmer" />
          </div>
        ))}
      </div>
    </div>
  );
}
