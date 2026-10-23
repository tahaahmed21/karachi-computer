import { createFileRoute, Link } from "@tanstack/react-router";
import { Heart, ShoppingBag, X } from "lucide-react";
import { formatPKR, productById } from "@/lib/products";
import { useStore } from "@/lib/store";
import { PageHeader } from "@/components/site/PageHeader";
import { seo } from "@/lib/seo";

export const Route = createFileRoute("/wishlist")({
  head: () => seo("Wishlist", "Products you've saved at Karachi Computers."),
  component: Wishlist,
});

function Wishlist() {
  const { wishlist, toggleWish, moveToCart } = useStore();
  const items = wishlist.map(productById).filter((p) => !!p);
  return (
    <>
      <PageHeader eyebrow="Saved" title="Wishlist" crumb="Wishlist" />
      <section className="container-kc py-14">
        {!items.length ? (
          <div className="py-16 text-center">
            <Heart className="mx-auto h-10 w-10 text-gold" />
            <p className="mt-4 font-serif text-3xl">Your wishlist is empty</p>
            <Link to="/shop" className="btn-gold mt-8">Continue shopping</Link>
          </div>
        ) : (
          <ul className="grid gap-4 md:grid-cols-2">
            {items.map((p) => (
              <li key={p.id} className="flex items-center gap-4 rounded-md border border-border bg-elevated p-4">
                <Link to="/product/$id" params={{ id: p.id }} className="shrink-0"><img src={p.images[0]} alt={p.name} className="h-24 w-24 rounded-sm object-cover" /></Link>
                <div className="min-w-0 flex-1">
                  <Link to="/product/$id" params={{ id: p.id }} className="block truncate font-serif text-lg hover:text-gold">{p.name}</Link>
                  <p className="text-sm text-gold">{formatPKR(p.price)}</p>
                  <button onClick={() => moveToCart(p.id)} className="mt-3 inline-flex items-center gap-2 text-xs uppercase tracking-[0.15em] text-foreground hover:text-gold"><ShoppingBag className="h-3.5 w-3.5" /> Move to cart</button>
                </div>
                <button onClick={() => toggleWish(p.id)} aria-label="Remove" className="grid h-9 w-9 shrink-0 place-items-center rounded-full border border-border hover:border-gold"><X className="h-4 w-4" /></button>
              </li>
            ))}
          </ul>
        )}
      </section>
    </>
  );
}
