// src/catalogue/ProductCard.tsx

import React, { useState } from "react";
// ➡️ IMPORTACIONES AJUSTADAS
import type { ProductData } from "../utils/mockData"; 
import StockBadge from "../Components/feedback/StockBadge"; 
import QuickActionMenu from "../Components/inputs/QuickActionMenu"; 

// ➡️ Definimos las props que debe recibir la tarjeta
interface ProductCardProps {
  data: ProductData; // El producto a mostrar
  onClick: (data: ProductData) => void; // Función para abrir la vista detallada
}

// ➡️ REEMPLAZA TU FUNCIÓN card() por esta
export default function ProductCard({ data, onClick }: ProductCardProps){
  const [isHovered, setIsHovered] = useState(false);
  
  // Lógica principal de disponibilidad
  const isAvailable = data.count > 0;
  
  // 1. Estilos Condicionales (Opacidad)
  const cardOpacity = isAvailable ? "opacity-100" : "opacity-50";
  // 2. Click Condicional (Desactivación de click)
  const clickability = isAvailable ? "cursor-pointer" : "cursor-default";
  
  // Handler para la desactivación del clic
  const handleCardClick = () => {
    if (isAvailable) {
      onClick(data); // Ejecuta la acción solo si está disponible
    }
  };

  const handleMouseEnter = () => { setIsHovered(true); };
  const handleMouseLeave = () => { setIsHovered(false); };

  // 3. Renderizado Condicional del Overlay (Hover)
  const renderQuickActionOverlay = () => {
    if (!isHovered) return null; // No mostrar nada si no hay hover

    if (isAvailable) {
      // CASO DISPONIBLE: Muestra el menú de acción rápida
      return <QuickActionMenu data={data} />;
    } else {
      // CASO AGOTADO: Muestra solo la nota de no disponible 
      return (
        <div className="absolute inset-0 bg-gray-900/80 text-white flex flex-col justify-center items-center transition-opacity duration-300">
          <p className="text-lg font-bold">Sin Stock</p>
          <p className="text-sm">No items available.</p>
        </div>
      );
    }
  };


  // Renderizado principal
  return (
    <div 
      className={`relative w-64 h-80 border rounded-lg shadow-md p-4 transition-all duration-300 ${cardOpacity} ${clickability}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={handleCardClick}
    >
      {/* Área de la Imagen y Detalles */}
      <div className="w-full h-3/5 bg-gray-200 flex items-center justify-center rounded mb-2">
        <span className="material-symbols-outlined text-4xl">image</span>
      </div>

      <h3 className="font-semibold text-sm truncate">{data.title}</h3>
      <p className="text-lg font-bold">${data.price.toFixed(2)}</p>

      {/* Uso de StockBadge */}
      <div className="mt-1">
        <StockBadge count={data.count} />
      </div>

      {/* Overlay Condicional */}
      {renderQuickActionOverlay()}
    </div>
  );
};