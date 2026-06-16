import Navbar from "@/components/navbar";
import Hero from "@/components/home/hero";
import Features from "@/components/home/features";
import HowItWorks from "@/components/home/how-it-works";
import Pricing from "@/components/home/pricing";
import FinalCta from "@/components/home/final-cta";
import Footer from "@/components/footer";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-[#F7F5F0] antialiased">
      <Navbar />
      <main>
        <Hero />
        <Features />
        <HowItWorks />
        <Pricing />
        <FinalCta />
      </main>
      <Footer />
    </div>
  );
}
