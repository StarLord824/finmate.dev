"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  Home,
  Search,
  Bookmark,
  Clock,
  Swords,
  Settings,
  TrendingUp,
  LogOut,
  PanelLeftClose,
  PanelLeftOpen,
  BarChart2,
  Landmark,
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { authClient } from "@/lib/auth-client";
import type { ReactElement } from "react";

const navItems = [
  { label: "Feed",      href: "/feed",      icon: Home      },
  { label: "Markets",   href: "/markets",   icon: BarChart2 },
  { label: "FundLens",  href: "/fundlens",  icon: Landmark  },
  { label: "Search",    href: "/search",    icon: Search    },
  { label: "Bookmarks", href: "/bookmarks", icon: Bookmark  },
  { label: "History",   href: "/history",   icon: Clock     },
  { label: "Arena",     href: "/arena",     icon: Swords    },
];

export function Sidebar(): ReactElement {
  const pathname = usePathname();
  const router = useRouter();
  const { data: session } = authClient.useSession();
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const isExpanded = !isCollapsed || isHovered;

  const handleSignOut = async () => {
    await authClient.signOut();
    router.push("/login");
  };

  const userName = session?.user?.name ?? "User";
  const userEmail = session?.user?.email ?? "";
  const userImage = session?.user?.image ?? "";
  const initials = userName
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);

  return (
    <div
      className={`hidden sm:block shrink-0 transition-all duration-300 z-50 h-screen sticky top-0 ${
        isCollapsed ? "w-20" : "w-64"
      }`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <aside
        className={`fixed top-0 bottom-0 left-0 flex-col border-r border-[#c8ddf5] bg-white transition-all duration-300 flex overflow-y-auto scrollbar-hide ${
          isExpanded ? "w-64 shadow-xl shadow-blue-900/10" : "w-20"
        }`}
      >
        {/* Logo */}
        <div className="flex h-16 items-center px-5 py-4 border-b border-[#c8ddf5] shrink-0 justify-between">
          <Link href="/" className="flex items-center gap-2.5 group overflow-hidden">
            <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-[#003366] to-[#007acc] flex items-center justify-center shrink-0 shadow-md shadow-blue-900/20 group-hover:shadow-blue-700/30 transition-shadow">
              <TrendingUp className="h-5 w-5 text-white" />
            </div>
            {isExpanded && (
              <span className="font-extrabold text-xl tracking-tight text-[#003366] transition-opacity duration-300 whitespace-nowrap">
                FinMate
              </span>
            )}
          </Link>
        </div>

        {/* Toggle button */}
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className={`absolute top-4 right-[-14px] bg-white border border-[#c8ddf5] rounded-full p-1 text-[#007acc] hover:bg-[#e8f2ff] hover:text-[#003366] shadow-sm z-50 transition-transform ${
            isExpanded ? "opacity-100" : "opacity-0"
          }`}
          title={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
        >
          {isCollapsed ? (
            <PanelLeftOpen className="h-4 w-4" />
          ) : (
            <PanelLeftClose className="h-4 w-4" />
          )}
        </button>

        {/* Nav items */}
        <nav className="flex-1 space-y-2 px-3 py-6 overflow-y-auto">
          {navItems.map((item) => {
            const isActive = pathname === item.href || pathname.startsWith(item.href + "/");
            const Icon = item.icon;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 rounded-xl py-3 transition-all duration-200 overflow-hidden ${
                  isExpanded ? "px-3" : "justify-center px-0"
                } ${
                  isActive
                    ? "bg-gradient-to-r from-[#003366] to-[#00509e] text-white shadow-md shadow-blue-900/20"
                    : "text-[#4a6890] hover:text-[#003366] hover:bg-[#e8f2ff]"
                }`}
                title={item.label}
              >
                <Icon
                  className={`h-6 w-6 shrink-0 ${isActive ? "text-white" : "text-[#007acc]"}`}
                />
                {isExpanded && (
                  <span className="font-semibold whitespace-nowrap">{item.label}</span>
                )}
              </Link>
            );
          })}
        </nav>

        {/* User section */}
        <div className="p-3 border-t border-[#c8ddf5] shrink-0 mt-auto">
          <div
            className={`flex items-center rounded-xl transition-all ${
              isExpanded ? "p-2 gap-3" : "justify-center p-0 py-2"
            }`}
          >
            <Avatar className="h-10 w-10 border-2 border-[#c8ddf5] shrink-0">
              <AvatarImage src={userImage} alt={userName} />
              <AvatarFallback className="bg-gradient-to-br from-[#003366] to-[#007acc] text-white font-bold text-sm">
                {initials}
              </AvatarFallback>
            </Avatar>
            {isExpanded && (
              <>
                <div className="flex flex-col flex-1 min-w-0 overflow-hidden">
                  <span className="text-sm font-bold text-[#003366] truncate">{userName}</span>
                  <span className="text-xs text-[#4a6890] font-medium truncate">{userEmail}</span>
                </div>
                <div className="flex flex-col items-center gap-1 shrink-0">
                  <Link
                    href="/settings"
                    className="p-1.5 rounded-lg text-[#4a6890] hover:text-[#003366] hover:bg-[#e8f2ff] transition-colors"
                    title="Settings"
                  >
                    <Settings className="h-4 w-4" />
                  </Link>
                  <button
                    onClick={handleSignOut}
                    className="p-1.5 rounded-lg text-[#4a6890] hover:text-red-600 hover:bg-red-50 transition-colors"
                    title="Sign out"
                  >
                    <LogOut className="h-4 w-4" />
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      </aside>
    </div>
  );
}
