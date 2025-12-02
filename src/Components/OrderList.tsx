import React, { useState, useEffect } from 'react';
import { mockOrders } from '../utils/mockOrders';
import OrderItemRow from './OrderItemRow';
import type { Order, OrderItem } from './types/orderTypes';

// Definimos los props para OrderList
interface OrderListProps {
  onItemSelected: (item: OrderItem | null) => void;
  selectedItem: OrderItem | null;
  orders?: Order[]; // Órdenes desde props (backend)
  onOrdersUpdate?: (orders: Order[]) => void; // Callback para actualizar órdenes
}

const OrderList: React.FC<OrderListProps> = ({ 
  onItemSelected, 
  selectedItem,
  orders: ordersProp,
  onOrdersUpdate
}) => {
  // Estado para la data de las órdenes (usar props si están disponibles, sino mock)
  const [orders, setOrders] = useState<Order[]>(ordersProp || mockOrders);

  // Actualizar cuando cambien las props
  useEffect(() => {
    if (ordersProp) {
      setOrders(ordersProp);
    }
  }, [ordersProp]);

  // Efecto para seleccionar automáticamente el primer artículo de la primera orden al cargar
  useEffect(() => {
    if (orders.length > 0 && orders[0].items.length > 0 && !selectedItem) {
      onItemSelected(orders[0].items[0]);
    }
  }, [orders, selectedItem, onItemSelected]);

  // ✨ CORRECCIÓN 1: La función de actualización debe usar 'id: number' según orderTypes.ts.
  const handleItemUpdate = (itemId: number, updates: Partial<OrderItem>) => {
    const updatedOrders = orders.map(order => ({
      ...order,
      items: order.items.map(item => {
        // 🛑 CORRECCIÓN 2: Usar item.id en lugar de item.sku para la comparación.
        if (item.id === itemId) {
          
          const updatedItem = { ...item, ...updates };
          
          // Si el ítem seleccionado es el que se actualizó, también actualizamos el estado de la derecha
          // 🛑 CORRECCIÓN 3: Usar selectedItem.id para la comparación.
          if (selectedItem && selectedItem.id === itemId) {
              onItemSelected(updatedItem);
          }
          return updatedItem;
        }
        return item;
      }),
    }));
    
    setOrders(updatedOrders);
    
    // Notificar al componente padre si hay callback
    if (onOrdersUpdate) {
      onOrdersUpdate(updatedOrders);
    }
  };
  
  // Manejador de clic de fila para seleccionar el artículo
  const handleRowClick = (item: OrderItem) => {
    onItemSelected(item);
  };


  return (
    <div className="space-y-6">
      <h1 className="text-xl font-semibold mb-4 border-b pb-2">Órdenes Pendientes de Recogida</h1>
      
      {orders.map(order => (
        <div key={order.orderId} className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-200">
          
          {/* Encabezado de la Orden */}
          <div className={`flex justify-between items-center p-3 text-white 
              ${order.status === 'DELIVERED' ? 'bg-green-600' : 
                order.status === 'PAID' ? 'bg-purple-600' :
                order.status === 'READY_FOR_PAYMENT' ? 'bg-yellow-600' :
                order.status === 'CANCELED' ? 'bg-red-600' : 'bg-blue-600'}`}>
            <div>
              <p className="font-bold text-lg">Orden ID: {order.orderId}</p>
              <p className="text-sm">Cliente: {order.clientName}</p>
              {order.token && (
                <p className="text-xs mt-1">Token: {order.token}</p>
              )}
            </div>
            <div className="text-right">
              <p className="font-extrabold text-2xl">${order.totalOrder.toFixed(2)}</p> 
              <span className="text-xs font-semibold">
                {order.status === 'PENDING' ? 'PENDIENTE' :
                 order.status === 'IN_PROGRESS' ? 'EN PROCESO' :
                 order.status === 'READY_FOR_PAYMENT' ? 'LISTA PARA PAGO' :
                 order.status === 'PAYMENT_PENDING' ? 'PAGO PENDIENTE' :
                 order.status === 'PAYMENT_RESERVED' ? 'RESERVADA' :
                 order.status === 'PAID' ? 'PAGADA' :
                 order.status === 'READY_FOR_DELIVERY' ? 'LISTA PARA ENTREGA' :
                 order.status === 'DELIVERED' ? 'ENTREGADA' :
                 order.status === 'CANCELED' ? 'CANCELADA' : order.status}
              </span>
            </div>
          </div>
          
          {/* Lista de Artículos */}
          <div className="p-4 space-y-2">
            {order.items.map(item => (
              <div 
                // 🛑 CORRECCIÓN 4: Usar item.id en lugar de item.sku para la key.
                key={item.id} 
                onClick={() => handleRowClick(item)}
                className={`cursor-pointer transition duration-150 ease-in-out border rounded-lg p-2 
                            ${selectedItem && selectedItem.id === item.id 
                              ? 'border-blue-500 bg-blue-50 shadow-inner' 
                              : 'border-gray-100 hover:bg-gray-50'
                            }`}
              >
                <OrderItemRow 
                  item={item} 
                  onItemUpdate={handleItemUpdate}
                />
              </div>
            ))}
          </div>
          
          {/* Resumen de Artículos Pendientes (Se puede calcular el estado de la orden aquí) */}
          <div className="text-right text-xs p-2 text-gray-500 border-t">
            Artículos pendientes: {order.items.filter(i => i.collectedQuantity < i.requestedQuantity).length}
          </div>
        </div>
      ))}
    </div>
  );
};

export default OrderList;