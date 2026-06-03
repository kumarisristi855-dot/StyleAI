import uuid
from datetime import datetime, timezone
from sqlalchemy import Column, String, Integer, Boolean, Float, JSON, DateTime, ForeignKey, Text, Numeric, ARRAY
from sqlalchemy.dialects.postgresql import UUID
from app.core.database import Base


class User(Base):
    __tablename__ = "users"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    email = Column(String(255), unique=True, nullable=False, index=True)
    name = Column(String(255))
    auth_provider = Column(String(50))
    auth_id = Column(String(255), unique=True)
    preferences = Column(JSON, default=dict)
    credits = Column(Integer, default=0)
    tier = Column(String(20), default="free")
    created_at = Column(DateTime(timezone=True), default=lambda: datetime.now(timezone.utc))
    updated_at = Column(DateTime(timezone=True), default=lambda: datetime.now(timezone.utc), onupdate=lambda: datetime.now(timezone.utc))


class UserStyleProfile(Base):
    __tablename__ = "user_style_profiles"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    user_id = Column(UUID(as_uuid=True), ForeignKey("users.id", ondelete="CASCADE"), unique=True, nullable=False)
    body_type = Column(String(50))
    skin_tone = Column(String(50))
    height_cm = Column(Integer)
    weight_kg = Column(Integer)
    favorite_colors = Column(ARRAY(String), default=list)
    favorite_brands = Column(ARRAY(String), default=list)
    style_tags = Column(ARRAY(String), default=list)
    occasions = Column(ARRAY(String), default=list)


class WardrobeItem(Base):
    __tablename__ = "wardrobe_items"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    user_id = Column(UUID(as_uuid=True), ForeignKey("users.id", ondelete="CASCADE"), nullable=False, index=True)
    image_url = Column(Text, nullable=False)
    category = Column(String(100), index=True)
    subcategory = Column(String(100))
    color = Column(String(50))
    color_hex = Column(String(7))
    brand = Column(String(255))
    material = Column(String(100))
    style_tags = Column(ARRAY(String), default=list)
    season = Column(String(50))
    purchase_price = Column(Numeric(10, 2))
    purchase_url = Column(Text)
    wear_count = Column(Integer, default=0)
    last_worn = Column(DateTime(timezone=True))
    is_favorite = Column(Boolean, default=False)
    ai_description = Column(Text)
    created_at = Column(DateTime(timezone=True), default=lambda: datetime.now(timezone.utc))
    updated_at = Column(DateTime(timezone=True), default=lambda: datetime.now(timezone.utc), onupdate=lambda: datetime.now(timezone.utc))


class Outfit(Base):
    __tablename__ = "outfits"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    user_id = Column(UUID(as_uuid=True), ForeignKey("users.id", ondelete="CASCADE"), nullable=False, index=True)
    name = Column(String(255))
    occasion = Column(String(100))
    season = Column(String(50))
    style_scores = Column(JSON, default=dict)
    is_public = Column(Boolean, default=False)
    created_at = Column(DateTime(timezone=True), default=lambda: datetime.now(timezone.utc))
    updated_at = Column(DateTime(timezone=True), default=lambda: datetime.now(timezone.utc), onupdate=lambda: datetime.now(timezone.utc))


class OutfitItem(Base):
    __tablename__ = "outfit_items"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    outfit_id = Column(UUID(as_uuid=True), ForeignKey("outfits.id", ondelete="CASCADE"), nullable=False)
    wardrobe_item_id = Column(UUID(as_uuid=True), ForeignKey("wardrobe_items.id", ondelete="CASCADE"), nullable=False)
    position = Column(Integer)
    role = Column(String(50))
    wardrobe_item_ref = None


class Product(Base):
    __tablename__ = "products"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    store = Column(String(50), nullable=False)
    external_id = Column(String(255))
    name = Column(String(500), nullable=False)
    description = Column(Text)
    image_url = Column(Text)
    price = Column(Numeric(10, 2))
    original_price = Column(Numeric(10, 2))
    discount = Column(Numeric(5, 2))
    rating = Column(Numeric(3, 2))
    review_count = Column(Integer)
    category = Column(String(100))
    brand = Column(String(255))
    color = Column(String(50))
    product_url = Column(Text)
    created_at = Column(DateTime(timezone=True), default=lambda: datetime.now(timezone.utc))


class SocialPost(Base):
    __tablename__ = "social_posts"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    user_id = Column(UUID(as_uuid=True), ForeignKey("users.id", ondelete="CASCADE"), nullable=False)
    outfit_id = Column(UUID(as_uuid=True), ForeignKey("outfits.id", ondelete="CASCADE"))
    caption = Column(Text)
    likes_count = Column(Integer, default=0)
    comments_count = Column(Integer, default=0)
    created_at = Column(DateTime(timezone=True), default=lambda: datetime.now(timezone.utc))


class Vote(Base):
    __tablename__ = "votes"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    post_id = Column(UUID(as_uuid=True), ForeignKey("social_posts.id", ondelete="CASCADE"), nullable=False)
    user_id = Column(UUID(as_uuid=True), ForeignKey("users.id", ondelete="CASCADE"), nullable=False)
    vote = Column(Integer, default=1)
    comment = Column(Text)


class Trend(Base):
    __tablename__ = "trends"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    name = Column(String(255), nullable=False)
    type = Column(String(50))
    category = Column(String(100))
    score = Column(Numeric(5, 2))
    season = Column(String(50))
    trend_metadata = Column("metadata", JSON, default=dict)
    valid_from = Column(DateTime(timezone=True))
    valid_to = Column(DateTime(timezone=True))
    created_at = Column(DateTime(timezone=True), default=lambda: datetime.now(timezone.utc))


class PackingList(Base):
    __tablename__ = "packing_lists"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    user_id = Column(UUID(as_uuid=True), ForeignKey("users.id", ondelete="CASCADE"), nullable=False)
    destination = Column(String(255))
    trip_duration = Column(Integer)
    weather_forecast = Column(JSON, default=dict)
    generated_items = Column(JSON, default=list)
    is_completed = Column(Boolean, default=False)
    created_at = Column(DateTime(timezone=True), default=lambda: datetime.now(timezone.utc))


class UsageLog(Base):
    __tablename__ = "usage_logs"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    user_id = Column(UUID(as_uuid=True), ForeignKey("users.id", ondelete="CASCADE"), nullable=False)
    feature = Column(String(100), index=True)
    input_tokens = Column(Integer, default=0)
    output_tokens = Column(Integer, default=0)
    cost = Column(Numeric(10, 6), default=0)
    duration_ms = Column(Integer, default=0)
    created_at = Column(DateTime(timezone=True), default=lambda: datetime.now(timezone.utc))
