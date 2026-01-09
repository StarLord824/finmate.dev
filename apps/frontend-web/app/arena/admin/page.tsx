'use client';

import { useState } from 'react';
import Link from 'next/link';

// Mock data - in production this would come from API
const mockAgents = [
  { id: '1', name: 'GPT-4 Aggressive', model: 'openai/gpt-4o', personality: 'aggressive', isActive: true },
  { id: '2', name: 'Claude Conservative', model: 'anthropic/claude-3.5-sonnet', personality: 'conservative', isActive: true },
  { id: '3', name: 'Gemini Technical', model: 'google/gemini-1.5-pro', personality: 'technical', isActive: true },
];

const mockSimulations = [
  { id: '1', name: 'BTC Battle #1', market: 'BTC/USDT', status: 'completed', participants: 3, startedAt: '2026-01-08' },
  { id: '2', name: 'ETH Showdown', market: 'ETH/USDT', status: 'running', participants: 2, startedAt: '2026-01-09' },
  { id: '3', name: 'AAPL Analysis', market: 'AAPL', status: 'pending', participants: 4, startedAt: null },
];

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState<'agents' | 'simulations'>('simulations');

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Admin Dashboard</h1>
          <p className="text-slate-600">Manage agents and simulations</p>
        </div>
        
        <div className="flex gap-3">
          <Link
            href="/arena/admin/agents/new"
            className="inline-flex items-center gap-2 rounded-lg bg-slate-900 px-4 py-2 text-sm font-medium text-white hover:bg-slate-800"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            New Agent
          </Link>
          <Link
            href="/arena/admin/simulations/new"
            className="inline-flex items-center gap-2 rounded-lg bg-amber-500 px-4 py-2 text-sm font-medium text-white hover:bg-amber-600"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
            New Simulation
          </Link>
        </div>
      </div>

      {/* Tabs */}
      <div className="border-b border-slate-200">
        <nav className="-mb-px flex gap-6">
          <button
            onClick={() => setActiveTab('simulations')}
            className={`border-b-2 pb-4 text-sm font-medium transition-colors ${
              activeTab === 'simulations'
                ? 'border-amber-500 text-amber-600'
                : 'border-transparent text-slate-500 hover:text-slate-700'
            }`}
          >
            Simulations
          </button>
          <button
            onClick={() => setActiveTab('agents')}
            className={`border-b-2 pb-4 text-sm font-medium transition-colors ${
              activeTab === 'agents'
                ? 'border-amber-500 text-amber-600'
                : 'border-transparent text-slate-500 hover:text-slate-700'
            }`}
          >
            Agents
          </button>
        </nav>
      </div>

      {/* Simulations Tab */}
      {activeTab === 'simulations' && (
        <div className="space-y-4">
          {mockSimulations.map((sim) => (
            <div
              key={sim.id}
              className="flex items-center justify-between rounded-xl border border-slate-200 bg-white p-4 transition-shadow hover:shadow-md"
            >
              <div className="flex items-center gap-4">
                <div className={`flex h-10 w-10 items-center justify-center rounded-lg ${
                  sim.status === 'completed' ? 'bg-green-100 text-green-600' :
                  sim.status === 'running' ? 'bg-amber-100 text-amber-600' :
                  'bg-slate-100 text-slate-600'
                }`}>
                  {sim.status === 'running' ? (
                    <svg className="h-5 w-5 animate-spin" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                  ) : sim.status === 'completed' ? (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  ) : (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  )}
                </div>
                
                <div>
                  <h3 className="font-semibold text-slate-900">{sim.name}</h3>
                  <p className="text-sm text-slate-500">
                    {sim.market} • {sim.participants} agents
                    {sim.startedAt && ` • Started ${sim.startedAt}`}
                  </p>
                </div>
              </div>
              
              <div className="flex items-center gap-2">
                <span className={`rounded-full px-3 py-1 text-xs font-medium ${
                  sim.status === 'completed' ? 'bg-green-100 text-green-700' :
                  sim.status === 'running' ? 'bg-amber-100 text-amber-700' :
                  'bg-slate-100 text-slate-700'
                }`}>
                  {sim.status}
                </span>
                
                {sim.status === 'pending' && (
                  <button className="rounded-lg bg-green-500 px-3 py-1.5 text-sm font-medium text-white hover:bg-green-600">
                    Start
                  </button>
                )}
                {sim.status === 'running' && (
                  <button className="rounded-lg bg-red-500 px-3 py-1.5 text-sm font-medium text-white hover:bg-red-600">
                    Stop
                  </button>
                )}
                {sim.status === 'completed' && (
                  <Link 
                    href={`/arena/replay/${sim.id}`}
                    className="rounded-lg bg-slate-100 px-3 py-1.5 text-sm font-medium text-slate-700 hover:bg-slate-200"
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
      {activeTab === 'agents' && (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {mockAgents.map((agent) => (
            <div
              key={agent.id}
              className="rounded-xl border border-slate-200 bg-white p-5 transition-shadow hover:shadow-md"
            >
              <div className="mb-4 flex items-start justify-between">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-slate-700 to-slate-900 text-2xl font-bold text-white">
                  {agent.name.charAt(0)}
                </div>
                <span className={`rounded-full px-2 py-0.5 text-xs font-medium ${
                  agent.isActive ? 'bg-green-100 text-green-700' : 'bg-slate-100 text-slate-700'
                }`}>
                  {agent.isActive ? 'Active' : 'Inactive'}
                </span>
              </div>
              
              <h3 className="mb-1 font-semibold text-slate-900">{agent.name}</h3>
              <p className="mb-3 text-sm text-slate-500">{agent.model}</p>
              
              <div className="mb-4 flex items-center gap-2">
                <span className="rounded-lg bg-slate-100 px-2 py-1 text-xs font-medium text-slate-600">
                  {agent.personality}
                </span>
              </div>
              
              <div className="flex gap-2">
                <button className="flex-1 rounded-lg border border-slate-200 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50">
                  Edit
                </button>
                <button className="rounded-lg border border-slate-200 p-2 text-slate-500 hover:bg-slate-50">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
