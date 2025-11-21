import React, { useState } from "react";

interface CardBaseProps {
  image?: string;
  title: string;
  price?: number | string;
  description?: string;
  count?: number;
  children?: React.ReactNode;
}

const CardBase: React.FC<CardBaseProps> = ({
  image,
  title,
  price,
  description,
  count,
  children
}) => {
  const [hover, setHover] = useState(false);
  const [quantity, setQuantity] = useState(1);

  const handleAdd = () => setQuantity((q) => q + 1);
  const handleRemove = () =>
    setQuantity((q) => (q > 0 ? q - 1 : 0));

  return (
    <div
      style={{
        width: "280px",
        background: "#f0f1f4",
        borderRadius: "20px",
        padding: "16px",
        position: "relative",
        boxShadow: "0 3px 10px rgba(0,0,0,0.15)",
        fontFamily: "'Comic Neue', cursive",
        overflow: "hidden"
      }}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      {/* Botón carrito */}
      <div
        style={{
          position: "absolute",
          top: "10px",
          right: "10px",
          width: "46px",
          height: "46px",
          background: "#b4efbc",
          borderRadius: "50%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          fontSize: "24px",
          cursor: "pointer",
          zIndex: 2
        }}
      >
        🛒
      </div>

      {/* Imagen */}
      <div
        style={{
          width: "100%",
          height: "200px",
          background: "#d9dde2",
          borderRadius: "14px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          overflow: "hidden"
        }}
      >
        {image ? (
          <img
            src={image}
            alt={title}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover"
            }}
          />
        ) : (
          <div style={{ fontSize: "60px", opacity: 0.3 }}>🖼️</div>
        )}
      </div>

      {/* Info */}
      <div style={{ marginTop: "14px" }}>
        <div style={{ fontWeight: "bold", fontSize: "1.2rem" }}>{title}</div>

        {price !== undefined && (
          <div style={{ fontWeight: "bold", fontSize: "1rem", marginTop: "4px" }}>
            ${price}
          </div>
        )}

        {description && (
          <div style={{ marginTop: "6px", fontSize: "0.95rem" }}>{description}</div>
        )}

        {count !== undefined && (
          <div style={{ marginTop: "8px", fontSize: "0.9rem" }}>
            Disponible: <strong>{count}</strong>
          </div>
        )}

        <div style={{ marginTop: "12px" }}>{children}</div>
      </div>

      {/* --- HOVER OVERLAY FUNCIONAL --- */}
      {hover && (
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            background: "rgba(0,0,0,0.55)",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            gap: "12px",
            transition: "0.3s",
            color: "#fff",
            zIndex: 3
          }}
        >
          {/* Selector + y - */}
          <div style={{ display: "flex", gap: "20px", alignItems: "center" }}>
            <button
              onClick={handleRemove}
              style={{
                width: "40px",
                height: "40px",
                borderRadius: "50%",
                background: "#73d7b2ff",
                border: "none",
                fontSize: "22px",
                cursor: "pointer"
              }}
            >
              –
            </button>

            <span style={{ fontSize: "22px", fontWeight: "bold" }}>
              {quantity}
            </span>

            <button
              onClick={handleAdd}
              style={{
                width: "40px",
                height: "40px",
                borderRadius: "50%",
                background: "#74bc9cff",
                border: "none",
                fontSize: "22px",
                cursor: "pointer"
              }}
            >
              +
            </button>
          </div>

          {/* Botón pagar */}
          <button
            style={{
              padding: "10px 22px",
              borderRadius: "10px",
              background: "#4caf50",
              color: "white",
              border: "none",
              fontWeight: "bold",
              cursor: "pointer",
              fontSize: "1rem"
            }}
            onClick={() => alert(`Pagar ${quantity} unidades de ${title}`)}
          >
            Pagar
          </button>
        </div>
      )}
    </div>
  );
};

export default CardBase;
