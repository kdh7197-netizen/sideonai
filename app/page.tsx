import HeroSection from "@/components/HeroSection";
import PhilosophySection from "@/components/PhilosophySection";
import WorksSection from "@/components/WorksSection";
import SidejobSection from "@/components/SidejobSection";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main style={{ background: "#0a0a0a", minHeight: "100vh" }}>
      <HeroSection />
      <PhilosophySection />
      <WorksSection />
      <SidejobSection />
      <Footer />
    </main>
  );
}
