import ProductCard from "../../catalogue/ProductCard";
import { mockProducts, type ProductData } from "../../utils/mockData";

const CmponentProducCard = () => {

  return (
    <div
      className="relative flex flex-row gap-5"
    >
      {
        mockProducts.map((product: ProductData) => (
          
          <ProductCard
            key={product.id}
            data={product}
            onClick={() => alert(`Clic en producto: ${product.title}`)}
          />
        ))
      }
    </div>
  );
};

export default CmponentProducCard;
