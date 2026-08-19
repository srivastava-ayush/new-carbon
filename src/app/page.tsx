import { DM_Sans, DM_Serif_Display } from "next/font/google";


import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Hero from "@/components/sections/Hero";
import HowItWorks from "@/components/sections/HowItWorks";
import Scopes from "@/components/sections/Scopes";
import Capabilities from "@/components/sections/Capabilities";
import Solutions from "@/components/sections/Solutions";

const dmSans = DM_Sans({ subsets: ["latin"], variable: "--font-dm-sans" });
const dmSerif = DM_Serif_Display({ weight: "400", subsets: ["latin"], variable: "--font-dm-serif-display" });

export default function Landing() {
  return (
    <div className={`${dmSans.variable} ${dmSerif.variable}`}>
      <div className="relative font-dm-sans">
        <Header />

        <main>
          <Hero />

          <div className="bg-white text-black">
            <HowItWorks />
            <Scopes />
            <Capabilities />
            <Solutions />
          </div>
        </main>

        <Footer />
      </div>
    </div>
  );
}