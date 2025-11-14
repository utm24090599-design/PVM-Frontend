import { Routes, Route } from 'react-router-dom';
import Login from '../pages/TestLogin';
import Dashboard from '../pages/TestDashboard';
// import NotFound from '../pages/NotFound';
import ProtectedRoute from '../auth/ProtectedRoute';

export default function AppRouter() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
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