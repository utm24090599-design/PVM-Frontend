import ProductCard from "../Components/cards/ProductCard";

const CardsDemo = () => {
  return (
    <div
      style={{
        padding: "20px",
        display: "flex",
        gap: "20px",
        flexWrap: "wrap",
      }}
    >
      <ProductCard
        name="Producto ejemplo"
        price={99}
        description="Producto de prueba"
        image="https://via.placeholder.com/300"
      />

      <ProductCard
        name="Otro producto"
        price={149}
        description="Otro ejemplo"
        image="https://via.placeholder.com/300"
      />
    </div>
  );
};

export default CardsDemo;