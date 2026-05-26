import ScoreCard from "./ScoreCard";
import jsPDF from "jspdf";

const sections = [
  { key: "bugs", title: "Bugs", icon: "🐛", color: "#ef4444", bg: "#fef2f2" },
  { key: "security", title: "Security", icon: "🔒", color: "#f59e0b", bg: "#fffbeb" },
  { key: "performance", title: "Performance", icon: "⚡", color: "#3b82f6", bg: "#eff6ff" },
  { key: "bestPractices", title: "Best Practices", icon: "✅", color: "#22c55e", bg: "#f0fdf4" },
];

const ReviewResult = ({ review }) => {
  if (!review) return null;

  const downloadPDF = () => {
    const doc = new jsPDF();
    const margin = 20;
    let y = 20;

    doc.setFontSize(22);
    doc.setTextColor(99, 102, 241);
    doc.text("CodeRev AI — Review Report", margin, y);
    y += 12;

    doc.setFontSize(11);
    doc.setTextColor(107, 114, 128);
    doc.text(`Language: ${review.language}`, margin, y);
    y += 6;
    doc.text(`Score: ${review.score} / 10`, margin, y);
    y += 6;
    doc.text(`Date: ${new Date().toLocaleString()}`, margin, y);
    y += 12;

    doc.setFontSize(12);
    doc.setTextColor(55, 65, 81);
    doc.text("Summary:", margin, y);
    y += 7;
    const summaryLines = doc.splitTextToSize(review.summary, 170);
    doc.text(summaryLines, margin, y);
    y += summaryLines.length * 7 + 8;

    sections.forEach(({ title, key }) => {
      const items = review[key];
      if (!items || items.length === 0) return;
      doc.setFontSize(13);
      doc.setTextColor(99, 102, 241);
      doc.text(title, margin, y);
      y += 7;
      doc.setFontSize(11);
      doc.setTextColor(55, 65, 81);
      items.forEach((item) => {
        const lines = doc.splitTextToSize(`• ${item}`, 170);
        doc.text(lines, margin, y);
        y += lines.length * 6 + 3;
      });
      y += 5;
    });

    doc.save(`codereview-${Date.now()}.pdf`);
  };

  return (
    <div style={{
      background: "#fff",
      border: "1px solid #e5e7eb",
      borderRadius: "16px",
      padding: "2rem",
      marginTop: "2rem",
      boxShadow: "0 1px 3px rgba(0,0,0,0.05)",
    }}>
      {/* Header row */}
      <div style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "flex-start",
        flexWrap: "wrap",
        gap: "1.5rem",
        marginBottom: "2rem",
        paddingBottom: "1.5rem",
        borderBottom: "1px solid #f3f4f6",
      }}>
        <div style={{ flex: 1, minWidth: "200px" }}>
          <div style={{
            display: "flex",
            alignItems: "center",
            gap: "10px",
            marginBottom: "8px",
          }}>
            <h2 style={{
              fontSize: "20px",
              fontWeight: "700",
              margin: 0,
              color: "#111827",
            }}>
              Review Complete
            </h2>
            <span style={{
              fontSize: "12px",
              background: "#eef2ff",
              color: "#6366f1",
              padding: "2px 10px",
              borderRadius: "20px",
              fontWeight: "500",
            }}>
              {review.language}
            </span>
          </div>
          <p style={{
            color: "#6b7280",
            fontSize: "14px",
            lineHeight: "1.7",
            margin: "0 0 16px",
            maxWidth: "480px",
          }}>
            {review.summary}
          </p>
          <button
            onClick={downloadPDF}
            style={{
              fontSize: "13px",
              color: "#6366f1",
              background: "#eef2ff",
              border: "none",
              borderRadius: "8px",
              padding: "8px 16px",
              cursor: "pointer",
              fontWeight: "500",
            }}
          >
            ⬇ Download PDF Report
          </button>
        </div>
        <ScoreCard score={review.score} />
      </div>

      {/* Sections grid */}
      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
        gap: "1rem",
      }}>
        {sections.map(({ key, title, icon, color, bg }) => {
          const items = review[key];
          if (!items || items.length === 0) return null;
          return (
            <div key={key} style={{
              background: bg,
              border: `1px solid ${color}25`,
              borderRadius: "12px",
              padding: "1.25rem",
            }}>
              <h3 style={{
                fontSize: "14px",
                fontWeight: "600",
                color,
                margin: "0 0 10px",
                display: "flex",
                alignItems: "center",
                gap: "6px",
              }}>
                {icon} {title}
                <span style={{
                  marginLeft: "auto",
                  background: `${color}20`,
                  color,
                  fontSize: "11px",
                  padding: "1px 7px",
                  borderRadius: "20px",
                }}>
                  {items.length}
                </span>
              </h3>
              <ul style={{ margin: 0, paddingLeft: "1.1rem" }}>
                {items.map((item, i) => (
                  <li key={i} style={{
                    fontSize: "13px",
                    color: "#374151",
                    marginBottom: "6px",
                    lineHeight: "1.6",
                  }}>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ReviewResult;