import { useState } from "react";
import { useNavigate } from "react-router-dom";
import type { ProductData } from "../utils/mockData";
import StockBadge from "../components/ui/StockBadge";
import QuickActionMenu from "../components/inputs/QuickActionMenu";
import AddToCartButton from "../components/ui/AddToCartButton";
import { useCart } from "../hooks/useCart";
import "../styles/ProductCard.css";

interface ProductCardProps {
  data: ProductData;
  onClick?: (data: ProductData) => void;
}

export default function ProductCard({ data, onClick }: ProductCardProps) {
  const navigate = useNavigate();
  const [isHovered, setIsHovered] = useState(false);
  const { addToCart } = useCart();
  const [cartQuantity, setCartQuantity] = useState(0);

  const isAvailable = data.count > 0;
  const cardOpacity = isAvailable ? "opacity-100" : "opacity-50";
  const clickability = isAvailable ? "cursor-pointer" : "cursor-default";

  const handleCardClick = () => {
    if (isAvailable) {
      if (onClick) {
        onClick(data);
      } else {
        // Navegar a la descripción del producto
        navigate(`/app/itemDescription/${data.id}`);
      }
    }
  };

  const renderQuickActionOverlay = () => {
    if (!isHovered) return null;
    if (isAvailable) {
      return <QuickActionMenu data={data} maxStock={data.count} onQuantityChange={(q) => setCartQuantity(q)}/>;
    }
    return (
      <div className="absolute inset-0 bg-gray-900/80 text-white flex flex-col justify-center items-center transition-opacity duration-300">
        <p className="text-lg font-bold">Sin Stock</p>
        <p className="text-sm">No items available.</p>
      </div>
    );
  };

  return (
    <div
      className={`relative w-64 h-80 border rounded-lg shadow-md p-4 transition-all duration-300 ${cardOpacity} ${clickability}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={handleCardClick}
    >
      {/* Botón de añadir al carrito */}
      <div 
        className="absolute top-2 right-2 z-10"
        onClick={(e) => e.stopPropagation()} // Detener propagación del evento
      >
        <AddToCartButton
          className={`cursor-${isAvailable ? "pointer" : "not-allowed"}`}
          onAdd={() => {
            if (cartQuantity > 0) {
              addToCart({
                id: data.id,
                name: data.title,
                price: data.price,
                quantity: cartQuantity
              });
            }
          }}
          disabled={!isAvailable || cartQuantity === 0}
        />
      </div>

      {/* Imagen y detalles */}
      <div className="w-full h-3/5 bg-gray-200 flex items-center justify-center rounded mb-2">
        <span className="material-symbols-outlined text-4xl">image</span>
      </div>

      <h3 className="font-semibold text-sm truncate">{data.title}</h3>
      <p className="text-lg font-bold">${data.price.toFixed(2)}</p>
      <p className="text-lg font-bold">{data.description}</p>

      <div className="mt-1">
        <StockBadge count={data.count} />
      </div>

      {renderQuickActionOverlay()}
    </div>
  );
}