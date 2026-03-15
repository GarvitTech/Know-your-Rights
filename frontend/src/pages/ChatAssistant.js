import React, { useState, useRef, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { Link } from "react-router-dom";
import api from "../api";

const SUGGESTED = [
  "What are my rights if police stop me?",
  "Can my employer fire me without reason?",
  "What is my right to vote?",
  "Can my school punish me for speech?",
  "What are my digital privacy rights?",
  "What are emergency rights I should know?",
];

function MessageBubble({ msg }) {
  const isUser = msg.role === "user";
  return (
    <div className={`flex ${isUser ? "justify-end" : "justify-start"} mb-3`}>
      {!isUser && <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center text-sm mr-2 flex-shrink-0 mt-1">⚖️</div>}
      <div className={isUser ? "chat-bubble-user" : "chat-bubble-bot"}>
        <p className="text-sm whitespace-pre-wrap leading-relaxed">{msg.content}</p>
        <p className={`text-xs mt-1 ${isUser ? "text-blue-200" : "text-gray-400"}`}>{msg.time}</p>
      </div>
    </div>
  );
}

export default function ChatAssistant() {
  const { profile } = useAuth();
  const [messages, setMessages] = useState([
    {
      role: "assistant",
      content: `Hello! I'm your AI Rights Assistant. I can answer questions about your democratic and legal rights${profile ? ` in ${profile.country}` : ""}.\n\nAsk me anything like "What are my rights if police stop me?" or "Can my employer fire me without reason?"`,
      time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef(null);

  useEffect(() => { bottomRef.current?.scrollIntoView({ behavior: "smooth" }); }, [messages]);

  const sendMessage = async (text) => {
    const userMsg = text || input.trim();
    if (!userMsg) return;
    setInput("");
    const time = new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
    setMessages((prev) => [...prev, { role: "user", content: userMsg, time }]);
    setLoading(true);
    try {
      const res = await api.post("/chat", { message: userMsg });
      setMessages((prev) => [...prev, { role: "assistant", content: res.data.reply, time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }) }]);
    } catch {
      setMessages((prev) => [...prev, { role: "assistant", content: "Sorry, I couldn't process your request. Please try again.", time }]);
    } finally {
      setLoading(false);
    }
  };

  if (!profile) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
        <div className="card text-center max-w-md">
          <div className="text-5xl mb-4">🤖</div>
          <h2 className="text-xl font-bold text-gray-900 mb-2">Profile Required</h2>
          <p className="text-gray-500 mb-6">Please set up your profile first so the AI can give you country-specific answers.</p>
          <Link to="/profile-setup" className="btn-primary">Set Up Profile →</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <div className="max-w-3xl mx-auto w-full flex flex-col flex-1 px-4 py-6">
        {/* Header */}
        <div className="card mb-4 flex items-center gap-3">
          <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center text-xl">⚖️</div>
          <div>
            <h2 className="font-bold text-gray-900">AI Rights Assistant</h2>
            <p className="text-xs text-gray-500">Answering for {profile.country} · Age {profile.age}</p>
          </div>
          <span className="ml-auto flex items-center gap-1.5 text-xs text-green-600 bg-green-50 px-2.5 py-1 rounded-full">
            <span className="w-1.5 h-1.5 bg-green-500 rounded-full"></span>Online
          </span>
        </div>

        {/* Suggested questions */}
        {messages.length <= 1 && (
          <div className="mb-4">
            <p className="text-xs text-gray-500 mb-2 font-medium">💡 Try asking:</p>
            <div className="flex flex-wrap gap-2">
              {SUGGESTED.map((q) => (
                <button key={q} onClick={() => sendMessage(q)}
                  className="text-xs bg-white border border-gray-200 text-gray-700 px-3 py-1.5 rounded-full hover:bg-blue-50 hover:border-blue-300 hover:text-blue-700 transition-colors">
                  {q}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Messages */}
        <div className="flex-1 overflow-y-auto space-y-1 mb-4 min-h-0" style={{ maxHeight: "calc(100vh - 320px)" }}>
          {messages.map((m, i) => <MessageBubble key={i} msg={m} />)}
          {loading && (
            <div className="flex justify-start mb-3">
              <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center text-sm mr-2 flex-shrink-0">⚖️</div>
              <div className="chat-bubble-bot flex items-center gap-1">
                <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "0ms" }}></span>
                <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "150ms" }}></span>
                <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "300ms" }}></span>
              </div>
            </div>
          )}
          <div ref={bottomRef} />
        </div>

        {/* Input */}
        <div className="card p-3">
          <div className="flex gap-2">
            <input type="text" className="input flex-1" placeholder="Ask about your rights..."
              value={input} onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && !e.shiftKey && sendMessage()} disabled={loading} />
            <button onClick={() => sendMessage()} disabled={loading || !input.trim()} className="btn-primary px-4">
              {loading ? "..." : "Send"}
            </button>
          </div>
          <p className="text-xs text-gray-400 mt-2 text-center">Made with ♡ BY GARVIT PANT</p>
        </div>
      </div>
    </div>
  );
}
