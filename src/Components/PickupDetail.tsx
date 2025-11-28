// Muestra los productos que ya fueron entregados
import React from 'react';

type DeliveredItem = {
  name: string;
  quantity: number;
  deliveredAt: string; // fecha de entrega
};

type PickupDetailProps = {
  itemsDelivered: DeliveredItem[];
};

const PickupDetail: React.FC<PickupDetailProps> = ({ itemsDelivered }) => {
  return (
    <div className="pickup-detail">
      <h3>Productos Entregados</h3>
      <ul>
        {itemsDelivered.map((item, index) => (
          <li key={index}>
            {item.name} x {item.quantity} — Entregado el {item.deliveredAt}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PickupDetail;
