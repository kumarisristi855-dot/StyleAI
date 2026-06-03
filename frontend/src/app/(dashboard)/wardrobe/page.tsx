"use client";

import { useState, useMemo, useCallback } from "react";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { wardrobeProducts, type WardrobeItem } from "@/lib/wardrobe-data";
import {
  Upload,
  Search,
  Shirt,
  Trash2,
  Heart,
  Clock,
  Tag,
  Plus,
  Grid3X3,
  List,
  Store,
  ChevronDown,
  SlidersHorizontal,
} from "lucide-react";

const categories = ["All", ...new Set(wardrobeProducts.map((i) => i.category))];

const storeColors: Record<string, string> = {
  "H&M": "text-red-500", "Zara": "text-black dark:text-white",
  "Nike": "text-orange-500", "Adidas": "text-black dark:text-white",
  "Myntra": "text-orange-600", "Amazon": "text-yellow-500",
  "Ajio": "text-pink-500", "Flipkart": "text-blue-500",
  "Uniqlo": "text-red-600", "Levi's": "text-blue-600",
  "Decathlon": "text-sky-500", "Titan": "text-amber-600",
  "Tanishq": "text-rose-600", "Woodland": "text-green-700",
  "Mango": "text-rose-500", "Bershka": "text-purple-500",
  "Pull & Bear": "text-yellow-600", "Max": "text-blue-500",
  "Westside": "text-pink-600", "": "text-muted-foreground",
};

const ICONS: Record<string, string> = {
  Tops: "👔", Bottoms: "👖", Footwear: "👟", Outerwear: "🧥",
  Dresses: "👗", "Ethnic Wear": "🥻", Activewear: "🏃", Accessories: "⌚",
};

function StoreBadge({ store }: { store: string }) {
  return (
    <Badge variant="outline" className={`text-xs gap-1 ${storeColors[store] || "text-muted-foreground"}`}>
      <Store className="h-3 w-3" />
      {store}
    </Badge>
  );
}

function ProductImage({
  item,
  onError,
}: {
  item: WardrobeItem;
  onError: (id: string) => void;
}) {
  const [failed, setFailed] = useState(false);

  if (failed) {
    return (
      <div
        className="aspect-square w-full flex flex-col items-center justify-center"
        style={{ background: `linear-gradient(135deg, ${item.colorHex}15, ${item.colorHex}30)` }}
      >
        <span className="text-5xl mb-2">{ICONS[item.category] || "👕"}</span>
        <span className="text-xs text-muted-foreground/60">{item.brand}</span>
      </div>
    );
  }

  return (
    <div className="relative aspect-square w-full overflow-hidden bg-muted/20">
      <img
        src={item.imageUrl}
        alt={item.name}
        loading="lazy"
        className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
        onError={() => { setFailed(true); onError(item.id); }}
      />
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity bg-gradient-to-t from-black/40 to-transparent"
      />
    </div>
  );
}

function CategoryIcon({ category, className }: { category: string; className?: string }) {
  return <span className={className}>{ICONS[category] || "👕"}</span>;
}

const sortOptions = [
  { label: "Newest", fn: (a: WardrobeItem, b: WardrobeItem) => parseInt(b.id.replace("item-", "")) - parseInt(a.id.replace("item-", "")) },
  { label: "Most Worn", fn: (a: WardrobeItem, b: WardrobeItem) => b.wearCount - a.wearCount },
  { label: "Least Worn", fn: (a: WardrobeItem, b: WardrobeItem) => a.wearCount - b.wearCount },
  { label: "Price: Low", fn: (a: WardrobeItem, b: WardrobeItem) => a.priceNum - b.priceNum },
  { label: "Price: High", fn: (a: WardrobeItem, b: WardrobeItem) => b.priceNum - a.priceNum },
  { label: "A-Z", fn: (a: WardrobeItem, b: WardrobeItem) => a.name.localeCompare(b.name) },
];

export default function WardrobePage() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [searchQuery, setSearchQuery] = useState("");
  const [sortIndex, setSortIndex] = useState(0);
  const [showFilters, setShowFilters] = useState(false);
  const [failedImages, setFailedImages] = useState<Set<string>>(new Set());

  const handleImageError = useCallback((id: string) => {
    setFailedImages((prev) => new Set(prev).add(id));
  }, []);

  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = { All: wardrobeProducts.length };
    wardrobeProducts.forEach((item) => {
      counts[item.category] = (counts[item.category] || 0) + 1;
    });
    return counts;
  }, []);

  const filteredItems = useMemo(() => {
    let items = wardrobeProducts;

    if (selectedCategory !== "All") {
      items = items.filter((i) => i.category === selectedCategory);
    }

    const query = searchQuery.toLowerCase().trim();
    if (query) {
      items = items.filter(
        (i) =>
          i.name.toLowerCase().includes(query) ||
          i.brand.toLowerCase().includes(query) ||
          i.store.toLowerCase().includes(query) ||
          i.color.toLowerCase().includes(query) ||
          i.category.toLowerCase().includes(query) ||
          i.material?.toLowerCase().includes(query),
      );
    }

    return [...items].sort(sortOptions[sortIndex].fn);
  }, [selectedCategory, searchQuery, sortIndex]);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">My Wardrobe</h1>
          <p className="text-sm text-muted-foreground">
            {filteredItems.length.toLocaleString()} of {wardrobeProducts.length.toLocaleString()} items
            {failedImages.size > 0 && (
              <span className="ml-2 text-amber-500">({failedImages.size} images loading)</span>
            )}
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" onClick={() => setViewMode("grid")} className={viewMode === "grid" ? "bg-accent" : ""}>
            <Grid3X3 className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="icon" onClick={() => setViewMode("list")} className={viewMode === "list" ? "bg-accent" : ""}>
            <List className="h-4 w-4" />
          </Button>
          <Dialog>
            <DialogTrigger asChild>
              <Button className="gap-2">
                <Plus className="h-4 w-4" />
                Add Item
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add to Wardrobe</DialogTitle>
              </DialogHeader>
              <div className="flex items-center justify-center rounded-lg border-2 border-dashed p-12">
                <div className="text-center">
                  <Upload className="mx-auto h-8 w-8 text-muted-foreground" />
                  <p className="mt-2 text-sm text-muted-foreground">Drop an image or click to upload</p>
                  <p className="text-xs text-muted-foreground mt-1">AI will auto-detect brand, color & category</p>
                  <Button variant="outline" size="sm" className="mt-4">Upload Photo</Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <div className="flex flex-col gap-4">
        <div className="flex items-center gap-3">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search by name, brand, store, color..."
              className="pl-9"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <Button variant="outline" size="icon" onClick={() => setShowFilters(!showFilters)} className={showFilters ? "bg-accent" : ""}>
            <SlidersHorizontal className="h-4 w-4" />
          </Button>
          <div className="relative">
            <select
              value={sortIndex}
              onChange={(e) => setSortIndex(Number(e.target.value))}
              className="h-9 rounded-lg border bg-background px-3 pr-8 text-sm appearance-none cursor-pointer"
            >
              {sortOptions.map((opt, i) => (
                <option key={opt.label} value={i}>{opt.label}</option>
              ))}
            </select>
            <ChevronDown className="absolute right-2 top-1/2 h-4 w-4 -translate-y-1/2 pointer-events-none text-muted-foreground" />
          </div>
        </div>

        <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-thin">
          {categories.map((cat) => (
            <Button
              key={cat}
              variant={selectedCategory === cat ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedCategory(cat)}
              className="whitespace-nowrap shrink-0"
            >
              {cat === "All" ? null : <CategoryIcon category={cat} className="mr-1" />}
              {cat}
              <span className="ml-1.5 text-xs opacity-70">({categoryCounts[cat] || 0})</span>
            </Button>
          ))}
        </div>
      </div>

      {showFilters && (
        <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} className="overflow-hidden">
          <div className="rounded-lg border p-4 grid grid-cols-2 sm:grid-cols-4 gap-4">
            {[
              { label: "Favorite", options: ["All", "Favorites Only"] },
              { label: "Price Range", options: ["All", "Under ₹999", "₹1K - ₹3K", "₹3K - ₹5K", "Above ₹5K"] },
              { label: "Season", options: ["All", ...seasons] },
              { label: "Size", options: ["All", "XS", "S", "M", "L", "XL", "28", "30", "32", "34", "9", "10"] },
            ].map((group) => (
              <div key={group.label}>
                <p className="text-xs font-medium text-muted-foreground mb-2">{group.label}</p>
                <div className="flex flex-wrap gap-1.5">
                  {group.options.map((opt) => (
                    <Badge key={opt} variant="outline" className="text-xs cursor-pointer hover:bg-accent">{opt}</Badge>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      )}

      {filteredItems.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20">
          <Shirt className="h-12 w-12 text-muted-foreground/50" />
          <h3 className="mt-4 text-lg font-medium">No items found</h3>
          <p className="text-sm text-muted-foreground">Try adjusting your search or filters</p>
        </div>
      ) : viewMode === "grid" ? (
        <div className="grid gap-4 grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
          {filteredItems.map((item, i) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: (i % 50) * 0.005 }}
            >
              <Card className="group overflow-hidden hover:shadow-lg transition-all duration-300">
                <ProductImage item={item} onError={handleImageError} />
                <CardContent className="p-3 space-y-2">
                  <div>
                    <h3 className="font-medium text-sm leading-tight line-clamp-1">{item.name}</h3>
                    <p className="text-xs text-muted-foreground font-medium">{item.brand}</p>
                  </div>
                  <div className="flex flex-wrap gap-1">
                    <Badge variant="secondary" className="text-[10px] px-1.5 py-0">{item.category}</Badge>
                    <Badge variant="outline" className="text-[10px] gap-1 px-1.5 py-0">
                      <Tag className="h-2.5 w-2.5" />{item.color}
                    </Badge>
                    <StoreBadge store={item.store} />
                  </div>
                  <div className="flex items-center justify-between text-xs text-muted-foreground pt-1 border-t">
                    <span className="font-semibold text-foreground">{item.price}</span>
                    <span className="flex items-center gap-1"><Clock className="h-3 w-3" />{item.wearCount}</span>
                    <Button variant="ghost" size="icon" className="h-6 w-6 -mr-1">
                      <Heart className={`h-3.5 w-3.5 ${item.isFavorite ? "fill-red-500 text-red-500" : ""}`} />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      ) : (
        <div className="space-y-1.5">
          {filteredItems.map((item, i) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: (i % 50) * 0.005 }}
              className="flex items-center gap-3 rounded-lg border p-2.5 transition-all hover:bg-accent/50"
            >
              <div className="h-14 w-14 rounded-lg overflow-hidden shrink-0 bg-muted/30">
                <img
                  src={item.imageUrl}
                  alt={item.name}
                  className="h-full w-full object-cover"
                  loading="lazy"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.style.display = "none";
                    const parent = target.parentElement;
                    if (parent) {
                      parent.style.background = `linear-gradient(135deg, ${item.colorHex}15, ${item.colorHex}30)`;
                      parent.innerHTML = `<span style="font-size:1.5rem">${ICONS[item.category] || "👕"}</span>`;
                    }
                  }}
                />
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-medium text-sm truncate">{item.name}</p>
                <p className="text-xs text-muted-foreground truncate">
                  {item.brand} · {item.category} · {item.color}{item.material ? ` · ${item.material}` : ""}
                </p>
                <div className="flex gap-2 mt-0.5">
                  <StoreBadge store={item.store} />
                  <Badge variant="outline" className="text-[10px]">{item.price}</Badge>
                  {item.size && <Badge variant="outline" className="text-[10px]">Size {item.size}</Badge>}
                </div>
              </div>
              <div className="flex items-center gap-2 shrink-0">
                <Badge variant="secondary" className="text-xs">{item.wearCount} wears</Badge>
                <Button variant="ghost" size="icon" className="h-8 w-8">
                  <Heart className={`h-4 w-4 ${item.isFavorite ? "fill-red-500 text-red-500" : ""}`} />
                </Button>
                <Button variant="ghost" size="icon" className="h-8 w-8">
                  <Trash2 className="h-4 w-4 text-muted-foreground hover:text-destructive" />
                </Button>
              </div>
            </motion.div>
          ))}
        </div>
      )}

      <div className="text-center text-xs text-muted-foreground pt-4 border-t">
        Showing {filteredItems.length.toLocaleString()} of {wardrobeProducts.length.toLocaleString()} items ·
        {new Set(wardrobeProducts.map((i) => i.brand)).size} brands ·
        {new Set(wardrobeProducts.map((i) => i.store)).size} stores
      </div>
    </div>
  );
}

const seasons = ["Summer", "Winter", "All-Season", "Autumn", "Spring", "Party", "Wedding", "Festival"];
