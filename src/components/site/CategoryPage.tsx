import { categoryById, products, type CategoryId } from "@/lib/products";
import { PageHeader } from "./PageHeader";
import { ProductGrid } from "./ProductCard";
import { Link } from "@tanstack/react-router";

export function CategoryPage({ ids, title, intro }: { ids: CategoryId[]; title: string; intro: string }) {
  const items = products.filter((p) => ids.includes(p.category));
  const cat = categoryById(ids[0]);
  return (
    <>
      <PageHeader eyebrow="Category" title={title} intro={intro} crumb={title} image={cat?.image} />
      <section className="container-kc py-14">
        <div className="mb-8 flex items-center justify-between">
          <p className="text-sm text-muted-foreground">{items.length} products</p>
          <Link to="/shop" className="text-xs uppercase tracking-[0.2em] text-gold hover:text-gold-bright">Browse full shop →</Link>
        </div>
        {items.length ? <ProductGrid items={items} /> : <p className="text-muted-foreground">Products coming soon.</p>}
      </section>
    </>
  );
}
