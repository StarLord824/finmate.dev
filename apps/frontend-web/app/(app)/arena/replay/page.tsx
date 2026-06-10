import Link from "next/link";
import { Play, Trophy, Medal, Award, Clock, BarChart3 } from "lucide-react";
import type { ReactElement } from "react";

const mockSimulations = [
  {
    id: "1",
    name: "BTC Battle #1",
    market: "BTC/USDT",
    completedAt: "2026-01-08T18:30:00",
    duration: "2h 15m",
    participants: [
      { name: "GPT-4 Aggressive",     pnl:  1247.5, pnlPercent:  12.47, rank: 1 },
      { name: "Claude Conservative",  pnl:   456.2, pnlPercent:   4.56, rank: 2 },
      { name: "Gemini Technical",     pnl:  -234.8, pnlPercent:  -2.35, rank: 3 },
    ],
  },
  {
    id: "2",
    name: "ETH Showdown",
    market: "ETH/USDT",
    completedAt: "2026-01-07T14:20:00",
    duration: "1h 45m",
    participants: [
      { name: "Claude Conservative",  pnl:   892.3, pnlPercent:   8.92, rank: 1 },
      { name: "Llama Momentum",       pnl:   567.8, pnlPercent:   5.68, rank: 2 },
    ],
  },
  {
    id: "3",
    name: "AAPL Analysis",
    market: "AAPL",
    completedAt: "2026-01-06T22:00:00",
    duration: "4h 30m",
    participants: [
      { name: "GPT-4 Value",          pnl:  2341.0, pnlPercent:  23.41, rank: 1 },
      { name: "Gemini Technical",     pnl:  1890.5, pnlPercent:  18.91, rank: 2 },
      { name: "Claude Conservative",  pnl:   678.2, pnlPercent:   6.78, rank: 3 },
      { name: "Mistral Aggressive",   pnl:  -456.9, pnlPercent:  -4.57, rank: 4 },
    ],
  },
];

const RANK_ICONS = { 1: Trophy, 2: Medal, 3: Award } as const;
const RANK_STYLES: Record<number, string> = {
  1: "bg-amber-100 text-amber-700",
  2: "bg-slate-200 text-slate-700",
  3: "bg-orange-100 text-orange-700",
};

export default function ReplayListPage(): ReactElement {
  return (
    <div className="space-y-6">
      <div>
        <div className="flex items-center gap-3 mb-2">
          <Play className="h-7 w-7 text-[#007acc]" />
          <h1 className="text-3xl font-extrabold tracking-tight text-[#003366]">Simulation Replays</h1>
        </div>
        <p className="text-sm text-[#4a6890]">Watch completed trading competitions tick by tick.</p>
      </div>

      <div className="space-y-4">
        {mockSimulations.map((sim) => (
          <Link
            key={sim.id}
            href={`/arena/replay/${sim.id}`}
            className="group block rounded-2xl border border-[#c8ddf5] bg-white p-6 shadow-sm shadow-blue-900/4 hover:border-[#007acc] hover:shadow-md hover:shadow-blue-900/10 transition-all"
          >
            <div className="mb-4 flex items-start justify-between gap-4">
              <div>
                <h2 className="text-lg font-extrabold text-[#003366] group-hover:text-[#007acc] transition-colors">
                  {sim.name}
                </h2>
                <div className="flex flex-wrap items-center gap-3 mt-1 text-xs text-[#4a6890]">
                  <span className="inline-flex items-center gap-1">
                    <BarChart3 className="h-3 w-3" />
                    {sim.market}
                  </span>
                  <span>•</span>
                  <span className="inline-flex items-center gap-1">
                    <Clock className="h-3 w-3" />
                    {sim.duration}
                  </span>
                  <span>•</span>
                  <span>{new Date(sim.completedAt).toLocaleDateString()}</span>
                </div>
              </div>

              <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-3 py-1 text-xs font-bold text-emerald-700 shrink-0">
                <Play className="h-3 w-3" />
                Watch Replay
              </span>
            </div>

            <div className="space-y-2">
              {sim.participants.map((p) => {
                const Icon = RANK_ICONS[p.rank as 1 | 2 | 3] ?? null;
                return (
                  <div
                    key={p.name}
                    className="flex items-center justify-between rounded-xl bg-[#f0f7ff] px-4 py-2.5"
                  >
                    <div className="flex items-center gap-3">
                      <span
                        className={`inline-flex h-6 w-6 items-center justify-center rounded-full text-[10px] font-extrabold ${
                          RANK_STYLES[p.rank] ?? "bg-[#e8f2ff] text-[#4a6890]"
                        }`}
                      >
                        {Icon ? <Icon className="h-3 w-3" /> : p.rank}
                      </span>
                      <span className="text-sm font-bold text-[#003366]">{p.name}</span>
                    </div>
                    <span className={`text-sm font-bold ${p.pnl >= 0 ? "text-emerald-600" : "text-red-500"}`}>
                      {p.pnl >= 0 ? "+" : ""}
                      {p.pnlPercent.toFixed(2)}%
                      <span className="ml-1 text-xs font-mono text-[#4a6890] font-normal">
                        (${Math.abs(p.pnl).toFixed(2)})
                      </span>
                    </span>
                  </div>
                );
              })}
            </div>
          </Link>
        ))}
      </div>

      <div className="rounded-xl border border-amber-200 bg-amber-50 px-4 py-3">
        <p className="text-xs font-semibold text-amber-900">
          Sample replays. Real simulations will populate from /arena/simulations once active.
        </p>
      </div>
    </div>
  );
}
