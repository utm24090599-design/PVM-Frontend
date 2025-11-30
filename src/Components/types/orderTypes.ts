/**
 * Define los estados posibles de una Orden.
 */
export type OrderStatus = 'PENDING' | 'IN_PROGRESS' | 'COMPLETED' | 'CANCELED';

/**
 * Define la estructura de un artículo dentro de una orden de recogida.
 * Se usará 'id' como identificador numérico único (en lugar del 'sku' que no existe).
 */
export interface OrderItem {
  id: number;
  cartTitle: string;
  cartProductDescription: string;
  price: number;
  requestedQuantity: number; // Cantidad solicitada (es la que se usa para la lógica de escasez)
  availableStock: number; 
  collectedQuantity: number; // Cantidad que el empleado ha marcado como recogida
  isCollected: boolean; // Estado de recogida
  requiresModification: boolean; // Indica si el producto requiere ajuste (ej. rollo de material)
  // Nota: Si usas 'sku' en otros archivos, deberías agregarlo aquí también, 
  // pero usaremos 'id' por ahora para resolver los errores previos.
}

/**
 * Define la estructura de una orden de recogida.
 * ✨ CORRECCIÓN: Se añade 'status: OrderStatus' para resolver el error.
 * ✨ CORRECCIÓN: Se añade 'totalOrder: number' para que puedas formatearlo a string (toFixed(2)).
 * (Tu código anterior manejaba totalOrder como string, pero para cálculos y toFixed es mejor que sea number).
 */
export interface Order {
  orderId: string; // Se mantiene como string (ej. "ORD-001")
  clientName: string;
  totalOrder: number; // Cambiado a number para cálculos y formateo
  items: OrderItem[];
  status: OrderStatus; // Nuevo campo requerido por tu código en OrderList.tsx
}


// --- Datos de Prueba (MOCK) ---
// ✨ Se define la estructura de datos simulados (mockOrders) para que OrderList pueda importarlos.
export const mockOrders: Order[] = [
  {
    orderId: "ORD-001",
    clientName: "Ana Gómez",
    totalOrder: 155.50,
    status: 'IN_PROGRESS',
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
      },
      {
        id: 103,
        cartTitle: "Rollo de vinilo rojo 10m",
        cartProductDescription: "Requiere corte a la medida exacta",
        price: 95.00,
        requestedQuantity: 1,
        availableStock: 1,
        collectedQuantity: 0,
        isCollected: false,
        requiresModification: true,
      },
    ],
  },
  {
    orderId: "ORD-002",
    clientName: "Roberto Fernández",
    totalOrder: 88.00,
    status: 'COMPLETED',
    items: [
      {
        id: 201,
        cartTitle: "Set de destornilladores (8 pcs)",
        cartProductDescription: "Mango ergonómico y punta magnética",
        price: 88.00,
        requestedQuantity: 1,
        availableStock: 1,
        collectedQuantity: 1,
        isCollected: true,
        requiresModification: false,
      },
    ],
  },
];