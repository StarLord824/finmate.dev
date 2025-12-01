"use client";

import { ReactElement, useState } from "react";
// import { motion } from "framer-motion";
import { ChevronDown, Plus } from "lucide-react";
import { cn } from "@/lib/utils";
import { CATEGORIES, type Category } from "@/lib/types";

interface FiltersPanelProps {
  selectedCategories: Category[];
  onCategoryToggle: (category: Category) => void;
  selectedSources: string[];
  onSourceToggle: (source: string) => void;
}

const MOCK_SOURCES = [
  "Bloomberg",
  "Financial Times",
  "WSJ",
  "Reuters",
  "CNBC",
  "MarketWatch",
  "Seeking Alpha",
  "The Motley Fool",
  "Investopedia",
  "CoinDesk",
];

export function FiltersPanel({
  selectedCategories,
  onCategoryToggle,
  selectedSources,
  onSourceToggle,
}: FiltersPanelProps): ReactElement {
  const [showAllSources, setShowAllSources] = useState(false);
  const [watchlistTicker, setWatchlistTicker] = useState("");

  const displayedSources = showAllSources ? MOCK_SOURCES : MOCK_SOURCES.slice(0, 8);

  const handleAddToWatchlist = (e: React.FormEvent) => {
    e.preventDefault();
    if (watchlistTicker.trim()) {
      console.log("Add to watchlist:", watchlistTicker);
      setWatchlistTicker("");
    }
  };

  return (
    <aside className="space-y-6">
      {/* Categories */}
      <div className="bg-light-card dark:bg-dark-card rounded-xl border border-light-border dark:border-dark-border p-4">
        <h3 className="font-semibold text-sm mb-3 text-foreground">Categories</h3>
        <div className="flex flex-wrap gap-2">
          {CATEGORIES.map((category) => {
            const isSelected = selectedCategories.includes(category);
            return (
              <button
                key={category}
                onClick={() => onCategoryToggle(category)}
                className={cn(
                  "px-3 py-1.5 rounded-lg text-sm font-medium transition-all duration-200",
                  isSelected
                    ? "bg-accent text-white shadow-sm"
                    : "bg-light-bg dark:bg-dark-bg text-muted hover:text-accent hover:bg-accent/10 border border-light-border dark:border-dark-border"
                )}
              >
                {category}
              </button>
            );
          })}
        </div>
      </div>

      {/* Sources */}
      <div className="bg-light-card dark:bg-dark-card rounded-xl border border-light-border dark:border-dark-border p-4">
        <h3 className="font-semibold text-sm mb-3 text-foreground">Sources</h3>
        <div className="space-y-2">
          {displayedSources.map((source) => {
            const isSelected = selectedSources.includes(source);
            return (
              <label
                key={source}
                className="flex items-center gap-2 cursor-pointer group"
              >
                <input
                  type="checkbox"
                  checked={isSelected}
                  onChange={() => onSourceToggle(source)}
                  className="w-4 h-4 rounded border-muted text-accent focus:ring-2 focus:ring-accent/50 cursor-pointer"
                />
                <span className="text-sm text-muted group-hover:text-foreground transition-colors">
                  {source}
                </span>
              </label>
            );
          })}
        </div>

        {MOCK_SOURCES.length > 8 && (
          <button
            onClick={() => setShowAllSources(!showAllSources)}
            className="flex items-center gap-1 text-sm text-accent hover:text-accent-dark mt-3 transition-colors"
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
      </div>

      {/* Watchlist */}
      <div className="bg-light-card dark:bg-dark-card rounded-xl border border-light-border dark:border-dark-border p-4">
        <h3 className="font-semibold text-sm mb-3 text-foreground">Watchlist</h3>
        <form onSubmit={handleAddToWatchlist} className="flex gap-2">
          <input
            type="text"
            value={watchlistTicker}
            onChange={(e) => setWatchlistTicker(e.target.value.toUpperCase())}
            placeholder="Add ticker..."
            className="flex-1 px-3 py-2 text-sm rounded-lg border border-light-border dark:border-dark-border bg-light-bg dark:bg-dark-bg focus:outline-none focus:ring-2 focus:ring-accent/50"
          />
          <button
            type="submit"
            className="p-2 bg-accent text-white rounded-lg hover:bg-accent-dark transition-colors"
            aria-label="Add to watchlist"
          >
            <Plus className="h-4 w-4" />
          </button>
        </form>
        <p className="text-xs text-muted mt-2">
          Track your favorite stocks and get relevant news
        </p>
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
      <div className="bg-gradient-to-br from-primary to-accent rounded-xl p-6 text-white">
        <h3 className="font-bold text-lg mb-2">Never miss a beat</h3>
        <p className="text-sm text-white/90 mb-4">
          Get personalized finance news delivered to your inbox
        </p>
        <button className="w-full px-4 py-2 bg-white text-primary rounded-lg font-medium hover:bg-white/90 transition-colors">
          Subscribe Now
        </button>
      </div>
    </aside>
  );
}
