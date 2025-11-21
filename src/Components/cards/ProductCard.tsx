import React from "react";
import CardBase from "./CardBase";


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
  count
}) => {
  return (
    <CardBase
      title={name}
      price={price}
      image={image}
      description={description}
      count={count}
    >
      <button
        style={{
          width: "100%",
          padding: "10px",
          background: "#0066ff",
          border: "none",
          color: "#fff",
          borderRadius: "10px",
          cursor: "pointer",
          fontWeight: "bold"
        }}
      >
        Ver producto
      </button>
    </CardBase>
  );
};

export default ProductCard;