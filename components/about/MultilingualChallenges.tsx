"use client";

import { motion } from "framer-motion";
import { Blend, Globe2, MessagesSquare, PenLine, Type, type LucideIcon } from "lucide-react";
import SectionHeading from "@/components/shared/SectionHeading";

const CHALLENGES: { title: string; text: string; example?: string; icon: LucideIcon }[] = [
  {
    title: "Different writing systems",
    text: "English uses the Latin alphabet and Bengali uses its own script. A system has to read both, and often both in the same message.",
    example: "Dhaka  ·  ঢাকা",
    icon: Type,
  },
  {
    title: "Bengali transliteration",
    text: "Banglish writes Bengali words with English letters. There is no official spelling, so one word can appear in many forms.",
    example: "ticket  ·  tikit  ·  tiket",
    icon: PenLine,
  },
  {
    title: "Informal language",
    text: "People type the way they speak. They shorten words, skip punctuation, and make small spelling mistakes.",
    example: "agami kal dhakar ekta ticket chai",
    icon: MessagesSquare,
  },
  {
    title: "Code-mixing",
    text: "Many speakers mix languages inside one sentence, for example Bengali grammar with English nouns.",
    example: "ami ekta large pizza order korte chai",
    icon: Blend,
  },
  {
    title: "Language variations",
    text: "Regional dialects and personal habits change the words people choose, even when they mean the same thing.",
    icon: Globe2,
  },
];

export default function MultilingualChallenges() {
  return (
    <section aria-labelledby="why-multilingual" className="mx-auto max-w-[1120px] px-5">
      <p className="mb-2 flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.16em] text-accent">
        <span className="font-mono">04</span> The challenge
      </p>
      <SectionHeading
        id="why-multilingual"
        title="Why Multilingual NLP Matters"
        subtitle="Real people do not write in one clean language. Supporting them means handling all of this."
      />

      <ul className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {CHALLENGES.map((item, i) => {
          const Icon = item.icon;
          return (
            <motion.li
              key={item.title}
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.4, delay: (i % 3) * 0.08, ease: "easeOut" }}
              className="flex flex-col rounded-card border border-line bg-card p-5 shadow-card"
            >
              <span className="flex size-9 items-center justify-center rounded-field bg-soft text-accent">
                <Icon className="size-[18px]" aria-hidden />
              </span>
              <h3 className="mt-4 text-[17px] font-semibold text-ink">{item.title}</h3>
              <p className="mt-1.5 flex-1 text-[14.5px] leading-relaxed text-ink-2">{item.text}</p>
              {item.example && (
                <p className="mt-4 rounded-chip bg-bg-2 px-3 py-2 font-mono text-[12.5px] text-ink-2">
                  {item.example}
                </p>
              )}
            </motion.li>
          );
        })}
      </ul>
    </section>
  );
}
