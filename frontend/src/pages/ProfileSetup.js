// ============================================================
// Project  : Know Your Democratic Rights
// Author   : Garvit Pant
// GitHub   : https://github.com/GarvitTech
// © 2026 Garvit Pant. All rights reserved.
// ============================================================

import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import api from "../api";
import { parseError, safeStr } from "../utils";

const COUNTRIES = ["India", "USA", "Kuwait", "Russia"];
const COUNTRY_FLAGS = { India: "🇮🇳", USA: "🇺🇸", Kuwait: "🇰🇼", Russia: "🇷🇺" };

export default function ProfileSetup() {
  const { profile, refreshProfile } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ age: "", country: "", gender: "", occupation: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    if (profile) {
      setForm({
        age: profile.age || "",
        country: profile.country || "",
        gender: profile.gender || "",
        occupation: profile.occupation || "",
      });
    }
  }, [profile]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    if (!form.age || !form.country) { setError("Age and country are required"); return; }
    if (form.age < 1 || form.age > 120) { setError("Please enter a valid age"); return; }
    setLoading(true);
    try {
      await api.post("/profile", { ...form, age: parseInt(form.age) });
      await refreshProfile();
      setSuccess(true);
      setTimeout(() => navigate("/dashboard"), 1200);
    } catch (err) {
      setError(parseError(err, "Failed to save profile"));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center px-4 py-8">
      <div className="w-full max-w-lg">
        <div className="text-center mb-8">
          <div className="text-5xl mb-3">👤</div>
          <h1 className="text-2xl font-bold text-gray-900">Set Up Your Profile</h1>
          <p className="text-gray-500 mt-1">We'll personalise your rights based on your details</p>
        </div>

        <div className="card">
          {success && (
            <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-xl text-sm mb-4 text-center">
              ✅ Profile saved! Redirecting to dashboard...
            </div>
          )}
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl text-sm mb-4">{safeStr(error)}</div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Age */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Age <span className="text-red-500">*</span></label>
              <input type="number" className="input" placeholder="Enter your age" min="1" max="120" required
                value={form.age} onChange={(e) => setForm({ ...form, age: e.target.value })} />
              {form.age && parseInt(form.age) < 18 && (
                <p className="text-xs text-blue-600 mt-1">👶 You'll see rights specifically for minors</p>
              )}
            </div>

            {/* Country */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Country <span className="text-red-500">*</span></label>
              <div className="grid grid-cols-2 gap-3">
                {COUNTRIES.map((c) => (
                  <button key={c} type="button"
                    onClick={() => setForm({ ...form, country: c })}
                    className={`flex items-center gap-2 p-3 rounded-xl border-2 transition-all text-sm font-medium ${form.country === c ? "border-blue-500 bg-blue-50 text-blue-700" : "border-gray-200 hover:border-gray-300 text-gray-700"}`}>
                    <span className="text-xl">{COUNTRY_FLAGS[c]}</span>{c}
                  </button>
                ))}
              </div>
            </div>

            {/* Gender (optional) */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Gender <span className="text-gray-400 font-normal">(optional)</span></label>
              <select className="input" value={form.gender} onChange={(e) => setForm({ ...form, gender: e.target.value })}>
                <option value="">Prefer not to say</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Non-binary">Non-binary</option>
                <option value="Other">Other</option>
              </select>
            </div>

            {/* Occupation (optional) */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Occupation <span className="text-gray-400 font-normal">(optional)</span></label>
              <select className="input" value={form.occupation} onChange={(e) => setForm({ ...form, occupation: e.target.value })}>
                <option value="">Select occupation</option>
                <option value="Student">Student</option>
                <option value="Worker">Worker / Employee</option>
                <option value="Self-employed">Self-employed</option>
                <option value="Unemployed">Unemployed</option>
                <option value="Retired">Retired</option>
                <option value="Other">Other</option>
              </select>
            </div>

            <button type="submit" className="btn-primary w-full" disabled={loading}>
              {loading ? "Saving..." : profile ? "Update Profile" : "Save & Continue →"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
