// src/pages/StockTestPage.tsx

import React from 'react';
import ProductCard from '../catalogue/ProductCard'; 
import { mockProducts } from '../utils/mockData'; 
import type { ProductData } from '../utils/mockData'; // ⬅️ Importamos el tipo para tipar la función

const StockTestPage: React.FC = () => {
  
  // TIPA el parámetro 'product' con ProductData
  const handleCardClick = (product: ProductData) => {
    alert(`Clic en producto: ${product.title}. Abriendo detalles de producto...`);
  };

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-6">Test de Renderizado Condicional de Stock</h1>
      <div className="flex space-x-6">
        {/* Renderizamos los productos mock, disponibles y agotados */}
        {mockProducts.map((product) => (
          <ProductCard 
            key={product.id} 
            data={product} 
            onClick={handleCardClick} 
          />
        ))}
      </div>
    </div>
  );
};

export default StockTestPage;