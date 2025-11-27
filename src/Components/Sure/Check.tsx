import React from "react";

export interface StockIssueItem {
  id: number;
  title: string;
  requestedQty: number;
  availableQty: number;
}

interface StockIssueModalProps {
  open: boolean;
  issues: StockIssueItem[];
  onClose: () => void;
  onAcceptAvailable: (items: StockIssueItem[]) => void;
  onDiscard: (items: StockIssueItem[]) => void;
}

const StockIssueModal: React.FC<StockIssueModalProps> = ({
  open,
  issues,
  onClose,
  onAcceptAvailable,
  onDiscard,
}) => {
  if (!open) return null;

  return (
    <div style={styles.overlay}>
      <div style={styles.modal}>
        
        <h2>Disponibilidad insuficiente</h2>

        <p>Algunos productos no tienen suficiente stock:</p>

        <ul>
          {issues.map(item => (
            <li key={item.id}>
              <strong>{item.title}</strong> — Pedidos: {item.requestedQty}, Disponibles: {item.availableQty}
            </li>
          ))}
        </ul>

        <div style={styles.actions}>
          <button
            style={{ ...styles.button, background: "#4caf50" }}
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

          <button style={styles.button} onClick={onClose}>
            Cancelar
          </button>
        </div>
        
      </div>
    </div>
  );
};

const styles = {
  overlay: {
    position: "fixed" as const,
    inset: 0,
    background: "rgba(0,0,0,0.5)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  modal: {
    background: "white",
    padding: "20px",
    borderRadius: "12px",
    width: "420px",
  },
  actions: {
    marginTop: "20px",
    display: "flex",
    flexDirection: "column" as const,
    gap: "10px",
  },
  button: {
    padding: "10px",
    borderRadius: "8px",
    border: "none",
    cursor: "pointer",
    color: "white",
  },
};

export default StockIssueModal;
