"use client";

import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useStylistStore } from "@/stores";
import { useAuth } from "@/lib/auth-context";
import {
  MessageCircle,
  Send,
  Sparkles,
  Shirt,
  Camera,
  TrendingUp,
  Palette,
  Sun,
  ShoppingBag,
  type LucideIcon,
} from "lucide-react";

interface Suggestion {
  icon: LucideIcon;
  label: string;
  prompt: string;
}

const suggestions: Suggestion[] = [
  { icon: Shirt, label: "Style my outfit", prompt: "I have a blue blazer, white shirt, and brown shoes. What outfit should I create?" },
  { icon: Camera, label: "Analyze this", prompt: "I just uploaded a photo of a dress. Can you analyze it and tell me how to style it?" },
  { icon: TrendingUp, label: "Trending now", prompt: "What are the latest fashion trends this season?" },
  { icon: Palette, label: "Color advice", prompt: "What colors go well together for a summer party outfit?" },
  { icon: Sun, label: "Weather style", prompt: "It's hot and sunny today. What should I wear?" },
  { icon: ShoppingBag, label: "Shopping help", prompt: "I need help finding a good combination for a job interview under ₹5000." },
];

export default function StylistPage() {
const isClerkAvailable =
  typeof process !== "undefined" &&
  process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY?.startsWith("pk_");

const { user: authUser } = useAuth();
  const { messages, isTyping, addMessage, setTyping } = useStylistStore();
  const [input, setInput] = useState("");
  const scrollRef = useRef<HTMLDivElement>(null);
  const [showSuggestions, setShowSuggestions] = useState(true);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = async (text?: string) => {
    const message = text || input;
    if (!message.trim() || isTyping) return;

    addMessage({ id: Date.now().toString(), role: "user", content: message, timestamp: new Date().toISOString() });
    setInput("");
    setShowSuggestions(false);
    setTyping(true);

    setTimeout(() => {
      const responses: Record<string, string> = {
        "i have a blue blazer, white shirt, and brown shoes. what outfit should i create?": 
          "Great combination! Here's a complete outfit:\n\n**Smart Casual Look**\n- Blue Blazer (layered)\n- White Shirt (classic)\n- Brown Leather Loafers\n- Beige Chinos or Dark Jeans\n- Optional: Navy patterned tie\n\n**Style Score: 92/100**\nThis is a timeless combination. The blue and brown tones complement each other perfectly. Add a pocket square for extra flair!",
        "what are the latest fashion trends this season?":
          "**This Season's Top Trends:**\n\n1. **Relaxed Tailoring** — Oversized blazers and wide-leg trousers\n2. **Quiet Luxury** — Minimal branding, high-quality fabrics\n3. **Bold Colors** — Cobalt blue, deep burgundy, forest green\n4. **Sustainable Fashion** — Upcycled and eco-friendly materials\n5. **Statement Accessories** — Chunky jewelry, structured bags\n\n**Color Palette:** Earth tones mixed with jewel tones.",
        "what colors go well together for a summer party outfit?":
          "**Summer Party Color Combinations:**\n\n1. **White + Navy + Gold** — Classic, elegant\n2. **Coral + Cream + Tan** — Warm, inviting\n3. **Olive + Beige + White** — Earthy, sophisticated\n4. **Pastel Pink + Light Grey + White** — Soft, trendy\n\n**Pro tip:** Use the 60-30-10 rule: 60% dominant color, 30% secondary, 10% accent.",
      };

      const key = message.toLowerCase().trim();
      const response = responses[key] || generateDynamicResponse(message);
      
      addMessage({ id: (Date.now() + 1).toString(), role: "assistant", content: response, timestamp: new Date().toISOString() });
      setTyping(false);
    }, 1500);
  };

  const generateDynamicResponse = (msg: string) => {
    if (msg.toLowerCase().includes("upload") || msg.toLowerCase().includes("photo") || msg.toLowerCase().includes("dress")) {
      return "I'd love to help style that! Please upload the photo using the upload button above, and I'll analyze the item and suggest complete outfits with accessories, footwear, and styling tips.";
    }
    if (msg.toLowerCase().includes("interview") || msg.toLowerCase().includes("job")) {
      return "**Interview Outfit Guide:**\n\n**For Men:**\n- Navy/Charcoal suit\n- White/light blue shirt\n- Simple tie (optional for modern)\n- Polished oxford shoes\n- Minimal watch\n\n**For Women:**\n- Tailored blazer + trousers/sheath dress\n- Closed-toe heels (2-3 inch)\n- Minimal jewelry\n- Structured bag\n\n**Key:** Fit matters more than brand. Get everything tailored.";
    }
    if (msg.toLowerCase().includes("5000") || msg.toLowerCase().includes("budget")) {
      return "**Budget-Friendly Looks Under ₹5,000:**\n\n**Option 1: Smart Casual**\n- White shirt: ₹899 (H&M)\n- Chinos: ₹1,299 (Uniqlo)\n- Loafers: ₹1,999 (Clarks sale)\n- Total: ~₹4,200\n\n**Option 2: Street Style**\n- Graphic tee: ₹599\n- Jeans: ₹1,499\n- Sneakers: ₹1,999\n- Total: ~₹4,100\n\nWould you like me to find specific links for these?";
    }
    return "Great question! Based on your style profile, I'd recommend trying a monochromatic look with neutral tones. Pair your existing pieces in unexpected ways — layer a blazer over a casual tee, or mix formal trousers with sneakers. Want me to create a specific outfit combination from your wardrobe?";
  };

  return (
    <div className="flex h-[calc(100vh-8rem)] gap-6">
      <div className="flex flex-1 flex-col rounded-xl border bg-card">
        <div className="flex items-center gap-3 border-b px-6 py-4">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-pink-500 to-purple-500">
            <Sparkles className="h-5 w-5 text-white" />
          </div>
          <div>
            <h2 className="font-semibold">AI Stylist</h2>
            <p className="flex items-center gap-1.5 text-xs text-muted-foreground">
              <span className="h-2 w-2 rounded-full bg-green-500" />
              Online — Ready to help
            </p>
          </div>
        </div>

        <ScrollArea ref={scrollRef} className="flex-1 p-6">
          {messages.length === 0 ? (
            <div className="flex h-full flex-col items-center justify-center text-center">
              <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-pink-500 to-purple-500 p-4">
                <MessageCircle className="h-8 w-8 text-white" />
              </div>
              <h3 className="mt-4 text-lg font-semibold">How can I help you today?</h3>
              <p className="mt-1 text-sm text-muted-foreground max-w-md">
                Ask me anything about fashion — outfit suggestions, style advice, color matching, or shopping tips
              </p>
              <div className="mt-8 grid grid-cols-2 gap-2 max-w-lg">
                {suggestions.slice(0, 4).map((s) => (
                  <button
                    key={s.label}
                    onClick={() => handleSend(s.prompt)}
                    className="flex items-center gap-2 rounded-lg border p-3 text-left text-sm transition-all hover:bg-accent hover:border-primary/50"
                  >
                    <s.icon className="h-4 w-4 shrink-0 text-primary" />
                    <span>{s.label}</span>
                  </button>
                ))}
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              {messages.map((msg) => (
                <motion.div
                  key={msg.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex gap-3 ${msg.role === "user" ? "justify-end" : ""}`}
                >
                  {msg.role === "assistant" && (
                    <Avatar className="h-8 w-8">
                      <AvatarFallback className="bg-gradient-to-br from-pink-500 to-purple-500 text-white text-xs">
                        AI
                      </AvatarFallback>
                    </Avatar>
                  )}
                  <div
                    className={`max-w-[80%] rounded-2xl px-4 py-3 ${
                      msg.role === "user"
                        ? "bg-primary text-primary-foreground"
                        : "bg-muted"
                    }`}
                  >
                    <p className="text-sm whitespace-pre-wrap">{msg.content}</p>
                  </div>
                  {msg.role === "user" && (
                    <Avatar className="h-8 w-8">
                      <AvatarImage src="" />
                      <AvatarFallback>{authUser?.name?.[0] || "U"}</AvatarFallback>
                    </Avatar>
                  )}
                </motion.div>
              ))}
              {isTyping && (
                <div className="flex gap-3">
                  <Avatar className="h-8 w-8">
                    <AvatarFallback className="bg-gradient-to-br from-pink-500 to-purple-500 text-white text-xs">
                      AI
                    </AvatarFallback>
                  </Avatar>
                  <div className="rounded-2xl bg-muted px-4 py-3">
                    <div className="flex gap-1">
                      <span className="h-2 w-2 animate-bounce rounded-full bg-foreground/40" style={{ animationDelay: "0ms" }} />
                      <span className="h-2 w-2 animate-bounce rounded-full bg-foreground/40" style={{ animationDelay: "150ms" }} />
                      <span className="h-2 w-2 animate-bounce rounded-full bg-foreground/40" style={{ animationDelay: "300ms" }} />
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}
        </ScrollArea>

        <div className="border-t p-4">
          {messages.length > 0 && showSuggestions && (
            <div className="mb-3 flex gap-2 overflow-x-auto pb-2">
              {suggestions.slice(0, 3).map((s) => (
                <button
                  key={s.label}
                  onClick={() => handleSend(s.prompt)}
                  className="flex shrink-0 items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs transition-all hover:bg-accent"
                >
                  <s.icon className="h-3 w-3" />
                  {s.label}
                </button>
              ))}
            </div>
          )}
          <form
            onSubmit={(e) => { e.preventDefault(); handleSend(); }}
            className="flex gap-2"
          >
            <Input
              placeholder="Ask your AI stylist anything..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="flex-1"
            />
            <Button type="submit" size="icon" disabled={!input.trim() || isTyping}>
              <Send className="h-4 w-4" />
            </Button>
          </form>
        </div>
      </div>

      <div className="hidden w-80 shrink-0 lg:block">
        <Card>
          <CardHeader>
            <CardTitle className="text-sm">Style Profile</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <p className="text-xs text-muted-foreground">Preferred Style</p>
              <div className="flex flex-wrap gap-1.5">
                {["Minimalist", "Smart Casual", "Classic"].map((s) => (
                  <Badge key={s} variant="secondary" className="text-xs">
                    {s}
                  </Badge>
                ))}
              </div>
            </div>
            <div className="space-y-2">
              <p className="text-xs text-muted-foreground">Favorite Colors</p>
              <div className="flex gap-2">
                {["#000000", "#ffffff", "#1a365d", "#8b4513"].map((c) => (
                  <div
                    key={c}
                    className="h-6 w-6 rounded-full border"
                    style={{ backgroundColor: c }}
                  />
                ))}
              </div>
            </div>
            <div className="space-y-2">
              <p className="text-xs text-muted-foreground">Budget Range</p>
              <p className="text-sm font-medium">₹1,000 - ₹5,000 per item</p>
            </div>
            <div className="space-y-2">
              <p className="text-xs text-muted-foreground">Occasions</p>
              <div className="flex flex-wrap gap-1.5">
                {["Office", "Casual", "Party"].map((o) => (
                  <Badge key={o} variant="outline" className="text-xs">
                    {o}
                  </Badge>
                ))}
              </div>
            </div>
            <Button variant="outline" size="sm" className="w-full">
              Update Profile
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
