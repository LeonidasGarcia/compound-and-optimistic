"use client";

import { usePizzaOrder } from "./context";
import type { Pizza } from "./types";

export function PizzaOrderMenuItem({ pizza }: { pizza: Pizza }) {
  const { addItem, isPending } = usePizzaOrder();

  return (
    <div className="flex items-center justify-between rounded-lg border border-masa-oscuro bg-masa p-3 transition hover:border-[#8B6F47]">
      <div className="flex-1 min-w-0 mr-3">
        <p className="font-medium text-[#3D2E1E] truncate">{pizza.name}</p>
        <p className="text-xs text-masa-oscuro truncate">{pizza.description}</p>
      </div>
      <div className="flex items-center gap-3 shrink-0">
        <span className="text-sm font-semibold text-[#5C4A32]">${pizza.price}</span>
        <button
          onClick={() => addItem(pizza)}
          disabled={isPending}
          className="rounded bg-salsa px-3 py-1.5 text-sm font-medium text-white transition enabled:hover:bg-salsa-oscuro disabled:opacity-50"
        >
          Agregar
        </button>
      </div>
    </div>
  );
}
