"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Sun, Cloud, CloudRain, Wind, MapPin, RefreshCw } from "lucide-react";

export default function WeatherPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Weather Style</h1>
        <p className="text-sm text-muted-foreground">Outfit recommendations based on your local weather</p>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-lg">Current Weather</CardTitle>
            <Button variant="ghost" size="sm" className="gap-1">
              <MapPin className="h-4 w-4" />
              Mumbai
            </Button>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-6">
              <div className="flex h-24 w-24 items-center justify-center rounded-2xl bg-yellow-500/10">
                <Sun className="h-12 w-12 text-yellow-500" />
              </div>
              <div>
                <div className="text-4xl font-bold">32°C</div>
                <p className="text-muted-foreground">Sunny • feels like 35°C</p>
                <div className="mt-2 flex gap-4 text-sm text-muted-foreground">
                  <span className="flex items-center gap-1"><Wind className="h-3 w-3" /> 12 km/h</span>
                  <span className="flex items-center gap-1"><CloudRain className="h-3 w-3" /> 10%</span>
                  <span className="flex items-center gap-1"><Cloud className="h-3 w-3" /> H: 34° L: 27°</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">AI Recommendation</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="rounded-lg bg-primary/5 p-3">
              <p className="text-sm font-medium">Light & Breezy</p>
              <p className="text-xs text-muted-foreground mt-1">Linen shirt, cotton shorts, and sneakers. Don't forget sunglasses!</p>
            </div>
            <div className="flex flex-wrap gap-1.5">
              <Badge variant="secondary">Linen</Badge>
              <Badge variant="secondary">Cotton</Badge>
              <Badge variant="secondary">Light Colors</Badge>
              <Badge variant="secondary">Sunglasses</Badge>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg">5-Day Forecast</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-5 gap-4">
            {["Mon", "Tue", "Wed", "Thu", "Fri"].map((day, i) => (
              <div key={day} className="text-center space-y-2 rounded-lg border p-3">
                <p className="text-sm font-medium">{day}</p>
                <Sun className="mx-auto h-6 w-6 text-yellow-500" />
                <p className="text-lg font-bold">{32 - i}°</p>
                <p className="text-xs text-muted-foreground">{27 - i}°</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
