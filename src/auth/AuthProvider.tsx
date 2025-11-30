import { useState, useEffect } from 'react';
import type { ReactNode } from 'react';
import { AuthContext } from './AuthContext';
import { saveAuth, getAuth, clearAuth } from '../utils/storage';
import { getCurrentUser, clearCurrentUser } from '../utils/userStorage';

interface Props {
  children: ReactNode;
}

export const AuthProvider = ({ children }: Props) => {
  const [token, setToken] = useState<string | null>(null);
  const [role, setRole] = useState<string | null>(null);

  useEffect(() => {
    // Primero intentar cargar desde userStorage (sistema local)
    const currentUser = getCurrentUser();
    if (currentUser) {
      setToken(`token-${currentUser.id}`);
      setRole(currentUser.role);
      saveAuth(`token-${currentUser.id}`, currentUser.role);
    } else {
      // Si no hay usuario local, intentar cargar desde storage tradicional
      const { token, role } = getAuth();
      if (token) {
        setToken(token);
        setRole(role);
      }
    }
  }, []);

  const login = (newToken: string, newRole: string) => {
    saveAuth(newToken, newRole);
    setToken(newToken);
    setRole(newRole);
  };

  const logout = () => {
    clearAuth();
    clearCurrentUser();
    setToken(null);
    setRole(null);
  };

  return (
    <AuthContext.Provider value={{ token, role, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};