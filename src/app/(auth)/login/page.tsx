"use client";

import Link from "next/link";
import { Card, CardHeader } from "@heroui/react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Layers } from "lucide-react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    router.push("/dashboard");
  };

  return (
    <div className="flex min-h-screen items-center justify-center p-4 bg-default-50">
      <Card className="w-full max-w-md border border-default-200 bg-content1 shadow-lg">
        <CardHeader className="flex flex-col items-center gap-2 pb-0 pt-6">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary text-primary-foreground font-bold shadow-md">
            <Layers className="h-6 w-6" />
          </div>
          <h1 className="text-2xl font-bold text-foreground">Welcome Back</h1>
          <p className="text-sm text-default-500">Sign in to your account</p>
        </CardHeader>
        <div className="p-6">
          <form onSubmit={handleLogin} className="flex flex-col gap-4">
            <Input
              type="email"
              placeholder="tony@example.com"
              defaultValue="tony@example.com"
              required
            />
            <Input type="password" placeholder="••••••••" defaultValue="password123" required />
            <div className="flex justify-end">
              <Link href="/forgot-password" className="text-xs text-primary hover:underline">
                Forgot password?
              </Link>
            </div>
            <Button type="submit" variant="primary" className="w-full mt-2 font-medium">
              Sign In
            </Button>
          </form>
        </div>
      </Card>
    </div>
  );
}
