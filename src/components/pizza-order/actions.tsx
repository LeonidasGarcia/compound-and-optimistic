"use client";

import { usePizzaOrder } from "./context";

export function PizzaOrderActions() {
  const { optimisticOrder, clearOrder, isPending, error } = usePizzaOrder();

  return (
    <div className="space-y-2">
      {error && (
        <div className="rounded border border-red-200 bg-red-50 px-3 py-2 text-xs text-red-700">
          {error}
        </div>
      )}

      {isPending && (
        <div className="flex items-center gap-2 rounded border border-amber-200 bg-amber-50 px-3 py-2 text-xs text-amber-700">
          <svg className="h-3.5 w-3.5 animate-spin" viewBox="0 0 24 24" fill="none">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
          </svg>
          Syncing with server...
        </div>
      )}

      <div className="flex gap-2">
        {optimisticOrder.items.length > 0 && (
          <button
            onClick={clearOrder}
            disabled={isPending}
            className="flex-1 rounded border border-zinc-300 bg-white px-3 py-2 text-sm font-medium text-zinc-700 transition enabled:hover:bg-zinc-50 disabled:opacity-50"
          >
            Clear Cart
          </button>
        )}
        <button
          disabled={optimisticOrder.items.length === 0 || isPending}
          className="flex-1 rounded bg-zinc-900 px-3 py-2 text-sm font-medium text-white transition enabled:hover:bg-zinc-800 disabled:opacity-40"
        >
          Place Order
        </button>
      </div>
    </div>
  );
}
