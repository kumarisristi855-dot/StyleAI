"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Luggage, MapPin, Calendar, Sun, CheckCircle2, Plus } from "lucide-react";

export default function PackingPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Packing Assistant</h1>
          <p className="text-sm text-muted-foreground">AI-generated packing lists for any trip</p>
        </div>
        <Button className="gap-2"><Plus className="h-4 w-4" /> New Trip</Button>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              <Luggage className="h-5 w-5 text-primary" />
              Goa Vacation
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex gap-4 text-sm text-muted-foreground">
              <span className="flex items-center gap-1"><MapPin className="h-3 w-3" /> Goa</span>
              <span className="flex items-center gap-1"><Calendar className="h-3 w-3" /> 5 days</span>
              <span className="flex items-center gap-1"><Sun className="h-3 w-3" /> 30°C Sunny</span>
            </div>
            <div className="space-y-2">
              {["T-Shirts (4)", "Shorts (3)", "Swimwear (2)", "Sunglasses", "Sunscreen", "Flip-flops", "Light Jacket", "Sneakers"].map((item) => (
                <div key={item} className="flex items-center gap-3 rounded-lg border p-2.5">
                  <CheckCircle2 className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">{item}</span>
                </div>
              ))}
            </div>
            <Button variant="outline" size="sm" className="w-full">Generate Packing List</Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Create New Trip</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Destination</label>
              <input className="h-9 w-full rounded-md border bg-transparent px-3 text-sm" placeholder="Enter destination" />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-2">
                <label className="text-sm font-medium">Duration</label>
                <input className="h-9 w-full rounded-md border bg-transparent px-3 text-sm" placeholder="Days" type="number" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Weather</label>
                <input className="h-9 w-full rounded-md border bg-transparent px-3 text-sm" placeholder="e.g., Sunny" />
              </div>
            </div>
            <Button className="w-full gap-2"><Luggage className="h-4 w-4" /> Generate List</Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
