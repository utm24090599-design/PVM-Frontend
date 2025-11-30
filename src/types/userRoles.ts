/**
 * Roles de usuario según el documento PVM
 */
export type UserRole = 
  | 'CLIENT'            // Cliente: Ve catálogo y hace pedidos
  | 'RECEPTIONIST'      // Recepcionista: Toma órdenes de clientes
  | 'INVENTORY_MANAGER' // Gestor de Inventario: Recoge materiales y confirma disponibilidad
  | 'DELIVERY_AREA'     // Área de Entrega: Procesa materiales para entrega
  | 'SALE_AREA';        // Área de Venta: Valida tokens y procesa pagos

/**
 * Información del usuario autenticado
 */
export interface User {
  id: string;
  username: string;
  role: UserRole;
  name: string;
}

/**
 * Permisos por rol
 */
export const RolePermissions = {
  CLIENT: {
    canViewCatalog: true,
    canCreateOrders: true,
    canViewOwnOrders: true,
    canViewInventory: false,
  },
  RECEPTIONIST: {
    canCreateOrders: true,
    canModifyOrders: true,
    canViewOrders: true,
    canCancelOrders: true,
    canViewInventory: true,
  },
  INVENTORY_MANAGER: {
    canCreateOrders: false,
    canModifyOrders: false,
    canViewOrders: true,
    canCollectItems: true,
    canConfirmAvailability: true,
    canReserveInventory: true,
    canViewInventory: true,
  },
  DELIVERY_AREA: {
    canCreateOrders: false,
    canModifyOrders: false,
    canViewOrders: true,
    canProcessDelivery: true,
    canModifyMaterials: true,
    canValidateToken: true,
    canViewInventory: true,
  },
  SALE_AREA: {
    canCreateOrders: false,
    canModifyOrders: false,
    canViewOrders: true,
    canProcessPayment: true,
    canValidateToken: true,
    canReservePayment: true,
    canCancelPayment: true,
  },
} as const;

