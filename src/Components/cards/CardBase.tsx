import React from "react";

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
  return (
    <div
      style={{
        width: "280px",
        background: "#f0f1f4",
        borderRadius: "20px",
        padding: "16px",
        position: "relative",
        boxShadow: "0 3px 10px rgba(0,0,0,0.15)",
        fontFamily: "'Comic Neue', cursive"
      }}
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
          cursor: "pointer"
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

      {/* Texto */}
      <div style={{ marginTop: "14px" }}>
        <div
          style={{
            fontWeight: "bold",
            fontSize: "1.2rem"
          }}
        >
          {title}
        </div>

        {price !== undefined && (
          <div
            style={{
              fontWeight: "bold",
              fontSize: "1rem",
              marginTop: "4px"
            }}
          >
            ${price}
          </div>
        )}

        {description && (
          <div
            style={{
              marginTop: "6px",
              fontSize: "0.95rem"
            }}
          >
            {description}
          </div>
        )}

        {count !== undefined && (
          <div style={{ marginTop: "8px", fontSize: "0.9rem" }}>
            Disponible: <strong>{count}</strong>
          </div>
        )}

        <div style={{ marginTop: "12px" }}>{children}</div>
      </div>
    </div>
  );
};

export default CardBase;