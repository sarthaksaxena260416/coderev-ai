const mongoose = require("mongoose");

const reviewSchema = new mongoose.Schema(
  {
    code: {
      type: String,
      required: true,
    },
    language: {
      type: String,
      default: "auto-detected",
    },
    sourceType: {
      type: String,
      enum: ["code", "github_pr"],
      default: "code",
    },
    prUrl: {
      type: String,
      default: null,
    },
    bugs: [String],
    security: [String],
    performance: [String],
    bestPractices: [String],
    summary: {
      type: String,
    },
    score: {
      type: Number,
      min: 0,
      max: 10,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Review", reviewSchema);