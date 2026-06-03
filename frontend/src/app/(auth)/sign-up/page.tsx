"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/auth-context";
import { Sparkles, ArrowLeft, Settings, Loader2 } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

const isClerkAvailable =
  typeof process !== "undefined" &&
  process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY?.startsWith("pk_");

export default function SignUpPage() {
  if (!isClerkAvailable) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <div className="text-center max-w-md space-y-4">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-muted">
            <Settings className="h-8 w-8 text-muted-foreground" />
          </div>
          <h1 className="text-2xl font-bold">Authentication Not Configured</h1>
          <p className="text-muted-foreground">
            Add your Clerk publishable key to <code className="bg-muted px-2 py-0.5 rounded text-sm">.env.local</code> to enable authentication.
          </p>
          <Link href="/">
            <Button variant="outline" className="gap-2">
              <ArrowLeft className="h-4 w-4" /> Back to Home
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return <SignUpForm />;
}

function SignUpForm() {
  const router = useRouter();
  const { login } = useAuth();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSignUp = () => {
    if (!email) return;
    setLoading(true);
    login(email, name || undefined);
    setTimeout(() => router.push("/dashboard"), 300);
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-background">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 right-0 h-[500px] w-[500px] rounded-full bg-primary/5 blur-3xl" />
        <div className="absolute -bottom-40 left-0 h-[400px] w-[400px] rounded-full bg-purple-500/5 blur-3xl" />
      </div>
      <div className="relative w-full max-w-md px-4">
        <div className="mb-8 flex items-center justify-center gap-2">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary">
            <Sparkles className="h-5 w-5 text-white" />
          </div>
          <span className="text-2xl font-bold">StyleAI</span>
        </div>
        <div className="rounded-xl border bg-card p-6 shadow-xl">
          <h2 className="text-xl font-semibold mb-1">Create an account</h2>
          <p className="text-sm text-muted-foreground mb-6">Sign up to start styling with AI</p>
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium">Name</label>
              <input
                type="text"
                placeholder="Your name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="mt-1 h-10 w-full rounded-lg border bg-background px-3 text-sm outline-none focus:border-primary"
              />
            </div>
            <div>
              <label className="text-sm font-medium">Email</label>
              <input
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mt-1 h-10 w-full rounded-lg border bg-background px-3 text-sm outline-none focus:border-primary"
              />
            </div>
            <div>
              <label className="text-sm font-medium">Password</label>
              <input
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="mt-1 h-10 w-full rounded-lg border bg-background px-3 text-sm outline-none focus:border-primary"
              />
            </div>
            <Button className="w-full" onClick={handleSignUp} disabled={loading}>
              {loading ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : null}
              {loading ? "Creating account..." : "Create Account"}
            </Button>
          </div>
          <p className="mt-4 text-center text-sm text-muted-foreground">
            Already have an account?{" "}
            <Link href="/sign-in" className="text-primary hover:underline">Sign in</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
