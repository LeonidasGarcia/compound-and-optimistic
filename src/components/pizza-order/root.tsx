"use client";

import { PizzaOrderProvider } from "./context";

export function PizzaOrderRoot({ children }: { children: React.ReactNode }) {
  return (
    <PizzaOrderProvider>
      <div className="rounded-xl border border-zinc-200 bg-zinc-50 p-6">
        {children}
      </div>
    </PizzaOrderProvider>
  );
}
