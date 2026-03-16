// ============================================================
// Project  : Know Your Democratic Rights
// Author   : Garvit Pant
// GitHub   : https://github.com/GarvitTech
// © 2026 Garvit Pant. All rights reserved.
// ============================================================

/**
 * Safely extracts a string error message from any axios error response.
 * Handles FastAPI validation errors (array of {msg, loc, type}) and plain strings.
 */
export function parseError(err, fallback = "Something went wrong") {
  const detail = err?.response?.data?.detail;
  if (!detail) return fallback;
  if (typeof detail === "string") return detail;
  if (Array.isArray(detail)) {
    return detail.map((d) => (typeof d === "object" ? d.msg || JSON.stringify(d) : d)).join(", ");
  }
  if (typeof detail === "object") return detail.msg || JSON.stringify(detail);
  return String(detail);
}

/** Always returns a renderable string — pass anything */
export function safeStr(val, fallback = "") {
  if (val === null || val === undefined) return fallback;
  if (typeof val === "string") return val;
  if (Array.isArray(val)) {
    return val.map((v) => safeStr(v, fallback)).filter(Boolean).join(", ") || fallback;
  }
  if (typeof val === "object") {
    if (val.msg) return String(val.msg);
    if (val.message) return String(val.message);
    try { return JSON.stringify(val); } catch { return fallback; }
  }
  return String(val);
}
