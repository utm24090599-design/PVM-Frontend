// src/utils/mockOrders.ts

import type { Order, OrderItem } from '../Components/types/orderTypes';

/** @type {Order[]} */
export const mockOrders: Order[] = [
  {
    orderId: 'ORD-1001',
    clientName: 'Juan Pérez',
    totalOrder: '$250.00',
    items: [
      {
        id: 1,
        cartTitle: 'Tornillos de Anclaje',
        cartProductDescription: 'Acero Inoxidable, 50mm',
        price: 0.50,
        requestedQuantity: 100,
        availableStock: 80, // Menos de lo solicitado
        collectedQuantity: 0,
        isCollected: false,
        requiresModification: false,
      },
      {
        id: 2,
        cartTitle: 'Rollo de Cable CAT6',
        cartProductDescription: '300m, Cobre puro',
        price: 150.00,
        requestedQuantity: 1,
        availableStock: 1,
        collectedQuantity: 0,
        isCollected: false,
        requiresModification: true, // Requiere verificación o corte
      },
      {
        id: 3,
        cartTitle: 'Lámpara LED Industrial',
        cartProductDescription: 'Alta eficiencia, 100W',
        price: 99.50,
        requestedQuantity: 2,
        availableStock: 2,
        collectedQuantity: 0,
        isCollected: false,
        requiresModification: false,
      },
    ],
  },
  {
    orderId: 'ORD-1002',
    clientName: 'María García',
    totalOrder: '$45.00',
    items: [
      {
        id: 4,
        cartTitle: 'Guantes de Seguridad',
        cartProductDescription: 'Talla L, Reforzados',
        price: 15.00,
        requestedQuantity: 3,
        availableStock: 3,
        collectedQuantity: 0,
        isCollected: false,
        requiresModification: false,
      },
    ],
  },
];