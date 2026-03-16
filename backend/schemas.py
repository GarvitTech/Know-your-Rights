# ============================================================
# Project  : Know Your Democratic Rights
# Author   : Garvit Pant
# GitHub   : https://github.com/GarvitTech
# © 2026 Garvit Pant. All rights reserved.
# ============================================================

from pydantic import BaseModel, EmailStr
from typing import Optional


class UserCreate(BaseModel):
    name: str
    email: EmailStr
    password: str


class UserLogin(BaseModel):
    email: EmailStr
    password: str


class UserOut(BaseModel):
    id: int
    name: str
    email: str
    is_admin: bool

    class Config:
        from_attributes = True


class ProfileCreate(BaseModel):
    age: int
    country: str
    gender: Optional[str] = None
    occupation: Optional[str] = None


class ProfileOut(ProfileCreate):
    id: int
    user_id: int

    class Config:
        from_attributes = True


class RightCreate(BaseModel):
    country: str
    category: str
    title: str
    explanation: str
    source: str
    example: Optional[str] = None
    min_age: int = 0
    max_age: int = 120
    tags: Optional[str] = None
    is_emergency: bool = False


class RightOut(RightCreate):
    id: int

    class Config:
        from_attributes = True


class Token(BaseModel):
    access_token: str
    token_type: str


class ChatMessage(BaseModel):
    message: str


class OTPRequest(BaseModel):
    email: EmailStr
    purpose: str  # 'signup' or 'login'


class OTPVerify(BaseModel):
    email: EmailStr
    code: str
    purpose: str


class SignupWithOTP(BaseModel):
    name: str
    email: EmailStr
    password: str
    code: str


class LoginWithOTP(BaseModel):
    email: EmailStr
    password: str
    code: str
