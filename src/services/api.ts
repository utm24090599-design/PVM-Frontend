/**
 * Servicio centralizado para comunicación con el backend
 * Todas las llamadas API se hacen a través de este servicio
 */
import axios, { type AxiosInstance, type AxiosError } from 'axios';
import type { Order, OrderItem } from '../components/types/orderTypes';
import type { PaymentRegistry } from '../types/paymentRegistry';
import type { DeliveryRegistry } from '../types/deliveryRegistry';
import type { ProductData } from '../utils/mockData';
import type { LocalUser } from '../utils/userStorage';

import { config } from '../config/env';

const BACKEND_URL = config.backendUrl;

// Crear instancia de axios con configuración base
const api: AxiosInstance = axios.create({
  baseURL: BACKEND_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor para agregar token de autenticación
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Interceptor para manejar errores
api.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
    if (error.response?.status === 401) {
      // Token expirado o inválido
      localStorage.removeItem('token');
      localStorage.removeItem('role');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// ============================================================
// AUTENTICACIÓN
// ============================================================

export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  token: string;
  user: {
    id: string;
    email: string;
    name: string;
    role: string;
  };
}

export interface RegisterRequest {
  nombre: string;
  email: string;
  password: string;
}

export const authApi = {
  login: async (data: LoginRequest): Promise<LoginResponse> => {
    const response = await api.post<LoginResponse>('/auth/login', data);
    return response.data;
  },

  register: async (data: RegisterRequest): Promise<LocalUser> => {
    const response = await api.post<LocalUser>('/auth/register', data);
    return response.data;
  },

  logout: async (): Promise<void> => {
    await api.post('/auth/logout');
  },
};

// ============================================================
// PRODUCTOS
// ============================================================

export const productsApi = {
  getAll: async (): Promise<ProductData[]> => {
    const response = await api.get<ProductData[]>('/products');
    return response.data;
  },

  getById: async (id: number): Promise<ProductData> => {
    const response = await api.get<ProductData>(`/products/${id}`);
    return response.data;
  },

  checkStock: async (productId: number, quantity: number): Promise<{
    available: number;
    partial: boolean;
    maxPartial: number;
  }> => {
    const response = await api.post(`/products/${productId}/check-stock`, { quantity });
    return response.data;
  },
};

// ============================================================
// ÓRDENES - FASE 1: Client Order (Receptionist)
// ============================================================

export interface CreateOrderRequest {
  clientName: string;
  items: Array<{
    productId: number;
    quantity: number;
    price: number;
  }>;
}

export const ordersApi = {
  // Crear nueva orden (Paso 1)
  create: async (data: CreateOrderRequest): Promise<Order> => {
    const response = await api.post<Order>('/orders', data);
    return response.data;
  },

  // Obtener todas las órdenes
  getAll: async (status?: string): Promise<Order[]> => {
    const params = status ? { status } : {};
    const response = await api.get<Order[]>('/orders', { params });
    return response.data;
  },

  // Obtener orden por ID
  getById: async (orderId: string): Promise<Order> => {
    const response = await api.get<Order>(`/orders/${orderId}`);
    return response.data;
  },

  // Obtener orden por token
  getByToken: async (token: string): Promise<Order> => {
    const response = await api.get<Order>(`/orders/token/${token}`);
    return response.data;
  },

  // Actualizar orden
  update: async (orderId: string, data: Partial<Order>): Promise<Order> => {
    const response = await api.put<Order>(`/orders/${orderId}`, data);
    return response.data;
  },

  // Cancelar orden
  cancel: async (orderId: string): Promise<Order> => {
    const response = await api.post<Order>(`/orders/${orderId}/cancel`);
    return response.data;
  },
};

// ============================================================
// INVENTARIO - FASE 2: Order Recollection (Inventory Manager)
// ============================================================

export interface ConfirmItemRequest {
  itemId: number;
  availableQuantity: number;
  collectedQuantity: number;
}

export interface CompleteRecollectionRequest {
  orderId: string;
  items: ConfirmItemRequest[];
}

export const inventoryApi = {
  // Confirmar disponibilidad de un item
  confirmItem: async (orderId: string, itemId: number, data: {
    availableQuantity: number;
    collectedQuantity: number;
  }): Promise<OrderItem> => {
    const response = await api.post<OrderItem>(
      `/orders/${orderId}/items/${itemId}/confirm`,
      data
    );
    return response.data;
  },

  // Completar recolección y asignar token (Paso 2)
  completeRecollection: async (orderId: string, data: CompleteRecollectionRequest): Promise<Order> => {
    const response = await api.post<Order>(
      `/orders/${orderId}/complete-recollection`,
      data
    );
    return response.data;
  },

  // Reservar inventario
  reserveInventory: async (orderId: string): Promise<void> => {
    await api.post(`/orders/${orderId}/reserve-inventory`);
  },

  // Liberar inventario reservado
  releaseInventory: async (orderId: string): Promise<void> => {
    await api.post(`/orders/${orderId}/release-inventory`);
  },
};

// ============================================================
// PAGOS - FASE 3: Payment (Sale Area)
// ============================================================

export interface ProcessPaymentRequest {
  orderId: string;
  token: string;
  paymentMethod: 'CASH' | 'CARD' | 'TRANSFER' | 'OTHER';
  invoiceNumber?: string;
}

export interface ReservePaymentRequest {
  orderId: string;
  token: string;
  minutes?: number;
}

export const paymentsApi = {
  // Procesar pago (Paso 3)
  process: async (data: ProcessPaymentRequest): Promise<PaymentRegistry> => {
    const response = await api.post<PaymentRegistry>('/payments/process', data);
    return response.data;
  },

  // Reservar pago por tiempo limitado
  reserve: async (data: ReservePaymentRequest): Promise<PaymentRegistry> => {
    const response = await api.post<PaymentRegistry>('/payments/reserve', data);
    return response.data;
  },

  // Cancelar pago
  cancel: async (orderId: string, token: string): Promise<PaymentRegistry> => {
    const response = await api.post<PaymentRegistry>(`/payments/cancel`, {
      orderId,
      token,
    });
    return response.data;
  },

  // Obtener registro de pago
  getByOrderId: async (orderId: string): Promise<PaymentRegistry> => {
    const response = await api.get<PaymentRegistry>(`/payments/order/${orderId}`);
    return response.data;
  },
};

// ============================================================
// ENTREGAS - FASE 4: Delivery (Delivery Area)
// ============================================================

export interface ProcessDeliveryRequest {
  orderId: string;
  token: string;
  deliveredBy: string;
  itemsDelivered: Array<{
    itemId: number;
    deliveredQuantity: number;
  }>;
  materialsModified?: Array<{
    itemId: number;
    modificationType: 'CUT' | 'WEIGHT' | 'LENGTH' | 'OTHER';
    originalAmount: number;
    modifiedAmount: number;
    leftoverAmount: number;
    description: string;
  }>;
  leftoversReturned?: Array<{
    itemId: number;
    quantity: number;
    unit: 'UNITS' | 'KG' | 'M';
  }>;
}

export const deliveryApi = {
  // Procesar entrega (Paso 4)
  process: async (data: ProcessDeliveryRequest): Promise<DeliveryRegistry> => {
    const response = await api.post<DeliveryRegistry>('/deliveries/process', data);
    return response.data;
  },

  // Obtener registro de entrega
  getByOrderId: async (orderId: string): Promise<DeliveryRegistry> => {
    const response = await api.get<DeliveryRegistry>(`/deliveries/order/${orderId}`);
    return response.data;
  },
};

// ============================================================
// TOKENS
// ============================================================

export const tokensApi = {
  // Validar token
  validate: async (tokenNumber: string): Promise<{
    tokenNumber: string;
    orderId: string | null;
    isActive: boolean;
  }> => {
    const response = await api.get(`/tokens/${tokenNumber}/validate`);
    return response.data;
  },

  // Obtener token por orden
  getByOrderId: async (orderId: string): Promise<{
    tokenNumber: string;
    orderId: string;
    isActive: boolean;
  }> => {
    const response = await api.get(`/tokens/order/${orderId}`);
    return response.data;
  },
};

export default api;

