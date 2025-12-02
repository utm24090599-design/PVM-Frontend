/**
 * Configuración de variables de entorno
 */
export const config = {
  backendUrl: import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000/api',
  apiTimeout: 30000, // 30 segundos
  enableMockFallback: import.meta.env.VITE_ENABLE_MOCK_FALLBACK !== 'false', // Por defecto true
};

