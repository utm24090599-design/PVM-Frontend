// ...existing code...

// ✨ RESTAURADO: ToastType solo incluye los tipos que el componente Toast.tsx maneja visualmente
export type ToastType = 'success' | 'error' | 'info' 

export type ToastItem = { 
  id: string; 
  type: ToastType; 
  message: string; 
  timeout?: number 
}

// ✨ RESTAURADO: ConfirmIconType solo incluye los tipos que el componente Modal.tsx maneja visualmente
// Nota: Aquí se elimina el alias ConfirmIconType y se usa la unión original
export type ConfirmOptions = {
  title?: string
  message: string
  onConfirm: () => void
  onCancel?: () => void
  confirmText?: string
  cancelText?: string
  // RESTAURADO: Íconos limitados a los que el Modal.tsx original acepta
  icon?: 'success' | 'error' | 'info' 
}

export type FeedbackContextValue = {
  showToast: (t: { type: ToastType; message: string; timeout?: number }) => void
  showConfirm: (opts: ConfirmOptions) => void
}

// export context (no React component / JSX here)
import { createContext } from 'react'
export const FeedbackContext = createContext<FeedbackContextValue | undefined>(undefined)

// ...existing code...