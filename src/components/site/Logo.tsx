import { Link } from "@tanstack/react-router";
import logoUrl from "@/assets/kc-logo.png";

export function Logo({ className = "h-12" }: { className?: string }) {
  return (
    <Link to="/" aria-label="Karachi Computers home" className="inline-flex shrink-0">
      <img src={logoUrl} alt="Karachi Computers" className={`${className} w-auto object-contain`} width={890} height={725} />
    </Link>
  );
}
