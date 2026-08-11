"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { person } from "@/lib/content";
import { easeOut } from "@/lib/motion";
import { heroScale } from "@/lib/typography";
import CodeSnippets, { TypedLine } from "./CodeSnippets";
import { codeSnippets, heroSkills } from "@/lib/content";

const name = person.displayName.split(" ");

export default function Hero() {
  const reduceMotion = useReducedMotion();
  const delayBase = reduceMotion ? 0 : 0.3;

  return (
    <section
      id="hero"
      className="relative flex min-h-screen flex-col justify-between overflow-hidden bg-charcoal px-6 pb-8 pt-28 lg:h-screen lg:min-h-0 lg:px-12 lg:pt-32 xl:px-20 2xl:px-28"
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

      <CodeSnippets count={14} />

      <div className="relative grid flex-1 grid-cols-1 items-center gap-12 overflow-hidden lg:grid-cols-[1.2fr_0.8fr] lg:gap-8">
        <div className="relative z-10">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: delayBase }}
            className="mb-4 font-mono text-xs tracking-[0.3em] text-champagne"
          >
            IT MANAGER · SOFTWARE · INFRASTRUCTURE
          </motion.p>

          <h1 className={`font-sans font-semibold leading-[0.85] tracking-tighter text-cream ${heroScale}`}>
            {name.map((word, i) => (
              <span key={word} className="block overflow-hidden">
                <motion.span
                  initial={{ y: "110%" }}
                  animate={{ y: "0%" }}
                  transition={{
                    duration: 0.9,
                    ease: easeOut,
                    delay: delayBase + 0.15 + i * 0.12,
                  }}
                  className="block"
                >
                  {word}
                </motion.span>
              </span>
            ))}
          </h1>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: delayBase + 0.55 }}
            className="mt-6 flex max-w-md items-center border border-champagne/40 px-3 py-2 font-mono text-sm tracking-wide text-gray"
          >
            <span className="mr-2 text-champagne">&gt;</span>
            {reduceMotion ? (
              <span>{heroSkills[0]}</span>
            ) : (
              <TypedLine lines={heroSkills} />
            )}
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: delayBase + 0.65 }}
            className="mt-3 max-w-lg text-base leading-relaxed text-cream-dim lg:text-base"
          >
            {person.intro}
          </motion.p>
        </div>

        <div className="relative z-0 mx-auto aspect-[3/4] w-full max-w-sm lg:mx-0 lg:aspect-auto lg:h-[52vh] lg:w-[24vw] lg:max-w-full lg:justify-self-end">
          <motion.div
            initial={{ clipPath: "inset(100% 0% 0% 0%)" }}
            animate={{ clipPath: "inset(0% 0% 0% 0%)" }}
            transition={{ duration: 1.2, ease: easeOut, delay: delayBase + 0.4 }}
            className="relative h-full w-full overflow-hidden border border-cream/10 bg-charcoal-soft"
          >
            <div className="relative h-full w-full">
              <Image
                src="/images/profile.png"
                alt={person.fullName}
                fill
                priority
                sizes="(min-width: 1024px) 24vw, 384px"
                className="object-cover object-top"
              />
              {!reduceMotion && (
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-0 flex flex-col justify-between p-4 font-mono text-[10px] tracking-wide text-champagne/15"
                >
                  <TypedLine lines={[codeSnippets[0]]} />
                  <TypedLine lines={[codeSnippets[3]]} className="self-end" />
                </div>
              )}
            </div>
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-charcoal/60 via-transparent to-transparent" />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: delayBase + 1 }}
            className="absolute -bottom-6 left-1/2 w-[calc(100%-1.5rem)] -translate-x-1/2 border border-champagne/30 bg-charcoal/90 px-4 py-3 backdrop-blur-sm lg:bottom-6 lg:left-6 lg:w-auto lg:min-w-[200px] lg:translate-x-0"
          >
            <div className="flex flex-col gap-1 font-mono text-[10px] tracking-widest text-gray">
              <span className="text-champagne">{person.role}</span>
              <span>{person.location.toUpperCase()}</span>
              <span>AVAILABLE FOR COLLABORATION</span>
            </div>
          </motion.div>
        </div>
      </div>

      <div className="relative z-10 mt-6 flex items-end justify-between font-mono text-xs tracking-[0.2em] text-gray">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: delayBase + 1.1 }}
          className="flex items-center gap-3"
        >
          <motion.span
            animate={reduceMotion ? {} : { y: [0, 6, 0] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
            className="text-champagne"
          >
            &#8595;
          </motion.span>
          SCROLL TO EXPLORE
        </motion.div>
        <motion.span
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: delayBase + 1.1 }}
        >
          01 / 07
        </motion.span>
      </div>
    </section>
  );
}
