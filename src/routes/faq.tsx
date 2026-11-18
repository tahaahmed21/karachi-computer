import { createFileRoute } from "@tanstack/react-router";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { PageHeader } from "@/components/site/PageHeader";
import { seo } from "@/lib/seo";

const faqs: [string, string][] = [
  [
    "Are the prices on the website final?",
    "Prices shown are placeholder demo values. Please contact the store to confirm current pricing.",
  ],
  [
    "Can I place an order online?",
    "Not yet — the cart is a preview. Contact us to order the products you've selected.",
  ],
  [
    "Can you help me choose a computer?",
    "Yes. Send us a message with what you need it for and we'll help you choose.",
  ],
  ["Is my cart saved?", "Your cart and wishlist are saved in your own browser on this device."],
];

export const Route = createFileRoute("/faq")({
  head: () => seo("FAQ", "Answers to common questions about shopping at Karachi Computers."),
  component: () => (
    <>
      <PageHeader eyebrow="Help" title="Frequently asked" crumb="FAQ" />
      <section className="container-kc max-w-3xl py-14">
        <Accordion type="single" collapsible>
          {faqs.map(([q, a]) => (
            <AccordionItem key={q} value={q}>
              <AccordionTrigger className="font-serif text-lg hover:text-gold hover:no-underline">
                {q}
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground">{a}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </section>
    </>
  ),
});
