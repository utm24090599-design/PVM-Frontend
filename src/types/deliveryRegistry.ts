/**
 * Registro de Entregas
 * Registra las entregas de productos y verifica que coincidan con la Collection Order
 */
import type { OrderItem } from '../components/types/orderTypes';

export interface DeliveryRegistry {
  deliveryId: string; // ID único de la entrega
  orderId: string; // ID de la orden asociada
  token: string; // Token físico usado para validar
  itemsDelivered: DeliveryItem[]; // Items entregados con cantidades
  materialsModified: MaterialModification[]; // Materiales que fueron modificados (cortados, etc.)
  inventoryDeducted: boolean; // Si el inventario fue deducido
  deliveredAt: string | null; // Fecha y hora de la entrega
  deliveredBy: string; // ID del empleado que realizó la entrega
  clientName: string; // Nombre del cliente
  leftoversReturned: LeftoverItem[]; // Materiales sobrantes devueltos al inventario
  createdAt: string; // Fecha de creación del registro
  updatedAt: string; // Fecha de última actualización
}

export interface DeliveryItem {
  itemId: number; // ID del item de la orden
  requestedQuantity: number; // Cantidad solicitada
  deliveredQuantity: number; // Cantidad entregada
  matches: boolean; // Si coincide con lo solicitado
}

export interface MaterialModification {
  itemId: number; // ID del item modificado
  modificationType: 'CUT' | 'WEIGHT' | 'LENGTH' | 'OTHER'; // Tipo de modificación
  originalAmount: number; // Cantidad original
  modifiedAmount: number; // Cantidad después de modificación
  leftoverAmount: number; // Cantidad sobrante
  description: string; // Descripción de la modificación
}

export interface LeftoverItem {
  itemId: number; // ID del item
  quantity: number; // Cantidad sobrante
  unit: 'UNITS' | 'KG' | 'M'; // Unidad de medida
  returnedToInventory: boolean; // Si fue devuelto al inventario
}

/**
 * Crea un nuevo registro de entrega
 */
export function createDeliveryRegistry(
  orderId: string,
  token: string,
  clientName: string,
  deliveredBy: string
): DeliveryRegistry {
  return {
    deliveryId: `DEL-${Date.now()}`,
    orderId,
    token,
    itemsDelivered: [],
    materialsModified: [],
    inventoryDeducted: false,
    deliveredAt: null,
    deliveredBy,
    clientName,
    leftoversReturned: [],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
}

/**
 * Valida que los items entregados coincidan con la orden
 */
export function validateDeliveryItems(
  delivery: DeliveryRegistry,
  orderItems: OrderItem[]
): boolean {
  return delivery.itemsDelivered.every(delivered => {
    const orderItem = orderItems.find(item => item.id === delivered.itemId);
    if (!orderItem) return false;
    
    // Verificar que la cantidad entregada no exceda la solicitada
    return delivered.deliveredQuantity <= orderItem.requestedQuantity;
  });
}

/**
 * Marca la entrega como completada
 */
export function completeDelivery(
  delivery: DeliveryRegistry,
  itemsDelivered: DeliveryItem[],
  materialsModified: MaterialModification[] = [],
  leftoversReturned: LeftoverItem[] = []
): DeliveryRegistry {
  return {
    ...delivery,
    itemsDelivered,
    materialsModified,
    leftoversReturned,
    inventoryDeducted: true,
    deliveredAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
}

