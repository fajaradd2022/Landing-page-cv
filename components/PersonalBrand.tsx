"use client";

import { motion, useReducedMotion } from "framer-motion";
import { personalBrand } from "@/lib/content";
import { displayScale } from "@/lib/typography";

export default function PersonalBrand() {
  const reduceMotion = useReducedMotion();

  return (
    <section className="relative overflow-hidden border-t border-cream/10 bg-charcoal-soft px-6 py-32 lg:px-12 lg:py-48 xl:px-20 2xl:px-28">
      <div className="mx-auto flex max-w-5xl flex-col items-center gap-1 text-center">
        {personalBrand.lines.map((line, i) => (
          <motion.span
            key={line}
            initial={{ opacity: 0, x: reduceMotion ? 0 : i % 2 === 0 ? -40 : 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-15% 0px -15% 0px" }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: i * 0.08 }}
            className={`font-sans font-semibold leading-[0.95] tracking-tighter ${displayScale} ${
              line === "RELIABLE" || line === "SOLUTIONS." ? "text-champagne" : "text-cream"
            }`}
          >
            {line}
          </motion.span>
        ))}
      </div>
    </section>
  );
}
