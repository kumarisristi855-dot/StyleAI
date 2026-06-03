"use client";

import { motion } from "framer-motion";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Heart,
  MessageCircle,
  Share2,
  Sparkles,
  ThumbsUp,
  Eye,
  Clock,
} from "lucide-react";

const posts = [
  {
    id: 1,
    user: "Priya S.",
    avatar: "",
    outfit: "Summer Wedding Guest",
    occasion: "Wedding",
    items: ["Navy Lehenga", "Gold Jewellery", "Heeled Sandals"],
    likes: 24,
    comments: 8,
    score: 91,
    time: "2 hours ago",
  },
  {
    id: 2,
    user: "Rahul K.",
    avatar: "",
    outfit: "Creative Office",
    occasion: "Office",
    items: ["Blazer", "Graphic Tee", "Slim Jeans", "White Sneakers"],
    likes: 18,
    comments: 5,
    score: 85,
    time: "4 hours ago",
  },
  {
    id: 3,
    user: "Ananya M.",
    avatar: "",
    outfit: "Weekend Brunch",
    occasion: "Casual",
    items: ["Floral Dress", "Straw Bag", "Espadrilles"],
    likes: 32,
    comments: 12,
    score: 94,
    time: "6 hours ago",
  },
  {
    id: 4,
    user: "Arjun D.",
    avatar: "",
    outfit: "Evening Party",
    occasion: "Party",
    items: ["Black Suit", "Silk Shirt", "Oxfords", "Watch"],
    likes: 15,
    comments: 3,
    score: 88,
    time: "8 hours ago",
  },
];

export default function SocialPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Community</h1>
          <p className="text-sm text-muted-foreground">
            Share outfits, get feedback, and connect with fashion lovers
          </p>
        </div>
        <Button className="gap-2">
          <Sparkles className="h-4 w-4" />
          Share Your Outfit
        </Button>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {posts.map((post, i) => (
          <motion.div
            key={post.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
          >
            <Card>
              <CardHeader className="flex flex-row items-center gap-3 pb-3">
                <Avatar>
                  <AvatarImage src={post.avatar} />
                  <AvatarFallback className="bg-primary/10 text-primary">
                    {post.user.split(" ").map(n => n[0]).join("")}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <p className="text-sm font-medium">{post.user}</p>
                  <p className="flex items-center gap-1 text-xs text-muted-foreground">
                    <Clock className="h-3 w-3" />
                    {post.time}
                  </p>
                </div>
                <div className="text-right">
                  <div className="text-lg font-bold text-primary">{post.score}</div>
                  <div className="text-xs text-muted-foreground">Score</div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-2">
                  <h3 className="font-semibold">{post.outfit}</h3>
                  <Badge variant="secondary" className="text-xs">
                    {post.occasion}
                  </Badge>
                </div>
                <div className="flex flex-wrap gap-2">
                  {post.items.map((item) => (
                    <Badge key={item} variant="outline" className="text-xs">
                      {item}
                    </Badge>
                  ))}
                </div>
                <div className="flex items-center justify-between border-t pt-3">
                  <div className="flex items-center gap-4">
                    <Button variant="ghost" size="sm" className="gap-1.5">
                      <Heart className="h-4 w-4" />
                      {post.likes}
                    </Button>
                    <Button variant="ghost" size="sm" className="gap-1.5">
                      <MessageCircle className="h-4 w-4" />
                      {post.comments}
                    </Button>
                  </div>
                  <Button variant="ghost" size="sm" className="gap-1.5">
                    <Share2 className="h-4 w-4" />
                    Share
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
