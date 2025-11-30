import { useState } from "react";
// Usamos 'import type' para importar solo las interfaces
import type { OrderItem, Order } from "../components/types/orderTypes";
// Importamos mockOrders que ahora viene del mismo archivo de tipos
import { mockOrders } from "../components/types/orderTypes";

// Importamos OrderList y OrderDetails del directorio 'components'
import OrderList from "../components/OrderList";
import OrderDetails from "../components/OrderDetails"; // ¡Ruta de importación corregida!
import { useAuth } from "../auth/UseAuth";
// import GridCatalogue from "../catalogue/ProductGrid";
// import OrderSection from '../components/OrderSection';
// import CheckoutPage from '../components/PntPn';

export default function TestDashboard() {
  const [selectedItem, setSelectedItem] = useState<OrderItem | null>(null);
  // Mantenemos orders aquí solo si quieres usarla más adelante, pero OrderList ya no la necesita.
  const [orders] = useState<Order[]>(mockOrders);

  // Aquí puedes agregar la lógica para encontrar la orden seleccionada (por si la necesitas)
  // const selectedOrder = selectedItem
  //   ? orders.find((order) =>
  //       order.items.some((item) => item.id === selectedItem.id)
  //     ) // ✨ CORRECCIÓN: Usar item.id en lugar de item.sku
  //   : null;

  const { role } = useAuth();

  return (
    <div className="">
      <h1>{role}</h1>
      <button
        type="button"
        onClick={() => {
          localStorage.removeItem("cart");
        }}
      >
        Remove items
      </button>
      {/* <GridCatalogue /> */}

      <div className="flex h-screen bg-gray-50 p-4 space-x-4">
        {/* Columna Izquierda: Lista de Órdenes y Artículos */}
        <div className="w-1/2 p-4 bg-white rounded-xl shadow-lg flex flex-col">
          <h1 className="text-3xl font-bold text-gray-800 mb-4 border-b pb-2">
            Dashboard de Recogida
          </h1>

          <OrderList
            selectedItem={selectedItem}
            onItemSelected={setSelectedItem}
          />
        </div>

        {/* Columna Derecha: Detalles del Artículo Seleccionado y Acciones */}
        <div className="w-1/2 p-4 bg-white rounded-xl shadow-lg">
          <h2 className="text-2xl font-semibold text-gray-700 mb-4 border-b pb-2">
            Detalle de Artículo Seleccionado
          </h2>

          <OrderDetails item={selectedItem} />
        </div>
      </div>
    </div>
  );
}
