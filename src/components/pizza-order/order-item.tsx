"use client";

import { usePizzaOrder } from "./context";
import type { OrderItem } from "./types";

export function PizzaOrderOrderItem({ item }: { item: OrderItem }) {
  const { updateQuantity, removeItem, isPending } = usePizzaOrder();

  return (
    <div className="flex items-center justify-between rounded-lg border border-masa-oscuro bg-masa p-3">
      <div className="flex-1 min-w-0 mr-3">
        <p className="font-medium text-[#3D2E1E]">{item.pizza.name}</p>
        <p className="text-xs text-masa-oscuro">${item.pizza.price} c/u</p>
      </div>
      <div className="flex items-center gap-2 shrink-0">
        <div className="flex items-center rounded border border-masa-oscuro">
          <button
            onClick={() => updateQuantity(item.pizza.id, item.quantity - 1)}
            disabled={isPending}
            className="px-2 py-1 text-sm transition enabled:hover:bg-masa-claro disabled:opacity-40"
          >
            -
          </button>
          <span className="w-8 text-center text-sm font-medium tabular-nums text-[#3D2E1E]">
            {item.quantity}
          </span>
          <button
            onClick={() => updateQuantity(item.pizza.id, item.quantity + 1)}
            disabled={isPending}
            className="px-2 py-1 text-sm transition enabled:hover:bg-masa-claro disabled:opacity-40"
          >
            +
          </button>
        </div>
        <span className="w-14 text-right text-sm font-semibold text-[#5C4A32]">
          ${(item.pizza.price * item.quantity).toFixed(0)}
        </span>
        <button
          onClick={() => removeItem(item.pizza.id)}
          disabled={isPending}
          className="rounded p-1 text-masa-oscuro transition enabled:hover:bg-salsa-claro enabled:hover:text-salsa disabled:opacity-40"
          aria-label="Eliminar"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
          </svg>
        </button>
      </div>
    </div>
  );
}
