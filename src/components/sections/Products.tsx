import raw from "@/assets/cashews-raw.png";
import roasted from "@/assets/cashews-roasted.png";
import salted from "@/assets/cashews-salted.png";
import honey from "@/assets/cashews-honey.png";
import { PRODUCTS, formatTSh } from "@/components/cart/CartContext";
import { QtyStepper } from "@/components/cart/Cart";

const imgs: Record<string, string> = { raw, roasted, salted, honey };
const meta: Record<string, { desc: string; tag?: string }> = {
  raw: { desc: "Pure, unprocessed kernels in their natural state.", tag: "Bestseller" },
  roasted: { desc: "Slow-roasted to bring out a deep, buttery flavor.", tag: "Popular" },
  salted: { desc: "Roasted with a touch of sea salt for the perfect bite." },
  honey: { desc: "Glazed in pure honey & cinnamon — sweet & crunchy.", tag: "New" },
};

export function Products() {
  return (
    <section id="products" className="relative bg-secondary/40 py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mx-auto max-w-2xl text-center">
          <div className="text-xs font-medium uppercase tracking-[0.3em] text-accent">
            Our Collection
          </div>
          <h2 className="mt-4 font-display text-4xl font-bold leading-tight md:text-5xl">
            A flavor for every <span className="text-gradient-gold">craving</span>
          </h2>
          <p className="mt-4 text-muted-foreground">
            Premium cashews, four ways. Pick your quantities — we'll send your order to WhatsApp.
          </p>
        </div>

        <div className="mt-16 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {PRODUCTS.map((p) => {
            const m = meta[p.id];
            return (
              <article
                key={p.id}
                className="group relative flex flex-col overflow-hidden rounded-3xl border border-border bg-card shadow-sm transition-all hover:-translate-y-2 hover:shadow-glow"
              >
                <div className="relative aspect-square overflow-hidden">
                  <img
                    src={imgs[p.id]}
                    alt={p.name}
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  {m.tag && (
                    <span className="absolute left-4 top-4 rounded-full bg-gold px-3 py-1 text-[10px] font-semibold uppercase tracking-wider text-gold-foreground">
                      {m.tag}
                    </span>
                  )}
                </div>
                <div className="flex flex-1 flex-col p-6">
                  <h3 className="font-display text-xl font-bold">{p.name}</h3>
                  <p className="mt-2 flex-1 text-sm text-muted-foreground">{m.desc}</p>
                  <div className="mt-4 font-display text-lg font-semibold text-primary">
                    {formatTSh(p.price)}{" "}
                    <span className="text-xs font-normal text-muted-foreground">/ {p.unit}</span>
                  </div>
                  <QtyStepper id={p.id} />
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
