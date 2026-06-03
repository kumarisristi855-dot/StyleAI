from app.core.config import settings


async def _groq_completion(messages: list[dict], model: str = "llama-3.3-70b-versatile") -> str:
    from openai import AsyncOpenAI
    client = AsyncOpenAI(
        api_key=settings.GROQ_API_KEY,
        base_url="https://api.groq.com/openai/v1",
    )
    response = await client.chat.completions.create(
        model=model,
        messages=messages,
        temperature=0.7,
        max_tokens=1024,
    )
    return response.choices[0].message.content or ""


def _system_prompt(role: str, context: str = "") -> list[dict]:
    prompts = {
        "stylist": f"""You are a professional AI fashion stylist named StyleAI. Help users with outfit suggestions, style advice, color matching, shopping recommendations, and occasion-specific styling. Be concise and personalized.
User's wardrobe context: {context}""",

        "outfit": "You are a professional fashion stylist creating complete outfits. Consider: color harmony, occasion fit, season, and current trends. Return valid JSON.",

        "detect": "Analyze this fashion item image and return a JSON with: category, subcategory, color, color_hex, brand, material, style_tags, season. Return ONLY valid JSON.",

        "score": "Rate this outfit from 0-100 on style, trend, color, occasion match, and overall. Return valid JSON only.",

        "color": "Analyze this color combination for fashion. Rate compatibility, contrast, and balance 0-100. Suggest improvements. Return valid JSON only.",

        "shopping": "Analyze this product for a user. Determine buy recommendation, wardrobe match score, alternatives, cost-per-wear. Return valid JSON only.",

        "alternative": "Transform this outfit into a different vibe version. Return valid JSON with: name, items, rationale, style_scores.",
    }
    return [{"role": "system", "content": prompts.get(role, "")}]


# --- Detection ---

async def detect_fashion_item(image_bytes: bytes) -> dict:
    import base64
    b64 = base64.b64encode(image_bytes).decode()
    from app.services.ai.gemini_service import detect_fashion_item as gemini_detect
    return await gemini_detect(image_bytes)


async def generate_outfit(items: list, preferences: dict, occasion: str = "casual", weather: str = "") -> dict:
    content = f"""Items: {items}
Preferences: {preferences}
Occasion: {occasion}
Weather: {weather}

Return JSON: name, items, missing_items, style_scores, rationale"""
    messages = _system_prompt("outfit") + [{"role": "user", "content": content}]
    result = await _groq_completion(messages)
    return result


async def chat_with_stylist(
    message: str,
    wardrobe_context: str = "",
    style_profile: str = "",
    history: list | None = None,
) -> str:
    sys = _system_prompt("stylist", f"{wardrobe_context}\nStyle profile: {style_profile}")
    msgs = sys + (history or []) + [{"role": "user", "content": message}]
    return await _groq_completion(msgs)


async def score_outfit(outfit_description: str, occasion: str = "") -> dict:
    content = f"Outfit: {outfit_description}\nOccasion: {occasion}"
    messages = _system_prompt("score") + [{"role": "user", "content": content}]
    return await _groq_completion(messages)


async def analyze_color_harmony(colors: list[str]) -> dict:
    messages = _system_prompt("color") + [{"role": "user", "content": f"Colors: {colors}"}]
    return await _groq_completion(messages)


async def shopping_copilot(screenshot_description: str, wardrobe: str, budget: float) -> dict:
    content = f"Product: {screenshot_description}\nWardrobe: {wardrobe}\nBudget: {budget}"
    messages = _system_prompt("shopping") + [{"role": "user", "content": content}]
    return await _groq_completion(messages)


async def generate_alternative_look(outfit: str, vibe: str) -> dict:
    content = f"Original outfit: {outfit}\nDesired vibe: {vibe}"
    messages = _system_prompt("alternative") + [{"role": "user", "content": content}]
    return await _groq_completion(messages)
