const ScoreCard = ({ score }) => {
  const getColor = (score) => {
    if (score >= 8) return "#22c55e";
    if (score >= 5) return "#f59e0b";
    return "#ef4444";
  };

  const getLabel = (score) => {
    if (score >= 8) return "Excellent";
    if (score >= 6) return "Good";
    if (score >= 4) return "Needs Work";
    return "Poor";
  };

  const color = getColor(score);
  const radius = 52;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (score / 10) * circumference;

  return (
    <div style={{
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      gap: "8px",
      background: "#f9fafb",
      border: "1px solid #e5e7eb",
      borderRadius: "16px",
      padding: "1.5rem",
      minWidth: "160px",
    }}>
      <svg width="130" height="130" viewBox="0 0 130 130">
        <circle
          cx="65" cy="65" r={radius}
          fill="none"
          stroke="#e5e7eb"
          strokeWidth="8"
        />
        <circle
          cx="65" cy="65" r={radius}
          fill="none"
          stroke={color}
          strokeWidth="8"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
          transform="rotate(-90 65 65)"
          style={{ transition: "stroke-dashoffset 1s ease" }}
        />
        <text
          x="65" y="58"
          textAnchor="middle"
          dominantBaseline="central"
          fontSize="30"
          fontWeight="800"
          fill={color}
        >
          {score}
        </text>
        <text
          x="65" y="82"
          textAnchor="middle"
          fontSize="11"
          fill="#9ca3af"
          fontWeight="500"
        >
          out of 10
        </text>
      </svg>
      <span style={{
        fontSize: "13px",
        fontWeight: "600",
        color,
        background: `${color}15`,
        padding: "3px 12px",
        borderRadius: "20px",
      }}>
        {getLabel(score)}
      </span>
    </div>
  );
};

export default ScoreCard;