"use client";

import { usePizzaOrder } from "./context";
import type { Pizza } from "./types";

export function PizzaOrderMenuItem({ pizza }: { pizza: Pizza }) {
  const { addItem, isPending } = usePizzaOrder();

  return (
    <div className="flex items-center justify-between rounded-lg border border-zinc-200 bg-white p-3 transition hover:border-zinc-400">
      <div className="flex-1 min-w-0 mr-3">
        <p className="font-medium text-zinc-900 truncate">{pizza.name}</p>
        <p className="text-xs text-zinc-500 truncate">{pizza.description}</p>
      </div>
      <div className="flex items-center gap-3 shrink-0">
        <span className="text-sm font-semibold text-zinc-800">${pizza.price}</span>
        <button
          onClick={() => addItem(pizza)}
          disabled={isPending}
          className="rounded bg-emerald-600 px-3 py-1.5 text-sm font-medium text-white transition enabled:hover:bg-emerald-700 disabled:opacity-50"
        >
          Add
        </button>
      </div>
    </div>
  );
}
