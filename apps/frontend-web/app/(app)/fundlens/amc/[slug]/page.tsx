import { notFound } from "next/navigation";
import type { ReactElement } from "react";
import { fundlensApi } from "@/lib/fundlens-api-client";
import { Building2, ChevronLeft } from "lucide-react";
import Link from "next/link";

interface Props {
  params: Promise<{ slug: string }>;
}

export default async function AmcPage({ params }: Props): Promise<ReactElement> {
  const { slug } = await params;
  let amc: Awaited<ReturnType<typeof fundlensApi.getAmc>>;
  try {
    amc = await fundlensApi.getAmc(slug);
  } catch {
    notFound();
  }

  return (
    <div className="max-w-7xl mx-auto w-full px-6 py-8">
      <Link href="/fundlens" className="flex items-center gap-1 text-xs text-[#4a6890] hover:text-[#003366] mb-6">
        <ChevronLeft className="h-3 w-3" /> Back to FundLens
      </Link>

      <div className="flex items-start gap-4 mb-8">
        <div className="h-14 w-14 rounded-xl bg-linear-to-br from-[#e8f2ff] to-[#cce0ff] flex items-center justify-center shrink-0">
          <Building2 className="h-7 w-7 text-[#007acc]" />
        </div>
        <div>
          <h1 className="text-2xl font-extrabold text-[#003366]">{amc.name}</h1>
          <p className="text-sm text-[#4a6890] mt-0.5">{amc.sebiRegNo ?? ""}</p>
        </div>
      </div>

      <div className="bg-white border border-[#c8ddf5] rounded-2xl shadow-sm shadow-blue-900/4">
        <div className="px-6 py-4 border-b border-[#c8ddf5]">
          <h2 className="text-base font-extrabold text-[#003366]">Schemes</h2>
        </div>
        <div className="px-2 py-2">
          <p className="text-sm text-[#4a6890] px-4 py-8 text-center">
            Scheme list will appear once the scraper has populated data.
          </p>
        </div>
      </div>
    </div>
  );
}
