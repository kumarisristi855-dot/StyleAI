from redis import asyncio as aioredis
from app.core.config import settings

redis_client: aioredis.Redis | None = None


async def get_redis() -> aioredis.Redis:
    global redis_client
    if redis_client is None:
        redis_client = await aioredis.from_url(
            settings.REDIS_URL, decode_responses=True
        )
    return redis_client


async def cache_get(key: str) -> str | None:
    r = await get_redis()
    return await r.get(key)


async def cache_set(key: str, value: str, ttl: int = 3600) -> None:
    r = await get_redis()
    await r.setex(key, ttl, value)


async def cache_delete(key: str) -> None:
    r = await get_redis()
    await r.delete(key)
