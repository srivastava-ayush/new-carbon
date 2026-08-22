import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Hero from "@/components/sections/Hero";
import HowItWorks from "@/components/sections/HowItWorks";
import Scopes from "@/components/sections/Scopes";
import Capabilities from "@/components/sections/Capabilities";
import Solutions from "@/components/sections/Solutions";

export default function Landing() {
  return (
    <div className="relative font-sans">
      <Header />

      <main>
        <Hero />
        <HowItWorks />
        <Scopes />
        <Capabilities />
        <Solutions />
      </main>

      <Footer />
    </div>
  );
}
