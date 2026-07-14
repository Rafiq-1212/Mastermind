import Background from "@/components/Background";
import MobileStickyBar from "@/components/MobileStickyBar";
import Footer from "@/components/Footer";
import Hero from "@/components/sections/Hero";
import Transformation from "@/components/sections/Transformation";
import Mentor from "@/components/sections/Mentor";
import Features from "@/components/sections/Features";
import SocialProof from "@/components/sections/SocialProof";
import FAQ from "@/components/sections/FAQ";
import FinalCTA from "@/components/sections/FinalCTA";

export default function Home() {
  return (
    <div className="relative min-h-screen">
      <Background />
      <main className="relative z-[1]">
        <Hero />
        <Transformation />
        <Mentor portraitSrc="/men-nobg.png" />
        <Features />
        <SocialProof />
        {/* <FAQ /> */}
        <FinalCTA />
      </main>
      <Footer />
      <MobileStickyBar />
    </div>
  );
}
