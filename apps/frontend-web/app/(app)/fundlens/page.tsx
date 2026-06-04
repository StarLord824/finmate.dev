import { Landmark, TrendingUp, Building2 } from "lucide-react";
import type { ReactElement } from "react";
import { fundlensApi } from "@/lib/fundlens-api-client";
import { AmcGrid } from "@/components/fundlens/AmcGrid";

export default async function FundLensPage(): Promise<ReactElement> {
  let amcs: Awaited<ReturnType<typeof fundlensApi.listAmcs>> = [];
  try {
    amcs = await fundlensApi.listAmcs();
  } catch {
    // API unavailable — show empty state
  }

  return (
    <div className="max-w-7xl mx-auto w-full px-6 py-8">
      <div className="mb-8 pb-6 border-b border-[#c8ddf5]">
        <div className="flex items-center gap-3 mb-3">
          <div className="h-12 w-12 rounded-xl bg-linear-to-br from-[#003366] to-[#007acc] flex items-center justify-center shadow-md shadow-blue-900/20">
            <Landmark className="h-6 w-6 text-white" />
          </div>
          <div>
            <h1 className="text-3xl font-extrabold tracking-tight text-[#003366]">FundLens</h1>
            <p className="text-sm text-[#4a6890]">
              Indian mutual fund intelligence — what every fund manager is actually buying
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-8">
        <StatCard label="AMCs tracked" value={amcs.length > 0 ? `${amcs.length}` : "40+"} icon={Building2} />
        <StatCard label="Disclosures" value="Monthly" icon={Landmark} />
        <StatCard label="History" value="Live" icon={TrendingUp} />
      </div>

      <div className="mb-4">
        <h2 className="text-xl font-extrabold text-[#003366]">AMC Directory</h2>
      </div>

      {amcs.length > 0 ? (
        <AmcGrid amcs={amcs} />
      ) : (
        <div className="rounded-2xl border border-[#c8ddf5] bg-[#f0f7ff] p-8 text-center">
          <p className="text-[#4a6890]">AMC data loading — run <code className="font-mono bg-white px-1 rounded">pnpm fundlens:up</code> to start the API.</p>
        </div>
      )}
    </div>
  );
}

function StatCard({ label, value, icon: Icon }: { label: string; value: string; icon: typeof Landmark }): ReactElement {
  return (
    <div className="bg-white border border-[#c8ddf5] rounded-2xl p-4 shadow-sm shadow-blue-900/4">
      <div className="flex items-center gap-2 mb-2">
        <Icon className="h-4 w-4 text-[#007acc]" />
        <span className="text-xs font-semibold text-[#4a6890]">{label}</span>
      </div>
      <p className="text-2xl font-extrabold text-[#003366]">{value}</p>
    </div>
  );
}
