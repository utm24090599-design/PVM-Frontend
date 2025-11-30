import React, { useState, useEffect } from "react";
import type { ProductData } from "../../utils/mockData";
import {
  updateProductQuantity,
  getSelectedProducts,
} from "../../utils/storage";
import { useNavigate } from "react-router-dom";
import PayButton from "../ui/PayButton";
import QuantitySelector from "../ui/QuantitySelector";

interface QuickActionMenuProps {
  data: ProductData;
  maxStock: number;
  onQuantityChange?: (quantity: number) => void;
}

// ⬅️ FUNCIÓN CLAVE: Detiene el evento para que no active la alerta de la tarjeta

const QuickActionMenu: React.FC<QuickActionMenuProps> = ({
  data,
  maxStock,
  onQuantityChange,
}) => {
  const [quantity, setQuantity] = useState(0);
  const navigate = useNavigate();

  const stopPropagation = (e: React.MouseEvent) => {
    e.stopPropagation();
  };

  // Cargar la cantidad guardada al montar
  useEffect(() => {
    const selectedProducts = getSelectedProducts();
    const currentProduct = selectedProducts.find((p) => p.id === data.id);
    if (currentProduct) {
      setQuantity(currentProduct.quantity);
    }
  }, [data.id]);

  const updateQuantity = (newQuantity: number) => {
    setQuantity(newQuantity);
    updateProductQuantity(data.id, newQuantity);
    if (onQuantityChange) onQuantityChange(newQuantity); // notifica al padre
  };

  // Manejadores que usan la función stopPropagation
  const handleIncrease = (e: React.MouseEvent) => {
    e.stopPropagation();
    const newQuantity = quantity < maxStock ? quantity + 1 : maxStock;
    updateQuantity(newQuantity);
  };

  const handleDecrease = (e: React.MouseEvent) => {
    e.stopPropagation();
    const newQuantity = quantity > 0 ? quantity - 1 : 0;
    updateQuantity(newQuantity);
  };

  // Lógica de Desactivación
  const isPayButtonDisabled = quantity === 0;
  // const hasVariants = data.colorVariables != false ? `${data.colorVariables}` : ``

  return (
    <div
      className="absolute inset-0 bg-white/95 backdrop-blur-sm p-4 flex flex-col justify-center items-center text-center transition-opacity duration-300 shadow-xl z-9"
      onClick={() => {
        navigate(`/app/itemDescription/${data.id}`);
      }}
    >
      {/* ... (información básica) ... */}

      <div className="flex items-center space-x-2 z-10">
        {/* PAYBUTTON CON VALIDACIÓN Y DETENCIÓN DE PROPAGACIÓN */}
        <PayButton
          OnClick={(e) => {
            stopPropagation(e);
            navigate("/app/payItems");
          }}
          IsPayButtonDisabled={isPayButtonDisabled}
        />

        {/* Contador de Cantidad (Con Detención de Propagación) */}
        <QuantitySelector
          quantity={quantity}
          onIncrease={handleIncrease}
          onDecrease={handleDecrease}
          isIncrementDisabled={quantity >= maxStock}
          isDecrementDisabled={quantity === 0}
          className="flex border border-yellow-500 rounded-lg overflow-hidden"
        />
      </div>
    </div>
  );
};

export default QuickActionMenu;
