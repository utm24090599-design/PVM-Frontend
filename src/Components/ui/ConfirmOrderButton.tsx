//Este componente simula el envío al backend: Al hacer clic, muestra un mensaje de confirmación. Puede integrarse con un fetch o axios si luego quieres conectarlo a un backend real.
import React, { useState } from "react";

interface ConfirmOrderButtonProps {
  onPaymentComplete?: () => void;
  disabled?: boolean;
}

const ConfirmOrderButton: React.FC<ConfirmOrderButtonProps> = ({ onPaymentComplete, disabled = false }) => {
  const [status, setStatus] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);

  const handleConfirm = async () => {
    setIsProcessing(true);
    setStatus("Procesando pago...");
    
    // Llamar al callback que maneja toda la lógica del backend
    if (onPaymentComplete) {
      try {
        await onPaymentComplete();
        setStatus("✅ Pago procesado exitosamente");
      } catch (error) {
        setStatus("❌ Error al procesar el pago");
        setIsProcessing(false);
      }
    } else {
      // Fallback si no hay callback (simulación)
      await new Promise((resolve) => setTimeout(resolve, 1500));
      setStatus("✅ Pago procesado exitosamente");
      setIsProcessing(false);
    }
  };

  return (
    <div>
      <button 
        onClick={handleConfirm} 
        className="confirm-btn"
        disabled={isProcessing || disabled}
      >
        {isProcessing ? "Procesando..." : "Confirmar y Pagar"}
      </button>
      {status && <p className="mt-2">{status}</p>}
    </div>
  );
};

export default ConfirmOrderButton;
