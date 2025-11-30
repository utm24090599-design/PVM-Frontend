/**
 * Sistema de almacenamiento de usuarios locales
 * Guarda usuarios en localStorage para autenticación mock
 */

export interface LocalUser {
  id: string;
  nombre: string;
  email: string;
  password: string; // En producción esto debería estar hasheado
  role: 'CLIENT' | 'RECEPTIONIST' | 'INVENTORY_MANAGER' | 'DELIVERY_AREA' | 'SALE_AREA';
  createdAt: string;
}

const USERS_STORAGE_KEY = 'pvm_local_users';
const CURRENT_USER_KEY = 'pvm_current_user';

/**
 * Obtiene todos los usuarios guardados
 */
export function getAllUsers(): LocalUser[] {
  const stored = localStorage.getItem(USERS_STORAGE_KEY);
  if (!stored) {
    // Usuarios iniciales para testing
    const initialUsers: LocalUser[] = [
      {
        id: '1',
        nombre: 'Admin Recepcionista',
        email: 'receptionist@test.com',
        password: '123456',
        role: 'RECEPTIONIST',
        createdAt: new Date().toISOString(),
      },
      {
        id: '2',
        nombre: 'Admin Inventario',
        email: 'inventory@test.com',
        password: '123456',
        role: 'INVENTORY_MANAGER',
        createdAt: new Date().toISOString(),
      },
      {
        id: '3',
        nombre: 'Admin Venta',
        email: 'sale@test.com',
        password: '123456',
        role: 'SALE_AREA',
        createdAt: new Date().toISOString(),
      },
      {
        id: '4',
        nombre: 'Admin Entrega',
        email: 'delivery@test.com',
        password: '123456',
        role: 'DELIVERY_AREA',
        createdAt: new Date().toISOString(),
      },
    ];
    saveAllUsers(initialUsers);
    return initialUsers;
  }
  try {
    return JSON.parse(stored) as LocalUser[];
  } catch {
    return [];
  }
}

/**
 * Guarda todos los usuarios
 */
function saveAllUsers(users: LocalUser[]): void {
  localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(users));
}

/**
 * Crea un nuevo usuario
 */
export function createUser(
  nombre: string,
  email: string,
  password: string,
  role: LocalUser['role'] = 'CLIENT'
): LocalUser {
  const users = getAllUsers();
  
  // Verificar si el email ya existe
  if (users.some(u => u.email.toLowerCase() === email.toLowerCase())) {
    throw new Error('El email ya está registrado');
  }

  const newUser: LocalUser = {
    id: Date.now().toString(),
    nombre,
    email: email.toLowerCase(),
    password, // En producción debería estar hasheado
    role,
    createdAt: new Date().toISOString(),
  };

  users.push(newUser);
  saveAllUsers(users);
  return newUser;
}

/**
 * Busca un usuario por email
 */
export function findUserByEmail(email: string): LocalUser | null {
  const users = getAllUsers();
  return users.find(u => u.email.toLowerCase() === email.toLowerCase()) || null;
}

/**
 * Autentica un usuario (verifica email y password)
 */
export function authenticateUser(email: string, password: string): LocalUser | null {
  const user = findUserByEmail(email);
  if (!user) {
    return null;
  }
  
  // En producción, comparar con hash
  if (user.password !== password) {
    return null;
  }

  return user;
}

/**
 * Guarda el usuario actual en sesión
 */
export function setCurrentUser(user: LocalUser): void {
  localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(user));
}

/**
 * Obtiene el usuario actual de la sesión
 */
export function getCurrentUser(): LocalUser | null {
  const stored = localStorage.getItem(CURRENT_USER_KEY);
  if (!stored) return null;
  try {
    return JSON.parse(stored) as LocalUser;
  } catch {
    return null;
  }
}

/**
 * Limpia el usuario actual de la sesión
 */
export function clearCurrentUser(): void {
  localStorage.removeItem(CURRENT_USER_KEY);
}

