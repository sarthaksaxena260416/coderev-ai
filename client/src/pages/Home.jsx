import { useState } from "react";
import useReview from "../hooks/useReview";
import ReviewResult from "../components/ReviewResult";
import Loader from "../components/Loader";

const Home = () => {
  const [code, setCode] = useState("");
  const [prUrl, setPrUrl] = useState("");
  const [language, setLanguage] = useState("");
  const [activeTab, setActiveTab] = useState("code");
  const [copied, setCopied] = useState(false);
  const { review, loading, error, submitReview } = useReview();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (activeTab === "code") {
      await submitReview({ code, language });
    } else {
      await submitReview({ prUrl, language });
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div style={{
      minHeight: "100vh",
      background: "#f9fafb",
      padding: "2rem 1rem",
    }}>
      <div style={{ maxWidth: "780px", margin: "0 auto" }}>

        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: "2.5rem" }}>
          <h1 style={{
            fontSize: "36px",
            fontWeight: "800",
            color: "#111827",
            margin: "0 0 8px",
          }}>
            CodeRev <span style={{ color: "#6366f1" }}>AI</span>
          </h1>
          <p style={{ color: "#6b7280", fontSize: "16px", margin: 0 }}>
            Paste your code or a GitHub PR link and get an instant AI review
          </p>
        </div>

        {/* Card */}
        <div style={{
          background: "#fff",
          border: "1px solid #e5e7eb",
          borderRadius: "12px",
          padding: "2rem",
        }}>

          {/* Tabs */}
          <div style={{
            display: "flex",
            gap: "8px",
            marginBottom: "1.5rem",
          }}>
            {["code", "github"].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                style={{
                  padding: "8px 20px",
                  borderRadius: "8px",
                  border: "1px solid",
                  borderColor: activeTab === tab ? "#6366f1" : "#e5e7eb",
                  background: activeTab === tab ? "#6366f1" : "#fff",
                  color: activeTab === tab ? "#fff" : "#6b7280",
                  fontWeight: "500",
                  fontSize: "14px",
                  cursor: "pointer",
                }}
              >
                {tab === "code" ? "📝 Paste Code" : "🔗 GitHub PR"}
              </button>
            ))}
          </div>

          <form onSubmit={handleSubmit}>

            {/* Language */}
            <div style={{ marginBottom: "1rem" }}>
              <label style={{
                display: "block",
                fontSize: "13px",
                fontWeight: "500",
                color: "#374151",
                marginBottom: "6px",
              }}>
                Language (optional)
              </label>
              <input
                type="text"
                placeholder="e.g. JavaScript, Python, Go..."
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
                style={{
                  width: "100%",
                  padding: "10px 14px",
                  border: "1px solid #e5e7eb",
                  borderRadius: "8px",
                  fontSize: "14px",
                  outline: "none",
                  boxSizing: "border-box",
                  color: "#111827",
                  background: "#fff",
                }}
              />
            </div>

            {/* Code input */}
            {activeTab === "code" ? (
              <div style={{ marginBottom: "1.25rem" }}>
                <div style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginBottom: "6px",
                }}>
                  <label style={{
                    fontSize: "13px",
                    fontWeight: "500",
                    color: "#374151",
                  }}>
                    Your Code
                  </label>
                  <button
                    type="button"
                    onClick={handleCopy}
                    style={{
                      fontSize: "12px",
                      color: copied ? "#22c55e" : "#6366f1",
                      background: "none",
                      border: `1px solid ${copied ? "#22c55e" : "#6366f1"}`,
                      borderRadius: "6px",
                      padding: "3px 10px",
                      cursor: "pointer",
                    }}
                  >
                    {copied ? "Copied!" : "Copy"}
                  </button>
                </div>
                <textarea
                  rows={14}
                  placeholder="Paste your code here..."
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                  style={{
                    width: "100%",
                    padding: "12px 14px",
                    border: "1px solid #e5e7eb",
                    borderRadius: "8px",
                    fontSize: "13px",
                    fontFamily: "monospace",
                    resize: "vertical",
                    outline: "none",
                    boxSizing: "border-box",
                    background: "#f9fafb",
                    color: "#111827",
                  }}
                />
              </div>
            ) : (
              <div style={{ marginBottom: "1.25rem" }}>
                <label style={{
                  display: "block",
                  fontSize: "13px",
                  fontWeight: "500",
                  color: "#374151",
                  marginBottom: "6px",
                }}>
                  GitHub PR URL
                </label>
                <input
                  type="url"
                  placeholder="https://github.com/owner/repo/pull/123"
                  value={prUrl}
                  onChange={(e) => setPrUrl(e.target.value)}
                  style={{
                    width: "100%",
                    padding: "10px 14px",
                    border: "1px solid #e5e7eb",
                    borderRadius: "8px",
                    fontSize: "14px",
                    outline: "none",
                    boxSizing: "border-box",
                    color: "#111827",
                    background: "#fff",
                  }}
                />
              </div>
            )}

            {/* Error */}
            {error && (
              <div style={{
                background: "#fef2f2",
                border: "1px solid #fecaca",
                borderRadius: "8px",
                padding: "12px 16px",
                color: "#dc2626",
                fontSize: "14px",
                marginBottom: "1rem",
              }}>
                {error}
              </div>
            )}

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              style={{
                width: "100%",
                padding: "12px",
                background: loading ? "#a5b4fc" : "#6366f1",
                color: "#fff",
                border: "none",
                borderRadius: "8px",
                fontSize: "15px",
                fontWeight: "600",
                cursor: loading ? "not-allowed" : "pointer",
              }}
            >
              {loading ? "Reviewing..." : "Review My Code →"}
            </button>
          </form>
        </div>

        {/* Result */}
        {loading && <Loader />}
        {review && <ReviewResult review={review} />}

      </div>
    </div>
  );
};

export default Home;