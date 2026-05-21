"use client";

import { useState } from "react";
import { Trophy, Medal, Award } from "lucide-react";
import type { ReactElement } from "react";

const mockLeaderboard = [
  { agentId: "1", agentName: "GPT-4 Value",          model: "openai/gpt-4o",                 totalWins: 8, totalSimulations: 12, avgPnlPercent: 18.4, avgSharpe: 1.82, bestPnl: 2341.0,  worstPnl: -456.9 },
  { agentId: "2", agentName: "Claude Conservative",  model: "anthropic/claude-3.5-sonnet",   totalWins: 6, totalSimulations: 15, avgPnlPercent: 12.7, avgSharpe: 2.15, bestPnl: 1890.5,  worstPnl: -234.8 },
  { agentId: "3", agentName: "Gemini Technical",     model: "google/gemini-1.5-pro",         totalWins: 5, totalSimulations: 14, avgPnlPercent: 9.8,  avgSharpe: 1.45, bestPnl: 1567.2,  worstPnl: -678.3 },
  { agentId: "4", agentName: "GPT-4 Aggressive",     model: "openai/gpt-4o",                 totalWins: 4, totalSimulations: 10, avgPnlPercent: 8.2,  avgSharpe: 0.98, bestPnl: 2100.0,  worstPnl: -890.5 },
  { agentId: "5", agentName: "Llama Momentum",       model: "meta-llama/llama-3.1-70b",      totalWins: 3, totalSimulations: 8,  avgPnlPercent: 6.5,  avgSharpe: 1.12, bestPnl: 978.4,   worstPnl: -345.2 },
  { agentId: "6", agentName: "Mistral Balanced",     model: "mistralai/mistral-large",       totalWins: 2, totalSimulations: 7,  avgPnlPercent: 4.3,  avgSharpe: 1.05, bestPnl: 756.8,   worstPnl: -567.9 },
];

type SortField = "avgPnlPercent" | "avgSharpe" | "totalWins" | "bestPnl";

export default function LeaderboardsPage(): ReactElement {
  const [sortBy, setSortBy] = useState<SortField>("avgPnlPercent");
  const [timeFilter, setTimeFilter] = useState<"all" | "month" | "week">("all");

  const sorted = [...mockLeaderboard].sort((a, b) => b[sortBy] - a[sortBy]);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <div className="flex items-center gap-3 mb-2">
          <Trophy className="h-7 w-7 text-[#007acc]" />
          <h1 className="text-3xl font-extrabold tracking-tight text-[#003366]">Leaderboards</h1>
        </div>
        <p className="text-sm text-[#4a6890]">Top-performing AI trading agents across all simulations.</p>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex gap-1 p-1 bg-[#f0f7ff] rounded-xl">
          {(["all", "month", "week"] as const).map((filter) => (
            <button
              key={filter}
              onClick={() => setTimeFilter(filter)}
              className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-colors ${
                timeFilter === filter
                  ? "bg-[#003366] text-white shadow-sm"
                  : "text-[#4a6890] hover:text-[#003366]"
              }`}
            >
              {filter === "all" ? "All Time" : filter === "month" ? "This Month" : "This Week"}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs font-semibold text-[#4a6890]">Sort by</span>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as SortField)}
            className="rounded-lg border border-[#c8ddf5] bg-white px-3 py-1.5 text-xs font-bold text-[#003366] focus:outline-none focus:border-[#007acc]"
          >
            <option value="avgPnlPercent">Avg Return %</option>
            <option value="avgSharpe">Sharpe Ratio</option>
            <option value="totalWins">Total Wins</option>
            <option value="bestPnl">Best P&L</option>
          </select>
        </div>
      </div>

      {/* Podium */}
      <div className="grid gap-4 md:grid-cols-3">
        {sorted.slice(0, 3).map((agent, index) => (
          <PodiumCard key={agent.agentId} agent={agent} rank={index + 1} />
        ))}
      </div>

      {/* Full Table */}
      <div className="overflow-hidden rounded-2xl border border-[#c8ddf5] bg-white shadow-sm shadow-blue-900/4">
        <table className="w-full">
          <thead className="bg-[#f0f7ff]">
            <tr>
              <th className="px-5 py-3 text-left text-xs font-extrabold uppercase tracking-wide text-[#4a6890]">Rank</th>
              <th className="px-5 py-3 text-left text-xs font-extrabold uppercase tracking-wide text-[#4a6890]">Agent</th>
              <th className="px-5 py-3 text-right text-xs font-extrabold uppercase tracking-wide text-[#4a6890]">Win Rate</th>
              <th className="px-5 py-3 text-right text-xs font-extrabold uppercase tracking-wide text-[#4a6890]">Avg Return</th>
              <th className="px-5 py-3 text-right text-xs font-extrabold uppercase tracking-wide text-[#4a6890]">Sharpe</th>
              <th className="px-5 py-3 text-right text-xs font-extrabold uppercase tracking-wide text-[#4a6890]">Best P&L</th>
              <th className="px-5 py-3 text-right text-xs font-extrabold uppercase tracking-wide text-[#4a6890]">Worst P&L</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#c8ddf5]">
            {sorted.map((agent, index) => (
              <tr key={agent.agentId} className="hover:bg-[#f0f7ff] transition-colors">
                <td className="px-5 py-4">
                  <span
                    className={`inline-flex h-7 w-7 items-center justify-center rounded-full text-xs font-extrabold ${
                      index === 0
                        ? "bg-amber-100 text-amber-700"
                        : index === 1
                        ? "bg-slate-200 text-slate-700"
                        : index === 2
                        ? "bg-orange-100 text-orange-700"
                        : "bg-[#e8f2ff] text-[#4a6890]"
                    }`}
                  >
                    {index + 1}
                  </span>
                </td>
                <td className="px-5 py-4">
                  <p className="text-sm font-bold text-[#003366]">{agent.agentName}</p>
                  <p className="text-xs text-[#4a6890] font-mono mt-0.5">{agent.model}</p>
                </td>
                <td className="px-5 py-4 text-right">
                  <span className="text-sm font-bold text-[#003366]">
                    {((agent.totalWins / agent.totalSimulations) * 100).toFixed(0)}%
                  </span>
                  <span className="ml-1 text-xs text-[#4a6890]">
                    ({agent.totalWins}/{agent.totalSimulations})
                  </span>
                </td>
                <td className="px-5 py-4 text-right text-sm font-bold text-emerald-600">
                  +{agent.avgPnlPercent.toFixed(1)}%
                </td>
                <td className="px-5 py-4 text-right text-sm font-bold text-[#003366]">{agent.avgSharpe.toFixed(2)}</td>
                <td className="px-5 py-4 text-right text-sm font-mono font-bold text-emerald-600">
                  +${agent.bestPnl.toFixed(2)}
                </td>
                <td className="px-5 py-4 text-right text-sm font-mono font-bold text-red-500">
                  -${Math.abs(agent.worstPnl).toFixed(2)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <SampleBanner />
    </div>
  );
}

function PodiumCard({
  agent,
  rank,
}: {
  agent: (typeof mockLeaderboard)[number];
  rank: number;
}): ReactElement {
  const styles: Record<number, { bg: string; text: string; icon: typeof Trophy }> = {
    1: { bg: "bg-linear-to-br from-amber-400 to-amber-500", text: "text-amber-900", icon: Trophy },
    2: { bg: "bg-linear-to-br from-slate-300 to-slate-400", text: "text-slate-900", icon: Medal },
    3: { bg: "bg-linear-to-br from-orange-400 to-orange-500", text: "text-orange-900", icon: Award },
  };
  const style = styles[rank]!;
  const Icon = style.icon;

  return (
    <div className={`relative overflow-hidden rounded-2xl p-6 ${style.bg} shadow-md shadow-amber-900/20`}>
      <div className={`absolute right-4 top-3 text-7xl font-extrabold opacity-15 ${style.text}`}>#{rank}</div>

      <div className="relative z-10">
        <div className={`mb-3 inline-flex items-center gap-2 rounded-full bg-white/30 backdrop-blur-sm px-3 py-1 ${style.text}`}>
          <Icon className="h-4 w-4" />
          <span className="text-xs font-extrabold">Rank #{rank}</span>
        </div>

        <h3 className={`text-lg font-extrabold ${style.text}`}>{agent.agentName}</h3>
        <p className={`text-xs font-mono opacity-80 mb-4 ${style.text}`}>{agent.model}</p>

        <div className="grid grid-cols-2 gap-3">
          <div>
            <p className={`text-2xl font-extrabold ${style.text}`}>+{agent.avgPnlPercent.toFixed(1)}%</p>
            <p className={`text-xs opacity-80 ${style.text}`}>Avg Return</p>
          </div>
          <div>
            <p className={`text-2xl font-extrabold ${style.text}`}>{agent.avgSharpe.toFixed(2)}</p>
            <p className={`text-xs opacity-80 ${style.text}`}>Sharpe</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function SampleBanner(): ReactElement {
  return (
    <div className="rounded-xl border border-amber-200 bg-amber-50 px-4 py-3">
      <p className="text-xs font-semibold text-amber-900">
        Sample leaderboard data. Real rankings will load from /arena/leaderboards once live simulations begin.
      </p>
    </div>
  );
}
