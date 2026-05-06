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
  Settings
} from "lucide-react";
import { Sheet, SheetContent, SheetTrigger, SheetTitle, SheetDescription } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const navItems = [
  { label: "Feed", href: "/", icon: Home },
  { label: "Search", href: "/search", icon: Search },
  { label: "Bookmarks", href: "/bookmarks", icon: Bookmark },
  { label: "History", href: "/history", icon: Clock },
  { label: "Arena", href: "/arena", icon: Swords },
];

export function MobileHeader() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-30 flex h-14 items-center justify-between border-b border-border bg-background px-4 sm:hidden">
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="ghost" size="icon" className="-ml-2 h-9 w-9 text-foreground">
            <Menu className="h-5 w-5" />
            <span className="sr-only">Toggle navigation menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="w-[280px] p-0 flex flex-col">
          <SheetTitle className="sr-only">Navigation Menu</SheetTitle>
          <SheetDescription className="sr-only">Access different pages of FinMate</SheetDescription>
          <div className="flex h-14 items-center border-b border-border px-4">
            <Link href="/" className="flex items-center gap-2">
              <div className="h-8 w-8 rounded-lg bg-accent flex items-center justify-center shrink-0">
                <span className="text-accent-foreground font-bold text-lg">F</span>
              </div>
              <span className="font-bold text-xl tracking-tight text-foreground">FinMate</span>
            </Link>
          </div>
          
          <nav className="flex-1 space-y-1 p-3">
            {navItems.map((item) => {
              const isActive = pathname === item.href;
              const Icon = item.icon;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center gap-3 rounded-md px-3 py-2 text-sm transition-colors ${
                    isActive
                      ? "bg-zinc-100 text-zinc-900 font-medium"
                      : "text-zinc-500 hover:text-zinc-900 hover:bg-zinc-50"
                  }`}
                >
                  <Icon className="h-5 w-5 shrink-0" />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </nav>
          
          <div className="p-4 border-t border-border">
            <div className="flex items-center gap-3">
              <Avatar className="h-9 w-9 border border-border">
                <AvatarImage src="" alt="User" />
                <AvatarFallback className="bg-zinc-100 text-zinc-900 font-medium">U</AvatarFallback>
              </Avatar>
              <div className="flex flex-col flex-1 min-w-0">
                <span className="text-sm font-medium text-foreground truncate">User Name</span>
                <Link href="/settings" className="text-xs text-muted-foreground hover:text-foreground transition-colors flex items-center gap-1">
                  <Settings className="h-3 w-3" />
                  Settings
                </Link>
              </div>
            </div>
          </div>
        </SheetContent>
      </Sheet>

      <Link href="/" className="flex items-center">
        <span className="font-bold text-lg tracking-tight text-foreground">FinMate</span>
      </Link>

      <Link href="/search" className="flex items-center justify-center h-9 w-9 text-muted-foreground hover:text-foreground -mr-2">
        <Search className="h-5 w-5" />
        <span className="sr-only">Search</span>
      </Link>
    </header>
  );
}
