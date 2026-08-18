import { createContext, useContext, useState, useEffect, type ReactNode } from "react";

type Lang =
  | "en"
  | "sw"
  | "es"
  | "fr"
  | "de"
  | "it"
  | "pt"
  | "ru"
  | "zh"
  | "ja"
  | "ko"
  | "ar"
  | "hi";
type Theme = "light" | "dark";

const translations = {
  nav: {
    about: { en: "About", sw: "Kuhusu" },
    products: { en: "Products", sw: "Bidhaa" },
    whyUs: { en: "Why Us", sw: "Kwa Nini Sisi" },
    reviews: { en: "Reviews", sw: "Maoni" },
    faq: { en: "FAQ", sw: "Maswali" },
    contact: { en: "Contact", sw: "Wasiliana" },
    orderNow: { en: "Order Now", sw: "Agiza Sasa" },
    viewOrder: { en: "View Order", sw: "Angalia Oda" },
    toggleTheme: { en: "Toggle theme", sw: "Badilisha mandhari" },
  },
  hero: {
    badge: { en: "Pure Tanzanian Premium", sw: "Tanzania Asili Bora" },
    title1: { en: "BLF", sw: "BLF" },
    title2: { en: "CASHEWS", sw: "KOROSHO" },
    desc: {
      en: "Natural goodness, unforgettable crunch. Hand-picked from the rich soils of Tanzania — taste happiness in every bite. 🍃",
      sw: "Ubora asili, crunch isiyosahaulika. Kuchaguliwa kutoka kwa ardhi ya Tanzania — ladha ya furaha kila bite. 🍃",
    },
    orderNow: { en: "Order Now", sw: "Agiza Sasa" },
    chatWhatsApp: { en: "Chat on WhatsApp", sw: "Zungumza WhatsApp" },
    stat1: { en: "100%", sw: "100%" },
    stat1Label: { en: "Natural", sw: "Asili" },
    stat2: { en: "5★", sw: "5★" },
    stat2Label: { en: "Quality", sw: "Ubora" },
    stat3: { en: "1K+", sw: "1K+" },
    stat3Label: { en: "Happy Clients", sw: "Wateja Wenye Furaha" },
    partnersTitle: { en: "Our Trusted Partners", sw: "Washirika Wetu wa Kuaminiwa" },
    partner1: { en: "TANROPA", sw: "TANROPA" },
    partner2: { en: "TANZANITE TRADERS", sw: "TANZANITE TRADERS" },
    partner3: { en: "TROPIC NATURAL", sw: "TROPIC NATURAL" },
    partner4: { en: "TANZFRUIT", sw: "TANZFRUIT" },
    partner5: { en: "SPICEPARK", sw: "SPICEPARK" },
    partner6: { en: "KILIMONJARO AGRO", sw: "KILIMONJARO AGRO" },
  },
  whyUs: {
    badge: { en: "Why BLF", sw: "Kwa Nini BLF" },
    title: { en: "Quality you can", sw: "Ubora unaweza" },
    titleAccent: { en: "taste", sw: "kuonja" },
    storyTitle: {
      en: "The Cashew Story — From Our Farms to Your Table",
      sw: "Hadithi ya Korosho — Kutoka Shambani Kwetu Mezani Kwako",
    },
    storyText1: {
      en: "Cashews aren't just a snack — they're a superfood packed with nature's best. Every BLF cashew is loaded with heart-healthy monounsaturated fats, plant-based protein, and essential minerals like magnesium, zinc, and iron. Studies show that regular cashew consumption can help lower bad cholesterol, support brain function, and boost your immune system.",
      sw: "Korosho si tu vitafunio — ni chakula chenye afya yenye nguvu za asili. Korosho ya BLF ina mafuta mazuri ya moyo, protini za mimea, na madini muhimu kama magnesi, zinki, na chuma. Utafiti unaonyesha kwala matumizi ya mara kwa mara ya korosho yanaweza kusaidia kupunguza mafuta mabaya ya moyo, kusaidia ubongo, na kuongeza kinga ya mwili.",
    },
    storyText2: {
      en: "Grown under the Tanzanian sun, hand-harvested by local farming families, and roasted to perfection in small batches — every bite carries the warmth of the land and the pride of the people who grew it. When you choose BLF, you're not just eating cashews. You're tasting a legacy.",
      sw: "Inakua chini ya jua ya Tanzania, kuchuma na familia za wakulima wa enchi, na kuchoma kwa ukamilifu katika vikundi vidogo — kila bite ina joto ya ardhi na fahamu ya watu waliokua. Unapochagua BLF, huli tu korosho. Unaramba urithi.",
    },
    benefit1Title: { en: "Heart Health", sw: "Afya ya Moyo" },
    benefit1Desc: {
      en: "Rich in oleic acid & monounsaturated fats that support cardiovascular wellness.",
      sw: "Ina oleic acid & mafuta mazuri yanayosaidia afya ya moyo.",
    },
    benefit2Title: { en: "Brain Power", sw: "Nguvu ya Ubongo" },
    benefit2Desc: {
      en: "Magnesium & zinc boost cognitive function, memory, and mental clarity.",
      sw: "Magnesi & zinki huongeza kazi ya ubongo, kumbukumbu, na uwazi wa akili.",
    },
    benefit3Title: { en: "Immune Boost", sw: "Kinga ya Mwili" },
    benefit3Desc: {
      en: "Packed with antioxidants, selenium & vitamin E to strengthen your defenses.",
      sw: "Ina antioxidants, selenium & vitamin E kuongeza kinga yako.",
    },
    benefit4Title: { en: "Plant Protein", sw: "Protini za Mimea" },
    benefit4Desc: {
      en: "18g of protein per 100g — a powerful fuel for muscles and energy.",
      sw: "18g ya protini kwa 100g — nguvu kwa misuli na nishati.",
    },
    benefit5Title: { en: "Better Sleep", sw: "Usingizi Bora" },
    benefit5Desc: {
      en: "Natural tryptophan & magnesium help regulate sleep and reduce stress.",
      sw: "Tryptophan & magnesi asili husaidia kudhibiti usingizi na kupunguza msongo.",
    },
  },
  testimonials: {
    badge: { en: "Testimonials", sw: "Maoni" },
    title: { en: "Loved by snack lovers", sw: "Pendwa na wapendaji vitafunio" },
    titleAccent: { en: "everywhere", sw: "kote" },
  },
  footer: {
    desc: {
      en: "Premium Tanzanian cashews — natural goodness, unforgettable crunch. Taste happiness in every bite.",
      sw: "Korosho bora za Tanzania — ubora asili, crunch isiyosahaulika. Ladha ya furahi kila bite.",
    },
    explore: { en: "Explore", sw: "Chunguza" },
    about: { en: "About", sw: "Kuhusu" },
    products: { en: "Products", sw: "Bidhaa" },
    whyUs: { en: "Why Us", sw: "Kwa Nini Sisi" },
    reviews: { en: "Reviews", sw: "Maoni" },
    faq: { en: "FAQ", sw: "Maswali" },
    getInTouch: { en: "Get in touch", sw: "Wasiliana Nasi" },
    rights: { en: "All rights reserved.", sw: "Haki zote zimehifadhiwa." },
    madeWith: { en: "Made with", sw: "Imetengenezwa na" },
    tanzania: { en: "in Tanzania", sw: "Tanzania" },
  },
  contact: {
    badge: { en: "Get in Touch", sw: "Wasiliana Nasi" },
    title1: { en: "Let's", sw: "Tuwasiliane" },
    title2: { en: "Connect", sw: "Tawasiliane" },
    desc: {
      en: "Have a question or ready to order? Send us a message and we'll respond within 24 hours.",
      sw: "Una swali au tayari kuagiza? Tuma ujumbe na tutajibu ndani ya masaa 24.",
    },
    callLabel: { en: "Phone", sw: "Simu" },
    emailLabel: { en: "Business Email", sw: "Barua pepe ya Biashara" },
    whatsappLabel: { en: "WhatsApp", sw: "WhatsApp" },
    officeTitle: { en: "Arusha Office", sw: "Ofisi ya Arusha" },
    officeAddress: { en: "Arusha, Tanzania", sw: "Arusha, Tanzania" },
    formName: { en: "Full Name", sw: "Jina Kamili" },
    formNamePlaceholder: { en: "John Doe", sw: "John Doe" },
    formEmail: { en: "Email", sw: "Barua Pepe" },
    formEmailPlaceholder: { en: "john@company.com", sw: "john@kampuni.com" },
    formMessage: { en: "Message", sw: "Ujumbe" },
    formMessagePlaceholder: {
      en: "Tell us about you",
      sw: "Tuambie kuhusu wewe",
    },
    submit: { en: "Start Transmission", sw: "Anza Ujumbe" },
    submitting: { en: "Processing...", sw: "Inashughulikia..." },
    successTitle: { en: "Message Sent!", sw: "Ujumbe Umewekwa!" },
    successText: {
      en: "We'll get back to you within 24 hours.",
      sw: "Tutakujibu ndani ya masaa 24.",
    },
    errorTitle: { en: "Submit Failed", sw: "Ujumbe Umefeli" },
    sendAnother: { en: "Send another message", sw: "Tuma ujumbe mwingine" },
    formPhone: { en: "Phone", sw: "Simu" },
    formPhonePlaceholder: { en: "+1 (555) 000-0000", sw: "+255 712 000 000" },
    formType: { en: "I am contacting as a…", sw: "Ninawasiliana kwa…" },
    typeBusiness: { en: "Business", sw: "Biashara" },
    typeIndividual: { en: "Individual", sw: "Mtu Binafsi" },
    typeOther: { en: "Other", sw: "Nyingine" },
    errName: { en: "Please enter your name.", sw: "Tafadhali ingiza jina lako." },
    errNameLen: {
      en: "Name must be at least 2 characters.",
      sw: "Jina lazima liwe na herufi 2 au zaidi.",
    },
    errEmail: { en: "Please enter your email.", sw: "Tafadhali ingiza barua pepe yako." },
    errEmailV: { en: "Please enter a valid email.", sw: "Tafadhali ingiza barua pepe sahihi." },
    errPhone: {
      en: "Please enter your phone number.",
      sw: "Tafadhali ingiza nambari ya simu yako.",
    },
    errPhoneV: {
      en: "Please enter a valid phone number.",
      sw: "Tafadhali ingiza nambari ya simu sahihi.",
    },
    errMessage: { en: "Please enter your message.", sw: "Tafadhali ingiza ujumbe wako." },
    errMessageLen: {
      en: "Message must be at least 10 characters.",
      sw: "Ujumbe lazima uwe na herufi 10 au zaidi.",
    },
    fabBusiness: { en: "Business Inquiries", sw: "Maswali ya Biashara" },
    fabCopied: { en: "Copied Business Email!", sw: "barua pepe Imenakiliwa!" },
    supportTitle: {
      en: "Have a question or need assistance?",
      sw: "Una swali au unahitaji msaada?",
    },
    supportDesc: {
      en: "Reach out and our team will get back to you promptly.",
      sw: "Wasiliana na timu yetu itakujibu haraka.",
    },
    supportItem1: { en: "Personalized assistance", sw: "Msaada wa kipekee" },
    supportItem2: { en: "Timely response", sw: "Jibu la wakati" },
    supportItem3: { en: "Comprehensive support", sw: "Msaada wa kina" },
    cardEmail: { en: "Email", sw: "Barua Pepe" },
    cardPhone: { en: "Phone", sw: "Simu" },
    cardWhatsApp: { en: "WhatsApp", sw: "WhatsApp" },
    callOffice: { en: "Call Arusha Office", sw: "Piga Ofisi ya Arusha" },
    chatWhatsapp: { en: "Chat on WhatsApp", sw: "Zungumza WhatsApp" },
  },
} as const;

type TranslationKey = keyof typeof translations;

function getNested(obj: Record<string, unknown>, path: string): unknown {
  return path.split(".").reduce<unknown>((acc, key) => {
    if (acc && typeof acc === "object" && key in (acc as Record<string, unknown>)) {
      return (acc as Record<string, unknown>)[key];
    }
    return undefined;
  }, obj);
}

interface I18nContextType {
  lang: Lang;
  setLang: (l: Lang) => void;
  t: (key: string) => string;
}

const I18nContext = createContext<I18nContextType>({
  lang: "en",
  setLang: () => {},
  t: (key) => key,
});

export function I18nProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Lang>("en");

  const t = (key: string): string => {
    const section = key.split(".")[0] as TranslationKey;
    const sectionData = translations[section];
    if (!sectionData) return key;

    const fullKey = key.split(".").slice(1).join(".");
    const nested = getNested(sectionData as Record<string, unknown>, fullKey);
    if (nested && typeof nested === "object" && lang in (nested as Record<string, string>)) {
      return (nested as Record<string, string>)[lang];
    }
    return key;
  };

  return <I18nContext.Provider value={{ lang, setLang, t }}>{children}</I18nContext.Provider>;
}

// eslint-disable-next-line react-refresh/only-export-components
export function useI18n() {
  return useContext(I18nContext);
}

// Theme context
interface ThemeContextType {
  theme: Theme;
  setTheme: (t: Theme) => void;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType>({
  theme: "dark",
  setTheme: () => {},
  toggleTheme: () => {},
});

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setThemeState] = useState<Theme>(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("theme") as Theme | null;
      return saved ?? "dark";
    }
    return "dark";
  });

  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("theme", theme);
      const root = document.documentElement;
      if (theme === "dark") {
        root.classList.add("dark");
      } else {
        root.classList.remove("dark");
      }
    }
  }, [theme]);

  const setTheme = (t: Theme) => setThemeState(t);
  const toggleTheme = () => setThemeState((prev) => (prev === "dark" ? "light" : "dark"));

  return (
    <ThemeContext.Provider value={{ theme, setTheme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export function useTheme() {
  return useContext(ThemeContext);
}
