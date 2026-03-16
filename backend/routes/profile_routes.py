# ============================================================
# Project  : Know Your Democratic Rights
# Author   : Garvit Pant
# GitHub   : https://github.com/GarvitTech
# © 2026 Garvit Pant. All rights reserved.
# ============================================================

from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from database import get_db, User, UserProfile
from schemas import ProfileCreate, ProfileOut
from auth import get_current_user

router = APIRouter(prefix="/api/profile", tags=["profile"])

VALID_COUNTRIES = ["India", "USA", "Kuwait", "Russia"]


@router.post("", response_model=ProfileOut)
def create_profile(data: ProfileCreate, db: Session = Depends(get_db), current_user: User = Depends(get_current_user)):
    if data.country not in VALID_COUNTRIES:
        raise HTTPException(status_code=400, detail="Invalid country")
    if data.age < 0 or data.age > 120:
        raise HTTPException(status_code=400, detail="Invalid age")
    existing = db.query(UserProfile).filter(UserProfile.user_id == current_user.id).first()
    if existing:
        existing.age = data.age
        existing.country = data.country
        existing.gender = data.gender
        existing.occupation = data.occupation
        db.commit()
        db.refresh(existing)
        return existing
    profile = UserProfile(user_id=current_user.id, **data.model_dump())
    db.add(profile)
    db.commit()
    db.refresh(profile)
    return profile


@router.get("", response_model=ProfileOut)
def get_profile(db: Session = Depends(get_db), current_user: User = Depends(get_current_user)):
    profile = db.query(UserProfile).filter(UserProfile.user_id == current_user.id).first()
    if not profile:
        raise HTTPException(status_code=404, detail="Profile not found")
    return profile
