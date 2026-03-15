from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from database import get_db, User, UserProfile, Right
from schemas import ChatMessage
from auth import get_current_user
import os, httpx
from dotenv import load_dotenv

load_dotenv()

router = APIRouter(prefix="/api/chat", tags=["chat"])

OPENAI_API_KEY = os.getenv("OPENAI_API_KEY", "")
OPENAI_BASE_URL = os.getenv("OPENAI_BASE_URL", "https://api.openai.com/v1")
AI_MODEL = os.getenv("AI_MODEL", "gpt-3.5-turbo")


def build_system_prompt(profile, rights_context: str) -> str:
    age_group = "a minor" if profile.age < 18 else "an adult"
    return f"""You are a legal rights education assistant for the "Know Your Democratic Rights" app.
The user is {age_group} aged {profile.age}, living in {profile.country}.
Occupation: {profile.occupation or 'not specified'}. Gender: {profile.gender or 'not specified'}.

Relevant rights from the database for this user:
{rights_context}

Rules:
- Answer ONLY about democratic and legal rights.
- Always cite the legal source (law/article) when possible.
- Tailor answers to the user's country ({profile.country}) and age ({profile.age}).
- End every response with: "⚠️ This is educational information, not legal advice. Consult a qualified lawyer for your specific situation."
- Be concise, clear, and friendly.
"""


@router.post("")
async def chat(msg: ChatMessage, db: Session = Depends(get_db), current_user: User = Depends(get_current_user)):
    profile = db.query(UserProfile).filter(UserProfile.user_id == current_user.id).first()

    if not profile:
        return {"reply": "Please complete your profile first so I can give you country and age specific rights information."}

    # Fetch relevant rights as context
    rights = db.query(Right).filter(
        Right.country == profile.country,
        Right.min_age <= profile.age,
        Right.max_age >= profile.age
    ).all()
    rights_context = "\n".join([f"- {r.title} ({r.category}): {r.explanation} [Source: {r.source}]" for r in rights])

    if not OPENAI_API_KEY or OPENAI_API_KEY == "your-openai-api-key-here":
        # Fallback: keyword-based response from DB
        keyword = msg.message.lower()
        matched = [r for r in rights if any(w in (r.title + r.explanation + (r.tags or "")).lower() for w in keyword.split())]
        if matched:
            r = matched[0]
            reply = f"**{r.title}**\n\n{r.explanation}\n\n📖 Source: {r.source}"
            if r.example:
                reply += f"\n\n💡 Example: {r.example}"
            reply += "\n\n⚠️ This is educational information, not legal advice. Consult a qualified lawyer for your specific situation."
        else:
            reply = f"I found no specific rights matching your query for {profile.country}. Try searching for keywords like 'vote', 'speech', 'worker', 'education', or 'privacy'.\n\n⚠️ This is educational information, not legal advice."
        return {"reply": reply}

    system_prompt = build_system_prompt(profile, rights_context)
    try:
        async with httpx.AsyncClient(timeout=30) as client:
            response = await client.post(
                f"{OPENAI_BASE_URL}/chat/completions",
                headers={"Authorization": f"Bearer {OPENAI_API_KEY}", "Content-Type": "application/json"},
                json={
                    "model": AI_MODEL,
                    "messages": [
                        {"role": "system", "content": system_prompt},
                        {"role": "user", "content": msg.message}
                    ],
                    "max_tokens": 600,
                    "temperature": 0.4
                }
            )
            data = response.json()
            reply = data["choices"][0]["message"]["content"]
    except Exception as e:
        reply = f"AI service unavailable. Error: {str(e)}\n\n⚠️ This is educational information, not legal advice."

    return {"reply": reply}
