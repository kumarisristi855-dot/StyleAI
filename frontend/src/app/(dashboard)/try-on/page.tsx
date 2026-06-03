"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Upload,
  Shirt,
  Sparkles,
  Image as ImageIcon,
  RefreshCw,
  ArrowLeftRight,
} from "lucide-react";

export default function TryOnPage() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);

  const handleGenerate = () => {
    setIsGenerating(true);
    setTimeout(() => {
      setGeneratedImage("/tryon-result.jpg");
      setIsGenerating(false);
    }, 3000);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Virtual Try-On</h1>
        <p className="text-sm text-muted-foreground">
          See how outfits look on you with AI-powered preview
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">1. Upload Your Photo</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex aspect-[3/4] items-center justify-center rounded-lg border-2 border-dashed bg-muted/30">
              {selectedImage ? (
                <div className="relative h-full w-full">
                  <div className="flex h-full items-center justify-center bg-gradient-to-br from-muted to-muted/50">
                    <ImageIcon className="h-16 w-16 text-muted-foreground/30" />
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    className="absolute bottom-4 left-1/2 -translate-x-1/2 gap-2"
                    onClick={() => setSelectedImage(null)}
                  >
                    <RefreshCw className="h-3 w-3" />
                    Change Photo
                  </Button>
                </div>
              ) : (
                <div className="text-center p-8">
                  <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10">
                    <Upload className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="mt-4 font-medium">Upload your photo</h3>
                  <p className="mt-1 text-sm text-muted-foreground">
                    Full body photo works best
                  </p>
                  <Button className="mt-4 gap-2">
                    <Upload className="h-4 w-4" />
                    Upload Photo
                  </Button>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">2. Choose Outfit</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-3 gap-3">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div
                  key={i}
                  className="group relative aspect-square cursor-pointer rounded-lg border bg-muted/30 transition-all hover:border-primary"
                >
                  <div className="flex h-full items-center justify-center">
                    <Shirt className="h-6 w-6 text-muted-foreground/50" />
                  </div>
                </div>
              ))}
            </div>
            <div className="flex gap-2">
              <Badge variant="secondary">Casual</Badge>
              <Badge variant="secondary">Formal</Badge>
              <Badge variant="secondary">Party</Badge>
              <Badge variant="secondary">Summer</Badge>
            </div>
            <Button className="w-full gap-2" size="lg" onClick={handleGenerate} disabled={isGenerating}>
              {isGenerating ? (
                <>
                  <RefreshCw className="h-4 w-4 animate-spin" />
                  Generating...
                </>
              ) : (
                <>
                  <Sparkles className="h-4 w-4" />
                  Generate Try-On
                </>
              )}
            </Button>
          </CardContent>
        </Card>
      </div>

      {isGenerating || generatedImage ? (
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-lg">Preview</CardTitle>
            {generatedImage && (
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm" className="gap-1">
                  <ArrowLeftRight className="h-3 w-3" />
                  Before/After
                </Button>
                <Badge variant="success">AI Generated</Badge>
              </div>
            )}
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="aspect-[3/4] rounded-lg bg-muted/50 flex items-center justify-center">
                {isGenerating ? (
                  <div className="text-center">
                    <RefreshCw className="mx-auto h-8 w-8 animate-spin text-primary" />
                    <p className="mt-2 text-sm text-muted-foreground">
                      AI is processing...
                    </p>
                  </div>
                ) : (
                  <div className="h-full w-full bg-gradient-to-br from-primary/10 to-purple-500/10 flex items-center justify-center">
                    <ImageIcon className="h-16 w-16 text-muted-foreground/30" />
                  </div>
                )}
              </div>
              <div className="space-y-4">
                <div className="rounded-lg bg-primary/5 p-4">
                  <h4 className="font-medium">Style Analysis</h4>
                  <p className="mt-1 text-sm text-muted-foreground">
                    This outfit complements your body type. The fit is
                    well-proportioned and the colors harmonize with your skin
                    tone.
                  </p>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div className="rounded-lg border p-3 text-center">
                    <div className="text-lg font-bold text-primary">92</div>
                    <div className="text-xs text-muted-foreground">Fit Score</div>
                  </div>
                  <div className="rounded-lg border p-3 text-center">
                    <div className="text-lg font-bold text-primary">88</div>
                    <div className="text-xs text-muted-foreground">Style Score</div>
                  </div>
                </div>
                <Button className="w-full gap-2">
                  <Sparkles className="h-4 w-4" />
                  Try Different Pose
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      ) : null}
    </div>
  );
}
