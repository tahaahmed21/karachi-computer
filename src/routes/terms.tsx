import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/site/PageHeader";
import { seo } from "@/lib/seo";

export const Route = createFileRoute("/terms")({
  head: () =>
    seo(
      "Terms & Conditions",
      "These placeholder terms will be replaced with the shop's confirmed terms. Prices shown on this site are demo values and no real orders are processed.",
    ),
  component: () => (
    <>
      <PageHeader eyebrow="Karachi Computers" title="Terms & Conditions" crumb="Terms" />
      <section className="container-kc max-w-3xl py-14 text-muted-foreground leading-relaxed">
        <p>
          These placeholder terms will be replaced with the shop's confirmed terms. Prices shown on
          this site are demo values and no real orders are processed.
        </p>
      </section>
    </>
  ),
});
