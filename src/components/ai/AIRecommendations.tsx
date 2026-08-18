import { PRODUCTS, formatTSh } from "@/components/cart/CartContext";
import { useCart } from "@/components/cart/CartContext";
import { QtyStepper } from "@/components/cart/Cart";
import raw from "@/assets/cashews-raw.png";
import roasted from "@/assets/cashews-roasted.png";
import salted from "@/assets/cashews-salted.png";
import honey from "@/assets/cashews-honey.png";
import { Brain, Sparkles } from "lucide-react";

const imgs: Record<string, string> = { raw, roasted, salted, honey };

const preferenceProfiles = {
  health: ["raw", "roasted"],
  sweet: ["honey"],
  savory: ["salted", "roasted"],
  premium: ["honey", "salted"],
  budget: ["raw"],
};

const aiCopy = {
  en: {
    title: "AI-Powered Recommendations",
    desc: "Based on your browsing, we recommend:",
    why: "Why this pick?",
    raw: "Pure, unprocessed goodness — the healthiest choice for nutrient retention.",
    roasted: "Slow-roasted perfection — enhanced flavor without added sugars.",
    salted: "The classic salty-sweet balance — crowd-pleasing favorite.",
    honey: "Indulgent treat — honey-glazed for natural sweetness lovers.",
  },
  sw: {
    title: "Pendekezo kwa AI",
    desc: "Kulingana na upatikanaji wako, tunapendekeza:",
    why: "Kwa nini kuchagua hii?",
    raw: "Usafi wa asili — chaguo bora kwa afya yako.",
    roasted: "Choma kwa upishi — ladha iliyoongezwa bila sukari.",
    salted: "Usawa wa chumvi na matunda — kinafikiwa sana.",
    honey: "Treat ya ladha — korosho kilichoangwa na asali.",
  },
};

export function AIRecommendations({
  lang = "en",
  userPreference = "health",
}: {
  lang?: "en" | "sw";
  userPreference?: keyof typeof preferenceProfiles;
}) {
  const { items } = useCart();
  const t = aiCopy[lang];

  const recommendedIds = preferenceProfiles[userPreference] ?? preferenceProfiles.health;

  const recommendations = recommendedIds
    .map((id) => PRODUCTS.find((p) => p.id === id))
    .filter((p): p is NonNullable<typeof p> => !!p)
    .sort((a, b) => {
      const aInCart = items[a.id] ?? 0;
      const bInCart = items[b.id] ?? 0;
      return aInCart - bInCart;
    })
    .slice(0, 3);

  return (
    <section className="relative bg-gradient-to-b from-gold/5 to-transparent py-16">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mx-auto max-w-2xl text-center">
          <div className="inline-flex items-center gap-2 text-xs font-medium uppercase tracking-[0.3em] text-gold">
            <Brain className="h-3 w-3" />
            {t.title}
          </div>
          <p className="mt-3 text-sm text-muted-foreground">{t.desc}</p>
        </div>

        <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-3">
          {recommendations.map((p) => (
            <article
              key={p.id}
              className="group relative flex flex-col overflow-hidden rounded-2xl border border-gold/20 bg-card transition-all hover:-translate-y-1 hover:shadow-glow"
            >
              <div className="relative aspect-square overflow-hidden">
                <img
                  src={imgs[p.id]}
                  alt={p.name}
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute top-3 right-3 rounded-full bg-gold/90 px-2 py-1 text-[10px] font-bold text-gold-foreground">
                  <Sparkles className="mr-1 inline h-3 w-3" />
                  AI Pick
                </div>
              </div>
              <div className="flex flex-1 flex-col p-5">
                <h3 className="font-display text-lg font-bold">{p.name}</h3>
                <p className="mt-2 flex-1 text-xs text-muted-foreground">
                  {t[p.id as keyof typeof t]}
                </p>
                <div className="mt-3 font-display text-base font-semibold text-primary">
                  {formatTSh(p.price)}{" "}
                  <span className="text-xs font-normal text-muted-foreground">/ {p.unit}</span>
                </div>
                <QtyStepper id={p.id} />
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
