"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Sparkles,
  Shirt,
  Wand2,
  Star,
  TrendingUp,
  Palette,
  Calendar,
  Share2,
  Plus,
  Trash2,
  ArrowRight,
} from "lucide-react";

const outfitIdeas = [
  {
    name: "Summer Wedding Guest",
    occasion: "Wedding",
    items: ["Navy Suit", "White Shirt", "Pocket Square", "Brown Oxfords"],
    scores: { style: 92, trend: 88, color: 95, occasion: 90, overall: 91 },
  },
  {
    name: "Creative Office",
    occasion: "Office",
    items: ["Blazer", "Graphic Tee", "Slim Jeans", "White Sneakers"],
    scores: { style: 85, trend: 92, color: 78, occasion: 82, overall: 84 },
  },
  {
    name: "Weekend Street Style",
    occasion: "Casual",
    items: ["Oversized Hoodie", "Cargo Pants", "Chunky Sneakers", "Cap"],
    scores: { style: 88, trend: 95, color: 82, occasion: 80, overall: 86 },
  },
];

export default function OutfitsPage() {
  const [selectedOutfit, setSelectedOutfit] = useState(0);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Outfit Builder</h1>
          <p className="text-sm text-muted-foreground">
            Create stunning outfits with AI assistance
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" className="gap-2">
            <Wand2 className="h-4 w-4" />
            AI Generate
          </Button>
          <Button className="gap-2">
            <Plus className="h-4 w-4" />
            New Outfit
          </Button>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">AI-Generated Outfits</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {outfitIdeas.map((outfit, i) => (
                <motion.div
                  key={outfit.name}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className={`cursor-pointer rounded-lg border p-4 transition-all ${
                    selectedOutfit === i
                      ? "border-primary bg-primary/5"
                      : "hover:bg-accent/50"
                  }`}
                  onClick={() => setSelectedOutfit(i)}
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="font-medium">{outfit.name}</h3>
                        <Badge variant="secondary" className="text-xs">
                          {outfit.occasion}
                        </Badge>
                      </div>
                      <div className="mt-2 flex flex-wrap gap-2">
                        {outfit.items.map((item) => (
                          <Badge
                            key={item}
                            variant="outline"
                            className="text-xs"
                          >
                            {item}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold text-primary">
                        {outfit.scores.overall}
                      </div>
                      <div className="text-xs text-muted-foreground">
                        Overall Score
                      </div>
                    </div>
                  </div>
                  <div className="mt-4 grid grid-cols-4 gap-2">
                    {Object.entries(outfit.scores)
                      .filter(([k]) => k !== "overall")
                      .map(([key, val]) => (
                        <div key={key} className="text-center">
                          <div className="text-xs capitalize text-muted-foreground">
                            {key.replace(/([A-Z])/g, " $1").trim()}
                          </div>
                          <div className="text-sm font-semibold">{val}</div>
                        </div>
                      ))}
                  </div>
                </motion.div>
              ))}
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="text-lg">Your Wardrobe</CardTitle>
              <Button variant="ghost" size="sm">
                View All
              </Button>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-4 gap-3 sm:grid-cols-6 md:grid-cols-8">
                {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
                  <div
                    key={i}
                    className="group relative aspect-square cursor-pointer rounded-lg border bg-muted/30 transition-all hover:border-primary hover:bg-primary/5"
                  >
                    <div className="flex h-full items-center justify-center">
                      <Shirt className="h-6 w-6 text-muted-foreground/50" />
                    </div>
                    <div className="absolute inset-0 flex items-center justify-center rounded-lg bg-primary/80 opacity-0 transition-opacity group-hover:opacity-100">
                      <Plus className="h-5 w-5 text-white" />
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Score Breakdown</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {[
                { label: "Style Score", value: outfitIdeas[selectedOutfit].scores.style, icon: Star, color: "text-yellow-500" },
                { label: "Trend Score", value: outfitIdeas[selectedOutfit].scores.trend, icon: TrendingUp, color: "text-blue-500" },
                { label: "Color Score", value: outfitIdeas[selectedOutfit].scores.color, icon: Palette, color: "text-purple-500" },
                { label: "Occasion Match", value: outfitIdeas[selectedOutfit].scores.occasion, icon: Calendar, color: "text-green-500" },
              ].map((item) => (
                <div key={item.label} className="space-y-1.5">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <item.icon className={`h-4 w-4 ${item.color}`} />
                      <span className="text-sm">{item.label}</span>
                    </div>
                    <span className="text-sm font-bold">{item.value}%</span>
                  </div>
                  <Progress value={item.value} className="h-2" />
                </div>
              ))}
              <div className="mt-4 rounded-lg bg-primary/5 p-3">
                <div className="flex items-center gap-2 text-sm">
                  <Sparkles className="h-4 w-4 text-primary" />
                  <span className="font-medium">AI Suggestion</span>
                </div>
                <p className="mt-1 text-xs text-muted-foreground">
                  Try swapping the graphic tee for a plain white one to increase
                  the occasion match score by 8 points.
                </p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4 space-y-2">
              <Button className="w-full gap-2">
                <Sparkles className="h-4 w-4" />
                Save Outfit
              </Button>
              <Button variant="outline" className="w-full gap-2">
                <Share2 className="h-4 w-4" />
                Share with Friends
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
