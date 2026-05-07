import { Sidebar } from "@/components/layout/Sidebar";
import { MobileHeader } from "@/components/layout/MobileHeader";
import { TooltipProvider } from "@/components/ui/tooltip";
import type { ReactElement } from "react";

export default function AppLayout({
  children,
}: {
  children: React.ReactNode;
}): ReactElement {
  return (
    <div className="h-screen overflow-hidden flex bg-background text-foreground">
      <TooltipProvider>
        <Sidebar />
        <div className="flex flex-1 flex-col min-w-0 h-full">
          <MobileHeader />
          <main className="flex-1 overflow-y-auto">{children}</main>
        </div>
      </TooltipProvider>
    </div>
  );
}
