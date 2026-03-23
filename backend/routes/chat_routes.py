# ============================================================
# Project  : Know Your Democratic Rights
# Author   : Garvit Pant
# GitHub   : https://github.com/GarvitTech
# © 2026 Garvit Pant. All rights reserved.
# ============================================================

from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from database import get_db, User, UserProfile, Right
from schemas import ChatMessage
from auth import get_current_user
import os, re
from dotenv import load_dotenv

load_dotenv()

router = APIRouter(prefix="/api/chat", tags=["chat"])

GEMINI_API_KEY = os.getenv("GEMINI_API_KEY", "")

DISCLAIMER = "\n\n⚠️ This is educational information, not legal advice. Consult a qualified lawyer for your specific situation."

INTENT_KEYWORDS = {
    "police":    ["police", "arrest", "detain", "detention", "search", "seizure", "stop", "handcuff", "custody", "interrogat", "warrant"],
    "vote":      ["vote", "voting", "election", "ballot", "elect", "democracy", "parliament", "suffrage"],
    "worker":    ["work", "worker", "employ", "job", "salary", "wage", "fire", "terminat", "retrench", "labour", "labor", "boss", "employer", "overtime"],
    "education": ["school", "educat", "student", "college", "university", "learn", "teach", "tuition"],
    "speech":    ["speech", "express", "opinion", "speak", "publish", "write", "press", "media", "protest", "criticis"],
    "privacy":   ["privacy", "private", "data", "personal", "phone", "email", "message", "communication", "surveillance", "track"],
    "religion":  ["religion", "religious", "faith", "belief", "pray", "worship"],
    "equality":  ["equal", "discriminat", "race", "caste", "gender", "sex", "minority", "bias"],
    "lawyer":    ["lawyer", "attorney", "legal", "counsel", "defend", "court", "trial", "sue"],
    "home":      ["home", "house", "property", "enter", "raid", "evict"],
    "emergency": ["emergency", "urgent", "danger", "threat", "life", "death"],
    "child":     ["child", "minor", "kid", "juvenile", "underage", "young", "teen"],
    "digital":   ["internet", "online", "digital", "cyber", "social media", "hack"],
    "fundamental": ["fundamental", "basic", "constitutional", "human rights", "civil rights"],
}

GREETINGS = ["hello", "hi", "hey", "good morning", "good evening", "good afternoon", "how are you", "what's up"]
THANKS     = ["thank", "thanks", "thank you", "thx", "appreciate"]
HELP_QUERIES = ["help", "what can you do", "what do you know", "how do you work", "capabilities"]

IDENTITY_TRIGGERS = [
    "who are you", "what are you", "who made you", "who created you", "who built you",
    "who developed you", "who is your developer", "who is your owner", "who owns you",
    "your creator", "your developer", "your owner", "are you gemini", "are you gpt",
    "are you chatgpt", "are you openai", "are you google", "what ai are you",
    "which ai", "what model", "which model", "are you an ai", "are you a bot",
    "who designed you", "who programmed you", "who is behind you"
]


def is_identity_question(message: str) -> bool:
    msg = message.lower().strip()
    return any(trigger in msg for trigger in IDENTITY_TRIGGERS)


def build_gemini_prompt(message: str, profile, rights_context: str) -> str:
    age_group = "a minor" if profile.age < 18 else "an adult"
    return f"""You are a legal rights education assistant called "Rights Assistant" for the "Know Your Democratic Rights" app, built by Garvit Pant.

STRICT IDENTITY RULES (never break these):
- You are NOT Gemini, NOT ChatGPT, NOT any Google or OpenAI product.
- You are the "Rights Assistant" — an AI built exclusively for the Know Your Democratic Rights app.
- Your developer and owner is Garvit Pant (GitHub: https://github.com/GarvitTech).
- If asked who you are, who made you, or what AI you are — always say you are the Rights Assistant built by Garvit Pant. Never mention Gemini, Google, OpenAI, or any underlying model.

USER CONTEXT:
- Country: {profile.country}
- Age: {profile.age} ({age_group})
- Occupation: {profile.occupation or 'not specified'}
- Gender: {profile.gender or 'not specified'}

RIGHTS DATABASE FOR THIS USER:
{rights_context}

RESPONSE RULES:
- Answer questions about democratic, legal, and constitutional rights.
- Always tailor your answer to {profile.country} and age {profile.age}.
- Cite the legal source (law/article) whenever possible.
- Use clear formatting with bullet points or sections when helpful.
- Be friendly, concise, and easy to understand.
- Always end with exactly: "⚠️ This is educational information, not legal advice. Consult a qualified lawyer for your specific situation."
- For greetings or small talk, respond briefly and guide the user to ask about their rights.

USER MESSAGE: {message}"""


def score_right(right: Right, tokens: list, intents: list) -> int:
    score = 0
    text = (right.title + " " + right.explanation + " " + (right.tags or "") + " " + right.category).lower()
    for token in tokens:
        if len(token) > 2 and token in text:
            score += 3
    for intent in intents:
        for iw in INTENT_KEYWORDS.get(intent, []):
            if iw in text:
                score += 2
                break
    if right.is_emergency and any(i in intents for i in ["police", "emergency", "lawyer"]):
        score += 3
    return score


def detect_intents(message: str) -> list:
    msg = message.lower()
    return [intent for intent, keywords in INTENT_KEYWORDS.items() if any(kw in msg for kw in keywords)]


def build_local_reply(message: str, rights: list, profile) -> str:
    msg_lower = message.lower().strip()

    # Identity question
    if is_identity_question(message):
        return (
            "I'm the **Rights Assistant** 🤖 — an AI built exclusively for the *Know Your Democratic Rights* app.\n\n"
            "I was developed by **Garvit Pant** to help citizens understand their democratic and legal rights.\n\n"
            "Ask me anything about your rights in " + profile.country + "!" + DISCLAIMER
        )

    if any(g in msg_lower for g in GREETINGS) and len(msg_lower) < 40:
        return (
            f"Hello! 👋 I'm your Rights Assistant for **{profile.country}**.\n\n"
            f"I can answer questions about your democratic and legal rights. Try asking:\n"
            f"• What are my rights if police stop me?\n"
            f"• Can my employer fire me without reason?\n"
            f"• What is my right to vote?\n"
            f"• What are my digital privacy rights?\n"
            f"• What rights do students have?" + DISCLAIMER
        )

    if any(t in msg_lower for t in THANKS):
        return "You're welcome! 😊 Feel free to ask me anything else about your rights in " + profile.country + "." + DISCLAIMER

    if any(h in msg_lower for h in HELP_QUERIES):
        categories = list(set(r.category for r in rights))
        return (
            f"I can answer questions about your rights in **{profile.country}** (Age: {profile.age}).\n\n"
            f"**Available categories:**\n" + "\n".join(f"• {c}" for c in categories) +
            "\n\n**Example questions:**\n"
            "• Can police search me without a warrant?\n"
            "• What is the minimum wage?\n"
            "• Do I have the right to vote?\n"
            "• What are my education rights?\n"
            "• What happens if my rights are violated?" + DISCLAIMER
        )

    stop_words = {"what","are","my","is","the","a","an","i","do","can","have","has","how","why",
                  "when","where","who","will","would","should","could","about","in","on","at","to",
                  "for","of","and","or","but","if","be","been","me","you","we","they","it","this",
                  "that","with","from","by"}
    tokens = [t for t in re.findall(r'\b\w+\b', msg_lower) if t not in stop_words and len(t) > 2]
    intents = detect_intents(message)

    scored = sorted(
        [(score_right(r, tokens, intents), r) for r in rights if score_right(r, tokens, intents) > 0],
        key=lambda x: x[0], reverse=True
    )

    if not scored:
        scored = [(1, r) for r in rights if any(t in (r.title + r.explanation + (r.tags or "")).lower() for t in tokens)]

    if not scored:
        return (
            f"I couldn't find specific rights matching your question for **{profile.country}**.\n\n"
            f"Try keywords like: *police, vote, worker, education, privacy, speech, religion, equality, lawyer, arrest*.\n\n"
            f"Or ask: \"What are my fundamental rights?\"" + DISCLAIMER
        )

    intro_map = {
        "police": f"🚔 **Your rights when dealing with police in {profile.country}:**\n",
        "worker": f"💼 **Your worker rights in {profile.country}:**\n",
        "vote":   f"🗳️ **Your voting rights in {profile.country}:**\n",
        "education": f"📚 **Your education rights in {profile.country}:**\n",
        "privacy": f"🔐 **Your privacy rights in {profile.country}:**\n",
        "digital": f"🔐 **Your digital rights in {profile.country}:**\n",
        "speech":  f"🗣️ **Your freedom of speech rights in {profile.country}:**\n",
        "lawyer":  f"⚖️ **Your legal defence rights in {profile.country}:**\n",
    }
    intro = next((intro_map[i] for i in intents if i in intro_map), f"⚖️ **Relevant rights in {profile.country}:**\n")

    parts = [intro]
    for _, r in scored[:4]:
        block = f"**{r.title}**\n{r.explanation}\n📖 *{r.source}*"
        if r.example:
            block += f"\n💡 *Example: {r.example}*"
        parts.append(block)

    if profile.age < 18:
        parts.append("👶 *Note: As a minor, some rights have special protections or age-specific rules.*")

    return "\n\n".join(parts) + DISCLAIMER


@router.post("")
async def chat(msg: ChatMessage, db: Session = Depends(get_db), current_user: User = Depends(get_current_user)):
    profile = db.query(UserProfile).filter(UserProfile.user_id == current_user.id).first()

    if not profile:
        return {"reply": "Please complete your profile first so I can give you country and age-specific rights information."}

    rights = db.query(Right).filter(
        Right.country == profile.country,
        Right.min_age <= profile.age,
        Right.max_age >= profile.age
    ).all()

    rights_context = "\n".join([
        f"- {r.title} ({r.category}): {r.explanation} [Source: {r.source}]"
        for r in rights
    ])

    # Identity question — always answer locally, never let Gemini reveal itself
    if is_identity_question(msg.message):
        return {
            "reply": (
                "I'm the **Rights Assistant** 🤖 — an AI built exclusively for the *Know Your Democratic Rights* app.\n\n"
                "I was developed by **Garvit Pant** to help citizens understand their democratic and legal rights.\n\n"
                "Ask me anything about your rights in " + profile.country + "!" + DISCLAIMER
            )
        }

    # Try Gemini
    if GEMINI_API_KEY:
        try:
            from google import genai
            client = genai.Client(api_key=GEMINI_API_KEY)
            prompt = build_gemini_prompt(msg.message, profile, rights_context)
            response = client.models.generate_content(
                model="gemini-2.5-flash-lite",
                contents=prompt
            )
            return {"reply": response.text}
        except Exception:
            pass  # Fall through to local AI

    # Local smart fallback
    return {"reply": build_local_reply(msg.message, rights, profile)}
