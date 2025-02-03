"use client";
import { generateAIComment } from "@/api/geminiAPI/route";
import { useAuth } from "@/context/AuthContext";
import { client } from "@/sanity/lib/client";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

const FeedbackPage = () => {
const { user } = useAuth();
const router = useRouter();

  const [rating, setRating] = useState(0);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [successMessage, setSuccessMessage] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    orderId: "",
    feedbackType: "Product Feedback",
    comments: "",
  });
  const [errors, setErrors] = useState({
    name: "",
    email: "",
    comments: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [userPrompt, setUserPrompt] = useState(""); // State to hold the user's prompt

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedFile(file);
    }
  };

  const handleCart = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!user) {
      e.preventDefault(); // ✅ Stop Link navigation
      alert("You must be logged in to access the cart.");
      router.push("/auth"); // ✅ Redirect to login page
    }
  };

  const handleChange = (
    event: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleUserPromptChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUserPrompt(event.target.value); // Update user prompt when it changes
  };

  const validateForm = () => {
    const validationErrors = { name: "", email: "", comments: "" };
    let isValid = true;

    if (!formData.name.trim()) {
      validationErrors.name = "Name is required.";
      isValid = false;
    }

    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(formData.email)) {
      validationErrors.email = "Please enter a valid email address.";
      isValid = false;
    }

    if (!formData.comments.trim()) {
      validationErrors.comments = "Comments are required.";
      isValid = false;
    }

    setErrors(validationErrors);
    return isValid;
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
  
    if (!validateForm()) return;
  
   
    setIsLoading(true);
  
    try {
      // Define the type of feedback data
      type FeedbackData = {
        _type: string;
        name: string;
        email: string;
        orderId: string | null;
        feedbackType: string;
        comments: string;
        rating: number | null;
        image?: {
          _type: string;
          asset: { _ref: string };
        }; // Optional image property
      };
  
      // Construct the data object to send to Sanity
      const feedbackData: FeedbackData = {
        _type: "feedback",
        name: formData.name,
        email: formData.email,
        orderId: formData.orderId || null,
        feedbackType: formData.feedbackType,
        comments: formData.comments,
        rating: rating || null,
      };
  
      // Upload the file to Sanity if available
      if (selectedFile) {
        const imageData = await client.assets.upload("image", selectedFile);
        feedbackData.image = {
          _type: "image",
          asset: { _ref: imageData._id },
        };
      }
  
      // Save the feedback document in Sanity
      await client.create(feedbackData);
  
      // Reset form and show success message
      setSuccessMessage("Thank you for your feedback!");
      setFormData({
        name: "",
        email: "",
        orderId: "",
        feedbackType: "Product Feedback",
        comments: "",
      });
      setRating(0);
      setSelectedFile(null);
    } catch (error) {
      console.error("Error submitting feedback:", error);
      setSuccessMessage(
        "There was an error submitting your feedback. Please try again."
      );
    } finally {
      setIsLoading(false);
    }
  };
  
  const handleGenerateAIComment = async () => {
    setIsLoading(true);
    try {
      const aiComment = await generateAIComment({
        prompt: userPrompt || "Write a helpful feedback comment for product quality.", // Use the user’s prompt
      });

      // Debugging: Check AI comment structure
      console.log("Generated AI comment:", aiComment);

      if (typeof aiComment === "string") {
        setFormData((prevFormData) => ({
          ...prevFormData,
          comments: aiComment, // Set the generated comment in the form's comment field
        }));
      } else {
        console.error("AI comment is not a string. Received:", aiComment);
      }
    } catch (error) {
      console.error("Error generating AI comment:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="max-w-3xl mx-auto p-6 mb-[100px]">
    <h1 className="text-3xl font-bold text-center mb-6">
      We Value Your Feedback
    </h1>
    <p className="text-center mb-8">
      Let us know how we can improve your shopping experience!
    </p>
  
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Name Input */}
      <div>
        <label className="block text-sm font-medium mb-2">Name</label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          className="w-full border rounded-lg p-2"
          placeholder="Enter your name"
        />
        {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
      </div>
  
      {/* Email Input */}
      <div>
        <label className="block text-sm font-medium mb-2">Email</label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          className="w-full border rounded-lg p-2"
          placeholder="Enter your email"
        />
        {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
      </div>
  
      {/* Order ID Input */}
      <div>
        <label className="block text-sm font-medium mb-2">Order ID (optional)</label>
        <input
          type="text"
          name="orderId"
          value={formData.orderId}
          onChange={handleChange}
          className="w-full border rounded-lg p-2"
          placeholder="Enter your order ID (optional)"
        />
      </div>
  
      {/* Rating Input */}
      <div>
        <label className="block text-sm font-medium mb-2">Rating</label>
        <select
          name="rating"
          value={rating}
          onChange={(e) => setRating(Number(e.target.value))}
          className="w-full border rounded-lg p-2"
        >
          <option value="0">Select Rating</option>
          <option value="1">1 - Poor</option>
          <option value="2">2 - Fair</option>
          <option value="3">3 - Good</option>
          <option value="4">4 - Very Good</option>
          <option value="5">5 - Excellent</option>
        </select>
      </div>

      {/* File Upload Input */}
    <div>
      <label className="block text-sm font-medium mb-2">Upload Screenshot/Image (optional)</label>
      <input
        type="file"
        accept="image/*"
        onChange={handleFileUpload}
        className="w-full border rounded-lg p-2"
      />
      {selectedFile && (
        <p className="text-green-500 text-sm mt-2">Selected file: {selectedFile.name}</p>
      )}
    </div>
  
      {/* Custom Prompt Input */}
      <div>
        <label className="block text-sm font-medium mb-2">Custom Prompt</label>
        <input
          type="text"
          value={userPrompt}
          onChange={handleUserPromptChange}
          className="w-full border rounded-lg p-2"
          placeholder="Enter a prompt for AI comment"
        />
      </div>
  
      {/* AI Generate Button */}
      <div>
        <button
          type="button"
          onClick={handleGenerateAIComment}
          className="bg-green-600 text-white py-2 px-4 rounded-lg"
          disabled={isLoading}
        >
          {isLoading ? "Generating..." : "Generate Comment via AI"}
        </button>
      </div>
  
      {/* Comments Textarea */}
      <div>
        <label className="block text-sm font-medium mb-2">Comments</label>
        <textarea
          name="comments"
          value={formData.comments}
          onChange={handleChange}
          rows={4}
          className="w-full border rounded-lg p-2"
          placeholder="Enter your feedback here"
        ></textarea>
        {errors.comments && <p className="text-red-500 text-sm">{errors.comments}</p>}
      </div>
  
      {/* Submit Button */}
      <button
        type="submit"
        className="w-full bg-black text-white py-2 rounded-lg hover:bg-slate-800 transition"
       onClick={handleCart}
      >
        Submit Feedback
      </button>
    </form>
  
    {successMessage && (
      <div className="bg-green-100 text-green-800 p-4 rounded-lg mt-6">
        {successMessage}
      </div>
    )}
  </section>
  
  );
};

export default FeedbackPage;
