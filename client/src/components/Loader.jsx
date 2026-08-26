const Loader = () => {
  return (
    <div style={{
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      gap: "16px",
      padding: "3rem",
    }}>
      <div style={{ position: "relative", width: "48px", height: "48px" }}>
        <div style={{
          width: "48px",
          height: "48px",
          border: "3px solid #e5e7eb",
          borderTop: "3px solid #6366f1",
          borderRadius: "50%",
          animation: "spin 0.7s linear infinite",
        }} />
      </div>
      <div style={{ textAlign: "center" }}>
        <p style={{
          color: "#111827",
          fontSize: "15px",
          fontWeight: "600",
          margin: "0 0 4px",
        }}>
          Reviewing your code...
        </p>
        <p style={{ color: "#6b7280", fontSize: "13px", margin: 0 }}>
          This may take up to 30 seconds on first load
        </p>
      </div>
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  );
};

export default Loader;