import { createFileRoute } from "@tanstack/react-router";
import { CategoryPage } from "@/components/site/CategoryPage";
import { seo } from "@/lib/seo";

export const Route = createFileRoute("/components")({
  head: () => seo("Computer Components", "Graphics cards, processors and upgrades."),
  component: () => (
    <CategoryPage
      ids={["components"]}
      title="Computer Components"
      intro="Graphics cards, processors and upgrades."
    />
  ),
});
