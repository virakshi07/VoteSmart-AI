import { GoogleGenerativeAI } from '@google/generative-ai';

export interface ChatMessage {
  id: string;
  role: 'user' | 'model';
  content: string;
}

const genAI = new GoogleGenerativeAI(
  import.meta.env.VITE_GEMINI_API_KEY
);

const model = genAI.getGenerativeModel({
  model: 'gemini-1.5-flash',
  systemInstruction: `You are Election Buddy, a friendly and helpful
AI assistant that answers questions about voting, elections, and
civic participation. Keep answers clear and concise.`,
});

export const generateChatResponse = async (
  messageHistory: ChatMessage[],
  newMessage: string
): Promise<string> => {
  try {
    const history = messageHistory
      .slice(-20)
      .map((msg) => ({
        role: msg.role,
        parts: [{ text: msg.content }],
      }));

    const chat = model.startChat({ history });
    const result = await chat.sendMessage(newMessage);
    return result.response.text();
  } catch (error) {
    console.error('Gemini error:', error);
    return "I'm having trouble connecting. Please try again.";
  }
};