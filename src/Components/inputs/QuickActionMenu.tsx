// src/Components/inputs/QuickActionMenu.tsx

import React from 'react';
import type { ProductData } from '../../utils/mockData'; // ⬅️ Usa 'type' y doble '..'

interface QuickActionMenuProps {
  data: ProductData;
}

const QuickActionMenu: React.FC<QuickActionMenuProps> = ({ data }) => {
  return (
    <div className="absolute inset-0 bg-white/95 backdrop-blur-sm p-4 flex flex-col justify-center items-center text-center transition-opacity duration-300 shadow-xl">
      
      {/* Información básica del producto en el hover */}
      <div className="text-sm mb-3">
        <h4 className="font-bold truncate max-w-full">{data.title}</h4>
        <p className="text-lg font-bold my-1">${data.price.toFixed(2)}</p>
      </div>
      
      {/* Botones de Acción (PayButton y Contador) */}
      <div className="flex items-center space-x-2">
        
        <button 
          className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-lg font-semibold shadow-md"
        >
          PayButton
        </button>
        
        <div className="flex border border-yellow-500 rounded-lg overflow-hidden">
           <button className="bg-yellow-400 hover:bg-yellow-500 text-black px-3 py-2">-</button>
           <span className="px-3 py-2 text-sm font-medium">0</span>
           <button className="bg-yellow-400 hover:bg-yellow-500 text-black px-3 py-2">+</button>
        </div>
        
      </div>
      
    </div>
  );
};

export default QuickActionMenu;