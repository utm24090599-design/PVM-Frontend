import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { mockProducts } from "../utils/mockData";
import StockBadge from "../components/ui/StockBadge";
import PayButton from "../components/ui/PayButton";

// 1. Define el tipo de datos
type ProductData = {
  id: number; // ojo: si tus ids son números, tipa como number
  title: string;
  description: string;
  price: number;
  colors: string[];
  count: number;
};

export default function ItemDescription() {
  const products = mockProducts;
  // 2. Tipamos el param para que siempre sea string
  const { id } = useParams<{ id: string }>();
  const safeId = parseInt(id ?? "0", 10);

  // 3. Estado tipado correctamente: puede ser ProductData o null
  const [item, setItem] = useState<ProductData | null>(null);
  const [loading, setLoading] = useState(true);
  const [itemCount, setItemCount] = useState<ProductData | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Simulamos un fetch con el mock
    const found = mockProducts.find((i) => i.id === safeId) ?? null;
    const foundItemCount = products.find((i) => i.id === safeId) ?? null;

    setItemCount(foundItemCount);
    setItem(found);
    setLoading(false);
  }, [products, safeId]);

  if (loading) return <p>Cargando...</p>;
  if (!item) return <p>No se encontró el producto</p>;

  return (
    <div className="flex items-start gap-4">
      <div className="flex-none grid place-content-center grid-cols-1 h-auto grid-rows-1 gap-1 max-w-[calc(100dvw*.60)] w-[calc(100dvw*.50)] ">
        <div className=" w-full h-[600px]">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="24px"
            viewBox="0 -960 960 960"
            fill="#000000"
            className="h-full object-center object-cover"
          >
            <path d="M200-120q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h560q33 0 56.5 23.5T840-760v560q0 33-23.5 56.5T760-120H200Zm0-80h560v-560H200v560Zm40-80h480L570-480 450-320l-90-120-120 160Zm-40 80v-560 560Z" />
          </svg>
        </div>
        <div className="row-start-2 text-4xl  h-auto max-w-[calc(100dvw*.60)] w-[calc(100dvw*.50)] wrap-break-word">
          {item.description}
        </div>
      </div>
      <div className="flex-none grid grid-cols-1 w-[calc(100dvw*.50)] gap-2 h-auto *:m-0 *:p-0">
        <div className=" h-[100px] text-3xl text-center font-bold">
          <h1>{item.title}</h1>
        </div>
        <div className="text-3xl h-[60px] grid grid-cols-2 items-center">
          <div>Precio: {item.price}</div>
          <div>
            <PayButton
              OnClick={() => navigate("/Principal")}
              IsPayButtonDisabled={false}
            />
          </div>
        </div>
        <div className="h-[60px]">
          <StockBadge className="scale-[1.2]" count={itemCount?.count ?? 0} />
        </div>
        <div className="">
          {item.colors.map((color, index) => (
            <ul key={index} className="list-none text-4xl">
              <li>{color}</li>
            </ul>
          ))}
        </div>
      </div>
    </div>
  );
}
