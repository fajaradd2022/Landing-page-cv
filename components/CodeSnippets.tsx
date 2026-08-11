"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { codeSnippets } from "@/lib/content";

const TYPE_SPEED = 45;
const HOLD_MS = 1800;
const FADE_MS = 500;
const GAP_MS = 900;
const REPOSITION_MS = 6000;

type Phase = "typing" | "holding" | "fading" | "gap";
type Point = { top: number; left: number };

const SAFE_ZONES: { top: [number, number]; left: [number, number] }[] = [
  { top: [2, 12], left: [2, 98] }, // strip atas
  { top: [80, 94], left: [2, 98] }, // strip bawah
  { top: [10, 78], left: [2, 6] }, // kolom kiri-luar
  { top: [10, 90], left: [46, 58] }, // celah tengah
  { top: [2, 18], left: [60, 98] }, // kanan-atas, di atas kartu foto
];

function randomSafePoint(): Point {
  const zone = SAFE_ZONES[Math.floor(Math.random() * SAFE_ZONES.length)];
  const top = zone.top[0] + Math.random() * (zone.top[1] - zone.top[0]);
  const left = zone.left[0] + Math.random() * (zone.left[1] - zone.left[0]);
  return { top, left };
}

function randomLine(): string {
  return codeSnippets[Math.floor(Math.random() * codeSnippets.length)];
}

export function TypedLine({
  lines,
  className = "",
  onCycle,
}: {
  lines: readonly string[];
  className?: string;
  onCycle?: () => void;
}) {
  const [lineIndex, setLineIndex] = useState(0);
  const [charCount, setCharCount] = useState(0);
  const [phase, setPhase] = useState<Phase>("typing");

  const current = lines[lineIndex];

  useEffect(() => {
    let timeout: ReturnType<typeof setTimeout>;

    if (phase === "typing") {
      if (charCount < current.length) {
        timeout = setTimeout(() => setCharCount((c) => c + 1), TYPE_SPEED);
      } else {
        timeout = setTimeout(() => setPhase("holding"), HOLD_MS);
      }
    } else if (phase === "holding") {
      timeout = setTimeout(() => setPhase("fading"), 10);
    } else if (phase === "fading") {
      timeout = setTimeout(() => setPhase("gap"), FADE_MS);
    } else if (phase === "gap") {
      timeout = setTimeout(() => {
        setCharCount(0);
        setLineIndex((i) => (i + 1) % lines.length);
        setPhase("typing");
        onCycle?.();
      }, GAP_MS);
    }

    return () => clearTimeout(timeout);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [phase, charCount, current, lines]);

  return (
    <motion.span
      animate={{ opacity: phase === "fading" || phase === "gap" ? 0 : 1 }}
      transition={{ duration: FADE_MS / 1000 }}
      className={className}
    >
      {current.slice(0, charCount)}
      <span className="animate-pulse">_</span>
    </motion.span>
  );
}

function DriftingSnippet({ initialDelay }: { initialDelay: number }) {
  const [point, setPoint] = useState<Point>(() => randomSafePoint());
  const [line, setLine] = useState<string>(() => randomLine());
  const timerRef = useRef<ReturnType<typeof setInterval>>(undefined);

  useEffect(() => {
    const startTimeout = setTimeout(() => {
      timerRef.current = setInterval(() => {
        setPoint(randomSafePoint());
        setLine(randomLine());
      }, REPOSITION_MS);
    }, initialDelay);

    return () => {
      clearTimeout(startTimeout);
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [initialDelay]);

  return (
    <motion.div
      key={`${point.top}-${point.left}`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="absolute whitespace-nowrap font-mono text-[11px] tracking-wide text-champagne/25"
      style={{ top: `${point.top}%`, left: `${point.left}%` }}
    >
      <TypedLine lines={[line]} />
    </motion.div>
  );
}

export default function CodeSnippets({ count = 14 }: { count?: number }) {
  const reduceMotion = useReducedMotion();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  if (reduceMotion || !mounted) return null;

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 z-[1] hidden lg:block"
    >
      {Array.from({ length: count }, (_, i) => (
        <DriftingSnippet key={i} initialDelay={i * 400} />
      ))}
    </div>
  );
}
