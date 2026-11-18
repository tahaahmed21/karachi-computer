import { Link } from "@tanstack/react-router";
import { Logo } from "./Logo";
import { business } from "@/lib/products";
import { categoryLink } from "./links";
import { useStore } from "@/lib/store-hook";

export function Footer() {
  const { categories } = useStore();
  return (
    <footer className="relative mt-24 border-t border-gold-line bg-surface">
      <div className="absolute inset-0 hex-bg opacity-50" />
      <div className="container-kc relative grid gap-12 py-16 md:grid-cols-12">
        <div className="md:col-span-4">
          <Logo className="h-24" />
          <p className="mt-6 max-w-xs text-sm leading-relaxed text-muted-foreground">
            Computer systems, laptops and accessories — curated for work, gaming and everyday
            performance.
          </p>
        </div>
        <div className="md:col-span-3">
          <p className="eyebrow">Categories</p>
          <ul className="mt-5 space-y-3 text-sm">
            {categories.map((c) => (
              <li key={c.id}>
                <Link
                  {...categoryLink(c.id)}
                  className="text-muted-foreground transition-colors hover:text-gold"
                >
                  {c.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div className="md:col-span-2">
          <p className="eyebrow">Quick links</p>
          <ul className="mt-5 space-y-3 text-sm">
            {(
              [
                ["/shop", "Shop"],
                ["/deals", "Deals"],
                ["/about", "About"],
                ["/faq", "FAQ"],
                ["/contact", "Contact"],
                ["/wishlist", "Wishlist"],
                ["/cart", "Cart"],
              ] as const
            ).map(([to, l]) => (
              <li key={to}>
                <Link to={to} className="text-muted-foreground transition-colors hover:text-gold">
                  {l}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div className="md:col-span-3">
          <p className="eyebrow">Contact</p>
          <ul className="mt-5 space-y-3 text-sm text-muted-foreground">
            <li>Phone: {business.phone || "To be added"}</li>
            <li>Email: {business.email || "To be added"}</li>
            <li>Address: {business.address || "To be added"}</li>
          </ul>
          {business.socials.length > 0 && (
            <div className="mt-5 flex gap-4 text-sm">
              {business.socials.map((s) => (
                <a key={s.href} href={s.href} className="text-gold hover:text-gold-bright">
                  {s.label}
                </a>
              ))}
            </div>
          )}
        </div>
      </div>
      <div className="gold-rule relative" />
      <div className="container-kc relative flex flex-col items-center justify-between gap-3 py-6 text-xs text-muted-foreground md:flex-row">
        <p>© {new Date().getFullYear()} Karachi Computers. All rights reserved.</p>
        <div className="flex gap-6">
          <Link to="/privacy" className="hover:text-gold">
            Privacy Policy
          </Link>
          <Link to="/terms" className="hover:text-gold">
            Terms & Conditions
          </Link>
        </div>
      </div>
    </footer>
  );
}
