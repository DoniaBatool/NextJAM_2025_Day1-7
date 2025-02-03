import axios from "axios";

interface Prompt {
  prompt: string;
}

// Get API key from environment variables
export const API_KEY = process.env.NEXT_PUBLIC_GEMINI_API_KEY;

if (!API_KEY) {
  throw new Error("API key is missing. Please set it in the .env.local file.");
}

export const generateAIComment = async (prompt: Prompt) => {
  try {
    const response = await axios.post(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${API_KEY}`, // API URL
      {
        contents: [
          {
            parts: [{ text: prompt.prompt }], // User's prompt here
          },
        ],
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    // Extracting the generated comment from the response
    const generatedText = response.data.candidates?.[0]?.content?.parts?.[0]?.text;
    
    if (generatedText) {
      return generatedText.trim();
    } else {
      throw new Error("No generated text available.");
    }
  } catch (error) {
    console.error("Error generating AI comment:", error);
    throw new Error("Failed to generate AI comment.");
  }
};

