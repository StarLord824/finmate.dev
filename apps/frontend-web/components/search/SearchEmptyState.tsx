import { Search } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface SearchEmptyStateProps {
  query: string;
  onSuggestionClick?: (suggestion: string) => void;
}

const suggestions = ["Inflation", "Federal Reserve", "Apple", "Bitcoin"];

export function SearchEmptyState({ query, onSuggestionClick }: SearchEmptyStateProps) {
  if (query.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-24 text-center">
        <div className="h-16 w-16 bg-zinc-100 rounded-full flex items-center justify-center mb-6">
          <Search className="h-8 w-8 text-zinc-400" />
        </div>
        <h2 className="text-xl font-semibold text-foreground mb-2">
          Discover what's moving the markets
        </h2>
        <p className="text-muted-foreground mb-8 max-w-sm">
          Search for articles, topics, companies, or specific news sources.
        </p>
        
        <div className="flex flex-wrap justify-center gap-2">
          {suggestions.map((suggestion) => (
            <Badge 
              key={suggestion} 
              variant="secondary"
              className="cursor-pointer bg-zinc-100 text-zinc-700 hover:bg-zinc-200 hover:text-zinc-900 transition-colors py-1.5 px-3"
              onClick={() => onSuggestionClick?.(suggestion)}
            >
              {suggestion}
            </Badge>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center py-24 text-center">
      <div className="h-16 w-16 bg-zinc-50 rounded-full flex items-center justify-center mb-6 border border-zinc-100">
        <Search className="h-8 w-8 text-zinc-300" />
      </div>
      <h2 className="text-xl font-semibold text-foreground mb-2">
        No results for &quot;{query}&quot;
      </h2>
      <p className="text-muted-foreground max-w-sm">
        We couldn't find anything matching your search. Try adjusting your keywords or using a broader search term.
      </p>
    </div>
  );
}
