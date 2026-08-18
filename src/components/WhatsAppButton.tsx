import { useState, useCallback } from "react";
import { useI18n } from "../lib/i18n";
import { Phone, MessageCircle, Copy, Check, type LucideIcon } from "lucide-react";

const WA = "https://wa.me/255760016527";
const BUSINESS_EMAIL = "business@cybersafe.tz";

export function waLink(message?: string) {
  return message ? `${WA}?text=${encodeURIComponent(message)}` : WA;
}

export function WhatsAppFab() {
  return (
    <a
      href={waLink("Hello BLF Cashews! I'd like to place an order.")}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat on WhatsApp"
      className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-whatsapp text-white shadow-[0_10px_30px_-5px_oklch(0.62_0.16_145/0.6)] transition-transform hover:scale-110 hover:shadow-[0_15px_40px_-5px_oklch(0.62_0.16_145/0.8)]"
    >
      <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-whatsapp opacity-30" />
      <svg viewBox="0 0 24 24" className="relative h-7 w-7 fill-current">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
      </svg>
    </a>
  );
}

export function ContactFab() {
  const { t } = useI18n();
  const [copiedType, setCopiedType] = useState<string | null>(null);

  const copyEmail = useCallback(() => {
    navigator.clipboard.writeText(BUSINESS_EMAIL).then(() => {
      setCopiedType("business");
      setTimeout(() => setCopiedType(null), 2000);
    });
  }, []);

  const items: FabItem[] = [
    {
      key: "business",
      label: t("contact.fabBusiness"),
      labelCopied: t("contact.fabCopied"),
      Icon: Copy,
      bgColor: "bg-emerald-600",
      className: "h-12 w-12 p-3.5",
      iconClass: "h-5 w-5",
      delay: "0.2s",
      fieldLabel: t("contact.fabBusiness"),
      onClick: copyEmail,
    },
    {
      key: "phone",
      label: t("contact.callOffice"),
      labelCopied: "",
      Icon: Phone,
      bgColor: "bg-blue-600",
      className: "h-12 w-12 p-3.5",
      iconClass: "h-5 w-5",
      delay: "0.1s",
      fieldLabel: t("contact.callOffice"),
    },
    {
      key: "whatsapp",
      label: t("contact.chatWhatsapp"),
      labelCopied: "",
      Icon: MessageCircle,
      bgColor: "bg-emerald-500",
      className: "h-14 w-14 p-5",
      iconClass: "h-6 w-6",
      delay: "0s",
      fieldLabel: t("contact.chatWhatsapp"),
      href: waLink("Hello BLF Cashews - I'd like to know more."),
      hasPing: true,
    },
  ];

  return (
    <div className="fixed bottom-8 right-8 z-[100] flex flex-col items-end gap-4">
      {items.map((item) => {
        const isCopied = item.key === "business" && copiedType === "business";

        return (
          <div
            key={item.key}
            className="group relative flex items-center justify-end animate-float"
            style={{ animationDelay: item.delay }}
          >
            <span className="absolute right-20 whitespace-nowrap rounded-xl bg-emerald-700 px-4 py-2 text-xs font-bold text-white opacity-0 shadow-2xl border border-white/10 transition-all duration-300 translate-x-4 group-hover:translate-x-0 group-hover:opacity-100 pointer-events-none">
              {isCopied && item.labelCopied ? item.labelCopied : item.fieldLabel}
            </span>

            {item.href ? (
              <a href={item.href} aria-label={item.label} className="inline-flex">
                <FabInner item={item} />
              </a>
            ) : (
              <button
                type="button"
                onClick={item.onClick}
                aria-label={item.label}
                className="relative inline-flex items-center justify-center bg-transparent p-0 m-0 border-0 cursor-pointer"
              >
                <FabInner item={item} />
              </button>
            )}
          </div>
        );
      })}
    </div>
  );
}

interface FabItem {
  key: string;
  label: string;
  labelCopied: string;
  Icon: LucideIcon;
  bgColor: string;
  className: string;
  iconClass: string;
  delay: string;
  fieldLabel: string;
  onClick?: () => void;
  href?: string;
  hasPing?: boolean;
}

function FabInner({ item }: { item: FabItem }) {
  const FabIcon = item.Icon;
  return (
    <div
      className={`flex items-center justify-center ${item.bgColor} rounded-full ${item.className} text-white border border-white/10 shadow-xl transition-all duration-300 group-hover:scale-110 group-active:scale-95`}
    >
      {item.hasPing && (
        <div className="absolute inset-0 animate-ping rounded-full bg-emerald-400 opacity-25" />
      )}
      <FabIcon
        className={`relative z-10 ${item.iconClass}`}
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </div>
  );
}
