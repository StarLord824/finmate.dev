"use client";

import { Search, Bookmark, Menu, TrendingUp, LogOut, User as UserIcon } from "lucide-react";
import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";
import { apiClient } from "@/lib/api-client";
import { authClient } from "@/lib/auth-client";
import type { Article } from "@/lib/types";
import type { ReactElement } from "react";

interface HeaderProps {
  onMenuClick?: () => void;
}

export function Header({ onMenuClick }: HeaderProps): ReactElement {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<Article[]>([]);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);
  const userMenuRef = useRef<HTMLDivElement>(null);

  // Get session data
  const { data: session } = authClient.useSession();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsSearchOpen(false);
      }
      if (userMenuRef.current && !userMenuRef.current.contains(event.target as Node)) {
        setShowUserMenu(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    const handleSearch = async () => {
      if (searchQuery.length < 2) {
        setSearchResults([]);
        return;
      }

      try {
        const results = await apiClient.searchArticles(searchQuery);
        setSearchResults(results.articles.slice(0, 5));
      } catch (error) {
        console.error("Search error:", error);
        setSearchResults([]);
      }
    };

    const debounce = setTimeout(handleSearch, 250);
    return () => clearTimeout(debounce);
  }, [searchQuery]);

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.key === "/" && !isSearchOpen) {
        e.preventDefault();
        setIsSearchOpen(true);
      }
      if (e.key === "Escape" && isSearchOpen) {
        setIsSearchOpen(false);
      }
    };

    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  }, [isSearchOpen]);

  const handleSignOut = async () => {
    await authClient.signOut();
    router.push("/");
    router.refresh();
  };

  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full border-b transition-all duration-300",
        isScrolled
          ? "bg-light-card/80 dark:bg-dark-card/80 backdrop-blur-lg shadow-md border-light-border dark:border-dark-border"
          : "bg-light-card dark:bg-dark-card border-light-border dark:border-dark-border"
      )}
    >
      <div className="container mx-auto px-4 h-16 flex items-center justify-between gap-4">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 group">
          <div className="relative">
            <TrendingUp className="h-7 w-7 text-accent transition-transform group-hover:scale-110" />
            <div className="absolute -inset-1 bg-accent/20 rounded-full blur-sm opacity-0 group-hover:opacity-100 transition-opacity" />
          </div>
          <span className="text-xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            FinMate
          </span>
        </Link>

        {/* Search Bar */}
        <div ref={searchRef} className="flex-1 max-w-2xl relative">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted" />
            <input
              type="text"
              placeholder="Search news, tickers, topics..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onFocus={() => setIsSearchOpen(true)}
              className={cn(
                "w-full pl-10 pr-12 py-2 rounded-lg border bg-light-bg dark:bg-dark-bg",
                "border-light-border dark:border-dark-border",
                "focus:outline-none focus:ring-2 focus:ring-accent/50 focus:border-accent",
                "transition-all duration-200",
                "placeholder:text-muted"
              )}
            />
            <kbd className="absolute right-3 top-1/2 -translate-y-1/2 px-2 py-0.5 text-xs font-mono bg-muted/10 border border-muted/20 rounded">
              /
            </kbd>
          </div>

          {/* Search Results Dropdown */}
          <AnimatePresence>
            {isSearchOpen && searchQuery.length >= 2 && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
                className="absolute top-full mt-2 w-full bg-light-card dark:bg-dark-card border border-light-border dark:border-dark-border rounded-lg shadow-lg overflow-hidden"
              >
                {searchResults.length > 0 ? (
                  <div className="py-2">
                    {searchResults.map((article) => (
                      <Link
                        key={article.id}
                        href={`/article/${article.id}`}
                        onClick={() => setIsSearchOpen(false)}
                        className="block px-4 py-3 hover:bg-accent/5 transition-colors"
                      >
                        <p className="font-medium text-sm line-clamp-1">{article.title}</p>
                        <p className="text-xs text-muted mt-1">{article.source}</p>
                      </Link>
                    ))}
                  </div>
                ) : (
                  <div className="px-4 py-8 text-center text-muted text-sm">
                    No results found
                  </div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Right Actions */}
        <div className="flex items-center gap-2">
          {session?.user ? (
            <>
              <Link
                href="/settings"
                className="p-2 rounded-lg hover:bg-accent/10 transition-colors relative group"
                aria-label="Bookmarks"
              >
                <Bookmark className="h-5 w-5 text-muted group-hover:text-accent transition-colors" />
              </Link>

              <button
                onClick={onMenuClick}
                className="lg:hidden p-2 rounded-lg hover:bg-accent/10 transition-colors"
                aria-label="Menu"
              >
                <Menu className="h-5 w-5 text-muted" />
              </button>

              {/* User Menu */}
              <div ref={userMenuRef} className="relative">
                <button
                  onClick={() => setShowUserMenu(!showUserMenu)}
                  className="flex items-center gap-2 p-2 rounded-lg hover:bg-accent/10 transition-colors"
                >
                  {session.user.image ? (
                    <img
                      src={session.user.image}
                      alt={session.user.name || "User"}
                      className="h-8 w-8 rounded-full"
                    />
                  ) : (
                    <div className="h-8 w-8 rounded-full bg-accent/20 flex items-center justify-center">
                      <UserIcon className="h-4 w-4 text-accent" />
                    </div>
                  )}
                  <span className="hidden sm:block text-sm font-medium">
                    {session.user.name || session.user.email}
                  </span>
                </button>

                <AnimatePresence>
                  {showUserMenu && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="absolute right-0 mt-2 w-48 bg-light-card dark:bg-dark-card border border-light-border dark:border-dark-border rounded-lg shadow-lg overflow-hidden"
                    >
                      <Link
                        href="/settings"
                        onClick={() => setShowUserMenu(false)}
                        className="block px-4 py-3 hover:bg-accent/5 transition-colors text-sm"
                      >
                        Settings
                      </Link>
                      <button
                        onClick={handleSignOut}
                        className="w-full text-left px-4 py-3 hover:bg-accent/5 transition-colors text-sm flex items-center gap-2 text-red-600 dark:text-red-400"
                      >
                        <LogOut className="h-4 w-4" />
                        Sign Out
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </>
          ) : (
            <>
              <button
                onClick={onMenuClick}
                className="lg:hidden p-2 rounded-lg hover:bg-accent/10 transition-colors"
                aria-label="Menu"
              >
                <Menu className="h-5 w-5 text-muted" />
              </button>

              <Link
                href="/login"
                className="hidden sm:block px-4 py-2 text-sm font-medium text-muted hover:text-accent transition-colors"
              >
                Sign In
              </Link>

              <Link
                href="/signup"
                className="px-4 py-2 bg-accent text-white rounded-lg hover:bg-accent-dark transition-colors font-medium text-sm"
              >
                Sign Up
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
