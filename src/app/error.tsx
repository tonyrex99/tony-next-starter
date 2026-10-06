"use client";

import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { AlertCircle, RotateCcw } from "lucide-react";

export default function ErrorBoundary({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Application error boundary triggered:", error);
  }, [error]);

  return (
    <div className="flex min-h-[50vh] flex-col items-center justify-center p-6 text-center">
      <div className="flex h-14 w-14 items-center justify-center rounded-full bg-danger/10 text-danger mb-4">
        <AlertCircle className="h-7 w-7" />
      </div>
      <h2 className="text-xl font-bold text-foreground">Something went wrong</h2>
      <p className="text-sm text-default-500 max-w-md mt-1 mb-6">
        {error.message || "An unexpected error occurred while rendering this page."}
      </p>
      <Button
        variant="primary"
        onPress={() => reset()}
        startContent={<RotateCcw className="h-4 w-4" />}
      >
        Try Again
      </Button>
    </div>
  );
}
