
import { Routes, Route } from 'react-router-dom';
import Login from '../pages/TestLogin';
import LoginForm from '../Components/LoginScreen';
import Dashboard from '../pages/TestDashboard';
import ProtectedRoute from '../auth/ProtectedRoute';
import Form from '../form/form';
import GridCatalogue from '../catalogue/ProductGrid';
import ProductCard from '../catalogue/ProductCard';

// ➡️ AÑADIR TU PÁGINA DE PRUEBA
import StockTestPage from '../pages/StockTestPage'; 
import TestConnection from '../Components/Testconection';
import DemoFeedback from '../Components/DemoFeedback';
import CardsDemo from '../Components/CardsDemo';
import OrderSummary from '../Components/OrderSummary';
export default function AppRouter() {
  return (
    <Routes>
      
      {/* ➡️ AÑADIR RUTA TEMPORAL PARA TESTING ⬅️ */}
      <Route path="/test-stock" element={<StockTestPage />} />
      <Route path="/cards-demo" element={<CardsDemo />} />
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
      <Route path="/GridCatalogue" element={<GridCatalogue />} />
      <Route path="/form" element={<Form />} />
      {/* <Route path="/card" element={<ProductCard />} /> */}

      {/* Test Routes for devs */}
      <Route path="/TestConn" element={<TestConnection />} />
      <Route path="/TestLogin" element={<Login />} />
      <Route path="/DemoFeedback" element={<DemoFeedback />} />
      <Route path="/OrderSummary" element={<OrderSummary products={[]} taxRate={0} />} />
      <Route path="/testDashboard" element={<Dashboard />} />
    </Routes>
  );
}