"use client";

import React, { useState, useRef, useEffect } from 'react';
import { 
  Send, Bot, User, ChevronLeft, Sparkles, 
  MessageSquare, Trash2, BrainCircuit, Zap,
  Utensils, Info
} from 'lucide-react';
import Groq from "groq-sdk";

interface Message {
  id: string;
  role: 'user' | 'model';
  text: string;
  timestamp: Date;
}

interface AIChatBotProps {
  apiKey: string;
  onBack: () => void;
}

export default function AIChatBot({ apiKey, onBack }: AIChatBotProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      role: 'model',
      text: "Hello! I'm your DineAnalytics AI consultant. I can help you analyze market trends, predict restaurant success, or answer any questions about the data we've gathered. How can I assist your culinary strategy today?",
      timestamp: new Date()
    }
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      text: input,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    try {
      const groq = new Groq({
        apiKey: process.env.GROQ_API_KEY || apiKey,
        dangerouslyAllowBrowser: true 
      });

      const chatCompletion = await groq.chat.completions.create({
        messages: [
          {
            role: "system",
            content: "You are a DineAnalytics AI consultant. You analyze market trends and restaurant success patterns."
          },
          ...messages.map(msg => ({
            role: msg.role === 'model' ? 'assistant' : 'user' as any,
            content: msg.text,
          })),
          {
            role: "user",
            content: input,
          },
        ],
        model: "llama-3.3-70b-versatile",
        temperature: 0.7,
        max_tokens: 1024,
      });

      const text = chatCompletion.choices[0]?.message?.content || "I couldn't generate a response.";

      const modelMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'model',
        text: text,
        timestamp: new Date()
      };

      setMessages(prev => [...prev, modelMessage]);
    } catch (error) {
      console.error("AI Error:", error);
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'model',
        text: "I apologize, but I'm having trouble connecting to my intelligence engine. Please check your API key or try again in a moment.",
        timestamp: new Date()
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const clearChat = () => {
    setMessages([{
      id: '1',
      role: 'model',
      text: "Chat cleared. Ready for your next strategic inquiry!",
      timestamp: new Date()
    }]);
  };

  return (
    <div className="flex flex-col h-[calc(100vh-160px)] bg-white rounded-[3rem] overflow-hidden shadow-2xl border border-slate-100 animate-in fade-in zoom-in-95 duration-700 relative">
      {/* Background Decorative Elements */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-slate-50 rounded-full -translate-y-1/2 translate-x-1/2 -z-10 opacity-50 blur-3xl"></div>
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-50 rounded-full translate-y-1/2 -translate-x-1/2 -z-10 opacity-50 blur-3xl"></div>

      {/* Header */}
      <div className="p-8 border-b border-slate-50 bg-white/80 backdrop-blur-xl flex items-center justify-between sticky top-0 z-20">
        <div className="flex items-center gap-6">
          <button 
            onClick={onBack} 
            className="p-4 bg-slate-50 rounded-2xl hover:bg-[#FACC15] transition-all group shadow-sm"
          >
            <ChevronLeft className="w-6 h-6 text-slate-600 group-hover:text-slate-900" />
          </button>
          <div className="space-y-1">
            <h2 className="text-3xl font-black text-slate-900 tracking-tighter flex items-center gap-3">
              AI Strategy Consultant
              <Sparkles className="w-6 h-6 text-[#FACC15] animate-pulse" />
            </h2>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em]">Neural Intelligence Active</p>
            </div>
          </div>
        </div>
        
        <button 
          onClick={clearChat}
          className="p-4 text-slate-300 hover:text-red-500 hover:bg-red-50 rounded-2xl transition-all"
          title="Clear Conversation"
        >
          <Trash2 className="w-5 h-5" />
        </button>
      </div>

      {/* Chat Messages */}
      <div 
        ref={scrollRef}
        className="flex-1 overflow-y-auto p-8 space-y-8 custom-scrollbar scroll-smooth"
      >
        {messages.map((msg) => (
          <div 
            key={msg.id} 
            className={`flex items-start gap-4 ${msg.role === 'user' ? 'flex-row-reverse' : ''} animate-in slide-in-from-bottom-4 duration-500`}
          >
            <div className={`p-4 rounded-2xl shadow-sm ${
              msg.role === 'user' ? 'bg-[#111111] text-white' : 'bg-slate-50 text-slate-900 border border-slate-100'
            }`}>
              {msg.role === 'user' ? <User className="w-5 h-5" /> : <Bot className="w-5 h-5 text-[#FACC15]" />}
            </div>
            
            <div className={`max-w-[80%] space-y-2 ${msg.role === 'user' ? 'text-right' : 'text-left'}`}>
              <div className={`p-6 rounded-[2rem] text-sm font-medium leading-relaxed shadow-sm ${
                msg.role === 'user' 
                  ? 'bg-blue-600 text-white rounded-tr-none' 
                  : 'bg-white border border-slate-100 text-slate-800 rounded-tl-none'
              }`}>
                {msg.text}
              </div>
              <p className="text-[9px] font-black text-slate-300 uppercase tracking-widest px-2">
                {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </p>
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex items-start gap-4 animate-pulse">
            <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100">
              <BrainCircuit className="w-5 h-5 text-blue-500" />
            </div>
            <div className="p-6 bg-slate-50 rounded-[2rem] rounded-tl-none border border-slate-100 flex gap-1">
              <div className="w-1.5 h-1.5 bg-slate-300 rounded-full animate-bounce"></div>
              <div className="w-1.5 h-1.5 bg-slate-300 rounded-full animate-bounce delay-100"></div>
              <div className="w-1.5 h-1.5 bg-slate-300 rounded-full animate-bounce delay-200"></div>
            </div>
          </div>
        )}
      </div>

      {/* Input Area */}
      <div className="p-8 bg-white border-t border-slate-50 sticky bottom-0 z-20">
        <form onSubmit={handleSend} className="relative group max-w-4xl mx-auto">
          <input 
            type="text" 
            placeholder="Ask about market deltas, city performance, or culinary strategy..." 
            value={input}
            onChange={(e) => setInput(e.target.value)}
            disabled={isLoading}
            className="w-full pl-8 pr-20 py-6 bg-slate-50 border-2 border-slate-50 rounded-[2rem] text-sm font-bold text-slate-900 placeholder:text-slate-300 focus:outline-none focus:border-[#FACC15] focus:bg-white transition-all shadow-sm group-hover:bg-slate-100/50"
          />
          <button 
            type="submit"
            disabled={!input.trim() || isLoading}
            className="absolute right-4 top-1/2 -translate-y-1/2 p-4 bg-[#111111] text-white rounded-2xl hover:bg-[#FACC15] hover:text-slate-900 transition-all shadow-xl disabled:opacity-50 disabled:hover:bg-[#111111] disabled:hover:text-white"
          >
            <Send className="w-5 h-5" />
          </button>
        </form>
        <div className="flex items-center justify-center gap-8 mt-6">
           <div className="flex items-center gap-2">
              <Zap className="w-3.5 h-3.5 text-amber-500" />
              <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Low Latency Flash Engine</span>
           </div>
           <div className="flex items-center gap-2">
              <BrainCircuit className="w-3.5 h-3.5 text-blue-500" />
              <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Culinary Knowledge Graph</span>
           </div>
        </div>
      </div>
    </div>
  );
}
