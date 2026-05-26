import { Link, useLocation } from "react-router-dom";

const Navbar = () => {
  const location = useLocation();

  return (
    <nav style={{
      background: "#fff",
      borderBottom: "1px solid #e5e7eb",
      padding: "0 2rem",
      height: "60px",
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      position: "sticky",
      top: 0,
      zIndex: 100,
      boxShadow: "0 1px 3px rgba(0,0,0,0.05)",
    }}>
      <Link to="/" style={{
        fontSize: "20px",
        fontWeight: "800",
        color: "#111827",
        textDecoration: "none",
        display: "flex",
        alignItems: "center",
        gap: "8px",
      }}>
        <span style={{
          background: "#6366f1",
          color: "#fff",
          borderRadius: "8px",
          padding: "2px 8px",
          fontSize: "14px",
          fontWeight: "700",
        }}>CR</span>
        CodeRev <span style={{ color: "#6366f1" }}>AI</span>
      </Link>

      <div style={{ display: "flex", gap: "4px" }}>
        {[
          { path: "/", label: "Review" },
          { path: "/history", label: "History" },
        ].map(({ path, label }) => (
          <Link
            key={path}
            to={path}
            style={{
              fontSize: "14px",
              fontWeight: "500",
              color: location.pathname === path ? "#6366f1" : "#6b7280",
              textDecoration: "none",
              padding: "6px 14px",
              borderRadius: "8px",
              background: location.pathname === path ? "#eef2ff" : "transparent",
              transition: "all 0.15s",
            }}
          >
            {label}
          </Link>
        ))}
      </div>
    </nav>
  );
};

export default Navbar;