"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Swords, Settings, Play, Trophy, LayoutDashboard } from "lucide-react";
import type { ReactElement } from "react";

const tabs = [
  { label: "Overview",     href: "/arena",              icon: LayoutDashboard, exact: true },
  { label: "Admin",        href: "/arena/admin",        icon: Settings },
  { label: "Replays",      href: "/arena/replay",       icon: Play },
  { label: "Leaderboards", href: "/arena/leaderboards", icon: Trophy },
];

export default function ArenaLayout({ children }: { children: React.ReactNode }): ReactElement {
  const pathname = usePathname();

  return (
    <div className="min-h-full">
      {/* Sub-nav strip */}
      <div className="sticky top-0 z-30 border-b border-[#c8ddf5] bg-white/95 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex h-14 items-center gap-4">
            <div className="flex items-center gap-2.5">
              <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-[#003366] to-[#007acc] flex items-center justify-center shadow-sm shadow-blue-900/20">
                <Swords className="h-4 w-4 text-white" />
              </div>
              <span className="font-extrabold text-lg text-[#003366]">Arena</span>
            </div>

            <nav className="flex items-center gap-1 ml-4">
              {tabs.map((tab) => {
                const Icon = tab.icon;
                const isActive = tab.exact
                  ? pathname === tab.href
                  : pathname === tab.href || pathname.startsWith(tab.href + "/");
                return (
                  <Link
                    key={tab.href}
                    href={tab.href}
                    className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-colors ${
                      isActive
                        ? "bg-[#003366] text-white"
                        : "text-[#4a6890] hover:text-[#003366] hover:bg-[#e8f2ff]"
                    }`}
                  >
                    <Icon className="h-3.5 w-3.5" />
                    {tab.label}
                  </Link>
                );
              })}
            </nav>
          </div>
        </div>
      </div>

      <main className="max-w-7xl mx-auto px-6 py-8">{children}</main>
    </div>
  );
}
