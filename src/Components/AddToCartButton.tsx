import React from "react";

type AddToCartButtonProps = {
  onAdd: () => void;
  disabled?: boolean;
  label?: string;
};

export default function AddToCartButton({
  onAdd,
  disabled = false,
  label = "Añadir al carrito",
}: AddToCartButtonProps) {
  return (
    <button
      onClick={onAdd}
      disabled={disabled}
      className={`px-3 py-2 rounded-md text-white ${
        disabled ? "bg-gray-400" : "bg-blue-600 hover:bg-blue-700"
      }`}
    >
      {label}
    </button>
  );
}