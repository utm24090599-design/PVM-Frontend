// ...existing code...
export type ToastType = 'success' | 'error' | 'info'
export type ToastItem = { id: string; type: ToastType; message: string; timeout?: number }

export type ConfirmOptions = {
  title?: string
  message: string
  onConfirm: () => void
  onCancel?: () => void
  confirmText?: string
  cancelText?: string
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