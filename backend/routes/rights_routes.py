# ============================================================
# Project  : Know Your Democratic Rights
# Author   : Garvit Pant
# GitHub   : https://github.com/GarvitTech
# © 2026 Garvit Pant. All rights reserved.
# ============================================================

from fastapi import APIRouter, Depends, Query
from sqlalchemy.orm import Session
from typing import List, Optional
from database import get_db, User, Right, UserProfile
from schemas import RightOut, RightCreate
from auth import get_current_user, get_admin_user

router = APIRouter(prefix="/api/rights", tags=["rights"])


@router.get("", response_model=List[RightOut])
def get_rights(
    country: Optional[str] = Query(None),
    category: Optional[str] = Query(None),
    keyword: Optional[str] = Query(None),
    emergency: Optional[bool] = Query(None),
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    q = db.query(Right)
    if country:
        q = q.filter(Right.country == country)
    if category:
        q = q.filter(Right.category == category)
    if keyword:
        kw = f"%{keyword}%"
        q = q.filter(Right.title.ilike(kw) | Right.explanation.ilike(kw) | Right.tags.ilike(kw))
    if emergency is not None:
        q = q.filter(Right.is_emergency == emergency)
    return q.all()


@router.get("/my", response_model=List[RightOut])
def get_my_rights(db: Session = Depends(get_db), current_user: User = Depends(get_current_user)):
    profile = db.query(UserProfile).filter(UserProfile.user_id == current_user.id).first()
    if not profile:
        return []
    return db.query(Right).filter(
        Right.country == profile.country,
        Right.min_age <= profile.age,
        Right.max_age >= profile.age
    ).all()


@router.get("/categories")
def get_categories(db: Session = Depends(get_db), current_user: User = Depends(get_current_user)):
    rows = db.query(Right.category).distinct().all()
    return [r[0] for r in rows]


@router.get("/{right_id}", response_model=RightOut)
def get_right(right_id: int, db: Session = Depends(get_db), current_user: User = Depends(get_current_user)):
    right = db.query(Right).filter(Right.id == right_id).first()
    if not right:
        from fastapi import HTTPException
        raise HTTPException(status_code=404, detail="Right not found")
    return right


@router.post("", response_model=RightOut)
def create_right(data: RightCreate, db: Session = Depends(get_db), admin: User = Depends(get_admin_user)):
    right = Right(**data.model_dump())
    db.add(right)
    db.commit()
    db.refresh(right)
    return right


@router.put("/{right_id}", response_model=RightOut)
def update_right(right_id: int, data: RightCreate, db: Session = Depends(get_db), admin: User = Depends(get_admin_user)):
    right = db.query(Right).filter(Right.id == right_id).first()
    if not right:
        from fastapi import HTTPException
        raise HTTPException(status_code=404, detail="Right not found")
    for k, v in data.model_dump().items():
        setattr(right, k, v)
    db.commit()
    db.refresh(right)
    return right


@router.delete("/{right_id}")
def delete_right(right_id: int, db: Session = Depends(get_db), admin: User = Depends(get_admin_user)):
    right = db.query(Right).filter(Right.id == right_id).first()
    if not right:
        from fastapi import HTTPException
        raise HTTPException(status_code=404, detail="Right not found")
    db.delete(right)
    db.commit()
    return {"detail": "Deleted"}
