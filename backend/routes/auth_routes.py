# ============================================================
# Project  : Know Your Democratic Rights
# Author   : Garvit Pant
# GitHub   : https://github.com/GarvitTech
# © 2026 Garvit Pant. All rights reserved.
# ============================================================

from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from datetime import datetime
from database import get_db, User, OTPCode
from schemas import UserOut, Token, OTPRequest, OTPVerify, SignupWithOTP, LoginWithOTP
from auth import hash_password, verify_password, create_access_token, get_current_user
from email_service import generate_otp, otp_expiry, send_otp_email

router = APIRouter(prefix="/api/auth", tags=["auth"])


@router.post("/send-otp")
async def send_otp(data: OTPRequest, db: Session = Depends(get_db)):
    # For login OTP, check user exists
    if data.purpose == "login":
        user = db.query(User).filter(User.email == data.email).first()
        if not user:
            raise HTTPException(status_code=404, detail="No account found with this email")

    # For signup OTP, check email not already registered
    if data.purpose == "signup":
        if db.query(User).filter(User.email == data.email).first():
            raise HTTPException(status_code=400, detail="Email already registered")

    # Invalidate any existing unused OTPs for this email+purpose
    db.query(OTPCode).filter(
        OTPCode.email == data.email,
        OTPCode.purpose == data.purpose,
        OTPCode.used == False
    ).delete()
    db.commit()

    # Generate and save new OTP
    code = generate_otp()
    otp = OTPCode(
        email=data.email,
        code=code,
        purpose=data.purpose,
        expires_at=otp_expiry(),
        used=False
    )
    db.add(otp)
    db.commit()

    # Send email
    try:
        await send_otp_email(data.email, code, data.purpose)
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to send OTP email: {str(e)}")

    return {"message": f"OTP sent to {data.email}"}


@router.post("/signup", response_model=UserOut)
def signup(data: SignupWithOTP, db: Session = Depends(get_db)):
    # Verify OTP
    otp = db.query(OTPCode).filter(
        OTPCode.email == data.email,
        OTPCode.code == data.code,
        OTPCode.purpose == "signup",
        OTPCode.used == False
    ).first()

    if not otp:
        raise HTTPException(status_code=400, detail="Invalid OTP code")
    if otp.expires_at < datetime.utcnow():
        raise HTTPException(status_code=400, detail="OTP has expired. Please request a new one")

    if db.query(User).filter(User.email == data.email).first():
        raise HTTPException(status_code=400, detail="Email already registered")

    # Mark OTP as used
    otp.used = True
    db.commit()

    user = User(
        name=data.name,
        email=data.email,
        hashed_password=hash_password(data.password)
    )
    db.add(user)
    db.commit()
    db.refresh(user)
    return user


@router.post("/login", response_model=Token)
def login(data: LoginWithOTP, db: Session = Depends(get_db)):
    user = db.query(User).filter(User.email == data.email).first()
    if not user or not verify_password(data.password, user.hashed_password):
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid email or password")

    # Verify OTP
    otp = db.query(OTPCode).filter(
        OTPCode.email == data.email,
        OTPCode.code == data.code,
        OTPCode.purpose == "login",
        OTPCode.used == False
    ).first()

    if not otp:
        raise HTTPException(status_code=400, detail="Invalid OTP code")
    if otp.expires_at < datetime.utcnow():
        raise HTTPException(status_code=400, detail="OTP has expired. Please request a new one")

    # Mark OTP as used
    otp.used = True
    db.commit()

    token = create_access_token({"sub": str(user.id)})
    return {"access_token": token, "token_type": "bearer"}


@router.get("/me", response_model=UserOut)
def me(current_user: User = Depends(get_current_user)):
    return current_user
