import { mockProducts } from "../utils/mockData";
import ProductCard from "./ProductCard";

export default function GridCatalogue() {
  // Mock data de productos
  const products = mockProducts;

  return (
    <div style={styles.grid}>
      {products.map((p) => (
        <ProductCard
          key={p.id}
          data={p}
        />          
      ))}
    </div>
  );
}

const styles = {
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
    gap: "4px",
    placeItems: "center",
  },
};
