import React, { useState } from "react";

export interface StockIssueItem {
  id: number;
  title: string;
  requestedQty: number;
  availableQty: number;
}

const StockIssueModal: React.FC<{
  open: boolean;
  issues: StockIssueItem[];
  onClose: () => void;
  onAcceptAvailable: (items: StockIssueItem[]) => void;
  onDiscard: (items: StockIssueItem[]) => void;
}> = ({ open, issues, onClose, onAcceptAvailable, onDiscard }) => {
  if (!open) return null;

  return (
    <div style={styles.overlay}>
      <div style={styles.modal}>
        <h2>Disponibilidad insuficiente</h2>

        <p>Algunos productos no tienen suficiente stock:</p>

        <ul>
          {issues.map((item) => (
            <li key={item.id}>
              <strong>{item.title}</strong> — Pedidos: {item.requestedQty}, Disponibles:{" "}
              {item.availableQty}
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

          <button style={{ ...styles.button, background: "#777" }} onClick={onClose}>
            Cancelar
          </button>
        </div>
      </div>
    </div>
  );
};

const StockIssueTest: React.FC = () => {
  const [open, setOpen] = useState(false);

  const mockIssues: StockIssueItem[] = [
  //aqui se supone que va  aestar ligado a los productos
  ];

  return (
    <div style={{ padding: "40px" }}>
      <h1>Prueba del modal de stock</h1>

      <button
        onClick={() => setOpen(true)}
        style={{
          padding: "14px 30px",
          borderRadius: "10px",
          background: "#1976d2",
          color: "white",
          border: "none",
          cursor: "pointer",
        }}
      >
        Abrir modal de prueba
      </button>

      <StockIssueModal
        open={open}
        issues={mockIssues}
        onClose={() => setOpen(false)}
        onAcceptAvailable={(items) => {
          console.log("Usar cantidades disponibles:", items);
          alert("Se usarán las cantidades disponibles.");
          setOpen(false);
        }}
        onDiscard={(items) => {
          console.log("Descartar productos:", items);
          alert("Productos descartados del pedido.");
          setOpen(false);
        }}
      />
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
    zIndex: 9999,
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
};

export default StockIssueTest;
