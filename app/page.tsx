import HeroSection from "../components/HeroSection";
import ServicesSection from "../components/ServicesSection";
import PricingSection from "../components/PricingSection";
import ProjectsSection from "../components/ProjectsSection";
import ExperienceSection from "../components/ExperienceSection";
import SkillsSection from "../components/SkillsSection";
import ContactSection from "../components/ContactSection";

export default function Home() {
  return (
    <>
      <HeroSection />
      <ServicesSection />
      <ProjectsSection />
      <ExperienceSection />
      <SkillsSection />
      <PricingSection />
      <ContactSection />
    </>
  );
}
