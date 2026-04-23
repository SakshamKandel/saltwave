import { NextResponse } from 'next/server';

const GROQ_API_KEY = process.env.GROQ_API_KEY;

export async function POST(req: Request) {
  try {
    const { message } = await req.json();

    const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${GROQ_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "llama-3.3-70b-versatile",
        messages: [
          {
            role: "system",
            content: "You are the Salt Route Concierge, a warm, sophisticated, and human-like digital partner for Salt Route Group (a Nepal-based collective). Your goal is to help users navigate our ventures in consulting, experiences, and sustainable development. Be concise, visionary, and approachable. Avoid technical jargon. Always maintain a premium, professional tone. If asked about contact, mention working together through our platform."
          },
          {
            role: "user",
            content: message
          }
        ],
        temperature: 0.7,
        max_tokens: 500,
      }),
    });

    const data = await response.json();
    
    if (data.choices && data.choices[0]) {
        return NextResponse.json({ text: data.choices[0].message.content });
    }

    throw new Error("Invalid response from Groq");
  } catch (error) {
    console.error("Groq API Error:", error);
    return NextResponse.json({ error: 'Failed to process AI request' }, { status: 500 });
  }
}
