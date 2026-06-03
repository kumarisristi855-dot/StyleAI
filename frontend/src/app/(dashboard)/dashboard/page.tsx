"use client";

import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Shirt,
  Sparkles,
  TrendingUp,
  Star,
  ArrowRight,
  Plus,
  Clock,
  Calendar,
} from "lucide-react";

const stats = [
  { label: "Wardrobe Items", value: "24", icon: Shirt, change: "+3 this week" },
  { label: "Outfits Created", value: "12", icon: Sparkles, change: "+2 this week" },
  { label: "Style Score Avg", value: "86", icon: Star, change: "↑ 4 points" },
  { label: "Trend Score", value: "72", icon: TrendingUp, change: "↑ 8 points" },
];

const recentOutfits = [
  {
    name: "Casual Friday Look",
    occasion: "Office",
    score: 88,
    items: ["White Shirt", "Blue Jeans", "Brown Loafers"],
  },
  {
    name: "Weekend Brunch",
    occasion: "Casual",
    score: 92,
    items: ["Striped Tee", "Beige Shorts", "White Sneakers"],
  },
  {
    name: "Evening Party",
    occasion: "Party",
    score: 85,
    items: ["Black Blazer", "White T-Shirt", "Black Jeans"],
  },
];

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Dashboard</h1>
          <p className="text-sm text-muted-foreground">
            Welcome back! Here&apos;s your style overview.
          </p>
        </div>
        <Button className="gap-2">
          <Plus className="h-4 w-4" />
          New Outfit
        </Button>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
          >
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                    <stat.icon className="h-5 w-5 text-primary" />
                  </div>
                  <Badge variant="secondary" className="text-xs">
                    {stat.change}
                  </Badge>
                </div>
                <div className="mt-4">
                  <div className="text-2xl font-bold">{stat.value}</div>
                  <div className="text-sm text-muted-foreground">
                    {stat.label}
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-lg">Recent Outfits</CardTitle>
            <Button variant="ghost" size="sm" className="gap-1">
              View All <ArrowRight className="h-3 w-3" />
            </Button>
          </CardHeader>
          <CardContent className="space-y-4">
            {recentOutfits.map((outfit) => (
              <div
                key={outfit.name}
                className="group flex items-center justify-between rounded-lg border p-4 transition-all hover:bg-accent/50"
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="font-medium">{outfit.name}</span>
                    <Badge variant="secondary" className="text-xs">
                      {outfit.occasion}
                    </Badge>
                  </div>
                  <div className="flex gap-2 text-xs text-muted-foreground">
                    {outfit.items.map((item) => (
                      <span key={item}>{item}</span>
                    ))}
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="text-right">
                    <div className="text-sm font-bold text-primary">
                      {outfit.score}
                    </div>
                    <div className="text-xs text-muted-foreground">Score</div>
                  </div>
                  <Button variant="ghost" size="icon" className="opacity-0 group-hover:opacity-100">
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-lg">AI Suggestions</CardTitle>
            <Badge variant="default">AI Powered</Badge>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="rounded-lg border bg-gradient-to-br from-primary/5 to-purple-500/5 p-4">
              <div className="flex items-start gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                  <Sparkles className="h-5 w-5 text-primary" />
                </div>
                <div className="space-y-1">
                  <p className="font-medium">
                    Try pairing your blue blazer with beige chinos
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Based on your recent outfits and the current season
                  </p>
                </div>
              </div>
            </div>
            <div className="rounded-lg border bg-gradient-to-br from-blue-500/5 to-cyan-500/5 p-4">
              <div className="flex items-start gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-500/10">
                  <Calendar className="h-5 w-5 text-blue-500" />
                </div>
                <div className="space-y-1">
                  <p className="font-medium">
                    Upcoming: Summer Wedding Season
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Light linen suits and pastel colors are trending this week
                  </p>
                </div>
              </div>
            </div>
            <div className="rounded-lg border bg-gradient-to-br from-amber-500/5 to-orange-500/5 p-4">
              <div className="flex items-start gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-amber-500/10">
                  <Clock className="h-5 w-5 text-amber-500" />
                </div>
                <div className="space-y-1">
                  <p className="font-medium">5 items haven&apos;t been worn</p>
                  <p className="text-sm text-muted-foreground">
                    Your black formal shoes haven&apos;t been used in 3 months
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
