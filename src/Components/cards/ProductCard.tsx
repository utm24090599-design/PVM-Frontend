import React, { useState } from "react";
import CardBase from "./CardBase";
import StockBadge from "../feedback/StockBadge";

interface ProductCardProps {
  name: string;
  price: number;
  image?: string;
  description?: string;
  count?: number;
}

const ProductCard: React.FC<ProductCardProps> = ({
  name,
  price,
  image,
  description,
  count = 0,
}) => {

  const [hover, setHover] = useState(false);
  const [quantity, setQuantity] = useState(1);

  const isAvailable = count > 0;

  return (
    <div
      className="relative transition-opacity duration-200"
      style={{
        opacity: isAvailable ? 1 : 0.5,
      }}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      title={!isAvailable ? "Producto agotado" : ""}
    >

      <CardBase
        title={name}
        price={price}
        image={image}
        description={description}
        count={count}
      >
        {/* BADGE DE STOCK */}
        <div className="mt-2">
          <StockBadge count={count} />
        </div>

        {/* Botón normal cuando NO hay hover */}
        {!hover && (
          <button
            disabled={!isAvailable}
            className={`w-full mt-3 py-2 rounded-lg font-bold text-white transition 
              ${isAvailable ? "bg-blue-600 hover:bg-blue-700" : "bg-gray-400 cursor-not-allowed"}
            `}
          >
            {isAvailable ? "Ver producto" : "Agotado"}
          </button>
        )}
      </CardBase>

      {/* PANEL DE HOVER SOLO SI HAY STOCK */}
      {hover && isAvailable && (
        <div
          className="absolute inset-0 bg-black bg-opacity-60 rounded-xl flex flex-col justify-center items-center gap-4"
        >
          {/* CONTROL DE CANTIDAD */}
          <div className="flex items-center gap-4">
            <button
              onClick={() => setQuantity(Math.max(1, quantity - 1))}
              className="bg-white text-black px-4 py-2 rounded-lg text-xl font-bold"
            >
              –
            </button>

            <span className="text-white text-xl font-semibold">
              {quantity}
            </span>

            <button
              onClick={() => setQuantity(Math.min(count, quantity + 1))}
              className="bg-white text-black px-4 py-2 rounded-lg text-xl font-bold"
            >
              +
            </button>
          </div>

          {/* BOTÓN PAGAR */}
          <button
            className="w-4/5 py-2 bg-green-600 text-white font-bold rounded-lg hover:bg-green-700"
            onClick={() =>
              alert(`Pagando ${quantity} unidades de ${name}`)
            }
          >
            Ir a pagar
          </button>
        </div>
      )}
    </div>
  );
};

export default ProductCard;
