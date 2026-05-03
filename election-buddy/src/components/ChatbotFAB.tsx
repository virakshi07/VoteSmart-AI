import { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send, Loader2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { generateChatResponse, type ChatMessage } from '../services/geminiService';
import { analytics, logEvent } from '../services/firebaseService';

const ChatbotFAB = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    { id: 'welcome', role: 'model', content: "Hi! I'm your Election Buddy AI 🤖. What would you like to know about voting?" }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const suggestions = [
    { text: "How do I register to vote?", emoji: "🗳️" },
    { text: "What ID do I need?", emoji: "📋" },
    { text: "When is the next election?", emoji: "📅" },
    { text: "How are votes counted?", emoji: "🔢" }
  ];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isOpen]);

  useEffect(() => {
    if (isOpen) inputRef.current?.focus();
  }, [isOpen]);

  const sendMessage = async (text: string) => {
    if (!text.trim() || isLoading) return;

    const userMessage = text.trim();
    setInputValue('');

    const updatedMessages: ChatMessage[] = [
      ...messages,
      { id: `user-${Date.now()}`, role: 'user', content: userMessage }
    ];
    setMessages(updatedMessages);

    logEvent(analytics, 'message_sent', {
      message_length: userMessage.length,
    });
    setIsLoading(true);

    try {
      const responseText = await generateChatResponse(messages, userMessage);
      setMessages([...updatedMessages, { id: `model-${Date.now()}`, role: 'model', content: responseText }]);
    } catch (error) {
      console.error(error);
      setMessages([...updatedMessages, { id: `error-${Date.now()}`, role: 'model', content: "Something went wrong. Please try again." }]);
    }

    setIsLoading(false);
  };

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    sendMessage(inputValue);
  };

  return (
    <>
      {/* FAB Button */}
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => {
          setIsOpen(true);
          logEvent(analytics, 'chat_opened');
        }}
        aria-label="Open Election Buddy AI chat"
        aria-haspopup="dialog"
        className={`fixed bottom-6 right-6 p-4 rounded-full shadow-xl z-40 ${isOpen ? 'scale-0 opacity-0 pointer-events-none' : 'scale-100 opacity-100 bg-blue-600 text-white'}`}
      >
        <MessageCircle className="h-6 w-6" aria-hidden="true" />
      </motion.button>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label="Election Buddy AI Chat"
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.5, opacity: 0 }}
            className="fixed bottom-6 right-6 w-[380px] h-[600px] bg-white dark:bg-slate-900 rounded-2xl shadow-2xl flex flex-col z-50"
          >
            {/* Header */}
            <div className="bg-blue-600 text-white p-4 flex justify-between items-center rounded-t-2xl">
              <h2 className="font-bold text-lg" id="chat-title">Election Buddy AI</h2>
              <button
                onClick={() => setIsOpen(false)}
                aria-label="Close chat"
                className="p-1 rounded hover:bg-blue-700 transition-colors"
              >
                <X aria-hidden="true" />
              </button>
            </div>

            {/* Messages */}
            <div
              className="flex-grow p-4 overflow-y-auto flex flex-col gap-3"
              role="log"
              aria-live="polite"
              aria-label="Chat messages"
            >
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  role="article"
                  aria-label={msg.role === 'user' ? 'Your message' : 'Election Buddy response'}
                  className={`p-3 rounded-xl max-w-[80%] ${msg.role === 'user'
                    ? 'bg-blue-600 text-white self-end'
                    : 'bg-gray-200 dark:bg-slate-700 self-start'}`}
                >
                  {msg.content}
                </div>
              ))}

              {isLoading && (
                <div className="flex items-center gap-2 text-sm" aria-live="polite" aria-label="Election Buddy is thinking">
                  <Loader2 className="animate-spin h-4 w-4" aria-hidden="true" />
                  Thinking...
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Suggestions */}
            {!isLoading && messages.length < 3 && (
              <div className="p-3 flex flex-wrap gap-2" role="group" aria-label="Suggested questions">
                {suggestions.map((s, i) => (
                  <button
                    key={i}
                    onClick={() => {
                      sendMessage(s.text);
                      logEvent(analytics, 'suggestion_clicked', { text: s.text });
                    }}
                    aria-label={`Ask: ${s.text}`}
                    className="text-xs bg-gray-200 dark:bg-slate-700 px-3 py-1 rounded-full hover:bg-gray-300 transition-colors"
                  >
                    {s.emoji} {s.text}
                  </button>
                ))}
              </div>
            )}

            {/* Input */}
            <form onSubmit={handleSendMessage} className="p-3 flex gap-2" role="search" aria-label="Send a message">
              <label htmlFor="chat-input" className="sr-only">Type your voting question</label>
              <input
                id="chat-input"
                ref={inputRef}
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                className="flex-grow border rounded-lg px-3 py-2 dark:bg-slate-800 dark:border-slate-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Ask something..."
                aria-label="Type your voting question"
                disabled={isLoading}
              />
              <button
                type="submit"
                disabled={!inputValue.trim() || isLoading}
                aria-label="Send message"
                className="bg-blue-600 text-white px-3 rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                <Send aria-hidden="true" />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default ChatbotFAB;