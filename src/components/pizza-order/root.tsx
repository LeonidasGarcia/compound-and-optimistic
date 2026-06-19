"use client";

import { PizzaOrderProvider } from "./context";

export function PizzaOrderRoot({ children }: { children: React.ReactNode }) {
  return (
    <PizzaOrderProvider>
      <div className="rounded-xl border border-masa-oscuro bg-masa p-6">
        {children}
      </div>
    </PizzaOrderProvider>
  );
}
