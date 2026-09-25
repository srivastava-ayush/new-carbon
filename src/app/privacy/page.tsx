import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import PrivacyPolicy from "@/components/sections/privacy/PrivacyPolicy";

export default function PrivacyPage() {
    return (
        <div className="relative font-sans">
          <Header />
    
          <main>
            <PrivacyPolicy />
          </main>
    
          <Footer />
        </div>
      );
}