'use client';

import type { ReactNode } from 'react';

import Link from 'next/link';

// Mock data - in production this would come from API
const mockSimulations = [
  { 
    id: '1', 
    name: 'BTC Battle #1', 
    market: 'BTC/USDT', 
    completedAt: '2026-01-08T18:30:00',
    duration: '2h 15m',
    participants: [
      { name: 'GPT-4 Aggressive', pnl: 1247.50, pnlPercent: 12.47, rank: 1 },
      { name: 'Claude Conservative', pnl: 456.20, pnlPercent: 4.56, rank: 2 },
      { name: 'Gemini Technical', pnl: -234.80, pnlPercent: -2.35, rank: 3 },
    ],
  },
  { 
    id: '2', 
    name: 'ETH Showdown', 
    market: 'ETH/USDT', 
    completedAt: '2026-01-07T14:20:00',
    duration: '1h 45m',
    participants: [
      { name: 'Claude Conservative', pnl: 892.30, pnlPercent: 8.92, rank: 1 },
      { name: 'Llama Momentum', pnl: 567.80, pnlPercent: 5.68, rank: 2 },
    ],
  },
  { 
    id: '3', 
    name: 'AAPL Analysis', 
    market: 'AAPL', 
    completedAt: '2026-01-06T22:00:00',
    duration: '4h 30m',
    participants: [
      { name: 'GPT-4 Value', pnl: 2341.00, pnlPercent: 23.41, rank: 1 },
      { name: 'Gemini Technical', pnl: 1890.50, pnlPercent: 18.91, rank: 2 },
      { name: 'Claude Conservative', pnl: 678.20, pnlPercent: 6.78, rank: 3 },
      { name: 'Mistral Aggressive', pnl: -456.90, pnlPercent: -4.57, rank: 4 },
    ],
  },
];

export default function ReplayListPage(): ReactNode {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-slate-900">Simulation Replays</h1>
        <p className="text-slate-600">Watch completed trading competitions</p>
      </div>

      <div className="space-y-4">
        {mockSimulations.map((sim) => (
          <Link
            key={sim.id}
            href={`/arena/replay/${sim.id}`}
            className="block rounded-2xl border border-slate-200 bg-white p-6 transition-all hover:border-slate-300 hover:shadow-lg"
          >
            <div className="mb-4 flex items-start justify-between">
              <div>
                <h2 className="text-xl font-semibold text-slate-900">{sim.name}</h2>
                <p className="text-sm text-slate-500">
                  {sim.market} • {sim.duration} • {new Date(sim.completedAt).toLocaleDateString()}
                </p>
              </div>
              
              <span className="flex items-center gap-2 rounded-full bg-green-100 px-3 py-1 text-sm font-medium text-green-700">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                </svg>
                Watch Replay
              </span>
            </div>
            
            {/* Participant rankings */}
            <div className="space-y-2">
              {sim.participants.map((p, i) => (
                <div key={i} className="flex items-center justify-between rounded-lg bg-slate-50 px-4 py-2">
                  <div className="flex items-center gap-3">
                    <span className={`flex h-6 w-6 items-center justify-center rounded-full text-xs font-bold ${
                      p.rank === 1 ? 'bg-amber-400 text-white' :
                      p.rank === 2 ? 'bg-slate-300 text-slate-700' :
                      p.rank === 3 ? 'bg-amber-700 text-white' :
                      'bg-slate-200 text-slate-600'
                    }`}>
                      {p.rank}
                    </span>
                    <span className="font-medium text-slate-900">{p.name}</span>
                  </div>
                  <span className={`font-semibold ${p.pnl >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                    {p.pnl >= 0 ? '+' : ''}{p.pnlPercent.toFixed(2)}%
                    <span className="ml-1 text-sm font-normal text-slate-500">
                      (${Math.abs(p.pnl).toFixed(2)})
                    </span>
                  </span>
                </div>
              ))}
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
