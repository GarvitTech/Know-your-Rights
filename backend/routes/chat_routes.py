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
import os, httpx, re
from dotenv import load_dotenv

load_dotenv()

router = APIRouter(prefix="/api/chat", tags=["chat"])

OPENAI_API_KEY = os.getenv("OPENAI_API_KEY", "")
OPENAI_BASE_URL = os.getenv("OPENAI_BASE_URL", "https://api.openai.com/v1")
AI_MODEL = os.getenv("AI_MODEL", "gpt-3.5-turbo")

DISCLAIMER = "\n\n⚠️ This is educational information, not legal advice. Consult a qualified lawyer for your specific situation."

# Intent → keyword groups for smarter matching
INTENT_KEYWORDS = {
    "police": ["police", "arrest", "detain", "detention", "search", "seizure", "stop", "handcuff", "custody", "interrogat", "warrant"],
    "vote": ["vote", "voting", "election", "ballot", "elect", "democracy", "parliament", "suffrage"],
    "worker": ["work", "worker", "employ", "job", "salary", "wage", "fire", "terminat", "retrench", "labour", "labor", "boss", "employer", "overtime", "resign"],
    "education": ["school", "educat", "student", "college", "university", "learn", "teach", "class", "tuition"],
    "speech": ["speech", "express", "opinion", "speak", "say", "publish", "write", "press", "media", "protest", "criticis"],
    "privacy": ["privacy", "private", "data", "personal", "phone", "email", "message", "communication", "surveillance", "track", "monitor"],
    "religion": ["religion", "religious", "faith", "belief", "pray", "worship", "church", "mosque", "temple"],
    "equality": ["equal", "discriminat", "race", "caste", "gender", "sex", "minority", "bias", "prejudice"],
    "lawyer": ["lawyer", "attorney", "legal", "counsel", "defend", "court", "trial", "sue", "rights violated"],
    "home": ["home", "house", "property", "enter", "raid", "search home", "evict"],
    "emergency": ["emergency", "urgent", "immediate", "danger", "threat", "life", "death", "kill", "hurt"],
    "child": ["child", "minor", "kid", "juvenile", "underage", "young", "teen"],
    "digital": ["internet", "online", "digital", "cyber", "social media", "data", "hack", "surveillance"],
    "health": ["health", "medical", "hospital", "doctor", "treatment", "insurance"],
    "fundamental": ["fundamental", "basic", "constitutional", "human rights", "civil rights"],
}

# Greeting / small talk patterns
GREETINGS = ["hello", "hi", "hey", "good morning", "good evening", "good afternoon", "how are you", "what's up", "sup"]
THANKS = ["thank", "thanks", "thank you", "thx", "appreciate"]
HELP_QUERIES = ["help", "what can you do", "what do you know", "how do you work", "capabilities"]


def score_right(right: Right, tokens: list[str], intents: list[str]) -> int:
    score = 0
    text = (right.title + " " + right.explanation + " " + (right.tags or "") + " " + right.category).lower()
    # Direct token match
    for token in tokens:
        if len(token) > 2 and token in text:
            score += 3
    # Intent match
    for intent in intents:
        intent_words = INTENT_KEYWORDS.get(intent, [])
        for iw in intent_words:
            if iw in text:
                score += 2
                break
    # Emergency boost
    if right.is_emergency and any(i in intents for i in ["police", "emergency", "lawyer"]):
        score += 3
    return score


def detect_intents(message: str) -> list[str]:
    msg = message.lower()
    found = []
    for intent, keywords in INTENT_KEYWORDS.items():
        if any(kw in msg for kw in keywords):
            found.append(intent)
    return found


def build_local_reply(message: str, rights: list[Right], profile) -> str:
    msg_lower = message.lower().strip()

    # Handle greetings
    if any(g in msg_lower for g in GREETINGS) and len(msg_lower) < 40:
        return (
            f"Hello! 👋 I'm your AI Rights Assistant for **{profile.country}**.\n\n"
            f"I can answer questions about your democratic and legal rights. Try asking:\n"
            f"• What are my rights if police stop me?\n"
            f"• Can my employer fire me without reason?\n"
            f"• What is my right to vote?\n"
            f"• What are my digital privacy rights?\n"
            f"• What rights do students have?"
            + DISCLAIMER
        )

    # Handle thanks
    if any(t in msg_lower for t in THANKS):
        return "You're welcome! 😊 Feel free to ask me anything else about your rights in " + profile.country + "." + DISCLAIMER

    # Handle help queries
    if any(h in msg_lower for h in HELP_QUERIES):
        categories = list(set(r.category for r in rights))
        return (
            f"I can answer questions about your rights in **{profile.country}** (Age: {profile.age}).\n\n"
            f"**Available categories:**\n" +
            "\n".join(f"• {c}" for c in categories) +
            "\n\n**Example questions:**\n"
            "• Can police search me without a warrant?\n"
            "• What is the minimum wage?\n"
            "• Do I have the right to vote?\n"
            "• What are my education rights?\n"
            "• What happens if my rights are violated?"
            + DISCLAIMER
        )

    # Tokenize message
    tokens = re.findall(r'\b\w+\b', msg_lower)
    stop_words = {"what", "are", "my", "is", "the", "a", "an", "i", "do", "can", "have", "has",
                  "how", "why", "when", "where", "who", "will", "would", "should", "could", "about",
                  "in", "on", "at", "to", "for", "of", "and", "or", "but", "if", "be", "been",
                  "me", "you", "we", "they", "it", "this", "that", "with", "from", "by"}
    tokens = [t for t in tokens if t not in stop_words and len(t) > 2]

    intents = detect_intents(message)

    # Score all rights
    scored = [(score_right(r, tokens, intents), r) for r in rights]
    scored = [(s, r) for s, r in scored if s > 0]
    scored.sort(key=lambda x: x[0], reverse=True)

    if not scored:
        # Try broader search — any single token match
        for r in rights:
            text = (r.title + " " + r.explanation + " " + (r.tags or "")).lower()
            if any(t in text for t in tokens):
                scored.append((1, r))

    if not scored:
        return (
            f"I couldn't find specific rights matching your question in my database for **{profile.country}**.\n\n"
            f"Try rephrasing with keywords like: *police, vote, worker, education, privacy, speech, religion, equality, lawyer, arrest*.\n\n"
            f"Or ask something like:\n"
            f"• \"What are my fundamental rights?\"\n"
            f"• \"Can police search me without permission?\"\n"
            f"• \"What are worker rights?\""
            + DISCLAIMER
        )

    # Build a rich, structured answer
    top_rights = scored[:4]  # Show up to 4 most relevant rights
    reply_parts = []

    # Intro line based on intent
    if "police" in intents:
        reply_parts.append(f"🚔 **Your rights when dealing with police in {profile.country}:**\n")
    elif "worker" in intents:
        reply_parts.append(f"💼 **Your worker rights in {profile.country}:**\n")
    elif "vote" in intents:
        reply_parts.append(f"🗳️ **Your voting rights in {profile.country}:**\n")
    elif "education" in intents:
        reply_parts.append(f"📚 **Your education rights in {profile.country}:**\n")
    elif "privacy" in intents or "digital" in intents:
        reply_parts.append(f"🔐 **Your privacy rights in {profile.country}:**\n")
    elif "speech" in intents:
        reply_parts.append(f"🗣️ **Your freedom of speech rights in {profile.country}:**\n")
    elif "lawyer" in intents:
        reply_parts.append(f"⚖️ **Your legal defence rights in {profile.country}:**\n")
    else:
        reply_parts.append(f"⚖️ **Relevant rights in {profile.country} for your question:**\n")

    for _, r in top_rights:
        block = f"**{r.title}**\n{r.explanation}\n📖 *{r.source}*"
        if r.example:
            block += f"\n💡 *Example: {r.example}*"
        reply_parts.append(block)

    # Add age-specific note if relevant
    if profile.age < 18:
        reply_parts.append("👶 *Note: As a minor, some rights have special protections or age-specific rules.*")

    reply = "\n\n".join(reply_parts)
    reply += DISCLAIMER
    return reply


def build_system_prompt(profile, rights_context: str) -> str:
    age_group = "a minor" if profile.age < 18 else "an adult"
    return f"""You are a legal rights education assistant for the "Know Your Democratic Rights" app.
The user is {age_group} aged {profile.age}, living in {profile.country}.
Occupation: {profile.occupation or 'not specified'}. Gender: {profile.gender or 'not specified'}.

Relevant rights from the database for this user:
{rights_context}

Rules:
- Answer ONLY about democratic and legal rights topics.
- Always cite the legal source (law/article) when possible.
- Tailor answers to the user's country ({profile.country}) and age ({profile.age}).
- Use bullet points and clear formatting for readability.
- End every response with: "⚠️ This is educational information, not legal advice. Consult a qualified lawyer for your specific situation."
- Be concise, clear, and friendly.
- If asked about greetings or general chat, respond briefly and redirect to rights topics.
"""


@router.post("")
async def chat(msg: ChatMessage, db: Session = Depends(get_db), current_user: User = Depends(get_current_user)):
    profile = db.query(UserProfile).filter(UserProfile.user_id == current_user.id).first()

    if not profile:
        return {"reply": "Please complete your profile first so I can give you country and age-specific rights information."}

    # Fetch all rights for this user's country and age
    rights = db.query(Right).filter(
        Right.country == profile.country,
        Right.min_age <= profile.age,
        Right.max_age >= profile.age
    ).all()

    rights_context = "\n".join([
        f"- {r.title} ({r.category}): {r.explanation} [Source: {r.source}]"
        for r in rights
    ])

    # Use OpenAI if configured
    if OPENAI_API_KEY and OPENAI_API_KEY not in ("", "your-openai-api-key-here"):
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
                        "max_tokens": 700,
                        "temperature": 0.4
                    }
                )
                data = response.json()
                return {"reply": data["choices"][0]["message"]["content"]}
        except Exception as e:
            # Fall through to local AI on OpenAI failure
            pass

    # Local smart AI fallback
    reply = build_local_reply(msg.message, rights, profile)
    return {"reply": reply}
