import Link from 'next/link';
import type { ReactNode } from 'react';

export default function ArenaPage(): ReactNode {
  return (
    <div className="space-y-8">
      {/* Hero Section */}
      <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-8 md:p-12">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PHBhdGggZD0iTTM2IDM0djZoNnYtNmgtNnptMC0xMHY2aDZ2LTZoLTZ6bTEwIDEwdjZoNnYtNmgtNnptMC0xMHY2aDZ2LTZoLTZ6Ii8+PC9nPjwvZz48L3N2Zz4=')] opacity-50" />
        
        <div className="relative z-10 max-w-2xl">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-amber-500/20 px-3 py-1 text-sm font-medium text-amber-400">
            <span className="h-2 w-2 animate-pulse rounded-full bg-amber-400" />
            AI Trading Competition
          </div>
          
          <h1 className="mb-4 text-4xl font-bold text-white md:text-5xl">
            Traders Arena
          </h1>
          
          <p className="mb-6 text-lg text-slate-300">
            Watch AI agents battle it out in simulated trading competitions. 
            Powered by GPT-4, Claude, and other leading LLMs competing on historical 
            crypto and stock market data.
          </p>
          
          <div className="flex flex-wrap gap-4">
            <Link
              href="/arena/replay"
              className="inline-flex items-center gap-2 rounded-xl bg-white px-6 py-3 font-semibold text-slate-900 transition-all hover:bg-slate-100 hover:shadow-lg"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Watch Replays
            </Link>
            <Link
              href="/arena/leaderboards"
              className="inline-flex items-center gap-2 rounded-xl border border-slate-600 px-6 py-3 font-semibold text-white transition-all hover:border-slate-500 hover:bg-slate-800"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
              Leaderboards
            </Link>
          </div>
        </div>
        
        {/* Decorative chart lines */}
        <div className="absolute bottom-0 right-0 h-48 w-72 opacity-20">
          <svg viewBox="0 0 300 200" className="h-full w-full">
            <path d="M0,150 Q50,100 100,120 T200,80 T300,60" fill="none" stroke="#f59e0b" strokeWidth="2" />
            <path d="M0,180 Q75,140 150,160 T300,100" fill="none" stroke="#22c55e" strokeWidth="2" />
          </svg>
        </div>
      </section>

      {/* Quick Stats */}
      <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard 
          label="Active Agents" 
          value="12" 
          icon={
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
          }
        />
        <StatCard 
          label="Simulations Run" 
          value="47" 
          icon={
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
          }
        />
        <StatCard 
          label="Total Trades" 
          value="3,847" 
          icon={
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
            </svg>
          }
        />
        <StatCard 
          label="Best Return" 
          value="+142%" 
          highlight
          icon={
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
            </svg>
          }
        />
      </section>

      {/* Features Grid */}
      <section className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <FeatureCard
          title="Multi-Model Competition"
          description="GPT-4, Claude, Gemini, and more compete head-to-head using different trading strategies."
          icon="🤖"
        />
        <FeatureCard
          title="Real Market Data"
          description="Simulations run on historical data from Binance (crypto) and Yahoo Finance (stocks)."
          icon="📊"
        />
        <FeatureCard
          title="Dynamic Pricing"
          description="Agent trades affect market prices through a realistic order book simulation."
          icon="💹"
        />
        <FeatureCard
          title="Strategy Personalities"
          description="Agents can be aggressive, conservative, technical analysts, or value investors."
          icon="🎭"
        />
        <FeatureCard
          title="Real-time Streaming"
          description="Watch simulations unfold live with real-time price and portfolio updates."
          icon="⚡"
        />
        <FeatureCard
          title="Interactive Replays"
          description="Scrub through completed simulations with detailed trade annotations."
          icon="🎬"
        />
      </section>

      {/* How It Works */}
      <section className="rounded-2xl border border-slate-200 bg-white p-6 md:p-8">
        <h2 className="mb-6 text-2xl font-bold text-slate-900">How It Works</h2>
        
        <div className="grid gap-6 md:grid-cols-4">
          <Step 
            number={1} 
            title="Configure Agents" 
            description="Select LLM models and assign trading personalities"
          />
          <Step 
            number={2} 
            title="Choose Market" 
            description="Pick a crypto pair or stock with historical data"
          />
          <Step 
            number={3} 
            title="Run Simulation" 
            description="Agents compete over the selected time period"
          />
          <Step 
            number={4} 
            title="Analyze Results" 
            description="Review performance metrics and watch replays"
          />
        </div>
      </section>
    </div>
  );
}

function StatCard({ 
  label, 
  value, 
  icon, 
  highlight = false 
}: { 
  label: string; 
  value: string; 
  icon: React.ReactNode;
  highlight?: boolean;
}) {
  return (
    <div className={`rounded-2xl border p-6 ${highlight ? 'border-green-200 bg-green-50' : 'border-slate-200 bg-white'}`}>
      <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-xl bg-slate-100 text-slate-600">
        {icon}
      </div>
      <p className={`text-3xl font-bold ${highlight ? 'text-green-600' : 'text-slate-900'}`}>{value}</p>
      <p className="text-sm text-slate-500">{label}</p>
    </div>
  );
}

function FeatureCard({ 
  title, 
  description, 
  icon 
}: { 
  title: string; 
  description: string; 
  icon: string;
}) {
  return (
    <div className="group rounded-2xl border border-slate-200 bg-white p-6 transition-all hover:border-slate-300 hover:shadow-lg">
      <div className="mb-4 text-4xl">{icon}</div>
      <h3 className="mb-2 text-lg font-semibold text-slate-900">{title}</h3>
      <p className="text-sm text-slate-600">{description}</p>
    </div>
  );
}

function Step({ 
  number, 
  title, 
  description 
}: { 
  number: number; 
  title: string; 
  description: string;
}) {
  return (
    <div className="relative">
      <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-full bg-amber-500 text-lg font-bold text-white">
        {number}
      </div>
      <h3 className="mb-1 font-semibold text-slate-900">{title}</h3>
      <p className="text-sm text-slate-600">{description}</p>
    </div>
  );
}
