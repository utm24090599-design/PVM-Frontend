// src/Components/inputs/QuickActionMenu.tsx

import React, { useState, useEffect } from 'react';
import type { ProductData } from '../../utils/mockData';
import { updateProductQuantity, getSelectedProducts } from '../../utils/storage';
import { useNavigate } from 'react-router-dom';

interface QuickActionMenuProps {
  data: ProductData;
  maxStock: number; 
}

// ⬅️ FUNCIÓN CLAVE: Detiene el evento para que no active la alerta de la tarjeta

const QuickActionMenu: React.FC<QuickActionMenuProps> = ({ data, maxStock }) => {
  const [quantity, setQuantity] = useState(0);
  const navigate = useNavigate();
  
  const stopPropagation = (e: React.MouseEvent) => {
    e.stopPropagation();
    navigate('/Principal')
  };

  // Cargar la cantidad guardada al montar
  useEffect(() => {
    const selectedProducts = getSelectedProducts();
    const currentProduct = selectedProducts.find(p => p.id === data.id);
    if (currentProduct) {
      setQuantity(currentProduct.quantity);
    }
  }, [data.id]);


  // Manejadores que usan la función stopPropagation
  const handleIncrease = (e: React.MouseEvent) => {
    stopPropagation(e); // ⬅️ Evita la alerta
    
    const newQuantity = quantity < maxStock ? quantity + 1 : maxStock;
    setQuantity(newQuantity);
    updateProductQuantity(data.id, newQuantity);
  };

  const handleDecrease = (e: React.MouseEvent) => {
    stopPropagation(e); // ⬅️ Evita la alerta

    const newQuantity = quantity > 0 ? quantity - 1 : 0;
    setQuantity(newQuantity);
    updateProductQuantity(data.id, newQuantity);
  };
  
  // Lógica de Desactivación
  const isIncrementDisabled = quantity >= maxStock;
  const isDecrementDisabled = quantity === 0;
  const isPayButtonDisabled = quantity === 0; 

  return (
    <div className="absolute inset-0 bg-white/95 backdrop-blur-sm p-4 flex flex-col justify-center items-center text-center transition-opacity duration-300 shadow-xl">
      
      {/* ... (información básica) ... */}
      
      <div className="flex items-center space-x-2">
        
        {/* PAYBUTTON CON VALIDACIÓN Y DETENCIÓN DE PROPAGACIÓN */}
        <button 
          onClick={stopPropagation} // ⬅️ Detiene la propagación del clic del PayButton
          disabled={isPayButtonDisabled} 
          className={`
            py-2 px-4 rounded-lg font-semibold shadow-md 
            transition-colors duration-200
            ${isPayButtonDisabled 
              ? 'bg-gray-400 cursor-not-allowed text-gray-700' 
              : 'bg-blue-500 hover:bg-blue-600 text-white'     
            }
          `}
        >
          PayButton
        </button>
        
        {/* Contador de Cantidad (Con Detención de Propagación) */}
        <div className="flex border border-yellow-500 rounded-lg overflow-hidden">
           <button 
             onClick={handleDecrease} // Usa la función corregida que recibe el evento
             disabled={isDecrementDisabled}
             className={`bg-yellow-400 text-black px-3 py-2 transition-colors ${isDecrementDisabled ? 'opacity-50 cursor-not-allowed' : 'hover:bg-yellow-500'}`}
           >
             -
           </button>
           <span className="px-3 py-2 text-sm font-medium">{quantity}</span>
           <button 
             onClick={handleIncrease} // Usa la función corregida que recibe el evento
             disabled={isIncrementDisabled}
             className={`bg-yellow-400 text-black px-3 py-2 transition-colors ${isIncrementDisabled ? 'opacity-50 cursor-not-allowed' : 'hover:bg-yellow-500'}`}
           >
             +
           </button>
        </div>
        
      </div>
      
    </div>
  );
};

export default QuickActionMenu;