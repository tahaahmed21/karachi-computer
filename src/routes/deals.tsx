import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/site/PageHeader";
import { ProductGrid } from "@/components/site/ProductCard";
import signature from "@/assets/signature-setup.jpg";
import { seo } from "@/lib/seo";
import { useStore } from "@/lib/store-hook";

export const Route = createFileRoute("/deals")({
  head: () =>
    seo("Deals", "Selected offers on computers, laptops and components at Karachi Computers."),
  component: Deals,
});

function Deals() {
  const { products } = useStore();

  return (
    <>
      <PageHeader
        eyebrow="Selected offers"
        title="Deals"
        intro="A hand-picked selection from our catalogue. Offers shown here are editable demo content."
        crumb="Deals"
        image={signature}
      />
      <section className="container-kc py-14">
        <ProductGrid items={products.filter((p) => p.deal)} />
      </section>
    </>
  );
}
