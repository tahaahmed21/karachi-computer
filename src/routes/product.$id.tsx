import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useState } from "react";
import { Heart, Minus, Plus, ShoppingBag } from "lucide-react";
import { categoryById, formatPKR, productById, type Category, type Product } from "@/lib/products";
import { useStore } from "@/lib/store-hook";
import { ProductGrid } from "@/components/site/ProductCard";
import { categoryLink } from "@/components/site/links";
import { fetchCatalog } from "@/lib/catalog-api";

export const Route = createFileRoute("/product/$id")({
  loader: async ({ params }) => {
    let product: Product | undefined;
    let category: Category | undefined;
    try {
      const catalog = await fetchCatalog();
      product = catalog
        ? catalog.products.find((item) => item.id === params.id)
        : productById(params.id);
      category = catalog?.categories.find((item) => item.id === product?.category);
    } catch (error) {
      console.error(
        "Could not load product details from Supabase; checking the local catalog.",
        error,
      );
      product = productById(params.id);
    }

    if (!product) throw notFound();
    category ??= categoryById(product.category);
    if (!category) throw notFound();
    return { product, category };
  },
  head: ({ loaderData }) => {
    const p = loaderData?.product;
    const t = p ? `${p.name} | Karachi Computers` : "Product unavailable | Karachi Computers";
    const d = p?.description ?? "This product could not be found.";
    return {
      meta: [
        { title: t },
        { name: "description", content: d },
        { property: "og:title", content: t },
        { property: "og:description", content: d },
        { property: "og:type", content: "product" },
        { name: "twitter:card", content: "summary_large_image" },
      ],
    };
  },
  component: ProductPage,
});

function ProductPage() {
  const { product: p, category: cat } = Route.useLoaderData();
  const { add, toggleWish, inWish, products } = useStore();
  const [img, setImg] = useState(0);
  const [qty, setQty] = useState(1);
  const related = products
    .filter((x) => x.category === p.category && x.id !== p.id)
    .concat(products.filter((x) => x.featured && x.id !== p.id))
    .filter((x, i, a) => a.indexOf(x) === i)
    .slice(0, 4);

  return (
    <>
      <section className="container-kc py-10 md:py-14">
        <nav
          aria-label="Breadcrumb"
          className="mb-8 flex flex-wrap gap-2 text-xs uppercase tracking-[0.2em] text-muted-foreground"
        >
          <Link to="/" className="hover:text-gold">
            Home
          </Link>
          <span className="text-gold">/</span>
          <Link {...categoryLink(cat.id)} className="hover:text-gold">
            {cat.name}
          </Link>
          <span className="text-gold">/</span>
          <span className="text-foreground">{p.name}</span>
        </nav>
        <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">
          <div>
            <div className="overflow-hidden rounded-md border border-gold-line bg-surface">
              <img src={p.images[img]} alt={p.name} className="aspect-square w-full object-cover" />
            </div>
            {p.images.length > 1 && (
              <div className="mt-3 flex gap-3">
                {p.images.map((s, i) => (
                  <button
                    key={i}
                    onClick={() => setImg(i)}
                    aria-label={`Image ${i + 1}`}
                    className={`overflow-hidden rounded-sm border ${i === img ? "border-gold" : "border-border"}`}
                  >
                    <img src={s} alt="" className="h-20 w-20 object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>
          <div className="min-w-0">
            <p className="eyebrow">
              {cat.name} · {p.brand}
            </p>
            <h1 className="mt-4 font-serif text-4xl font-semibold leading-tight md:text-5xl">
              {p.name}
            </h1>
            <p className="mt-4 text-2xl font-semibold text-gold">{formatPKR(p.price)}</p>
            <p className="text-xs text-muted-foreground">Demo price — confirm with the store.</p>
            <div className="gold-rule my-8" />
            <p className="leading-relaxed text-muted-foreground">{p.description}</p>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <div className="flex h-12 items-center rounded-sm border border-border">
                <button
                  onClick={() => setQty(Math.max(1, qty - 1))}
                  aria-label="Decrease quantity"
                  className="grid h-full w-12 place-items-center hover:text-gold"
                >
                  <Minus className="h-4 w-4" />
                </button>
                <span className="w-10 text-center" aria-live="polite">
                  {qty}
                </span>
                <button
                  onClick={() => setQty(qty + 1)}
                  aria-label="Increase quantity"
                  className="grid h-full w-12 place-items-center hover:text-gold"
                >
                  <Plus className="h-4 w-4" />
                </button>
              </div>
              <button onClick={() => add(p.id, qty)} className="btn-gold flex-1">
                <ShoppingBag className="h-4 w-4" /> Add to cart
              </button>
              <button
                onClick={() => toggleWish(p.id)}
                aria-label="Toggle wishlist"
                className="btn-outline-gold w-12 px-0"
              >
                <Heart className={`h-4 w-4 ${inWish(p.id) ? "fill-gold text-gold" : ""}`} />
              </button>
            </div>
            <div className="mt-10">
              <p className="eyebrow mb-4">Specifications (demo)</p>
              <dl className="divide-y divide-border rounded-md border border-border">
                {p.specs.map(([k, v]) => (
                  <div
                    key={k}
                    className="grid grid-cols-[120px_1fr] gap-4 px-4 py-3 text-sm sm:grid-cols-[160px_1fr]"
                  >
                    <dt className="text-muted-foreground">{k}</dt>
                    <dd>{v}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </div>
      </section>
      <section className="container-kc pb-6">
        <h2 className="mb-8 font-serif text-3xl font-semibold">You may also like</h2>
        <ProductGrid items={related} />
      </section>
    </>
  );
}
