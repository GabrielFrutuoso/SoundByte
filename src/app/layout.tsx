'use client';

import { Toaster } from "@/components/ui/toaster";
import { SessionProvider } from "@/providers/SessionProvider";
import { NuqsAdapter } from "nuqs/adapters/next";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnMount: true,
      refetchOnWindowFocus: true,
      refetchOnReconnect: true,
      staleTime: 1000 * 60 * 5,
      retry: 1,
    },
  },
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-br">
      <body className="dark h-screen w-full flex flex-col">
        <SessionProvider>
          <NuqsAdapter>
          <QueryClientProvider client={queryClient}>
            {children}
            <Toaster />
          </QueryClientProvider>
          </NuqsAdapter>
        </SessionProvider>
      </body>
    </html>
  );
}
