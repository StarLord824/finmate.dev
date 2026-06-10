"use client";

import { useState, useEffect, use } from "react";
import Link from "next/link";
import { ArrowLeft, Play, Pause, BarChart3 } from "lucide-react";
import type { ReactElement } from "react";

// Mock replay data
const mockReplayData = {
  simulation: {
    id: "1",
    name: "BTC Battle #1",
    market: "BTC/USDT",
    startDate: "2026-01-08T10:00:00",
    endDate: "2026-01-08T18:30:00",
    initialBalance: 10000,
  },
  participants: [
    { id: "p1", name: "GPT-4 Aggressive",    model: "openai/gpt-4o",               finalPnl:  1247.5, color: "#ef4444" },
    { id: "p2", name: "Claude Conservative", model: "anthropic/claude-3.5-sonnet", finalPnl:   456.2, color: "#007acc" },
    { id: "p3", name: "Gemini Technical",    model: "google/gemini-1.5-pro",       finalPnl:  -234.8, color: "#10b981" },
  ],
  snapshots: Array.from({ length: 100 }, (_, i) => ({
    tick: i,
    timestamp: new Date(Date.now() + i * 60000).toISOString(),
    price: 45000 + Math.sin(i / 10) * 2000 + Math.random() * 500,
    portfolios: {
      p1: { totalValue: 10000 + i * 12.5 + Math.random() * 100 },
      p2: { totalValue: 10000 + i * 4.5  + Math.random() *  50 },
      p3: { totalValue: 10000 - i * 2.3  + Math.random() *  40 },
    },
  })),
  trades: [
    { tick:  5, agentId: "p1", agentName: "GPT-4 Aggressive",    action: "buy",  quantity: 0.5, price: 44800 },
    { tick: 15, agentId: "p2", agentName: "Claude Conservative", action: "buy",  quantity: 0.2, price: 45200 },
    { tick: 25, agentId: "p1", agentName: "GPT-4 Aggressive",    action: "sell", quantity: 0.3, price: 46100 },
    { tick: 40, agentId: "p3", agentName: "Gemini Technical",    action: "buy",  quantity: 0.4, price: 44500 },
    { tick: 55, agentId: "p2", agentName: "Claude Conservative", action: "buy",  quantity: 0.1, price: 45800 },
    { tick: 70, agentId: "p1", agentName: "GPT-4 Aggressive",    action: "buy",  quantity: 0.6, price: 44200 },
    { tick: 85, agentId: "p3", agentName: "Gemini Technical",    action: "sell", quantity: 0.4, price: 43800 },
    { tick: 95, agentId: "p1", agentName: "GPT-4 Aggressive",    action: "sell", quantity: 0.8, price: 47500 },
  ],
};

export default function ReplayPage({ params }: { params: Promise<{ id: string }> }): ReactElement {
  const resolved = use(params);
  void resolved.id;
  const [currentTick, setCurrentTick] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [playbackSpeed, setPlaybackSpeed] = useState(1);

  const data = mockReplayData;
  const totalTicks = data.snapshots.length;
  const currentSnapshot = data.snapshots[currentTick] ?? data.snapshots[0]!;

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

  const visibleTrades = data.trades.filter((t) => t.tick <= currentTick);
  const currentTickTrades = data.trades.filter((t) => t.tick === currentTick);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-end justify-between">
        <div>
          <Link
            href="/arena/replay"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#4a6890] hover:text-[#003366] mb-2 transition-colors"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            Back to Replays
          </Link>
          <h1 className="text-2xl font-extrabold tracking-tight text-[#003366]">{data.simulation.name}</h1>
          <p className="text-sm text-[#4a6890] inline-flex items-center gap-1.5 mt-1">
            <BarChart3 className="h-3.5 w-3.5" />
            {data.simulation.market}
          </p>
        </div>

        <div className="text-right">
          <p className="text-3xl font-extrabold font-mono text-[#003366]">
            ${currentSnapshot?.price.toFixed(2)}
          </p>
          <p className="text-xs text-[#4a6890] font-semibold">Current price</p>
        </div>
      </div>

      {/* Chart Card */}
      <div className="rounded-2xl border border-[#c8ddf5] bg-white p-6 shadow-sm shadow-blue-900/4">
        <div className="mb-4 flex items-center justify-between flex-wrap gap-3">
          <h2 className="text-sm font-extrabold uppercase tracking-wide text-[#003366]">Price Chart</h2>
          <div className="flex flex-wrap items-center gap-4">
            {data.participants.map((p) => (
              <div key={p.id} className="flex items-center gap-2">
                <span className="h-3 w-3 rounded-full" style={{ backgroundColor: p.color }} />
                <span className="text-xs font-semibold text-[#4a6890]">{p.name}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="relative h-64 w-full overflow-hidden rounded-xl bg-[#f0f7ff]">
          <svg viewBox="0 0 1000 300" className="h-full w-full" preserveAspectRatio="none">
            <path
              d={data.snapshots
                .slice(0, currentTick + 1)
                .map((s, i) => {
                  const x = (i / totalTicks) * 1000;
                  const y = 300 - ((s.price - 42000) / (48000 - 42000)) * 280 - 10;
                  return `${i === 0 ? "M" : "L"} ${x} ${y}`;
                })
                .join(" ")}
              fill="none"
              stroke="#003366"
              strokeWidth="2"
            />

            {visibleTrades.map((trade, i) => {
              const snapshot = data.snapshots[trade.tick];
              if (!snapshot) return null;
              const x = (trade.tick / totalTicks) * 1000;
              const y = 300 - ((snapshot.price - 42000) / (48000 - 42000)) * 280 - 10;
              const participant = data.participants.find((p) => p.id === trade.agentId);

              return (
                <g key={i}>
                  <circle cx={x} cy={y} r={trade.action === "buy" ? 6 : 5} fill={participant?.color ?? "#666"} stroke="white" strokeWidth="2" />
                  {trade.action === "buy" ? (
                    <polygon points={`${x},${y - 15} ${x - 5},${y - 8} ${x + 5},${y - 8}`} fill="#10b981" />
                  ) : (
                    <polygon points={`${x},${y + 15} ${x - 5},${y + 8} ${x + 5},${y + 8}`} fill="#ef4444" />
                  )}
                </g>
              );
            })}

            <line
              x1={(currentTick / totalTicks) * 1000}
              y1="0"
              x2={(currentTick / totalTicks) * 1000}
              y2="300"
              stroke="#007acc"
              strokeWidth="2"
              strokeDasharray="5,5"
            />
          </svg>

          {currentTickTrades.length > 0 && (
            <div className="absolute right-4 top-4 rounded-xl bg-white border border-[#c8ddf5] p-3 shadow-md shadow-blue-900/10">
              {currentTickTrades.map((trade, i) => (
                <div key={i} className="flex items-center gap-2 text-xs">
                  <span className={`font-extrabold ${trade.action === "buy" ? "text-emerald-600" : "text-red-500"}`}>
                    {trade.action.toUpperCase()}
                  </span>
                  <span className="text-[#4a6890] font-mono">
                    {trade.quantity} @ ${trade.price.toFixed(2)}
                  </span>
                  <span className="text-[#4a6890]">({trade.agentName})</span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Playback controls */}
        <div className="mt-4 flex items-center gap-4">
          <button
            onClick={() => setIsPlaying(!isPlaying)}
            className="flex h-10 w-10 items-center justify-center rounded-full bg-linear-to-br from-[#003366] to-[#007acc] text-white hover:shadow-md hover:shadow-blue-900/30 transition-shadow"
            aria-label={isPlaying ? "Pause" : "Play"}
          >
            {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4 ml-0.5" />}
          </button>

          <input
            type="range"
            min={0}
            max={totalTicks - 1}
            value={currentTick}
            onChange={(e) => setCurrentTick(Number(e.target.value))}
            className="h-2 flex-1 cursor-pointer appearance-none rounded-full bg-[#e8f2ff] accent-[#007acc]"
          />

          <select
            value={playbackSpeed}
            onChange={(e) => setPlaybackSpeed(Number(e.target.value))}
            className="rounded-lg border border-[#c8ddf5] bg-white px-3 py-1.5 text-xs font-bold text-[#003366] focus:outline-none focus:border-[#007acc]"
          >
            <option value={0.5}>0.5x</option>
            <option value={1}>1x</option>
            <option value={2}>2x</option>
            <option value={5}>5x</option>
          </select>

          <span className="text-xs font-mono font-semibold text-[#4a6890] shrink-0">
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
          const isPos = pnl >= 0;

          return (
            <div
              key={p.id}
              className="rounded-2xl border-2 bg-white p-5 shadow-sm shadow-blue-900/4"
              style={{ borderColor: p.color }}
            >
              <div className="mb-2 flex items-center gap-2">
                <span className="h-3 w-3 rounded-full" style={{ backgroundColor: p.color }} />
                <h3 className="text-sm font-extrabold text-[#003366]">{p.name}</h3>
              </div>
              <p className="text-xs font-mono text-[#4a6890]">{p.model}</p>

              <div className="mt-3 border-t border-[#c8ddf5] pt-3">
                <p className="text-2xl font-extrabold font-mono text-[#003366]">
                  ${portfolio?.totalValue.toFixed(2) ?? "10,000.00"}
                </p>
                <p className={`text-xs font-bold mt-0.5 ${isPos ? "text-emerald-600" : "text-red-500"}`}>
                  {isPos ? "+" : ""}
                  {pnlPercent.toFixed(2)}% ({isPos ? "+" : ""}${pnl.toFixed(2)})
                </p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Trade Log */}
      <div className="rounded-2xl border border-[#c8ddf5] bg-white p-6 shadow-sm shadow-blue-900/4">
        <h2 className="text-sm font-extrabold uppercase tracking-wide text-[#003366] mb-4">Trade History</h2>

        <div className="max-h-64 space-y-2 overflow-y-auto pr-2">
          {visibleTrades
            .slice()
            .reverse()
            .map((trade, i) => (
              <div key={i} className="flex items-center justify-between rounded-xl bg-[#f0f7ff] px-4 py-2.5">
                <div className="flex items-center gap-3">
                  <span
                    className={`rounded-full px-2 py-0.5 text-[10px] font-extrabold ${
                      trade.action === "buy" ? "bg-emerald-100 text-emerald-700" : "bg-red-100 text-red-700"
                    }`}
                  >
                    {trade.action.toUpperCase()}
                  </span>
                  <span className="text-sm font-bold text-[#003366]">{trade.agentName}</span>
                </div>
                <div className="text-right">
                  <p className="text-sm font-mono font-bold text-[#003366]">
                    {trade.quantity} @ ${trade.price.toFixed(2)}
                  </p>
                  <p className="text-xs text-[#4a6890]">Tick {trade.tick}</p>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}
