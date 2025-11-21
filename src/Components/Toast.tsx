import React from 'react'

type ToastType = 'success' | 'error' | 'info'
type ToastItem = { id: string; type: ToastType; message: string }

export default function Toasts({
  items,
  onRemove
}: {
  items: ToastItem[]
  onRemove: (id: string) => void
}) {
  return (
    <div className="feedback-toast-wrapper" aria-live="polite">
      {items.map((t) => (
        <div key={t.id} className={`toast toast--${t.type}`} role="status">
          <div className="toast__icon">
            {t.type === 'success' && (
              <svg viewBox="0 0 24 24" className="icon icon--success" aria-hidden>
                <path d="M9 16.2L4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4z" fill="currentColor" />
              </svg>
            )}
            {t.type === 'error' && (
              <svg viewBox="0 0 24 24" className="icon icon--error" aria-hidden>
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z" fill="currentColor" />
              </svg>
            )}
            {t.type === 'info' && (
              <svg viewBox="0 0 24 24" className="icon icon--info" aria-hidden>
                <path d="M11 17h2v-6h-2v6zm0-8h2V7h-2v2zM12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z" fill="currentColor" />
              </svg>
            )}
          </div>
          <div className="toast__body">
            <div className="toast__message">{t.message}</div>
          </div>
          <button className="toast__close" onClick={() => onRemove(t.id)} aria-label="Cerrar">
            ×
          </button>
        </div>
      ))}
    </div>
  )
}