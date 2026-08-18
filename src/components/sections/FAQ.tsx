import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    q: "Where do your cashews come from?",
    a: "All our cashews are grown and hand-picked in Tanzania, primarily from the Mtwara and Lindi regions known for the world's finest kernels.",
  },
  {
    q: "How do I place an order?",
    a: "Simply click any 'Order Now' button or message us directly on WhatsApp. We'll confirm your order, share payment details, and arrange delivery.",
  },
  {
    q: "Do you ship internationally?",
    a: "Yes! We ship across East Africa and worldwide. Contact us on WhatsApp for shipping rates to your country.",
  },
  {
    q: "How are the cashews packaged?",
    a: "Each pack is vacuum-sealed in food-grade pouches to lock in freshness and that signature crunch.",
  },
  {
    q: "Do you offer wholesale pricing?",
    a: "Absolutely. We supply supermarkets, cafés, and resellers at preferential rates. Reach out via WhatsApp for our wholesale catalog.",
  },
];

export function FAQ() {
  return (
    <section id="faq" className="py-24 md:py-32">
      <div className="mx-auto max-w-3xl px-6">
        <div className="text-center">
          <div className="text-xs font-medium uppercase tracking-[0.3em] text-accent">FAQ</div>
          <h2 className="mt-4 font-display text-4xl font-bold md:text-5xl">
            Questions, <span className="text-gradient-gold">answered</span>
          </h2>
        </div>
        <Accordion type="single" collapsible className="mt-12">
          {faqs.map((f, i) => (
            <AccordionItem key={i} value={`item-${i}`} className="border-border">
              <AccordionTrigger className="text-left font-display text-lg font-semibold hover:text-primary">
                {f.q}
              </AccordionTrigger>
              <AccordionContent className="text-base text-muted-foreground">{f.a}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}
