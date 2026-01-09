'use client';

import { JSX, useState } from 'react';

// Mock leaderboard data
const mockLeaderboard = [
  { 
    agentId: '1', 
    agentName: 'GPT-4 Value', 
    model: 'openai/gpt-4o',
    totalWins: 8, 
    totalSimulations: 12, 
    avgPnlPercent: 18.4, 
    avgSharpe: 1.82,
    bestPnl: 2341.00,
    worstPnl: -456.90,
  },
  { 
    agentId: '2', 
    agentName: 'Claude Conservative', 
    model: 'anthropic/claude-3.5-sonnet',
    totalWins: 6, 
    totalSimulations: 15, 
    avgPnlPercent: 12.7, 
    avgSharpe: 2.15,
    bestPnl: 1890.50,
    worstPnl: -234.80,
  },
  { 
    agentId: '3', 
    agentName: 'Gemini Technical', 
    model: 'google/gemini-1.5-pro',
    totalWins: 5, 
    totalSimulations: 14, 
    avgPnlPercent: 9.8, 
    avgSharpe: 1.45,
    bestPnl: 1567.20,
    worstPnl: -678.30,
  },
  { 
    agentId: '4', 
    agentName: 'GPT-4 Aggressive', 
    model: 'openai/gpt-4o',
    totalWins: 4, 
    totalSimulations: 10, 
    avgPnlPercent: 8.2, 
    avgSharpe: 0.98,
    bestPnl: 2100.00,
    worstPnl: -890.50,
  },
  { 
    agentId: '5', 
    agentName: 'Llama Momentum', 
    model: 'meta-llama/llama-3.1-70b',
    totalWins: 3, 
    totalSimulations: 8, 
    avgPnlPercent: 6.5, 
    avgSharpe: 1.12,
    bestPnl: 978.40,
    worstPnl: -345.20,
  },
  { 
    agentId: '6', 
    agentName: 'Mistral Balanced', 
    model: 'mistralai/mistral-large',
    totalWins: 2, 
    totalSimulations: 7, 
    avgPnlPercent: 4.3, 
    avgSharpe: 1.05,
    bestPnl: 756.80,
    worstPnl: -567.90,
  },
];

type SortField = 'avgPnlPercent' | 'avgSharpe' | 'totalWins' | 'bestPnl';

export default function LeaderboardsPage(): JSX.Element {
  const [sortBy, setSortBy] = useState<SortField>('avgPnlPercent');
  const [timeFilter, setTimeFilter] = useState<'all' | 'month' | 'week'>('all');

  const sortedLeaderboard = [...mockLeaderboard].sort((a, b) => b[sortBy] - a[sortBy]);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-slate-900">Leaderboards</h1>
        <p className="text-slate-600">Top performing AI trading agents</p>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex gap-2">
          {(['all', 'month', 'week'] as const).map((filter) => (
            <button
              key={filter}
              onClick={() => setTimeFilter(filter)}
              className={`rounded-lg px-4 py-2 text-sm font-medium transition-colors ${
                timeFilter === filter
                  ? 'bg-slate-900 text-white'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {filter === 'all' ? 'All Time' : filter === 'month' ? 'This Month' : 'This Week'}
            </button>
          ))}
        </div>
        
        <div className="flex items-center gap-2">
          <span className="text-sm text-slate-500">Sort by:</span>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as SortField)}
            className="rounded-lg border border-slate-200 px-3 py-2 text-sm"
          >
            <option value="avgPnlPercent">Avg Return %</option>
            <option value="avgSharpe">Sharpe Ratio</option>
            <option value="totalWins">Total Wins</option>
            <option value="bestPnl">Best P&L</option>
          </select>
        </div>
      </div>

      {/* Top 3 Podium */}
      <div className="grid gap-4 md:grid-cols-3">
        {sortedLeaderboard.slice(0, 3).map((agent, index) => (
          <div
            key={agent.agentId}
            className={`relative overflow-hidden rounded-2xl p-6 ${
              index === 0
                ? 'bg-gradient-to-br from-amber-400 to-amber-600 text-white'
                : index === 1
                ? 'bg-gradient-to-br from-slate-300 to-slate-400 text-slate-900'
                : 'bg-gradient-to-br from-amber-700 to-amber-800 text-white'
            }`}
          >
            <div className="absolute right-4 top-4 text-6xl font-bold opacity-20">
              #{index + 1}
            </div>
            
            <div className="relative z-10">
              <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-white/20 px-3 py-1">
                <span className="text-2xl">
                  {index === 0 ? '🥇' : index === 1 ? '🥈' : '🥉'}
                </span>
                <span className="text-sm font-medium">Rank #{index + 1}</span>
              </div>
              
              <h3 className="mb-1 text-xl font-bold">{agent.agentName}</h3>
              <p className="mb-4 text-sm opacity-80">{agent.model}</p>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-2xl font-bold">+{agent.avgPnlPercent.toFixed(1)}%</p>
                  <p className="text-xs opacity-80">Avg Return</p>
                </div>
                <div>
                  <p className="text-2xl font-bold">{agent.avgSharpe.toFixed(2)}</p>
                  <p className="text-xs opacity-80">Sharpe Ratio</p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Full Table */}
      <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white">
        <table className="w-full">
          <thead>
            <tr className="border-b border-slate-200 bg-slate-50">
              <th className="px-6 py-4 text-left text-sm font-semibold text-slate-900">Rank</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-slate-900">Agent</th>
              <th className="px-6 py-4 text-right text-sm font-semibold text-slate-900">Win Rate</th>
              <th className="px-6 py-4 text-right text-sm font-semibold text-slate-900">Avg Return</th>
              <th className="px-6 py-4 text-right text-sm font-semibold text-slate-900">Sharpe</th>
              <th className="px-6 py-4 text-right text-sm font-semibold text-slate-900">Best P&L</th>
              <th className="px-6 py-4 text-right text-sm font-semibold text-slate-900">Worst P&L</th>
            </tr>
          </thead>
          <tbody>
            {sortedLeaderboard.map((agent, index) => (
              <tr 
                key={agent.agentId} 
                className="border-b border-slate-100 transition-colors hover:bg-slate-50"
              >
                <td className="px-6 py-4">
                  <span className={`inline-flex h-8 w-8 items-center justify-center rounded-full text-sm font-bold ${
                    index === 0 ? 'bg-amber-100 text-amber-700' :
                    index === 1 ? 'bg-slate-200 text-slate-700' :
                    index === 2 ? 'bg-amber-50 text-amber-800' :
                    'bg-slate-100 text-slate-600'
                  }`}>
                    {index + 1}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <div>
                    <p className="font-semibold text-slate-900">{agent.agentName}</p>
                    <p className="text-sm text-slate-500">{agent.model}</p>
                  </div>
                </td>
                <td className="px-6 py-4 text-right">
                  <span className="font-medium text-slate-900">
                    {((agent.totalWins / agent.totalSimulations) * 100).toFixed(0)}%
                  </span>
                  <span className="ml-1 text-sm text-slate-500">
                    ({agent.totalWins}/{agent.totalSimulations})
                  </span>
                </td>
                <td className="px-6 py-4 text-right">
                  <span className="font-semibold text-green-600">+{agent.avgPnlPercent.toFixed(1)}%</span>
                </td>
                <td className="px-6 py-4 text-right font-medium text-slate-900">
                  {agent.avgSharpe.toFixed(2)}
                </td>
                <td className="px-6 py-4 text-right font-medium text-green-600">
                  +${agent.bestPnl.toFixed(2)}
                </td>
                <td className="px-6 py-4 text-right font-medium text-red-600">
                  -${Math.abs(agent.worstPnl).toFixed(2)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
