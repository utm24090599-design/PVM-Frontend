/**
 * Página para Gestor de Inventario
 * Paso 2: Recoger materiales y confirmar disponibilidad
 */
import { useAuth } from '../auth/UseAuth';
import OrderList from '../components/OrderList';
import OrderDetails from '../components/OrderDetails';
import { useState } from 'react';
import type { OrderItem } from '../components/types/orderTypes';

export default function InventoryManagerPage() {
  const { role: _role } = useAuth();
  const [selectedItem, setSelectedItem] = useState<OrderItem | null>(null);

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Panel de Gestor de Inventario</h1>
      <div className="bg-green-50 border-l-4 border-green-500 p-4 mb-6">
        <p className="text-green-700">
          <strong>Función:</strong> Recoger materiales del inventario, confirmar disponibilidad,
          reservar inventario y crear solicitud de pago con token.
        </p>
      </div>

      <div className="flex h-screen bg-gray-50 p-4 space-x-4">
        {/* Columna Izquierda: Lista de Órdenes */}
        <div className="w-1/2 p-4 bg-white rounded-xl shadow-lg flex flex-col">
          <h2 className="text-2xl font-bold text-gray-800 mb-4 border-b pb-2">
            Órdenes para Recoger
          </h2>
          <OrderList
            selectedItem={selectedItem}
            onItemSelected={setSelectedItem}
          />
        </div>

        {/* Columna Derecha: Detalles del Artículo */}
        <div className="w-1/2 p-4 bg-white rounded-xl shadow-lg">
          <h2 className="text-2xl font-semibold text-gray-700 mb-4 border-b pb-2">
            Detalle de Artículo
          </h2>
          <OrderDetails item={selectedItem} />
        </div>
      </div>
    </div>
  );
}

