// src/api/chatbot

import { NextRequest, NextResponse } from 'next/server';
import { OpenAI } from 'openai';

const openai = new OpenAI({
  apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY,  // Make sure to set your OpenAI API key in .env file
});

export async function POST(req: NextRequest) {
  try {
    // Parse the request body
    const { userMessage } = await req.json();

    // Use the GPT-3 model to generate a response
    const response = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [
        { role: 'system', content: 'You are a helpful assistant.' },
        { role: 'user', content: userMessage },
      ],
    });

    // Send back the generated response
    return NextResponse.json({ message: response.choices[0].message.content });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Error generating response' }, { status: 500 });
  }
}
