"use client";

import { usePizzaOrder } from "./context";
import type { OrderItem } from "./types";

export function PizzaOrderOrderItem({ item }: { item: OrderItem }) {
  const { updateQuantity, removeItem, isPending } = usePizzaOrder();

  return (
    <div className="flex items-center justify-between rounded-lg border border-zinc-200 bg-white p-3">
      <div className="flex-1 min-w-0 mr-3">
        <p className="font-medium text-zinc-900">{item.pizza.name}</p>
        <p className="text-xs text-zinc-500">${item.pizza.price} each</p>
      </div>
      <div className="flex items-center gap-2 shrink-0">
        <div className="flex items-center rounded border border-zinc-300">
          <button
            onClick={() => updateQuantity(item.pizza.id, item.quantity - 1)}
            disabled={isPending}
            className="px-2 py-1 text-sm transition enabled:hover:bg-zinc-100 disabled:opacity-40"
          >
            -
          </button>
          <span className="w-8 text-center text-sm font-medium tabular-nums">
            {item.quantity}
          </span>
          <button
            onClick={() => updateQuantity(item.pizza.id, item.quantity + 1)}
            disabled={isPending}
            className="px-2 py-1 text-sm transition enabled:hover:bg-zinc-100 disabled:opacity-40"
          >
            +
          </button>
        </div>
        <span className="w-14 text-right text-sm font-semibold text-zinc-800">
          ${(item.pizza.price * item.quantity).toFixed(0)}
        </span>
        <button
          onClick={() => removeItem(item.pizza.id)}
          disabled={isPending}
          className="rounded p-1 text-zinc-400 transition enabled:hover:bg-red-50 enabled:hover:text-red-500 disabled:opacity-40"
          aria-label="Remove"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
          </svg>
        </button>
      </div>
    </div>
  );
}
