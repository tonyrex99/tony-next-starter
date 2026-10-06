import Link from "next/link";
import { Card, CardHeader } from "@heroui/react";
import { Button } from "@/components/ui/button";
import { Boxes, ArrowRight, CheckCircle2, ShieldCheck, Zap } from "lucide-react";
import { PageContainer } from "@/components/ui/page-container";
import { PageHeader } from "@/components/ui/page-header";

export const metadata = {
  title: "Dashboard",
  description: "Overview dashboard for Tony Next Starter",
};

export default function DashboardPage() {
  return (
    <PageContainer>
      <PageHeader
        title="Application Overview"
        description="Welcome to your production-oriented Next.js starter template"
        actions={
          <Link href="/example">
            <Button variant="primary" endContent={<ArrowRight className="h-4 w-4" />}>
              Explore Example Feature
            </Button>
          </Link>
        }
      />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="border border-default-200 bg-content1 shadow-sm">
          <CardHeader className="flex gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
              <Zap className="h-5 w-5" />
            </div>
            <div>
              <p className="text-base font-semibold">Modern Core Stack</p>
              <p className="text-xs text-default-500">Next.js 16 + HeroUI v3 + Tailwind v4</p>
            </div>
          </CardHeader>
          <div className="p-4 pt-0 text-sm text-default-600">
            Pre-configured with React 19, strict TypeScript, RSC boundaries, and theme support out
            of the box.
          </div>
        </Card>

        <Card className="border border-default-200 bg-content1 shadow-sm">
          <CardHeader className="flex gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-success/10 text-success">
              <CheckCircle2 className="h-5 w-5" />
            </div>
            <div>
              <p className="text-base font-semibold">Contract-First API</p>
              <p className="text-xs text-default-500">Hey API + OpenAPI 3.x</p>
            </div>
          </CardHeader>
          <div className="p-4 pt-0 text-sm text-default-600">
            Zero duplicate DTO typing. Type-safe clients and query wrappers generated directly from
            your OpenAPI contract.
          </div>
        </Card>

        <Card className="border border-default-200 bg-content1 shadow-sm">
          <CardHeader className="flex gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-warning/10 text-warning">
              <ShieldCheck className="h-5 w-5" />
            </div>
            <div>
              <p className="text-base font-semibold">Comprehensive Testing</p>
              <p className="text-xs text-default-500">Vitest + RTL + Storybook + Playwright</p>
            </div>
          </CardHeader>
          <div className="p-4 pt-0 text-sm text-default-600">
            Four tiers of testing: pure logic with Vitest, components with RTL & MSW, UI with
            Storybook, and E2E with Playwright.
          </div>
        </Card>
      </div>

      <Card className="border border-default-200 bg-content1">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-6">
          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary text-primary-foreground">
              <Boxes className="h-6 w-6" />
            </div>
            <div>
              <h3 className="font-semibold text-foreground">Example CRUD Feature Ready</h3>
              <p className="text-xs text-default-500">
                Demonstrates TanStack Query, TanStack Table, HeroUI Modals, and Zod validation
                forms.
              </p>
            </div>
          </div>
          <Link href="/example">
            <Button variant="flat">View Example Feature</Button>
          </Link>
        </div>
      </Card>
    </PageContainer>
  );
}
