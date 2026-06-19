"use client";

import { usePizzaOrder } from "./context";

export function PizzaOrderActions() {
  const { optimisticOrder, clearOrder, isPending, error } = usePizzaOrder();

  return (
    <div className="space-y-2">
      {error && (
        <div className="rounded border border-salsa-claro bg-salsa-claro px-3 py-2 text-xs text-salsa-oscuro">
          {error}
        </div>
      )}

      {isPending && (
        <div className="flex items-center gap-2 rounded border border-amber-200 bg-amber-50 px-3 py-2 text-xs text-amber-700">
          <svg className="h-3.5 w-3.5 animate-spin" viewBox="0 0 24 24" fill="none">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
          </svg>
          Sincronizando con el servidor...
        </div>
      )}

      {optimisticOrder.items.length > 0 && (
        <button
          onClick={clearOrder}
          disabled={isPending}
          className="w-full rounded border border-masa-oscuro bg-masa px-3 py-2 text-sm font-medium text-[#5C4A32] transition enabled:hover:bg-masa-claro disabled:opacity-50"
        >
          Vaciar carrito
        </button>
      )}
    </div>
  );
}
