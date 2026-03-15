from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from database import init_db, SessionLocal, Right
from rights_data import RIGHTS_DATA
from routes.auth_routes import router as auth_router
from routes.profile_routes import router as profile_router
from routes.rights_routes import router as rights_router
from routes.chat_routes import router as chat_router

app = FastAPI(title="Know Your Democratic Rights API", version="1.0.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(auth_router)
app.include_router(profile_router)
app.include_router(rights_router)
app.include_router(chat_router)


@app.on_event("startup")
def startup():
    init_db()
    db = SessionLocal()
    if db.query(Right).count() == 0:
        for item in RIGHTS_DATA:
            db.add(Right(**item))
        db.commit()
    db.close()


@app.get("/")
def root():
    return {"message": "Know Your Democratic Rights API is running"}
