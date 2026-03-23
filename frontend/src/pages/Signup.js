// ============================================================
// Project  : Know Your Democratic Rights
// Author   : Garvit Pant
// GitHub   : https://github.com/GarvitTech
// © 2026 Garvit Pant. All rights reserved.
// ============================================================

import React, { useState, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { parseError, safeStr } from "../utils";
import api from "../api";

export default function Signup() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [form, setForm] = useState({ name: "", email: "", password: "", confirm: "" });
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [resendTimer, setResendTimer] = useState(0);
  const inputRefs = useRef([]);

  const startTimer = () => {
    setResendTimer(60);
    const iv = setInterval(() => setResendTimer((t) => {
      if (t <= 1) { clearInterval(iv); return 0; }
      return t - 1;
    }), 1000);
  };

  const handleSendOTP = async (e) => {
    e.preventDefault();
    setError("");
    if (form.password !== form.confirm) { setError("Passwords do not match"); return; }
    if (form.password.length < 6) { setError("Password must be at least 6 characters"); return; }
    setLoading(true);
    try {
      await api.post("/auth/send-otp", { email: form.email, purpose: "signup" });
      setStep(2);
      startTimer();
    } catch (err) {
      setError(parseError(err, "Failed to send OTP"));
    } finally {
      setLoading(false);
    }
  };

  const handleOtpChange = (i, val) => {
    if (!/^\d*$/.test(val)) return;
    const n = [...otp];
    n[i] = val.slice(-1);
    setOtp(n);
    if (val && i < 5) inputRefs.current[i + 1]?.focus();
  };

  const handleOtpKeyDown = (i, e) => {
    if (e.key === "Backspace" && !otp[i] && i > 0) inputRefs.current[i - 1]?.focus();
  };

  const handleOtpPaste = (e) => {
    const pasted = e.clipboardData.getData("text").replace(/\D/g, "").slice(0, 6);
    if (pasted.length === 6) {
      setOtp(pasted.split(""));
      inputRefs.current[5]?.focus();
    }
  };

  const handleVerify = async (e) => {
    e.preventDefault();
    setError("");
    const code = otp.join("");
    if (code.length !== 6) { setError("Please enter the complete 6-digit OTP"); return; }
    setLoading(true);
    try {
      await api.post("/auth/signup", { name: form.name, email: form.email, password: form.password, code });
      navigate("/login?registered=1");
    } catch (err) {
      setError(parseError(err, "Invalid or expired OTP"));
    } finally {
      setLoading(false);
    }
  };

  const handleResend = async () => {
    setError("");
    setOtp(["", "", "", "", "", ""]);
    try {
      await api.post("/auth/send-otp", { email: form.email, purpose: "signup" });
      startTimer();
    } catch (err) {
      setError(parseError(err, "Failed to resend OTP"));
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center px-4 py-8">
      <div className="w-full max-w-md">
        <div className="text-center mb-6">
          <Link to="/">
            <img src="/logo.png" alt="Know Your Rights" className="h-12 w-12 sm:h-14 sm:w-14 object-contain mx-auto" />
          </Link>
          <h1 className="text-xl sm:text-2xl font-bold text-gray-900 mt-3">
            {step === 1 ? "Create your account" : "Verify your email"}
          </h1>
          <p className="text-gray-500 text-sm mt-1">
            {step === 1 ? "Start learning your rights today" : `We sent a 6-digit code to ${form.email}`}
          </p>
        </div>

        <div className="card">
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl text-sm mb-4 break-words">
              {safeStr(error)}
            </div>
          )}

          {step === 1 ? (
            <form onSubmit={handleSendOTP} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Full Name</label>
                <input type="text" className="input" placeholder="Your full name" required
                  autoComplete="name" value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })} />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Email</label>
                <input type="email" className="input" placeholder="you@example.com" required
                  autoComplete="email" value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })} />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Password</label>
                <input type="password" className="input" placeholder="Min. 6 characters" required
                  autoComplete="new-password" value={form.password}
                  onChange={(e) => setForm({ ...form, password: e.target.value })} />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Confirm Password</label>
                <input type="password" className="input" placeholder="Repeat password" required
                  autoComplete="new-password" value={form.confirm}
                  onChange={(e) => setForm({ ...form, confirm: e.target.value })} />
              </div>
              <button type="submit" className="btn-primary w-full" disabled={loading}>
                {loading ? "Sending OTP..." : "Send Verification Code →"}
              </button>
            </form>
          ) : (
            <form onSubmit={handleVerify} className="space-y-5">
              <div className="bg-blue-50 rounded-xl p-3 text-center">
                <p className="text-sm text-blue-700">📧 Verification code sent to</p>
                <p className="font-semibold text-blue-900 text-sm break-all">{form.email}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3 text-center">
                  Enter 6-digit OTP
                </label>
                <div className="flex gap-1.5 sm:gap-2 justify-center" onPaste={handleOtpPaste}>
                  {otp.map((digit, i) => (
                    <input key={i} ref={(el) => (inputRefs.current[i] = el)}
                      type="text" inputMode="numeric" maxLength={1} value={digit}
                      onChange={(e) => handleOtpChange(i, e.target.value)}
                      onKeyDown={(e) => handleOtpKeyDown(i, e)}
                      className="w-10 h-12 sm:w-12 sm:h-14 text-center text-xl sm:text-2xl font-bold border-2 border-gray-200 rounded-xl focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all bg-gray-50 focus:bg-white" />
                  ))}
                </div>
              </div>
              <button type="submit" className="btn-primary w-full" disabled={loading}>
                {loading ? "Verifying..." : "Verify & Create Account ✓"}
              </button>
              <div className="text-center">
                {resendTimer > 0
                  ? <p className="text-sm text-gray-400">Resend in <span className="font-semibold text-blue-600">{resendTimer}s</span></p>
                  : <button type="button" onClick={handleResend} className="text-sm text-blue-600 font-semibold hover:underline">Resend OTP</button>
                }
              </div>
              <button type="button"
                onClick={() => { setStep(1); setError(""); setOtp(["", "", "", "", "", ""]); }}
                className="w-full text-sm text-gray-500 hover:text-gray-700 py-1">
                ← Change details
              </button>
            </form>
          )}

          <p className="text-center text-sm text-gray-500 mt-5">
            Already have an account?{" "}
            <Link to="/login" className="text-blue-600 font-semibold hover:underline">Sign in</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
