/**
 * Sistema de gestión de tokens físicos para órdenes
 * Los tokens son tarjetas físicas con números que identifican órdenes diarias
 * Se resetean cada día
 */

const TOKEN_STORAGE_KEY = 'pvm_tokens';
const TOKEN_RESET_DATE_KEY = 'pvm_token_reset_date';

export interface Token {
  tokenNumber: string; // Número de la tarjeta física (ej. "001", "002")
  orderId: string | null; // ID de la orden asignada (null si está disponible)
  assignedAt: string | null; // Fecha de asignación
  isActive: boolean; // Si está en uso
}

/**
 * Obtiene todos los tokens del sistema
 */
export function getAllTokens(): Token[] {
  const stored = localStorage.getItem(TOKEN_STORAGE_KEY);
  if (!stored) {
    // Inicializar con tokens del 001 al 100
    const initialTokens: Token[] = Array.from({ length: 100 }, (_, i) => ({
      tokenNumber: String(i + 1).padStart(3, '0'),
      orderId: null,
      assignedAt: null,
      isActive: false,
    }));
    saveTokens(initialTokens);
    return initialTokens;
  }
  return JSON.parse(stored);
}

/**
 * Guarda todos los tokens
 */
function saveTokens(tokens: Token[]): void {
  localStorage.setItem(TOKEN_STORAGE_KEY, JSON.stringify(tokens));
}

/**
 * Obtiene la fecha del último reset
 */
function getLastResetDate(): string | null {
  return localStorage.getItem(TOKEN_RESET_DATE_KEY);
}

/**
 * Establece la fecha del último reset
 */
function setLastResetDate(date: string): void {
  localStorage.setItem(TOKEN_RESET_DATE_KEY, date);
}

/**
 * Verifica si es un nuevo día y resetea los tokens si es necesario
 */
export function checkAndResetTokensIfNeeded(): void {
  const today = new Date().toDateString();
  const lastReset = getLastResetDate();
  
  if (lastReset !== today) {
    resetAllTokens();
    setLastResetDate(today);
  }
}

/**
 * Resetea todos los tokens (se ejecuta cada día)
 */
export function resetAllTokens(): void {
  const tokens = getAllTokens();
  const resetTokens = tokens.map(token => ({
    ...token,
    orderId: null,
    assignedAt: null,
    isActive: false,
  }));
  saveTokens(resetTokens);
}

/**
 * Asigna un token disponible a una orden
 */
export function assignTokenToOrder(orderId: string): string | null {
  checkAndResetTokensIfNeeded();
  const tokens = getAllTokens();
  const availableToken = tokens.find(t => !t.isActive);
  
  if (!availableToken) {
    return null; // No hay tokens disponibles
  }
  
  availableToken.orderId = orderId;
  availableToken.assignedAt = new Date().toISOString();
  availableToken.isActive = true;
  
  saveTokens(tokens);
  return availableToken.tokenNumber;
}

/**
 * Libera un token (cuando se cancela o completa una orden)
 */
export function releaseToken(tokenNumber: string): void {
  const tokens = getAllTokens();
  const token = tokens.find(t => t.tokenNumber === tokenNumber);
  
  if (token) {
    token.orderId = null;
    token.assignedAt = null;
    token.isActive = false;
    saveTokens(tokens);
  }
}

/**
 * Obtiene el token asignado a una orden
 */
export function getTokenByOrderId(orderId: string): Token | null {
  const tokens = getAllTokens();
  return tokens.find(t => t.orderId === orderId) || null;
}

/**
 * Valida un token para entrega o pago
 */
export function validateToken(tokenNumber: string): Token | null {
  checkAndResetTokensIfNeeded();
  const tokens = getAllTokens();
  return tokens.find(t => t.tokenNumber === tokenNumber && t.isActive) || null;
}

/**
 * Obtiene el número de tokens disponibles
 */
export function getAvailableTokenCount(): number {
  checkAndResetTokensIfNeeded();
  const tokens = getAllTokens();
  return tokens.filter(t => !t.isActive).length;
}

