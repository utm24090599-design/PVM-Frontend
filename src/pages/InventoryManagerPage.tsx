/**
 * Página para Gestor de Inventario
 * Paso 2: Recoger materiales y confirmar disponibilidad
 */
import { useState, useEffect } from 'react';
import { useAuth } from '../auth/UseAuth';
import OrderList from '../components/OrderList';
import OrderDetails from '../components/OrderDetails';
import { ordersApi, inventoryApi } from '../services/api';
import { completeOrderRecollection } from '../services/orderService';
import type { OrderItem, Order } from '../components/types/orderTypes';

export default function InventoryManagerPage() {
  const { role: _role } = useAuth();
  const [selectedItem, setSelectedItem] = useState<OrderItem | null>(null);
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [processingOrderId, setProcessingOrderId] = useState<string | null>(null);

  // Cargar órdenes pendientes de recolección
  useEffect(() => {
    loadOrders();
  }, []);

  const loadOrders = async () => {
    try {
      setLoading(true);
      setError(null);
      // Cargar órdenes en estado PENDING o IN_PROGRESS
      const pendingOrders = await ordersApi.getAll('PENDING');
      const inProgressOrders = await ordersApi.getAll('IN_PROGRESS');
      setOrders([...pendingOrders, ...inProgressOrders]);
    } catch (err) {
      setError('Error al cargar órdenes. Verifica la conexión con el backend.');
      console.error('Error loading orders:', err);
    } finally {
      setLoading(false);
    }
  };

  // Actualizar orden cuando se modifica un item
  const handleOrderUpdate = async (orderId: string, updatedOrder: Order) => {
    try {
      await ordersApi.update(orderId, updatedOrder);
      await loadOrders(); // Recargar lista
    } catch (err) {
      console.error('Error updating order:', err);
    }
  };

  // Completar recolección y asignar token
  const handleCompleteRecollection = async (orderId: string) => {
    if (!confirm('¿Confirmar que todos los items están recogidos y asignar token?')) {
      return;
    }

    try {
      setProcessingOrderId(orderId);
      const order = orders.find(o => o.orderId === orderId);
      if (!order) return;

      // Verificar que todos los items estén confirmados
      const allConfirmed = order.items.every(item => item.confirmedAvailable);
      if (!allConfirmed) {
        alert('Debes confirmar la disponibilidad de todos los items primero');
        return;
      }

      // Preparar datos de items confirmados
      const confirmedItems = order.items.map(item => ({
        itemId: item.id,
        availableQuantity: item.availableStock,
        collectedQuantity: item.collectedQuantity,
      }));

      // Completar recolección (esto asignará token y creará payment request)
      await completeOrderRecollection(orderId, confirmedItems);
      
      alert('Recolección completada. Token asignado y orden lista para pago.');
      await loadOrders();
    } catch (err: any) {
      alert(err.message || 'Error al completar la recolección');
      console.error('Error completing recollection:', err);
    } finally {
      setProcessingOrderId(null);
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Panel de Gestor de Inventario</h1>
      <div className="bg-green-50 border-l-4 border-green-500 p-4 mb-6">
        <p className="text-green-700">
          <strong>Función:</strong> Recoger materiales del inventario, confirmar disponibilidad,
          reservar inventario y crear solicitud de pago con token.
        </p>
      </div>

      {error && (
        <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-6">
          <p className="text-red-700">{error}</p>
        </div>
      )}

      <div className="flex h-screen bg-gray-50 p-4 space-x-4">
        {/* Columna Izquierda: Lista de Órdenes */}
        <div className="w-1/2 p-4 bg-white rounded-xl shadow-lg flex flex-col">
          <div className="flex justify-between items-center mb-4 border-b pb-2">
            <h2 className="text-2xl font-bold text-gray-800">
              Órdenes para Recoger
            </h2>
            <button
              onClick={loadOrders}
              className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700 text-sm"
              disabled={loading}
            >
              {loading ? 'Cargando...' : 'Actualizar'}
            </button>
          </div>
          {loading ? (
            <p className="text-center text-gray-500">Cargando órdenes...</p>
          ) : (
          <OrderList
            selectedItem={selectedItem}
            onItemSelected={setSelectedItem}
            orders={orders}
            onOrdersUpdate={setOrders}
          />
          )}
        </div>

        {/* Columna Derecha: Detalles del Artículo */}
        <div className="w-1/2 p-4 bg-white rounded-xl shadow-lg">
          <h2 className="text-2xl font-semibold text-gray-700 mb-4 border-b pb-2">
            Detalle de Artículo
          </h2>
          <OrderDetails 
            item={selectedItem} 
            orderId={selectedItem ? orders.find(o => o.items.some(i => i.id === selectedItem.id))?.orderId : undefined}
            onItemConfirmed={async (itemId, availableQuantity) => {
              const order = orders.find(o => o.items.some(i => i.id === itemId));
              if (!order) return;

              try {
                // Confirmar item con el backend
                await inventoryApi.confirmItem(order.orderId, itemId, {
                  availableQuantity,
                  collectedQuantity: Math.min(availableQuantity, order.items.find(i => i.id === itemId)?.requestedQuantity || 0),
                });

                // Recargar órdenes
                await loadOrders();
              } catch (err: any) {
                throw new Error(err.response?.data?.message || 'Error al confirmar el item');
              }
            }}
          />
          
          {selectedItem && (
            <div className="mt-4 pt-4 border-t">
              <button
                onClick={() => {
                  const order = orders.find(o => 
                    o.items.some(item => item.id === selectedItem.id)
                  );
                  if (order) {
                    handleCompleteRecollection(order.orderId);
                  }
                }}
                disabled={processingOrderId !== null}
                className="w-full px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 disabled:bg-gray-400"
              >
                {processingOrderId ? 'Procesando...' : 'Completar Recolección y Asignar Token'}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

