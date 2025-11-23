import { Routes, Route } from "react-router-dom";
import LoginForm from "../pages/LoginScreen";
import Dashboard from "../pages/TestDashboard";
import ProtectedRoute from "../auth/ProtectedRoute";
import Form from "../pages/form";
import GridCatalogue from "../catalogue/ProductGrid";
import MainLayout from "../layouts/MainLayout";

export default function AppRouter() {
  return (
    <Routes>
      <Route path="/login" element={<LoginForm />} />
      <Route path="/register" element={<Form />} />
      <Route
        element={
          <ProtectedRoute>
             <Route path="/" element={<MainLayout />}>
             </Route>
          </ProtectedRoute>
        }
      />

      {/* Rutas bajo MainLayout */}
      <Route path="/app" element={<MainLayout />}>
        <Route path="dashboard" element={<Dashboard />} />
        {/* aquí puedes agregar más hijos */}
        <Route path="catalogue" element={<GridCatalogue />} />
      </Route>
    </Routes>
  );
}