"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useUIStore } from "@/stores";
import { useAuth } from "@/lib/auth-context";
import {
  LayoutDashboard,
  Shirt,
  MessageCircle,
  ShoppingBag,
  Palette,
  TrendingUp,
  Sun,
  Luggage,
  Leaf,
  Users,
  Menu,
  ChevronLeft,
  Search,
  Bell,
  User,
  LogOut,
  Sparkles as SparklesIcon,
} from "lucide-react";

const sidebarLinks = [
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/wardrobe", label: "Wardrobe", icon: Shirt },
  { href: "/outfits", label: "Outfit Builder", icon: SparklesIcon },
  { href: "/stylist", label: "AI Stylist", icon: MessageCircle },
  { href: "/try-on", label: "Virtual Try-On", icon: ShoppingBag },
  { href: "/compare", label: "Shop & Compare", icon: ShoppingBag },
  { href: "/social", label: "Community", icon: Users },
  { href: "/trends", label: "Trends", icon: TrendingUp },
  { href: "/weather", label: "Weather Style", icon: Sun },
  { href: "/packing", label: "Packing", icon: Luggage },
  { href: "/sustainability", label: "Sustainable", icon: Leaf },
  { href: "/color-analyzer", label: "Color Analyzer", icon: Palette },
];

function SidebarUserSection() {
  const { user, logout } = useAuth();
  return (
    <div className="border-t p-4">
      <div className="flex items-center gap-3 rounded-lg bg-muted/50 px-3 py-2.5">
        <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary/10 text-primary font-semibold text-sm">
          {user ? user.name.charAt(0).toUpperCase() : "?"}
        </div>
        <div className="flex-1 truncate">
          <p className="text-sm font-medium">{user?.name || "Guest"}</p>
          <p className="text-xs text-muted-foreground truncate">{user?.email || "Not signed in"}</p>
        </div>
        {user && (
          <Button variant="ghost" size="icon" className="h-8 w-8" onClick={logout}>
            <LogOut className="h-4 w-4 text-muted-foreground" />
          </Button>
        )}
      </div>
    </div>
  );
}

function HeaderUserButton() {
  const { user } = useAuth();
  if (user) {
    return (
      <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-muted/50">
        <div className="flex h-7 w-7 items-center justify-center rounded-full bg-primary/10 text-primary font-semibold text-xs">
          {user.name.charAt(0).toUpperCase()}
        </div>
        <span className="text-sm font-medium hidden sm:inline">{user.name}</span>
      </div>
    );
  }
  return (
    <Link href="/sign-in" className="hidden sm:block">
      <Button variant="ghost" size="icon">
        <User className="h-5 w-5" />
      </Button>
    </Link>
  );
}

function Sidebar() {
  const pathname = usePathname();

  return (
    <AnimatePresence mode="wait">
      <motion.aside
        initial={{ x: -280, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        exit={{ x: -280, opacity: 0 }}
        transition={{ duration: 0.2, ease: "easeInOut" }}
        className="fixed inset-y-0 left-0 z-50 flex w-[280px] flex-col border-r bg-card lg:static lg:z-auto"
      >
        <div className="flex h-16 items-center justify-between border-b px-4">
          <Link href="/dashboard" className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
              <SparklesIcon className="h-4 w-4 text-white" />
            </div>
            <span className="text-lg font-bold">StyleAI</span>
          </Link>
        </div>
        <ScrollArea className="flex-1 px-3 py-4">
          <nav className="space-y-1">
            {sidebarLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all",
                    isActive
                      ? "bg-primary text-primary-foreground shadow-sm"
                      : "text-muted-foreground hover:bg-accent hover:text-accent-foreground",
                  )}
                >
                  <link.icon className="h-4 w-4" />
                  {link.label}
                </Link>
              );
            })}
          </nav>
        </ScrollArea>
        <SidebarUserSection />
      </motion.aside>
    </AnimatePresence>
  );
}

function DashboardInner({ children }: { children: React.ReactNode }) {
  const { isSidebarOpen, toggleSidebar } = useUIStore();

  return (
    <div className="flex h-screen overflow-hidden bg-background">
      {isSidebarOpen && <Sidebar />}

      <div className="flex flex-1 flex-col overflow-hidden">
        <header className="flex h-16 items-center justify-between border-b bg-background/80 px-4 backdrop-blur-xl lg:px-6">
          <div className="flex items-center gap-3">
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleSidebar}
              className="lg:hidden"
            >
              <Menu className="h-5 w-5" />
            </Button>
            {!isSidebarOpen && (
              <Button
                variant="ghost"
                size="icon"
                onClick={toggleSidebar}
                className="hidden lg:flex"
              >
                <ChevronLeft className="h-4 w-4 rotate-180" />
              </Button>
            )}
          </div>

          <div className="hidden flex-1 max-w-md mx-auto sm:block">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search wardrobe..."
                className="h-9 w-full rounded-lg border bg-muted/50 pl-9 pr-4 text-sm outline-none focus:border-primary focus:ring-1 focus:ring-primary"
              />
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Button variant="ghost" size="icon" className="relative">
              <Bell className="h-5 w-5" />
              <span className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full bg-primary" />
            </Button>
            <HeaderUserButton />
          </div>
        </header>

        <main className="flex-1 overflow-y-auto p-4 lg:p-6">
          {children}
        </main>
      </div>
    </div>
  );
}

export default function DashboardClient({
  children,
}: {
  children: React.ReactNode;
}) {
  return <DashboardInner>{children}</DashboardInner>;
}
