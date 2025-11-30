import { Routes, Route, Navigate } from "react-router-dom";
import LoginForm from "../pages/LoginScreen";
import TestLogin from "../pages/TestLogin";
import Dashboard from "../pages/TestDashboard";
import Form from "../pages/form";
import MainLayout from "../layouts/MainLayout";
import ItemDescription from "../pages/ItemDescription";
import Principal from "../pages/PrincipalInterface";
import RoleBasedDashboard from "../components/RoleBasedDashboard";
import ReceptionistPage from "../pages/ReceptionistPage";
import InventoryManagerPage from "../pages/InventoryManagerPage";
import SaleAreaPage from "../pages/SaleAreaPage";
import DeliveryAreaPage from "../pages/DeliveryAreaPage";
import CatalogPage from "../pages/CatalogPage";
import CartPage from "../pages/CartPage";

export default function AppRouter() {
  return (
    <Routes>
      <Route path="/login" element={<LoginForm />} />
      <Route path="/test-login" element={<TestLogin />} />
      <Route path="/register" element={<Form />} />

      {/* Rutas bajo MainLayout */}
      <Route path="/app" element={<MainLayout />}>
        <Route path="dashboard" element={<RoleBasedDashboard />} />
        <Route path="catalog" element={<CatalogPage />} />
        <Route path="cart" element={<CartPage />} />
        <Route path="receptionist" element={<ReceptionistPage />} />
        <Route path="inventory" element={<InventoryManagerPage />} />
        <Route path="sale" element={<SaleAreaPage />} />
        <Route path="delivery" element={<DeliveryAreaPage />} />
        <Route path="itemDescription/:id" element={<ItemDescription />} />
        <Route path="payItems" element={<Principal />} />
        <Route path="old-dashboard" element={<Dashboard />} />
        <Route index element={<Navigate to="dashboard" replace />} />
      </Route>
      
      <Route path="/" element={<Navigate to="/test-login" replace />} />
    </Routes>
  );
}
