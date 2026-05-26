const Review = require("../models/Review");
const { reviewCode } = require("../services/groqService");
const { fetchPRCode } = require("../services/githubService");

const createReview = async (req, res, next) => {
  try {
    const { code, prUrl, language } = req.body;

    if (!code && !prUrl) {
      return res
        .status(400)
        .json({ message: "Please provide code or a GitHub PR URL" });
    }

    let sourceCode = code;
    let sourceType = "code";

    if (prUrl) {
      sourceCode = await fetchPRCode(prUrl);
      sourceType = "github_pr";
    }

    const aiReview = await reviewCode(sourceCode, language);

    const review = await Review.create({
      code: sourceCode,
      language: aiReview.language,
      sourceType,
      prUrl: prUrl || null,
      bugs: aiReview.bugs,
      security: aiReview.security,
      performance: aiReview.performance,
      bestPractices: aiReview.bestPractices,
      summary: aiReview.summary,
      score: aiReview.score,
    });

    res.status(201).json(review);
  } catch (error) {
    next(error);
  }
};

const getReviews = async (req, res, next) => {
  try {
    const reviews = await Review.find().sort({ createdAt: -1 }).limit(20);
    res.json(reviews);
  } catch (error) {
    next(error);
  }
};

const getReviewById = async (req, res, next) => {
  try {
    const review = await Review.findById(req.params.id);
    if (!review) {
      return res.status(404).json({ message: "Review not found" });
    }
    res.json(review);
  } catch (error) {
    next(error);
  }
};

module.exports = { createReview, getReviews, getReviewById };