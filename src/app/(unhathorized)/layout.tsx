import type { Metadata } from "next";
import "../globals.css";

export const metadata: Metadata = {
  title: {
    template: '%s | SoundByte',
    default: 'SoundByte'
  },
  description: "Your favorite music platform",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
      <main className="dark h-screen w-full flex flex-col">
        {children}
      </main>
  );
}
