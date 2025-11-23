export default function Modal({
  title,
  message,
  icon = 'info',
  confirmText = 'Confirmar',
  cancelText = 'Cancelar',
  onConfirm,
  onCancel
}: {
  title?: string
  message: string
  icon?: 'success' | 'error' | 'info'
  confirmText?: string
  cancelText?: string
  onConfirm: () => void
  onCancel: () => void
}) {
  return (
    <div className="feedback-modal-backdrop">
      <div className="feedback-modal" role="dialog" aria-modal="true">
        <div className={`modal__icon modal__icon--${icon}`}>
          {icon === 'success' && (
            <svg viewBox="0 0 24 24" className="icon" aria-hidden>
              <path d="M9 16.2L4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4z" fill="currentColor" />
            </svg>
          )}
          {icon === 'error' && (
            <svg viewBox="0 0 24 24" className="icon" aria-hidden>
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z" fill="currentColor" />
            </svg>
          )}
          {icon === 'info' && (
            <svg viewBox="0 0 24 24" className="icon" aria-hidden>
              <path d="M11 17h2v-6h-2v6zm0-8h2V7h-2v2zM12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z" fill="currentColor" />
            </svg>
          )}
        </div>

        {title && <h3 className="modal__title">{title}</h3>}
        <div className="modal__message">{message}</div>

        <div className="modal__actions">
          <button className="btn btn--primary" onClick={onConfirm}>
            {confirmText}
          </button>
          <button className="btn btn--ghost" onClick={onCancel}>
            {cancelText}
          </button>
        </div>
      </div>
    </div>
  )
}