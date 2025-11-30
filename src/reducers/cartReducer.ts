import type { CartItem, CartAction } from "../types/cart";

export function cartReducer(state: CartItem[], action: CartAction): CartItem[] {
  switch (action.type) {
    case "ADD": {
      const existing = state.find(i => i.id === action.item.id);

      if (existing) {
        // ✅ Si ya existe, suma la cantidad enviada (o 1 por defecto)
        return state.map(i =>
          i.id === action.item.id
            ? { ...i, quantity: i.quantity + (action.item.quantity ?? 1) }
            : i
        );
      }

      // ✅ Si no existe, usa la cantidad enviada (o 1 por defecto)
      return [...state, { ...action.item, quantity: action.item.quantity ?? 1 }];
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
