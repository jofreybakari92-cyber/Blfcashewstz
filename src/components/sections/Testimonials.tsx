import { Star, MapPin } from "lucide-react";
import { useI18n } from "../../lib/i18n";

const reviews = [
  {
    name: "Amina H.",
    role: "Dar es Salaam",
    country: "Tanzania",
    flag: "🇹🇿",
    text: "These are hands down the freshest cashews I've ever tasted. The honey ones are addictive!",
    rating: 5,
    color: "from-pink-400 to-rose-500",
  },
  {
    name: "James K.",
    role: "Nairobi",
    country: "Kenya",
    flag: "🇰🇪",
    text: "Premium quality, fast delivery, and beautiful packaging. BLF has become our family's go-to snack.",
    rating: 5,
    color: "from-blue-400 to-indigo-500",
  },
  {
    name: "Sofia M.",
    role: "London",
    country: "United Kingdom",
    flag: "🇬🇧",
    text: "Finally, real Tanzanian cashews abroad. The crunch and flavor are unmatched. Highly recommend.",
    rating: 5,
    color: "from-emerald-400 to-teal-500",
  },

  {
    name: "Fatima A.",
    role: "Dubai",
    country: "UAE",
    flag: "🇦🇪",
    text: "BLF cashews are a hit at our family gatherings. Everyone asks where I got them. Exceptional quality!",
    rating: 5,
    color: "from-violet-400 to-purple-500",
  },
  {
    name: "Wei L.",
    role: "Shanghai",
    country: "China",
    flag: "🇨🇳",
    text: "Discovered BLF through a friend and now I'm a loyal customer. The natural cashews are perfect for my health-conscious diet.",
    rating: 4,
    color: "from-cyan-400 to-blue-500",
  },
  {
    name: "Priya S.",
    role: "Mumbai",
    country: "India",
    flag: "🇮🇳",
    text: "The best cashews outside of Goa! BLF delivers authentic Tanzanian flavor right to my doorstep.",
    rating: 5,
    color: "from-red-400 to-pink-500",
  },
];

function ReviewCard({ r, idx }: { r: (typeof reviews)[0]; idx: number }) {
  return (
    <figure
      className="group rounded-3xl bg-foreground/5 p-8 backdrop-blur-sm ring-1 ring-foreground/10 transition-all hover:bg-foreground/10 hover:-translate-y-1 animate-slide-in-up"
      style={{ animationDelay: `${idx * 0.12}s` }}
    >
      <div className="flex items-center gap-4">
        <div
          className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-gradient-to-br ${r.color} text-white font-bold text-lg shadow-lg animate-glow-pulse`}
        >
          {r.name.charAt(0)}
        </div>
        <div className="min-w-0">
          <div className="font-semibold text-foreground truncate">{r.name}</div>
          <div className="flex items-center gap-1 text-sm text-foreground/60">
            <MapPin className="h-3 w-3 shrink-0" />
            <span className="truncate">{r.role}</span>
          </div>
        </div>
        <div className="ml-auto text-right shrink-0">
          <div className="text-2xl">{r.flag}</div>
          <div className="text-[10px] text-foreground/50 leading-tight">{r.country}</div>
        </div>
      </div>
      <div className="mt-4 flex gap-1 text-gold">
        {Array.from({ length: 5 }).map((_, i) => (
          <Star key={i} className={`h-4 w-4 ${i < r.rating ? "fill-current" : "opacity-30"}`} />
        ))}
      </div>
      <blockquote className="mt-4 font-display text-lg leading-relaxed text-foreground/90">
        &ldquo;{r.text}&rdquo;
      </blockquote>
    </figure>
  );
}

export function Testimonials() {
  const { t } = useI18n();

  return (
    <section id="reviews" className="relative bg-background py-24 text-foreground md:py-32">
      <div className="absolute inset-0 bg-grain opacity-20" />
      <div className="relative mx-auto max-w-7xl px-6">
        <div className="mx-auto max-w-2xl text-center">
          <div className="text-xs font-medium uppercase tracking-[0.3em] text-gold">
            {t("testimonials.badge")}
          </div>
          <h2 className="mt-4 font-display text-4xl font-bold leading-tight md:text-5xl">
            {t("testimonials.title")}{" "}
            <span className="text-gradient-gold">{t("testimonials.titleAccent")}</span>
          </h2>
        </div>

        <div className="mt-16 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {reviews.map((r, idx) => (
            <ReviewCard key={r.name} r={r} idx={idx} />
          ))}
        </div>

        <div className="mt-16 overflow-hidden">
          <div className="flex animate-marquee whitespace-nowrap">
            {[...reviews, ...reviews].map((r, i) => (
              <div
                key={`${r.name}-${i}`}
                className="mx-4 flex items-center gap-3 rounded-full bg-foreground/5 px-5 py-2.5 ring-1 ring-foreground/10"
              >
                <span className="text-xl">{r.flag}</span>
                <span className="font-medium text-foreground/80">{r.name}</span>
                <span className="text-foreground/40">•</span>
                <span className="text-sm text-foreground/60">
                  {r.role}, {r.country}
                </span>
                <span className="text-gold text-sm">{"★".repeat(r.rating)}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
