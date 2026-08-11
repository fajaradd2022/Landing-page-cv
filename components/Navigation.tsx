"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { sections } from "@/lib/content";
import { useActiveSection } from "@/lib/hooks";

const ids = sections.map((s) => s.id);
const navItems = sections.filter((s) => s.id !== "hero");

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const active = useActiveSection(ids);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
          scrolled ? "backdrop-blur-md bg-charcoal/70 border-b border-cream/10" : "bg-transparent"
        }`}
      >
        <div className="mx-auto flex max-w-[1800px] items-center justify-between px-8 py-5 lg:px-20 xl:px-28 2xl:px-36">
          <a href="#hero" className="group font-mono text-sm tracking-widest text-cream" aria-label="Fajar Sodiq — home">
            <span className="text-champagne">F</span>
            <span className="text-gray"> / </span>
            <span className="text-champagne">S</span>
          </a>

          <nav className="hidden items-center gap-8 md:flex">
            {navItems.map((item) => (
              <a
                key={item.id}
                href={`#${item.id}`}
                className={`font-mono text-xs tracking-[0.2em] transition-colors ${
                  active === item.id ? "text-champagne" : "text-gray hover:text-cream"
                }`}
              >
                {item.label}
              </a>
            ))}
          </nav>

          <button
            onClick={() => setMenuOpen(true)}
            className="flex items-center gap-2 font-mono text-xs tracking-widest text-cream md:hidden"
            aria-label="Open menu"
          >
            MENU
            <Menu size={16} />
          </button>
        </div>
      </header>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ clipPath: "circle(0% at 100% 0%)" }}
            animate={{ clipPath: "circle(150% at 100% 0%)" }}
            exit={{ clipPath: "circle(0% at 100% 0%)" }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 z-50 flex flex-col bg-charcoal"
          >
            <div className="flex items-center justify-between px-6 py-5">
              <span className="font-mono text-sm tracking-widest text-champagne">F / S</span>
              <button
                onClick={() => setMenuOpen(false)}
                className="text-cream"
                aria-label="Close menu"
              >
                <X size={22} />
              </button>
            </div>
            <nav className="flex flex-1 flex-col items-start justify-center gap-6 px-8">
              {navItems.map((item, i) => (
                <motion.a
                  key={item.id}
                  href={`#${item.id}`}
                  onClick={() => setMenuOpen(false)}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 + i * 0.06 }}
                  className="font-sans text-4xl font-medium tracking-tight text-cream"
                >
                  <span className="mr-3 font-mono text-sm text-champagne">{item.num}</span>
                  {item.label}
                </motion.a>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
