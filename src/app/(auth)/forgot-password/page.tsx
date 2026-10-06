"use client";

import Link from "next/link";
import { Card, CardHeader } from "@heroui/react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowLeft, KeyRound } from "lucide-react";

export default function ForgotPasswordPage() {
  return (
    <div className="flex min-h-screen items-center justify-center p-4 bg-default-50">
      <Card className="w-full max-w-md border border-default-200 bg-content1 shadow-lg">
        <CardHeader className="flex flex-col items-center gap-2 pb-0 pt-6">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
            <KeyRound className="h-6 w-6" />
          </div>
          <h1 className="text-2xl font-bold text-foreground">Reset Password</h1>
          <p className="text-sm text-default-500 text-center">
            Enter your email address to receive password reset instructions
          </p>
        </CardHeader>
        <div className="p-6">
          <form className="flex flex-col gap-4">
            <Input type="email" placeholder="tony@example.com" required />
            <Button type="submit" variant="primary" className="w-full mt-2 font-medium">
              Send Reset Link
            </Button>
            <div className="text-center mt-2">
              <Link
                href="/login"
                className="text-xs text-default-500 hover:text-foreground inline-flex items-center gap-1"
              >
                <ArrowLeft className="h-3 w-3" /> Back to Sign In
              </Link>
            </div>
          </form>
        </div>
      </Card>
    </div>
  );
}
