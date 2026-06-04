"use client";

import { Shirt, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

export default function WardrobePage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">My Wardrobe</h1>
          <p className="text-sm text-muted-foreground">Manage your clothing collection</p>
        </div>
        <Button className="gap-2">
          <Plus className="h-4 w-4" />
          Add Item
        </Button>
      </div>

      <Card className="flex flex-col items-center justify-center py-24">
        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-muted">
          <Shirt className="h-8 w-8 text-muted-foreground" />
        </div>
        <h3 className="mt-4 text-lg font-medium">Your wardrobe is empty</h3>
        <p className="mt-1 text-sm text-muted-foreground text-center max-w-sm">
          Add your first clothing item to get started with AI-powered outfit recommendations
        </p>
        <Button className="mt-6 gap-2">
          <Plus className="h-4 w-4" />
          Add Your First Item
        </Button>
      </Card>
    </div>
  );
}
