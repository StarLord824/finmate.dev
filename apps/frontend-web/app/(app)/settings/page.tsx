"use client";

import { JSX, useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { Header } from "@/components/Header";
import { apiClient } from "@/lib/api-client";
import type { Category } from "@/lib/types";
import { cn } from "@/lib/utils";
import { Save, Moon, Sun, Monitor, Loader2, AlertCircle } from "lucide-react";

import { useTheme } from "next-themes";

export default function SettingsPage(): JSX.Element {
  const [selectedCategories, setSelectedCategories] = useState<Category[]>([]);
  const [selectedSources, setSelectedSources] = useState<string[]>([]);
  const { theme, setTheme } = useTheme();
  const [saved, setSaved] = useState(false);

  // Fetch categories from backend
  const { data: categories = [], isLoading: categoriesLoading } = useQuery({
    queryKey: ["categories"],
    queryFn: () => apiClient.getCategories(),
  });

  // Fetch sources from backend
  const { data: sources = [], isLoading: sourcesLoading } = useQuery({
    queryKey: ["sources"],
    queryFn: () => apiClient.getSources(),
  });

  // Fetch user preferences
  const { data: userPrefs } = useQuery({
    queryKey: ["user-prefs"],
    queryFn: () => apiClient.getUserPreferences(),
  });

  // Sync state with fetching prefs
  if (userPrefs && !saved) {
    // Only update if we haven't just saved (to avoid jitter, though simple effect is better)
     // actually simple effect is better
  }
  
  // Use effect to populate initial state
  useEffect(() => {
    if (userPrefs) {
      if (userPrefs.categories) setSelectedCategories(userPrefs.categories);
      if (userPrefs.sources) setSelectedSources(userPrefs.sources);
      if (userPrefs.theme) setTheme(userPrefs.theme);
    }
  }, [userPrefs]);

  const handleCategoryToggle = (category: Category) => {
    setSelectedCategories((prev) =>
      prev.includes(category)
        ? prev.filter((c) => c !== category)
        : [...prev, category]
    );
  };

  const handleSourceToggle = (source: string) => {
    setSelectedSources((prev) =>
      prev.includes(source) ? prev.filter((s) => s !== source) : [...prev, source]
    );
  };

  const handleSave = async () => {
    try {
      setSaved(false);
      await apiClient.updatePreferences({
        categories: selectedCategories,
        sources: selectedSources,
        // theme is local state but we could save it too if backend supported it
      });
      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    } catch (error) {
      console.error("Failed to save preferences:", error);
      // You might want to add an error state/toast here
    }
  };

  return (
    <div className="min-h-screen bg-light-bg dark:bg-dark-bg">
      <Header />

      <main className="container mx-auto px-4 py-8">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-3xl font-bold text-foreground mb-2">Settings</h1>
          <p className="text-muted mb-8">Customize your FinMate experience</p>

          {/* Appearance Section Removed - Light mode enforced */}
          {/* <section className="bg-light-card dark:bg-dark-card rounded-xl border border-light-border dark:border-dark-border p-6 mb-6">...</section> */}

          {/* Categories */}
          <section className="bg-white rounded-xl border border-border p-6 mb-6">
            <h2 className="text-xl font-semibold text-foreground mb-2">Preferred Categories</h2>
            <p className="text-sm text-slate-500 mb-6">
              Select the topics you&apos;re most interested in
            </p>
            
            {categoriesLoading ? (
              <div className="flex items-center justify-center py-8">
                <Loader2 className="h-6 w-6 animate-spin text-slate-400" />
              </div>
            ) : categories.length === 0 ? (
              <div className="flex items-center gap-2 text-sm text-slate-500 py-4">
                <AlertCircle className="h-4 w-4" />
                <span>No categories available</span>
              </div>
            ) : (
              <div className="flex flex-wrap gap-2">
                {categories.map((category) => {
                  const isSelected = selectedCategories.includes(category);
                  return (
                    <button
                      key={category}
                      onClick={() => handleCategoryToggle(category)}
                      className={cn(
                        "px-4 py-2 rounded-full text-sm font-medium transition-all border",
                        isSelected
                          ? "bg-primary text-white border-primary shadow-sm"
                          : "bg-white text-slate-600 border-slate-200 hover:border-primary/30 hover:bg-slate-50"
                      )}
                    >
                      {category}
                    </button>
                  );
                })}
              </div>
            )}
          </section>

          {/* Sources */}
          <section className="bg-white rounded-xl border border-border p-6 mb-6">
            <h2 className="text-xl font-semibold text-foreground mb-2">Preferred Sources</h2>
            <p className="text-sm text-slate-500 mb-6">
              Choose which news sources you want to see
            </p>
            
            {sourcesLoading ? (
              <div className="flex items-center justify-center py-8">
                <Loader2 className="h-6 w-6 animate-spin text-slate-400" />
              </div>
            ) : sources.length === 0 ? (
              <div className="flex items-center gap-2 text-sm text-slate-500 py-4">
                <AlertCircle className="h-4 w-4" />
                <span>No sources available</span>
              </div>
            ) : (
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {sources.map((source) => {
                  const isSelected = selectedSources.includes(source.name);
                  return (
                    <label
                      key={source.id}
                      className={cn(
                        "flex items-center gap-3 p-3 rounded-lg border cursor-pointer transition-all",
                        isSelected
                          ? "border-primary bg-primary/5 text-primary"
                          : "border-slate-200 hover:border-primary/30"
                      )}
                    >
                      <input
                        type="checkbox"
                        checked={isSelected}
                        onChange={() => handleSourceToggle(source.name)}
                        className="w-4 h-4 rounded border-slate-300 text-primary focus:ring-2 focus:ring-primary/20 cursor-pointer"
                      />
                      <span className="text-sm font-medium">{source.name}</span>
                    </label>
                  );
                })}
              </div>
            )}
          </section>

          {/* Bookmarks */}
          <section className="bg-white rounded-xl border border-border p-6 mb-6">
            <h2 className="text-xl font-semibold text-foreground mb-2">Bookmarks</h2>
            <p className="text-sm text-slate-500 mb-4">
              Your saved articles will appear here
            </p>
            <div className="text-center py-8 text-slate-400">
              <p>No bookmarks yet</p>
              <p className="text-sm mt-2">Start bookmarking articles to read later</p>
            </div>
          </section>

          {/* Save Button */}
          <div className="sticky bottom-4 flex justify-end">
            <button
              onClick={handleSave}
              className={cn(
                "flex items-center gap-2 px-6 py-3 rounded-lg font-medium shadow-lg transition-all",
                saved
                  ? "bg-green-500 text-white"
                  : "bg-accent text-white hover:bg-accent-dark"
              )}
            >
              <Save className="h-5 w-5" />
              {saved ? "Saved!" : "Save Preferences"}
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}
