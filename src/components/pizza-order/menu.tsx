"use client";

export function PizzaOrderMenu({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <h2 className="text-lg font-semibold text-zinc-800 mb-3">Menu</h2>
      <div className="grid grid-cols-1 gap-3">{children}</div>
    </div>
  );
}
