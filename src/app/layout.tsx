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
      <body className="min-h-full flex flex-col bg-masa-claro text-[#3D2E1E]">
        {children}
      </body>
    </html>
  );
}
