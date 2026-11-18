import { createFileRoute } from "@tanstack/react-router";
import { CategoryPage } from "@/components/site/CategoryPage";
import { seo } from "@/lib/seo";

export const Route = createFileRoute("/accessories")({
  head: () => seo("Accessories", "Headsets, input devices, storage and more."),
  component: () => (
    <CategoryPage
      ids={["accessories", "keyboards-mice", "storage-memory"]}
      title="Accessories"
      intro="Headsets, input devices, storage and more."
    />
  ),
});
