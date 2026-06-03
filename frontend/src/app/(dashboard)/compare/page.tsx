"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { formatPrice } from "@/lib/utils";
import { Search, ShoppingBag, Star, ExternalLink, TrendingDown, Zap } from "lucide-react";

const mockProducts = [
  { id: 1, name: "Classic White Shirt", stores: [
    { name: "Myntra", price: 1299, originalPrice: 2499, discount: 48, rating: 4.3, reviews: 1245 },
    { name: "Amazon", price: 1399, originalPrice: 2599, discount: 46, rating: 4.1, reviews: 892 },
    { name: "Ajio", price: 1149, originalPrice: 1999, discount: 42, rating: 4.5, reviews: 567 },
    { name: "Flipkart", price: 1499, originalPrice: 2299, discount: 35, rating: 4.0, reviews: 234 },
  ]},
  { id: 2, name: "Blue Denim Jacket", stores: [
    { name: "Myntra", price: 2499, originalPrice: 3999, discount: 37, rating: 4.4, reviews: 890 },
    { name: "Amazon", price: 2199, originalPrice: 3499, discount: 37, rating: 4.2, reviews: 654 },
    { name: "Ajio", price: 2699, originalPrice: 4499, discount: 40, rating: 4.6, reviews: 432 },
    { name: "Flipkart", price: 1999, originalPrice: 2999, discount: 33, rating: 4.3, reviews: 321 },
  ]},
  { id: 3, name: "Black Formal Shoes", stores: [
    { name: "Myntra", price: 3999, originalPrice: 6999, discount: 43, rating: 4.5, reviews: 1567 },
    { name: "Amazon", price: 3599, originalPrice: 5499, discount: 35, rating: 4.3, reviews: 1023 },
    { name: "Ajio", price: 3799, originalPrice: 6499, discount: 42, rating: 4.4, reviews: 876 },
    { name: "Flipkart", price: 4199, originalPrice: 5999, discount: 30, rating: 4.1, reviews: 654 },
  ]},
];

export default function ComparePage() {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Shop & Compare</h1>
        <p className="text-sm text-muted-foreground">
          Compare prices, ratings, and discounts across all stores
        </p>
      </div>

      <div className="relative max-w-md">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input placeholder="Search products..." className="pl-9" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />
      </div>

      <div className="space-y-6">
        {mockProducts.map((product) => (
          <motion.div key={product.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg">{product.name}</CardTitle>
                  <Badge variant="success" className="gap-1">
                    <Zap className="h-3 w-3" />
                    Best on Ajio
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid gap-3">
                  {product.stores.map((store) => (
                    <div key={store.name} className="flex items-center justify-between rounded-lg border p-4 transition-all hover:bg-accent/50">
                      <div className="flex items-center gap-4">
                        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                          <ShoppingBag className="h-5 w-5 text-primary" />
                        </div>
                        <div>
                          <p className="font-medium">{store.name}</p>
                          <div className="flex items-center gap-2 text-xs text-muted-foreground">
                            <span className="flex items-center gap-1">
                              <Star className="h-3 w-3 fill-yellow-500 text-yellow-500" />
                              {store.rating}
                            </span>
                            <span>({store.reviews} reviews)</span>
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="flex items-center gap-2">
                          <span className="text-lg font-bold">{formatPrice(store.price)}</span>
                          <span className="text-xs text-muted-foreground line-through">
                            {formatPrice(store.originalPrice)}
                          </span>
                        </div>
                        <Badge variant="success" className="text-xs gap-1">
                          <TrendingDown className="h-3 w-3" />
                          {store.discount}% off
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
