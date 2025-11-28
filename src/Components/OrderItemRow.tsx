// Dana: src/components/OrderItemRow.tsx

import React, { useState } from 'react';
import type { OrderItem } from '../Components/types/orderTypes'; 

interface OrderItemRowProps {
  item: OrderItem;
  // La firma de la prop 'onItemUpdate' es correcta (itemId: number, updates: Partial<OrderItem>)
  onItemUpdate: (itemId: number, updates: Partial<OrderItem>) => void;
}

const OrderItemRow: React.FC<OrderItemRowProps> = ({ item, onItemUpdate }) => {
  const [collectedQty, setCollectedQty] = useState(item.collectedQuantity);
  const [collected, setCollected] = useState(item.isCollected);

  // Usamos item.requestedQuantity
  const isShortage = item.availableStock < item.requestedQuantity;
  const maxToCollect = Math.min(item.requestedQuantity, item.availableStock);


  // Handler para marcar como recogido (o no disponible)
  const handleToggleCollected = () => {
    const newCollectedState = !collected;
    setCollected(newCollectedState);

    let newQty = 0;
    if (newCollectedState) {
        newQty = maxToCollect;
    }
    setCollectedQty(newQty);
    
    // 🛑 CORRECCIÓN 1: Usar item.id como el identificador numérico
    onItemUpdate(item.id, { 
        isCollected: newCollectedState, 
        collectedQuantity: newQty 
    });
  };

  // Handler para el cambio manual de cantidad (botones + y -)
  const handleQuantityChange = (delta: number) => {
    const current = collectedQty;
    let newQty = current + delta;

    newQty = Math.max(0, newQty);
    newQty = Math.min(newQty, maxToCollect); 

    setCollectedQty(newQty);
    setCollected(newQty > 0);
    
    // 🛑 CORRECCIÓN 2: Usar item.id como el identificador numérico
    onItemUpdate(item.id, { 
        isCollected: newQty > 0, 
        collectedQuantity: newQty 
    });
  };

  // Icono principal del artículo: 'forklift' (Montacargas) para modificación, 'inventory_2' (Inventario) para artículo normal
  const iconName = item.requiresModification ? 'forklift' : 'inventory_2'; 

  return (
    <div className={`flex items-center p-3 border-b transition-colors ${collected ? 'bg-green-50/50' : 'hover:bg-gray-50'}`}>
      
      {/* Columna 1: Icono y Detalles */}
      <div className="flex-1 flex items-start space-x-4">
        <span className="material-symbols-outlined w-8 h-8 text-gray-500 text-3xl flex-shrink-0">
          {iconName}
        </span>
        <div className="flex-1">
          <p className="font-semibold text-gray-800">{item.cartTitle}</p>
          <p className="text-xs text-gray-500">{item.cartProductDescription}</p>
          {item.requiresModification && (
            <span className="text-xs font-medium text-blue-600 bg-blue-100 px-1.5 py-0.5 rounded-full mt-1 inline-flex items-center">
              <span className="material-symbols-outlined text-sm mr-1">wrench</span>
              Requiere Ajuste
            </span>
          )}
        </div>
      </div>

      {/* Columna 2: Cantidades y Estado */}
      <div className="w-40 flex-shrink-0 text-right">
        <p className="text-sm">Solicitada: <span className="font-bold text-lg">{item.requestedQuantity}</span></p>
        <p className={`text-xs ${isShortage ? 'text-red-500 font-bold' : 'text-gray-500'}`}>
            Disponible: {item.availableStock}
        </p>
        {isShortage && <p className="text-xs text-red-500 font-medium">Faltante: {item.requestedQuantity - item.availableStock}</p>}
      </div>

      {/* Columna 3: Control de Cantidad Recogida (Lógica Modificable) */}
      <div className="w-48 flex-shrink-0 flex items-center justify-end space-x-2">
        <div className="flex items-center border border-yellow-500 rounded-lg overflow-hidden shadow-sm">
          <button 
            onClick={() => handleQuantityChange(-1)} 
            disabled={collectedQty === 0}
            className={`bg-yellow-400 text-black px-2 py-1 transition-colors ${collectedQty === 0 ? 'opacity-50 cursor-not-allowed' : 'hover:bg-yellow-500'}`}>-</button>
          <span className="px-3 py-1 text-sm font-medium bg-yellow-100">{collectedQty}</span>
          <button 
            onClick={() => handleQuantityChange(1)} 
            disabled={collectedQty >= maxToCollect}
            className={`bg-yellow-400 text-black px-2 py-1 transition-colors ${collectedQty >= maxToCollect ? 'opacity-50 cursor-not-allowed' : 'hover:bg-yellow-500'}`}>+</button>
        </div>
      </div>
      
      {/* Columna 4: Botón de Marcar Estado */}
      <div className="w-24 flex-shrink-0 text-center ml-4">
        <button
          onClick={handleToggleCollected}
          className={`px-3 py-1 text-sm rounded-full font-semibold transition-colors duration-200 shadow-md ${
            collected 
              ? 'bg-green-500 hover:bg-green-600 text-white'
              : 'bg-red-100 hover:bg-red-200 text-red-700'
          }`}
        >
          {collected ? 'Recogido' : 'No Listo'}
        </button>
      </div>

    </div>
  );
};

export default OrderItemRow;