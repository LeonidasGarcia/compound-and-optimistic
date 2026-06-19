import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Compound & Optimistic — Demo de React",
  description:
    "Ejemplo educativo de Compound Components de React + hook useOptimistic",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="es" className="h-full antialiased">
      <body className="min-h-full flex flex-col bg-zinc-100 text-zinc-900">
        {children}
      </body>
    </html>
  );
}
