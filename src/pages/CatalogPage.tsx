/**
 * Página de Catálogo para Clientes
 * Muestra todos los productos disponibles
 */
import { useState, useEffect } from "react";
import { useAuth } from "../auth/UseAuth";
import GridCatalogue from "../catalogue/ProductGrid";
import { useNavigate } from "react-router-dom";
import { productsApi } from "../services/api";
import type { ProductData } from "../utils/mockData";

export default function CatalogPage() {
  const { role, logout } = useAuth();
  const navigate = useNavigate();
  const [products, setProducts] = useState<ProductData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    try {
      setLoading(true);
      setError(null);
      const productsData = await productsApi.getAll();
      setProducts(productsData);
    } catch (err) {
      setError('Error al cargar productos. Usando datos locales como respaldo.');
      console.error('Error loading products:', err);
      // Fallback a productos mock si falla el backend
      const { mockProducts } = await import('../utils/mockData');
      setProducts(mockProducts);
    } finally {
      setLoading(false);
    }
  };

  // Si no es cliente, redirigir
  if (role !== 'CLIENT') {
    return (
      <div className="p-6">
        <p>Esta página es solo para clientes.</p>
        <button className="px-4 py-2 bg-green-400 text-white rounded-lg hover:bg-green-500 transition" onClick={() => navigate("/app/dashboard")}>
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
        <div className="mb-6 flex justify-between items-center">
          <p className="text-gray-600">
            Explora nuestro catálogo de productos. Haz clic en cualquier producto para ver más detalles.
          </p>
          <button
            onClick={loadProducts}
            className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition text-sm"
            disabled={loading}
          >
            {loading ? 'Cargando...' : 'Actualizar'}
          </button>
        </div>
        
        {error && (
          <div className="bg-yellow-50 border-l-4 border-yellow-500 p-4 mb-6 rounded">
            <p className="text-yellow-700 text-sm">{error}</p>
          </div>
        )}

        {loading ? (
          <div className="text-center py-12">
            <p className="text-gray-500">Cargando productos...</p>
          </div>
        ) : (
          <GridCatalogue products={products.length > 0 ? products : undefined} />
        )}
      </main>
    </div>
  );
}

