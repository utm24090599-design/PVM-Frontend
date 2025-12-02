/**
 * Página del Carrito de Compras
 * Muestra los productos agregados y permite modificar cantidades
 */
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../hooks/useCart";
import { useAuth } from "../auth/UseAuth";
import { mockProducts } from "../utils/mockData";
import type { CartItem } from "../types/cart";
import type { ProductData } from "../utils/mockData";
import PayButton from "../components/ui/PayButton";
import StockIssueModal, { type StockIssueItem } from "../components/modals/StockIssueModal";
// import { useInventoryReservation } from "../hooks/useInventoryReservation";

interface CartItemWithProduct extends CartItem {
  product?: ProductData;
}

export default function CartPage() {
  const navigate = useNavigate();
  const { cart, updateQuantity, removeFromCart } = useCart();
  const { role, logout } = useAuth();
  const [stockIssues, setStockIssues] = useState<StockIssueItem[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isCheckingStock, setIsCheckingStock] = useState(false);
  // const { checkAvailability } = useInventoryReservation();

  // Enriquecer los items del carrito con información del producto
  const cartItemsWithProducts: CartItemWithProduct[] = cart.map(item => {
    const product = mockProducts.find(p => p.id === item.id);
    return {
      ...item,
      product,
    };
  });

  // Calcular el total
  const total = cartItemsWithProducts.reduce((sum, item) => {
    return sum + (item.price * item.quantity);
  }, 0);

  const handleQuantityChange = (id: number, newQuantity: number) => {
    if (newQuantity <= 0) {
      removeFromCart(id);
    } else {
      // Obtener el producto para verificar stock disponible
      const product = mockProducts.find(p => p.id === id);
      if (product) {
        // Limitar la cantidad al stock disponible
        const maxQuantity = product.count;
        const finalQuantity = Math.min(newQuantity, maxQuantity);
        updateQuantity(id, finalQuantity);
      } else {
        updateQuantity(id, newQuantity);
      }
    }
  };

  const handleIncrease = (item: CartItemWithProduct) => {
    const currentQuantity = item.quantity;
    const maxQuantity = item.product?.count || 999;
    if (currentQuantity < maxQuantity) {
      handleQuantityChange(item.id, currentQuantity + 1);
    }
  };

  const handleDecrease = (item: CartItemWithProduct) => {
    const currentQuantity = item.quantity;
    if (currentQuantity > 1) {
      handleQuantityChange(item.id, currentQuantity - 1);
    } else {
      removeFromCart(item.id);
    }
  };

  // Función para verificar el stock de todos los productos antes de proceder al pago
  const handleProceedToPayment = async () => {
    setIsCheckingStock(true);
    const issues: StockIssueItem[] = [];

    try {
      // Verificar stock de cada producto en el carrito usando el backend
      for (const item of cartItemsWithProducts) {
        try {
          const { checkCartStock } = await import('../services/orderService');
          const stockCheck = await checkCartStock([item]);
          const check = stockCheck[0];
          
          if (check.hasIssue) {
            issues.push({
              id: item.id,
              title: item.product?.title || item.name || `Producto #${item.id}`,
              requestedQty: item.quantity,
              availableQty: check.available,
            });
          }
        } catch (err) {
          // Si falla la verificación, marcar como problema
          issues.push({
            id: item.id,
            title: item.product?.title || item.name || `Producto #${item.id}`,
            requestedQty: item.quantity,
            availableQty: 0,
          });
        }
      }

      // Si hay problemas de stock, mostrar el modal
      if (issues.length > 0) {
        setStockIssues(issues);
        setIsModalOpen(true);
        setIsCheckingStock(false);
        return;
      }

      // Si todo está bien, proceder al pago
      navigate("/app/payItems");
    } catch (err) {
      console.error('Error checking stock:', err);
      alert('Error al verificar el stock. Intenta nuevamente.');
    } finally {
      setIsCheckingStock(false);
    }
  };

  // Manejar cuando el usuario acepta usar las cantidades disponibles
  const handleAcceptAvailable = (items: StockIssueItem[]) => {
    items.forEach((issue) => {
      if (issue.availableQty > 0) {
        // Ajustar la cantidad al stock disponible
        updateQuantity(issue.id, issue.availableQty);
      } else {
        // Si no hay stock, eliminar el producto
        removeFromCart(issue.id);
      }
    });
    setIsModalOpen(false);
    setStockIssues([]);
  };

  // Manejar cuando el usuario decide quitar los productos sin stock
  const handleDiscard = (items: StockIssueItem[]) => {
    items.forEach((issue) => {
      removeFromCart(issue.id);
    });
    setIsModalOpen(false);
    setStockIssues([]);
  };

  if (cart.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 p-6">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-lg shadow-md p-12 text-center">
            <span className="material-symbols-outlined text-6xl text-gray-400 mb-4">
              shopping_cart
            </span>
            <h2 className="text-2xl font-bold text-gray-700 mb-2">Tu carrito está vacío</h2>
            <p className="text-gray-500 mb-6">Agrega productos desde el catálogo</p>
            <button
              onClick={() => navigate("/app/catalog")}
              className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-semibold"
            >
              Ver Catálogo
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <div className="flex justify-between items-center">
            <h1 className="text-3xl font-bold text-gray-800">Carrito de Compras</h1>
            <div className="flex gap-4">
              <button
                onClick={() => navigate("/app/catalog")}
                className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition"
              >
                Continuar Comprando
              </button>
              {role === 'CLIENT' && (
                <button
                  onClick={logout}
                  className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
                >
                  Cerrar Sesión
                </button>
              )}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Lista de Productos */}
          <div className="lg:col-span-2 space-y-4">
            {cartItemsWithProducts.map((item) => (
              <div
                key={item.id}
                className="bg-white rounded-lg shadow-md p-6 flex flex-col sm:flex-row gap-4"
              >
                {/* Imagen del producto */}
                <div className="w-full sm:w-32 h-32 bg-gray-200 rounded-lg flex items-center justify-center flex-shrink-0">
                  <span className="material-symbols-outlined text-4xl text-gray-400">
                    image
                  </span>
                </div>

                {/* Información del producto */}
                <div className="flex-1">
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">
                    {item.product?.title || item.name || `Producto #${item.id}`}
                  </h3>
                  <p className="text-sm text-gray-600 mb-2">
                    {item.product?.description || "Sin descripción"}
                  </p>
                  <p className="text-lg font-bold text-blue-600">
                    ${item.price.toFixed(2)} c/u
                  </p>
                  {item.product && (
                    <p className="text-xs text-gray-500 mt-1">
                      Stock disponible: {item.product.count}
                    </p>
                  )}
                </div>

                {/* Controles de cantidad */}
                <div className="flex flex-col items-end justify-between sm:w-32">
                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="text-red-500 hover:text-red-700 mb-2"
                    title="Eliminar producto"
                  >
                    <span className="material-symbols-outlined">delete</span>
                  </button>

                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => handleDecrease(item)}
                      className="w-10 h-10 rounded-lg border-2 border-gray-300 hover:border-blue-500 hover:bg-blue-50 flex items-center justify-center transition"
                      disabled={item.quantity <= 1}
                    >
                      <span className="material-symbols-outlined text-gray-600">remove</span>
                    </button>

                    <input
                      type="number"
                      min="1"
                      max={item.product?.count || 999}
                      value={item.quantity}
                      onChange={(e) => {
                        const newQuantity = parseInt(e.target.value) || 1;
                        handleQuantityChange(item.id, newQuantity);
                      }}
                      className="w-16 text-center border-2 border-gray-300 rounded-lg py-2 font-semibold focus:border-blue-500 focus:outline-none"
                    />

                    <button
                      onClick={() => handleIncrease(item)}
                      className="w-10 h-10 rounded-lg border-2 border-gray-300 hover:border-blue-500 hover:bg-blue-50 flex items-center justify-center transition"
                      disabled={item.quantity >= (item.product?.count || 999)}
                    >
                      <span className="material-symbols-outlined text-gray-600">add</span>
                    </button>
                  </div>

                  <p className="text-lg font-bold text-gray-800 mt-2">
                    ${(item.price * item.quantity).toFixed(2)}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Resumen del pedido */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-md p-6 sticky top-6">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">Resumen del Pedido</h2>

              <div className="space-y-3 mb-4">
                <div className="flex justify-between text-gray-600">
                  <span>Subtotal ({cart.length} {cart.length === 1 ? 'producto' : 'productos'})</span>
                  <span className="font-semibold">${total.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Impuestos</span>
                  <span className="font-semibold">$0.00</span>
                </div>
                <div className="border-t border-gray-300 pt-3 mt-3">
                  <div className="flex justify-between text-xl font-bold text-gray-800">
                    <span>Total</span>
                    <span className="text-blue-600">${total.toFixed(2)}</span>
                  </div>
                </div>
              </div>

              <PayButton 
                onClick={handleProceedToPayment}
                isPayButtonDisabled={isCheckingStock || cart.length === 0}
                className="w-full"
              >
                {isCheckingStock ? "Verificando\nstock..." : "Pagar"}
              </PayButton>

              <button
                onClick={() => navigate("/app/catalog")}
                className="w-full py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition"
              >
                Continuar Comprando
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Modal de problemas de stock */}
      <StockIssueModal
        open={isModalOpen}
        issues={stockIssues}
        onClose={() => setIsModalOpen(false)}
        onAcceptAvailable={handleAcceptAvailable}
        onDiscard={handleDiscard}
      />
    </div>
  );
}

