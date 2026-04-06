import { useState } from "react";
import { MessageCircle, X, Send } from "lucide-react";

const defaultReplies = [
  "I can help you find the best prices for your crops! What are you looking to buy or sell?",
  "Current wheat prices are trending upward at ₹2,450/quintal.",
  "Check weather before harvesting. Want forecast?",
  "You can connect with buyers directly. Need help?",
];

const ChatBot = () => {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      role: "assistant",
      content: "Hello! 🌾 I'm FarmBot. How can I help you?",
    },
  ]);
  const [input, setInput] = useState("");

  const send = () => {
    if (!input.trim()) return;

    const userMsg = { role: "user", content: input };
    const reply = {
      role: "assistant",
      content: defaultReplies[messages.length % defaultReplies.length],
    };

    setMessages((prev) => [...prev, userMsg, reply]);
    setInput("");
  };

  return (
    <>
      {/* Chat Window */}
      {open && (
        <div className="fixed bottom-24 right-6 z-50 flex h-[480px] w-[360px] flex-col overflow-hidden rounded-2xl border bg-white shadow-2xl">
          
          {/* Header */}
          <div className="flex items-center justify-between bg-green-600 px-4 py-3 text-white">
            <div>
              <p className="text-sm font-semibold">FarmBot AI</p>
              <p className="text-xs opacity-80">Always here to help</p>
            </div>
            <button onClick={() => setOpen(false)}>
              <X size={20} />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 space-y-3 overflow-y-auto p-4">
            {messages.map((m, i) => (
              <div
                key={i}
                className={`flex ${
                  m.role === "user" ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`max-w-[80%] rounded-2xl px-4 py-2 text-sm ${
                    m.role === "user"
                      ? "bg-green-600 text-white"
                      : "bg-gray-200 text-black"
                  }`}
                >
                  {m.content}
                </div>
              </div>
            ))}
          </div>

          {/* Input */}
          <div className="border-t p-3">
            <div className="flex gap-2">
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && send()}
                placeholder="Ask something..."
                className="flex-1 rounded-lg border px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-green-400"
              />
              <button
                onClick={send}
                className="rounded-lg bg-green-600 p-2 text-white hover:bg-green-700"
              >
                <Send size={16} />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Floating Button */}
      <button
        onClick={() => setOpen(!open)}
        className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-green-600 shadow-lg hover:scale-105 transition"
      >
        {open ? (
          <X className="text-white" size={24} />
        ) : (
          <MessageCircle className="text-white" size={24} />
        )}
      </button>
    </>
  );
};

export default ChatBot;