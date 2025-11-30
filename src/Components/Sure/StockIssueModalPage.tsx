import React from "react"

export interface StockIssueItem {
  id: number
  title: string
  requestedQty: number
  availableQty: number
}

/* Modal */
const StockIssueModal: React.FC<{
  open: boolean
  issues: StockIssueItem[]
  onClose: () => void
  onAcceptAvailable: (items: StockIssueItem[]) => void
  onDiscard: (items: StockIssueItem[]) => void
}> = ({ open, issues, onClose, onAcceptAvailable, onDiscard }) => {
  if (!open) return null

  return (
    <div style={styles.overlay}>
      <div style={styles.modal}>
        <h2>Disponibilidad insuficiente</h2>

        {issues.length === 0 ? (
          <p style={{ marginTop: 10, color: "#555" }}>Sin datos por ahora</p>
        ) : (
          <>
            <ul>
              {issues.map((item) => (
                <li key={item.id}>
                  <strong>{item.title}</strong> Pedidos {item.requestedQty} Disponibles {item.availableQty}
                </li>
              ))}
            </ul>
          </>
        )}

        <div style={styles.actions}>
          <button
            style={{ ...styles.button, background: "#93aed1" }}
            onClick={() => onAcceptAvailable(issues)}
          >
            Usar cantidades disponibles
          </button>

          <button
            style={{ ...styles.button, background: "#f44336" }}
            onClick={() => onDiscard(issues)}
          >
            Quitar productos
          </button>

          <button
            style={{ ...styles.button, background: "#777" }}
            onClick={onClose}
          >
            Cerrar
          </button>
        </div>
      </div>
    </div>
  )
}

/* Página para pruebas */
export default function StockIssueModalPage() {
  const issues: StockIssueItem[] = []

  return (
    <div>
      <StockIssueModal
        open={true}
        issues={issues}
        onClose={() => console.log("Cerrar modal")}
        onAcceptAvailable={(items) => console.log("Aceptar disponibles", items)}
        onDiscard={(items) => console.log("Descartar items", items)}
      />
    </div>
  )
}

/* Estilos */
const styles = {
  overlay: {
    position: "fixed" as const,
    inset: 0,
    background: "rgba(0,0,0,0.5)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 2000,
  },
  modal: {
    background: "white",
    padding: "20px",
    borderRadius: "12px",
    width: "420px",
    boxShadow: "0 4px 20px rgba(0,0,0,0.3)",
  },
  actions: {
    marginTop: "20px",
    display: "flex",
    flexDirection: "column" as const,
    gap: "10px",
  },
  button: {
    padding: "12px",
    borderRadius: "8px",
    border: "none",
    cursor: "pointer",
    color: "white",
    fontWeight: "bold",
  },
}
