"use client";

export function PizzaOrderMenu({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <h2 className="text-lg font-semibold text-[#3D2E1E] mb-3">Menú</h2>
      <div className="grid grid-cols-1 gap-3">{children}</div>
    </div>
  );
}
