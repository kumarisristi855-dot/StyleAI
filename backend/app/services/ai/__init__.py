from app.core.config import settings

FASHION_DETECTION_PROMPT = """Analyze this fashion item image and return a JSON with:
- category: (top/bottom/footwear/accessory/outerwear/dress/other)
- subcategory: (specific type like t-shirt, jeans, sneakers, etc.)
- color: (dominant color name)
- color_hex: (hex code of dominant color)
- brand: (if visible)
- material: (if visible)
- style_tags: (array of style descriptors like casual, formal, sporty, etc.)
- season: (summer/winter/all-season)

Return ONLY valid JSON."""

OUTFIT_GENERATION_PROMPT = """You are a professional fashion stylist. Based on these wardrobe items, create a complete outfit.
Consider: color harmony, occasion fit, season, and current trends.

User's items: {items}
User's preferences: {preferences}
Occasion: {occasion}
Weather: {weather}

Return a JSON with:
- name: outfit name
- items: array of item names from the user's wardrobe
- missing_items: items they need to buy
- style_scores: {{style, trend, color, occasion, overall}}
- rationale: explanation of styling decisions"""

STYLIST_CHAT_PROMPT = """You are a professional AI fashion stylist named StyleAI. You help users with:
1. Outfit suggestions based on their wardrobe
2. Style advice and fashion tips
3. Color matching and coordination
4. Shopping recommendations within budget
5. Occasion-specific styling (office, party, wedding, casual, etc.)
6. Trend information and seasonal fashion

Be concise, helpful, and personalized. Reference their wardrobe items when available.
User's wardrobe context: {wardrobe_context}
User's style profile: {style_profile}
User message: {message}"""


def _get_ai_service():
    if settings.AI_PROVIDER == "groq" and settings.GROQ_API_KEY:
        from app.services.ai.groq_service import (
            detect_fashion_item as detect,
            generate_outfit as outfit,
            chat_with_stylist as chat,
            score_outfit as score,
            analyze_color_harmony as color,
            shopping_copilot as shop,
            generate_alternative_look as alt,
        )
        return detect, outfit, chat, score, color, shop, alt
    from app.services.ai.gemini_service import (
        detect_fashion_item as detect,
        generate_outfit as outfit,
        chat_with_stylist as chat,
        score_outfit as score,
        analyze_color_harmony as color,
        shopping_copilot as shop,
        generate_alternative_look as alt,
    )
    return detect, outfit, chat, score, color, shop, alt


async def detect_fashion_item(image_bytes: bytes) -> dict:
    fn = _get_ai_service()[0]
    return await fn(image_bytes)


async def generate_outfit(items: list, preferences: dict, occasion: str = "casual", weather: str = "") -> dict:
    fn = _get_ai_service()[1]
    return await fn(items, preferences, occasion, weather)


async def chat_with_stylist(
    message: str,
    wardrobe_context: str = "",
    style_profile: str = "",
    history: list | None = None,
) -> str:
    fn = _get_ai_service()[2]
    return await fn(message, wardrobe_context, style_profile, history)


async def score_outfit(outfit_description: str, occasion: str = "") -> dict:
    fn = _get_ai_service()[3]
    return await fn(outfit_description, occasion)


async def analyze_color_harmony(colors: list[str]) -> dict:
    fn = _get_ai_service()[4]
    return await fn(colors)


async def shopping_copilot(screenshot_description: str, wardrobe: str, budget: float) -> dict:
    fn = _get_ai_service()[5]
    return await fn(screenshot_description, wardrobe, budget)


async def generate_alternative_look(outfit: str, vibe: str) -> dict:
    fn = _get_ai_service()[6]
    return await fn(outfit, vibe)
