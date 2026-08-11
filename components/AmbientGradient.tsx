"use client";

import { motion, useReducedMotion } from "framer-motion";

type Variant = "top-left" | "center" | "bottom-right";

const positions: Record<
  Variant,
  { className: string; path: { x: string[]; y: string[]; scale: number[] } }
> = {
  "top-left": {
    className: "-left-[10%] -top-[10%] h-[60vw] w-[60vw]",
    path: { x: ["0%", "25%", "-15%", "0%"], y: ["0%", "20%", "10%", "0%"], scale: [1, 1.15, 0.9, 1] },
  },
  center: {
    className: "left-1/2 top-1/2 h-[55vw] w-[55vw] -translate-x-1/2 -translate-y-1/2",
    path: { x: ["0%", "-20%", "20%", "0%"], y: ["0%", "18%", "-18%", "0%"], scale: [1, 0.88, 1.2, 1] },
  },
  "bottom-right": {
    className: "-bottom-[10%] -right-[10%] h-[60vw] w-[60vw]",
    path: { x: ["0%", "-25%", "15%", "0%"], y: ["0%", "-20%", "-10%", "0%"], scale: [1, 1.2, 0.9, 1] },
  },
};

export default function AmbientGradient({
  variant = "top-left",
  color = "champagne",
}: {
  variant?: Variant;
  color?: "champagne" | "cream" | "gray";
}) {
  const reduceMotion = useReducedMotion();
  const { className, path } = positions[variant];

  const colorVar = {
    champagne: "#c9a978",
    cream: "#f6f2ea",
    gray: "#9a968d",
  }[color];

  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
      <motion.div
        animate={reduceMotion ? undefined : { x: path.x, y: path.y, scale: path.scale }}
        transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
        className={`absolute rounded-full blur-3xl ${className}`}
        style={{
          background: `radial-gradient(circle, ${colorVar}55 0%, transparent 70%)`,
        }}
      />
    </div>
  );
}
