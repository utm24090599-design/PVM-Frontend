/**
 * Servicio de alto nivel para operaciones de órdenes
 * Encapsula la lógica de negocio y las llamadas API
 */
import { ordersApi, inventoryApi, paymentsApi, deliveryApi, tokensApi } from './api';
import type { Order, OrderItem } from '../components/types/orderTypes';
import type { CartItem } from '../types/cart';
import { productsApi } from './api';

/**
 * FASE 1: Crear orden desde el carrito (Receptionist/Client)
 */
export async function createOrderFromCart(
  clientName: string,
  cartItems: CartItem[]
): Promise<Order> {
  const items = cartItems.map(item => ({
    productId: item.id,
    quantity: item.quantity,
    price: item.price,
  }));

  return await ordersApi.create({
    clientName,
    items,
  });
}

/**
 * FASE 2: Confirmar disponibilidad de item (Inventory Manager)
 */
export async function confirmItemAvailability(
  orderId: string,
  itemId: number,
  availableQuantity: number
): Promise<OrderItem> {
  return await inventoryApi.confirmItem(orderId, itemId, {
    availableQuantity,
    collectedQuantity: Math.min(availableQuantity, 0), // Se actualiza cuando se recoge
  });
}

/**
 * FASE 2: Completar recolección y asignar token (Inventory Manager)
 */
export async function completeOrderRecollection(
  orderId: string,
  confirmedItems: Array<{
    itemId: number;
    availableQuantity: number;
    collectedQuantity: number;
  }>
): Promise<Order> {
  return await inventoryApi.completeRecollection(orderId, {
    orderId,
    items: confirmedItems,
  });
}

/**
 * FASE 3: Procesar pago (Sale Area)
 */
export async function processPayment(
  orderId: string,
  token: string,
  paymentMethod: 'CASH' | 'CARD' | 'TRANSFER' | 'OTHER',
  invoiceNumber?: string
): Promise<{ payment: any; order: Order }> {
  const payment = await paymentsApi.process({
    orderId,
    token,
    paymentMethod,
    invoiceNumber,
  });

  // Obtener la orden actualizada
  const order = await ordersApi.getById(orderId);

  return { payment, order };
}

/**
 * FASE 3: Reservar pago (Sale Area)
 */
export async function reservePayment(
  orderId: string,
  token: string,
  minutes: number = 30
): Promise<{ payment: any; order: Order }> {
  const payment = await paymentsApi.reserve({
    orderId,
    token,
    minutes,
  });

  const order = await ordersApi.getById(orderId);

  return { payment, order };
}

/**
 * FASE 3: Cancelar pago (Sale Area)
 */
export async function cancelPayment(
  orderId: string,
  token: string
): Promise<{ payment: any; order: Order }> {
  const payment = await paymentsApi.cancel(orderId, token);
  const order = await ordersApi.getById(orderId);

  return { payment, order };
}

/**
 * FASE 4: Procesar entrega (Delivery Area)
 */
export async function processDelivery(
  orderId: string,
  token: string,
  deliveredBy: string,
  itemsDelivered: Array<{
    itemId: number;
    deliveredQuantity: number;
  }>,
  materialsModified?: Array<{
    itemId: number;
    modificationType: 'CUT' | 'WEIGHT' | 'LENGTH' | 'OTHER';
    originalAmount: number;
    modifiedAmount: number;
    leftoverAmount: number;
    description: string;
  }>,
  leftoversReturned?: Array<{
    itemId: number;
    quantity: number;
    unit: 'UNITS' | 'KG' | 'M';
  }>
): Promise<{ delivery: any; order: Order }> {
  const delivery = await deliveryApi.process({
    orderId,
    token,
    deliveredBy,
    itemsDelivered,
    materialsModified,
    leftoversReturned,
  });

  const order = await ordersApi.getById(orderId);

  return { delivery, order };
}

/**
 * Obtener orden por token (para validación)
 */
export async function getOrderByToken(token: string): Promise<Order> {
  return await ordersApi.getByToken(token);
}

/**
 * Verificar stock de productos en el carrito
 */
export async function checkCartStock(cartItems: CartItem[]): Promise<Array<{
  productId: number;
  requested: number;
  available: number;
  hasIssue: boolean;
}>> {
  const checks = await Promise.all(
    cartItems.map(async (item) => {
      try {
        const stock = await productsApi.checkStock(item.id, item.quantity);
        return {
          productId: item.id,
          requested: item.quantity,
          available: stock.available,
          hasIssue: stock.available < item.quantity,
        };
      } catch (error) {
        return {
          productId: item.id,
          requested: item.quantity,
          available: 0,
          hasIssue: true,
        };
      }
    })
  );

  return checks;
}

