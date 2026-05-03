/// <reference types="node" />
import { GoogleGenerativeAI } from '@google/generative-ai';

const SYSTEM_INSTRUCTION = `
You are "Election Buddy", a friendly, helpful, and beginner-focused AI assistant 
for an educational web app about the voting process.
Keep language simple. Do NOT give specific, legally binding advice. 
If asked about unrelated topics, steer back to voting.
`;

export default async function handler(req: any, res: any) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const API_KEY = process.env.GEMINI_API_KEY;
  if (!API_KEY) {
    return res.status(500).json({ error: "API key missing" });
  }

  try {
    const { messageHistory, newMessage } = req.body;

    const genAI = new GoogleGenerativeAI(API_KEY);
    const model = genAI.getGenerativeModel({
      model: "gemini-2.0-flash",
      systemInstruction: SYSTEM_INSTRUCTION,
    });

    const text = newMessage.toLowerCase();

    if (
      text.includes("vote") ||
      text.includes("register") ||
      text.includes("id") ||
      text.includes("eligibility")
    ) {
      // call Gemini
    } else {
      return res.status(200).json({
        text: "I can help with voting questions like registration, eligibility, and process."
      });
    }

    // Gemini requires history to start with a 'user' message
    const rawHistory = Array.isArray(messageHistory) ? messageHistory : [];
    const firstUserIdx = rawHistory.findIndex((m: any) => m.role === 'user');

    const safeHistory = firstUserIdx === -1
      ? []
      : rawHistory.slice(firstUserIdx).map((msg: any) => ({
          role: msg.role === 'user' ? 'user' : 'model',
          parts: [{ text: msg.content }],
        }));

    const chat = model.startChat({ history: safeHistory });
    const result = await chat.sendMessage(newMessage);
    const response = await result.response;

    return res.status(200).json({ text: response.text() });

  } catch (error: any) {
    console.error("Gemini API Error:", error);

    // ✅ ADDED FALLBACK (only addition)
    return res.status(200).json({
      text: "⚠️ AI limit reached. Here's a quick guide:\n\n1. Register on NVSP portal\n2. Fill Form 6\n3. Upload documents\n4. Receive your voter ID\n\nYou can still ask basic questions!"
    });
  }
}