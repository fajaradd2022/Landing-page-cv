"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { useIsTouchDevice } from "@/lib/hooks";

type CursorState = "default" | "button" | "project" | "image" | "link";

const labels: Record<CursorState, string> = {
  default: "",
  button: "",
  project: "VIEW",
  image: "EXPLORE",
  link: "",
};

export default function CustomCursor() {
  const isTouch = useIsTouchDevice();
  const [state, setState] = useState<CursorState>("default");
  const [visible, setVisible] = useState(false);

  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const sx = useSpring(x, { stiffness: 500, damping: 40, mass: 0.5 });
  const sy = useSpring(y, { stiffness: 500, damping: 40, mass: 0.5 });

  useEffect(() => {
    if (isTouch) return;

    const move = (e: MouseEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
      if (!visible) setVisible(true);
    };

    const over = (e: MouseEvent) => {
      const target = (e.target as HTMLElement).closest("[data-cursor]");
      const value = target?.getAttribute("data-cursor") as CursorState | null;
      setState(value ?? "default");
    };

    window.addEventListener("mousemove", move);
    window.addEventListener("mouseover", over);
    return () => {
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mouseover", over);
    };
  }, [isTouch, visible, x, y]);

  if (isTouch) return null;

  const sizes: Record<CursorState, number> = {
    default: 12,
    button: 56,
    project: 88,
    image: 88,
    link: 32,
  };

  return (
    <motion.div
      className="pointer-events-none fixed left-0 top-0 z-[70] hidden items-center justify-center rounded-full mix-blend-difference lg:flex"
      style={{
        x: sx,
        y: sy,
        translateX: "-50%",
        translateY: "-50%",
        opacity: visible ? 1 : 0,
      }}
      animate={{
        width: sizes[state],
        height: sizes[state],
        backgroundColor: state === "default" ? "#f6f2ea" : "transparent",
        border: state === "default" ? "0px solid transparent" : "1px solid #f6f2ea",
      }}
      transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
    >
      {labels[state] && (
        <span className="font-mono text-[10px] tracking-widest text-cream">{labels[state]}</span>
      )}
      {state === "link" && (
        <span className="font-mono text-xs text-cream">&#8594;</span>
      )}
    </motion.div>
  );
}
