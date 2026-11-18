import { createFileRoute } from "@tanstack/react-router";
import { CategoryPage } from "@/components/site/CategoryPage";
import { seo } from "@/lib/seo";

export const Route = createFileRoute("/laptops")({
  head: () => seo("Laptops", "Portable power for work and gaming."),
  component: () => (
    <CategoryPage ids={["laptops"]} title="Laptops" intro="Portable power for work and gaming." />
  ),
});
