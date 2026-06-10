"use client";

import { useState } from "react";
import Link from "next/link";
import { Plus, Zap, CheckCircle2, Clock, Loader2, Bot, Pencil, Trash2 } from "lucide-react";
import type { ReactElement } from "react";

const mockAgents = [
  { id: "1", name: "GPT-4 Aggressive",    model: "openai/gpt-4o",               personality: "aggressive",   isActive: true  },
  { id: "2", name: "Claude Conservative", model: "anthropic/claude-3.5-sonnet", personality: "conservative", isActive: true  },
  { id: "3", name: "Gemini Technical",    model: "google/gemini-1.5-pro",       personality: "technical",    isActive: true  },
];

const mockSimulations = [
  { id: "1", name: "BTC Battle #1",  market: "BTC/USDT", status: "completed", participants: 3, startedAt: "2026-01-08" as string | null },
  { id: "2", name: "ETH Showdown",   market: "ETH/USDT", status: "running",   participants: 2, startedAt: "2026-01-09" as string | null },
  { id: "3", name: "AAPL Analysis",  market: "AAPL",     status: "pending",   participants: 4, startedAt: null as string | null },
];

export default function AdminDashboard(): ReactElement {
  const [activeTab, setActiveTab] = useState<"agents" | "simulations">("simulations");

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight text-[#003366]">Admin Dashboard</h1>
          <p className="text-sm text-[#4a6890]">Manage agents and simulations.</p>
        </div>

        <div className="flex gap-2">
          <Link
            href="/arena/admin/agents/new"
            className="inline-flex items-center gap-1.5 rounded-xl bg-white border border-[#c8ddf5] px-4 py-2 text-xs font-bold text-[#003366] hover:bg-[#e8f2ff] hover:border-[#007acc] transition-colors"
          >
            <Plus className="h-3.5 w-3.5" />
            New Agent
          </Link>
          <Link
            href="/arena/admin/simulations/new"
            className="inline-flex items-center gap-1.5 rounded-xl bg-linear-to-br from-[#003366] to-[#007acc] px-4 py-2 text-xs font-bold text-white shadow-md shadow-blue-900/20 hover:shadow-lg hover:shadow-blue-900/30 transition-shadow"
          >
            <Zap className="h-3.5 w-3.5" />
            New Simulation
          </Link>
        </div>
      </div>

      {/* Tabs */}
      <div className="border-b border-[#c8ddf5]">
        <nav className="-mb-px flex gap-6">
          <TabButton active={activeTab === "simulations"} onClick={() => setActiveTab("simulations")}>
            Simulations
          </TabButton>
          <TabButton active={activeTab === "agents"} onClick={() => setActiveTab("agents")}>
            Agents
          </TabButton>
        </nav>
      </div>

      {/* Simulations Tab */}
      {activeTab === "simulations" && (
        <div className="space-y-3">
          {mockSimulations.map((sim) => (
            <div
              key={sim.id}
              className="flex items-center justify-between rounded-2xl border border-[#c8ddf5] bg-white p-4 shadow-sm shadow-blue-900/4 hover:border-[#007acc] hover:shadow-md hover:shadow-blue-900/10 transition-all"
            >
              <div className="flex items-center gap-4">
                <StatusIcon status={sim.status} />
                <div>
                  <h3 className="text-sm font-extrabold text-[#003366]">{sim.name}</h3>
                  <p className="text-xs text-[#4a6890] mt-0.5">
                    {sim.market} • {sim.participants} agents
                    {sim.startedAt && ` • Started ${sim.startedAt}`}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <StatusPill status={sim.status} />

                {sim.status === "pending" && (
                  <button className="rounded-lg bg-emerald-500 px-3 py-1.5 text-xs font-bold text-white hover:bg-emerald-600 transition-colors">
                    Start
                  </button>
                )}
                {sim.status === "running" && (
                  <button className="rounded-lg bg-red-500 px-3 py-1.5 text-xs font-bold text-white hover:bg-red-600 transition-colors">
                    Stop
                  </button>
                )}
                {sim.status === "completed" && (
                  <Link
                    href={`/arena/replay/${sim.id}`}
                    className="rounded-lg bg-[#e8f2ff] px-3 py-1.5 text-xs font-bold text-[#003366] hover:bg-[#cce0ff] transition-colors"
                  >
                    View Replay
                  </Link>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Agents Tab */}
      {activeTab === "agents" && (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {mockAgents.map((agent) => (
            <div
              key={agent.id}
              className="rounded-2xl border border-[#c8ddf5] bg-white p-5 shadow-sm shadow-blue-900/4 hover:border-[#007acc] hover:shadow-md hover:shadow-blue-900/10 transition-all"
            >
              <div className="mb-4 flex items-start justify-between">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-linear-to-br from-[#003366] to-[#007acc] text-lg font-extrabold text-white shadow-sm shadow-blue-900/20">
                  {agent.name.charAt(0)}
                </div>
                <span
                  className={`rounded-full px-2 py-0.5 text-[10px] font-extrabold uppercase ${
                    agent.isActive ? "bg-emerald-100 text-emerald-700" : "bg-[#e8f2ff] text-[#4a6890]"
                  }`}
                >
                  {agent.isActive ? "Active" : "Inactive"}
                </span>
              </div>

              <h3 className="text-sm font-extrabold text-[#003366]">{agent.name}</h3>
              <p className="text-xs font-mono text-[#4a6890] mt-0.5 mb-3">{agent.model}</p>

              <div className="mb-4">
                <span className="inline-flex items-center gap-1 rounded-full bg-[#e8f2ff] px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wide text-[#00509e]">
                  <Bot className="h-3 w-3" />
                  {agent.personality}
                </span>
              </div>

              <div className="flex gap-2">
                <button className="flex-1 inline-flex items-center justify-center gap-1.5 rounded-lg border border-[#c8ddf5] py-1.5 text-xs font-bold text-[#003366] hover:bg-[#e8f2ff] transition-colors">
                  <Pencil className="h-3 w-3" />
                  Edit
                </button>
                <button
                  className="inline-flex items-center justify-center rounded-lg border border-[#c8ddf5] p-1.5 text-[#4a6890] hover:bg-red-50 hover:border-red-200 hover:text-red-600 transition-colors"
                  aria-label="Delete agent"
                >
                  <Trash2 className="h-3.5 w-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      <div className="rounded-xl border border-amber-200 bg-amber-50 px-4 py-3">
        <p className="text-xs font-semibold text-amber-900">
          Sample admin data. Wires to /arena/agents and /arena/simulations once backend is connected.
        </p>
      </div>
    </div>
  );
}

function TabButton({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}): ReactElement {
  return (
    <button
      onClick={onClick}
      className={`border-b-2 pb-3 text-sm font-bold transition-colors ${
        active ? "border-[#007acc] text-[#003366]" : "border-transparent text-[#4a6890] hover:text-[#003366]"
      }`}
    >
      {children}
    </button>
  );
}

function StatusIcon({ status }: { status: string }): ReactElement {
  if (status === "running") {
    return (
      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#e8f2ff] text-[#007acc]">
        <Loader2 className="h-5 w-5 animate-spin" />
      </div>
    );
  }
  if (status === "completed") {
    return (
      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600">
        <CheckCircle2 className="h-5 w-5" />
      </div>
    );
  }
  return (
    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#e8f2ff] text-[#4a6890]">
      <Clock className="h-5 w-5" />
    </div>
  );
}

function StatusPill({ status }: { status: string }): ReactElement {
  const styles: Record<string, string> = {
    completed: "bg-emerald-100 text-emerald-700",
    running:   "bg-blue-100 text-blue-700",
    pending:   "bg-[#e8f2ff] text-[#4a6890]",
  };
  return (
    <span className={`rounded-full px-3 py-0.5 text-[10px] font-extrabold uppercase tracking-wide ${styles[status] ?? styles.pending}`}>
      {status}
    </span>
  );
}
