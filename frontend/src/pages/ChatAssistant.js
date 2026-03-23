// ============================================================
// Project  : Know Your Democratic Rights
// Author   : Garvit Pant
// GitHub   : https://github.com/GarvitTech
// © 2026 Garvit Pant. All rights reserved.
// ============================================================

import React, { useState, useRef, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { Link } from "react-router-dom";
import api from "../api";

const SUGGESTED = [
  "What are my rights if police stop me?",
  "Can my employer fire me without reason?",
  "What is my right to vote?",
  "What are my digital privacy rights?",
  "What rights do students have?",
  "What are emergency rights I should know?",
];

// Render **bold** markdown in text
function renderText(text) {
  const parts = text.split(/(\*\*[^*]+\*\*)/g);
  return parts.map((part, i) => {
    if (part.startsWith("**") && part.endsWith("**")) {
      return <strong key={i}>{part.slice(2, -2)}</strong>;
    }
    return <span key={i}>{part}</span>;
  });
}

function MessageBubble({ msg }) {
  const isUser = msg.role === "user";
  return (
    <div className={`flex ${isUser ? "justify-end" : "justify-start"} mb-3 items-end gap-2`}>
      {!isUser && (
        <div className="w-7 h-7 sm:w-8 sm:h-8 bg-blue-100 rounded-full flex items-center justify-center text-xs sm:text-sm flex-shrink-0">
          ⚖️
        </div>
      )}
      <div className={isUser ? "chat-bubble-user" : "chat-bubble-bot"}>
        <p className="text-sm whitespace-pre-wrap leading-relaxed">{renderText(msg.content)}</p>
        <p className={`text-xs mt-1 ${isUser ? "text-blue-200" : "text-gray-400"}`}>{msg.time}</p>
      </div>
    </div>
  );
}

export default function ChatAssistant() {
  const { profile } = useAuth();
  const [messages, setMessages] = useState([{
    role: "assistant",
    content: `Hello! I'm your Rights Assistant 🤖\n\nI can answer questions about your democratic and legal rights${profile ? ` in ${profile.country}` : ""}.\n\nTry asking: "What are my rights if police stop me?"`,
    time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
  }]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  const sendMessage = async (text) => {
    const userMsg = (text || input).trim();
    if (!userMsg || loading) return;
    setInput("");
    const time = new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
    setMessages((prev) => [...prev, { role: "user", content: userMsg, time }]);
    setLoading(true);
    try {
      const res = await api.post("/chat", { message: userMsg });
      setMessages((prev) => [...prev, {
        role: "assistant",
        content: res.data.reply,
        time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      }]);
    } catch {
      setMessages((prev) => [...prev, {
        role: "assistant",
        content: "Sorry, I couldn't process your request. Please try again.",
        time,
      }]);
    } finally {
      setLoading(false);
      inputRef.current?.focus();
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  if (!profile) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
        <div className="card text-center max-w-md w-full">
          <div className="text-5xl mb-4">🤖</div>
          <h2 className="text-xl font-bold text-gray-900 mb-2">Profile Required</h2>
          <p className="text-gray-500 mb-6 text-sm">
            Please set up your profile first so the AI can give you country-specific answers.
          </p>
          <Link to="/profile-setup" className="btn-primary inline-block">Set Up Profile →</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="h-[calc(100vh-56px)] sm:h-[calc(100vh-64px)] bg-gray-50 flex flex-col">
      <div className="max-w-3xl mx-auto w-full flex flex-col flex-1 px-3 sm:px-4 py-3 sm:py-4 min-h-0">

        {/* Header */}
        <div className="card mb-3 flex items-center gap-3 p-3 sm:p-4 flex-shrink-0">
          <div className="w-9 h-9 sm:w-10 sm:h-10 bg-blue-100 rounded-full flex items-center justify-center text-lg sm:text-xl flex-shrink-0">
            ⚖️
          </div>
          <div className="min-w-0">
            <h2 className="font-bold text-gray-900 text-sm sm:text-base">Rights Assistant</h2>
            <p className="text-xs text-gray-500 truncate">
              {profile.country} · Age {profile.age}
            </p>
          </div>
          <span className="ml-auto flex items-center gap-1.5 text-xs text-green-600 bg-green-50 px-2 py-1 rounded-full flex-shrink-0">
            <span className="w-1.5 h-1.5 bg-green-500 rounded-full" />
            Online
          </span>
        </div>

        {/* Suggested questions */}
        {messages.length <= 1 && (
          <div className="mb-3 flex-shrink-0">
            <p className="text-xs text-gray-500 mb-2 font-medium">💡 Try asking:</p>
            <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-hide">
              {SUGGESTED.map((q) => (
                <button key={q} onClick={() => sendMessage(q)}
                  className="text-xs bg-white border border-gray-200 text-gray-700 px-3 py-1.5 rounded-full hover:bg-blue-50 hover:border-blue-300 hover:text-blue-700 transition-colors whitespace-nowrap flex-shrink-0">
                  {q}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Messages */}
        <div className="flex-1 overflow-y-auto min-h-0 mb-3 space-y-1 pr-1">
          {messages.map((m, i) => <MessageBubble key={i} msg={m} />)}
          {loading && (
            <div className="flex justify-start mb-3 items-end gap-2">
              <div className="w-7 h-7 sm:w-8 sm:h-8 bg-blue-100 rounded-full flex items-center justify-center text-xs flex-shrink-0">⚖️</div>
              <div className="chat-bubble-bot flex items-center gap-1 py-3">
                {[0, 150, 300].map((delay) => (
                  <span key={delay} className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                    style={{ animationDelay: `${delay}ms` }} />
                ))}
              </div>
            </div>
          )}
          <div ref={bottomRef} />
        </div>

        {/* Input */}
        <div className="card p-2 sm:p-3 flex-shrink-0">
          <div className="flex gap-2">
            <input ref={inputRef} type="text" className="input flex-1 py-2.5 text-sm"
              placeholder="Ask about your rights..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              disabled={loading} />
            <button onClick={() => sendMessage()} disabled={loading || !input.trim()}
              className="btn-primary px-3 sm:px-4 py-2.5 text-sm flex-shrink-0">
              {loading ? "..." : "Send"}
            </button>
          </div>
          <p className="text-xs text-gray-400 mt-2 text-center">
            Built with ❤️ by <span className="font-medium">Garvit Pant</span>
          </p>
        </div>
      </div>
    </div>
  );
}
