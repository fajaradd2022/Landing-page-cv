"use client";

import { motion } from "framer-motion";
import { capabilities } from "@/lib/content";
import { fadeUp, viewportOnce } from "@/lib/motion";

export default function Capabilities() {
  return (
    <div>
      <h3 className="mb-10 font-sans text-4xl font-semibold tracking-tight text-cream lg:text-5xl">
        WHAT I BUILD
      </h3>
      <div className="grid grid-cols-1 gap-px border border-cream/10 bg-cream/10 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
        {capabilities.map((cap, i) => (
          <motion.div
            key={cap.num}
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
            custom={i}
            data-cursor="button"
            className="group relative flex min-h-[180px] flex-col justify-between bg-charcoal p-6 transition-colors hover:bg-charcoal-soft"
          >
            <span className="font-mono text-xs tracking-widest text-champagne">{cap.num}</span>
            <div>
              <h4 className="mb-2 font-sans text-base font-semibold leading-tight text-cream">
                {cap.title}
              </h4>
              <p className="font-mono text-[11px] leading-relaxed tracking-wide text-gray">
                {cap.desc}
              </p>
            </div>
            <span className="absolute bottom-0 left-0 h-px w-0 bg-champagne transition-all duration-500 group-hover:w-full" />
          </motion.div>
        ))}
      </div>
    </div>
  );
}
