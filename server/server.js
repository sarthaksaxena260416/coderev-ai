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
  origin: [
    "http://localhost:5173",
    process.env.CLIENT_URL,
  ],
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