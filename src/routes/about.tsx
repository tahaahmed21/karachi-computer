import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/site/PageHeader";
import { seo } from "@/lib/seo";

export const Route = createFileRoute("/about")({
  head: () =>
    seo(
      "About Karachi Computers",
      "Karachi Computers offers computer systems, laptops and accessories. Our full story will be added here by the shop owner.",
    ),
  component: () => (
    <>
      <PageHeader eyebrow="Karachi Computers" title="About Karachi Computers" crumb="About" />
      <section className="container-kc max-w-3xl py-14 text-muted-foreground leading-relaxed">
        <p>
          Karachi Computers offers computer systems, laptops and accessories. Our full story will be
          added here by the shop owner.
        </p>
      </section>
    </>
  ),
});
