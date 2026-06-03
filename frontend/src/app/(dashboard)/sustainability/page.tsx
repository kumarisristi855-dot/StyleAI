"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Leaf, Recycle, Sparkles, Shirt, TrendingUp } from "lucide-react";

export default function SustainabilityPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Sustainable Fashion</h1>
        <p className="text-sm text-muted-foreground">Maximize your existing wardrobe before buying new</p>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              <Leaf className="h-5 w-5 text-green-500" />
              Outfit from Your Wardrobe
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="rounded-lg bg-green-500/5 border border-green-500/20 p-4">
              <div className="flex items-start gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-green-500/10">
                  <Recycle className="h-5 w-5 text-green-500" />
                </div>
                <div>
                  <p className="font-medium">You already own everything you need</p>
                  <p className="text-sm text-muted-foreground mt-1">
                    Based on your wardrobe, here are 3 outfits you can create without buying anything new.
                  </p>
                </div>
              </div>
            </div>

            {[
              { name: "Office Ready", items: ["Blue Blazer", "White Shirt", "Navy Trousers", "Brown Shoes"], saved: "₹3,500" },
              { name: "Casual Weekend", items: ["Striped Tee", "Beige Shorts", "White Sneakers"], saved: "₹2,200" },
              { name: "Evening Out", items: ["Black Shirt", "Dark Jeans", "Leather Jacket"], saved: "₹5,800" },
            ].map((outfit) => (
              <div key={outfit.name} className="flex items-center justify-between rounded-lg border p-3">
                <div>
                  <p className="font-medium">{outfit.name}</p>
                  <div className="flex gap-2 mt-1">
                    {outfit.items.map((item) => (
                      <Badge key={item} variant="outline" className="text-xs">{item}</Badge>
                    ))}
                  </div>
                </div>
                <div className="text-right">
                  <Badge variant="success" className="text-xs">Saved {outfit.saved}</Badge>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Impact Stats</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {[
              { label: "Outfits Reused", value: "18", desc: "This month" },
              { label: "Money Saved", value: "₹12,400", desc: "Total this year" },
              { label: "CO₂ Reduced", value: "24 kg", desc: "By not buying new" },
            ].map((stat) => (
              <div key={stat.label} className="rounded-lg border p-3 text-center">
                <div className="text-xl font-bold text-green-500">{stat.value}</div>
                <div className="text-sm font-medium">{stat.label}</div>
                <div className="text-xs text-muted-foreground">{stat.desc}</div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
