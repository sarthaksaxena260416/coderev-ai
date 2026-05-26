import { useEffect, useState } from "react";
import api from "../utils/api";

const History = () => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [expanded, setExpanded] = useState(null);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const res = await api.get("/api/review");
        setReviews(res.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchReviews();
  }, []);

  const getScoreColor = (score) => {
    if (score >= 8) return "#22c55e";
    if (score >= 5) return "#f59e0b";
    return "#ef4444";
  };

  return (
    <div style={{
      minHeight: "100vh",
      background: "#f9fafb",
      padding: "2rem 1rem",
    }}>
      <div style={{ maxWidth: "780px", margin: "0 auto" }}>
        <h2 style={{
          fontSize: "24px",
          fontWeight: "700",
          color: "#111827",
          marginBottom: "1.5rem",
        }}>
          Review History
        </h2>

        {loading && <p style={{ color: "#6b7280" }}>Loading...</p>}

        {!loading && reviews.length === 0 && (
          <p style={{ color: "#6b7280" }}>No reviews yet. Go review some code!</p>
        )}

        {reviews.map((r) => (
          <div
            key={r._id}
            onClick={() => setExpanded(expanded === r._id ? null : r._id)}
            style={{
              background: "#fff",
              border: "1px solid #e5e7eb",
              borderRadius: "12px",
              padding: "1.25rem 1.5rem",
              marginBottom: "1rem",
              cursor: "pointer",
              transition: "box-shadow 0.2s",
            }}
          >
            <div style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              flexWrap: "wrap",
              gap: "1rem",
            }}>
              <div>
                <p style={{
                  fontSize: "14px",
                  fontWeight: "600",
                  color: "#111827",
                  margin: "0 0 4px",
                }}>
                  {r.language} · {r.sourceType === "github_pr" ? "GitHub PR" : "Pasted Code"}
                </p>
                <p style={{ fontSize: "13px", color: "#6b7280", margin: 0 }}>
                  {new Date(r.createdAt).toLocaleString()}
                </p>
              </div>
              <div style={{
                fontSize: "24px",
                fontWeight: "800",
                color: getScoreColor(r.score),
              }}>
                {r.score}/10
              </div>
            </div>

            {expanded === r._id && (
              <div style={{ marginTop: "1rem", borderTop: "1px solid #e5e7eb", paddingTop: "1rem" }}>
                <p style={{ fontSize: "14px", color: "#374151", marginBottom: "1rem", lineHeight: "1.7" }}>
                  {r.summary}
                </p>
                {[
                  { title: "🐛 Bugs", items: r.bugs, color: "#ef4444" },
                  { title: "🔒 Security", items: r.security, color: "#f59e0b" },
                  { title: "⚡ Performance", items: r.performance, color: "#3b82f6" },
                  { title: "✅ Best Practices", items: r.bestPractices, color: "#22c55e" },
                ].map(({ title, items, color }) =>
                  items?.length > 0 ? (
                    <div key={title} style={{ marginBottom: "1rem" }}>
                      <p style={{ fontSize: "13px", fontWeight: "600", color, marginBottom: "6px" }}>
                        {title}
                      </p>
                      <ul style={{ margin: 0, paddingLeft: "1.25rem" }}>
                        {items.map((item, i) => (
                          <li key={i} style={{ fontSize: "13px", color: "#374151", marginBottom: "4px" }}>
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ) : null
                )}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default History;