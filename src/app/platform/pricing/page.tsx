import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import PricingHero from "@/components/sections/pricing/PricingHero";
import PricingCards from "@/components/sections/pricing/PricingCards";
import PricingFeatureComparison from "@/components/sections/pricing/PricingFeatureComparison";
import PricingFAQ from "@/components/sections/pricing/PricingFAQ";

export default function PricingPage() {
  return (
    <div className="relative font-sans">
      <Header />

      <main>
        <PricingHero />
        <PricingCards />
        <PricingFeatureComparison />
        <PricingFAQ />
      </main>

      <Footer />
    </div>
  );
}
