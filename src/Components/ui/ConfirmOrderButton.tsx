//Este componente simula el envío al backend: Al hacer clic, muestra un mensaje de confirmación. Puede integrarse con un fetch o axios si luego quieres conectarlo a un backend real.
import React, { useState } from "react";

const ConfirmOrderButton: React.FC = () => {
  const [status, setStatus] = useState("");

  const handleConfirm = async () => {
    setStatus("Enviando orden...");
    // Simulación de envío al backend
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setStatus("✅ Orden confirmada y enviada al backend");
  };

  return (
    <div>
      <button onClick={handleConfirm} className="confirm-btn">
        Confirmar Orden
      </button>
      {status && <p>{status}</p>}
    </div>
  );
};

export default ConfirmOrderButton;
