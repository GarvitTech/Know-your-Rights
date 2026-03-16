// ============================================================
// Project  : Know Your Democratic Rights
// Author   : Garvit Pant
// GitHub   : https://github.com/GarvitTech
// © 2026 Garvit Pant. All rights reserved.
// ============================================================

import React, { createContext, useContext, useState, useEffect } from "react";
import api from "../api";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  const loadUser = async () => {
    try {
      const me = await api.get("/auth/me");
      setUser(me.data);
      try {
        const prof = await api.get("/profile");
        setProfile(prof.data);
      } catch {}
      return me.data;
    } catch {
      setUser(null);
      setProfile(null);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      loadUser().finally(() => setLoading(false));
    } else {
      setLoading(false);
    }
  }, []);

  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
    setProfile(null);
  };

  const refreshProfile = async () => {
    try {
      const r = await api.get("/profile");
      setProfile(r.data);
    } catch {}
  };

  return (
    <AuthContext.Provider value={{ user, profile, loading, loadUser, logout, refreshProfile }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
