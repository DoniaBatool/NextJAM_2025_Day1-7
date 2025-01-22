"use client";
import { useState } from "react";

interface Review {
  rating: number;
  review: string;
  reviewer: string;
  
}

export interface myProps {
  productId: string;
}

const ReviewSection = ({ productId}:myProps) => {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [rating, setRating] = useState<number>(0);
  const [reviewText, setReviewText] = useState<string>("");
  const [reviewerName, setReviewerName] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [successMessage, setSuccessMessage] = useState<string>("");

  const handleSubmit = () => {
    if (!rating || !reviewText || !reviewerName) {
      alert("Please fill out all fields.");
      return;
    }

    setIsSubmitting(true);

    // Simulate adding the review (this could be an API call to save data in a database)
    const newReview: Review = {
      rating,
      review: reviewText,
      reviewer: reviewerName,
    };

    setReviews((prev) => [...prev, newReview]);

    // Show success message
    setSuccessMessage("Your review has been submitted successfully!");
    console.log(`Submitting review for product ID: ${productId}`);
    // Reset the form fields after submission
    setRating(0);
    setReviewText("");
    setReviewerName("");
    setIsSubmitting(false);

    // Hide success message after 3 seconds
    setTimeout(() => setSuccessMessage(""), 3000);
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
                className={`cursor-pointer text-lg ${star <= rating ? "text-yellow-500" : "text-gray-400"}`}
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
            className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:bg-gray-400 focus:outline-none"
          >
            {isSubmitting ? "Submitting..." : "Submit Review"}
          </button>
        </div>
      </div>

      {/* Reviews Display */}
      <div>
        <h4 className="text-xl font-semibold text-gray-800">Reviews & Rating ({reviews.length})</h4>
        <div className="space-y-3 mt-4">
          {reviews.length === 0 ? (
            <p className="text-gray-500">No reviews yet. Be the first to review this product!</p>
          ) : (
            reviews.map((review, index) => (
              <div key={index} className="p-4 border-b border-gray-200">
                <div className="flex items-center gap-2 mb-2">
                  <p className="text-gray-700 font-semibold">{review.reviewer}</p>
                  {/* Rating Stars */}
                  <div className="flex gap-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <span
                        key={star}
                        className={`text-lg ${star <= review.rating ? "text-yellow-500" : "text-gray-400"}`}
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
