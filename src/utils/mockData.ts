// src/utils/mockData.ts

export interface ProductData {
  id: number;
  title: string;
  price: number;
  count: number; // CLAVE para la lógica de disponibilidad
  description: string;
  colorVariables: boolean; // Para simular si tiene variables como color/talla
  colors: string[]
}

// --- Generador de nombres aleatorios ---
const prefixes = ["Válvula", "Sensor", "Conector", "Regulador", "Adaptador", "Filtro", "Compresor"];
const types = ["de Presión", "de Movimiento", "Rápido", "Industrial", "Automático", "Estándar", "Electrónico"];
const suffixes = ["XYZ", "Tipo L", "Serie 200", "Pro", "Max", "Plus", "Eco"];

function generateRandomTitle(): string {
  const prefix = prefixes[Math.floor(Math.random() * prefixes.length)];
  const type = types[Math.floor(Math.random() * types.length)];
  const suffix = suffixes[Math.floor(Math.random() * suffixes.length)];
  return `${prefix} ${type} ${suffix}`;
}

const availableColors = ["Rojo", "Azul", "Verde", "Negro", "Blanco", "Amarillo", "Gris", "Naranja"];

function getRandomColors() {
  const numColors = Math.floor(Math.random() * availableColors.length) + 1;
  const shuffled = [...availableColors].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, numColors);
}

// --- Generador de productos ---
const products: ProductData[] = [];

for (let index = 0; index < 100; index++) {
  products.push({
    id: Math.floor(Math.random() * 1000) + 1,
    title: generateRandomTitle(), // 🔑 ahora el título es aleatorio
    price: parseFloat((Math.random() * 200).toFixed(2)), // precio aleatorio
    count: Math.floor(Math.random() * 100), // Cantidad aleatoria entre 0 y 100
    description: "Modelo industrial de alta resistencia.",
    colorVariables: Math.random() > 0.5, // true/false aleatorio
    colors: getRandomColors()
  });
}

// --- Mock inicial + productos generados ---
export const mockProducts: ProductData[] = [
  {
    id: 101,
    title: generateRandomTitle(),
    price: 150.75,
    count: 0,
    description: "Modelo industrial de alta resistencia.",
    colorVariables: true,
    colors: ["gray"]
  },
  {
    id: 102,
    title: generateRandomTitle(),
    price: 45.0,
    count: Math.floor(Math.random() * 100),
    description: "Sensor con amplio rango de detección.",
    colorVariables: false,
    colors: ["gray", "red"]
  },
  {
    id: 103,
    title: generateRandomTitle(),
    price: 5.99,
    count: Math.floor(Math.random() * 100),
    description: "Conector estándar para tuberías.",
    colorVariables: false,
    colors: []
  },
];

mockProducts.push(...products);
