# Know-your-RIghts
⚖️ Know Your Democratic Rights is an AI-powered web app that helps users understand their legal and democratic rights based on their country and age. 🌍 Supports India, USA, Kuwait, and Russia with an AI assistant, personalised rights dashboard, and easy explanations to make civic knowledge accessible to everyone. 🤖📚
>>>>>>> 89e37258c75bb5310b2a911596939882babeb030
=======
# ⚖️ Know Your Democratic Rights

An AI-powered web application that educates citizens about their democratic and legal rights based on their **country**, **age**, and **role**.

**Supported Countries:** 🇮🇳 India · 🇺🇸 USA · 🇰🇼 Kuwait · 🇷🇺 Russia

---

## 📁 Folder Structure

```
Know your Rights/
├── backend/                  ← Python FastAPI server
│   ├── main.py               ← App entry point
│   ├── database.py           ← Database models (SQLite)
│   ├── auth.py               ← JWT authentication
│   ├── schemas.py            ← Request/response models
│   ├── rights_data.py        ← Rights dataset (40+ rights)
│   ├── routes/
│   │   ├── auth_routes.py    ← Login / Signup endpoints
│   │   ├── profile_routes.py ← User profile endpoints
│   │   ├── rights_routes.py  ← Rights CRUD endpoints
│   │   └── chat_routes.py    ← AI chat endpoint
│   ├── requirements.txt      ← Python dependencies
│   └── .env                  ← Environment variables
│
└── frontend/                 ← React.js app
    ├── src/
    │   ├── App.js            ← Routes & layout
    │   ├── api.js            ← Axios HTTP client
    │   ├── context/
    │   │   └── AuthContext.js ← Auth state management
    │   ├── components/
    │   │   ├── Navbar.js     ← Navigation bar
    │   │   ├── RightCard.js  ← Rights display card
    │   │   └── Disclaimer.js ← Legal disclaimer
    │   └── pages/
    │       ├── Welcome.js       ← Landing page
    │       ├── Login.js         ← Sign in
    │       ├── Signup.js        ← Create account
    │       ├── ProfileSetup.js  ← Age & country setup
    │       ├── Dashboard.js     ← Personalised rights
    │       ├── RightsExplorer.js ← Search & filter rights
    │       ├── ChatAssistant.js ← AI chat
    │       ├── Education.js     ← Learn your rights
    │       └── AdminPanel.js    ← Admin management
    ├── package.json
    ├── tailwind.config.js
    └── postcss.config.js
```

---

## 🚀 Setup Instructions (Step by Step for Beginners)

### Prerequisites — Install These First

1. **Python 3.10+** → https://www.python.org/downloads/
2. **Node.js 18+** → https://nodejs.org/
3. A terminal / command prompt

---

### Step 1 — Set Up the Backend

Open your terminal and run these commands one by one:

```bash
# Go into the backend folder
cd "/Volumes/Garvit/Know your RIghts/backend"

# Create a virtual environment (isolated Python environment)
python3 -m venv venv

# Activate it (Mac/Linux)
source venv/bin/activate

# Activate it (Windows)
# venv\Scripts\activate

# Install all required packages
pip install -r requirements.txt
```

---

### Step 2 — Configure Environment Variables

Open the file `backend/.env` and update it:

```env
SECRET_KEY=any-long-random-string-at-least-32-characters
ALGORITHM=HS256
ACCESS_TOKEN_EXPIRE_MINUTES=10080

# Optional: Add your OpenAI API key for AI chat
# Get one at https://platform.openai.com/api-keys
OPENAI_API_KEY=sk-your-key-here
OPENAI_BASE_URL=https://api.openai.com/v1
AI_MODEL=gpt-3.5-turbo
```

> **Note:** The app works WITHOUT an OpenAI key. The AI chat will use keyword matching from the rights database as a fallback.

---

### Step 3 — Start the Backend Server

```bash
# Make sure you're in the backend folder with venv activated
cd "/Volumes/Garvit/Know your RIghts/backend"
source venv/bin/activate

uvicorn main:app --reload --port 8000
```

You should see:
```
INFO:     Uvicorn running on http://127.0.0.1:8000
```

The database (`rights.db`) is created automatically with all 40+ rights pre-loaded.

---

### Step 4 — Set Up the Frontend

Open a **new terminal window** and run:

```bash
# Go into the frontend folder
cd "/Volumes/Garvit/Know your RIghts/frontend"

# Install all packages
npm install
```

---

### Step 5 — Start the Frontend

```bash
# Still in the frontend folder
npm start
```

Your browser will open automatically at **http://localhost:3000** 🎉

---

## 🔑 Creating an Admin Account

By default, all accounts are regular users. To make yourself an admin:

1. Sign up normally through the app
2. Open a terminal in the backend folder:

```bash
cd "/Volumes/Garvit/Know your RIghts/backend"
source venv/bin/activate
python3 -c "
from database import SessionLocal, User
db = SessionLocal()
user = db.query(User).filter(User.email == 'your@email.com').first()
user.is_admin = True
db.commit()
print('Admin access granted!')
db.close()
"
```

3. Log out and log back in — you'll see the Admin panel in the navbar.

---

## 📱 Application Pages

| Page | URL | Description |
|------|-----|-------------|
| Welcome | `/` | Landing page with features overview |
| Sign Up | `/signup` | Create a new account |
| Login | `/login` | Sign in |
| Profile Setup | `/profile-setup` | Set age, country, occupation |
| Dashboard | `/dashboard` | Personalised rights for your profile |
| Explore Rights | `/explore` | Search & filter all rights |
| AI Chat | `/chat` | Ask the AI assistant questions |
| Learn | `/education` | Lessons with real-life scenarios |
| Admin | `/admin` | Manage rights database (admin only) |

---

## 🤖 AI Chat — How It Works

- **With OpenAI key:** Full AI responses using GPT-3.5-turbo, context-aware for your country and age
- **Without OpenAI key:** Smart keyword matching against the rights database — still very useful!

Example questions to ask:
- "What are my rights if police stop me?"
- "Can my employer fire me without reason?"
- "What is my right to vote?"
- "Can my school punish me for speech?"
- "What are my digital privacy rights?"

---

## 🌐 Deployment

### Frontend → Vercel

```bash
cd frontend
npm run build
# Then drag the 'build' folder to https://vercel.com/new
# Or use: npx vercel --prod
```

### Backend → Render.com

1. Push your code to GitHub
2. Go to https://render.com → New Web Service
3. Connect your repo, set:
   - Build Command: `pip install -r requirements.txt`
   - Start Command: `uvicorn main:app --host 0.0.0.0 --port $PORT`
4. Add environment variables from `.env`
5. Update frontend `src/api.js` baseURL to your Render URL

---

## ⚠️ Legal Disclaimer

This application provides **educational information only** and does **not** replace professional legal advice. For specific legal matters, please consult a qualified lawyer in your jurisdiction.

---

## 🛡️ Security Features

- Passwords hashed with bcrypt
- JWT tokens for authentication
- Protected API routes
- Input validation on all forms
- Admin-only routes protected server-side
=======
# Know-your-RIghts
⚖️ Know Your Democratic Rights is an AI-powered web app that helps users understand their legal and democratic rights based on their country and age. 🌍 Supports India, USA, Kuwait, and Russia with an AI assistant, personalised rights dashboard, and easy explanations to make civic knowledge accessible to everyone. 🤖📚
>>>>>>> 89e37258c75bb5310b2a911596939882babeb030
