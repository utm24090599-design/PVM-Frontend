import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../auth/UseAuth';
import type { UserRole } from '../types/userRoles';

export default function Login() {
  const [role, setRole] = useState<UserRole>('RECEPTIONIST');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = () => {
    login('fake-token', role);
    navigate('/app/dashboard');
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Login PVM</h2>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Selecciona tu rol:
          </label>
          <select 
            title='select' 
            value={role} 
            onChange={(e) => setRole(e.target.value as UserRole)}
            className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="RECEPTIONIST">Recepcionista</option>
            <option value="INVENTORY_MANAGER">Gestor de Inventario</option>
            <option value="DELIVERY_AREA">Área de Entrega</option>
            <option value="SALE_AREA">Área de Venta</option>
          </select>
        </div>
        <button 
          onClick={handleLogin}
          className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition duration-150 font-semibold"
        >
          Iniciar Sesión
        </button>
      </div>
    </div>
  );
}