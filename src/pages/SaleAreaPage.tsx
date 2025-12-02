/**
 * Página para Área de Venta
 * Paso 3: Procesar pagos
 */
import { useState } from 'react';
import { useAuth } from '../auth/UseAuth';
import { tokensApi, ordersApi } from '../services/api';
import { processPayment, reservePayment, cancelPayment } from '../services/orderService';
import PaymentForm from '../components/PaymentForm';
import PayButton from '../components/ui/PayButton';
import PaymentLabel from '../components/PickupLabel';

export default function SaleAreaPage() {
  const { role: _role } = useAuth();
  const [tokenNumber, setTokenNumber] = useState('');
  const [order, setOrder] = useState<any>(null);
  const [formData, setFormData] = useState({});
  const [paymentCompleted, setPaymentCompleted] = useState(false);
  const [paymentId, setPaymentId] = useState<string>('');

  const handleTokenValidation = async () => {
    if (!tokenNumber.trim()) {
      alert('Por favor ingresa un número de token');
      return;
    }

    try {
      // Validar token con el backend
      const tokenData = await tokensApi.validate(tokenNumber);
      
      if (tokenData.orderId) {
        // Cargar orden desde el backend
        const orderData = await ordersApi.getById(tokenData.orderId);
        setOrder(orderData);
      } else {
        alert('Token inválido o no asignado a ninguna orden');
      }
    } catch (err: any) {
      alert(err.response?.data?.message || 'Error al validar token');
      console.error('Error validating token:', err);
    }
  };

  const handlePayment = async () => {
    if (!order) return;
    
    try {
      // Procesar pago con el backend
      const paymentData = await processPayment(
        order.orderId,
        order.token!,
        'CASH', // Por defecto, se puede obtener del formulario
        undefined // invoiceNumber opcional
      );

      setPaymentId(paymentData.payment.paymentId);
      setPaymentCompleted(true);
    } catch (err: any) {
      alert(err.response?.data?.message || 'Error al procesar el pago');
      console.error('Error processing payment:', err);
    }
  };

  const handleReserve = async () => {
    if (!order) return;

    try {
      await reservePayment(order.orderId, order.token!, 30);
      alert('Orden reservada por 30 minutos');
      // Recargar orden para ver el estado actualizado
      const updatedOrder = await ordersApi.getById(order.orderId);
      setOrder(updatedOrder);
    } catch (err: any) {
      alert(err.response?.data?.message || 'Error al reservar la orden');
      console.error('Error reserving payment:', err);
    }
  };

  const handleCancel = async () => {
    if (!order) return;

    if (!confirm('¿Estás seguro de cancelar esta orden? Se liberará el inventario reservado.')) {
      return;
    }

    try {
      await cancelPayment(order.orderId, order.token!);
      alert('Orden cancelada e inventario liberado');
      setOrder(null);
      setTokenNumber('');
    } catch (err: any) {
      alert(err.response?.data?.message || 'Error al cancelar la orden');
      console.error('Error canceling payment:', err);
    }
  };

  // Si el pago se completó, mostrar el PickupLabel
  if (paymentCompleted && order) {
    return (
      <div className="p-6">
        <div className="max-w-2xl mx-auto">
          <div className="bg-green-50 border-l-4 border-green-500 p-4 mb-6 rounded">
            <h2 className="text-2xl font-bold text-green-800 mb-2">¡Pago Procesado Exitosamente!</h2>
            <p className="text-green-700">El cliente puede usar este código para recoger su pedido.</p>
          </div>
          
          <PaymentLabel
            total={order.totalOrder}
            paymentId={paymentId}
            codeType="qr"
            codeValue={order.token || tokenNumber || paymentId}
          />

          <div className="mt-6 flex gap-4 justify-center">
            <button
              onClick={() => {
                setPaymentCompleted(false);
                setOrder(null);
                setTokenNumber('');
                setPaymentId('');
              }}
              className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-semibold"
            >
              Procesar Nuevo Pago
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Panel de Área de Venta</h1>
      <div className="bg-yellow-50 border-l-4 border-yellow-500 p-4 mb-6">
        <p className="text-yellow-700">
          <strong>Función:</strong> Validar tokens de pago, procesar pagos, reservar órdenes
          o cancelarlas liberando el inventario reservado.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-4">Validar Token</h2>
          <div className="mb-4">
            <input
              type="text"
              placeholder="Número de token"
              value={tokenNumber}
              onChange={(e) => setTokenNumber(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md mb-2"
            />
            <button
              onClick={handleTokenValidation}
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
              Validar Token
            </button>
          </div>

          {order && (
            <div className="mt-4 p-4 bg-gray-50 rounded">
              <h3 className="font-semibold">Orden: {order.orderId}</h3>
              <p>Cliente: {order.clientName}</p>
              <p className="text-2xl font-bold">Total: ${order.totalOrder.toFixed(2)}</p>
            </div>
          )}
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          {order && (
            <>
              <h2 className="text-xl font-semibold mb-4">Procesar Pago</h2>
              <PaymentForm onInputChange={(e) => setFormData({ ...formData, [e.target.name]: e.target.value })} />
              
              <div className="flex gap-2 mt-4">
                <PayButton onClick={handlePayment} className="w-full"/>
                <button
                  onClick={handleReserve}
                  className="bg-yellow-600 text-white px-4 py-2 rounded hover:bg-yellow-700"
                >
                  Reservar
                </button>
                <button
                  onClick={handleCancel}
                  className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
                >
                  Cancelar
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

