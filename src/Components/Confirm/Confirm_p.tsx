import React from "react"

export interface OrderItem {
  id: number
  title: string
  price: number
  quantity: number
  available: number
}

const OrderConfirmationModal: React.FC<{
  open: boolean
  items: OrderItem[]
  onConfirm: () => void
  onCancel: () => void
}> = ({ open, items, onConfirm, onCancel }) => {
  if (!open) return null

  return (
    <div style={styles.overlay}>
      <div style={styles.modal}>
        <h2>Confirmación de pedido</h2>

        {items.length === 0 ? (
          <p style={{ marginTop: 10, color: "#555" }}>
            No hay productos para mostrar
          </p>
        ) : (
          <div style={styles.list}>
            {items.map((item) => (
              <div key={item.id} style={styles.itemRow}>
                <div style={styles.itemInfo}>
                  <strong>{item.title}</strong>
                  <small>Cantidad: {item.quantity}</small>
                  <small>Disponible: {item.available}</small>
                </div>

                <div style={styles.priceInfo}>
                  <span>${item.price.toFixed(2)}</span>
                  <span>
                    Subtotal: {(item.price * item.quantity).toFixed(2)}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}

        <div style={styles.actions}>
          <button
            style={{ ...styles.button, background: "#1976d2" }}
            onClick={onConfirm}
          >
            Confirmar pedido
          </button>

          <button
            style={{ ...styles.button, background: "#777" }}
            onClick={onCancel}
          >
            Cancelar
          </button>
        </div>
      </div>
    </div>
  )
}

export default function OrderConfirmationPage() {
  const items: OrderItem[] = [] // Por ahora sin datos

  return (
    <OrderConfirmationModal
      open={true}
      items={items}
      onConfirm={() => console.log("confirmar pedido")}
      onCancel={() => console.log("cancelar")}
    />
  )
}


const styles = {
  overlay: {
    position: "fixed" as const,
    inset: 0,
    background: "rgba(0,0,0,0.5)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 4000,
  },
  modal: {
    background: "white",
    padding: "20px",
    borderRadius: "12px",
    width: "460px",
    boxShadow: "0 4px 20px rgba(0,0,0,0.3)",
  },
  list: {
    marginTop: "10px",
    display: "flex",
    flexDirection: "column" as const,
    gap: "12px",
  },
  itemRow: {
    display: "flex",
    justifyContent: "space-between",
    border: "1px solid #ddd",
    padding: "10px",
    borderRadius: "8px",
  },
  itemInfo: {
    display: "flex",
    flexDirection: "column" as const,
  },
  priceInfo: {
    display: "flex",
    flexDirection: "column" as const,
    textAlign: "right" as const,
  },
  actions: {
    marginTop: "20px",
    display: "flex",
    flexDirection: "column" as const,
    gap: "10px",
  },
  button: {
    padding: "12px",
    color: "white",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
    fontWeight: "bold",
  },
}
