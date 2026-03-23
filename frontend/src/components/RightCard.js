// ============================================================
// Project  : Know Your Democratic Rights
// Author   : Garvit Pant
// GitHub   : https://github.com/GarvitTech
// © 2026 Garvit Pant. All rights reserved.
// ============================================================

import React, { useState } from "react";

const CATEGORY_COLORS = {
  "Fundamental Rights": "bg-blue-100 text-blue-700",
  "Civil Rights":       "bg-indigo-100 text-indigo-700",
  "Human Rights":       "bg-red-100 text-red-700",
  "Voting Rights":      "bg-green-100 text-green-700",
  "Education Rights":   "bg-yellow-100 text-yellow-700",
  "Worker Rights":      "bg-orange-100 text-orange-700",
  "Digital Rights":     "bg-purple-100 text-purple-700",
  "Freedom Rights":     "bg-teal-100 text-teal-700",
};

export default function RightCard({ right }) {
  const [expanded, setExpanded] = useState(false);
  const color = CATEGORY_COLORS[right.category] || "bg-gray-100 text-gray-700";

  return (
    <div
      className="card hover:shadow-md transition-shadow duration-200 cursor-pointer select-none"
      onClick={() => setExpanded(!expanded)}>
      <div className="flex items-start justify-between gap-3">
        <div className="flex-1 min-w-0">
          <div className="flex flex-wrap items-center gap-1.5 mb-2">
            <span className={`badge ${color} text-xs`}>{right.category}</span>
            {right.is_emergency && (
              <span className="badge bg-red-100 text-red-700 text-xs">🚨 Emergency</span>
            )}
          </div>
          <h3 className="font-semibold text-gray-900 text-sm sm:text-base leading-snug">{right.title}</h3>
          {!expanded && (
            <p className="text-gray-500 text-xs sm:text-sm mt-1 line-clamp-2">{right.explanation}</p>
          )}
        </div>
        <span className="text-gray-400 text-sm mt-1 flex-shrink-0">{expanded ? "▲" : "▼"}</span>
      </div>

      {expanded && (
        <div className="mt-4 pt-4 border-t border-gray-100 space-y-3">
          <p className="text-gray-700 text-sm leading-relaxed">{right.explanation}</p>
          {right.example && (
            <div className="bg-blue-50 rounded-xl p-3">
              <p className="text-xs font-semibold text-blue-700 mb-1">💡 Real-life Example</p>
              <p className="text-sm text-blue-800">{right.example}</p>
            </div>
          )}
          <div className="bg-gray-50 rounded-xl p-3">
            <p className="text-xs font-semibold text-gray-500 mb-1">📖 Legal Source</p>
            <p className="text-sm text-gray-700">{right.source}</p>
          </div>
        </div>
      )}
    </div>
  );
}
