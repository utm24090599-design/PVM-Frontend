const skeleton = {
  background: "#dcdcdc",
  borderRadius: "10px",
  animation: "pulse 1.2s infinite ease-in-out"
};

const CardSkeleton = () => {
  return (
    <div
      style={{
        width: "280px",
        background: "#f0f1f4",
        padding: "16px",
        borderRadius: "20px",
        boxShadow: "0 3px 10px rgba(0,0,0,0.15)"
      }}
    >
      <div style={{ ...skeleton, height: "200px" }} />

      <div style={{ marginTop: "14px" }}>
        <div style={{ ...skeleton, height: "20px", width: "70%" }} />
        <div
          style={{
            ...skeleton,
            height: "16px",
            width: "40%",
            marginTop: "10px"
          }}
        />
        <div
          style={{
            ...skeleton,
            height: "14px",
            width: "90%",
            marginTop: "8px"
          }}
        />
      </div>
    </div>
  );
};

export default CardSkeleton;