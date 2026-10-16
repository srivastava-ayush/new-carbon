import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import CareersHero from "@/components/sections/careers/CareersHero";
import CareersMission from "@/components/sections/careers/CareersMission";
import CareersMandate from "@/components/sections/careers/CareersMandate";
import CareersWorkspace from "@/components/sections/careers/CareersWorkspace";
import CareersValues from "@/components/sections/careers/CareersValues";

export default function CareersPage() {
  return (
    <div className="relative font-sans">
      <Header />

      <main>
        <CareersHero />
        <CareersMission />
        <CareersMandate />
        <CareersWorkspace />
        <CareersValues />
      </main>

      <Footer />
    </div>
  );
}
