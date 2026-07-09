import Background from "@/components/Background";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Hero from "@/components/sections/Hero";
import Transformation from "@/components/sections/Transformation";
import Philosophy from "@/components/sections/Philosophy";
import Obstacles from "@/components/sections/Obstacles";
import Framework from "@/components/sections/Framework";
import Eligibility from "@/components/sections/Eligibility";
import Outcomes from "@/components/sections/Outcomes";
import Location from "@/components/sections/Location";
import ApplyForm from "@/components/sections/ApplyForm";

export default function Home() {
  return (
    <div className="relative min-h-screen">
      <Background />
      <Navbar />
      <main className="relative z-[1]">
        <Hero />
        <Transformation />
        <Philosophy />
        <Obstacles />
        <Framework />
        <Eligibility />
        <Outcomes />
        <Location />
        <ApplyForm />
      </main>
      <Footer />
    </div>
  );
}
