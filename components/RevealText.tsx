"use client";

import { motion, useReducedMotion } from "framer-motion";
import { easeOut } from "@/lib/motion";

type RevealTextProps = {
  text: string;
  as?: "span" | "h1" | "h2" | "h3" | "p";
  className?: string;
  delay?: number;
  mode?: "char" | "word";
};

export default function RevealText({
  text,
  as = "span",
  className = "",
  delay = 0,
  mode = "word",
}: RevealTextProps) {
  const reduceMotion = useReducedMotion();
  const Tag = motion[as];
  const units = mode === "char" ? text.split("") : text.split(" ");

  if (reduceMotion) {
    return (
      <Tag className={className} initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
        {text}
      </Tag>
    );
  }

  return (
    <Tag className={className} aria-label={text}>
      {units.map((unit, i) => (
        <motion.span
          key={i}
          initial={{ opacity: 0, y: "0.6em" }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{
            duration: 0.6,
            ease: easeOut,
            delay: delay + i * (mode === "char" ? 0.02 : 0.06),
          }}
          className="inline-block"
          aria-hidden="true"
        >
          {unit}
          {mode === "word" && i < units.length - 1 ? " " : ""}
        </motion.span>
      ))}
    </Tag>
  );
}
