/**
 * Página para Área de Venta
 * Paso 3: Procesar pagos
 */
import { useState } from 'react';
import { useAuth } from '../auth/UseAuth';
import { validateToken } from '../utils/tokenManager';
import PaymentForm from '../components/PaymentForm';

export default function SaleAreaPage() {
  const { role: _role } = useAuth();
  const [tokenNumber, setTokenNumber] = useState('');
  const [order, setOrder] = useState<any>(null);
  const [formData, setFormData] = useState({});

  const handleTokenValidation = () => {
    const token = validateToken(tokenNumber);
    if (token && token.orderId) {
      // Aquí cargarías la orden desde el backend
      // Por ahora simulamos
      setOrder({
        orderId: token.orderId,
        totalOrder: 250.00,
        clientName: 'Cliente Ejemplo',
      });
    } else {
      alert('Token inválido o no asignado');
    }
  };

  const handlePayment = () => {
    // Procesar pago
    alert('Pago procesado exitosamente');
  };

  const handleReserve = () => {
    // Reservar orden por tiempo limitado
    alert('Orden reservada por 30 minutos');
  };

  const handleCancel = () => {
    // Cancelar orden y liberar inventario
    alert('Orden cancelada e inventario liberado');
  };

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
                <button
                  onClick={handlePayment}
                  className="flex-1 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
                >
                  Procesar Pago
                </button>
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

