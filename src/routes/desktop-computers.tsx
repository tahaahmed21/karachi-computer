import { createFileRoute } from "@tanstack/react-router";
import { CategoryPage } from "@/components/site/CategoryPage";
import { seo } from "@/lib/seo";

export const Route = createFileRoute("/desktop-computers")({
  head: () => seo("Desktop Computers", "Reliable desktops for office and home."),
  component: () => (
    <CategoryPage
      ids={["desktop-computers"]}
      title="Desktop Computers"
      intro="Reliable desktops for office and home."
    />
  ),
});
