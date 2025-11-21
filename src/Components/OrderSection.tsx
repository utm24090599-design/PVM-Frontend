import React from "react";
import ConfirmOrderButton from "./ConfirmOrderButton"; // Ajusta la ruta si está en otra carpeta

const OrderSection: React.FC = () => {
  return (
    <div className="order-section">
      <h2>Resumen Final</h2>
      {/* Aquí podrías mostrar el resumen del pedido, total, etc. */}
      <ConfirmOrderButton />
    <div style={{ display: 'flex', gap: '10px' }}>
       <button className="transference-btn">Pay with transference</button>
       <ConfirmOrderButton />
    </div>

    </div>
  );
};

export default OrderSection;
