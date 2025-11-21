// src/utils/mockData.ts

export interface ProductData {
  id: number;
  title: string;
  price: number;
  count: number; // CLAVE para la lógica de disponibilidad
  description: string;
  colorVariables: boolean; // Para simular si tiene variables como color/talla
}

export const mockProducts: ProductData[] = [
  // Producto DISPONIBLE
  {
    id: 101,
    title: "Válvula Reguladora de Presión",
    price: 150.75,
    count: 10,
    description: "Modelo industrial de alta resistencia.",
    colorVariables: true,
  },
  // Producto AGOTADO
  {
    id: 102,
    title: "Sensor de Movimiento XYZ",
    price: 45.00,
    count: 0, 
    description: "Sensor con amplio rango de detección.",
    colorVariables: false,
  },
  // Producto DISPONIBLE (otro ejemplo)
  {
    id: 103,
    title: "Conector Rápido Tipo L",
    price: 5.99,
    count: 50,
    description: "Conector estándar para tuberías.",
    colorVariables: false,
  },
];