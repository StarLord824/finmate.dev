import { LandingNavbar } from "@/components/layout/LandingNavbar";
import { LandingFooter } from "@/components/layout/LandingFooter";
import type { ReactElement } from "react";

export default function MarketingLayout({
  children,
}: {
  children: React.ReactNode;
}): ReactElement {
  return (
    <>
      <LandingNavbar />
      <main className="flex-1">{children}</main>
      <LandingFooter />
    </>
  );
}
