import React from "react";

type QuantitySelectorProps = {
  quantity: number;
  onIncrease: (e: React.MouseEvent<HTMLButtonElement>) => void;
  onDecrease: (e: React.MouseEvent<HTMLButtonElement>) => void;
  isIncrementDisabled?: boolean;
  isDecrementDisabled?: boolean;
  className?: string;
};

const QuantitySelector: React.FC<QuantitySelectorProps> = ({
  quantity,
  onIncrease,
  onDecrease,
  isIncrementDisabled = false,
  isDecrementDisabled = false,
  className = "",
}) => {
  return (
    <div className={`${className}`}>
      <button
        onClick={onDecrease}
        disabled={isDecrementDisabled}
        className={`bg-yellow-400 text-black px-3 py-2 transition-colors ${
          isDecrementDisabled
            ? "opacity-50 cursor-not-allowed"
            : "hover:bg-yellow-500"
        }`}
      >
        -
      </button>

      <span className="px-3 py-2 text-sm font-medium">{quantity}</span>

      <button
        onClick={onIncrease}
        disabled={isIncrementDisabled}
        className={`bg-yellow-400 text-black px-3 py-2 transition-colors ${
          isIncrementDisabled
            ? "opacity-50 cursor-not-allowed"
            : "hover:bg-yellow-500"
        }`}
      >
        +
      </button>
    </div>
  );
};

export default QuantitySelector;
