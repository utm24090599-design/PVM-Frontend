import React, { useCallback, useState, useContext } from 'react' // ✨ Añadir useContext
import Toasts from '../Components/toasts/Toast'
import Modal from '../Components/modals/Modal'
import '../styles/feedback.css'
// import types + context from the new file
import { FeedbackContext } from '../contexts/feedbackContext'
import type { ToastItem, ConfirmOptions, FeedbackContextValue, ToastType } from '../contexts/feedbackContext'

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
          
          icon={modal.icon as any ?? 'info'} 
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

// Exportamos el hook 'useFeedback' para que pueda ser importado
export const useFeedback = () => {
  const context = useContext(FeedbackContext);
  if (context === undefined) {
    throw new Error('useFeedback debe usarse dentro de un FeedbackProvider');
  }
  return context;
};