export const saveAuth = (token: string, role: string): void => {
  localStorage.setItem('token', token);
  localStorage.setItem('role', role);
};

export const getAuth = (): { token: string | null; role: string | null } => {
  return {
    token: localStorage.getItem('token'),
    role: localStorage.getItem('role'),
  };
};

export const clearAuth = (): void => {
  localStorage.removeItem('token');
  localStorage.removeItem('role');
};