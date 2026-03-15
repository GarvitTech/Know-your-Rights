import React, { useState, useEffect } from "react";
import api from "../api";

const EMPTY = { country: "", category: "", title: "", explanation: "", source: "", example: "", min_age: 0, max_age: 120, tags: "", is_emergency: false };
const COUNTRIES = ["India", "USA", "Kuwait", "Russia"];
const CATEGORIES = ["Fundamental Rights", "Civil Rights", "Human Rights", "Voting Rights", "Education Rights", "Worker Rights", "Digital Rights", "Freedom Rights"];

export default function AdminPanel() {
  const [rights, setRights] = useState([]);
  const [form, setForm] = useState(EMPTY);
  const [editId, setEditId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState("");
  const [filter, setFilter] = useState("");

  const fetchRights = () => {
    api.get("/rights").then((r) => setRights(r.data));
  };

  useEffect(() => { fetchRights(); }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMsg("");
    try {
      if (editId) {
        await api.put(`/rights/${editId}`, form);
        setMsg("✅ Right updated successfully");
      } else {
        await api.post("/rights", form);
        setMsg("✅ Right added successfully");
      }
      setForm(EMPTY);
      setEditId(null);
      fetchRights();
    } catch (err) {
      setMsg("❌ " + (err.response?.data?.detail || "Error saving right"));
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (r) => {
    setForm({ country: r.country, category: r.category, title: r.title, explanation: r.explanation, source: r.source, example: r.example || "", min_age: r.min_age, max_age: r.max_age, tags: r.tags || "", is_emergency: r.is_emergency });
    setEditId(r.id);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this right?")) return;
    await api.delete(`/rights/${id}`);
    fetchRights();
  };

  const filtered = rights.filter((r) =>
    !filter || r.title.toLowerCase().includes(filter.toLowerCase()) || r.country.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900">🛡️ Admin Panel</h1>
          <p className="text-gray-500 mt-1">Manage rights database</p>
        </div>

        {/* Form */}
        <div className="card mb-8">
          <h2 className="font-bold text-gray-900 mb-4">{editId ? "✏️ Edit Right" : "➕ Add New Right"}</h2>
          {msg && <div className={`px-4 py-3 rounded-xl text-sm mb-4 ${msg.startsWith("✅") ? "bg-green-50 text-green-700 border border-green-200" : "bg-red-50 text-red-700 border border-red-200"}`}>{msg}</div>}

          <form onSubmit={handleSubmit} className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1">Country *</label>
              <select className="input" required value={form.country} onChange={(e) => setForm({ ...form, country: e.target.value })}>
                <option value="">Select country</option>
                {COUNTRIES.map((c) => <option key={c}>{c}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1">Category *</label>
              <select className="input" required value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })}>
                <option value="">Select category</option>
                {CATEGORIES.map((c) => <option key={c}>{c}</option>)}
              </select>
            </div>
            <div className="sm:col-span-2">
              <label className="block text-xs font-medium text-gray-600 mb-1">Title *</label>
              <input className="input" required placeholder="Right title" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} />
            </div>
            <div className="sm:col-span-2">
              <label className="block text-xs font-medium text-gray-600 mb-1">Explanation *</label>
              <textarea className="input" rows={3} required placeholder="Detailed explanation" value={form.explanation} onChange={(e) => setForm({ ...form, explanation: e.target.value })} />
            </div>
            <div className="sm:col-span-2">
              <label className="block text-xs font-medium text-gray-600 mb-1">Legal Source *</label>
              <input className="input" required placeholder="e.g. Constitution Article 19" value={form.source} onChange={(e) => setForm({ ...form, source: e.target.value })} />
            </div>
            <div className="sm:col-span-2">
              <label className="block text-xs font-medium text-gray-600 mb-1">Example Situation</label>
              <textarea className="input" rows={2} placeholder="Real-life example" value={form.example} onChange={(e) => setForm({ ...form, example: e.target.value })} />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1">Min Age</label>
              <input type="number" className="input" min={0} max={120} value={form.min_age} onChange={(e) => setForm({ ...form, min_age: parseInt(e.target.value) })} />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1">Max Age</label>
              <input type="number" className="input" min={0} max={120} value={form.max_age} onChange={(e) => setForm({ ...form, max_age: parseInt(e.target.value) })} />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1">Tags (comma-separated)</label>
              <input className="input" placeholder="vote,freedom,speech" value={form.tags} onChange={(e) => setForm({ ...form, tags: e.target.value })} />
            </div>
            <div className="flex items-center gap-3 pt-5">
              <input type="checkbox" id="emergency" checked={form.is_emergency} onChange={(e) => setForm({ ...form, is_emergency: e.target.checked })} className="w-4 h-4 accent-red-600" />
              <label htmlFor="emergency" className="text-sm font-medium text-gray-700">🚨 Emergency Right</label>
            </div>
            <div className="sm:col-span-2 flex gap-3">
              <button type="submit" className="btn-primary" disabled={loading}>{loading ? "Saving..." : editId ? "Update Right" : "Add Right"}</button>
              {editId && <button type="button" className="btn-secondary" onClick={() => { setForm(EMPTY); setEditId(null); }}>Cancel</button>}
            </div>
          </form>
        </div>

        {/* Rights Table */}
        <div className="card">
          <div className="flex items-center justify-between mb-4 flex-wrap gap-3">
            <h2 className="font-bold text-gray-900">All Rights ({rights.length})</h2>
            <input className="input w-64" placeholder="Search rights..." value={filter} onChange={(e) => setFilter(e.target.value)} />
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-100">
                  <th className="text-left py-2 px-3 text-gray-500 font-medium">Title</th>
                  <th className="text-left py-2 px-3 text-gray-500 font-medium">Country</th>
                  <th className="text-left py-2 px-3 text-gray-500 font-medium">Category</th>
                  <th className="text-left py-2 px-3 text-gray-500 font-medium">Age</th>
                  <th className="text-left py-2 px-3 text-gray-500 font-medium">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((r) => (
                  <tr key={r.id} className="border-b border-gray-50 hover:bg-gray-50">
                    <td className="py-2.5 px-3 font-medium text-gray-900 max-w-xs truncate">
                      {r.is_emergency && <span className="text-red-500 mr-1">🚨</span>}{r.title}
                    </td>
                    <td className="py-2.5 px-3 text-gray-600">{r.country}</td>
                    <td className="py-2.5 px-3 text-gray-600">{r.category}</td>
                    <td className="py-2.5 px-3 text-gray-600">{r.min_age}–{r.max_age}</td>
                    <td className="py-2.5 px-3">
                      <div className="flex gap-2">
                        <button onClick={() => handleEdit(r)} className="text-blue-600 hover:text-blue-800 font-medium text-xs">Edit</button>
                        <button onClick={() => handleDelete(r.id)} className="text-red-500 hover:text-red-700 font-medium text-xs">Delete</button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {filtered.length === 0 && <p className="text-center text-gray-400 py-8">No rights found.</p>}
          </div>
        </div>
      </div>
    </div>
  );
}
