import PortfolioShell from "@/components/PortfolioShell";
import Hero from "@/components/Hero";
import About from "@/components/About";
import ExperienceTimeline from "@/components/ExperienceTimeline";
import Skills from "@/components/Skills";
import PortfolioShowcase from "@/components/PortfolioShowcase";
import PersonalBrand from "@/components/PersonalBrand";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <PortfolioShell>
      <main className="flex flex-1 flex-col">
        <Hero />
        <About />
        <ExperienceTimeline />
        <Skills />
        <PortfolioShowcase />
        <PersonalBrand />
        <Contact />
      </main>
      <Footer />
    </PortfolioShell>
  );
}
