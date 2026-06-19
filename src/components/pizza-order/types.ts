export type Pizza = {
  id: string;
  name: string;
  description: string;
  price: number;
};

export type OrderItem = {
  pizza: Pizza;
  quantity: number;
};

export type OrderState = {
  items: OrderItem[];
};

export type OrderAction =
  | { type: "ADD_ITEM"; pizza: Pizza }
  | { type: "REMOVE_ITEM"; pizzaId: string }
  | { type: "UPDATE_QUANTITY"; pizzaId: string; quantity: number }
  | { type: "CLEAR" }
  | { type: "SET_ITEMS"; items: OrderItem[] };

export type PizzaOrderContextType = {
  order: OrderState;
  optimisticOrder: OrderState;
  addItem: (pizza: Pizza) => void;
  removeItem: (pizzaId: string) => void;
  updateQuantity: (pizzaId: string, quantity: number) => void;
  clearOrder: () => void;
  isPending: boolean;
  error: string | null;
};

export const PIZZAS: Pizza[] = [
  { id: "margherita", name: "Margarita", description: "Salsa de tomate, mozzarella, albahaca", price: 10 },
  { id: "pepperoni", name: "Pepperoni", description: "Salsa de tomate, mozzarella, pepperoni", price: 12 },
  { id: "vegetarian", name: "Vegetariana", description: "Salsa de tomate, mozzarella, pimientos, aceitunas, champiñones", price: 11 },
  { id: "hawaiian", name: "Hawaiana", description: "Salsa de tomate, mozzarella, jamón, piña", price: 13 },
  { id: "meat_lovers", name: "Carnes", description: "Salsa de tomate, mozzarella, pepperoni, salchicha, tocino", price: 15 },
  { id: "quattro_formaggi", name: "Cuatro Quesos", description: "Salsa de tomate, mozzarella, gorgonzola, parmesano, ricota", price: 14 },
];
