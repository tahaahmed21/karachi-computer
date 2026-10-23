import { createFileRoute } from "@tanstack/react-router";
import { useState, type FormEvent } from "react";
import { CheckCircle2 } from "lucide-react";
import { business } from "@/lib/products";
import { PageHeader } from "@/components/site/PageHeader";
import { seo } from "@/lib/seo";

export const Route = createFileRoute("/contact")({
  head: () => seo("Contact", "Get in touch with Karachi Computers for help choosing computers, laptops and accessories."),
  component: Contact,
});

type F = { name: string; email: string; subject: string; message: string };

function Contact() {
  const [f, setF] = useState<F>({ name: "", email: "", subject: "", message: "" });
  const [err, setErr] = useState<Partial<F>>({});
  const [sent, setSent] = useState(false);

  const submit = (e: FormEvent) => {
    e.preventDefault();
    const x: Partial<F> = {};
    if (f.name.trim().length < 2) x.name = "Please enter your full name.";
    if (!/^\S+@\S+\.\S+$/.test(f.email)) x.email = "Please enter a valid email.";
    if (!f.subject.trim()) x.subject = "Please add a subject.";
    if (f.message.trim().length < 10) x.message = "Message should be at least 10 characters.";
    setErr(x);
    if (!Object.keys(x).length) setSent(true);
  };
  const field = (k: keyof F, label: string, area = false) => (
    <div>
      <label htmlFor={k} className="mb-2 block text-xs uppercase tracking-[0.18em] text-muted-foreground">{label}</label>
      {area ? (
        <textarea id={k} rows={5} className="field h-auto py-3" value={f[k]} onChange={(e) => setF({ ...f, [k]: e.target.value })} aria-invalid={!!err[k]} />
      ) : (
        <input id={k} className="field" value={f[k]} onChange={(e) => setF({ ...f, [k]: e.target.value })} aria-invalid={!!err[k]} />
      )}
      {err[k] && <p className="mt-1.5 text-xs text-destructive">{err[k]}</p>}
    </div>
  );

  return (
    <>
      <PageHeader eyebrow="Get in touch" title="Contact" intro="Questions about a product or need help choosing? Send us a message." crumb="Contact" />
      <section className="container-kc grid gap-12 py-14 lg:grid-cols-[1fr_360px]">
        {sent ? (
          <div className="rounded-md border border-gold-line bg-surface p-10 text-center">
            <CheckCircle2 className="mx-auto h-10 w-10 text-gold" />
            <p className="mt-4 font-serif text-3xl">Thank you, {f.name.split(" ")[0]}</p>
            <p className="mt-2 text-sm text-muted-foreground">Your message passed validation. This is a demo form, so nothing was actually sent.</p>
            <button onClick={() => { setSent(false); setF({ name: "", email: "", subject: "", message: "" }); }} className="btn-outline-gold mt-6">Send another</button>
          </div>
        ) : (
          <form onSubmit={submit} noValidate className="grid gap-5 sm:grid-cols-2">
            {field("name", "Full name")}
            {field("email", "Email")}
            <div className="sm:col-span-2">{field("subject", "Subject")}</div>
            <div className="sm:col-span-2">{field("message", "Message", true)}</div>
            <button className="btn-gold sm:col-span-2 sm:w-fit">Send message</button>
          </form>
        )}
        <aside className="space-y-6 rounded-md border border-border bg-elevated p-6 text-sm">
          {[["Phone", business.phone], ["Email", business.email], ["Address", business.address], ["Hours", business.hours]].map(([k, v]) => (
            <div key={k}><p className="eyebrow">{k}</p><p className="mt-2 text-muted-foreground">{v || "To be added"}</p></div>
          ))}
        </aside>
      </section>
    </>
  );
}
