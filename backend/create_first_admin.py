#!/usr/bin/env python3
# Run: cd backend && python create_first_admin.py
# Creates admin@admin.com / 'password' as first admin user

import hashlib
from database import SessionLocal, User
from auth import hash_password
from sqlalchemy.exc import IntegrityError

db = SessionLocal()
admin_email = 'admin@admin.com'
admin_pass = 'password'  # CHANGE THIS

try:
    hashed = hash_password(admin_pass)
    admin = User(name='Admin User', email=admin_email, hashed_password=hashed, is_admin=True)
    db.add(admin)
    db.commit()
    print(f"✅ Admin created: {admin_email}")
    print(f"   Password: {admin_pass}")
    print(f"   Login at: http://localhost:3000/login")
except IntegrityError:
    db.rollback()
    print("⚠️  Admin already exists")
finally:
    db.close()

