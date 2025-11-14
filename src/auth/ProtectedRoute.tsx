import type { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from './UseAuth';

interface Props {
  children: ReactNode;
}

export default function ProtectedRoute({ children }: Props) {
  const { token } = useAuth();
  return token ? children : <Navigate to="/login" replace />;
}