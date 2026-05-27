require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
const reviewRoutes = require("./routes/reviewRoutes");
const errorHandler = require("./middleware/errorHandler");
const limiter = require("./middleware/rateLimiter");

const app = express();

connectDB();

app.use(cors({
  origin: function(origin, callback) {
    const allowed = [
      "http://localhost:5173",
      "https://coderev-ai-two.vercel.app",
      process.env.CLIENT_URL,
    ];
    if (!origin || allowed.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true,
}));
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true }));

app.use("/api/review", limiter);
app.use("/api/review", reviewRoutes);

app.get("/", (req, res) => {
  res.json({ message: "CodeRev AI API is running" });
});

app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});