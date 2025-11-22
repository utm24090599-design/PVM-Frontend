//Este componente se encarga de mostrar: Lista de productos con nombre, cantidad y subtotal. Totales generales (subtotal, impuestos, total final).
import React from "react";
import ConfirmOrderButton from "./ui/ConfirmOrderButton";

interface Product {
  id: number;
  name: string;
  quantity: number;
  price: number;
}

interface OrderSummaryProps {
  products: Product[];
  taxRate: number;
}

const OrderSummary: React.FC<OrderSummaryProps> = ({ products, taxRate }) => {
  const subtotal = products.reduce((acc, p) => acc + p.price * p.quantity, 0);
  const taxes = subtotal * taxRate;
  const total = subtotal + taxes;

  return (
    <div className="order-summary">
      <h2>Resumen de la Orden</h2>
      <ul>
        {products.map((p) => (
          <li key={p.id}>
            {p.name} x {p.quantity} = ${(p.price * p.quantity).toFixed(2)}
          </li>
        ))}
      </ul>
      <hr />
      <p>Subtotal: ${subtotal.toFixed(2)}</p>
      <p>Impuestos ({(taxRate * 100).toFixed(0)}%): ${taxes.toFixed(2)}</p>
      <h3>Total: ${total.toFixed(2)}</h3>
      <ConfirmOrderButton />
    </div>
  );
};

export default OrderSummary;
