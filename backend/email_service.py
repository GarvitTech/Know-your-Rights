# ============================================================
# Project  : Know Your Democratic Rights
# Author   : Garvit Pant
# GitHub   : https://github.com/GarvitTech
# © 2026 Garvit Pant. All rights reserved.
# ============================================================

import os, random, string
from datetime import datetime, timedelta
from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText
import aiosmtplib
from dotenv import load_dotenv

load_dotenv()

EMAIL_HOST = os.getenv("EMAIL_HOST", "smtp.gmail.com")
EMAIL_PORT = int(os.getenv("EMAIL_PORT", 587))
EMAIL_USER = os.getenv("EMAIL_USER", "")
EMAIL_PASSWORD = os.getenv("EMAIL_PASSWORD", "")
OTP_EXPIRE_MINUTES = int(os.getenv("OTP_EXPIRE_MINUTES", 5))


def generate_otp() -> str:
    return "".join(random.choices(string.digits, k=6))


def otp_expiry() -> datetime:
    return datetime.utcnow() + timedelta(minutes=OTP_EXPIRE_MINUTES)


async def send_otp_email(to_email: str, otp: str, purpose: str):
    subject = "Your OTP - Know Your Democratic Rights"
    action = "complete your registration" if purpose == "signup" else "sign in to your account"

    html = f"""
    <div style="font-family:Inter,Arial,sans-serif;max-width:480px;margin:0 auto;background:#f8fafc;padding:32px;border-radius:16px;">
      <div style="text-align:center;margin-bottom:24px;">
        <h1 style="color:#1d4ed8;font-size:24px;margin:0;">⚖️ Know Your Democratic Rights</h1>
      </div>
      <div style="background:white;border-radius:12px;padding:32px;box-shadow:0 1px 3px rgba(0,0,0,0.1);">
        <h2 style="color:#1e293b;font-size:20px;margin-top:0;">Your Verification Code</h2>
        <p style="color:#64748b;font-size:15px;">Use this OTP to {action}:</p>
        <div style="background:#eff6ff;border:2px dashed #3b82f6;border-radius:12px;padding:24px;text-align:center;margin:24px 0;">
          <span style="font-size:42px;font-weight:800;letter-spacing:12px;color:#1d4ed8;">{otp}</span>
        </div>
        <p style="color:#ef4444;font-size:13px;text-align:center;">⏱ This code expires in <strong>{OTP_EXPIRE_MINUTES} minutes</strong></p>
        <p style="color:#94a3b8;font-size:12px;text-align:center;margin-top:24px;">
          If you did not request this code, please ignore this email.<br/>
          Do not share this code with anyone.
        </p>
      </div>
      <p style="color:#94a3b8;font-size:11px;text-align:center;margin-top:16px;">
        © 2026 Garvit Pant · Know Your Democratic Rights
      </p>
    </div>
    """

    msg = MIMEMultipart("alternative")
    msg["Subject"] = subject
    msg["From"] = f"Know Your Rights <{EMAIL_USER}>"
    msg["To"] = to_email
    msg.attach(MIMEText(html, "html"))

    await aiosmtplib.send(
        msg,
        hostname=EMAIL_HOST,
        port=EMAIL_PORT,
        username=EMAIL_USER,
        password=EMAIL_PASSWORD,
        start_tls=True,
    )
