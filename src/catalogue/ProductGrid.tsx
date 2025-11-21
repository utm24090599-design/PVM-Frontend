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
    {
      name: "Moto de limon",
      price: 51,
      description: "Producto 100% empeñable",
      availability: true,
    },
    {
      name: "Bodrio",
      price: 99,
      description: "si",
      availability: false,
    },
    {
      name: "Borren a limon",
      price: 89,
      description: "aaaa",
      availability: true,

    },
      {
      name: "Borren a limon",
      price: 89,
      description: "aaaa",
      availability: true,

    },
      {
      name: "Borren a limon",
      price: 89,
      description: "aaaa",
      availability: true,

    },
      {
      name: "Borren a limon",
      price: 89,
      description: "aaaa",
      availability: true,

    }
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
    gridTemplateColumns: "repeat(6, 2fr)",
    gap: "1px",
    padding: "1px",
  },
};
