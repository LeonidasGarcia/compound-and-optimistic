import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Compound & Optimistic — React Demo",
  description:
    "Educational example of React Compound Components + useOptimistic hook",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full flex flex-col bg-zinc-100 text-zinc-900">
        {children}
      </body>
    </html>
  );
}
