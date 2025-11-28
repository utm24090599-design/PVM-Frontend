import React from 'react';
import OrderCard from '../Components/OrderCard';
import PickupDetail from '../Components/PickupDetail';

const App: React.FC = () => {
  const order = {
    clientName: 'Juan Pérez',
    products: [
      { name: 'Pan', quantity: 2 },
      { name: 'Leche', quantity: 1 },
    ],
    isPaid: true,
  };

  const deliveredItems = [
    { name: 'Pan', quantity: 2, deliveredAt: '25/11/2025' },
    { name: 'Leche', quantity: 1, deliveredAt: '25/11/2025' },
  ];

  return (
    <div>
      <OrderCard {...order} />
      <PickupDetail itemsDelivered={deliveredItems} />
    </div>
  );
};

export default App;
