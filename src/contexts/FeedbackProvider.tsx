import React, { createContext, useCallback, useContext, useState } from 'react'
import Toasts from '../Components/Toast'
import Modal from '../Components/Modal'
import '../styles/feedback.css'

type ToastType = 'success' | 'error' | 'info'
type ToastItem = { id: string; type: ToastType; message: string; timeout?: number }

type ConfirmOptions = {
  title?: string
  message: string
  onConfirm: () => void
  onCancel?: () => void
  confirmText?: string
  cancelText?: string
  icon?: 'success' | 'error' | 'info'
}

type FeedbackContextValue = {
  showToast: (t: { type: ToastType; message: string; timeout?: number }) => void
  showConfirm: (opts: ConfirmOptions) => void
}

const FeedbackContext = createContext<FeedbackContextValue | undefined>(undefined)

export const FeedbackProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [toasts, setToasts] = useState<ToastItem[]>([])
  const [modal, setModal] = useState<ConfirmOptions | null>(null)

  const showToast = useCallback((t: { type: ToastType; message: string; timeout?: number }) => {
    const id = Date.now().toString() + Math.random().toString(36).slice(2, 8)
    const item: ToastItem = { id, ...t }
    setToasts((s) => [...s, item])
    const ttl = t.timeout ?? 4000
    setTimeout(() => {
      setToasts((s) => s.filter((x) => x.id !== id))
    }, ttl)
  }, [])

  const showConfirm = useCallback((opts: ConfirmOptions) => {
    setModal(opts)
  }, [])

  const closeModal = useCallback(() => setModal(null), [])

  const contextValue: FeedbackContextValue = {
    showToast,
    showConfirm
  }

  return (
    <FeedbackContext.Provider value={contextValue}>
      {children}
      <Toasts items={toasts} onRemove={(id) => setToasts((s) => s.filter((x) => x.id !== id))} />
      {modal && (
        <Modal
          title={modal.title}
          message={modal.message}
          icon={modal.icon ?? 'info'}
          confirmText={modal.confirmText}
          cancelText={modal.cancelText}
          onConfirm={() => {
            modal.onConfirm()
            closeModal()
          }}
          onCancel={() => {
            modal.onCancel?.()
            closeModal()
          }}
        />
      )}
    </FeedbackContext.Provider>
  )
}

export const useFeedbackContext = () => {
  const ctx = useContext(FeedbackContext)
  if (!ctx) throw new Error('useFeedbackContext must be used within FeedbackProvider')
  return ctx
}