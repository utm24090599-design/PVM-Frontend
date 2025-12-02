import { mockProducts } from "../utils/mockData";
import ProductCard from "./ProductCard";
import type { ProductData } from "../utils/mockData";

interface GridCatalogueProps {
  products?: ProductData[]; // Productos desde props (backend)
}

export default function GridCatalogue({ products: productsProp }: GridCatalogueProps) {
  // Usar productos desde props si están disponibles, sino usar mock
  const products = productsProp || mockProducts;

  if (products.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500">No hay productos disponibles</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-[repeat(auto-fit,minmax(250px,1fr))] place-items-center gap-4">
      {products.map((p) => (
        <ProductCard
          key={p.id}
          data={p}
        />          
      ))}
    </div>
  );
}
