import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowLeft, FileQuestion } from "lucide-react";

export default function NotFound() {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center p-6 text-center">
      <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-default-100 text-default-500 mb-4">
        <FileQuestion className="h-8 w-8" />
      </div>
      <h1 className="text-3xl font-extrabold text-foreground tracking-tight">404</h1>
      <h2 className="text-lg font-semibold text-foreground mt-1">Page Not Found</h2>
      <p className="text-sm text-default-500 max-w-sm mt-1 mb-6">
        The page you are looking for does not exist or has been moved.
      </p>
      <Link href="/dashboard">
        <Button variant="primary" startContent={<ArrowLeft className="h-4 w-4" />}>
          Return to Dashboard
        </Button>
      </Link>
    </div>
  );
}
