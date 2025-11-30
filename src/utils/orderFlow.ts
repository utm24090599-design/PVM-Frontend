/**
 * Utilidades para manejar el flujo de órdenes según el PVM
 * Implementa los 4 pasos del proceso
 */
import type { Order } from '../components/types/orderTypes';
import { assignTokenToOrder, releaseToken } from './tokenManager';
import { createPaymentRegistry } from '../types/paymentRegistry';
import { createDeliveryRegistry } from '../types/deliveryRegistry';

/**
 * Paso 1: Crear orden de cliente (Receptionist)
 */
export function createClientOrder(
  clientName: string,
  items: Order['items'],
  totalOrder: number
): Order {
  return {
    orderId: `ORD-${Date.now()}`,
    clientName,
    totalOrder,
    items,
    status: 'PENDING',
    token: null,
    paymentStatus: 'PENDING',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    reservedUntil: null,
    inventoryReserved: false,
    paymentRequestCreated: false,
    deliveryOrderCreated: false,
  };
}

/**
 * Paso 2: Confirmar recogida y crear solicitud de pago (Inventory Manager)
 */
export function completeOrderRecollection(order: Order): Order {
  // Verificar que todos los items estén confirmados
  const allConfirmed = order.items.every(item => item.confirmedAvailable);
  
  if (!allConfirmed) {
    throw new Error('No todos los items están confirmados');
  }

  // Asignar token
  const token = assignTokenToOrder(order.orderId);
  if (!token) {
    throw new Error('No hay tokens disponibles');
  }

  // Crear registro de pago (guardado en backend)
  createPaymentRegistry(
    order.orderId,
    token,
    order.totalOrder,
    order.clientName
  );

  return {
    ...order,
    status: 'READY_FOR_PAYMENT',
    token,
    inventoryReserved: true,
    paymentRequestCreated: true,
    updatedAt: new Date().toISOString(),
  };
}

/**
 * Paso 3: Procesar pago (Sale Area)
 */
export function processPayment(
  order: Order,
  _paymentMethod: 'CASH' | 'CARD' | 'TRANSFER' | 'OTHER',
  _invoiceNumber?: string
): Order {
  if (!order.token) {
    throw new Error('La orden no tiene token asignado');
  }

  return {
    ...order,
    status: 'PAID',
    paymentStatus: 'PAID',
    deliveryOrderCreated: true,
    updatedAt: new Date().toISOString(),
  };
}

/**
 * Reservar orden por tiempo limitado (Sale Area)
 */
export function reserveOrderForPayment(
  order: Order,
  minutes: number = 30
): Order {
  if (!order.token) {
    throw new Error('La orden no tiene token asignado');
  }

  const reservedUntil = new Date();
  reservedUntil.setMinutes(reservedUntil.getMinutes() + minutes);

  return {
    ...order,
    status: 'PAYMENT_RESERVED',
    paymentStatus: 'RESERVED',
    reservedUntil: reservedUntil.toISOString(),
    updatedAt: new Date().toISOString(),
  };
}

/**
 * Cancelar orden y liberar inventario (Sale Area)
 */
export function cancelOrder(order: Order): Order {
  if (order.token) {
    releaseToken(order.token);
  }

  return {
    ...order,
    status: 'CANCELED',
    paymentStatus: 'CANCELED',
    inventoryReserved: false,
    updatedAt: new Date().toISOString(),
  };
}

/**
 * Paso 4: Procesar entrega (Delivery Area)
 */
export function processDelivery(order: Order, deliveredBy: string): Order {
  if (order.status !== 'PAID') {
    throw new Error('La orden debe estar pagada para procesar la entrega');
  }

  if (!order.token) {
    throw new Error('La orden no tiene token asignado');
  }

  // Crear registro de entrega (guardado en backend)
  createDeliveryRegistry(
    order.orderId,
    order.token!,
    order.clientName,
    deliveredBy
  );

  return {
    ...order,
    status: 'DELIVERED',
    updatedAt: new Date().toISOString(),
  };
}

/**
 * Actualizar estado de un item en la orden (Inventory Manager)
 */
export function updateOrderItem(
  order: Order,
  itemId: number,
  updates: Partial<Order['items'][0]>
): Order {
  return {
    ...order,
    items: order.items.map(item =>
      item.id === itemId ? { ...item, ...updates } : item
    ),
    updatedAt: new Date().toISOString(),
  };
}

/**
 * Confirmar disponibilidad de un item (Inventory Manager)
 */
export function confirmItemAvailability(
  order: Order,
  itemId: number,
  availableQuantity: number
): Order {
  const item = order.items.find(i => i.id === itemId);
  if (!item) {
    throw new Error('Item no encontrado');
  }

  const updates: Partial<Order['items'][0]> = {
    confirmedAvailable: true,
    collectedQuantity: Math.min(availableQuantity, item.requestedQuantity),
    inventoryReserved: true,
  };

  if (availableQuantity < item.requestedQuantity) {
    updates.stockIssue = `Solo hay ${availableQuantity} disponibles de ${item.requestedQuantity} solicitados`;
  }

  return updateOrderItem(order, itemId, updates);
}

