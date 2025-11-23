type QuantityValidatorProps = {
  quantity: number;
  stock: number;
  setQuantity: (value: number) => void;
};

export default function QuantityValidator({
  quantity,
  stock,
  setQuantity,
}: QuantityValidatorProps) {
  const increase = () => {
    if (quantity < stock) {
      setQuantity(quantity + 1);
    }
  };

  const decrease = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  return (
    <div className="flex items-center gap-2">
      <button
        className="px-2 py-1 bg-gray-300 rounded"
        onClick={decrease}
      >
        -
      </button>

      <span className="px-3">{quantity}</span>

      <button
        className={`px-2 py-1 rounded ${
          quantity >= stock ? "bg-gray-400" : "bg-gray-300"
        }`}
        disabled={quantity >= stock}
        onClick={increase}
      >
        +
      </button>

      {quantity >= stock && (
        <p className="text-red-500 text-sm">No hay más existencias</p>
      )}
    </div>
  );
}

