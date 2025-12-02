import "../styles/Estilos.css"
import PaymentForm from '../components/PaymentForm';
import CartSummary from '../components/CartSummary';
import ConfirmOrderButton from '../components/ui/ConfirmOrderButton';
import PaymentLabel from '../components/PickupLabel';
import { useState } from "react";
import { useCart } from "../hooks/useCart";
import { useAuth } from "../auth/UseAuth";
import { createOrderFromCart } from "../services/orderService";
import { processPayment } from "../services/orderService";

const Principal = () => {
  const { cart, removeFromCart } = useCart();
  const { token: authToken } = useAuth();
  const [formData, setFormData] = useState({});
  const [paymentCompleted, setPaymentCompleted] = useState(false);
  const [paymentId, setPaymentId] = useState<string>('');
  const [processing, setProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [orderToken, setOrderToken] = useState<string | null>(null);
  
  // Calcular total desde el carrito real
  const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const cartItems = cart.map(item => ({
    title: item.name,
    description: '',
    count: item.quantity
  }));

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handlePaymentComplete = async () => {
    if (cart.length === 0) {
      alert('El carrito está vacío');
      return;
    }

    try {
      setProcessing(true);
      setError(null);

      // Obtener nombre del cliente del formulario o usar un valor por defecto
      const clientName = (formData as any).fullName || 'Cliente';

      // Paso 1: Crear orden desde el carrito
      const order = await createOrderFromCart(clientName, cart);
      
      // Esperar a que el inventario confirme (simulado - en producción esto sería asíncrono)
      // Por ahora asumimos que la orden pasa directamente a READY_FOR_PAYMENT
      // En un flujo real, habría que esperar la confirmación del Inventory Manager

      // Paso 3: Procesar pago directamente (para clientes, el flujo puede ser diferente)
      // Nota: En producción, esto debería pasar por el área de venta
      // Por ahora simulamos el pago directo
      if (order.token) {
        const paymentResult = await processPayment(
          order.orderId,
          order.token,
          'CARD', // Obtener del formulario
          undefined
        );

        setPaymentId(paymentResult.payment.paymentId);
        setOrderToken(order.token);
        setPaymentCompleted(true);
        
        // Limpiar carrito después del pago exitoso
        cart.forEach(item => removeFromCart(item.id));
      } else {
        throw new Error('La orden no tiene token asignado. Debe pasar por el área de inventario primero.');
      }
    } catch (err: any) {
      setError(err.response?.data?.message || err.message || 'Error al procesar el pago');
      console.error('Error processing payment:', err);
    } finally {
      setProcessing(false);
    }
  };

  // Si el pago se completó, mostrar el PickupLabel
  if (paymentCompleted) {
    return (
      <div className="min-h-screen bg-gray-50 p-6">
        <div className="max-w-2xl mx-auto">
          <div className="bg-green-50 border-l-4 border-green-500 p-4 mb-6 rounded">
            <h2 className="text-2xl font-bold text-green-800 mb-2">¡Pago Realizado Exitosamente!</h2>
            <p className="text-green-700">Guarda este código para recoger tu pedido.</p>
          </div>
          
          <PaymentLabel
            total={total}
            paymentId={paymentId}
            codeType="qr"
            codeValue={orderToken || paymentId}
          />

          <div className="mt-6 text-center">
            <p className="text-gray-600 mb-4">
              Presenta este código QR en el área de entrega para recoger tu pedido.
            </p>
            <button
              onClick={() => {
                setPaymentCompleted(false);
                setPaymentId('');
                setOrderToken(null);
                window.location.href = '/app/catalog';
              }}
              className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-semibold"
            >
              Volver al Catálogo
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="checkout-page">
      {error && (
        <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-4 rounded">
          <p className="text-red-700">{error}</p>
        </div>
      )}
      <PaymentForm onInputChange={handleInputChange} />
      <CartSummary cartItems={cartItems} total={total} />
      <ConfirmOrderButton 
        onPaymentComplete={handlePaymentComplete}
        disabled={processing || cart.length === 0}
      />
      {processing && (
        <p className="text-center text-gray-600 mt-4">Procesando pago...</p>
      )}
    </div>
  );
};

export default Principal;
