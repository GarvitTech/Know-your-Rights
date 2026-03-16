// ============================================================
// Project  : Know Your Democratic Rights
// Author   : Garvit Pant
// GitHub   : https://github.com/GarvitTech
// © 2026 Garvit Pant. All rights reserved.
// ============================================================

import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import api from "../api";
import RightCard from "../components/RightCard";
import Disclaimer from "../components/Disclaimer";

const COUNTRY_FLAGS = { India: "🇮🇳", USA: "🇺🇸", Kuwait: "🇰🇼", Russia: "🇷🇺" };

export default function Dashboard() {
  const { user, profile } = useAuth();
  const [rights, setRights] = useState([]);
  const [emergency, setEmergency] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("all");

  useEffect(() => {
    if (!profile) { setLoading(false); return; }
    Promise.all([
      api.get("/rights/my"),
      api.get("/rights", { params: { country: profile.country, emergency: true } })
    ]).then(([r1, r2]) => {
      setRights(r1.data);
      setEmergency(r2.data);
    }).finally(() => setLoading(false));
  }, [profile]);

  if (!profile) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
        <div className="card text-center max-w-md">
          <div className="text-5xl mb-4">👤</div>
          <h2 className="text-xl font-bold text-gray-900 mb-2">Complete Your Profile</h2>
          <p className="text-gray-500 mb-6">Set up your profile to see personalised rights for your country and age.</p>
          <Link to="/profile-setup" className="btn-primary">Set Up Profile →</Link>
        </div>
      </div>
    );
  }

  const categories = [...new Set(rights.map((r) => r.category))];
  const filtered = activeTab === "all" ? rights : activeTab === "emergency" ? emergency : rights.filter((r) => r.category === activeTab);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-5xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-700 to-indigo-700 rounded-2xl p-6 text-white mb-6">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div>
              <h1 className="text-2xl font-bold">Hello, {user?.name?.split(" ")[0]}! 👋</h1>
              <p className="text-blue-200 mt-1">
                {COUNTRY_FLAGS[profile.country]} {profile.country} · Age {profile.age}
                {profile.occupation && ` · ${profile.occupation}`}
              </p>
            </div>
            <div className="flex gap-3">
              <div className="bg-white/20 rounded-xl px-4 py-2 text-center">
                <div className="text-2xl font-bold">{rights.length}</div>
                <div className="text-xs text-blue-200">Your Rights</div>
              </div>
              <div className="bg-white/20 rounded-xl px-4 py-2 text-center">
                <div className="text-2xl font-bold">{emergency.length}</div>
                <div className="text-xs text-blue-200">Emergency</div>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
          {[
            { to: "/chat", icon: "🤖", label: "Ask AI Assistant" },
            { to: "/explore", icon: "🔍", label: "Explore Rights" },
            { to: "/education", icon: "📚", label: "Learn Rights" },
            { to: "/profile-setup", icon: "✏️", label: "Edit Profile" },
          ].map((a) => (
            <Link key={a.to} to={a.to} className="card text-center hover:shadow-md transition-shadow hover:border-blue-200 border border-transparent">
              <div className="text-2xl mb-1">{a.icon}</div>
              <div className="text-xs font-medium text-gray-700">{a.label}</div>
            </Link>
          ))}
        </div>

        <Disclaimer />

        {/* Tabs */}
        <div className="flex gap-2 mt-6 mb-4 overflow-x-auto pb-1">
          <button onClick={() => setActiveTab("all")}
            className={`px-4 py-2 rounded-xl text-sm font-medium whitespace-nowrap transition-colors ${activeTab === "all" ? "bg-blue-600 text-white" : "bg-white text-gray-600 border border-gray-200 hover:bg-gray-50"}`}>
            All Rights ({rights.length})
          </button>
          <button onClick={() => setActiveTab("emergency")}
            className={`px-4 py-2 rounded-xl text-sm font-medium whitespace-nowrap transition-colors ${activeTab === "emergency" ? "bg-red-600 text-white" : "bg-white text-gray-600 border border-gray-200 hover:bg-gray-50"}`}>
            🚨 Emergency ({emergency.length})
          </button>
          {categories.map((cat) => (
            <button key={cat} onClick={() => setActiveTab(cat)}
              className={`px-4 py-2 rounded-xl text-sm font-medium whitespace-nowrap transition-colors ${activeTab === cat ? "bg-blue-600 text-white" : "bg-white text-gray-600 border border-gray-200 hover:bg-gray-50"}`}>
              {cat}
            </button>
          ))}
        </div>

        {/* Rights List */}
        {loading ? (
          <div className="flex justify-center py-16"><div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-600"></div></div>
        ) : filtered.length === 0 ? (
          <div className="card text-center py-12 text-gray-400">No rights found for this filter.</div>
        ) : (
          <div className="space-y-3">
            {filtered.map((r) => <RightCard key={r.id} right={r} />)}
          </div>
        )}
      </div>
    </div>
  );
}
