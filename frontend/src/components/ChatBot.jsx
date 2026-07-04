import React, { useState, useRef, useEffect } from "react";
import { MessageSquare, Send, X, Bot, User, Loader2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import API from "../api"; // Ensure this points to your axios instance

const ChatBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([
    { role: "bot", content: "Namaste! I am your FarmConnect AI. How can I help you with your crops today?" }
  ]);
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef(null);

  // Auto-scroll to latest message
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!input.trim() || loading) return;

    const userMessage = input;
    setInput("");
    setMessages((prev) => [...prev, { role: "user", content: userMessage }]);
    setLoading(true);

    try {
      // Convert history for the backend
      const historyMsg = messages.map(m => ({ 
        role: m.role === "bot" ? "assistant" : "user", 
        content: m.content 
      }));

      // Calling the connected chat route
      const res = await API.post("/chat", { message: userMessage, history: historyMsg });
      
      setMessages((prev) => [
        ...prev, 
        { role: "bot", content: res.data.reply }
      ]);
    } catch (error) {
      setMessages((prev) => [
        ...prev, 
        { role: "bot", content: "I'm having trouble connecting to my brain. Please check your internet or try again later!" }
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed bottom-8 right-8 z-[100]">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="mb-4 w-[350px] md:w-[400px] h-[500px] bg-zinc-900 border border-white/10 rounded-[2rem] shadow-2xl flex flex-col overflow-hidden backdrop-blur-xl"
          >
            {/* Header */}
            <div className="p-6 bg-emerald-500 text-black flex justify-between items-center">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-black/10 rounded-xl">
                  <Bot size={20} />
                </div>
                <div>
                  <h3 className="font-black uppercase text-xs tracking-widest">Farm AI Agent</h3>
                  <p className="text-[10px] font-bold opacity-70 uppercase">Online & Ready</p>
                </div>
              </div>
              <button onClick={() => setIsOpen(false)} className="hover:rotate-90 transition-transform">
                <X size={20} />
              </button>
            </div>

            {/* Messages Area */}
            <div ref={scrollRef} className="flex-1 overflow-y-auto p-6 space-y-4 scrollbar-hide">
              {messages.map((msg, i) => (
                <div key={i} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
                  <div className={`max-w-[80%] p-4 rounded-2xl text-xs leading-relaxed ${
                    msg.role === "user" 
                    ? "bg-emerald-500 text-black font-bold rounded-tr-none" 
                    : "bg-white/5 text-zinc-300 border border-white/5 rounded-tl-none"
                  }`}>
                    {msg.content}
                  </div>
                </div>
              ))}
              {loading && (
                <div className="flex justify-start">
                  <div className="bg-white/5 p-4 rounded-2xl rounded-tl-none border border-white/5">
                    <Loader2 size={16} className="animate-spin text-emerald-500" />
                  </div>
                </div>
              )}
            </div>

            {/* Input Area */}
            <form onSubmit={handleSendMessage} className="p-4 bg-black/20 border-t border-white/5 flex gap-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask about crops, soil, or seeds..."
                className="flex-1 bg-white/5 border border-white/10 rounded-xl px-4 py-2 text-xs focus:outline-none focus:border-emerald-500 transition-all"
              />
              <button type="submit" className="p-3 bg-emerald-500 text-black rounded-xl hover:bg-emerald-400 transition-all">
                <Send size={16} />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Toggle Button */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(!isOpen)}
        className="w-16 h-16 bg-emerald-500 rounded-full flex items-center justify-center text-black shadow-lg shadow-emerald-500/20 relative"
      >
        {isOpen ? <X size={28} /> : <MessageSquare size={28} />}
        {!isOpen && (
          <span className="absolute -top-1 -right-1 w-4 h-4 bg-white rounded-full animate-ping" />
        )}
      </motion.button>
    </div>
  );
};

export default ChatBot;