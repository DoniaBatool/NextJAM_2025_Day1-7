// src/api/chatbot.ts

// src/api/chatbot.ts

import { NextApiRequest, NextApiResponse } from 'next';
import { OpenAI } from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,  // Make sure to set your OpenAI API key in .env file
});

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { userMessage } = req.body;

    try {
      // Use the GPT-3 model to generate a response
      const response = await openai.chat.completions.create({
        model: 'gpt-3.5-turbo',
        messages: [
          { role: 'system', content: 'You are a helpful assistant.' },
          { role: 'user', content: userMessage },
        ],
      });

      // Send back the generated response
      res.status(200).json({ message: response.choices[0].message.content });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Error generating response' });
    }
  } else {
    res.status(405).json({ error: 'Method Not Allowed' });
  }
}
