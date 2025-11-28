import { mockProducts } from "../utils/mockData";
import ProductCard from "./ProductCard";

export default function GridCatalogue() {
  const products = mockProducts;

  return (
    <div className="grid grid-cols-[repeat(auto-fit,minmax(250px,1fr))]  place-items-center">
      {products.map((p) => (
        <ProductCard
          key={p.id}
          data={p}
        />          
      ))}
    </div>
  );
}
