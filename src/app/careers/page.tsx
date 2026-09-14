import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import CareersHero from "@/components/sections/careers/CareersHero";
import CareersMission from "@/components/sections/careers/CareersMission";
import CareersMandate from "@/components/sections/careers/CareersMandate";
import CareersWorkspace from "@/components/sections/careers/CareersWorkspace";
import CareersJobs from "@/components/sections/careers/CareersJobs";
import CareersInterns from "@/components/sections/careers/CareersInterns";
import CareersValues from "@/components/sections/careers/CareersValues";
import CareersTestimonials from "@/components/sections/careers/CareersTestimonials";

export default function CareersPage() {
  return (
    <div className="relative font-sans">
      <Header />

      <main>
        <CareersHero />
        <CareersMission />
        <CareersMandate />
        <CareersWorkspace />
        <CareersJobs />
        <CareersInterns />
        <CareersValues />
        <CareersTestimonials />
      </main>

      <Footer />
    </div>
  );
}
