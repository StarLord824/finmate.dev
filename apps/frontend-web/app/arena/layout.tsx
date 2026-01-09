import { ReactNode } from 'react';
import Link from 'next/link';

export default function ArenaLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-slate-50">
      {/* Arena Header */}
      <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/90 backdrop-blur-sm">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <div className="flex items-center gap-6">
              <Link href="/arena" className="flex items-center gap-2">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-amber-500 to-orange-600">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <span className="text-xl font-bold text-slate-900">Traders Arena</span>
              </Link>
              
              <nav className="hidden md:flex items-center gap-4">
                <Link 
                  href="/arena" 
                  className="px-3 py-2 text-sm font-medium text-slate-600 hover:text-slate-900 transition-colors"
                >
                  Overview
                </Link>
                <Link 
                  href="/arena/admin" 
                  className="px-3 py-2 text-sm font-medium text-slate-600 hover:text-slate-900 transition-colors"
                >
                  Admin
                </Link>
                <Link 
                  href="/arena/replay" 
                  className="px-3 py-2 text-sm font-medium text-slate-600 hover:text-slate-900 transition-colors"
                >
                  Replays
                </Link>
                <Link 
                  href="/arena/leaderboards" 
                  className="px-3 py-2 text-sm font-medium text-slate-600 hover:text-slate-900 transition-colors"
                >
                  Leaderboards
                </Link>
              </nav>
            </div>
            
            <Link 
              href="/" 
              className="text-sm text-slate-500 hover:text-slate-700 transition-colors"
            >
              ← Back to FinMate
            </Link>
          </div>
        </div>
      </header>
      
      {/* Main Content */}
      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        {children}
      </main>
    </div>
  );
}
