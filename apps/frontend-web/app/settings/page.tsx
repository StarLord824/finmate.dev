"use client";

import { JSX, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Header } from "@/components/Header";
import { apiClient } from "@/lib/api-client";
import type { Category } from "@/lib/types";
import { cn } from "@/lib/utils";
import { Save, Moon, Sun, Monitor, Loader2, AlertCircle } from "lucide-react";

export default function SettingsPage(): JSX.Element {
  const [selectedCategories, setSelectedCategories] = useState<Category[]>([]);
  const [selectedSources, setSelectedSources] = useState<string[]>([]);
  const [theme, setTheme] = useState<"light" | "dark" | "system">("system");
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
    // Save preferences
    console.log("Saving preferences:", { selectedCategories, selectedSources, theme });
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div className="min-h-screen bg-light-bg dark:bg-dark-bg">
      <Header />

      <main className="container mx-auto px-4 py-8">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-3xl font-bold text-foreground mb-2">Settings</h1>
          <p className="text-muted mb-8">Customize your FinMate experience</p>

          {/* Theme */}
          <section className="bg-light-card dark:bg-dark-card rounded-xl border border-light-border dark:border-dark-border p-6 mb-6">
            <h2 className="text-xl font-semibold text-foreground mb-4">Appearance</h2>
            <div className="grid grid-cols-3 gap-4">
              <button
                onClick={() => setTheme("light")}
                className={cn(
                  "flex flex-col items-center gap-2 p-4 rounded-lg border-2 transition-all",
                  theme === "light"
                    ? "border-accent bg-accent/5"
                    : "border-light-border dark:border-dark-border hover:border-accent/50"
                )}
              >
                <Sun className="h-6 w-6" />
                <span className="font-medium">Light</span>
              </button>

              <button
                onClick={() => setTheme("dark")}
                className={cn(
                  "flex flex-col items-center gap-2 p-4 rounded-lg border-2 transition-all",
                  theme === "dark"
                    ? "border-accent bg-accent/5"
                    : "border-light-border dark:border-dark-border hover:border-accent/50"
                )}
              >
                <Moon className="h-6 w-6" />
                <span className="font-medium">Dark</span>
              </button>

              <button
                onClick={() => setTheme("system")}
                className={cn(
                  "flex flex-col items-center gap-2 p-4 rounded-lg border-2 transition-all",
                  theme === "system"
                    ? "border-accent bg-accent/5"
                    : "border-light-border dark:border-dark-border hover:border-accent/50"
                )}
              >
                <Monitor className="h-6 w-6" />
                <span className="font-medium">System</span>
              </button>
            </div>
          </section>

          {/* Categories */}
          <section className="bg-light-card dark:bg-dark-card rounded-xl border border-light-border dark:border-dark-border p-6 mb-6">
            <h2 className="text-xl font-semibold text-foreground mb-2">Preferred Categories</h2>
            <p className="text-sm text-muted mb-4">
              Select the topics you&apos;re most interested in
            </p>
            
            {categoriesLoading ? (
              <div className="flex items-center justify-center py-8">
                <Loader2 className="h-6 w-6 animate-spin text-muted" />
              </div>
            ) : categories.length === 0 ? (
              <div className="flex items-center gap-2 text-sm text-muted py-4">
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
                        "px-4 py-2 rounded-lg text-sm font-medium transition-all",
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
            )}
          </section>

          {/* Sources */}
          <section className="bg-light-card dark:bg-dark-card rounded-xl border border-light-border dark:border-dark-border p-6 mb-6">
            <h2 className="text-xl font-semibold text-foreground mb-2">Preferred Sources</h2>
            <p className="text-sm text-muted mb-4">
              Choose which news sources you want to see
            </p>
            
            {sourcesLoading ? (
              <div className="flex items-center justify-center py-8">
                <Loader2 className="h-6 w-6 animate-spin text-muted" />
              </div>
            ) : sources.length === 0 ? (
              <div className="flex items-center gap-2 text-sm text-muted py-4">
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
                          ? "border-accent bg-accent/5"
                          : "border-light-border dark:border-dark-border hover:border-accent/50"
                      )}
                    >
                      <input
                        type="checkbox"
                        checked={isSelected}
                        onChange={() => handleSourceToggle(source.name)}
                        className="w-4 h-4 rounded border-muted text-accent focus:ring-2 focus:ring-accent/50 cursor-pointer"
                      />
                      <span className="text-sm font-medium">{source.name}</span>
                    </label>
                  );
                })}
              </div>
            )}
          </section>

          {/* Bookmarks */}
          <section className="bg-light-card dark:bg-dark-card rounded-xl border border-light-border dark:border-dark-border p-6 mb-6">
            <h2 className="text-xl font-semibold text-foreground mb-2">Bookmarks</h2>
            <p className="text-sm text-muted mb-4">
              Your saved articles will appear here
            </p>
            <div className="text-center py-8 text-muted">
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
