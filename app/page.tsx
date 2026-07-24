import { AppStateProvider } from "@/components/AppStateProvider";
import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { ProofBar } from "@/components/ProofBar";
import { CustomerSegments } from "@/components/CustomerSegments";
import { SolarCalculator } from "@/components/SolarCalculator";
import { ProjectShowcase } from "@/components/ProjectShowcase";
import { HybridEnergyScroll } from "@/components/HybridEnergyScroll";
import { ProcessTimeline } from "@/components/ProcessTimeline";
import { TechnologyStrip } from "@/components/TechnologyStrip";
import { FinancingSection } from "@/components/FinancingSection";
import { Testimonials } from "@/components/Testimonials";
import { FAQ } from "@/components/FAQ";
import { FinalCTA } from "@/components/FinalCTA";
import { Footer } from "@/components/Footer";
import { WhatsAppFloatingButton } from "@/components/WhatsAppFloatingButton";

export default function Home() {
  return (
    <AppStateProvider>
      <Header />
      <main>
        <Hero />
        <ProofBar />
        <CustomerSegments />
        <SolarCalculator />
        <ProjectShowcase />
        <HybridEnergyScroll />
        <ProcessTimeline />
        <TechnologyStrip />
        <FinancingSection />
        <Testimonials />
        <FAQ />
        <FinalCTA />
      </main>
      <Footer />
      <WhatsAppFloatingButton />
    </AppStateProvider>
  );
}
