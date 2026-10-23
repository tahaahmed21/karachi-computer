import { Link } from "@tanstack/react-router";
import { Heart, ShoppingBag, ArrowUpRight } from "lucide-react";
import { categoryById, formatPKR, type Product } from "@/lib/products";
import { useStore } from "@/lib/store";

export function ProductCard({ product }: { product: Product }) {
  const { add, toggleWish, inWish } = useStore();
  const saved = inWish(product.id);
  return (
    <article className="group relative flex flex-col overflow-hidden rounded-md border border-border bg-elevated transition-all duration-300 hover:-translate-y-1 hover:border-gold-line hover:shadow-[var(--shadow-card)]">
      <Link to="/product/$id" params={{ id: product.id }} className="relative block aspect-[4/3] overflow-hidden bg-surface">
        <img src={product.images[0]} alt={product.name} loading="lazy" width={1024} height={1024}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" />
      </Link>
      <button
        onClick={() => toggleWish(product.id)}
        aria-label={saved ? "Remove from wishlist" : "Add to wishlist"}
        aria-pressed={saved}
        className="absolute right-3 top-3 grid h-9 w-9 place-items-center rounded-full border border-border bg-background/70 backdrop-blur transition-colors hover:border-gold"
      >
        <Heart className={`h-4 w-4 ${saved ? "fill-gold text-gold" : "text-foreground"}`} />
      </button>
      <div className="flex flex-1 flex-col gap-2 p-5">
        <p className="text-[0.65rem] uppercase tracking-[0.25em] text-muted-foreground">
          {categoryById(product.category)?.name}
        </p>
        <Link to="/product/$id" params={{ id: product.id }} className="flex items-start justify-between gap-3">
          <h3 className="font-serif text-xl font-semibold leading-tight text-foreground transition-colors group-hover:text-gold-bright">{product.name}</h3>
          <ArrowUpRight className="mt-1 h-4 w-4 shrink-0 text-muted-foreground transition-colors group-hover:text-gold" />
        </Link>
        <p className="text-sm text-muted-foreground">{product.spec}</p>
        <div className="mt-auto flex items-center justify-between gap-3 border-t border-border pt-4">
          <span className="font-semibold tracking-wide text-gold">{formatPKR(product.price)}</span>
          <button onClick={() => add(product.id)}
            className="inline-flex items-center gap-2 rounded-sm border border-gold-line px-3 py-2 text-[0.7rem] font-semibold uppercase tracking-[0.15em] text-foreground transition-colors hover:border-gold hover:bg-gold hover:text-primary-foreground active:scale-95">
            <ShoppingBag className="h-3.5 w-3.5" /> Add
          </button>
        </div>
      </div>
    </article>
  );
}

export function ProductGrid({ items }: { items: Product[] }) {
  return (
    <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {items.map((p) => <ProductCard key={p.id} product={p} />)}
    </div>
  );
}
