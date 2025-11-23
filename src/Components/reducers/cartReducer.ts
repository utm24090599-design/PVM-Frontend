import type { CartItem, CartAction } from "../types/cart";

export function cartReducer(state: CartItem[], action: CartAction): CartItem[] {
  switch (action.type) {
    case "ADD": {
      const existing = state.find(i => i.id === action.item.id);
      if (existing) {
        return state.map(i =>
          i.id === action.item.id ? { ...i, quantity: i.quantity + 1 } : i
        );
      }
      return [...state, { ...action.item, quantity: 1 }];
    }
    case "REMOVE":
      return state.filter(i => i.id !== action.id);
    case "UPDATE":
      return state.map(i =>
        i.id === action.id ? { ...i, quantity: action.quantity } : i
      );
    case "CLEAR":
      return [];
    default:
      return state;
  }
}