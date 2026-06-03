export interface User {
  id: string;
  email: string;
  name: string;
  imageUrl?: string;
  tier: "free" | "pro" | "enterprise";
  credits: number;
  preferences?: UserPreferences;
}

export interface UserPreferences {
  favoriteColors: string[];
  favoriteBrands: string[];
  styleTags: string[];
  budgetRange?: [number, number];
  occasions: string[];
  bodyType?: string;
  skinTone?: string;
}

export interface WardrobeItem {
  id: string;
  userId: string;
  imageUrl: string;
  category: string;
  subcategory?: string;
  color: string;
  colorHex: string;
  brand?: string;
  material?: string;
  styleTags: string[];
  season: string;
  purchasePrice?: number;
  wearCount: number;
  lastWorn?: string;
  isFavorite: boolean;
  aiDescription?: string;
  createdAt: string;
}

export interface Outfit {
  id: string;
  userId: string;
  name: string;
  occasion?: string;
  season?: string;
  styleScores?: StyleScores;
  isPublic: boolean;
  items: OutfitItem[];
  createdAt: string;
}

export interface OutfitItem {
  id: string;
  wardrobeItem: WardrobeItem;
  role: string;
  position: number;
}

export interface StyleScores {
  style: number;
  trend: number;
  color: number;
  occasion: number;
  overall: number;
}

export interface AIRecommendation {
  id: string;
  type: "outfit" | "product" | "style_advice";
  inputData: Record<string, unknown>;
  outputData: Record<string, unknown>;
  score?: number;
  createdAt: string;
}

export interface Product {
  id: string;
  store: string;
  name: string;
  description?: string;
  imageUrl: string;
  price: number;
  originalPrice?: number;
  discount?: number;
  rating?: number;
  reviewCount?: number;
  category: string;
  brand?: string;
  color?: string;
  productUrl: string;
}

export interface SocialPost {
  id: string;
  userId: string;
  userName: string;
  userImage?: string;
  outfit?: Outfit;
  caption: string;
  likesCount: number;
  commentsCount: number;
  userVote?: number;
  createdAt: string;
}

export interface Trend {
  id: string;
  name: string;
  type: "color" | "style" | "pattern" | "material";
  category: string;
  score: number;
  season: string;
  metadata?: Record<string, unknown>;
}

export interface ChatMessage {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: string;
}

export interface WeatherData {
  temperature: number;
  condition: string;
  humidity: number;
  windSpeed: number;
  icon: string;
}

export interface PackingList {
  id: string;
  destination: string;
  tripDuration: number;
  items: PackingItem[];
  isCompleted: boolean;
}

export interface PackingItem {
  name: string;
  quantity: number;
  category: string;
  isPacked: boolean;
}
