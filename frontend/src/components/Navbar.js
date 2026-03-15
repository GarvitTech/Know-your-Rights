import React, { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const NAV_LINKS = [
  { to: "/dashboard", label: "Dashboard", icon: "🏠" },
  { to: "/explore", label: "Explore Rights", icon: "🔍" },
  { to: "/chat", label: "AI Assistant", icon: "🤖" },
  { to: "/education", label: "Learn", icon: "📚" },
];

export default function Navbar() {
  const { user, profile, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = () => { logout(); navigate("/"); };

  return (
    <nav className="bg-white border-b border-gray-100 shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link to="/dashboard" className="flex items-center gap-2">
            <img src="/logo.png" alt="Know Your Rights" className="h-8 w-8 object-contain" />
            <span className="font-bold text-blue-700 text-lg hidden sm:block">Know Your Rights</span>
          </Link>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-1">
            {NAV_LINKS.map((l) => (
              <Link key={l.to} to={l.to}
                className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-medium transition-colors ${location.pathname === l.to ? "bg-blue-50 text-blue-700" : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"}`}>
                <span>{l.icon}</span>{l.label}
              </Link>
            ))}
            {user?.is_admin && (
              <Link to="/admin" className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-medium transition-colors ${location.pathname === "/admin" ? "bg-purple-50 text-purple-700" : "text-gray-600 hover:bg-gray-50"}`}>
                🛡️ Admin
              </Link>
            )}
          </div>

          <div className="flex items-center gap-3">
            {profile && (
              <span className="hidden sm:flex items-center gap-1.5 text-sm text-gray-500 bg-gray-50 px-3 py-1.5 rounded-full">
                <span>🌍</span>{profile.country}
              </span>
            )}
            <div className="relative">
              <button onClick={() => setMenuOpen(!menuOpen)}
                className="flex items-center gap-2 bg-blue-600 text-white px-3 py-2 rounded-xl text-sm font-medium hover:bg-blue-700 transition-colors">
                <span className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center text-xs font-bold">
                  {user?.name?.[0]?.toUpperCase()}
                </span>
                <span className="hidden sm:block">{user?.name?.split(" ")[0]}</span>
              </button>
              {menuOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-lg border border-gray-100 py-1 z-50">
                  <Link to="/profile-setup" onClick={() => setMenuOpen(false)}
                    className="flex items-center gap-2 px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50">
                    ✏️ Edit Profile
                  </Link>
                  <button onClick={handleLogout}
                    className="flex items-center gap-2 w-full px-4 py-2.5 text-sm text-red-600 hover:bg-red-50">
                    🚪 Logout
                  </button>
                </div>
              )}
            </div>
            {/* Mobile menu button */}
            <button className="md:hidden p-2 rounded-lg text-gray-600 hover:bg-gray-100" onClick={() => setMenuOpen(!menuOpen)}>
              ☰
            </button>
          </div>
        </div>

        {/* Mobile nav */}
        {menuOpen && (
          <div className="md:hidden pb-3 border-t border-gray-100 pt-2">
            {NAV_LINKS.map((l) => (
              <Link key={l.to} to={l.to} onClick={() => setMenuOpen(false)}
                className={`flex items-center gap-2 px-4 py-2.5 text-sm font-medium rounded-xl mx-1 ${location.pathname === l.to ? "bg-blue-50 text-blue-700" : "text-gray-600"}`}>
                {l.icon} {l.label}
              </Link>
            ))}
          </div>
        )}
      </div>
    </nav>
  );
}
