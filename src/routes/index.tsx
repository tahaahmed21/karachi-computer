import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { ArrowRight, ArrowUpRight, Cpu, HelpCircle, Laptop, Mouse } from "lucide-react";
import hero from "@/assets/hero-pc.jpg";
import signature from "@/assets/signature-setup.jpg";
import { categories, products, type CategoryId } from "@/lib/products";
import { ProductGrid } from "@/components/site/ProductCard";
import { categoryLink } from "@/components/site/links";
import { seo } from "@/lib/seo";

export const Route = createFileRoute("/")({
  head: () => seo("Power Meets Precision", "Discover computers, laptops and essential technology for work, gaming and everyday performance at Karachi Computers."),
  component: Index,
});

const tabs: { id: "all" | CategoryId; label: string }[] = [
  { id: "all", label: "All" },
  { id: "gaming-pcs", label: "Gaming PCs" },
  { id: "laptops", label: "Laptops" },
  { id: "components", label: "Components" },
  { id: "monitors", label: "Monitors" },
];

function Index() {
  const [tab, setTab] = useState<(typeof tabs)[number]["id"]>("all");
  const featured = products.filter((p) => p.featured && (tab === "all" || p.category === tab)).slice(0, 8);

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden border-b border-border">
        <div className="absolute inset-0 hex-bg" />
        <div className="container-kc relative grid items-center gap-10 py-12 md:py-20 lg:grid-cols-12">
          <div className="reveal lg:col-span-5">
            <p className="eyebrow">Karachi Computers · Technology, refined</p>
            <h1 className="mt-6 font-serif text-5xl font-semibold leading-[0.95] sm:text-6xl md:text-7xl xl:text-8xl">
              Power Meets <span className="italic text-gold-gradient">Precision.</span>
            </h1>
            <div className="gold-rule my-8 w-40" />
            <p className="max-w-md text-base leading-relaxed text-muted-foreground">
              Discover computers, laptops and essential technology for work, gaming and everyday performance.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link to="/shop" className="btn-gold">Explore Collection <ArrowRight className="h-4 w-4" /></Link>
              <Link to="/laptops" className="btn-outline-gold">Shop Laptops</Link>
            </div>
          </div>
          <div className="relative lg:col-span-7">
            <div className="absolute -inset-px rounded-md border border-gold-line" />
            <img src={hero} alt="Premium black tower desktop PC with gold lighting" width={1600} height={1280}
              className="relative aspect-[5/4] w-full rounded-md object-cover" />
            <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between gap-4 rounded-sm border border-gold-line bg-background/80 p-4 backdrop-blur sm:left-auto sm:w-72">
              <div className="min-w-0">
                <p className="text-[0.65rem] uppercase tracking-[0.25em] text-gold">Featured build</p>
                <p className="truncate font-serif text-lg">Aurum Tower X1</p>
              </div>
              <Link to="/product/$id" params={{ id: "aurum-tower-x1" }} aria-label="View Aurum Tower X1" className="grid h-9 w-9 shrink-0 place-items-center rounded-full border border-gold text-gold hover:bg-gold hover:text-primary-foreground">
                <ArrowUpRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="container-kc py-20">
        <div className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
          <div>
            <p className="eyebrow">Shop by category</p>
            <h2 className="mt-3 font-serif text-4xl font-semibold md:text-5xl">Every part of your setup.</h2>
          </div>
          <Link to="/categories" className="text-xs uppercase tracking-[0.2em] text-gold hover:text-gold-bright">All categories →</Link>
        </div>
        <div className="mt-10 grid grid-cols-2 gap-3 md:grid-cols-4 md:gap-4">
          {categories.map((c, i) => (
            <Link key={c.id} {...categoryLink(c.id)}
              className={`group relative overflow-hidden rounded-md border border-border transition-colors hover:border-gold ${i === 0 || i === 5 ? "md:col-span-2 md:row-span-2" : ""}`}>
              <img src={c.image} alt={c.name} loading="lazy" className="aspect-square h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" />
              <div className="absolute inset-0 bg-gradient-to-t from-background via-background/30 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-2 p-3 md:p-5">
                <div className="min-w-0">
                  <h3 className="font-serif text-lg font-semibold leading-tight md:text-2xl">{c.name}</h3>
                  <p className="mt-1 hidden text-xs text-muted-foreground sm:block">{c.label}</p>
                </div>
                <ArrowUpRight className="h-4 w-4 shrink-0 text-gold transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Featured */}
      <section className="border-y border-border bg-surface py-20">
        <div className="container-kc">
          <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
            <div>
              <p className="eyebrow">Curated</p>
              <h2 className="mt-3 font-serif text-4xl font-semibold md:text-5xl">Featured Collection</h2>
              <p className="mt-3 max-w-md text-sm text-muted-foreground">A selection of systems, laptops and components from our catalogue.</p>
            </div>
            <div className="flex gap-2 overflow-x-auto pb-1">
              {tabs.map((t) => (
                <button key={t.id} onClick={() => setTab(t.id)}
                  className={`shrink-0 rounded-sm border px-4 py-2 text-xs uppercase tracking-[0.15em] transition-colors ${tab === t.id ? "border-gold bg-gold text-primary-foreground" : "border-border text-muted-foreground hover:border-gold-line hover:text-foreground"}`}>
                  {t.label}
                </button>
              ))}
            </div>
          </div>
          <div className="mt-10"><ProductGrid items={featured} /></div>
          <div className="mt-10 text-center"><Link to="/shop" className="btn-outline-gold">View all products</Link></div>
        </div>
      </section>

      {/* Signature */}
      <section className="relative overflow-hidden">
        <img src={signature} alt="Dark desk setup with gold lighting" loading="lazy" className="absolute inset-0 h-full w-full object-cover object-right" />
        <div className="absolute inset-0" style={{ background: "var(--gradient-fade)" }} />
        <div className="absolute inset-0 hex-bg opacity-40" />
        <div className="container-kc relative py-28 md:py-40">
          <p className="eyebrow">The next chapter</p>
          <h2 className="mt-5 max-w-xl font-serif text-5xl font-semibold leading-none md:text-7xl">
            Built for <span className="text-gold-gradient">What's Next.</span>
          </h2>
          <p className="mt-6 max-w-md text-muted-foreground">From focused workstations to high-performance gaming builds — find the setup that moves with you.</p>
          <Link to="/gaming-pcs" className="btn-gold mt-10">Discover Gaming PCs <ArrowRight className="h-4 w-4" /></Link>
        </div>
      </section>

      {/* Services */}
      <section className="container-kc py-20">
        <div className="grid gap-px overflow-hidden rounded-md border border-border bg-border sm:grid-cols-2 lg:grid-cols-4">
          {[
            { icon: Cpu, t: "Explore Computer Hardware", d: "Desktops, gaming PCs and components in one place.", to: "/desktop-computers" as const },
            { icon: Laptop, t: "Find Technology for Your Needs", d: "Laptops for study, work and play.", to: "/laptops" as const },
            { icon: Mouse, t: "Browse Accessories", d: "Keyboards, mice, headsets and more.", to: "/accessories" as const },
            { icon: HelpCircle, t: "Get Help Choosing Products", d: "Send us a message and we'll help.", to: "/contact" as const },
          ].map(({ icon: I, t, d, to }) => (
            <Link key={t} to={to} className="group bg-background p-8 transition-colors hover:bg-elevated">
              <I className="h-6 w-6 text-gold" />
              <h3 className="mt-6 font-serif text-xl font-semibold">{t}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{d}</p>
            </Link>
          ))}
        </div>
      </section>
    </>
  );
}
