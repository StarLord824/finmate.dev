"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  Home, 
  Search, 
  Bookmark, 
  Clock, 
  Swords, 
  Settings 
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ReactElement } from "react";

const navItems = [
  { label: "Feed", href: "/", icon: Home },
  { label: "Search", href: "/search", icon: Search },
  { label: "Bookmarks", href: "/bookmarks", icon: Bookmark },
  { label: "History", href: "/history", icon: Clock },
  { label: "Arena", href: "/arena", icon: Swords },
];

export function Sidebar(): ReactElement {
  const pathname = usePathname();

  return (
    <aside className="sticky top-0 h-screen w-16 md:w-60 flex-col border-r border-border bg-background hidden sm:flex shrink-0">
      <div className="flex h-16 items-center px-4 md:px-6 py-4">
        <Link href="/" className="flex items-center gap-2">
          <div className="h-8 w-8 rounded-lg bg-accent flex items-center justify-center shrink-0">
            <span className="text-accent-foreground font-bold text-lg">F</span>
          </div>
          <span className="font-bold text-xl hidden md:block tracking-tight text-foreground">
            FinMate
          </span>
        </Link>
      </div>

      <nav className="flex-1 space-y-1 px-3 py-4">
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
              title={item.label}
            >
              <Icon className="h-5 w-5 shrink-0" />
              <span className="hidden md:block">{item.label}</span>
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
          <div className="hidden md:flex flex-col flex-1 min-w-0">
            <span className="text-sm font-medium text-foreground truncate">User Name</span>
            <Link href="/settings" className="text-xs text-muted-foreground hover:text-foreground transition-colors flex items-center gap-1">
              <Settings className="h-3 w-3" />
              Settings
            </Link>
          </div>
        </div>
      </div>
    </aside>
  );
}
