'use client';

import { useState, useEffect, use, JSX } from 'react';
import Link from 'next/link';

// Mock replay data
const mockReplayData = {
  simulation: {
    id: '1',
    name: 'BTC Battle #1',
    market: 'BTC/USDT',
    startDate: '2026-01-08T10:00:00',
    endDate: '2026-01-08T18:30:00',
    initialBalance: 10000,
  },
  participants: [
    { id: 'p1', name: 'GPT-4 Aggressive', model: 'openai/gpt-4o', finalPnl: 1247.50, color: '#ef4444' },
    { id: 'p2', name: 'Claude Conservative', model: 'anthropic/claude-3.5-sonnet', finalPnl: 456.20, color: '#3b82f6' },
    { id: 'p3', name: 'Gemini Technical', model: 'google/gemini-1.5-pro', finalPnl: -234.80, color: '#22c55e' },
  ],
  snapshots: Array.from({ length: 100 }, (_, i) => ({
    tick: i,
    timestamp: new Date(Date.now() + i * 60000).toISOString(),
    price: 45000 + Math.sin(i / 10) * 2000 + Math.random() * 500,
    portfolios: {
      p1: { totalValue: 10000 + (i * 12.5) + Math.random() * 100 },
      p2: { totalValue: 10000 + (i * 4.5) + Math.random() * 50 },
      p3: { totalValue: 10000 - (i * 2.3) + Math.random() * 40 },
    },
  })),
  trades: [
    { tick: 5, agentId: 'p1', agentName: 'GPT-4 Aggressive', action: 'buy', quantity: 0.5, price: 44800 },
    { tick: 15, agentId: 'p2', agentName: 'Claude Conservative', action: 'buy', quantity: 0.2, price: 45200 },
    { tick: 25, agentId: 'p1', agentName: 'GPT-4 Aggressive', action: 'sell', quantity: 0.3, price: 46100 },
    { tick: 40, agentId: 'p3', agentName: 'Gemini Technical', action: 'buy', quantity: 0.4, price: 44500 },
    { tick: 55, agentId: 'p2', agentName: 'Claude Conservative', action: 'buy', quantity: 0.1, price: 45800 },
    { tick: 70, agentId: 'p1', agentName: 'GPT-4 Aggressive', action: 'buy', quantity: 0.6, price: 44200 },
    { tick: 85, agentId: 'p3', agentName: 'Gemini Technical', action: 'sell', quantity: 0.4, price: 43800 },
    { tick: 95, agentId: 'p1', agentName: 'GPT-4 Aggressive', action: 'sell', quantity: 0.8, price: 47500 },
  ],
};

export default function ReplayPage({ params }: { params: Promise<{ id: string }> }): JSX.Element {
  const resolvedParams = use(params);
  const [currentTick, setCurrentTick] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [playbackSpeed, setPlaybackSpeed] = useState(1);

  const data = mockReplayData;
  const totalTicks = data.snapshots.length;
  const currentSnapshot = data.snapshots[currentTick] || data.snapshots[0];

  // Playback timer
  useEffect(() => {
    if (!isPlaying) return;

    const interval = setInterval(() => {
      setCurrentTick((prev) => {
        if (prev >= totalTicks - 1) {
          setIsPlaying(false);
          return prev;
        }
        return prev + 1;
      });
    }, 100 / playbackSpeed);

    return () => clearInterval(interval);
  }, [isPlaying, playbackSpeed, totalTicks]);

  // Get trades up to current tick
  const visibleTrades = data.trades.filter((t) => t.tick <= currentTick);
  const currentTickTrades = data.trades.filter((t) => t.tick === currentTick);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <Link href="/arena/replay" className="mb-2 inline-flex items-center gap-1 text-sm text-slate-500 hover:text-slate-700">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to Replays
          </Link>
          <h1 className="text-2xl font-bold text-slate-900">{data.simulation.name}</h1>
          <p className="text-slate-600">{data.simulation.market}</p>
        </div>
        
        <div className="text-right">
          <p className="text-2xl font-bold text-slate-900">${currentSnapshot?.price?.toFixed(2)}</p>
          <p className="text-sm text-slate-500">Current Price</p>
        </div>
      </div>

      {/* Chart Area */}
      <div className="rounded-2xl border border-slate-200 bg-white p-6">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="font-semibold text-slate-900">Price Chart</h2>
          <div className="flex items-center gap-4">
            {data.participants.map((p) => (
              <div key={p.id} className="flex items-center gap-2">
                <span className="h-3 w-3 rounded-full" style={{ backgroundColor: p.color }} />
                <span className="text-sm text-slate-600">{p.name}</span>
              </div>
            ))}
          </div>
        </div>
        
        {/* Simple SVG chart */}
        <div className="relative h-64 w-full overflow-hidden rounded-lg bg-slate-50">
          <svg viewBox="0 0 1000 300" className="h-full w-full" preserveAspectRatio="none">
            {/* Price line */}
            <path
              d={data.snapshots.slice(0, currentTick + 1).map((s, i) => {
                const x = (i / totalTicks) * 1000;
                const minPrice = 42000;
                const maxPrice = 48000;
                const y = 300 - ((s.price - minPrice) / (maxPrice - minPrice)) * 280 - 10;
                return `${i === 0 ? 'M' : 'L'} ${x} ${y}`;
              }).join(' ')}
              fill="none"
              stroke="#0c4a6e"
              strokeWidth="2"
            />
            
            {/* Trade markers */}
            {visibleTrades.map((trade, i) => {
              const snapshot = data.snapshots[trade.tick];
              if (!snapshot) return null;
              const x = (trade.tick / totalTicks) * 1000;
              const minPrice = 42000;
              const maxPrice = 48000;
              const y = 300 - ((snapshot.price - minPrice) / (maxPrice - minPrice)) * 280 - 10;
              const participant = data.participants.find((p) => p.id === trade.agentId);
              
              return (
                <g key={i}>
                  <circle
                    cx={x}
                    cy={y}
                    r={trade.action === 'buy' ? 6 : 5}
                    fill={participant?.color || '#666'}
                    stroke="white"
                    strokeWidth="2"
                  />
                  {trade.action === 'buy' ? (
                    <polygon
                      points={`${x},${y - 15} ${x - 5},${y - 8} ${x + 5},${y - 8}`}
                      fill="#22c55e"
                    />
                  ) : (
                    <polygon
                      points={`${x},${y + 15} ${x - 5},${y + 8} ${x + 5},${y + 8}`}
                      fill="#ef4444"
                    />
                  )}
                </g>
              );
            })}
            
            {/* Current position line */}
            <line
              x1={(currentTick / totalTicks) * 1000}
              y1="0"
              x2={(currentTick / totalTicks) * 1000}
              y2="300"
              stroke="#f59e0b"
              strokeWidth="2"
              strokeDasharray="5,5"
            />
          </svg>
          
          {/* Current tick trades popup */}
          {currentTickTrades.length > 0 && (
            <div className="absolute right-4 top-4 rounded-lg bg-white p-3 shadow-lg">
              {currentTickTrades.map((trade, i) => (
                <div key={i} className="flex items-center gap-2 text-sm">
                  <span className={`font-medium ${trade.action === 'buy' ? 'text-green-600' : 'text-red-600'}`}>
                    {trade.action.toUpperCase()}
                  </span>
                  <span className="text-slate-600">
                    {trade.quantity} @ ${trade.price.toFixed(2)}
                  </span>
                  <span className="text-slate-400">({trade.agentName})</span>
                </div>
              ))}
            </div>
          )}
        </div>
        
        {/* Playback controls */}
        <div className="mt-4 flex items-center gap-4">
          {/* Play/Pause */}
          <button
            onClick={() => setIsPlaying(!isPlaying)}
            className="flex h-10 w-10 items-center justify-center rounded-full bg-amber-500 text-white hover:bg-amber-600"
          >
            {isPlaying ? (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 9v6m4-6v6m7-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
              </svg>
            )}
          </button>
          
          {/* Timeline slider */}
          <input
            type="range"
            min="0"
            max={totalTicks - 1}
            value={currentTick}
            onChange={(e) => setCurrentTick(Number(e.target.value))}
            className="h-2 flex-1 cursor-pointer appearance-none rounded-full bg-slate-200 accent-amber-500"
          />
          
          {/* Speed control */}
          <select
            value={playbackSpeed}
            onChange={(e) => setPlaybackSpeed(Number(e.target.value))}
            className="rounded-lg border border-slate-200 px-3 py-2 text-sm"
          >
            <option value={0.5}>0.5x</option>
            <option value={1}>1x</option>
            <option value={2}>2x</option>
            <option value={5}>5x</option>
          </select>
          
          {/* Progress */}
          <span className="text-sm text-slate-500">
            {currentTick + 1} / {totalTicks}
          </span>
        </div>
      </div>

      {/* Portfolios */}
      <div className="grid gap-4 md:grid-cols-3">
        {data.participants.map((p) => {
          const portfolio = currentSnapshot?.portfolios[p.id as keyof typeof currentSnapshot.portfolios];
          const pnl = portfolio ? portfolio.totalValue - data.simulation.initialBalance : 0;
          const pnlPercent = (pnl / data.simulation.initialBalance) * 100;
          
          return (
            <div
              key={p.id}
              className="rounded-xl border-2 bg-white p-4"
              style={{ borderColor: p.color }}
            >
              <div className="mb-2 flex items-center gap-2">
                <span className="h-3 w-3 rounded-full" style={{ backgroundColor: p.color }} />
                <h3 className="font-semibold text-slate-900">{p.name}</h3>
              </div>
              <p className="text-sm text-slate-500">{p.model}</p>
              
              <div className="mt-3 border-t border-slate-100 pt-3">
                <p className="text-2xl font-bold text-slate-900">
                  ${portfolio?.totalValue.toFixed(2) || '10,000.00'}
                </p>
                <p className={`text-sm font-medium ${pnl >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                  {pnl >= 0 ? '+' : ''}{pnlPercent.toFixed(2)}% (${pnl >= 0 ? '+' : ''}{pnl.toFixed(2)})
                </p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Trade Log */}
      <div className="rounded-2xl border border-slate-200 bg-white p-6">
        <h2 className="mb-4 font-semibold text-slate-900">Trade History</h2>
        
        <div className="max-h-64 space-y-2 overflow-y-auto">
          {visibleTrades.slice().reverse().map((trade, i) => (
            <div
              key={i}
              className="flex items-center justify-between rounded-lg bg-slate-50 px-4 py-2"
            >
              <div className="flex items-center gap-3">
                <span className={`rounded px-2 py-0.5 text-xs font-semibold ${
                  trade.action === 'buy' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                }`}>
                  {trade.action.toUpperCase()}
                </span>
                <span className="text-sm text-slate-900">{trade.agentName}</span>
              </div>
              <div className="text-right">
                <p className="text-sm font-medium text-slate-900">
                  {trade.quantity} @ ${trade.price.toFixed(2)}
                </p>
                <p className="text-xs text-slate-500">Tick {trade.tick}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
