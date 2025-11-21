interface ProductCardProps {
  image?: string;
  name?: string;
  price?: number;
  description?: string;
  availability?: boolean;
  empeñable?: string;
}

export default function ProductCard({
  image,
  name = "Empty",
  price = 0,
  description = "No description",
  availability = false,

}: ProductCardProps) {

  const placeholder =
    "https://imgs.search.brave.com/r9EFCg-q_at3UIIhoShHQILO55RWAnY_Olt53KP7zsI/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9wbGFj/ZWhvbGQubmV0L3By/b2R1Y3Quc3Zn";

  return (
    <div style={styles.card}>
      <img
        src={image || placeholder}
        alt={name}
        style={styles.image}
        onError={(e) => {
          e.currentTarget.src = placeholder;
        }}
      />

      <h2 style={styles.name}>{name}</h2>

      <p style={styles.price}>${price}</p>

      <p style={styles.description}>{description}</p>

      <p style={styles.availability}>
        {availability ? "Disponible" : "Agotado"}
      </p>
    </div>
  );
}

const styles = {
  card: {
    width: "240px",
    padding: "15px",
    borderRadius: "16px",
    border: "1px solid black",
    background: "#d7e7ffff",
    boxShadow: "1 4px 6px rgba(0,0,0,0.2)",
    color: "#0d2b52",
    display: "flex",
    flexDirection: "column" as const,
    gap: "5px",
    transition: "0.1s",
  },

  image: {
    width: "100%",
    height: "auto",
    borderRadius: "4px",
    border: "1px solid black",
  },

  name: {
    fontSize: "18px",
    fontWeight: "bold",
    margin: 0,
  },

  price: {
    fontSize: "16px",
    fontWeight: "bold",
    color: "#004aad",
    margin: 0,
  },

  description: {
    fontSize: "14px",
    margin: 0,
  },

  availability: {
    marginTop: "8px",
    fontWeight: "bold",
    color: "#00376b",
  },
};
