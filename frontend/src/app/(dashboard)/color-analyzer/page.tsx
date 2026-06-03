"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Palette, Upload, Check, X } from "lucide-react";

export default function ColorAnalyzerPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Color Harmony Analyzer</h1>
        <p className="text-sm text-muted-foreground">Analyze color compatibility and get fashion balance suggestions</p>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Upload Items</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-center rounded-lg border-2 border-dashed p-12">
              <div className="text-center">
                <Palette className="mx-auto h-10 w-10 text-muted-foreground" />
                <p className="mt-2 font-medium">Drop items to analyze</p>
                <p className="text-sm text-muted-foreground">Upload 2-4 items to check color harmony</p>
                <Button variant="outline" size="sm" className="mt-4 gap-2">
                  <Upload className="h-4 w-4" /> Upload Items
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Color Analysis</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-3">
              {[
                { label: "Compatibility", score: 92, status: "Excellent" },
                { label: "Contrast", score: 78, status: "Good" },
                { label: "Balance", score: 85, status: "Great" },
                { label: "Overall", score: 88, status: "Harmonious" },
              ].map((item) => (
                <div key={item.label} className="rounded-lg border p-3 text-center">
                  <div className="text-2xl font-bold text-primary">{item.score}%</div>
                  <div className="text-sm font-medium">{item.label}</div>
                  <Badge variant="success" className="mt-1 text-xs">{item.status}</Badge>
                </div>
              ))}
            </div>

            <div className="space-y-2">
              <p className="text-sm font-medium">Suggested Colors</p>
              <div className="flex gap-2">
                {["#0047ab", "#800020", "#228b22", "#c08081", "#e1ad01"].map((c) => (
                  <div key={c} className="h-8 w-8 rounded-full border" style={{ backgroundColor: c }} />
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
