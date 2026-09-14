import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import ContactHero from "@/components/sections/contact/ContactHero";
import ContactSection from "@/components/sections/contact/ContactSection";

export default function ContactPage() {
  return (
    <div className="relative font-sans">
      <Header />

      <main>
        <ContactHero />
        <ContactSection />
      </main>

      <Footer />
    </div>
  );
}
