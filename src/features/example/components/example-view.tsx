import { PageContainer } from "@/components/ui/page-container";
import { PageHeader } from "@/components/ui/page-header";
import { ExampleStats } from "./example-stats";
import { ExampleFilters } from "./example-filters";
import { ExampleTable } from "./example-table";
import { ExampleDialog } from "./example-dialog";
import type { ItemListResponse } from "../types";

export interface ExampleViewProps {
  initialData?: ItemListResponse;
}

export function ExampleView({ initialData }: ExampleViewProps) {
  return (
    <PageContainer>
      <PageHeader
        title="Items Management"
        description="Comprehensive management view demonstrating RSC hydration, TanStack Query, HeroUI, nuqs URL state, and Hey API."
      />

      <ExampleStats items={initialData?.items ?? []} />

      <ExampleFilters />

      <ExampleTable initialData={initialData} />

      <ExampleDialog />
    </PageContainer>
  );
}
