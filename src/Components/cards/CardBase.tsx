import React from "react";

interface CardBaseProps {
  image?: string;
  title: string;
  price?: string | number;
  description?: string;
  status?: "active" | "inactive" | "sold" | "new" | string;
  children?: React.ReactNode;
}

const CardBase: React.FC<CardBaseProps> = ({
  image,
  title,
  price,
  description,
  status,
  children
}) => {
  return (
    <div
      style={{
        width: "260px",
        borderRadius: "12px",
        overflow: "hidden",
        boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
        background: "#fff",
        display: "flex",
        flexDirection: "column"
      }}
    >
      {image ? (
        <img
          src={image}
          alt={title}
          style={{ width: "100%", height: "160px", objectFit: "cover" }}
        />
      ) : (
        <div style={{ width: "100%", height: "160px", background: "#e2e2e2" }} />
      )}

      <div style={{ padding: "12px" }}>
        <h3 style={{ margin: 0, fontSize: "1.1rem", fontWeight: "bold" }}>
          {title}
        </h3>

        {price && (
          <p style={{ margin: "6px 0", fontWeight: "bold", color: "#333" }}>
            ${price}
          </p>
        )}

        {description && (
          <p style={{ margin: "6px 0", color: "#555", fontSize: "0.9rem" }}>
            {description}
          </p>
        )}

        {status && (
          <span
            style={{
              display: "inline-block",
              padding: "4px 8px",
              borderRadius: "6px",
              fontSize: "0.8rem",
              background:
                status === "active"
                  ? "#d1f7d6"
                  : status === "sold"
                  ? "#f7d1d1"
                  : "#e0e0e0"
            }}
          >
            {status.toUpperCase()}
          </span>
        )}

        <div style={{ marginTop: "10px" }}>{children}</div>
      </div>
    </div>
  );
};

export default CardBase;
