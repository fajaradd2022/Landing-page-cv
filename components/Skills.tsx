import { sections } from "@/lib/content";
import SectionLabel from "./SectionLabel";
import Capabilities from "./Capabilities";
import AmbientGradient from "./AmbientGradient";

const section = sections.find((s) => s.id === "skills")!;

export default function Skills() {
  return (
    <section id="skills" className="relative border-t border-cream/10 bg-charcoal px-6 py-28 lg:px-12 lg:py-40 xl:px-20 2xl:px-28">
      <AmbientGradient variant="bottom-right" />
      <SectionLabel num={section.num} label={section.label} className="mb-16" />
      <Capabilities />
    </section>
  );
}
