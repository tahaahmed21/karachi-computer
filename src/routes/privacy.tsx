import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/site/PageHeader";
import { seo } from "@/lib/seo";

export const Route = createFileRoute("/privacy")({
  head: () =>
    seo(
      "Privacy Policy",
      "This placeholder policy will be replaced with the shop's confirmed privacy policy. This demo site stores your cart and wishlist only in your own browser.",
    ),
  component: () => (
    <>
      <PageHeader eyebrow="Karachi Computers" title="Privacy Policy" crumb="Privacy" />
      <section className="container-kc max-w-3xl py-14 text-muted-foreground leading-relaxed">
        <p>
          This placeholder policy will be replaced with the shop's confirmed privacy policy. This
          demo site stores your cart and wishlist only in your own browser.
        </p>
      </section>
    </>
  ),
});
