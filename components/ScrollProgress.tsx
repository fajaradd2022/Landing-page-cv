"use client";

import { motion, useScroll, useSpring } from "framer-motion";
import { sections } from "@/lib/content";
import { useActiveSection } from "@/lib/hooks";

const ids = sections.map((s) => s.id);

export default function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleY = useSpring(scrollYProgress, { stiffness: 120, damping: 30 });
  const active = useActiveSection(ids);

  return (
    <div className="fixed right-6 top-1/2 z-40 hidden -translate-y-1/2 lg:flex lg:flex-col lg:items-end lg:gap-3">
      <div className="relative flex flex-col items-center gap-3">
        <div className="relative h-40 w-px bg-cream/15">
          <motion.div
            style={{ scaleY }}
            className="absolute left-0 top-0 h-full w-full origin-top bg-champagne"
          />
        </div>
      </div>
      <div className="mt-3 flex flex-col items-end gap-1 font-mono text-[10px] tracking-widest text-gray">
        {sections.map((s) => (
          <a
            key={s.id}
            href={`#${s.id}`}
            className={`transition-colors ${active === s.id ? "text-champagne" : "hover:text-cream"}`}
          >
            {s.num}
          </a>
        ))}
      </div>
    </div>
  );
}
