"use client";

import { useEffect, useRef } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { person } from "@/lib/content";
import { heroScale } from "@/lib/typography";
import RevealText from "./RevealText";

const AUTO_ENTER_MS = 4000;

export default function IntroGate({ onEnter }: { onEnter: () => void }) {
  const reduceMotion = useReducedMotion();
  const rootRef = useRef<HTMLDivElement>(null);
  const onEnterRef = useRef(onEnter);
  onEnterRef.current = onEnter;

  useEffect(() => {
    rootRef.current?.focus();
    const timer = setTimeout(() => onEnterRef.current(), AUTO_ENTER_MS);
    return () => clearTimeout(timer);
  }, []);

  return (
    <motion.div
      ref={rootRef}
      onClick={onEnter}
      role="button"
      tabIndex={0}
      aria-label="Masuk ke portfolio"
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") onEnter();
      }}
      exit={
        reduceMotion
          ? { opacity: 0 }
          : { y: "-100%", clipPath: "inset(100% 0% 0% 0%)", opacity: 0.4 }
      }
      transition={{ duration: reduceMotion ? 0.5 : 1.3, ease: [0.65, 0, 0.35, 1] }}
      className="fixed inset-0 z-[80] flex cursor-pointer flex-col items-center justify-center bg-charcoal px-6 text-center"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.06]"
        style={{
          backgroundImage:
            "linear-gradient(to right, #f6f2ea 1px, transparent 1px), linear-gradient(to bottom, #f6f2ea 1px, transparent 1px)",
          backgroundSize: "64px 64px",
        }}
      />

      <motion.p
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="mb-6 font-mono text-xs tracking-[0.3em] text-champagne"
      >
        {person.role} · JAKARTA, INDONESIA
      </motion.p>

      <RevealText
        as="h1"
        text={person.displayName}
        mode="char"
        delay={0.35}
        className={`font-sans font-semibold leading-[0.9] tracking-tighter text-cream ${heroScale}`}
      />

      <motion.p
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.9 }}
        className="mt-6 max-w-md font-mono text-xs tracking-widest text-gray sm:text-sm"
      >
        {person.headline}
      </motion.p>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 1.2 }}
        className="mt-16 flex items-center gap-3 font-mono text-[11px] tracking-[0.25em] text-gray"
      >
        <motion.span
          animate={reduceMotion ? {} : { opacity: [1, 0.3, 1] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
          className="h-2 w-2 rounded-full border border-champagne"
        />
       
      </motion.div>
    </motion.div>
  );
}
