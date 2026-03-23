// ============================================================
// Project  : Know Your Democratic Rights
// Author   : Garvit Pant
// GitHub   : https://github.com/GarvitTech
// © 2026 Garvit Pant. All rights reserved.
// ============================================================

import React, { useState, useRef, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const NAV_LINKS = [
  { to: "/dashboard", label: "Dashboard", icon: "🏠" },
  { to: "/explore",   label: "Explore",   icon: "🔍" },
  { to: "/chat",      label: "AI Chat",   icon: "🤖" },
  { to: "/education", label: "Learn",     icon: "📚" },
];

export default function Navbar() {
  const { user, profile, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const userMenuRef = useRef(null);

  // Close user dropdown on outside click
  useEffect(() => {
    function handleClick(e) {
      if (userMenuRef.current && !userMenuRef.current.contains(e.target)) {
        setUserMenuOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  // Close mobile menu on route change
  useEffect(() => { setMobileOpen(false); setUserMenuOpen(false); }, [location.pathname]);

  const handleLogout = () => { logout(); navigate("/"); };

  const isActive = (path) => location.pathname === path;

  return (
    <nav className="bg-white border-b border-gray-100 shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-14 sm:h-16">

          {/* Logo */}
          <Link to="/dashboard" className="flex items-center gap-2 flex-shrink-0">
            <img src="/logo.png" alt="Know Your Rights" className="h-8 w-8 object-contain" />
            <span className="font-bold text-blue-700 text-base sm:text-lg hidden sm:block">Know Your Rights</span>
          </Link>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-1">
            {NAV_LINKS.map((l) => (
              <Link key={l.to} to={l.to}
                className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-sm font-medium transition-colors ${isActive(l.to) ? "bg-blue-50 text-blue-700" : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"}`}>
                <span>{l.icon}</span>{l.label}
              </Link>
            ))}
            {user?.is_admin && (
              <Link to="/admin"
                className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-sm font-medium transition-colors ${isActive("/admin") ? "bg-purple-50 text-purple-700" : "text-gray-600 hover:bg-gray-50"}`}>
                🛡️ Admin
              </Link>
            )}
          </div>

          {/* Right side */}
          <div className="flex items-center gap-2">
            {profile && (
              <span className="hidden sm:flex items-center gap-1 text-xs text-gray-500 bg-gray-50 px-2.5 py-1.5 rounded-full border border-gray-100">
                🌍 {profile.country}
              </span>
            )}

            {/* User dropdown */}
            <div className="relative" ref={userMenuRef}>
              <button onClick={() => setUserMenuOpen(!userMenuOpen)}
                className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-3 py-2 rounded-xl text-sm font-medium transition-colors">
                <span className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0">
                  {user?.name?.[0]?.toUpperCase() || "U"}
                </span>
                <span className="hidden sm:block max-w-[80px] truncate">{user?.name?.split(" ")[0]}</span>
                <span className="text-blue-200 text-xs">{userMenuOpen ? "▲" : "▼"}</span>
              </button>
              {userMenuOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-lg border border-gray-100 py-1 z-50">
                  <div className="px-4 py-2 border-b border-gray-50">
                    <p className="text-xs font-semibold text-gray-900 truncate">{user?.name}</p>
                    <p className="text-xs text-gray-400 truncate">{user?.email}</p>
                  </div>
                  <Link to="/profile-setup"
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

            {/* Mobile hamburger */}
            <button
              className="md:hidden p-2 rounded-lg text-gray-600 hover:bg-gray-100 transition-colors"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label="Toggle menu">
              <div className="w-5 h-4 flex flex-col justify-between">
                <span className={`block h-0.5 bg-current transition-all ${mobileOpen ? "rotate-45 translate-y-1.5" : ""}`} />
                <span className={`block h-0.5 bg-current transition-all ${mobileOpen ? "opacity-0" : ""}`} />
                <span className={`block h-0.5 bg-current transition-all ${mobileOpen ? "-rotate-45 -translate-y-1.5" : ""}`} />
              </div>
            </button>
          </div>
        </div>

        {/* Mobile nav */}
        {mobileOpen && (
          <div className="md:hidden border-t border-gray-100 py-2 pb-3">
            {NAV_LINKS.map((l) => (
              <Link key={l.to} to={l.to}
                className={`flex items-center gap-3 px-4 py-3 text-sm font-medium rounded-xl mx-1 transition-colors ${isActive(l.to) ? "bg-blue-50 text-blue-700" : "text-gray-700 hover:bg-gray-50"}`}>
                <span className="text-base">{l.icon}</span>{l.label}
              </Link>
            ))}
            {user?.is_admin && (
              <Link to="/admin"
                className={`flex items-center gap-3 px-4 py-3 text-sm font-medium rounded-xl mx-1 transition-colors ${isActive("/admin") ? "bg-purple-50 text-purple-700" : "text-gray-700 hover:bg-gray-50"}`}>
                🛡️ Admin Panel
              </Link>
            )}
          </div>
        )}
      </div>
    </nav>
  );
}
