import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageSquare, X, Send, Bot, User, Loader2, Sparkles } from "lucide-react";
import API from "../api";

const AgriAgentChat = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { role: "assistant", content: "Hello Kisan Bhai! I am your AI Agriculture Expert. How can I assist you with your crops, soil, or weather today?" }
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen]);

  const handleSend = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMsg = { role: "user", content: input };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setIsLoading(true);

    try {
      // Send history and current message
      // Note: we don't send the very first welcome message as part of Langchain history if we want to save tokens, 
      // but sending it is fine. Here we just format it simply.
      const historyMsg = messages.map(m => ({ role: m.role, content: m.content }));
      
      const res = await API.post("/chat", {
        message: userMsg.content,
        history: historyMsg
      });

      if (res.data && res.data.success) {
        setMessages((prev) => [...prev, { role: "assistant", content: res.data.reply }]);
      } else {
        setMessages((prev) => [...prev, { role: "assistant", content: "Sorry, I am facing some issues connecting right now." }]);
      }
    } catch (error) {
      console.error("Chat Error", error);
      setMessages((prev) => [...prev, { role: "assistant", content: "Connection Error. Please check your internet or correct API key." }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {/* Floating Button */}
      <motion.button
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 w-14 h-14 bg-emerald-500 rounded-full flex items-center justify-center text-black shadow-2xl z-50 hover:bg-emerald-400 transition-colors"
      >
        <MessageSquare size={24} weight="fill" />
        <span className="absolute -top-1 -right-1 flex h-4 w-4">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-4 w-4 bg-emerald-300 border-2 border-black"></span>
        </span>
      </motion.button>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.9 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
            className="fixed bottom-24 right-6 w-[350px] sm:w-[400px] h-[500px] bg-[#0c0c0c]/90 backdrop-blur-2xl border border-white/10 rounded-[2rem] shadow-2xl flex flex-col z-50 overflow-hidden"
          >
            {/* Header */}
            <div className="px-6 py-4 border-b border-white/5 bg-white/[0.02] flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-full bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center">
                  <Bot size={20} className="text-emerald-400" />
                </div>
                <div>
                  <h3 className="font-bold text-white leading-tight flex items-center gap-1">
                    Agri-Agent <Sparkles size={12} className="text-emerald-500" />
                  </h3>
                  <p className="text-[10px] font-black uppercase tracking-widest text-emerald-500/80">Online Expert</p>
                </div>
              </div>
              <button 
                onClick={() => setIsOpen(false)}
                className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center text-zinc-400 hover:bg-white/10 hover:text-white transition-colors"
              >
                <X size={16} />
              </button>
            </div>

            {/* Chat Area */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-hide">
              {messages.map((msg, idx) => (
                <div 
                  key={idx} 
                  className={`flex items-end gap-2 ${msg.role === "user" ? "flex-row-reverse" : "flex-row"}`}
                >
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${msg.role === "user" ? "bg-zinc-800" : "bg-emerald-500/20"}`}>
                    {msg.role === "user" ? <User size={14} className="text-white" /> : <Bot size={14} className="text-emerald-400" />}
                  </div>
                  <div 
                    className={`max-w-[75%] px-4 py-3 rounded-2xl text-sm leading-relaxed ${
                      msg.role === "user" 
                        ? "bg-zinc-800 text-white rounded-br-sm" 
                        : "bg-emerald-500/10 text-emerald-50 border border-emerald-500/10 rounded-bl-sm"
                    }`}
                  >
                    {msg.content}
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="flex items-end gap-2">
                  <div className="w-8 h-8 rounded-full bg-emerald-500/20 flex items-center justify-center">
                    <Bot size={14} className="text-emerald-400" />
                  </div>
                  <div className="px-4 py-3 bg-emerald-500/10 rounded-2xl rounded-bl-sm border border-emerald-500/10 flex gap-1 items-center">
                     <span className="w-2 h-2 bg-emerald-500 rounded-full animate-bounce"></span>
                     <span className="w-2 h-2 bg-emerald-500 rounded-full animate-bounce [animation-delay:-.3s]"></span>
                     <span className="w-2 h-2 bg-emerald-500 rounded-full animate-bounce [animation-delay:-.5s]"></span>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input Area */}
            <div className="p-4 border-t border-white/5 bg-white/[0.01]">
              <form onSubmit={handleSend} className="relative flex items-center">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Ask about crops, soil, pests..."
                  className="w-full bg-white/5 border border-white/10 rounded-full py-3 min-h-[50px] pl-4 pr-12 text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-emerald-500/50 transition-colors"
                />
                <button
                  type="submit"
                  disabled={isLoading || !input.trim()}
                  className="absolute right-2 w-9 h-9 bg-emerald-500 rounded-full flex items-center justify-center text-black hover:bg-emerald-400 disabled:opacity-50 disabled:hover:bg-emerald-500 transition-colors"
                >
                  <Send size={16} className="ml-1" />
                </button>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default AgriAgentChat;
