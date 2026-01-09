"use client";

import { ReactElement, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { ChevronDown, Plus, Loader2, AlertCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import { apiClient } from "@/lib/api-client";
import type { Category } from "@/lib/types";

interface FiltersPanelProps {
  selectedCategories: Category[];
  onCategoryToggle: (category: Category) => void;
  selectedSources: string[];
  onSourceToggle: (source: string) => void;
}

export function FiltersPanel({
  selectedCategories,
  onCategoryToggle,
  selectedSources,
  onSourceToggle,
}: FiltersPanelProps): ReactElement {
  const [showAllSources, setShowAllSources] = useState(false);
  const [watchlistTicker, setWatchlistTicker] = useState("");

  // Fetch categories from backend
  const { data: categories = [], isLoading: categoriesLoading, error: categoriesError } = useQuery({
    queryKey: ["categories"],
    queryFn: () => apiClient.getCategories(),
    staleTime: 1000 * 60 * 5, // Cache for 5 minutes
  });

  // Fetch sources from backend
  const { data: sources = [], isLoading: sourcesLoading, error: sourcesError } = useQuery({
    queryKey: ["sources"],
    queryFn: () => apiClient.getSources(),
    staleTime: 1000 * 60 * 5, // Cache for 5 minutes
  });

  const displayedSources = showAllSources ? sources : sources.slice(0, 8);

  // Fetch user prefs
  const { data: userPrefs, refetch: refetchPrefs } = useQuery({
    queryKey: ["user-prefs"],
    queryFn: () => apiClient.getUserPreferences(),
    // prevent refetching loop if we update it locally
  });

  const handleAddToWatchlist = async (e: React.FormEvent) => {
    e.preventDefault();
    const ticker = watchlistTicker.trim().toUpperCase();
    if (!ticker) return;

    // Optimistic update or just simple API call
    const currentWatchlist = userPrefs?.watchlist || [];
    if (currentWatchlist.includes(ticker)) return;

    const newWatchlist = [...currentWatchlist, ticker];
    
    try {
      await apiClient.updatePreferences({ watchlist: newWatchlist });
      setWatchlistTicker("");
      refetchPrefs();
    } catch (err) {
      console.error("Failed to update watchlist", err);
    }
  };

  return (
    <aside className="space-y-6">
      {/* Categories */}
      <div className="bg-transparent space-y-3">
        <h3 className="font-semibold text-sm mb-3 text-foreground px-1">Categories</h3>
        
        {categoriesLoading ? (
          <div className="flex items-center justify-center py-4">
            <Loader2 className="h-5 w-5 animate-spin text-muted" />
          </div>
        ) : categoriesError ? (
          <div className="flex items-center gap-2 text-sm text-red-600 dark:text-red-400 py-2">
            <AlertCircle className="h-4 w-4" />
            <span>Failed to load categories</span>
          </div>
        ) : categories.length === 0 ? (
          <p className="text-sm text-muted py-2">No categories available</p>
        ) : (
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => {
              const isSelected = selectedCategories.includes(category);
              return (
                <button
                  key={category}
                  onClick={() => onCategoryToggle(category)}
                  className={cn(
                    "px-3 py-1.5 rounded-full text-sm font-medium transition-all duration-200 border",
                    isSelected
                      ? "bg-primary text-white border-primary shadow-sm"
                      : "bg-white text-black border-slate-200 hover:border-slate-300 hover:bg-slate-50"
                  )}
                >
                  {category}
                </button>
              );
            })}
          </div>
        )}
      </div>

      {/* Sources */}
      <div className="bg-transparent space-y-3">
        <h3 className="font-semibold text-sm mb-3 text-foreground px-1">Sources</h3>
        
        {sourcesLoading ? (
          <div className="flex items-center justify-center py-4">
            <Loader2 className="h-5 w-5 animate-spin text-muted" />
          </div>
        ) : sourcesError ? (
          <div className="flex items-center gap-2 text-sm text-red-600 dark:text-red-400 py-2">
            <AlertCircle className="h-4 w-4" />
            <span>Failed to load sources</span>
          </div>
        ) : sources.length === 0 ? (
          <p className="text-sm text-muted py-2">No sources available</p>
        ) : (
          <>
            <div className="space-y-2">
              {displayedSources.map((source) => {
                const isSelected = selectedSources.includes(source.name);
                return (
                  <label
                    key={source.id}
                    className="flex items-center gap-2 cursor-pointer group"
                  >
                    <input
                      type="checkbox"
                      checked={isSelected}
                      onChange={() => onSourceToggle(source.name)}
                      className="w-4 h-4 rounded border-slate-300 text-primary focus:ring-2 focus:ring-primary/20 cursor-pointer"
                    />
                    <span className="text-sm text-muted group-hover:text-foreground transition-colors">
                      {source.name}
                    </span>
                  </label>
                );
              })}
            </div>

            {sources.length > 8 && (
              <button
                onClick={() => setShowAllSources(!showAllSources)}
                className="flex items-center gap-1 text-sm text-slate-500 hover:text-foreground mt-3 transition-colors px-1"
              >
                <span>{showAllSources ? "Show less" : "Show more"}</span>
                <ChevronDown
                  className={cn(
                    "h-4 w-4 transition-transform",
                    showAllSources && "rotate-180"
                  )}
                />
              </button>
            )}
          </>
        )}
      </div>

      {/* Watchlist */}
      <div className="bg-transparent space-y-3">
        <h3 className="font-semibold text-sm mb-3 text-foreground px-1">Watchlist</h3>
        <form onSubmit={handleAddToWatchlist} className="flex gap-2 mb-3">
          <input
            type="text"
            value={watchlistTicker}
            onChange={(e) => setWatchlistTicker(e.target.value.toUpperCase())}
            placeholder="ADD TICKER..."
            className="flex-1 px-3 py-2 text-xs font-semibold rounded-lg border border-slate-200 bg-white focus:outline-none focus:ring-2 focus:ring-primary/10 transition-all placeholder:text-slate-400"
          />
          <button
            type="submit"
            className="p-2 bg-white border border-slate-200 text-slate-600 rounded-lg hover:border-primary hover:text-primary transition-colors"
            aria-label="Add to watchlist"
          >
            <Plus className="h-4 w-4" />
          </button>
        </form>
        
        {/* Render Watchlist Items */}
        {userPrefs?.watchlist && userPrefs.watchlist.length > 0 ? (
           <div className="flex flex-wrap gap-2">
             {userPrefs.watchlist.map((ticker: string) => (
                <span key={ticker} className="px-2 py-1 bg-white text-slate-700 text-xs rounded border border-slate-200 font-semibold shadow-sm">
                  {ticker}
                </span>
             ))}
           </div>
        ) : (
          <p className="text-xs text-slate-500 px-1">
            Track your favorite stocks.
          </p>
        )}
      </div>

      {/* Market Widget */}
      <div className="bg-gradient-to-br from-accent/10 to-accent2/10 rounded-xl border border-accent/20 p-4">
        <h3 className="font-semibold text-sm mb-3 text-foreground">Markets Today</h3>
        <div className="space-y-2">
          {[
            { name: "S&P 500", value: "4,783.45", change: "+0.89%" },
            { name: "Nasdaq", value: "15,011.35", change: "+1.23%" },
            { name: "Dow Jones", value: "37,545.33", change: "+0.45%" },
          ].map((index) => (
            <div key={index.name} className="flex items-center justify-between text-sm">
              <span className="text-muted">{index.name}</span>
              <div className="text-right">
                <div className="font-medium text-foreground">{index.value}</div>
                <div className="text-xs text-accent">{index.change}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* CTA */}
      {/* CTA */}
      <div className="bg-primary rounded-xl p-6 text-white shadow-lg shadow-primary/10">
        <h3 className="font-bold text-lg mb-2">Never miss a beat</h3>
        <p className="text-sm text-white/80 mb-4">
          Get personalized finance news delivered to your inbox
        </p>
        <button className="w-full px-4 py-2 bg-white text-primary rounded-lg font-medium hover:bg-slate-50 transition-colors">
          Subscribe Now
        </button>
      </div>
    </aside>
  );
}
