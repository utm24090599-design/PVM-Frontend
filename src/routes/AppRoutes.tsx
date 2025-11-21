import { Routes, Route } from 'react-router-dom';
import Login from '../pages/TestLogin';
import LoginForm from '../Components/LoginScreen';
import Dashboard from '../pages/TestDashboard';
import ProtectedRoute from '../auth/ProtectedRoute';
import Form from '../form/form';
import GridCatalogue from '../catalogue/ProductGrid';
import TestConnection from '../Components/Testconection';
import DemoFeedback from '../Components/DemoFeedback';
import Principal from "../pages/PrincipalInterface";

export default function AppRouter() {
  return (
    <Routes>
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

      {/* Test Routes for devs */}
      <Route path="/TestConn" element={<TestConnection />} />
      <Route path="/TestLogin" element={<Login />} />
      <Route path="/DemoFeedback" element={<DemoFeedback />} />
      <Route path="/testDashboard" element={<Dashboard />} />
      <Route path="/Principal" element={<Principal />} />
      <Route path="/GridCatalogue" element={<GridCatalogue />} />
      <Route path="/form" element={<Form />} />
    </Routes>
  );
}