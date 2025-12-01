import { FileQuestion, TrendingUp } from "lucide-react";
import Link from "next/link";
import type { ReactElement } from "react";

interface EmptyStateProps {
  title?: string;
  description?: string;
  actionLabel?: string;   
  actionHref?: string;
}

export function EmptyState({
  title = "No articles found",
  description = "Try adjusting your filters or check back later for new content",
  actionLabel = "Reset Filters",
  actionHref = "/",
}: EmptyStateProps): ReactElement {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-4 text-center">
      <div className="relative mb-6">
        <div className="absolute inset-0 bg-accent/20 rounded-full blur-2xl" />
        <div className="relative bg-light-card dark:bg-dark-card rounded-full p-6 border border-light-border dark:border-dark-border">
          <FileQuestion className="h-12 w-12 text-muted" />
        </div>
      </div>

      <h3 className="text-xl font-semibold text-foreground mb-2">{title}</h3>
      <p className="text-muted max-w-md mb-6">{description}</p>

      <Link
        href={actionHref}
        className="px-6 py-2.5 bg-accent text-white rounded-lg hover:bg-accent-dark transition-colors font-medium inline-flex items-center gap-2"
      >
        <TrendingUp className="h-4 w-4" />
        {actionLabel}
      </Link>
    </div>
  );
}
