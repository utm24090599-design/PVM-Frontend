/**
 * Página para Recepcionista
 * Paso 1: Crear órdenes de clientes
 * Puede modificar órdenes y cancelarlas
 */
import { useState } from 'react';
import { useAuth } from '../auth/UseAuth';
import type { Order } from '../components/types/orderTypes';

export default function ReceptionistPage() {
  const { role: _role } = useAuth();
  const [orders] = useState<Order[]>([]);

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Panel de Recepcionista</h1>
      <div className="bg-blue-50 border-l-4 border-blue-500 p-4 mb-6">
        <p className="text-blue-700">
          <strong>Función:</strong> Tomar órdenes de clientes y esperar confirmación de inventario.
          Puedes modificar órdenes y cancelarlas.
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-4">Crear Nueva Orden</h2>
          <p className="text-gray-600 mb-4">
            Aquí puedes crear nuevas órdenes de clientes. Las órdenes se generan como "Collection Orders"
            y pasan al siguiente paso para confirmación de inventario.
          </p>
          <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
            Nueva Orden
          </button>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-4">Órdenes Pendientes</h2>
          <p className="text-gray-600">
            Total de órdenes esperando confirmación: <strong>{orders.length}</strong>
          </p>
        </div>
      </div>
    </div>
  );
}

