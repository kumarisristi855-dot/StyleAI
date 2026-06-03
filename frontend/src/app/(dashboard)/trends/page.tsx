"use client";

import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, Palette, Sparkles } from "lucide-react";

const trends = {
  colors: [
    { name: "Cobalt Blue", hex: "#0047ab", score: 95, category: "Color" },
    { name: "Burgundy", hex: "#800020", score: 88, category: "Color" },
    { name: "Forest Green", hex: "#228b22", score: 82, category: "Color" },
    { name: "Dusty Rose", hex: "#c08081", score: 78, category: "Color" },
    { name: "Mustard Yellow", hex: "#e1ad01", score: 74, category: "Color" },
  ],
  styles: [
    { name: "Quiet Luxury", score: 92, category: "Style" },
    { name: "Relaxed Tailoring", score: 88, category: "Style" },
    { name: "Y2K Revival", score: 85, category: "Style" },
    { name: "Sustainable Chic", score: 80, category: "Style" },
    { name: "Utility Core", score: 76, category: "Style" },
  ],
};

export default function TrendsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Fashion Trends</h1>
        <p className="text-sm text-muted-foreground">
          AI-tracked trending colors, styles, and seasonal insights
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              <Palette className="h-5 w-5 text-purple-500" />
              Trending Colors
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {trends.colors.map((color, i) => (
              <motion.div
                key={color.name}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.1 }}
                className="flex items-center gap-4 rounded-lg border p-3"
              >
                <div
                  className="h-10 w-10 rounded-lg border"
                  style={{ backgroundColor: color.hex }}
                />
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <span className="font-medium">{color.name}</span>
                    <Badge variant="secondary" className="text-xs">
                      {color.score}%
                    </Badge>
                  </div>
                  <div className="mt-1 h-2 w-full rounded-full bg-secondary">
                    <div
                      className="h-full rounded-full bg-gradient-to-r from-primary to-purple-500"
                      style={{ width: `${color.score}%` }}
                    />
                  </div>
                </div>
              </motion.div>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              <TrendingUp className="h-5 w-5 text-blue-500" />
              Trending Styles
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {trends.styles.map((style, i) => (
              <motion.div
                key={style.name}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.1 }}
                className="rounded-lg border p-4"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <span className="font-medium">{style.name}</span>
                    <p className="text-xs text-muted-foreground mt-0.5">
                      Seasonal trend • Summer 2026
                    </p>
                  </div>
                  <div className="text-right">
                    <div className="text-lg font-bold text-primary">{style.score}%</div>
                    <div className="text-xs text-muted-foreground">Trend Score</div>
                  </div>
                </div>
              </motion.div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
