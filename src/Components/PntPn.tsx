//Integración en la vista principal
import React from "react";
import OrderSummary from "./OrderSummary";
import ConfirmOrderButton from "./ui/ConfirmOrderButton";

const CheckoutPage: React.FC = () => {
  const products = [
    { id: 1, name: "Producto A", quantity: 2, price: 50 },
    { id: 2, name: "Producto B", quantity: 1, price: 100 },
  ];

  return (
    <div className="checkout-page">
      <OrderSummary products={products} taxRate={0.16} />
      <ConfirmOrderButton />
    </div>
  );
};

export default CheckoutPage;
