/**
 * Página de Catálogo para Clientes
 * Muestra todos los productos disponibles
 */
import { useAuth } from "../auth/UseAuth";
import GridCatalogue from "../catalogue/ProductGrid";
import { useNavigate } from "react-router-dom";

export default function CatalogPage() {
  const { role, logout } = useAuth();
  const navigate = useNavigate();

  // Si no es cliente, redirigir
  if (role !== 'CLIENT') {
    return (
      <div className="p-6">
        <p>Esta página es solo para clientes.</p>
        <button onClick={() => navigate("/app/dashboard")}>
          Ir al Dashboard
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <h1 className="text-3xl font-bold text-gray-800">Catálogo de Productos</h1>
            <div className="flex items-center gap-4">
              <button
                onClick={() => navigate("/app/cart")}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
              >
                Ver Carrito
              </button>
              <button
                onClick={logout}
                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
              >
                Cerrar Sesión
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Catálogo */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-6">
          <p className="text-gray-600">
            Explora nuestro catálogo de productos. Haz clic en cualquier producto para ver más detalles.
          </p>
        </div>
        <GridCatalogue />
      </main>
    </div>
  );
}

