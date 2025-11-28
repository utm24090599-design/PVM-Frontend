import React, { useState, useEffect } from 'react';
import { mockOrders } from '../utils/mockOrders';
import OrderItemRow from './OrderItemRow';
import type { Order, OrderItem } from '../Components/types/orderTypes'; // Asumimos que esta ruta es correcta

// Definimos los props para OrderList
interface OrderListProps {
  onItemSelected: (item: OrderItem | null) => void;
  selectedItem: OrderItem | null;
}

const OrderList: React.FC<OrderListProps> = ({ onItemSelected, selectedItem }) => {
  // Estado para la data de las órdenes (será el estado que se actualice)
  const [orders, setOrders] = useState<Order[]>(mockOrders);

  // Efecto para seleccionar automáticamente el primer artículo de la primera orden al cargar
  useEffect(() => {
    if (orders.length > 0 && orders[0].items.length > 0 && !selectedItem) {
      onItemSelected(orders[0].items[0]);
    }
  }, [orders, selectedItem, onItemSelected]);

  // ✨ CORRECCIÓN 1: La función de actualización debe usar 'id: number' según orderTypes.ts.
  const handleItemUpdate = (itemId: number, updates: Partial<OrderItem>) => {
    setOrders(prevOrders => 
      prevOrders.map(order => ({
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
      }))
    );
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
              ${order.status === 'COMPLETED' ? 'bg-green-600' : 'bg-blue-600'}`}>
            <div>
              <p className="font-bold text-lg">Orden ID: {order.orderId}</p>
              <p className="text-sm">Cliente: {order.clientName}</p>
            </div>
            <div className="text-right">
              {/* Nota: totalOrder es un string en tu tipo, lo usaremos directamente */}
              <p className="font-extrabold text-2xl">${order.totalOrder}</p> 
              <span className="text-xs font-semibold">
                {/* Asumimos que Order tiene la prop status */}
                {order.status === 'COMPLETED' ? 'COMPLETADA' : 'EN PROCESO'} 
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