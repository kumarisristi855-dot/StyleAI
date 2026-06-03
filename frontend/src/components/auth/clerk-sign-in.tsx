"use client";

import { SignIn } from "@clerk/nextjs";
import { Sparkles } from "lucide-react";

export default function ClerkSignIn() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 right-0 h-[500px] w-[500px] rounded-full bg-primary/5 blur-3xl" />
        <div className="absolute -bottom-40 left-0 h-[400px] w-[400px] rounded-full bg-purple-500/5 blur-3xl" />
      </div>
      <div className="relative flex flex-col items-center">
        <div className="mb-8 flex items-center gap-2">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary">
            <Sparkles className="h-5 w-5 text-white" />
          </div>
          <span className="text-2xl font-bold">StyleAI</span>
        </div>
        <SignIn
          routing="hash"
          appearance={{
            elements: {
              rootBox: "mx-auto",
              card: "bg-card border shadow-xl",
              headerTitle: "text-foreground",
              headerSubtitle: "text-muted-foreground",
              socialButtonsBlockButton: "border border-input bg-background hover:bg-accent",
              formFieldLabel: "text-foreground",
              formFieldInput: "bg-background border-input",
              footerActionText: "text-muted-foreground",
              footerActionLink: "text-primary",
            },
          }}
        />
      </div>
    </div>
  );
}
