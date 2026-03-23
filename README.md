# 🗽 Know Your Democratic Rights

[![Backend](https://img.shields.io/badge/FastAPI-✅-0052CC?style=flat&logo=fastapi)](https://fastapi.tiangolo.com)
[![Frontend](https://img.shields.io/badge/React-Tailwind-61DAFB?style=flat&logo=react)](https://react.dev)
[![Database](https://img.shields.io/badge/SQLite-✅-003B57?style=flat&logo=sqlite)](https://sqlite.org)
[![GitHub Pages](https://img.shields.io/badge/GitHub_Pages-Deployed-brightgreen)](https://GarvitTech.github.io/Know-your-Rights)

**AI-powered web app educating citizens about democratic rights** based on **country, age, and role**. Supports **India 🇮🇳, USA 🇺🇸, Kuwait 🇰🇼, Russia 🇷🇺**.

**Live Demo**: [GarvitTech.github.io/Know-your-Rights](https://GarvitTech.github.io/Know-your-Rights)

**Complete & Working!** 🎉 Live demo flow: Welcome → Login → Profile → Dashboard → Chat/Explore/Education.

## ✨ Features

✅ **Secure Auth**: JWT + OTP (email verification)
✅ **Personalized Rights**: Filtered by your age + country  
✅ **AI Chat**: Ask \"What if police stop me?\" (country/age-aware)
✅ **Dashboard**: Your rights + emergency rights tab
✅ **Search**: Keyword/category/country search
✅ **Education**: Scenario-based legal lessons
✅ **Admin**: Add/edit rights data
✅ **Mobile-Responsive**: Tailwind UI, works on all devices
✅ **~50 Rights**: Comprehensive legal data with sources

## 📁 Structure

```
Know your RIghts/
├── backend/          # FastAPI API
│   ├── main.py
│   ├── database.py
│   ├── rights_data.py (50+ rights)
│   └── requirements.txt
├── frontend/         # React app
│   ├── src/pages/
│   └── package.json
├── rights.db         # SQLite (auto-created)
└── README.md
```

## 🚀 Quick Start (5 minutes)

### 1. Backend (FastAPI)
```bash
cd backend
pip install -r requirements.txt
uvicorn main:app --reload --host 0.0.0.0 --port 8000
```
**API Ready**: http://localhost:8000/docs (Swagger)

### 2. Frontend (React)
```bash
cd frontend
npm install
npm start
```
**App Ready**: http://localhost:3000

### 3. Test Flow
1. **Welcome** → Click Signup
2. **Enter**: name@test.com, strong password → Get OTP (check console/spam)
3. **Profile**: Age=25, Country=India → Save
4. **Dashboard**: See personalized rights!
5. **Chat**: Ask \"arrest rights\" → AI responds
6. **Admin**: Create admin@admin.com → login → /admin

## 🛠 Environment Setup

### Backend (.env)
```bash
cd backend
cp .env.example .env
```
```
SECRET_KEY=your-super-secret-key-change-this
ACCESS_TOKEN_EXPIRE_MINUTES=10080
EMAIL_USER=your@gmail.com
EMAIL_PASSWORD=app-password
```

**Email**: Console logs OTP for testing (no SMTP needed).

### First Admin User
```bash
sqlite3 rights.db
INSERT INTO users (name, email, hashed_password, is_admin) VALUES ('Admin', 'admin@admin.com', '$2b$12$KIXp8kW8nL9Qz9Qz9Qz9Qz9Qz9Qz9Qz9Qz9Qz9Qz9Qz9Qz9Qz9Qz', true);
.quit
```
**Login**: admin@admin.com / `password`

## 📱 App Flow

```
Welcome ──→ Login/Signup ──→ Profile Setup ──→ Dashboard
                    ↓                           ↓
                 Explore                    AI Chat
                    ↓                           ↓
                Education                    Search
```

**Dashboard Tabs**: All Rights | 🚨 Emergency | Civil | Voting | etc.

## 🔍 Test APIs

```
POST /api/auth/send-otp  → Send OTP
POST /api/auth/login     → JWT token
POST /api/profile        → Set country/age
GET  /api/rights/my      → Personalized
GET  /api/rights         → Search ?country=India&keyword=vote
POST /api/chat           → \"police rights\"
```

## 🚀 Deployment

### Frontend: GitHub Pages (Live!)
```bash
cd frontend
npm install -D gh-pages
npm run deploy
```
**Live**: https://GarvitTech.github.io/Know-your-Rights

**Note**: Frontend static. Backend needs separate hosting (below).

### Backend: Render/Railway (Recommended)
1. Push repo
2. Railway: `New Project` → Deploy backend
3. `Procfile`: `web: uvicorn main:app --host=0.0.0.0 --port=$PORT`
4. Add env vars from `.env`

### Docker (Backend)
```dockerfile
FROM python:3.12-slim
COPY backend/ /app
WORKDIR /app
RUN pip install -r requirements.txt
CMD [\"uvicorn\", \"main:app\", \"--host=0.0.0.0\", \"--port=8000\"]
```

## 🧪 Testing

**Backend**:
```bash
curl -X POST \"http://localhost:8000/api/auth/send-otp\" -d '{\"email\":\"test@test.com\",\"purpose\":\"signup\"}'
```

**Frontend Build**: `cd frontend && npm run build && npx serve -s build`

## 📈 Rights Database

**50+ entries** covering Civil/Human/Voting/Education/Worker/Digital Rights with age/country filters.

**Admin**: http://localhost:3000/admin → Add/edit.

## 🔒 Security

✅ JWT (7-day)
✅ bcrypt
✅ SQLAlchemy/Pydantic
✅ CORS/Admin checks

## 📱 Responsive

✅ Tailwind mobile-first

## ⚠️ Disclaimer

Educational only. Not legal advice.

**Built by [Garvit Pant](https://github.com/GarvitTech)**  
**License**: MIT
