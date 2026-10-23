import { createFileRoute } from "@tanstack/react-router";
import { CategoryPage } from "@/components/site/CategoryPage";
import { seo } from "@/lib/seo";

export const Route = createFileRoute("/gaming-pcs")({
  head: () => seo("Gaming PCs", "High-performance builds for play and streaming."),
  component: () => <CategoryPage ids={["gaming-pcs"]} title="Gaming PCs" intro="High-performance builds for play and streaming." />,
});
