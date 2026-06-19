"use client";

import { usePizzaOrder } from "./context";

export function PizzaOrderTotal() {
  const { optimisticOrder } = usePizzaOrder();
  const total = optimisticOrder.items.reduce(
    (s, i) => s + i.pizza.price * i.quantity,
    0
  );

  if (optimisticOrder.items.length === 0) return null;

  return (
    <div className="flex items-center justify-between border-t border-masa-oscuro pt-3 mt-3">
      <span className="text-sm font-semibold text-[#3D2E1E]">Total</span>
      <span className="text-lg font-bold text-[#3D2E1E]">${total.toFixed(0)}</span>
    </div>
  );
}
