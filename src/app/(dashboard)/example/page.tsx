import { ExampleView } from "@/features/example/components/example-view";
import { fetchServerItems } from "@/lib/api/server";

export const metadata = {
  title: "Example Feature",
  description: "General-purpose example feature demonstration",
};

export default async function ExamplePage() {
  // Gracefully fetch initial server data for RSC hydration; falls back to client fetch if local dev mock server is still spinning up
  const initialData = await fetchServerItems().catch(() => undefined);

  return <ExampleView initialData={initialData} />;
}
