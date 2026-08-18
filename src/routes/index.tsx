import { createFileRoute } from "@tanstack/react-router";
import { Navbar } from "@/components/Navbar";
import { CartProvider } from "@/components/cart/CartContext";
import { CartDrawer } from "@/components/cart/Cart";
import { ContactFab } from "@/components/WhatsAppButton";
import { Contact } from "@/components/sections/Contact";
import { Hero } from "@/components/sections/Hero";
import { About } from "@/components/sections/About";
import { Products } from "@/components/sections/Products";
import { WhyUs } from "@/components/sections/WhyUs";
import { Testimonials } from "@/components/sections/Testimonials";
import { FAQ } from "@/components/sections/FAQ";
import { Footer } from "@/components/sections/Footer";
import { AIRecommendations } from "@/components/ai/AIRecommendations";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "BLF Cashews — Premium Tanzanian Cashew Nuts" },
      {
        name: "description",
        content:
          "Pure Tanzanian premium cashews. Natural goodness, unforgettable crunch. Order roasted, salted, honey & raw cashews on WhatsApp.",
      },
      { property: "og:title", content: "BLF Cashews — Premium Tanzanian Cashew Nuts" },
      {
        property: "og:description",
        content: "Natural goodness, unforgettable crunch. Taste happiness in every bite.",
      },
      { property: "og:type", content: "website" },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <CartProvider>
      <div className="min-h-screen">
        <Navbar />
        <main>
          <Hero />
          <About />
          <Products />
          <AIRecommendations />
          <WhyUs />
          <Testimonials />
          <FAQ />
          <Contact />
        </main>
        <Footer />
        <ContactFab />
        <CartDrawer />
      </div>
    </CartProvider>
  );
}
