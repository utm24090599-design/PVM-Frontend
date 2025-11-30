/**
 * Página para Área de Entrega
 * Paso 4: Procesar entregas
 */
import { useState } from 'react';
import { useAuth } from '../auth/UseAuth';
import { validateToken } from '../utils/tokenManager';

export default function DeliveryAreaPage() {
  const { role: _role } = useAuth();
  const [tokenNumber, setTokenNumber] = useState('');
  const [order, setOrder] = useState<any>(null);

  const handleTokenValidation = () => {
    const token = validateToken(tokenNumber);
    if (token && token.orderId) {
      // Aquí cargarías la orden desde el backend
      setOrder({
        orderId: token.orderId,
        items: [
          { name: 'Producto 1', quantity: 2, requiresModification: false },
          { name: 'Rollo de material', quantity: 1, requiresModification: true },
        ],
      });
    } else {
      alert('Token inválido o no asignado');
    }
  };

  const handleProcessDelivery = () => {
    // Procesar entrega: modificar materiales si es necesario, deducir inventario
    alert('Entrega procesada. Inventario deducido.');
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
          {order && (
            <>
              <h2 className="text-xl font-semibold mb-4">Orden para Entrega</h2>
              <div className="mb-4">
                <p className="font-semibold">Orden ID: {order.orderId}</p>
                <ul className="list-disc list-inside mt-2">
                  {order.items.map((item: any, index: number) => (
                    <li key={index}>
                      {item.name} - Cantidad: {item.quantity}
                      {item.requiresModification && (
                        <span className="text-yellow-600 ml-2">(Requiere modificación)</span>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
              <button
                onClick={handleProcessDelivery}
                className="w-full bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
              >
                Procesar Entrega
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

