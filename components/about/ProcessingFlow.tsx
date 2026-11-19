"use client";

import { motion } from "framer-motion";
import { Braces, Filter, Languages, MessageSquareText, Tags, Target, type LucideIcon } from "lucide-react";
import SectionHeading from "@/components/shared/SectionHeading";

const STAGES: { title: string; text: string; icon: LucideIcon }[] = [
  { title: "User Input", text: "A person types or says a sentence in any supported language.", icon: MessageSquareText },
  { title: "Language Identification", text: "The system works out whether the text is English, Bengali, or Banglish.", icon: Languages },
  { title: "Text Preprocessing", text: "The text is cleaned and split into small pieces the model can read.", icon: Filter },
  { title: "Intent Classification", text: "The model decides what the user is trying to do.", icon: Target },
  { title: "Slot Extraction", text: "The model finds the important details, like places, dates, and quantities.", icon: Tags },
  { title: "Structured Output", text: "The intent and slots are returned in a clean format that apps can use.", icon: Braces },
];

export default function ProcessingFlow() {
  return (
    <section aria-labelledby="pipeline" className="mx-auto max-w-[1120px] px-5">
      <p className="mb-2 flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.16em] text-accent">
        <span className="font-mono">03</span> The pipeline
      </p>
      <SectionHeading
        id="pipeline"
        title="From Sentence to Structured Meaning"
        subtitle="Every sentence passes through six stages before the system returns its answer."
      />

      <div className="mt-8 rounded-panel border border-line bg-card p-6 shadow-card sm:p-8">
        {/* One column with a vertical line on small screens, six columns with a horizontal line on large ones */}
        <ol className="relative grid gap-8 lg:grid-cols-6 lg:gap-4">
          <span
            aria-hidden
            className="absolute bottom-6 left-[19px] top-6 w-px bg-line lg:bottom-auto lg:left-[8%] lg:right-[8%] lg:top-[19px] lg:h-px lg:w-auto"
          />

          {STAGES.map((stage, i) => {
            const Icon = stage.icon;
            return (
              <motion.li
                key={stage.title}
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.4, delay: i * 0.08, ease: "easeOut" }}
                className="relative flex gap-4 lg:flex-col lg:items-center lg:gap-0 lg:text-center"
              >
                <span className="relative z-10 flex size-10 shrink-0 items-center justify-center rounded-full border border-line bg-card text-accent">
                  <Icon className="size-[18px]" aria-hidden />
                  <span className="absolute -right-1.5 -top-1.5 flex size-[18px] items-center justify-center rounded-full bg-accent font-mono text-[10px] font-semibold text-on-accent">
                    {i + 1}
                  </span>
                </span>

                <div className="lg:mt-4">
                  <h3 className="text-[15px] font-semibold leading-snug text-ink">{stage.title}</h3>
                  <p className="mt-1 text-[13.5px] leading-relaxed text-ink-2">{stage.text}</p>
                </div>
              </motion.li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
