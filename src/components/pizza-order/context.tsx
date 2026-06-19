"use client";

import {
  createContext,
  useCallback,
  useContext,
  useOptimistic,
  useRef,
  startTransition,
  useState,
} from "react";
import type {
  OrderAction,
  OrderState,
  Pizza,
  PizzaOrderContextType,
} from "./types";
import { addToServer, clearServerOrder, removeFromServer } from "@/lib/api";

const PizzaOrderContext = createContext<PizzaOrderContextType | null>(null);

function orderReducer(state: OrderState, action: OrderAction): OrderState {
  switch (action.type) {
    case "ADD_ITEM": {
      const existing = state.items.find(
        (i) => i.pizza.id === action.pizza.id
      );
      if (existing) {
        return {
          items: state.items.map((i) =>
            i.pizza.id === action.pizza.id
              ? { ...i, quantity: i.quantity + 1 }
              : i
          ),
        };
      }
      return { items: [...state.items, { pizza: action.pizza, quantity: 1 }] };
    }
    case "REMOVE_ITEM": {
      return {
        items: state.items.filter((i) => i.pizza.id !== action.pizzaId),
      };
    }
    case "UPDATE_QUANTITY": {
      if (action.quantity <= 0) {
        return {
          items: state.items.filter((i) => i.pizza.id !== action.pizzaId),
        };
      }
      return {
        items: state.items.map((i) =>
          i.pizza.id === action.pizzaId
            ? { ...i, quantity: action.quantity }
            : i
        ),
      };
    }
    case "CLEAR":
      return { items: [] };
    case "SET_ITEMS":
      return { items: action.items };
    default:
      return state;
  }
}

function optimisticReducer(state: OrderState, action: OrderAction): OrderState {
  return orderReducer(state, action);
}

export function PizzaOrderProvider({ children }: { children: React.ReactNode }) {
  const [order, setOrder] = useState<OrderState>({ items: [] });
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const pendingActions = useRef(0);

  const [optimisticOrder, addOptimisticAction] = useOptimistic(order, optimisticReducer);

  const syncAction = useCallback(
    async (action: OrderAction) => {
      startTransition(async () => {
        pendingActions.current += 1;
        setIsPending(true);
        setError(null);

        addOptimisticAction(action);

        try {
        let result: { success: boolean; error?: string };

        switch (action.type) {
          case "ADD_ITEM": {
            const existingItem = order.items.find(
              (i) => i.pizza.id === action.pizza.id
            );
            result = await addToServer(
              { items: order.items.map((i) => ({ pizzaId: i.pizza.id, quantity: i.quantity })) },
              { pizzaId: action.pizza.id, quantity: (existingItem?.quantity ?? 0) + 1 }
            );
            break;
          }
          case "REMOVE_ITEM":
            result = await removeFromServer(action.pizzaId);
            break;
          case "UPDATE_QUANTITY":
            result = await removeFromServer(action.pizzaId);
            break;
          case "CLEAR":
            result = await clearServerOrder();
            break;
          default:
            result = { success: true };
        }

        if (result.success) {
          setOrder((prev) => orderReducer(prev, action));
        } else {
          setError(result.error ?? "Unknown error");
        }
      } catch {
        setError("Unexpected error occurred");
      } finally {
        pendingActions.current -= 1;
        if (pendingActions.current <= 0) {
          setIsPending(false);
        }
      }
      });
    },
    [addOptimisticAction, order]
  );

  const addItem = useCallback(
    (pizza: Pizza) => syncAction({ type: "ADD_ITEM", pizza }),
    [syncAction]
  );

  const removeItem = useCallback(
    (pizzaId: string) => syncAction({ type: "REMOVE_ITEM", pizzaId }),
    [syncAction]
  );

  const updateQuantity = useCallback(
    (pizzaId: string, quantity: number) =>
      syncAction({ type: "UPDATE_QUANTITY", pizzaId, quantity }),
    [syncAction]
  );

  const clearOrder = useCallback(
    () => syncAction({ type: "CLEAR" }),
    [syncAction]
  );

  return (
    <PizzaOrderContext.Provider
      value={{
        order,
        optimisticOrder,
        addItem,
        removeItem,
        updateQuantity,
        clearOrder,
        isPending,
        error,
      }}
    >
      {children}
    </PizzaOrderContext.Provider>
  );
}

export function usePizzaOrder(): PizzaOrderContextType {
  const ctx = useContext(PizzaOrderContext);
  if (!ctx) {
    throw new Error("usePizzaOrder must be used within a PizzaOrderProvider");
  }
  return ctx;
}
