import CTASection from "@/components/CTASection";
import FeaturesSection from "@/components/FeautresSection";
import Footer from "@/components/FooterSection";
import HeroSection from "@/components/HeroSection";
import HowItWorksSection from "@/components/WorkSection";


export default function Home() {
  return (
    <>
      <HeroSection />
      <FeaturesSection />
      <HowItWorksSection />
      <CTASection />
      <Footer />
    </>
  );
}
