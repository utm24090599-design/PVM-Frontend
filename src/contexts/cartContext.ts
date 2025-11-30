import { createContext } from "react";
import type { CartItem } from "../types/cart";

export interface CartContextType {
  cart: CartItem[];
  addToCart: (item: CartItem) => void;
  removeFromCart: (id: number) => void;
  updateQuantity: (id: number, quantity: number) => void;
}

export const CartContext = createContext<CartContextType | undefined>(undefined);