// ============================================================
// Project  : Know Your Democratic Rights
// Author   : Garvit Pant
// GitHub   : https://github.com/GarvitTech
// © 2026 Garvit Pant. All rights reserved.
// ============================================================

import axios from "axios";

const api = axios.create({ baseURL: "/api" });

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

api.interceptors.response.use(
  (res) => res,
  (err) => {
    if (err.response?.data) {
      const d = err.response.data.detail;
      if (d !== undefined && d !== null) {
        if (Array.isArray(d)) {
          err.response.data.detail = d
            .map((x) => (x && typeof x === "object" ? x.msg || x.message || JSON.stringify(x) : String(x)))
            .join(", ");
        } else if (typeof d === "object") {
          err.response.data.detail = d.msg || d.message || JSON.stringify(d);
        } else {
          err.response.data.detail = String(d);
        }
      }
    }
    if (err.response?.status === 401) {
      localStorage.removeItem("token");
      window.location.href = "/login";
    }
    return Promise.reject(err);
  }
);

export default api;
