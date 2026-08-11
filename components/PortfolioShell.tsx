"use client";

import { useEffect, useState, type ReactNode } from "react";
import { AnimatePresence } from "framer-motion";
import IntroGate from "./IntroGate";
import Navigation from "./Navigation";
import ScrollProgress from "./ScrollProgress";
import CustomCursor from "./CustomCursor";

export default function PortfolioShell({ children }: { children: ReactNode }) {
  const [entered, setEntered] = useState(false);

  useEffect(() => {
    document.documentElement.classList.toggle("no-scroll", !entered);
    return () => document.documentElement.classList.remove("no-scroll");
  }, [entered]);

  return (
    <>
      <AnimatePresence onExitComplete={() => {}}>
        {!entered && <IntroGate key="intro-gate" onEnter={() => setEntered(true)} />}
      </AnimatePresence>

      {entered && (
        <>
          <CustomCursor />
          <Navigation />
          <ScrollProgress />
        </>
      )}

      {children}
    </>
  );
}
