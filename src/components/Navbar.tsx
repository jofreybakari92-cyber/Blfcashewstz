import { useEffect, useState } from "react";
import { Menu, X, Globe, Sun, Moon } from "lucide-react";
import { CartButton } from "./cart/Cart";
import { useCart } from "./cart/CartContext";
import { useI18n, useTheme } from "../lib/i18n";
import blfLogo from "@/assets/blf logo.jpg";

const links = [
  { href: "#about", labelKey: "nav.about" },
  { href: "#products", labelKey: "nav.products" },
  { href: "#why", labelKey: "nav.whyUs" },
  { href: "#reviews", labelKey: "nav.reviews" },
  { href: "#faq", labelKey: "nav.faq" },
  { href: "#contact", labelKey: "nav.contact" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const { lang, setLang, t } = useI18n();
  const { theme, toggleTheme } = useTheme();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const toggleLang = () => setLang(lang === "en" ? "sw" : "en");

  return (
    <>
      <nav className="fixed top-4 left-0 flex justify-center z-50 w-screen">
        <div
          className={`${
            scrolled ? "w-[25vw]" : "w-[45vw]"
          } min-w-fit gap-16 flex items-center justify-between bg-amber-900/90 dark:bg-amber-950/90 backdrop-blur-xl border border-amber-800/30 px-6 py-2.5 rounded-full shadow-2xl transition-all duration-300 ease-in-out`}
        >
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
            className="flex items-center bg-amber-50 px-4 py-1.5 rounded-full hover:opacity-80 transition-opacity cursor-pointer"
          >
            <img src={blfLogo} alt="BLF Logo" className="h-6 w-auto" />
          </a>

          <nav className="hidden items-center gap-8 md:flex">
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                className="text-sm font-medium text-amber-50/90 transition-colors hover:text-amber-200"
              >
                {t(l.labelKey)}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <CartButton />
            <button
              onClick={toggleTheme}
              aria-label={t("nav.toggleTheme")}
              className="flex h-10 w-10 items-center justify-center rounded-full text-amber-50/70 transition-colors hover:bg-amber-800/30 hover:text-amber-50"
            >
              {theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
            </button>
            <button
              onClick={toggleLang}
              aria-label="Switch language"
              className="flex h-10 w-10 items-center justify-center rounded-full text-amber-50/70 transition-colors hover:bg-amber-800/30 hover:text-amber-50"
            >
              <Globe className="h-4 w-4" />
              <span className="ml-1 text-[10px] font-bold uppercase">{lang}</span>
            </button>
            <OrderCta />

            <button
              onClick={() => setOpen((o) => !o)}
              className="flex h-10 w-10 items-center justify-center rounded-full text-amber-50 md:hidden"
              aria-label="Menu"
            >
              {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>
      </nav>

      {open && (
        <div className="fixed inset-x-0 top-18 z-40 border-t border-amber-800/30 bg-amber-950/95 backdrop-blur-xl md:hidden">
          <div className="mx-auto flex max-w-7xl flex-col gap-1 px-6 py-4">
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="rounded-lg px-3 py-2.5 text-sm font-medium text-amber-50/80 hover:bg-amber-800/30 hover:text-amber-50"
              >
                {t(l.labelKey)}
              </a>
            ))}
            <OrderCta mobile onClick={() => setOpen(false)} />
          </div>
        </div>
      )}
    </>
  );
}

function OrderCta({ mobile, onClick }: { mobile?: boolean; onClick?: () => void }) {
  const { count, setOpen } = useCart();
  const { t } = useI18n();
  const label = count > 0 ? `${t("nav.viewOrder")} (${count})` : t("nav.orderNow");
  const handle = () => {
    onClick?.();
    if (count > 0) setOpen(true);
    else document.getElementById("products")?.scrollIntoView({ behavior: "smooth" });
  };
  return (
    <button
      onClick={handle}
      className={
        mobile
          ? "mt-2 rounded-full bg-amber-700 px-5 py-3 text-center text-sm font-medium text-amber-50"
          : "hidden rounded-full bg-amber-700 px-5 py-2.5 text-sm font-medium text-amber-50 shadow-sm transition-all hover:bg-amber-600 hover:shadow-md md:inline-flex"
      }
    >
      {label}
    </button>
  );
}
