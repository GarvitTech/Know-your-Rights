// ============================================================
// Project  : Know Your Democratic Rights
// Author   : Garvit Pant
// GitHub   : https://github.com/GarvitTech
// © 2026 Garvit Pant. All rights reserved.
// ============================================================

import React from "react";
import { Link } from "react-router-dom";

const FEATURES = [
  { icon: "🌍", title: "4 Countries", desc: "India, USA, Kuwait & Russia" },
  { icon: "🤖", title: "AI Assistant", desc: "Ask any rights question" },
  { icon: "⚖️", title: "Legal Sources", desc: "Every right cited by law" },
  { icon: "🎯", title: "Personalised", desc: "Based on your age & role" },
];

const COUNTRIES = [
  { flag: "🇮🇳", name: "India",         law: "Constitution of India" },
  { flag: "🇺🇸", name: "United States", law: "U.S. Constitution" },
  { flag: "🇰🇼", name: "Kuwait",        law: "Constitution of Kuwait" },
  { flag: "🇷🇺", name: "Russia",        law: "Russian Constitution" },
];

export default function Welcome() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-blue-800 to-indigo-900 flex flex-col">

      {/* Hero */}
      <div className="flex-1 flex flex-col items-center justify-center text-center px-4 py-12 sm:py-20">
        <div className="mb-5">
          <img src="/logo.png" alt="Know Your Rights" className="h-16 w-16 sm:h-20 sm:w-20 object-contain mx-auto drop-shadow-lg" />
        </div>
        <h1 className="text-3xl sm:text-5xl font-bold text-white mb-4 leading-tight">
          Know Your<br />
          <span className="text-blue-300">Democratic Rights</span>
        </h1>
        <p className="text-blue-200 text-base sm:text-lg max-w-xl mb-8 px-2">
          Understand your legal rights as a citizen — personalised by your country, age, and role.
          Powered by AI. Backed by law.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 w-full max-w-xs sm:max-w-none sm:w-auto">
          <Link to="/signup"
            className="bg-white text-blue-700 font-bold px-8 py-3.5 rounded-xl hover:bg-blue-50 active:bg-blue-100 transition-colors shadow-lg text-base text-center">
            Get Started — It's Free
          </Link>
          <Link to="/login"
            className="border-2 border-white text-white font-semibold px-8 py-3.5 rounded-xl hover:bg-white/10 active:bg-white/20 transition-colors text-base text-center">
            Sign In
          </Link>
        </div>
      </div>

      {/* Features */}
      <div className="bg-white/10 backdrop-blur-sm border-t border-white/20 py-8 sm:py-10 px-4">
        <div className="max-w-4xl mx-auto grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6">
          {FEATURES.map((f) => (
            <div key={f.title} className="text-center">
              <div className="text-2xl sm:text-3xl mb-2">{f.icon}</div>
              <div className="text-white font-semibold text-xs sm:text-sm">{f.title}</div>
              <div className="text-blue-200 text-xs mt-0.5 hidden sm:block">{f.desc}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Countries */}
      <div className="bg-white py-10 sm:py-12 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2">Supported Countries</h2>
          <p className="text-gray-500 text-sm sm:text-base mb-6 sm:mb-8">
            Rights data sourced directly from each country's constitution and laws
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
            {COUNTRIES.map((c) => (
              <div key={c.name} className="card text-center hover:shadow-md transition-shadow p-3 sm:p-6">
                <div className="text-3xl sm:text-4xl mb-2">{c.flag}</div>
                <div className="font-semibold text-gray-900 text-sm sm:text-base">{c.name}</div>
                <div className="text-xs text-gray-400 mt-1 hidden sm:block">{c.law}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="bg-gray-900 text-gray-400 text-center py-4 text-xs px-4">
        Made with ♡ by <span className="text-gray-300 font-medium">Garvit Pant</span>
        &nbsp;·&nbsp;
        <span className="text-amber-400">⚠️ Educational use only. Not legal advice.</span>
      </div>
    </div>
  );
}
