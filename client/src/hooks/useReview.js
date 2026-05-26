import { useState } from "react";
import api from "../utils/api";

const useReview = () => {
  const [review, setReview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const submitReview = async ({ code, prUrl, language }) => {
    setLoading(true);
    setError(null);
    setReview(null);

    try {
      const res = await api.post("/api/review", { code, prUrl, language });
      setReview(res.data);
    } catch (err) {
      setError(
        err.response?.data?.message || "Something went wrong. Try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return { review, loading, error, submitReview };
};

export default useReview;