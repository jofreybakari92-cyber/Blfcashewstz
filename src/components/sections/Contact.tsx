import { useForm, ValidationError } from "@formspree/react";
import { useI18n } from "../../lib/i18n";
import { Mail, Phone, Send } from "lucide-react";
import contactImg from "@/assets/contact blf.png";

export function Contact() {
  const { t } = useI18n();
  const [state, handleSubmit] = useForm("xlgvlgqg");

  if (state.succeeded) {
    return (
      <section
        id="contact"
        className="relative bg-background py-24 text-foreground md:py-32 overflow-hidden"
      >
        <div className="relative mx-auto max-w-2xl px-6 text-center">
          <div className="font-display text-4xl font-bold text-gradient-gold">
            {t("contact.successTitle")}
          </div>
          <p className="mt-4 text-foreground/80">{t("contact.successText")}</p>
          <button
            onClick={() => window.location.reload()}
            className="mt-6 rounded-full bg-linear-to-r from-gold to-gold/80 px-6 py-3 text-sm font-bold uppercase tracking-wider text-background"
          >
            {t("contact.sendAnother")}
          </button>
        </div>
      </section>
    );
  }

  return (
    <section
      id="contact"
      className="relative bg-background py-24 text-foreground md:py-32 overflow-hidden"
    >
      <div className="absolute inset-0 bg-grain opacity-10" />

      <div className="relative mx-auto max-w-7xl px-6">
        {/* Section header */}
        <div className="mx-auto mb-16 max-w-2xl text-center">
          <div className="text-xs font-medium uppercase tracking-[0.3em] text-gold">
            {t("contact.badge")}
          </div>
          <h2 className="mt-4 font-display text-4xl font-bold leading-tight md:text-5xl">
            {t("contact.title1")} <span className="text-gradient-gold">{t("contact.title2")}</span>
          </h2>
          <p className="mt-4 text-base leading-relaxed text-foreground/80 md:text-lg">
            {t("contact.desc")}
          </p>
        </div>

        <div className="grid grid-cols-1 gap-16 lg:grid-cols-2">
          {/* Left side - Contact info */}
          <div className="space-y-8">
            <div className="space-y-4">
              <h3 className="font-display text-3xl font-bold">
                <span className="text-gradient-gold">{t("contact.title1")} </span>
                {t("contact.title2")}
                <span className="ml-2">→</span>
              </h3>
              <p className="text-foreground/70">
                {t("contact.supportTitle")} {t("contact.supportDesc")}
              </p>
            </div>

            <div className="space-y-4">
              {[
                { key: "contact.supportItem1" },
                { key: "contact.supportItem2" },
                { key: "contact.supportItem3" },
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-3 text-foreground/90">
                  <span className="text-gold font-bold">✔</span>
                  <span>{t(item.key)}</span>
                </div>
              ))}
            </div>

            {/* Contact image */}
            <div className="pt-6">
              <img
                src={contactImg}
                alt="Contact BLF Cashews"
                className="w-full max-w-md rounded-2xl shadow-2xl"
              />
            </div>

            {/* Contact details cards */}
            <div className="grid grid-cols-1 gap-4 pt-6">
              <a
                href="mailto:jofreylazaro047@gmail.com"
                className="flex items-center gap-4 rounded-2xl border border-gold/20 bg-foreground/5 p-5 transition-all hover:border-gold/60 hover:bg-foreground/10"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gold/20 text-gold">
                  <Mail className="h-5 w-5" />
                </div>
                <div>
                  <div className="font-semibold text-foreground">{t("contact.cardEmail")}</div>
                  <div className="text-sm text-foreground/60">jofreylazaro047@gmail.com</div>
                </div>
              </a>

              <a
                href="tel:+255760016527"
                className="flex items-center gap-4 rounded-2xl border border-gold/20 bg-foreground/5 p-5 transition-all hover:border-gold/60 hover:bg-foreground/10"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gold/20 text-gold">
                  <Phone className="h-5 w-5" />
                </div>
                <div>
                  <div className="font-semibold text-foreground">{t("contact.cardPhone")}</div>
                  <div className="text-sm text-foreground/60">+255 760 016 527</div>
                </div>
              </a>

              <a
                href="https://wa.me/255760016527"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 rounded-2xl border border-gold/20 bg-foreground/5 p-5 transition-all hover:border-gold/60 hover:bg-foreground/10"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gold/20 text-gold">
                  <Send className="h-5 w-5" />
                </div>
                <div>
                  <div className="font-semibold text-foreground">{t("contact.cardWhatsApp")}</div>
                  <div className="text-sm text-foreground/60">+255 760 016 527</div>
                </div>
              </a>
            </div>
          </div>

          {/* Right side - Contact form */}
          <div className="rounded-3xl border border-gold/20 bg-foreground/5 p-8 backdrop-blur-sm">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <div>
                  <label className="text-xs font-medium uppercase tracking-wider text-foreground/60">
                    {t("contact.formName")}
                  </label>
                  <input
                    type="text"
                    name="name"
                    placeholder={t("contact.formNamePlaceholder")}
                    className="mt-2 w-full rounded-xl border border-foreground/10 bg-foreground/10 px-4 py-3 text-foreground placeholder:text-foreground/40 focus:border-gold focus:outline-none focus:ring-2 focus:ring-gold/20 transition-all"
                    required
                  />
                  <ValidationError prefix="Name" field="name" errors={state.errors} />
                </div>
                <div>
                  <label className="text-xs font-medium uppercase tracking-wider text-foreground/60">
                    {t("contact.formEmail")}
                  </label>
                  <input
                    type="email"
                    name="email"
                    placeholder={t("contact.formEmailPlaceholder")}
                    className="mt-2 w-full rounded-xl border border-foreground/10 bg-foreground/10 px-4 py-3 text-foreground placeholder:text-foreground/40 focus:border-gold focus:outline-none focus:ring-2 focus:ring-gold/20 transition-all"
                    required
                  />
                  <ValidationError prefix="Email" field="email" errors={state.errors} />
                </div>
              </div>

              <div>
                <label className="text-xs font-medium uppercase tracking-wider text-foreground/60">
                  {t("contact.formMessage")}
                </label>
                <textarea
                  name="message"
                  placeholder={t("contact.formMessagePlaceholder")}
                  rows={5}
                  className="mt-2 w-full rounded-xl border border-foreground/10 bg-foreground/10 px-4 py-3 text-foreground placeholder:text-foreground/40 focus:border-gold focus:outline-none focus:ring-2 focus:ring-gold/20 transition-all resize-vertical"
                  required
                />
                <ValidationError prefix="Message" field="message" errors={state.errors} />
              </div>

              {state.errors && (
                <div className="text-sm text-destructive">{t("contact.errorTitle")}</div>
              )}

              <button
                type="submit"
                disabled={state.submitting}
                className="w-full rounded-full bg-linear-to-r from-gold to-gold/80 px-6 py-4 text-sm font-bold uppercase tracking-wider text-background transition-all hover:scale-[1.02] hover:shadow-lg hover:shadow-gold/25 disabled:opacity-50"
              >
                {state.submitting ? t("contact.submitting") : t("contact.submit")}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
