import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import TermsOfService from "@/components/sections/terms/TermsOfService";

export default function TermsPage() {
    return (
        <div className="relative font-sans">
          <Header />
    
          <main>
            <TermsOfService />
          </main>
    
          <Footer />
        </div>
      );
}