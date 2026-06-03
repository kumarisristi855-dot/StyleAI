from fastapi import APIRouter, HTTPException, Depends, UploadFile, File
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select
from app.core.database import get_db
from app.api.deps import get_current_user
from app.models import User, WardrobeItem, Outfit, OutfitItem, SocialPost
from app.schemas import (
    WardrobeItemCreate, WardrobeItemResponse,
    OutfitCreate, OutfitResponse,
    UserResponse,
)
from app.services.ai import detect_fashion_item, generate_outfit, score_outfit
import json

router = APIRouter()


@router.get("/health")
async def health_check():
    return {"status": "healthy", "service": "StyleAI API"}


@router.get("/users/me", response_model=UserResponse)
async def get_me(
    current_user: dict = Depends(get_current_user),
    db: AsyncSession = Depends(get_db),
):
    result = await db.execute(
        select(User).where(User.auth_id == current_user.get("sub"))
    )
    user = result.scalar_one_or_none()
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    return user


@router.post("/wardrobe/items", response_model=WardrobeItemResponse)
async def create_wardrobe_item(
    item: WardrobeItemCreate,
    current_user: dict = Depends(get_current_user),
    db: AsyncSession = Depends(get_db),
):
    result = await db.execute(
        select(User).where(User.auth_id == current_user.get("sub"))
    )
    user = result.scalar_one_or_none()
    if not user:
        raise HTTPException(status_code=404, detail="User not found")

    db_item = WardrobeItem(
        user_id=user.id,
        **item.model_dump(),
    )
    db.add(db_item)
    await db.commit()
    await db.refresh(db_item)
    return db_item


@router.get("/wardrobe/items", response_model=list[WardrobeItemResponse])
async def list_wardrobe_items(
    category: str | None = None,
    current_user: dict = Depends(get_current_user),
    db: AsyncSession = Depends(get_db),
):
    result = await db.execute(
        select(User).where(User.auth_id == current_user.get("sub"))
    )
    user = result.scalar_one_or_none()
    if not user:
        raise HTTPException(status_code=404, detail="User not found")

    query = select(WardrobeItem).where(WardrobeItem.user_id == user.id)
    if category:
        query = query.where(WardrobeItem.category == category)
    query = query.order_by(WardrobeItem.created_at.desc())

    result = await db.execute(query)
    return result.scalars().all()


@router.post("/wardrobe/upload/analyze")
async def analyze_upload(
    file: UploadFile = File(...),
    current_user: dict = Depends(get_current_user),
):
    contents = await file.read()
    analysis = await detect_fashion_item(contents)
    return {"analysis": json.loads(analysis) if isinstance(analysis, str) else analysis}


@router.post("/outfits", response_model=OutfitResponse)
async def create_outfit(
    outfit: OutfitCreate,
    current_user: dict = Depends(get_current_user),
    db: AsyncSession = Depends(get_db),
):
    result = await db.execute(
        select(User).where(User.auth_id == current_user.get("sub"))
    )
    user = result.scalar_one_or_none()
    if not user:
        raise HTTPException(status_code=404, detail="User not found")

    db_outfit = Outfit(
        user_id=user.id,
        name=outfit.name,
        occasion=outfit.occasion,
        season=outfit.season,
        is_public=outfit.is_public,
    )
    db.add(db_outfit)
    await db.flush()

    for i, item_id in enumerate(outfit.item_ids):
        db_outfit_item = OutfitItem(
            outfit_id=db_outfit.id,
            wardrobe_item_id=item_id,
            position=i,
        )
        db.add(db_outfit_item)

    await db.commit()
    await db.refresh(db_outfit)
    return db_outfit


@router.get("/outfits", response_model=list[OutfitResponse])
async def list_outfits(
    current_user: dict = Depends(get_current_user),
    db: AsyncSession = Depends(get_db),
):
    result = await db.execute(
        select(User).where(User.auth_id == current_user.get("sub"))
    )
    user = result.scalar_one_or_none()
    if not user:
        raise HTTPException(status_code=404, detail="User not found")

    query = select(Outfit).where(Outfit.user_id == user.id).order_by(Outfit.created_at.desc())
    result = await db.execute(query)
    return result.scalars().all()


@router.post("/outfits/ai-generate")
async def ai_generate_outfit(
    occasion: str = "casual",
    current_user: dict = Depends(get_current_user),
    db: AsyncSession = Depends(get_db),
):
    result = await db.execute(
        select(User).where(User.auth_id == current_user.get("sub"))
    )
    user = result.scalar_one_or_none()
    if not user:
        raise HTTPException(status_code=404, detail="User not found")

    items_result = await db.execute(
        select(WardrobeItem).where(WardrobeItem.user_id == user.id)
    )
    items = items_result.scalars().all()

    items_data = [
        {"name": f"{item.color} {item.brand} {item.category}".strip(), "category": item.category}
        for item in items
    ]

    suggestion = await generate_outfit(
        items=items_data,
        preferences=user.preferences or {},
        occasion=occasion,
    )
    return {
        "suggestion": json.loads(suggestion) if isinstance(suggestion, str) else suggestion,
        "available_items_count": len(items),
    }


@router.post("/outfits/{outfit_id}/score")
async def score_outfit_endpoint(
    outfit_id: str,
    occasion: str = "",
    current_user: dict = Depends(get_current_user),
    db: AsyncSession = Depends(get_db),
):
    result = await db.execute(select(Outfit).where(Outfit.id == outfit_id))
    outfit = result.scalar_one_or_none()
    if not outfit:
        raise HTTPException(status_code=404, detail="Outfit not found")

    items_result = await db.execute(
        select(WardrobeItem)
        .join(OutfitItem)
        .where(OutfitItem.outfit_id == outfit_id)
    )
    items = items_result.scalars().all()

    outfit_desc = f"Outfit: {outfit.name}. Items: {[f'{i.color} {i.category}' for i in items]}"
    scores = await score_outfit(outfit_desc, occasion)

    outfit.style_scores = json.loads(scores) if isinstance(scores, str) else scores
    await db.commit()
    return outfit.style_scores
