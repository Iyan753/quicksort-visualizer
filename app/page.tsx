import { AlgorithmVisualizer } from "@/components/AlgorithmVisualizer";
import { ComplexityInfo } from "@/components/ComplexityInfo";
import { Dashboard } from "@/components/Dashboard";
import { FinalCta } from "@/components/FinalCta";
import { Footer } from "@/components/Footer";
import { HowItWorks } from "@/components/HowItWorks";
import { Navbar } from "@/components/Navbar";

export default function HomePage() {
  return (
    <>
      <Navbar />
      <main>
        <Dashboard />
        <AlgorithmVisualizer />
        <HowItWorks />
        <ComplexityInfo />
        <FinalCta />
      </main>
      <Footer />
    </>
  );
}
