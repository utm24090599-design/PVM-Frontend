import { Routes, Route } from 'react-router-dom';
import Login from '../pages/TestLogin';
import LoginForm from '../Components/LoginScreen';
import Dashboard from '../pages/TestDashboard';
// import NotFound from '../pages/NotFound';
import ProtectedRoute from '../auth/ProtectedRoute';
import Form from '../form/form';
import TestConnection from '../Components/Testconection';
import DemoFeedback from '../Components/DemoFeedback';

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
      {/* Test Routes for devs */}
      <Route path="/TestConn" element={<TestConnection />} />
      <Route path="/TestLogin" element={<Login />} />
      <Route path="/DemoFeedback" element={<DemoFeedback />} />
    </Routes>
  );
}