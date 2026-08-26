import { useState, useEffect } from "react";
import heroImg from "@/assets/hero-cashews.jpg";
import honeyImg from "@/assets/cashews-honey.png";
import rawImg from "@/assets/cashews-raw.png";
import roastedImg from "@/assets/cashews-roasted.png";
import saltedImg from "@/assets/cashews-salted.png";
// Use bundler-resolved URL so runtime gets the hashed asset path (Vite/modern bundlers support `?url`)
import videoUrl from "@/assets/DVGPs3qDGgk(MP4).mp4?url";
import { waLink } from "../WhatsAppButton";
import { useI18n } from "@/lib/i18n";

const ArrowRight = ({ className = "" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M5 12h14" />
    <path d="m12 5 7 7-7 7" />
  </svg>
);

const MessageCircle = ({ className = "" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5Z" />
  </svg>
);

const Leaf = ({ className = "" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 3.5 21 4 21 4s.5 5.5-2.1 11.2A7 7 0 0 1 11 20Z" />
    <path d="M11 20c0-4.5 1.5-8 6-11" />
  </svg>
);

export function Hero() {
  const { t } = useI18n();
  const [activeImg, setActiveImg] = useState(heroImg);
  const [isPaused, setIsPaused] = useState(false);

  // Automatic shuffle (slideshow)
  useEffect(() => {
    // Array of all images to cycle through
    const allImages = [heroImg, roastedImg, saltedImg, honeyImg, rawImg];

    if (isPaused) return;
    const interval = setInterval(() => {
      setActiveImg((current) => {
        const currentIndex = allImages.indexOf(current);
        const nextIndex = (currentIndex + 1) % allImages.length;
        return allImages[nextIndex];
      });
    }, 3500); // Shuffles every 3.5 seconds

    return () => clearInterval(interval);
  }, [isPaused]);

  return (
    <section id="top" className="relative overflow-hidden pt-32 pb-20 md:pt-40 md:pb-28">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <video
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 h-full w-full object-cover"
        >
          <source src={videoUrl} type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-background/70" />
      </div>
      <div className="absolute inset-0 bg-grain opacity-40" />
      <div className="absolute -top-32 -right-32 h-96 w-96 rounded-full bg-gold/20 blur-3xl" />
      <div className="absolute -bottom-40 -left-32 h-96 w-96 rounded-full bg-primary/15 blur-3xl" />

      <div className="relative mx-auto grid max-w-7xl grid-cols-1 items-center gap-12 px-6 lg:grid-cols-2">
        {/* ── Left column ──────────────────────────────────────── */}
        <div className="animate-fade-up">
          <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-1.5 text-xs font-medium tracking-wider uppercase text-primary">
            <Leaf className="h-3.5 w-3.5" />
            {t("hero.badge")}
          </div>
          <h1 className="mt-6 font-display text-5xl font-bold leading-[1.05] tracking-tight md:text-7xl lg:text-8xl">
            <span className="inline-block animate-shimmer bg-linear-to-r from-foreground via-gold to-foreground bg-clip-text text-transparent">
              {t("hero.title1")}
            </span>
            <span
              className="block text-gradient-gold animate-shimmer"
              style={{ animationDelay: "0.5s" }}
            >
              {t("hero.title2")}
            </span>
          </h1>
          <p className="mt-6 max-w-lg text-lg leading-relaxed text-muted-foreground md:text-xl">
            {t("hero.desc")}
          </p>

          <div className="mt-10 flex flex-wrap gap-4">
            <a
              href="#products"
              className="group inline-flex items-center gap-2 rounded-full bg-primary px-7 py-4 text-sm font-semibold text-primary-foreground shadow-soft transition-all hover:shadow-glow hover:-tr[...]"
            >
              {t("hero.orderNow")}
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </a>
            <a
              href={waLink("Hello BLF Cashews! I'd like to know more.")}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-7 py-4 text-sm font-semibold text-foreground transition-all hover:border-whatsapp hover:text-wh[...]"
            >
              <MessageCircle className="h-4 w-4" />
              {t("hero.chatWhatsApp")}
            </a>
          </div>

          {/* Stats */}
          <div className="mt-12 grid grid-cols-3 gap-6 border-t border-border pt-8">
            {[
              { n: t("hero.stat1"), l: t("hero.stat1Label"), d: "0s", icon: "🌿" },
              { n: t("hero.stat2"), l: t("hero.stat2Label"), d: "0.2s", icon: "⭐" },
              { n: t("hero.stat3"), l: t("hero.stat3Label"), d: "0.4s", icon: "😊" },
            ].map((s) => (
              <div
                key={s.l}
                className="group relative rounded-2xl border border-border/50 bg-card/40 p-5 text-center transition-all hover:border-gold/40 hover:shadow-glow animate-stat-bounce"
                style={{ animationDelay: s.d }}
              >
                <div className="absolute inset-0 rounded-2xl animate-pulse-ring pointer-events-none" />
                <div className="text-2xl mb-1 transition-transform group-hover:scale-125">
                  {s.icon}
                </div>
                <div className="font-display text-2xl font-bold text-primary md:text-3xl animate-count-glow">
                  {s.n}
                </div>
                <div className="text-xs uppercase tracking-wider text-muted-foreground">{s.l}</div>
              </div>
            ))}
          </div>

          {/* Powered by marquee */}
          <div className="relative z-10 w-full max-w-7xl border-t border-white/5 pt-12 overflow-hidden">
            <div className="flex flex-col md:flex-row items-center">
              <div className="flex items-center gap-4 border-r border-white/20 pr-8 z-20 mb-0 md:mb-0">
                <span className="text-[10px] uppercase tracking-widest font-black text-gray-500 whitespace-nowrap leading-tight">
                  Powered by
                  <br />
                  best teams
                </span>
              </div>
              <div className="relative flex overflow-hidden group flex-1">
                <div className="flex animate-marquee whitespace-nowrap gap-16 items-center">
                  {[
                    t("hero.partner1"),
                    t("hero.partner2"),
                    t("hero.partner3"),
                    t("hero.partner4"),
                    t("hero.partner5"),
                    t("hero.partner6"),
                  ]
                    .concat([
                      t("hero.partner1"),
                      t("hero.partner2"),
                      t("hero.partner3"),
                      t("hero.partner4"),
                      t("hero.partner5"),
                      t("hero.partner6"),
                    ])
                    .map((name, i) => (
                      <span
                        key={i}
                        className="text-sm font-semibold text-white/40 grayscale hover:text-white hover:opacity-100 transition-opacity"
                      >
                        {name}
                      </span>
                    ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ── Right column ─────────────────────────────────────── */}
        <div
          className="relative animate-fade-up lg:pl-8 -mt-12 lg:-mt-16"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          {/* Enhanced background glow */}
          <div className="absolute inset-0 -m-8 rounded-[3rem] bg-gradient-to-br from-gold/30 via-primary/10 to-transparent blur-3xl opacity-70" />

          {/* Big Main Image Container */}
          <div className="relative overflow-hidden rounded-[2.5rem] border border-white/20 shadow-[0_20px_50px_rgba(0,0,0,0.15)] group transition-shadow duration-700 hover:shadow-[0_30px_60px_rgb[...]">
            <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent z-10 pointer-events-none transition-opacity duration-500 group-hover:opacity-0" />
            <img
              src={activeImg}
              alt="Premium Tanzanian cashews"
              width={1600}
              height={1280}
              className="h-full w-full object-cover transition-transform duration-1000 group-hover:scale-105 transform-gpu [backface-visibility:hidden]"
            />
          </div>

          {/* Premium Floating Dock for Product Samples */}
          <div
            className="absolute -bottom-8 left-8 hidden md:flex items-center gap-0.5 rounded-[1.5rem] border border-white/40 bg-white/30 p-1.5 shadow-[0_8px_30px_rgb(0,0,0,0.12)] backdrop-blur-xl[...]"
            style={{ animationDelay: "0.3s" }}
          >
            {[{
              img: roastedImg, label: "Roasted", sub: "Lightly sea-salted"
            },{
              img: saltedImg, label: "Salted", sub: "Crunchy classic"
            },{
              img: honeyImg, label: "Honey", sub: "Sweet & buttery"
            },{
              img: rawImg, label: "Raw", sub: "100% natural"
            }].map((p, i) => (
              <div
                key={p.label}
                onMouseEnter={() => setActiveImg(p.img)}
                className="group/item relative flex items-center gap-1 rounded-xl p-1 pr-3 transition-all duration-300 hover:bg-white/90 cursor-pointer opacity-100 group-hover/dock:opacity-50 hov[...]"
              >
                <div className="relative h-8 w-12 shrink-0 overflow-hidden rounded-lg border border-white/60 shadow-sm transition-transform duration-500 group-hover/item:scale-110 group-hover/ite[...]">
                  <img
                    src={p.img}
                    alt={`BLF ${p.label} cashews`}
                    className="h-full w-full object-cover"
                  />
                </div>
                <div className="flex flex-col">
                  <div className="font-display text-xs font-bold leading-none text-foreground/90 transition-colors group-hover/item:text-primary">
                    {p.label}
                  </div>
                  <div className="mt-0.5 text-[8px] uppercase tracking-widest text-muted-foreground font-semibold">
                    {p.sub}
                  </div>
                </div>
              </div>
            ))
          }
          </div>
        </div>
      </div>
    </section>
  );
}
