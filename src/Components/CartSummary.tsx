import React from 'react';

type CartItem = {
  title: string;
  description: string;
  count: number;
};

type CartSummaryProps = {
  cartItems: CartItem[];
  total: number;
};

const CartSummary: React.FC<CartSummaryProps> = ({ cartItems, total }) => {
  return (
    <div className="cart-summary">
      <h2>Your products to buy</h2>
      {cartItems.map((item, index) => (
        <div key={index} className="cart-item">
          <p>{item.title}</p>
          <p>{item.description}</p>
          <p>Cantidad: {item.count}</p>
        </div>
      ))}
      <h3>Total: ${total}</h3>
    </div>
  );
};

export default CartSummary;
