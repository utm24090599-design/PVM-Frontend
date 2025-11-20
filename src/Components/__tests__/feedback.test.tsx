import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom'
import { FeedbackProvider } from '../../contexts/FeedbackProvider'
import useFeedback from '../../hooks/useFeedback'

// Pequeño componente de prueba que usa el hook
function TestButtons() {
  const { showToast, showConfirm } = useFeedback()

  return (
    <>
      <button onClick={() => showToast({ type: 'success', message: 'Producto agregado' })}>
        Añadir producto
      </button>

      <button
        onClick={() =>
          showConfirm({
            title: 'Confirmar orden',
            message: '¿Deseas confirmar la orden?',
            icon: 'success',
            onConfirm: () => showToast({ type: 'success', message: 'Orden confirmada' }),
            onCancel: () => showToast({ type: 'info', message: 'Orden cancelada' })
          })
        }
      >
        Abrir confirm
      </button>
    </>
  )
}

describe('Feedback (toasts & modal)', () => {
  test('muestra toast al hacer click y muestra/ejecuta modal de confirmación', async () => {
    render(
      <FeedbackProvider>
        <TestButtons />
      </FeedbackProvider>
    )

    // 1) Mostrar toast directo
    fireEvent.click(screen.getByText('Añadir producto'))
    expect(await screen.findByText('Producto agregado')).toBeInTheDocument()
    const toastEl = screen.getByText('Producto agregado').closest('.toast')
    expect(toastEl).toBeTruthy()
    // verificar clase directamente
    expect(toastEl).toHaveClass('toast--success')

    // 2) Abrir modal y confirmar -> debe aparecer toast de confirmación
    fireEvent.click(screen.getByText('Abrir confirm'))
    expect(await screen.findByText('¿Deseas confirmar la orden?')).toBeInTheDocument()
    const confirmBtn = screen.getByRole('button', { name: /confirmar/i })
    fireEvent.click(confirmBtn)
    expect(await screen.findByText('Orden confirmada')).toBeInTheDocument()
  })
})