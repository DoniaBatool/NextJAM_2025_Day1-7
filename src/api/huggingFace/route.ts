import axios from "axios";

interface Prompt {
  prompt: string;
}

// Get API key from environment variables
export const API_KEY = process.env.NEXT_PUBLIC_HUGGING_FACE_API_KEY;

if (!API_KEY) {
  throw new Error("API key is missing. Please set it in the .env.local file.");
}

export const generateAIComment = async (prompt: Prompt) => {
  try {
    const response = await axios.post(
      "https://api-inference.huggingface.co/models/gpt2", // Using GPT-2 model (replace with the correct model if needed)
      {
        inputs: prompt.prompt, // Only pass the user prompt here, without appending extra text
        parameters: {
          max_length: 50, // Control the maximum length of the generated text
        },
      },
      {
        headers: {
          Authorization: `Bearer ${API_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );

    // Return only the generated text from the AI response
    return response.data[0]?.generated_text?.trim() || "No comment generated.";
  } catch (error) {
    console.error("Error generating AI comment:", error);
    throw new Error("Failed to generate AI comment.");
  }
};
