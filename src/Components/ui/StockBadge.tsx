// src/Components/feedback/StockBadge.tsx

import React from 'react';

interface StockBadgeProps {
  count: number;
  className?: string
}

const StockBadge: React.FC<StockBadgeProps> = ({ count, className }) => {
  const isAvailable = count > 0;
  
  // Clases de Tailwind CSS para el estilo condicional
  const badgeClasses = isAvailable
    ? "bg-green-100 text-green-800 border-green-400" // Disponible (Verde)
    : "bg-red-100 text-red-800 border-red-400";     // Agotado (Rojo)

  const text = isAvailable ? `Disp.: ${count}` : "AGOTADO";

  return (
    <span 
      className={`inline-block px-2 py-0.5 text-xs font-semibold rounded-full border ${badgeClasses} transition-opacity duration-300 ${className} `}
    >
      {text}
    </span>
  );
};

export default StockBadge;