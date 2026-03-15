from sqlalchemy import create_engine, Column, Integer, String, Text, Boolean, DateTime, ForeignKey
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker, relationship
from datetime import datetime

DATABASE_URL = "sqlite:///./rights.db"
engine = create_engine(DATABASE_URL, connect_args={"check_same_thread": False})
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base = declarative_base()


class User(Base):
    __tablename__ = "users"
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, nullable=False)
    email = Column(String, unique=True, index=True, nullable=False)
    hashed_password = Column(String, nullable=False)
    is_admin = Column(Boolean, default=False)
    created_at = Column(DateTime, default=datetime.utcnow)
    profile = relationship("UserProfile", back_populates="user", uselist=False)


class UserProfile(Base):
    __tablename__ = "user_profiles"
    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"), unique=True)
    age = Column(Integer)
    country = Column(String)
    gender = Column(String, nullable=True)
    occupation = Column(String, nullable=True)
    user = relationship("User", back_populates="profile")


class Right(Base):
    __tablename__ = "rights"
    id = Column(Integer, primary_key=True, index=True)
    country = Column(String, index=True, nullable=False)
    category = Column(String, index=True, nullable=False)
    title = Column(String, nullable=False)
    explanation = Column(Text, nullable=False)
    source = Column(String, nullable=False)
    example = Column(Text, nullable=True)
    min_age = Column(Integer, default=0)
    max_age = Column(Integer, default=120)
    tags = Column(String, nullable=True)
    is_emergency = Column(Boolean, default=False)


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


def init_db():
    Base.metadata.create_all(bind=engine)
