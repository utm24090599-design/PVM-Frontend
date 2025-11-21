// Componentes del registro de la tarjeta de crédito.
import React from 'react';

// Definimos el tipo de las props que recibe el componente
type PaymentFormProps = {
  onInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

const PaymentForm: React.FC<PaymentFormProps> = ({ onInputChange }) => {
  return (
    <div className="payment-form">
      <h2>Información de Pago</h2>

      {/* Campo para el número de tarjeta */}
      <input
        type="number"
        name="cardNumber"
        placeholder="Card Number"
        onChange={onInputChange}
      />

      {/* Campos para mes, año y CVV */}
      <div className="card-details">
        <input
          type="number"
          name="mm"
          placeholder="MM"
          onChange={onInputChange}
        />
        <input
          type="number"
          name="yy"
          placeholder="YY"
          onChange={onInputChange}
        />
        <input
          type="number"
          name="cvv"
          placeholder="CVV"
          onChange={onInputChange}
        />
        <input
          type="text"
          name="fullName"
          placeholder="Nombre Completo"
          onChange={onInputChange}
        />
        <input
          type="text"
          name="phoneNumber"
          placeholder="Número de teléfono"
          onChange={onInputChange}
        />
      
      </div>
    </div>
  );
};

export default PaymentForm;
