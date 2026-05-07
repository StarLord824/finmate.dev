import { Search } from "lucide-react";
import { ReactElement } from "react";

interface SearchEmptyStateProps {
  query: string;
  onSuggestionClick?: (suggestion: string) => void;
}

const suggestions = ["Inflation", "Federal Reserve", "Apple", "Bitcoin", "S&P 500", "Oil Prices"];

export function SearchEmptyState({ query, onSuggestionClick }: SearchEmptyStateProps): ReactElement {
  if (query.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-24 text-center">
        <div className="h-20 w-20 bg-gradient-to-br from-[#e8f2ff] to-[#cce0ff] rounded-full flex items-center justify-center mb-6 shadow-lg shadow-blue-900/10">
          <Search className="h-9 w-9 text-[#007acc]" />
        </div>
        <h2 className="text-2xl font-bold text-[#003366] mb-2">
          Discover what's moving the markets
        </h2>
        <p className="text-[#4a6890] mb-8 max-w-sm leading-relaxed">
          Search for articles, topics, companies, or specific news sources.
        </p>

        <div className="flex flex-wrap justify-center gap-2">
          {suggestions.map((suggestion) => (
            <button
              key={suggestion}
              className="px-4 py-2 rounded-xl text-sm font-medium bg-white border border-[#c8ddf5] text-[#00509e] hover:bg-[#e8f2ff] hover:border-[#66a3ff] hover:text-[#003366] transition-all shadow-sm shadow-blue-900/4"
              onClick={() => onSuggestionClick?.(suggestion)}
            >
              {suggestion}
            </button>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center py-24 text-center">
      <div className="h-20 w-20 bg-[#f8fafd] border border-[#c8ddf5] rounded-full flex items-center justify-center mb-6">
        <Search className="h-9 w-9 text-[#c8ddf5]" />
      </div>
      <h2 className="text-2xl font-bold text-[#003366] mb-2">
        No results for &quot;{query}&quot;
      </h2>
      <p className="text-[#4a6890] max-w-sm leading-relaxed">
        We couldn&apos;t find anything matching your search. Try adjusting your keywords or using a broader term.
      </p>
    </div>
  );
}
