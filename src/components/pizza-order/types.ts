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
  { id: "margherita", name: "Margherita", description: "Tomato sauce, mozzarella, basil", price: 10 },
  { id: "pepperoni", name: "Pepperoni", description: "Tomato sauce, mozzarella, pepperoni", price: 12 },
  { id: "vegetarian", name: "Vegetarian", description: "Tomato sauce, mozzarella, bell peppers, olives, mushrooms", price: 11 },
  { id: "hawaiian", name: "Hawaiian", description: "Tomato sauce, mozzarella, ham, pineapple", price: 13 },
  { id: "meat_lovers", name: "Meat Lovers", description: "Tomato sauce, mozzarella, pepperoni, sausage, bacon", price: 15 },
  { id: "quattro_formaggi", name: "Quattro Formaggi", description: "Tomato sauce, mozzarella, gorgonzola, parmesan, ricotta", price: 14 },
];
