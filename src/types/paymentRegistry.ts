/**
 * Registro de Pagos
 * Registra pagos para Collection Orders con detalles de facturación
 */
import type { PaymentStatus } from '../components/types/orderTypes';

export interface PaymentRegistry {
  paymentId: string; // ID único del pago
  orderId: string; // ID de la orden asociada
  token: string; // Token físico usado
  amount: number; // Monto pagado
  paymentMethod: 'CASH' | 'CARD' | 'TRANSFER' | 'OTHER'; // Método de pago
  status: PaymentStatus; // Estado del pago
  paidAt: string | null; // Fecha y hora del pago
  reservedUntil: string | null; // Fecha hasta cuando está reservado (si aplica)
  invoiceNumber?: string; // Número de factura
  clientName: string; // Nombre del cliente
  createdAt: string; // Fecha de creación del registro
  updatedAt: string; // Fecha de última actualización
}

/**
 * Crea un nuevo registro de pago
 */
export function createPaymentRegistry(
  orderId: string,
  token: string,
  amount: number,
  clientName: string
): PaymentRegistry {
  return {
    paymentId: `PAY-${Date.now()}`,
    orderId,
    token,
    amount,
    paymentMethod: 'CASH', // Por defecto
    status: 'PENDING',
    paidAt: null,
    reservedUntil: null,
    clientName,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
}

/**
 * Actualiza el estado de un pago
 */
export function updatePaymentStatus(
  payment: PaymentRegistry,
  status: PaymentStatus,
  paymentMethod?: PaymentRegistry['paymentMethod'],
  invoiceNumber?: string
): PaymentRegistry {
  return {
    ...payment,
    status,
    paymentMethod: paymentMethod || payment.paymentMethod,
    paidAt: status === 'PAID' ? new Date().toISOString() : payment.paidAt,
    invoiceNumber: invoiceNumber || payment.invoiceNumber,
    updatedAt: new Date().toISOString(),
  };
}

/**
 * Reserva un pago por tiempo limitado
 */
export function reservePayment(
  payment: PaymentRegistry,
  minutes: number = 30
): PaymentRegistry {
  const reservedUntil = new Date();
  reservedUntil.setMinutes(reservedUntil.getMinutes() + minutes);
  
  return {
    ...payment,
    status: 'RESERVED',
    reservedUntil: reservedUntil.toISOString(),
    updatedAt: new Date().toISOString(),
  };
}

