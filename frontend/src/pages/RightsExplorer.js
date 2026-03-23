// ============================================================
// Project  : Know Your Democratic Rights
// Author   : Garvit Pant
// GitHub   : https://github.com/GarvitTech
// © 2026 Garvit Pant. All rights reserved.
// ============================================================

import React, { useState, useEffect } from "react";
import api from "../api";
import RightCard from "../components/RightCard";
import Disclaimer from "../components/Disclaimer";

const COUNTRIES = ["India", "USA", "Kuwait", "Russia"];
const COUNTRY_FLAGS = { India: "🇮🇳", USA: "🇺🇸", Kuwait: "🇰🇼", Russia: "🇷🇺" };

export default function RightsExplorer() {
  const [rights, setRights] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [filters, setFilters] = useState({ country: "", category: "", keyword: "" });

  useEffect(() => {
    api.get("/rights/categories").then((r) => setCategories(r.data)).catch(() => {});
  }, []);

  useEffect(() => {
    setLoading(true);
    const params = {};
    if (filters.country)  params.country  = filters.country;
    if (filters.category) params.category = filters.category;
    if (filters.keyword)  params.keyword  = filters.keyword;
    api.get("/rights", { params })
      .then((r) => setRights(r.data))
      .catch(() => setRights([]))
      .finally(() => setLoading(false));
  }, [filters]);

  const setFilter = (key, val) => setFilters((f) => ({ ...f, [key]: val }));
  const clearFilters = () => setFilters({ country: "", category: "", keyword: "" });
  const hasFilters = filters.country || filters.category || filters.keyword;

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-5xl mx-auto px-3 sm:px-4 py-5 sm:py-8">

        <div className="mb-5">
          <h1 className="text-xl sm:text-2xl font-bold text-gray-900">🔍 Explore Rights</h1>
          <p className="text-gray-500 text-sm mt-1">Search and filter rights across all countries</p>
        </div>

        {/* Filters */}
        <div className="card mb-5 space-y-4">
          {/* Keyword search */}
          <input type="text" className="input" placeholder="🔍 Search by keyword (e.g. vote, speech, worker...)"
            value={filters.keyword}
            onChange={(e) => setFilter("keyword", e.target.value)} />

          {/* Country filter */}
          <div>
            <p className="text-xs font-medium text-gray-500 mb-2">Country</p>
            <div className="flex gap-2 flex-wrap">
              <button onClick={() => setFilter("country", "")}
                className={`px-3 py-1.5 rounded-xl text-xs sm:text-sm font-medium border transition-colors ${!filters.country ? "bg-blue-600 text-white border-blue-600" : "bg-white text-gray-600 border-gray-200 hover:bg-gray-50"}`}>
                All
              </button>
              {COUNTRIES.map((c) => (
                <button key={c} onClick={() => setFilter("country", filters.country === c ? "" : c)}
                  className={`px-3 py-1.5 rounded-xl text-xs sm:text-sm font-medium border transition-colors ${filters.country === c ? "bg-blue-600 text-white border-blue-600" : "bg-white text-gray-600 border-gray-200 hover:bg-gray-50"}`}>
                  {COUNTRY_FLAGS[c]} {c}
                </button>
              ))}
            </div>
          </div>

          {/* Category filter */}
          {categories.length > 0 && (
            <div>
              <p className="text-xs font-medium text-gray-500 mb-2">Category</p>
              <div className="flex gap-2 flex-wrap">
                <button onClick={() => setFilter("category", "")}
                  className={`px-3 py-1.5 rounded-xl text-xs font-medium border transition-colors ${!filters.category ? "bg-indigo-600 text-white border-indigo-600" : "bg-white text-gray-600 border-gray-200 hover:bg-gray-50"}`}>
                  All
                </button>
                {categories.map((cat) => (
                  <button key={cat} onClick={() => setFilter("category", filters.category === cat ? "" : cat)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-medium border transition-colors ${filters.category === cat ? "bg-indigo-600 text-white border-indigo-600" : "bg-white text-gray-600 border-gray-200 hover:bg-gray-50"}`}>
                    {cat}
                  </button>
                ))}
              </div>
            </div>
          )}

          {hasFilters && (
            <button onClick={clearFilters} className="text-sm text-red-500 hover:text-red-700 font-medium">
              ✕ Clear all filters
            </button>
          )}
        </div>

        <Disclaimer />

        <div className="mt-4 mb-3 flex items-center justify-between">
          <p className="text-sm text-gray-500">
            {loading ? "Searching..." : `${rights.length} right${rights.length !== 1 ? "s" : ""} found`}
          </p>
        </div>

        {loading ? (
          <div className="flex justify-center py-16">
            <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-600" />
          </div>
        ) : rights.length === 0 ? (
          <div className="card text-center py-12">
            <div className="text-4xl mb-3">🔍</div>
            <p className="text-gray-500 text-sm">No rights found. Try different search terms or filters.</p>
          </div>
        ) : (
          <div className="space-y-3">
            {rights.map((r) => <RightCard key={r.id} right={r} />)}
          </div>
        )}
      </div>
    </div>
  );
}
