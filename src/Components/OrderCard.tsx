// Muestra una orden generada al marcar como "pagado"
import React from 'react';

type Product = {
  name: string;
  quantity: number;
};

type OrderCardProps = {
  clientName: string;
  products: Product[];
  isPaid: boolean;
};

const OrderCard: React.FC<OrderCardProps> = ({ clientName, products, isPaid }) => {
  return (
    <div className="order-card">
      <h3>Orden de: {clientName}</h3>
      <ul>
        {products.map((product, index) => (
          <li key={index}>
            {product.name} x {product.quantity}
          </li>
        ))}
      </ul>
      <p>Estado: {isPaid ? '✅ Pagado' : '⏳ Pendiente'}</p>
    </div>
  );
};

export default OrderCard;
