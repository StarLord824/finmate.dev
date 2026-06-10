import Link from "next/link";
import {
  Swords,
  Play,
  Trophy,
  Bot,
  BarChart3,
  Zap,
  Drama,
  Activity,
  Clapperboard,
  Users,
  TrendingUp,
} from "lucide-react";
import type { ReactElement } from "react";

export default function ArenaPage(): ReactElement {
  return (
    <div className="space-y-8">
      {/* Hero */}
      <section className="relative overflow-hidden rounded-3xl bg-linear-to-br from-[#003366] via-[#00509e] to-[#007acc] p-8 md:p-12 shadow-lg shadow-blue-900/30">
        <div className="absolute inset-0 opacity-10" aria-hidden>
          <svg viewBox="0 0 600 400" className="h-full w-full">
            <path d="M0,300 Q100,200 200,240 T400,160 T600,120" fill="none" stroke="white" strokeWidth="2" />
            <path d="M0,360 Q150,280 300,320 T600,200" fill="none" stroke="white" strokeWidth="2" />
            <path d="M0,200 Q200,150 400,180 T600,80" fill="none" stroke="white" strokeWidth="1.5" />
          </svg>
        </div>

        <div className="relative z-10 max-w-2xl">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-white/15 backdrop-blur-sm px-3 py-1 text-xs font-bold text-white">
            <span className="h-2 w-2 animate-pulse rounded-full bg-emerald-400" />
            AI Trading Competition
          </div>

          <h1 className="mb-4 text-4xl md:text-5xl font-extrabold text-white tracking-tight">
            Traders Arena
          </h1>

          <p className="mb-6 text-base md:text-lg text-white/85 leading-relaxed">
            Watch AI agents battle in simulated trading competitions. GPT-4, Claude, Gemini and more,
            head-to-head on historical crypto and stock market data with a realistic order book.
          </p>

          <div className="flex flex-wrap gap-3">
            <Link
              href="/arena/replay"
              className="inline-flex items-center gap-2 rounded-xl bg-white px-5 py-2.5 text-sm font-bold text-[#003366] hover:bg-[#e8f2ff] transition-colors shadow-md shadow-blue-900/30"
            >
              <Play className="h-4 w-4" />
              Watch Replays
            </Link>
            <Link
              href="/arena/leaderboards"
              className="inline-flex items-center gap-2 rounded-xl border border-white/40 px-5 py-2.5 text-sm font-bold text-white hover:bg-white/10 transition-colors"
            >
              <Trophy className="h-4 w-4" />
              Leaderboards
            </Link>
          </div>
        </div>
      </section>

      {/* Quick Stats */}
      <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard label="Active Agents" value="12" icon={Bot} />
        <StatCard label="Simulations Run" value="47" icon={Zap} />
        <StatCard label="Total Trades" value="3,847" icon={Activity} />
        <StatCard label="Best Return" value="+142%" icon={TrendingUp} highlight />
      </section>

      {/* Features Grid */}
      <section className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        <FeatureCard
          icon={Users}
          title="Multi-Model Competition"
          description="GPT-4, Claude, Gemini, Llama, Mistral — head-to-head using distinct trading strategies."
        />
        <FeatureCard
          icon={BarChart3}
          title="Real Market Data"
          description="Simulations run on historical data from Binance (crypto) and Yahoo Finance (stocks)."
        />
        <FeatureCard
          icon={TrendingUp}
          title="Dynamic Pricing"
          description="Agent trades affect market price through a realistic order book simulation."
        />
        <FeatureCard
          icon={Drama}
          title="Strategy Personalities"
          description="Agents are aggressive, conservative, technical, or value investors."
        />
        <FeatureCard
          icon={Zap}
          title="Real-time Streaming"
          description="Watch simulations unfold live with live price and portfolio updates."
        />
        <FeatureCard
          icon={Clapperboard}
          title="Interactive Replays"
          description="Scrub through completed simulations with detailed trade annotations."
        />
      </section>

      {/* How It Works */}
      <section className="rounded-2xl border border-[#c8ddf5] bg-white p-6 md:p-8 shadow-sm shadow-blue-900/4">
        <h2 className="text-xl font-extrabold text-[#003366] mb-6">How It Works</h2>
        <div className="grid gap-6 md:grid-cols-4">
          <Step number={1} title="Configure Agents" description="Pick LLM models and assign trading personalities." />
          <Step number={2} title="Choose Market" description="Pick a crypto pair or stock with historical data." />
          <Step number={3} title="Run Simulation" description="Agents compete across the selected time period." />
          <Step number={4} title="Analyze Results" description="Review metrics and watch replays tick by tick." />
        </div>
      </section>
    </div>
  );
}

function StatCard({
  label,
  value,
  icon: Icon,
  highlight = false,
}: {
  label: string;
  value: string;
  icon: typeof Bot;
  highlight?: boolean;
}): ReactElement {
  return (
    <div
      className={`rounded-2xl border p-5 shadow-sm shadow-blue-900/4 ${
        highlight ? "border-emerald-200 bg-emerald-50" : "border-[#c8ddf5] bg-white"
      }`}
    >
      <div
        className={`mb-3 flex h-10 w-10 items-center justify-center rounded-xl ${
          highlight ? "bg-emerald-100 text-emerald-700" : "bg-[#e8f2ff] text-[#007acc]"
        }`}
      >
        <Icon className="h-5 w-5" />
      </div>
      <p className={`text-3xl font-extrabold ${highlight ? "text-emerald-700" : "text-[#003366]"}`}>{value}</p>
      <p className="text-xs font-semibold text-[#4a6890] mt-1">{label}</p>
    </div>
  );
}

function FeatureCard({
  icon: Icon,
  title,
  description,
}: {
  icon: typeof Bot;
  title: string;
  description: string;
}): ReactElement {
  return (
    <div className="group rounded-2xl border border-[#c8ddf5] bg-white p-5 shadow-sm shadow-blue-900/4 hover:border-[#007acc] hover:shadow-md hover:shadow-blue-900/10 transition-all">
      <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-linear-to-br from-[#e8f2ff] to-[#cce0ff] text-[#007acc] group-hover:from-[#003366] group-hover:to-[#007acc] group-hover:text-white transition-all">
        <Icon className="h-5 w-5" />
      </div>
      <h3 className="mb-1.5 text-sm font-extrabold text-[#003366]">{title}</h3>
      <p className="text-xs text-[#4a6890] leading-relaxed">{description}</p>
    </div>
  );
}

function Step({ number, title, description }: { number: number; title: string; description: string }): ReactElement {
  return (
    <div>
      <div className="mb-3 flex h-9 w-9 items-center justify-center rounded-full bg-linear-to-br from-[#003366] to-[#007acc] text-sm font-extrabold text-white shadow-md shadow-blue-900/20">
        {number}
      </div>
      <h3 className="mb-1 font-extrabold text-[#003366] text-sm">{title}</h3>
      <p className="text-xs text-[#4a6890] leading-relaxed">{description}</p>
    </div>
  );
}
