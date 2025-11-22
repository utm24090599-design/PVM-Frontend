import React from "react";
import ConfirmOrderButton from "./ui/ConfirmOrderButton"; // Ajusta la ruta si está en otra carpeta

const OrderSection: React.FC = () => {
  return (
    <div className="order-section">
      <h2>Resumen Final</h2>
      <ConfirmOrderButton />
    <div className='flex'>
       <button className="transference-btn">Pay with transference</button>
       <ConfirmOrderButton />
    </div>

    </div>
  );
};

export default OrderSection;
