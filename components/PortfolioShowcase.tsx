"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Award, FolderOpen, Layers } from "lucide-react";
import {
  SiJavascript,
  SiPython,
  SiPhp,
  SiOpenjdk,
  SiReact,
  SiNextdotjs,
  SiVuedotjs,
  SiNodedotjs,
  SiLaravel,
  SiHtml5,
  SiCss,
  SiTailwindcss,
  SiMysql,
  SiPostgresql,
  SiDocker,
  SiLinux,
  SiGit,
  SiGithub,
  SiNginx,
} from "react-icons/si";
import type { IconType } from "react-icons";
import { selectedWork, sections, techStackNames } from "@/lib/content";
import SectionLabel from "./SectionLabel";
import { fadeUp, viewportOnce } from "@/lib/motion";
import AmbientGradient from "./AmbientGradient";

const section = sections.find((s) => s.id === "work")!;

const techIcons: Record<string, IconType> = {
  JAVASCRIPT: SiJavascript,
  PYTHON: SiPython,
  PHP: SiPhp,
  JAVA: SiOpenjdk,
  REACT: SiReact,
  "NEXT.JS": SiNextdotjs,
  "VUE.JS": SiVuedotjs,
  "NODE.JS": SiNodedotjs,
  LARAVEL: SiLaravel,
  HTML: SiHtml5,
  CSS: SiCss,
  "TAILWIND CSS": SiTailwindcss,
  MYSQL: SiMysql,
  POSTGRESQL: SiPostgresql,
  DOCKER: SiDocker,
  LINUX: SiLinux,
  GIT: SiGit,
  GITHUB: SiGithub,
  NGINX: SiNginx,
};

const tabs = [
  { key: "projects", label: "PROJECTS", icon: FolderOpen },
  { key: "certificates", label: "CERTIFICATES", icon: Award },
  { key: "techstack", label: "TECH STACK", icon: Layers },
] as const;

type TabKey = (typeof tabs)[number]["key"];

function ProjectsGrid() {
  return (
    <div className="grid grid-cols-1 gap-px border border-cream/10 bg-cream/10 sm:grid-cols-2 lg:grid-cols-3">
      {selectedWork.map((item, i) => (
        <motion.div
          key={item.num}
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          custom={i}
          className="flex flex-col gap-3 bg-charcoal p-6"
        >
          <span className="font-mono text-xs text-champagne">{item.num}</span>
          <h4 className="font-sans text-lg font-semibold text-cream">{item.category}</h4>
          <p className="text-sm leading-relaxed text-cream-dim">{item.desc}</p>
          <div className="mt-2 flex flex-wrap gap-2">
            {item.tags.map((tag) => (
              <span
                key={tag}
                className="border border-cream/15 px-2 py-1 font-mono text-[10px] tracking-widest text-gray"
              >
                {tag}
              </span>
            ))}
          </div>
        </motion.div>
      ))}
    </div>
  );
}

function CertificatesEmpty() {
  return (
    <div className="flex flex-col items-center justify-center gap-4 border border-dashed border-cream/15 py-24 text-center">
      <Award className="text-gray-soft" size={28} strokeWidth={1.5} />
      <p className="font-mono text-xs tracking-[0.2em] text-gray">NO CERTIFICATES YET</p>
    </div>
  );
}

function TechStackGrid() {
  return (
    <div className="grid grid-cols-3 gap-px border border-cream/10 bg-cream/10 sm:grid-cols-4 lg:grid-cols-6">
      {techStackNames.map((name, i) => {
        const Icon = techIcons[name];
        return (
          <motion.div
            key={name}
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
            custom={i}
            className="group flex flex-col items-center justify-center gap-3 bg-charcoal p-6 transition-colors hover:bg-charcoal-soft"
          >
            {Icon && (
              <Icon
                className="text-cream-dim transition-colors group-hover:text-champagne"
                size={28}
              />
            )}
            <span className="text-center font-mono text-[10px] tracking-widest text-gray">
              {name}
            </span>
          </motion.div>
        );
      })}
    </div>
  );
}

export default function PortfolioShowcase() {
  const [active, setActive] = useState<TabKey>("projects");

  return (
    <section id="work" className="relative border-t border-cream/10 bg-charcoal px-6 py-28 lg:px-12 lg:py-40 xl:px-20 2xl:px-28">
      <AmbientGradient variant="top-left" color="gray" />
      <SectionLabel num={section.num} label={section.label} className="mb-4" />
      <h2 className="mb-4 font-sans text-5xl font-semibold tracking-tight text-cream lg:text-6xl">
        PORTFOLIO SHOWCASE
      </h2>
      <p className="mb-12 max-w-xl font-mono text-sm text-gray">
        Projects, certifications, and technical expertise — organized by category.
      </p>

      <div className="mb-12 flex flex-wrap gap-3 border-b border-cream/10 pb-6">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = active === tab.key;
          return (
            <button
              key={tab.key}
              type="button"
              onClick={() => setActive(tab.key)}
              data-cursor="button"
              className={`flex items-center gap-2 border px-4 py-2 font-mono text-xs tracking-widest transition-colors ${
                isActive
                  ? "border-champagne bg-champagne/10 text-champagne"
                  : "border-cream/15 text-gray hover:border-cream/30 hover:text-cream"
              }`}
            >
              <Icon size={14} />
              {tab.label}
            </button>
          );
        })}
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={active}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.35 }}
        >
          {active === "projects" && <ProjectsGrid />}
          {active === "certificates" && <CertificatesEmpty />}
          {active === "techstack" && <TechStackGrid />}
        </motion.div>
      </AnimatePresence>
    </section>
  );
}
