/**
 * Define los estados posibles de una Orden según el flujo del PVM.
 */
export type OrderStatus = 
  | 'PENDING'       // Paso 1: Orden creada, esperando recogida
  | 'IN_PROGRESS'   // Paso 2: En proceso de recogida
  | 'READY_FOR_PAYMENT' // Paso 2 completado: Lista para pago, token asignado
  | 'PAYMENT_PENDING'   // Paso 3: Esperando pago
  | 'PAYMENT_RESERVED'  // Paso 3: Reservado por tiempo limitado
  | 'PAID'              // Paso 3: Pagado, listo para entrega
  | 'READY_FOR_DELIVERY'// Paso 4: Listo para entrega
  | 'DELIVERED'         // Paso 4: Entregado
  | 'CANCELED';         // Cancelada

/**
 * Estados de pago
 */
export type PaymentStatus = 
  | 'PENDING'    // Pendiente de pago
  | 'RESERVED'   // Reservado por tiempo limitado
  | 'PAID'       // Pagado
  | 'CANCELED';   // Cancelado

/**
 * Unidades de medida para inventario
 */
export type InventoryUnit = 'UNITS' | 'KG' | 'M';

/**
 * Define la estructura de un artículo dentro de una orden de recogida.
 * Se usará 'id' como identificador numérico único (en lugar del 'sku' que no existe).
 */
export interface OrderItem {
  id: number; // ID único del producto
  cartTitle: string; // Nombre del producto
  cartProductDescription: string; // Descripción del producto
  price: number; // Precio unitario
  requestedQuantity: number; // Cantidad solicitada por el cliente
  availableStock: number; // Stock disponible en inventario
  collectedQuantity: number; // Cantidad que el empleado ha marcado como recogida
  isCollected: boolean; // Estado de recogida
  requiresModification: boolean; // Indica si el producto requiere ajuste (ej. rollo de material)
  inventoryReserved: boolean; // Indica si el inventario está reservado para este ítem
  confirmedAvailable: boolean; // Confirmado por Inventory Manager
  unit: InventoryUnit; // Unidad de medida (UNITS, KG, M)
  stockIssue?: string; // Problema reportado con el stock (si hay escasez)
  // Puedes añadir este flag si quieres un control explícito:
  // isCutRegistered?: boolean; 
}

/**
 * Define la estructura de una orden de recogida según el PVM.
 * Incluye todos los campos necesarios para el flujo completo de 4 pasos.
 */
export interface Order {
  orderId: string; // ID único de la orden (ej. "ORD-001")
  clientName: string; // Nombre del cliente
  totalOrder: number; // Total de la orden en número para cálculos
  items: OrderItem[]; // Lista de artículos de la orden
  status: OrderStatus; // Estado actual de la orden en el flujo
  token?: string | null; // Token físico asignado (número de tarjeta física)
  paymentStatus?: PaymentStatus; // Estado del pago
  createdAt: string; // Fecha de creación de la orden
  updatedAt: string; // Fecha de última actualización
  reservedUntil?: string | null; // Fecha hasta cuando está reservada (si aplica)
  inventoryReserved: boolean; // Indica si el inventario está reservado
  paymentRequestCreated: boolean; // Indica si se creó la solicitud de pago
  deliveryOrderCreated: boolean; // Indica si se creó la orden de entrega
}

// -------------------------------------------------------------
// ✨ NUEVO TIPO PARA LA ACTIVIDAD DE CORTE PARCIAL
// -------------------------------------------------------------

/**
 * Define la estructura de datos que se enviará al Backend para registrar un corte parcial.
 */
export interface PartialCutData {
  itemId: number;
  deliveredQuantity: number; // Cantidad final entregada al cliente (el corte)
  leftoverQuantity: number; // Cantidad sobrante que vuelve al inventario
}

// --- Datos de Prueba (MOCK) ---
// ✨ Se define la estructura de datos simulados (mockOrders) para que OrderList pueda importarlos.
export const mockOrders: Order[] = [
  {
    orderId: "ORD-001",
    clientName: "Ana Gómez",
    totalOrder: 155.50,
    status: 'PENDING',
    token: null,
    paymentStatus: 'PENDING',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    reservedUntil: null,
    inventoryReserved: false,
    paymentRequestCreated: false,
    deliveryOrderCreated: false,
    items: [
      {
        id: 101,
        cartTitle: "Cable HDMI Premium 2m",
        cartProductDescription: "Cable de alta velocidad con conectores dorados",
        price: 15.50,
        requestedQuantity: 2,
        availableStock: 2,
        collectedQuantity: 0,
        isCollected: false,
        requiresModification: false,
        inventoryReserved: false,
        confirmedAvailable: false,
        unit: 'UNITS',
      },
      {
        id: 102,
        cartTitle: "Filtro de aire para motor",
        cartProductDescription: "Filtro de alta eficiencia para modelos 2018-2022",
        price: 45.00,
        requestedQuantity: 1,
        availableStock: 0, // Escasez
        collectedQuantity: 0,
        isCollected: false,
        requiresModification: false,
        inventoryReserved: false,
        confirmedAvailable: false,
        unit: 'UNITS',
        stockIssue: 'Producto no disponible en inventario',
      },
      {
        id: 103,
        cartTitle: "Rollo de vinilo rojo 10m",
        cartProductDescription: "Requiere corte a la medida exacta",
        price: 95.00,
        requestedQuantity: 1,
        availableStock: 1,
        // Asumiendo que se recogió todo el rollo inicial (10 metros)
        collectedQuantity: 10, 
        isCollected: false,
        requiresModification: true,
        inventoryReserved: false,
        confirmedAvailable: false,
        unit: 'M',
      },
    ],
  },
  {
    orderId: "ORD-002",
    clientName: "Roberto Fernández",
    totalOrder: 88.00,
    status: 'PENDING',
    token: null,
    paymentStatus: 'PENDING',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    reservedUntil: null,
    inventoryReserved: false,
    paymentRequestCreated: false,
    deliveryOrderCreated: false,
    items: [
      {
        id: 201,
        cartTitle: "Set de destornilladores (8 pcs)",
        cartProductDescription: "Mango ergonómico y punta magnética",
        price: 88.00,
        requestedQuantity: 1,
        availableStock: 1,
        collectedQuantity: 0,
        isCollected: false,
        requiresModification: false,
        inventoryReserved: false,
        confirmedAvailable: false,
        unit: 'UNITS',
      },
    ],
  },
];