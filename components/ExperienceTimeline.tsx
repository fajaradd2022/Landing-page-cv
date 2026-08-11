"use client";

import { useRef, useState } from "react";
import { AnimatePresence, motion, useScroll, useTransform } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { experience, sections } from "@/lib/content";
import SectionLabel from "./SectionLabel";
import { fadeUp, viewportOnce } from "@/lib/motion";
import AmbientGradient from "./AmbientGradient";
import { useIsTouchDevice } from "@/lib/hooks";

const section = sections.find((s) => s.id === "experience")!;

function ResponsibilityItem({
  text,
  index,
  reversed,
}: {
  text: string;
  index: number;
  reversed: boolean;
}) {
  const [expanded, setExpanded] = useState(false);
  const label = text.replace(/^\d+\.\s*/, "");
  const num = String(index + 1).padStart(2, "0");

  return (
    <button
      type="button"
      onClick={() => setExpanded((v) => !v)}
      className={`flex w-full items-start gap-3 py-2 text-left ${
        reversed ? "lg:flex-row-reverse lg:text-right" : ""
      }`}
      aria-expanded={expanded}
    >
      <span className="mt-0.5 shrink-0 font-mono text-xs tracking-widest text-champagne">
        {num}
      </span>
      <span
        className={`flex-1 text-sm leading-snug text-cream-dim ${
          expanded ? "whitespace-normal" : "truncate"
        }`}
      >
        {label}
      </span>
      <motion.span
        animate={{ rotate: expanded ? 180 : 0 }}
        transition={{ duration: 0.25 }}
        className="mt-0.5 shrink-0 text-gray-soft"
      >
        <ChevronDown size={14} />
      </motion.span>
    </button>
  );
}

function TimelineItem({
  item,
  index,
}: {
  item: (typeof experience)[number];
  index: number;
}) {
  const reversed = index % 2 === 1;
  const isTouch = useIsTouchDevice();
  const [showList, setShowList] = useState(false);

  const hoverProps = isTouch
    ? { onClick: () => setShowList((v) => !v) }
    : {
        onMouseEnter: () => setShowList(true),
        onMouseLeave: () => setShowList(false),
      };

  return (
    <div className="relative flex w-full" {...hoverProps}>
      <div
        className={`absolute left-0 top-1.5 h-3 w-3 -translate-x-1/2 rounded-full border border-champagne bg-charcoal lg:left-1/2`}
      >
        {item.current && (
          <span className="absolute inset-0 animate-ping rounded-full bg-champagne/60" />
        )}
      </div>

      <motion.div
        variants={fadeUp}
        initial="hidden"
        whileInView="visible"
        viewport={viewportOnce}
        custom={index}
        className={`relative flex flex-col gap-3 pb-16 pl-10 lg:w-1/2 lg:pl-16 ${
          reversed
            ? "lg:ml-auto lg:items-end lg:pl-16 lg:pr-16 lg:text-right"
            : "lg:mr-auto lg:pr-16"
        }`}
      >
        <span className="font-mono text-xs tracking-[0.2em] text-champagne">{item.period}</span>

        <div className="w-full cursor-pointer">
          <h3 className="font-sans text-2xl font-semibold text-cream lg:text-3xl">{item.title}</h3>
          <span className="mt-1 block font-mono text-xs tracking-widest text-gray">
            {item.company}
          </span>
        </div>

        <AnimatePresence>
          {showList && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              className="w-full overflow-hidden"
            >
              <div className="mt-2 w-full divide-y divide-cream/5 border-t border-cream/5">
                {item.responsibilities.map((r, i) => (
                  <ResponsibilityItem key={r} text={r} index={i} reversed={reversed} />
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}

export default function ExperienceTimeline() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 70%", "end 60%"],
  });
  const lineHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <section id="experience" className="relative border-t border-cream/10 bg-charcoal px-6 py-28 lg:px-12 lg:py-40 xl:px-20 2xl:px-28">
      <AmbientGradient variant="center" color="gray" />
      <SectionLabel num={section.num} label={section.label} className="mb-4" />
      <div className="mb-16 flex flex-col gap-2 lg:flex-row lg:items-end lg:justify-between">
        <h2 className="font-sans text-5xl font-semibold tracking-tight text-cream lg:text-6xl">
          EXPERIENCE
        </h2>
        <p className="font-mono text-sm text-gray">From technical execution to IT leadership.</p>
      </div>

      <div ref={ref} className="relative">
        <div className="absolute left-0 top-0 h-full w-px bg-cream/10 lg:left-1/2">
          <motion.div
            style={{ height: lineHeight }}
            className="w-full bg-champagne"
          />
        </div>

        <div className="flex flex-col">
          {experience.map((item, i) => (
            <TimelineItem key={item.title + item.period} item={item} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
