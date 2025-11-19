import ProductCard from "./ProductCard";

export default function GridCatalogue() {
  
  const products = [
    {
      name: "Laptop Gaymer",
      price: 9,
      description: "Producto empeñable.",
      availability: true,
    },
    {
      name: "Mouse de cable inalambrico",
      price: 100009,
      description: "Aveces",
      availability: true,
    },
    {
      name: "Audífonos LowPro",
      price: 132,
      description: "Sonido de baja calidad.",
      availability: false,
    },
  ];

  return (
    <div style={styles.grid}>
      {products.map((p, i) => (
        <ProductCard
          key={i}
          name={p.name}
          price={p.price}
          description={p.description}
          availability={p.availability}
        />
      ))}
    </div>
  );
}

const styles = {
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(7, 1fr)",
    gap: "1px",
    padding: "1px",
  },
};
