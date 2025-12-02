/**
 * Página para Área de Entrega
 * Paso 4: Procesar entregas
 */
import { useState } from 'react';
import { useAuth } from '../auth/UseAuth';
import { tokensApi, ordersApi } from '../services/api';
import { processDelivery } from '../services/orderService';
import type { Order } from '../components/types/orderTypes';

export default function DeliveryAreaPage() {
  const { role: _role, token: authToken } = useAuth();
  const [tokenNumber, setTokenNumber] = useState('');
  const [order, setOrder] = useState<Order | null>(null);
  const [processing, setProcessing] = useState(false);
  const [deliveryCompleted, setDeliveryCompleted] = useState(false);

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
        
        // Verificar que la orden esté pagada
        if (orderData.status !== 'PAID') {
          alert('Esta orden no está pagada. El estado actual es: ' + orderData.status);
          return;
        }
        
        setOrder(orderData);
      } else {
        alert('Token inválido o no asignado a ninguna orden');
      }
    } catch (err: any) {
      alert(err.response?.data?.message || 'Error al validar token');
      console.error('Error validating token:', err);
    }
  };

  const handleProcessDelivery = async () => {
    if (!order) return;

    if (!confirm('¿Confirmar entrega de todos los productos? Esto deducirá el inventario.')) {
      return;
    }

    try {
      setProcessing(true);
      
      // Obtener ID del empleado desde el token de autenticación
      const deliveredBy = authToken || 'system';

      // Preparar items entregados
      const itemsDelivered = order.items.map(item => ({
        itemId: item.id,
        deliveredQuantity: item.collectedQuantity || item.requestedQuantity,
      }));

      // Identificar materiales que requieren modificación
      const materialsModified = order.items
        .filter(item => item.requiresModification)
        .map(item => ({
          itemId: item.id,
          modificationType: 'CUT' as const,
          originalAmount: item.availableStock,
          modifiedAmount: item.collectedQuantity,
          leftoverAmount: item.availableStock - item.collectedQuantity,
          description: `Material modificado según especificaciones`,
        }));

      // Procesar entrega
      await processDelivery(
        order.orderId,
        order.token!,
        deliveredBy,
        itemsDelivered,
        materialsModified.length > 0 ? materialsModified : undefined
      );

      setDeliveryCompleted(true);
      alert('Entrega procesada exitosamente. Inventario deducido.');
    } catch (err: any) {
      alert(err.response?.data?.message || 'Error al procesar la entrega');
      console.error('Error processing delivery:', err);
    } finally {
      setProcessing(false);
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Panel de Área de Entrega</h1>
      <div className="bg-purple-50 border-l-4 border-purple-500 p-4 mb-6">
        <p className="text-purple-700">
          <strong>Función:</strong> Validar tokens, procesar materiales para entrega (cortar/modificar si es necesario),
          deducir inventario reservado y entregar productos al cliente.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-4">Validar Token de Entrega</h2>
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
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          {deliveryCompleted ? (
            <div className="text-center">
              <div className="bg-green-50 border border-green-200 rounded-lg p-6 mb-4">
                <span className="material-symbols-outlined text-6xl text-green-600 mb-2">
                  check_circle
                </span>
                <h3 className="text-xl font-bold text-green-800 mb-2">¡Entrega Completada!</h3>
                <p className="text-green-700">La orden ha sido entregada exitosamente.</p>
              </div>
              <button
                onClick={() => {
                  setDeliveryCompleted(false);
                  setOrder(null);
                  setTokenNumber('');
                }}
                className="w-full bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
              >
                Procesar Nueva Entrega
              </button>
            </div>
          ) : order ? (
            <>
              <h2 className="text-xl font-semibold mb-4">Orden para Entrega</h2>
              <div className="mb-4">
                <p className="font-semibold">Orden ID: {order.orderId}</p>
                <p className="text-sm text-gray-600">Cliente: {order.clientName}</p>
                <p className="text-lg font-bold text-blue-600 mb-3">
                  Total: ${order.totalOrder.toFixed(2)}
                </p>
                <div className="border-t pt-3">
                  <p className="font-semibold mb-2">Items a entregar:</p>
                  <ul className="list-disc list-inside space-y-1">
                    {order.items.map((item) => (
                      <li key={item.id} className="text-sm">
                        <span className="font-medium">{item.cartTitle}</span>
                        {' - '}
                        Cantidad: {item.collectedQuantity || item.requestedQuantity}
                        {item.requiresModification && (
                          <span className="text-yellow-600 ml-2">(Requiere modificación)</span>
                        )}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              <button
                onClick={handleProcessDelivery}
                disabled={processing}
                className="w-full bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 disabled:bg-gray-400"
              >
                {processing ? 'Procesando...' : 'Procesar Entrega'}
              </button>
            </>
          ) : (
            <p className="text-gray-500 text-center">Valida un token para ver la orden</p>
          )}
        </div>
      </div>
    </div>
  );
}

