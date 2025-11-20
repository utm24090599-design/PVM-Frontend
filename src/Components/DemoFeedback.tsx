import React from 'react'
import useFeedback from '../hooks/useFeedback'
//import './demo-feedback.css' // opcional: crea este archivo si quieres estilos locales

export default function DemoFeedback() {
  const { showToast, showConfirm } = useFeedback()

  const addMany = () => {
    const types = ['success', 'info', 'error'] as const
    for (let i = 0; i < 4; i++) {
      const type = types[i % types.length]
      showToast({ type, message: `${type.toUpperCase()} — Toast #${i + 1}` })
    }
  }

  return (
    <div style={{ padding: 16, display: 'flex', gap: 8, flexWrap: 'wrap' }}>
      <button onClick={() => showToast({ type: 'success', message: 'Producto agregado' })}  className='bg-green-500 text-white px-4 py-2 rounded-md'>
        Mostrar success
      </button>

      <button onClick={() => showToast({ type: 'info', message: 'Información rápida' })}  className='bg-blue-500 text-white px-4 py-2 rounded-md'>
        Mostrar info
      </button>

      <button onClick={() => showToast({ type: 'error', message: 'Error: falta de stock' })}  className='bg-red-500 text-white px-4 py-2 rounded-md'>
        Mostrar error
      </button>

      <button onClick={() => addMany()}  className='bg-purple-500 text-white px-4 py-2 rounded-md'>Cola: varios toasts</button>

      <button
        onClick={() =>
          showConfirm({
            title: 'Confirmar orden',
            message: '¿Deseas confirmar la orden ahora?',
            icon: 'success',
            confirmText: 'Sí, confirmar',
            cancelText: 'No',
            onConfirm: () => showToast({ type: 'success', message: 'Orden confirmada' }),
            onCancel: () => showToast({ type: 'info', message: 'Acción cancelada' })
          })
        }
        className='bg-blue-500 text-white px-4 py-2 rounded-md'
      >
        Abrir modal de confirmación
      </button>
    </div>
  )
}