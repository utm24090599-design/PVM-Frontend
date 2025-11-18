

const skeletonStyle = {
  background: "#e5e5e5",
  borderRadius: "8px",
  animation: "pulse 1.2s infinite ease-in-out"
};

const CardSkeleton = () => {
  return (
    <div
      style={{
        width: "260px",
        borderRadius: "12px",
        overflow: "hidden",
        background: "#fff",
        boxShadow: "0 2px 6px rgba(0,0,0,0.1)"
      }}
    >
      <div style={{ ...skeletonStyle, height: "160px" }}></div>

      <div style={{ padding: "12px" }}>
        <div style={{ ...skeletonStyle, height: "16px", width: "70%" }}></div>
        <div
          style={{
            ...skeletonStyle,
            height: "14px",
            width: "40%",
            marginTop: "10px"
          }}
        ></div>
        <div
          style={{
            ...skeletonStyle,
            height: "12px",
            width: "90%",
            marginTop: "8px"
          }}
        ></div>
      </div>
    </div>
  );
};

export default CardSkeleton;
