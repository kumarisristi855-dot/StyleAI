from pydantic import BaseModel, EmailStr, Field
from typing import Optional, List
from datetime import datetime
from uuid import UUID


class UserCreate(BaseModel):
    email: str
    name: str
    auth_id: str
    auth_provider: str


class UserResponse(BaseModel):
    id: UUID
    email: str
    name: Optional[str]
    tier: str
    credits: int
    preferences: Optional[dict]
    created_at: datetime

    class Config:
        from_attributes = True


class WardrobeItemCreate(BaseModel):
    image_url: str
    category: str = "other"
    subcategory: Optional[str] = None
    color: Optional[str] = None
    color_hex: Optional[str] = None
    brand: Optional[str] = None
    material: Optional[str] = None
    style_tags: List[str] = []
    season: Optional[str] = None
    purchase_price: Optional[float] = None


class WardrobeItemResponse(BaseModel):
    id: UUID
    image_url: str
    category: str
    subcategory: Optional[str]
    color: Optional[str]
    color_hex: Optional[str]
    brand: Optional[str]
    material: Optional[str]
    style_tags: List[str]
    season: Optional[str]
    wear_count: int
    is_favorite: bool
    ai_description: Optional[str]
    created_at: datetime

    class Config:
        from_attributes = True


class OutfitCreate(BaseModel):
    name: str
    occasion: Optional[str] = None
    season: Optional[str] = None
    is_public: bool = False
    item_ids: List[UUID] = []


class OutfitResponse(BaseModel):
    id: UUID
    name: str
    occasion: Optional[str]
    season: Optional[str]
    style_scores: Optional[dict]
    is_public: bool
    created_at: datetime

    class Config:
        from_attributes = True


class AIRecommendRequest(BaseModel):
    prompt: str
    context: Optional[dict] = None


class AIRecommendResponse(BaseModel):
    response: str
    metadata: Optional[dict] = None


class StylistChatRequest(BaseModel):
    message: str
    history: List[dict] = []


class StylistChatResponse(BaseModel):
    response: str


class ProductSearchRequest(BaseModel):
    query: str
    stores: List[str] = ["myntra", "amazon", "ajio", "flipkart"]


class ProductResponse(BaseModel):
    id: UUID
    store: str
    name: str
    price: float
    original_price: Optional[float]
    discount: Optional[float]
    rating: Optional[float]
    image_url: Optional[str]
    product_url: Optional[str]

    class Config:
        from_attributes = True


class TryOnRequest(BaseModel):
    person_image_url: str
    outfit_image_url: str
    pose: Optional[str] = "standing"


class TryOnResponse(BaseModel):
    result_image_url: str
    processing_time_ms: int


class WeatherOutfitRequest(BaseModel):
    lat: float
    lng: float


class PackingListRequest(BaseModel):
    destination: str
    trip_duration: int
    weather_condition: Optional[str] = None


class ScoreOutfitRequest(BaseModel):
    outfit_id: UUID
    occasion: Optional[str] = None
