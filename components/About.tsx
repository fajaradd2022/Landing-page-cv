"use client";

import { motion } from "framer-motion";
import { about, sections } from "@/lib/content";
import RevealText from "./RevealText";
import SectionLabel from "./SectionLabel";
import { fadeUp, viewportOnce } from "@/lib/motion";
import { displayScale } from "@/lib/typography";
import AmbientGradient from "./AmbientGradient";

const section = sections.find((s) => s.id === "about")!;

export default function About() {
  return (
    <section id="about" className="relative border-t border-cream/10 bg-charcoal px-6 py-28 lg:px-12 lg:py-40 xl:px-20 2xl:px-28">
      <AmbientGradient variant="top-left" />
      <SectionLabel num={section.num} label={section.label} className="mb-10" />

      <div className="grid grid-cols-1 gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:gap-20">
        <h2 className={`font-sans font-semibold leading-[0.9] tracking-tighter text-cream ${displayScale}`}>
          {about.heading.map((line, i) => (
            <RevealText key={line} as="span" text={line} mode="word" delay={i * 0.1} className="block" />
          ))}
        </h2>

        <div className="flex flex-col justify-between gap-12">
          <div className="space-y-6">
            {about.paragraphs.map((p, i) => (
              <motion.p
                key={p.slice(0, 12)}
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={viewportOnce}
                custom={i}
                className="text-base leading-relaxed text-cream-dim lg:text-lg"
              >
                {p}
              </motion.p>
            ))}
          </div>

          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
            custom={2}
            className="border-t border-cream/10 pt-6"
          >
            <span className="block font-sans text-6xl font-semibold text-champagne lg:text-7xl">
              {about.stat.value}
            </span>
            <span className="mt-2 block font-mono text-xs tracking-[0.25em] text-gray">
              {about.stat.label}
            </span>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
