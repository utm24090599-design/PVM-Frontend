/**
 * Página para Recepcionista
 * Paso 1: Crear órdenes de clientes
 * Puede modificar órdenes y cancelarlas
 */
import { useState, useEffect } from 'react';
import { useAuth } from '../auth/UseAuth';
import { ordersApi } from '../services/api';
import type { Order } from '../components/types/orderTypes';

export default function ReceptionistPage() {
  const { role: _role } = useAuth();
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Cargar órdenes pendientes
  useEffect(() => {
    loadOrders();
  }, []);

  const loadOrders = async () => {
    try {
      setLoading(true);
      setError(null);
      const pendingOrders = await ordersApi.getAll('PENDING');
      setOrders(pendingOrders);
    } catch (err) {
      setError('Error al cargar órdenes. Verifica la conexión con el backend.');
      console.error('Error loading orders:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleCancelOrder = async (orderId: string) => {
    if (!confirm('¿Estás seguro de cancelar esta orden?')) return;

    try {
      await ordersApi.cancel(orderId);
      await loadOrders(); // Recargar lista
    } catch (err) {
      alert('Error al cancelar la orden');
      console.error('Error canceling order:', err);
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Panel de Recepcionista</h1>
      <div className="bg-blue-50 border-l-4 border-blue-500 p-4 mb-6">
        <p className="text-blue-700">
          <strong>Función:</strong> Tomar órdenes de clientes y esperar confirmación de inventario.
          Puedes modificar órdenes y cancelarlas.
        </p>
      </div>

      {error && (
        <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-6">
          <p className="text-red-700">{error}</p>
        </div>
      )}
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-4">Órdenes Pendientes</h2>
          {loading ? (
            <p className="text-gray-600">Cargando...</p>
          ) : (
            <p className="text-gray-600">
              Total de órdenes esperando confirmación: <strong>{orders.length}</strong>
            </p>
          )}
          <button
            onClick={loadOrders}
            className="mt-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Actualizar Lista
          </button>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-4">Información</h2>
          <p className="text-gray-600 text-sm">
            Las órdenes creadas por los clientes aparecerán aquí. 
            El área de inventario las procesará y confirmará la disponibilidad.
          </p>
        </div>
      </div>

      {/* Lista de órdenes */}
      {!loading && orders.length > 0 && (
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-4">Lista de Órdenes Pendientes</h2>
          <div className="space-y-4">
            {orders.map((order) => (
              <div
                key={order.orderId}
                className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50"
              >
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-semibold text-lg">Orden: {order.orderId}</h3>
                    <p className="text-gray-600">Cliente: {order.clientName}</p>
                    <p className="text-gray-600">
                      Total: <span className="font-bold">${order.totalOrder.toFixed(2)}</span>
                    </p>
                    <p className="text-sm text-gray-500">
                      Items: {order.items.length} | Creada: {new Date(order.createdAt).toLocaleString()}
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleCancelOrder(order.orderId)}
                      className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 text-sm"
                    >
                      Cancelar
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {!loading && orders.length === 0 && (
        <div className="bg-white rounded-lg shadow-md p-12 text-center">
          <p className="text-gray-500 text-lg">No hay órdenes pendientes</p>
        </div>
      )}
    </div>
  );
}

