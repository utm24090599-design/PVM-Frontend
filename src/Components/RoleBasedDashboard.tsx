/**
 * Componente que muestra el dashboard apropiado según el rol del usuario
 */
import React from 'react';
import { useAuth } from '../auth/UseAuth';
import { useNavigate } from 'react-router-dom';
import ReceptionistPage from '../pages/ReceptionistPage';
import InventoryManagerPage from '../pages/InventoryManagerPage';
import SaleAreaPage from '../pages/SaleAreaPage';
import DeliveryAreaPage from '../pages/DeliveryAreaPage';
import type { UserRole } from '../types/userRoles';

export default function RoleBasedDashboard() {
  const { role } = useAuth();
  const navigate = useNavigate();

  if (!role) {
    return (
      <div className="p-6">
        <p>No hay rol asignado. Por favor, inicia sesión.</p>
        <button onClick={() => navigate("/login")} className="mt-4 px-4 py-2 bg-blue-600 text-white rounded">
          Ir al Login
        </button>
      </div>
    );
  }

  // Si es cliente, redirigir al catálogo
  if (role === 'CLIENT') {
    navigate("/app/catalog");
    return null;
  }

  const roleMap: Record<Exclude<UserRole, 'CLIENT'>, React.ComponentType> = {
    RECEPTIONIST: ReceptionistPage,
    INVENTORY_MANAGER: InventoryManagerPage,
    SALE_AREA: SaleAreaPage,
    DELIVERY_AREA: DeliveryAreaPage,
  };

  const DashboardComponent = roleMap[role as Exclude<UserRole, 'CLIENT'>];

  if (!DashboardComponent) {
    return (
      <div className="p-6">
        <p>Rol no reconocido: {role}</p>
      </div>
    );
  }

  return <DashboardComponent />;
}

