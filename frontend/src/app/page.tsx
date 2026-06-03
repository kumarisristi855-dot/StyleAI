"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import {
  Sparkles,
  Shirt,
  Camera,
  MessageCircle,
  ShoppingBag,
  Palette,
  TrendingUp,
  Sun,
  Luggage,
  Leaf,
  Users,
  Star,
  ArrowRight,
  Menu,
} from "lucide-react";

const features = [
  {
    icon: Camera,
    title: "AI Outfit Builder",
    description: "Upload your photos and get AI-powered complete outfit suggestions with styling rationale.",
    color: "from-pink-500 to-rose-500",
  },
  {
    icon: MessageCircle,
    title: "AI Personal Stylist",
    description: "Chat with an AI stylist that learns your preferences and gives personalized fashion advice.",
    color: "from-purple-500 to-indigo-500",
  },
  {
    icon: Shirt,
    title: "Virtual Try-On",
    description: "See how outfits look on you with AI-generated previews and before/after comparisons.",
    color: "from-blue-500 to-cyan-500",
  },
  {
    icon: ShoppingBag,
    title: "Smart Shopping Copilot",
    description: "Analyze screenshots from any store. Know if it matches your wardrobe before buying.",
    color: "from-emerald-500 to-teal-500",
  },
  {
    icon: Palette,
    title: "Color Harmony Analyzer",
    description: "Get your color compatibility score and suggestions for perfect fashion balance.",
    color: "from-orange-500 to-yellow-500",
  },
  {
    icon: Star,
    title: "Outfit Scoring",
    description: "AI scores your outfits on style, trend, color harmony, and occasion match.",
    color: "from-violet-500 to-purple-500",
  },
  {
    icon: Sun,
    title: "Weather-Based Styling",
    description: "Real-time weather-aware outfit recommendations for any condition.",
    color: "from-amber-500 to-orange-500",
  },
  {
    icon: TrendingUp,
    title: "Trend Engine",
    description: "Stay ahead with AI-tracked trending colors, styles, and seasonal fashion insights.",
    color: "from-rose-500 to-pink-500",
  },
  {
    icon: Users,
    title: "Friend Voting",
    description: "Share outfits, get votes and feedback from your community.",
    color: "from-sky-500 to-blue-500",
  },
  {
    icon: Luggage,
    title: "Packing Assistant",
    description: "AI generates packing lists based on destination, duration, and weather.",
    color: "from-teal-500 to-emerald-500",
  },
  {
    icon: Leaf,
    title: "Sustainable Mode",
    description: "Maximize your existing wardrobe before suggesting new purchases.",
    color: "from-green-500 to-emerald-500",
  },
  {
    icon: ShoppingBag,
    title: "Multi-Store Compare",
    description: "Compare prices, ratings, and discounts across Myntra, Amazon, Ajio & more.",
    color: "from-red-500 to-rose-500",
  },
];

const plans = [
  {
    name: "Free",
    price: "₹0",
    description: "Get started with basic AI fashion assistance",
    features: [
      "10 wardrobe items",
      "5 AI outfit suggestions",
      "Basic style quiz",
      "Community access",
    ],
    cta: "Get Started",
    popular: false,
  },
  {
    name: "Pro",
    price: "₹499",
    period: "/month",
    description: "Unlock the full StyleAI experience",
    features: [
      "Unlimited wardrobe items",
      "Unlimited AI outfits",
      "AI Stylist chat",
      "Virtual try-on (50/mo)",
      "Shopping copilot",
      "Color harmony analysis",
      "Weather-based styling",
      "Priority support",
    ],
    cta: "Start Free Trial",
    popular: true,
  },
  {
    name: "Enterprise",
    price: "Custom",
    description: "For fashion brands and power users",
    features: [
      "Everything in Pro",
      "Unlimited everything",
      "Custom AI training",
      "API access",
      "White-label options",
      "Dedicated account manager",
      "Custom integrations",
    ],
    cta: "Contact Sales",
    popular: false,
  },
];

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-background">
      <header className="fixed top-0 z-50 w-full border-b bg-background/80 backdrop-blur-xl">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <Link href="/" className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
              <Sparkles className="h-4 w-4 text-white" />
            </div>
            <span className="text-xl font-bold">StyleAI</span>
          </Link>
          <nav className="hidden items-center gap-8 md:flex">
            <Link href="#features" className="text-sm text-muted-foreground transition-colors hover:text-foreground">
              Features
            </Link>
            <Link href="#pricing" className="text-sm text-muted-foreground transition-colors hover:text-foreground">
              Pricing
            </Link>
          </nav>
          <div className="flex items-center gap-4">
            <Link href="/sign-in">
              <Button variant="ghost" size="sm">
                Sign In
              </Button>
            </Link>
            <Link href="/sign-up">
              <Button size="sm">Get Started</Button>
            </Link>
            <Button variant="ghost" size="icon" className="md:hidden">
              <Menu className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </header>

      <section className="relative pt-32 pb-20 sm:pt-40 sm:pb-28">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 right-0 h-[500px] w-[500px] rounded-full bg-primary/10 blur-3xl" />
          <div className="absolute -bottom-40 left-0 h-[400px] w-[400px] rounded-full bg-purple-500/10 blur-3xl" />
        </div>
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mx-auto max-w-3xl text-center"
          >
            <div className="mb-6 inline-flex items-center rounded-full border bg-muted/50 px-4 py-1.5 text-sm">
              <Sparkles className="mr-2 h-3.5 w-3.5 text-primary" />
              AI-Powered Fashion Styling
            </div>
            <h1 className="text-4xl font-bold tracking-tight sm:text-6xl lg:text-7xl">
              Your Personal
              <span className="bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 bg-clip-text text-transparent">
                {" "}AI Stylist
              </span>
            </h1>
            <p className="mt-6 text-lg text-muted-foreground sm:text-xl">
              Upload photos, create perfect outfits, get AI recommendations, and
              elevate your fashion game. StyleAI is your intelligent fashion
              companion.
            </p>
            <div className="mt-10 flex items-center justify-center gap-4">
              <Link href="/sign-up">
                <Button size="xl" className="group">
                  Start Styling Free
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Button>
              </Link>
              <Link href="#features">
                <Button variant="outline" size="xl">
                  See Features
                </Button>
              </Link>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="mt-20 grid grid-cols-2 gap-4 sm:grid-cols-4"
          >
            {[
              { label: "AI Models", value: "5+" },
              { label: "Items Detected", value: "10K+" },
              { label: "Users", value: "5K+" },
              { label: "Outfits Created", value: "50K+" },
            ].map((stat) => (
              <div
                key={stat.label}
                className="rounded-2xl border bg-card/50 p-6 text-center backdrop-blur-sm"
              >
                <div className="text-2xl font-bold sm:text-3xl">
                  {stat.value}
                </div>
                <div className="mt-1 text-sm text-muted-foreground">
                  {stat.label}
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      <section id="features" className="border-t py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="mb-16 text-center"
          >
            <h2 className="text-3xl font-bold sm:text-4xl">
              Everything You Need to{" "}
              <span className="bg-gradient-to-r from-pink-500 to-purple-500 bg-clip-text text-transparent">
                Elevate Your Style
              </span>
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              12 powerful AI features to transform how you dress
            </p>
          </motion.div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {features.map((feature, i) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                className="group rounded-2xl border bg-card p-6 transition-all hover:shadow-lg hover:-translate-y-1"
              >
                <div
                  className={`mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br ${feature.color}`}
                >
                  <feature.icon className="h-6 w-6 text-white" />
                </div>
                <h3 className="mb-2 font-semibold">{feature.title}</h3>
                <p className="text-sm text-muted-foreground">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section id="pricing" className="border-t py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="mb-16 text-center"
          >
            <h2 className="text-3xl font-bold sm:text-4xl">
              Simple, Transparent{" "}
              <span className="bg-gradient-to-r from-pink-500 to-purple-500 bg-clip-text text-transparent">
                Pricing
              </span>
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              Start free, upgrade when you need more
            </p>
          </motion.div>

          <div className="grid gap-8 lg:grid-cols-3 lg:gap-6">
            {plans.map((plan) => (
              <motion.div
                key={plan.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className={`relative rounded-2xl border bg-card p-8 ${
                  plan.popular
                    ? "border-primary shadow-lg shadow-primary/10"
                    : ""
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-primary px-4 py-1 text-xs font-medium text-primary-foreground">
                    Most Popular
                  </div>
                )}
                <div className="mb-6">
                  <h3 className="text-xl font-bold">{plan.name}</h3>
                  <div className="mt-4 flex items-baseline gap-1">
                    <span className="text-4xl font-bold">{plan.price}</span>
                    {plan.period && (
                      <span className="text-muted-foreground">
                        {plan.period}
                      </span>
                    )}
                  </div>
                  <p className="mt-2 text-sm text-muted-foreground">
                    {plan.description}
                  </p>
                </div>
                <ul className="mb-8 space-y-3">
                  {plan.features.map((feature) => (
                    <li
                      key={feature}
                      className="flex items-center gap-2 text-sm"
                    >
                      <div className="h-4 w-4 rounded-full bg-primary/20 flex items-center justify-center">
                        <div className="h-2 w-2 rounded-full bg-primary" />
                      </div>
                      {feature}
                    </li>
                  ))}
                </ul>
                <Button
                  className="w-full"
                  variant={plan.popular ? "default" : "outline"}
                  size="lg"
                >
                  {plan.cta}
                </Button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <footer className="border-t py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center justify-between gap-6 sm:flex-row">
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
                <Sparkles className="h-4 w-4 text-white" />
              </div>
              <span className="text-lg font-bold">StyleAI</span>
            </div>
            <p className="text-sm text-muted-foreground">
              © 2026 StyleAI. All rights reserved.
            </p>
            <div className="flex gap-6">
              <Link
                href="#"
                className="text-sm text-muted-foreground transition-colors hover:text-foreground"
              >
                Privacy
              </Link>
              <Link
                href="#"
                className="text-sm text-muted-foreground transition-colors hover:text-foreground"
              >
                Terms
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
