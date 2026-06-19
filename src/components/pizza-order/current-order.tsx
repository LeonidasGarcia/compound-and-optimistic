"use client";

import { usePizzaOrder } from "./context";
import { PizzaOrderOrderItem } from "./order-item";

export function PizzaOrderCurrentOrder() {
  const { optimisticOrder } = usePizzaOrder();
  const count = optimisticOrder.items.reduce((s, i) => s + i.quantity, 0);

  return (
    <div>
      <h2 className="text-lg font-semibold text-[#3D2E1E] mb-3">
        Tu pedido {count > 0 ? `(${count} producto${count > 1 ? "s" : ""})` : ""}
      </h2>
      {count === 0 ? (
        <p className="text-sm text-masa-oscuro italic py-8 text-center">
          Tu carrito está vacío. ¡Agrega pizzas!
        </p>
      ) : (
        <div className="space-y-2">
          {optimisticOrder.items.map((item) => (
            <PizzaOrderOrderItem key={item.pizza.id} item={item} />
          ))}
        </div>
      )}
    </div>
  );
}
