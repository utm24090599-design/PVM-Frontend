import React, { useEffect, useReducer } from "react";
import { CartContext } from "../contexts/cartContext";
import { cartReducer } from "../reducers/cartReducer";
import type { CartItem } from "../types/cart";

export const CartProvider = ({ children }: { children: React.ReactNode }) => {
  const [cart, dispatch] = useReducer(cartReducer, [], () => {
    const saved = localStorage.getItem("cart");
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  const addToCart = (item: CartItem) => dispatch({ type: "ADD", item });
  const removeFromCart = (id: number) => dispatch({ type: "REMOVE", id });
  const updateQuantity = (id: number, quantity: number) =>
    dispatch({ type: "UPDATE", id, quantity });
  // const clearCart = () => dispatch({ type: "CLEAR" });

  return (
    <CartContext.Provider
      value={{ cart, addToCart, removeFromCart, updateQuantity }}
    >
      {children}
    </CartContext.Provider>
  );
};
