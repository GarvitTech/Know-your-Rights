import React from "react";
import { Link } from "react-router-dom";

const FEATURES = [
  { icon: "🌍", title: "4 Countries", desc: "India, USA, Kuwait & Russia" },
  { icon: "🤖", title: "AI Assistant", desc: "Ask any rights question" },
  { icon: "⚖️", title: "Legal Sources", desc: "Every right cited by law" },
  { icon: "🎯", title: "Personalised", desc: "Based on your age & role" },
];

export default function Welcome() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-blue-800 to-indigo-900 flex flex-col">
      {/* Hero */}
      <div className="flex-1 flex flex-col items-center justify-center text-center px-4 py-16">
        <div className="mb-6"><img src="/logo.png" alt="Know Your Rights" className="h-20 w-20 object-contain mx-auto" /></div>
        <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4 leading-tight">
          Know Your<br />
          <span className="text-blue-300">Democratic Rights</span>
        </h1>
        <p className="text-blue-200 text-lg max-w-xl mb-10">
          Understand your legal rights as a citizen — personalised by your country, age, and role.
          Powered by AI. Backed by law.
        </p>
        <div className="flex flex-col sm:flex-row gap-4">
          <Link to="/signup" className="bg-white text-blue-700 font-bold px-8 py-3.5 rounded-xl hover:bg-blue-50 transition-colors shadow-lg text-base">
            Get Started — It's Free
          </Link>
          <Link to="/login" className="border-2 border-white text-white font-semibold px-8 py-3.5 rounded-xl hover:bg-white/10 transition-colors text-base">
            Sign In
          </Link>
        </div>
      </div>

      {/* Features */}
      <div className="bg-white/10 backdrop-blur-sm border-t border-white/20 py-10 px-4">
        <div className="max-w-4xl mx-auto grid grid-cols-2 sm:grid-cols-4 gap-6">
          {FEATURES.map((f) => (
            <div key={f.title} className="text-center">
              <div className="text-3xl mb-2">{f.icon}</div>
              <div className="text-white font-semibold text-sm">{f.title}</div>
              <div className="text-blue-200 text-xs mt-0.5">{f.desc}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Countries */}
      <div className="bg-white py-12 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Supported Countries</h2>
          <p className="text-gray-500 mb-8">Rights data sourced directly from each country's constitution and laws</p>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {[
              { flag: "🇮🇳", name: "India", law: "Constitution of India" },
              { flag: "🇺🇸", name: "United States", law: "U.S. Constitution" },
              { flag: "🇰🇼", name: "Kuwait", law: "Constitution of Kuwait" },
              { flag: "🇷🇺", name: "Russia", law: "Russian Constitution" },
            ].map((c) => (
              <div key={c.name} className="card text-center hover:shadow-md transition-shadow">
                <div className="text-4xl mb-2">{c.flag}</div>
                <div className="font-semibold text-gray-900">{c.name}</div>
                <div className="text-xs text-gray-400 mt-1">{c.law}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="bg-gray-900 text-gray-400 text-center py-4 text-xs px-4">
        Made with ♡ BY GARVIT PANT
      </div>
    </div>
  );
}
