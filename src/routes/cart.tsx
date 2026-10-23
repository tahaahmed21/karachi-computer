import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { Minus, Plus, ShoppingBag, X } from "lucide-react";
import { formatPKR } from "@/lib/products";
import { useStore } from "@/lib/store";
import { PageHeader } from "@/components/site/PageHeader";
import { seo } from "@/lib/seo";

export const Route = createFileRoute("/cart")({
  head: () => seo("Cart", "Review the items in your Karachi Computers cart."),
  component: Cart,
});

function Cart() {
  const { lines, subtotal, setQty, remove, clear } = useStore();
  const [preview, setPreview] = useState(false);
  return (
    <>
      <PageHeader eyebrow="Your selection" title="Cart" crumb="Cart" />
      <section className="container-kc py-14">
        {!lines.length ? (
          <div className="py-16 text-center">
            <ShoppingBag className="mx-auto h-10 w-10 text-gold" />
            <p className="mt-4 font-serif text-3xl">Your cart is empty</p>
            <Link to="/shop" className="btn-gold mt-8">Continue shopping</Link>
          </div>
        ) : (
          <div className="grid gap-10 lg:grid-cols-[1fr_360px]">
            <ul className="space-y-4">
              {lines.map(({ product: p, qty }) => (
                <li key={p.id} className="flex flex-wrap items-center gap-4 rounded-md border border-border bg-elevated p-4 sm:flex-nowrap">
                  <img src={p.images[0]} alt={p.name} className="h-20 w-20 shrink-0 rounded-sm object-cover" />
                  <div className="min-w-0 flex-1">
                    <Link to="/product/$id" params={{ id: p.id }} className="block truncate font-serif text-lg hover:text-gold">{p.name}</Link>
                    <p className="text-sm text-muted-foreground">{formatPKR(p.price)} each</p>
                  </div>
                  <div className="flex h-10 items-center rounded-sm border border-border">
                    <button onClick={() => setQty(p.id, qty - 1)} aria-label="Decrease" className="grid h-full w-10 place-items-center hover:text-gold"><Minus className="h-3.5 w-3.5" /></button>
                    <span className="w-8 text-center text-sm">{qty}</span>
                    <button onClick={() => setQty(p.id, qty + 1)} aria-label="Increase" className="grid h-full w-10 place-items-center hover:text-gold"><Plus className="h-3.5 w-3.5" /></button>
                  </div>
                  <p className="w-32 text-right font-semibold text-gold">{formatPKR(p.price * qty)}</p>
                  <button onClick={() => remove(p.id)} aria-label="Remove" className="grid h-9 w-9 place-items-center rounded-full border border-border hover:border-gold"><X className="h-4 w-4" /></button>
                </li>
              ))}
            </ul>
            <aside className="h-fit rounded-md border border-gold-line bg-surface p-6">
              <p className="eyebrow">Summary</p>
              <div className="mt-6 flex justify-between text-sm"><span className="text-muted-foreground">Subtotal</span><span className="font-semibold text-gold">{formatPKR(subtotal)}</span></div>
              <p className="mt-2 text-xs text-muted-foreground">Demo prices. Delivery and taxes to be confirmed by the store.</p>
              <button onClick={() => setPreview(true)} className="btn-gold mt-6 w-full">Checkout preview</button>
              <Link to="/shop" className="btn-outline-gold mt-3 w-full">Continue shopping</Link>
              {preview && (
                <div className="mt-6 rounded-sm border border-border p-4 text-sm text-muted-foreground">
                  This is a demo store — no real order is placed and no payment is taken. Please <Link to="/contact" className="text-gold">contact us</Link> to order.
                  <button onClick={() => { clear(); setPreview(false); }} className="mt-3 block text-xs uppercase tracking-[0.15em] text-gold">Clear cart</button>
                </div>
              )}
            </aside>
          </div>
        )}
      </section>
    </>
  );
}
