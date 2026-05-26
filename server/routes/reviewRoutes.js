const express = require("express");
const router = express.Router();
const {
  createReview,
  getReviews,
  getReviewById,
} = require("../controllers/reviewController");

router.post("/", createReview);
router.get("/", getReviews);
router.get("/:id", getReviewById);

module.exports = router;