import React, { createContext, useContext, useState, useEffect } from "react";
import api from "../api";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      api.get("/auth/me")
        .then((r) => {
          setUser(r.data);
          return api.get("/profile");
        })
        .then((r) => setProfile(r.data))
        .catch(() => {})
        .finally(() => setLoading(false));
    } else {
      setLoading(false);
    }
  }, []);

  const login = async (email, password) => {
    const res = await api.post("/auth/login", { email, password });
    localStorage.setItem("token", res.data.access_token);
    const me = await api.get("/auth/me");
    setUser(me.data);
    try {
      const prof = await api.get("/profile");
      setProfile(prof.data);
    } catch {}
    return me.data;
  };

  const signup = async (name, email, password) => {
    await api.post("/auth/signup", { name, email, password });
    return login(email, password);
  };

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
    <AuthContext.Provider value={{ user, profile, loading, login, signup, logout, refreshProfile }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
