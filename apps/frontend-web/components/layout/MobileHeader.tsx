"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Menu,
  Search,
  Home,
  Bookmark,
  Clock,
  Swords,
  Settings,
  TrendingUp,
} from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetTitle,
  SheetDescription,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import type { ReactElement } from "react";

const navItems = [
  { label: "Feed", href: "/feed", icon: Home },
  { label: "Search", href: "/search", icon: Search },
  { label: "Bookmarks", href: "/bookmarks", icon: Bookmark },
  { label: "History", href: "/history", icon: Clock },
  { label: "Arena", href: "/arena", icon: Swords },
];

export function MobileHeader(): ReactElement {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-30 flex h-14 items-center justify-between border-b border-[#c8ddf5] bg-white px-4 sm:hidden shadow-sm shadow-blue-900/5">
      <Sheet>
        <SheetTrigger
          render={
            <Button variant="ghost" size="icon" className="-ml-2 h-9 w-9 text-[#003366] hover:bg-[#e8f2ff]">
              <Menu className="h-5 w-5" />
              <span className="sr-only">Toggle navigation menu</span>
            </Button>
          }
        />
        <SheetContent side="left" className="w-[280px] p-0 flex flex-col bg-white border-r border-[#c8ddf5]">
          <SheetTitle className="sr-only">Navigation Menu</SheetTitle>
          <SheetDescription className="sr-only">
            Access different pages of FinMate
          </SheetDescription>

          {/* Logo */}
          <div className="flex h-14 items-center border-b border-[#c8ddf5] px-4">
            <Link href="/" className="flex items-center gap-2.5">
              <div className="h-8 w-8 rounded-xl bg-gradient-to-br from-[#003366] to-[#007acc] flex items-center justify-center shrink-0">
                <TrendingUp className="h-4 w-4 text-white" />
              </div>
              <span className="font-extrabold text-xl tracking-tight text-[#003366]">FinMate</span>
            </Link>
          </div>

          {/* Nav items */}
          <nav className="flex-1 space-y-1 p-3">
            {navItems.map((item) => {
              const isActive = pathname === item.href;
              const Icon = item.icon;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-all ${
                    isActive
                      ? "bg-gradient-to-r from-[#003366] to-[#00509e] text-white shadow-md shadow-blue-900/20"
                      : "text-[#4a6890] hover:text-[#003366] hover:bg-[#e8f2ff]"
                  }`}
                >
                  <Icon className={`h-5 w-5 shrink-0 ${isActive ? "text-white" : "text-[#007acc]"}`} />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </nav>

          {/* User */}
          <div className="p-4 border-t border-[#c8ddf5]">
            <div className="flex items-center gap-3">
              <Avatar className="h-9 w-9 border-2 border-[#c8ddf5]">
                <AvatarImage src="" alt="User" />
                <AvatarFallback className="bg-gradient-to-br from-[#003366] to-[#007acc] text-white font-semibold text-sm">
                  U
                </AvatarFallback>
              </Avatar>
              <div className="flex flex-col flex-1 min-w-0">
                <span className="text-sm font-semibold text-[#003366] truncate">User Name</span>
                <Link
                  href="/settings"
                  className="text-xs text-[#4a6890] hover:text-[#007acc] transition-colors flex items-center gap-1 mt-0.5"
                >
                  <Settings className="h-3 w-3" />
                  Settings
                </Link>
              </div>
            </div>
          </div>
        </SheetContent>
      </Sheet>

      {/* Center logo */}
      <Link href="/" className="flex items-center gap-2">
        <TrendingUp className="h-5 w-5 text-[#007acc]" />
        <span className="font-extrabold text-lg tracking-tight text-[#003366]">FinMate</span>
      </Link>

      {/* Search icon */}
      <Link
        href="/search"
        className="flex items-center justify-center h-9 w-9 text-[#4a6890] hover:text-[#007acc] hover:bg-[#e8f2ff] rounded-lg -mr-2 transition-colors"
      >
        <Search className="h-5 w-5" />
        <span className="sr-only">Search</span>
      </Link>
    </header>
  );
}
