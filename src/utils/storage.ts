// src/utils/storage.ts
import type { CartItem } from "../components/types/cart";

// --- Tipos para la nueva lógica de productos ---
interface StoredProduct {
  id: number;
  quantity: number;
}
const STORAGE_KEY = 'selectedProducts'; 


export const saveAuth = (token: string, role: string): void => {
  localStorage.setItem('token', token);
  localStorage.setItem('role', role);
};

export const getAuth = (): { token: string | null; role: string | null } => {
  return {
    token: localStorage.getItem('token'),
    role: localStorage.getItem('role'),
  };
};

export const clearAuth = (): void => {
  localStorage.removeItem('token');
  localStorage.removeItem('role');
};


// 1. Obtener todos los productos seleccionados del Local Storage
export const getSelectedProducts = (): StoredProduct[] => {
  const stored = localStorage.getItem(STORAGE_KEY);
  if (!stored) {
    return [];
  }
  try {
    return JSON.parse(stored) as StoredProduct[];
  } catch (error) {
    console.error("Error parsing selected products from storage:", error);
    return [];
  }
};

// 2. Guardar el arreglo completo de productos seleccionados en el Local Storage
export const saveSelectedProducts = (products: StoredProduct[]): void => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(products));
};

// 3. Función principal: Actualizar la cantidad de un producto específico
export const updateProductQuantity = (productId: number, newQuantity: number): void => {
  let products = getSelectedProducts();
  
  if (newQuantity <= 0) {
    // Si la cantidad es 0 o menos, eliminamos el producto del "carrito"
    products = products.filter(p => p.id !== productId);
  } else {
    const existingProductIndex = products.findIndex(p => p.id === productId);

    if (existingProductIndex !== -1) {
      // Si existe, actualizamos la cantidad
      products[existingProductIndex].quantity = newQuantity;
    } else {
      // Si no existe, lo añadimos
      products.push({ id: productId, quantity: newQuantity });
    }
  }

  saveSelectedProducts(products);
};

export const saveCart = (cart: CartItem[]) => {
  localStorage.setItem("cart", JSON.stringify(cart));
};

export const loadCart = (): CartItem[] => {
  const saved = localStorage.getItem("cart");
  return saved ? JSON.parse(saved) : [];
};
