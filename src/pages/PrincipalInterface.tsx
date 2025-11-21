import React, { useState } from 'react';
import "../styles/Estilos.css"
import PaymentForm from '../Components/PaymentForm';
import CartSummary from '../Components/CartSummary';
import ConfirmOrderButton from '../Components/ConfirmOrderButton';

const Principal = () => {
  const [formData, setFormData] = useState({});
  const cartItems = [
    { title: 'Producto A', description: 'Descripción A', count: 2 },
    { title: 'Producto B', description: 'Descripción B', count: 1 },
  ];
  const total = 150;

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="checkout-page">
      <PaymentForm onInputChange={handleInputChange} />
      <CartSummary cartItems={cartItems} total={total} />
      <ConfirmOrderButton/>
    </div>
  );
};

export default Principal;
