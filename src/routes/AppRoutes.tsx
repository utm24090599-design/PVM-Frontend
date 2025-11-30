import { Routes, Route } from "react-router-dom";
import LoginForm from "../pages/LoginScreen";
import Dashboard from "../pages/TestDashboard";
// import ProtectedRoute from "../auth/ProtectedRoute";
import Form from "../pages/form";
import MainLayout from "../layouts/MainLayout";
import ItemDescription from "../pages/ItemDescription";
import Principal from "../pages/PrincipalInterface";

export default function AppRouter() {
  return (
    <Routes>
      <Route path="/login" element={<LoginForm />} />
      <Route path="/register" element={<Form />} />
      {/* <Route element={<ProtectedRoute />}>
        <Route path="/" element={<MainLayout />}>
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="itemDescription/:id" element={<ItemDescription />} />
        </Route>
      </Route> */}

      {/* Rutas bajo MainLayout */}
      <Route path="/app" element={<MainLayout />}>
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="itemDescription/:id" element={<ItemDescription />} />
        <Route path="payItems" element={<Principal />} />
      </Route>
    </Routes>
  );
}
