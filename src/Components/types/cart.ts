export interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
}

export type CartAction =
  | { type: "ADD"; item: CartItem }
  | { type: "REMOVE"; id: number }
  | { type: "UPDATE"; id: number; quantity: number }
  | { type: "CLEAR" };