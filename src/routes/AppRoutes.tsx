import { Routes, Route } from 'react-router-dom';
// import Login from '../pages/TestLogin';
import LoginForm from '../Components/LoginScreen';
import Dashboard from '../pages/TestDashboard';
// import NotFound from '../pages/NotFound';
import ProtectedRoute from '../auth/ProtectedRoute';
import Form from '../form/form';
import GridCatalogue from '../catalogue/ProductGrid';
import ProductCard from '../catalogue/ProductCard';

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
      {/* <Route path="*" element={<NotFound />} /> */}
      <Route path="/GridCatalogue" element={<GridCatalogue />} />
      <Route path="/form" element={<Form />} />
      <Route path="/card" element={<ProductCard />} />

    </Routes>
  );
}