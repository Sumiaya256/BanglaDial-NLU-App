"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import type { LanguageCode } from "@/types/nlp";
import { EXAMPLES, type Example } from "@/lib/examples";
import { INTENTS } from "@/lib/intents";
import { LANGUAGES } from "@/lib/language";
import { cn } from "@/lib/utils";
import SectionHeading from "@/components/shared/SectionHeading";
import IntentIcon from "@/components/shared/IntentIcon";

type Props = {
  onSelect: (example: Example) => void;
  /** Only show examples of this language (null = all) */
  language: LanguageCode | null;
  /** The example that is currently in the input box */
  selectedId?: string | null;
};

export default function ExampleExplorer({ onSelect, language, selectedId }: Props) {
  const examples = language ? EXAMPLES.filter((e) => e.language === language) : EXAMPLES;

  return (
    <section aria-labelledby="examples-title" className="mx-auto mt-14 max-w-[1120px] px-5">
      <SectionHeading
        id="examples-title"
        title="Try an Example"
        subtitle="Choose a sample sentence to explore how the system works."
      />

      {/* key restarts the one-by-one entrance when the filter changes */}
      <ul key={language ?? "all"} className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {examples.map((example, i) => {
          const selected = selectedId === example.id;
          const exampleLanguage = LANGUAGES[example.language];
          const intent = INTENTS[example.intent];

          return (
            <motion.li
              key={example.id}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35, delay: i * 0.06, ease: "easeOut" }}
            >
              <button
                type="button"
                onClick={() => onSelect(example)}
                aria-pressed={selected}
                className={cn(
                  "focus-ring group flex h-full w-full flex-col rounded-card border bg-card p-4 text-left shadow-card transition duration-200 hover:-translate-y-0.5 hover:border-accent/50",
                  selected ? "border-accent ring-1 ring-accent/40" : "border-line",
                )}
              >
                <span className="flex items-center justify-between">
                  <span className="rounded-chip bg-bg-2 px-2 py-0.5 text-[11px] font-semibold tracking-wide text-ink-2">
                    {exampleLanguage.code} · <span lang={exampleLanguage.lang}>{exampleLanguage.name}</span>
                  </span>
                  <ArrowRight
                    className="size-4 text-accent opacity-0 transition-opacity group-hover:opacity-100 group-focus-visible:opacity-100"
                    aria-hidden
                  />
                </span>

                <span lang={exampleLanguage.lang} className="mt-3 flex-1 text-[15px] leading-relaxed text-ink">
                  {example.text}
                </span>

                <span className="mt-4 flex items-center gap-1.5 border-t border-line pt-3 text-xs text-ink-2">
                  <IntentIcon name={intent.icon} className="size-3.5 text-accent" />
                  {intent.label}
                </span>
              </button>
            </motion.li>
          );
        })}
      </ul>
    </section>
  );
}
