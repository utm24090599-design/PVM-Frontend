export default function DeliveryView() {
  const deliveredItems = [
    { id: 1, name: "Laptop Dell XPS", quantity: 1, status: "Entregado" },
    { id: 2, name: "Mouse Logitech", quantity: 2, status: "Pendiente" },
    { id: 3, name: "Teclado Mecánico", quantity: 1, status: "Cancelado" },
  ];

  const cell = {
    border: "1px solid #ccc",
    padding: "8px",
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Bienes Entregados</h2>

      <table style={{ width: "100%", borderCollapse: "collapse", marginTop: "20px" }}>
        <thead>
          <tr style={{ background: "#eaeaea" }}>
            <th style={cell}>Producto</th>
            <th style={cell}>Cantidad</th>
            <th style={cell}>Estado</th>
          </tr>
        </thead>

        <tbody>
          {deliveredItems.map((item) => (
            <tr key={item.id}>
              <td style={cell}>{item.name}</td>
              <td style={cell}>{item.quantity}</td>
              <td style={cell}>{item.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
