"use client";
import { client } from "@/sanity/lib/client";
import { useState, useEffect, useRef } from "react";

interface Review {
  rating: number;
  review: string;
  reviewer: string;
}

export interface myProps {
  productId: string;
}

const ReviewSection = ({ productId }: myProps) => {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [rating, setRating] = useState<number>(0);
  const [reviewText, setReviewText] = useState<string>("");
  const [reviewerName, setReviewerName] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [successMessage, setSuccessMessage] = useState<string>("");

  const isMounted = useRef(true);

  useEffect(() => {
    // Fetch reviews when the component mounts
    const fetchReviews = async () => {
      try {
        const data: Review[] = await client.fetch(
          `*[_type == "review" && productId == $productId]`,
          { productId }
        );
        setReviews(data);
      } catch (error) {
        console.error("Error fetching reviews:", error);
      }
    };

    fetchReviews();

    return () => {
      isMounted.current = false;
    };
  }, [productId]);

  const handleSubmit = async () => {
    if (!rating || !reviewText || !reviewerName) {
      alert("Please fill out all fields.");
      return;
    }

    setIsSubmitting(true);

    const newReview: Review = {
      rating,
      review: reviewText,
      reviewer: reviewerName,
    };

    try {
      // Send data to Sanity
      await client.create({
        _type: "review",
        rating,
        review: reviewText,
        reviewer: reviewerName,
        productId,
      });

      // Add the review to the local state
      if (isMounted.current) {
        setReviews((prev) => [...prev, newReview]);

        // Show success message for 10 seconds
        setSuccessMessage("Your review has been submitted successfully!");
        setTimeout(() => setSuccessMessage(""), 10000);

        // Reset the form fields
        setRating(0);
        setReviewText("");
        setReviewerName("");
      }
    } catch (error) {
      console.error("Error submitting review:", error);
      alert("There was an error submitting your review. Please try again.");
    } finally {
      if (isMounted.current) {
        setIsSubmitting(false);
      }
    }
  };

  return (
    <div className="bg-white max-w-3xl p-6 rounded-lg mt-10">
      <h3 className="text-2xl font-semibold text-gray-800 mb-6">
        Customer Reviews
      </h3>

      {/* Success Message */}
      {successMessage && (
        <div className="bg-green-100 text-green-800 p-4 rounded-md mb-6 text-center text-sm">
          {successMessage}
        </div>
      )}

      {/* Review Form */}
      <div className="space-y-4 mb-6">
        <div className="flex items-center gap-3">
          {/* Rating Stars */}
          <div className="flex gap-1">
            {[1, 2, 3, 4, 5].map((star) => (
              <span
                key={star}
                className={`cursor-pointer text-lg ${
                  star <= rating ? "text-yellow-500" : "text-gray-400"
                }`}
                onClick={() => setRating(star)}
              >
                ★
              </span>
            ))}
          </div>
        </div>

        {/* Reviewer Name Input */}
        <input
          type="text"
          value={reviewerName}
          onChange={(e) => setReviewerName(e.target.value)}
          placeholder="Your Name"
          className="w-full p-3 border rounded-md border-gray-300 focus:outline-none focus:ring-2 focus:ring-yellow-400"
        />

        {/* Review Textarea */}
        <textarea
          value={reviewText}
          onChange={(e) => setReviewText(e.target.value)}
          rows={4}
          placeholder="Write your review here"
          className="w-full p-3 border rounded-md border-gray-300 focus:outline-none focus:ring-2 focus:ring-yellow-400"
        ></textarea>

        {/* Submit Button */}
        <div className="flex justify-end">
          <button
            onClick={handleSubmit}
            disabled={isSubmitting}
            className="px-6 py-2 bg-black hover:bg-slate-800 text-white rounded-md  disabled:bg-gray-400 focus:outline-none"
          >
            {isSubmitting ? "Submitting..." : "Submit Review"}
          </button>
        </div>
      </div>

      {/* Reviews Display */}
      <div>
        <h4 className="text-xl font-semibold text-gray-800">
          Reviews & Rating ({reviews.length})
        </h4>
        <div className="space-y-3 mt-4">
          {reviews.length === 0 ? (
            <p className="text-gray-500">
              No reviews yet. Be the first to review this product!
            </p>
          ) : (
            reviews.map((review) => (
              <div
                key={`${review.reviewer}-${Math.random()}`}
                className="p-4 border-b border-gray-200"
              >
                <div className="flex items-center gap-2 mb-2">
                  <p className="text-gray-700 font-semibold">
                    {review.reviewer}
                  </p>
                  {/* Rating Stars */}
                  <div className="flex gap-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <span
                        key={star}
                        className={`text-lg ${
                          star <= review.rating
                            ? "text-yellow-500"
                            : "text-gray-400"
                        }`}
                      >
                        ★
                      </span>
                    ))}
                  </div>
                </div>
                <p className="text-gray-600">{review.review}</p>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default ReviewSection;
