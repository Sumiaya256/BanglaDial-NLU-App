"use client";

import { motion } from "framer-motion";
import { SITE } from "@/lib/site";

const rise = (delay: number) => ({
  initial: { opacity: 0, y: 14 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5, delay, ease: "easeOut" as const },
});

export default function HeroSection() {
  return (
    <section aria-labelledby="hero-title" className="mx-auto max-w-[1120px] px-5 pb-8 pt-14 text-center sm:pt-20">
      <motion.p
        {...rise(0)}
        className="text-[11px] font-semibold uppercase tracking-[0.18em] text-accent"
      >
        Multilingual NLP Research Demo
      </motion.p>

      <motion.h1
        {...rise(0.08)}
        id="hero-title"
        className="mt-5 text-[2.5rem] font-semibold leading-[1.1] tracking-tight text-ink md:text-5xl"
      >
        Understand Language.
        <br />
        <span className="relative inline-block text-accent">
          <span
            aria-hidden
            className="absolute inset-x-[-6px] bottom-[0.06em] h-[0.34em] rounded-sm bg-accent/15"
          />
          <span className="relative">Extract Meaning.</span>
        </span>
      </motion.h1>

      <motion.p
        {...rise(0.16)}
        className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-ink-2 sm:text-[17px]"
      >
        Explore how multilingual NLP understands user intentions and identifies meaningful information across
        English, Bengali, and Banglish.
      </motion.p>
      <span className="sr-only">{SITE.subtitle}</span>
    </section>
  );
}
