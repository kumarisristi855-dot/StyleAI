from app.core.config import settings
from app.services.ai import (
    FASHION_DETECTION_PROMPT,
    OUTFIT_GENERATION_PROMPT,
    STYLIST_CHAT_PROMPT,
)


def _get_genai():
    import google.generativeai as genai
    genai.configure(api_key=settings.GEMINI_API_KEY)
    return genai


async def detect_fashion_item(image_bytes: bytes) -> dict:
    genai = _get_genai()
    model = genai.GenerativeModel("gemini-1.5-flash")
    response = model.generate_content(
        [FASHION_DETECTION_PROMPT, {"mime_type": "image/jpeg", "data": image_bytes}]
    )
    return response.text


async def generate_outfit(items: list, preferences: dict, occasion: str = "casual", weather: str = "") -> dict:
    genai = _get_genai()
    model = genai.GenerativeModel("gemini-1.5-flash")
    prompt = OUTFIT_GENERATION_PROMPT.format(
        items=str(items),
        preferences=str(preferences),
        occasion=occasion,
        weather=weather,
    )
    response = model.generate_content(prompt)
    return response.text


async def chat_with_stylist(
    message: str,
    wardrobe_context: str = "",
    style_profile: str = "",
    history: list | None = None,
) -> str:
    genai = _get_genai()
    model = genai.GenerativeModel("gemini-1.5-flash")
    prompt = STYLIST_CHAT_PROMPT.format(
        message=message,
        wardrobe_context=wardrobe_context,
        style_profile=style_profile,
    )
    chat = model.start_chat(history=history or [])
    response = chat.send_message(prompt)
    return response.text


async def score_outfit(outfit_description: str, occasion: str = "") -> dict:
    genai = _get_genai()
    model = genai.GenerativeModel("gemini-1.5-flash")
    prompt = f"""Rate this outfit from 0-100 on these metrics. Return ONLY JSON.
    Outfit: {outfit_description}
    Occasion: {occasion}
    
    Return: {{{{style_score, trend_score, color_score, occasion_match, overall, suggestions}}}}"""
    response = model.generate_content(prompt)
    return response.text


async def analyze_color_harmony(colors: list[str]) -> dict:
    genai = _get_genai()
    model = genai.GenerativeModel("gemini-1.5-flash")
    prompt = f"""Analyze this color combination for fashion: {colors}
    Rate compatibility, contrast, and balance 0-100.
    Suggest improvements.
    Return valid JSON only."""
    response = model.generate_content(prompt)
    return response.text


async def shopping_copilot(screenshot_description: str, wardrobe: str, budget: float) -> dict:
    genai = _get_genai()
    model = genai.GenerativeModel("gemini-1.5-flash")
    prompt = f"""Analyze this product image description: {screenshot_description}
    User's wardrobe: {wardrobe}
    Budget: {budget}
    
    Determine:
    1. Should they buy it? (yes/no/maybe)
    2. Will it match their existing wardrobe? (0-100)
    3. Better alternatives?
    4. Cost-per-wear estimate
    5. Overall recommendation
    
    Return valid JSON only."""
    response = model.generate_content(prompt)
    return response.text


async def generate_alternative_look(outfit: str, vibe: str) -> dict:
    genai = _get_genai()
    model = genai.GenerativeModel("gemini-1.5-flash")
    prompt = f"""Transform this outfit into a {vibe} version.
    Original: {outfit}
    
    Suggest alternative items, explain the changes for {vibe} aesthetic.
    Return valid JSON with: name, items, rationale, style_scores"""
    response = model.generate_content(prompt)
    return response.text
