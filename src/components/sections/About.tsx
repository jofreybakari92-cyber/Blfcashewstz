import { useState, useEffect, useCallback } from "react";
import cho3 from "@/assets/cho3.mp4";
import cho4 from "@/assets/cho4.mp4";
import cho5 from "@/assets/cho5.mp4";
import cosh from "@/assets/cosh.mp4";
import cosh02 from "@/assets/cosh02.mp4";
import userSpace from "@/assets/cashews-process.png";

const slides = [
  { src: cho3, label: "Processing" },
  { src: cho4, label: "Roasting" },
  { src: cho5, label: "Sorting" },
  { src: cosh, label: "Packing" },
  { src: cosh02, label: "Honey Glazed" },
];

const INTERVAL = 3500;

export function About() {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);

  const next = useCallback(() => setActive((i) => (i + 1) % slides.length), []);
  const prev = useCallback(() => setActive((i) => (i - 1 + slides.length) % slides.length), []);

  useEffect(() => {
    if (paused) return;
    const id = setInterval(next, INTERVAL);
    return () => clearInterval(id);
  }, [next, paused]);

  return (
    <section id="about" className="relative py-24 md:py-32">
      <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-16 px-6 lg:grid-cols-2">
        <div className="relative">
          {/* Video carousel frame */}
          <div
            className="relative aspect-[4/3] overflow-hidden rounded-4xl border border-border shadow-soft"
            aria-label="Cashew processing video carousel"
            onMouseEnter={() => setPaused(true)}
            onMouseLeave={() => setPaused(false)}
          >
            {/* Background colour — fallback behind poster and videos */}
            <div className="absolute inset-0 bg-slate-900" />

            {/* Poster fallback — sits behind videos, remains visible while they load */}
            <img
              src={userSpace}
              alt=""
              aria-hidden="true"
              className="absolute inset-0 h-full w-full object-cover"
            />

            {/* Gradient vignette — sits above everything */}
            <div className="pointer-events-none absolute inset-0 rounded-4xl bg-linear-to-t from-black/20 via-transparent to-transparent" />

            {/* Slides — absolute stacked, only active is visible */}
            {slides.map((slide, i) => (
              <video
                key={slide.src}
                src={slide.src}
                autoPlay
                loop
                muted
                playsInline
                poster={userSpace}
                className="absolute inset-0 h-full w-full object-cover transition-all duration-700 ease-in-out"
                style={{
                  opacity: i === active ? 1 : 0,
                  transform: i === active ? "scale(1)" : "scale(1.05)",
                }}
              />
            ))}

            {/* Prev / Next buttons */}
            <button
              type="button"
              onClick={prev}
              aria-label="Previous video"
              className="absolute left-3 top-1/2 -translate-y-1/2 rounded-full bg-white/80 p-2 text-slate-900 shadow-md backdrop-blur-sm transition hover:bg-white"
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <polyline points="15 18 9 12 15 6" />
              </svg>
            </button>
            <button
              type="button"
              onClick={next}
              aria-label="Next video"
              className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full bg-white/80 p-2 text-slate-900 shadow-md backdrop-blur-sm transition hover:bg-white"
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <polyline points="9 18 15 12 9 6" />
              </svg>
            </button>

            {/* Slide counter */}
            <div className="absolute bottom-3 left-3 rounded-full bg-black/40 px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-white backdrop-blur-sm">
              {active + 1} / {slides.length}
            </div>
          </div>

          {/* Dot indicators */}
          <div className="mt-4 flex justify-center gap-2">
            {slides.map((s, i) => (
              <button
                key={s.label}
                type="button"
                onClick={() => setActive(i)}
                aria-label={`Show ${s.label} video`}
                className={`h-2 rounded-full transition-all duration-300 ${
                  i === active ? "w-6 bg-emerald-600" : "w-2 bg-gray-300 hover:bg-gray-400"
                }`}
              />
            ))}
          </div>

          {/* Shadow badge card */}
          <div className="absolute -bottom-8 -right-8 hidden max-w-xs rounded-2xl border border-border bg-card p-6 shadow-soft md:block">
            <div className="font-display text-4xl font-bold text-gradient-gold">100%</div>
            <div className="mt-1 text-sm text-muted-foreground">
              Pure Tanzanian cashews from farm to table.
            </div>
          </div>
        </div>

        <div>
          <div className="text-xs font-medium uppercase tracking-[0.3em] text-accent">
            Our Story
          </div>
          <h2 className="mt-4 font-display text-4xl font-bold leading-tight md:text-5xl">
            Rooted in Tanzania,
            <br />
            <span className="text-gradient-gold">crafted with care.</span>
          </h2>
          <div className="mt-6 space-y-4 text-base leading-relaxed text-muted-foreground md:text-lg">
            <p>
              BLF Cashews is born from the sun-warmed coastal plains of Tanzania, where the
              world&apos;s creamiest, most flavorful cashews are grown. We work directly with local
              farmers to bring you nuts that are picked at peak ripeness and processed with care.
            </p>
            <p>
              Every batch is roasted to crisp perfection, sealed for freshness, and shipped with
              love &mdash; a wholesome, healthy snack made the way nature intended.
            </p>
          </div>

          {/* YouTube Video Section */}
          <div className="mt-8">
            <div className="text-sm font-medium text-accent mb-3">Watch Our Story</div>
            <div className="relative aspect-video rounded-2xl overflow-hidden shadow-lg border border-border">
              <iframe
                src="https://www.youtube.com/embed/lxlWowvENec?autoplay=0&rel=0&modestbranding=1"
                title="BLF Cashews - From Farm to Table"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                loading="lazy"
                className="absolute inset-0 h-full w-full"
              />
            </div>
          </div>

          <div className="mt-8 grid grid-cols-2 gap-4">
            {["Single-Origin Tanzania", "No Preservatives", "Slow Roasted", "Farm Fresh"].map(
              (t) => (
                <div
                  key={t}
                  className="rounded-xl border border-border bg-card px-4 py-3 text-sm font-medium"
                >
                  ✓ {t}
                </div>
              ),
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
