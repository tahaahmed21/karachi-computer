import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";
import { categories, products } from "@/lib/products";
import { PageHeader } from "@/components/site/PageHeader";
import { categoryLink } from "@/components/site/links";
import { seo } from "@/lib/seo";

export const Route = createFileRoute("/categories")({
  head: () => seo("Categories", "Explore every Karachi Computers category: desktops, gaming PCs, laptops, components, monitors and accessories."),
  component: () => (
    <>
      <PageHeader eyebrow="Explore" title="Categories" intro="Find exactly what your setup needs." crumb="Categories" />
      <section className="container-kc grid gap-5 py-14 sm:grid-cols-2 lg:grid-cols-4">
        {categories.map((c) => (
          <Link key={c.id} {...categoryLink(c.id)} className="group overflow-hidden rounded-md border border-border bg-elevated transition-colors hover:border-gold">
            <div className="aspect-[4/3] overflow-hidden"><img src={c.image} alt={c.name} loading="lazy" className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" /></div>
            <div className="flex items-center justify-between gap-3 p-5">
              <div className="min-w-0">
                <h2 className="font-serif text-xl font-semibold">{c.name}</h2>
                <p className="text-xs text-muted-foreground">{products.filter((p) => p.category === c.id).length} products · {c.label}</p>
              </div>
              <ArrowUpRight className="h-4 w-4 shrink-0 text-gold" />
            </div>
          </Link>
        ))}
      </section>
    </>
  ),
});
