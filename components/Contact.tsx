"use client";

import { motion } from "framer-motion";
import { Mail, FileDown, Globe } from "lucide-react";
import { SiInstagram } from "react-icons/si";
import { FaLinkedin } from "react-icons/fa";
import { contact, person, sections } from "@/lib/content";
import SectionLabel from "./SectionLabel";
import RevealText from "./RevealText";
import { fadeUp, viewportOnce } from "@/lib/motion";
import { displayScale } from "@/lib/typography";
import AmbientGradient from "./AmbientGradient";

const section = sections.find((s) => s.id === "contact")!;

export default function Contact() {
  return (
    <section id="contact" className="relative border-t border-cream/10 bg-charcoal px-6 py-28 lg:px-12 lg:py-40 xl:px-20 2xl:px-28">
      <AmbientGradient variant="bottom-right" color="cream" />
      <SectionLabel num={section.num} label={section.label} className="mb-10" />

      <h2 className={`mb-6 font-sans font-semibold leading-[0.9] tracking-tighter text-cream ${displayScale}`}>
        {contact.heading.map((line, i) => (
          <RevealText key={line} as="span" text={line} mode="word" delay={i * 0.1} className="block" />
        ))}
      </h2>

      <motion.p
        variants={fadeUp}
        initial="hidden"
        whileInView="visible"
        viewport={viewportOnce}
        className="mb-12 max-w-lg text-lg text-cream-dim"
      >
        {contact.supporting}
      </motion.p>

      <motion.div
        variants={fadeUp}
        initial="hidden"
        whileInView="visible"
        viewport={viewportOnce}
        custom={1}
        className="flex flex-col gap-4 sm:flex-row"
      >
        <a
          href={`mailto:${person.email}`}
          data-cursor="button"
          className="flex items-center justify-center gap-3 border border-champagne bg-champagne px-8 py-4 font-mono text-xs tracking-[0.2em] text-charcoal transition-transform hover:-translate-y-0.5"
        >
          <Mail size={16} />
          EMAIL ME
        </a>
        <a
          href="https://drive.google.com/file/d/1P-LpKZfmKv7yI9KGr4Cpr2rchbrSvfl4/view?usp=sharing"
          target="_blank"
          rel="noreferrer"
          data-cursor="button"
          className="flex items-center justify-center gap-3 border border-cream/20 px-8 py-4 font-mono text-xs tracking-[0.2em] text-cream transition-colors hover:border-champagne hover:text-champagne"
        >
          <FileDown size={16} />
          VIEW CV
        </a>
      </motion.div>

      <motion.div
        variants={fadeUp}
        initial="hidden"
        whileInView="visible"
        viewport={viewportOnce}
        custom={2}
        className="mt-16 grid grid-cols-1 gap-6 border-t border-cream/10 pt-10 font-mono text-sm text-gray sm:grid-cols-2 lg:grid-cols-4"
      >
        <a
          href={`mailto:${person.email}`}
          className="flex items-center gap-2 hover:text-champagne"
          data-cursor="link"
        >
          <Mail size={16} />
          {person.email}
        </a>
        <a
          href={person.website}
          target="_blank"
          rel="noreferrer"
          className="flex items-center gap-2 hover:text-champagne"
          data-cursor="link"
        >
          <Globe size={16} />
          {person.website.replace("https://", "")}
        </a>
        <a
          href="https://www.instagram.com/moh.fajar/?hl=en"
          target="_blank"
          rel="noreferrer"
          className="flex items-center gap-2 hover:text-champagne"
          data-cursor="link"
        >
          <SiInstagram size={16} />
          moh.fajar
        </a>
        <a
          href="https://www.linkedin.com/in/moh-fajar-sodiq-906ab02a4/"
          target="_blank"
          rel="noreferrer"
          className="flex items-center gap-2 hover:text-champagne"
          data-cursor="link"
        >
          <FaLinkedin size={16} />
          Moh Fajar Sodiq
        </a>
      </motion.div>
    </section>
  );
}
