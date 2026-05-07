"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useState, useEffect } from "react";
import { ThemeProvider } from "next-themes";
import { authClient } from "@/lib/auth-client";
import { apiClient } from "@/lib/api-client";

function SessionSync() {
  const { data: session } = authClient.useSession();
  useEffect(() => {
    // Keep apiClient's Bearer token in sync with the current session
    apiClient.setSessionToken((session as any)?.session?.token ?? null);
  }, [session]);
  return null;
}

export function Providers({ children }: { children: React.ReactNode }): React.ReactElement {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 2 * 60 * 1000,
            gcTime: 10 * 60 * 1000,
            refetchOnWindowFocus: true,
            retry: 1,
          },
        },
      })
  );

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider attribute="class" defaultTheme="light" forcedTheme="light" enableSystem={false}>
        <SessionSync />
        {children}
      </ThemeProvider>
    </QueryClientProvider>
  );
}
