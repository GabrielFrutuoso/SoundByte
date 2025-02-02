import { SessionProvider } from "@/providers/SessionProvider";
import { NuqsAdapter } from 'nuqs/adapters/next'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-br">
      <body className="dark h-screen w-full flex flex-col">
        <SessionProvider>
          <NuqsAdapter>{children}</NuqsAdapter>
        </SessionProvider>
      </body>
    </html>
  );
}
