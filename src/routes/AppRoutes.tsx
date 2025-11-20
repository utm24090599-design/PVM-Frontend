// src/routes/AppRoutes.tsx

import { Routes, Route } from 'react-router-dom';
import LoginForm from '../Components/LoginScreen';
import Dashboard from '../pages/TestDashboard';
import ProtectedRoute from '../auth/ProtectedRoute';
import Form from '../form/form';
// ➡️ AÑADIR TU PÁGINA DE PRUEBA
import StockTestPage from '../pages/StockTestPage'; 

export default function AppRouter() {
  return (
    <Routes>
      
      {/* ➡️ AÑADIR RUTA TEMPORAL PARA TESTING ⬅️ */}
      <Route path="/test-stock" element={<StockTestPage />} />
      
      {/* Rutas originales de tu proyecto (NO MODIFICADAS) */}
      <Route path="/login" element={<LoginForm />} />
      <Route path="/register" element={<Form />} />
      <Route
        path="/"
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      />
      {/* <Route path="*" element={<NotFound />} /> */}
    </Routes>
  );
}