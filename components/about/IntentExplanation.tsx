"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { EXAMPLES } from "@/lib/examples";
import { INTENTS } from "@/lib/intents";
import { LANGUAGES } from "@/lib/language";
import SectionHeading from "@/components/shared/SectionHeading";
import IntentIcon from "@/components/shared/IntentIcon";

// One English and one Bengali sentence
const SAMPLES = [EXAMPLES[0], EXAMPLES[2]];

export default function IntentExplanation() {
  return (
    <section aria-labelledby="intent-explained" className="mx-auto max-w-[1120px] px-5">
      <div className="grid gap-8 lg:grid-cols-[1fr_1.1fr] lg:gap-14">
        <div>
          <p className="mb-2 flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.16em] text-accent">
            <span className="font-mono">01</span> The goal
          </p>
          <SectionHeading id="intent-explained" title="Intent — Understanding the Goal" />
          <p className="mt-4 max-w-prose text-[15px] leading-[1.75] text-ink-2">
            Intent represents the main purpose behind a user&apos;s sentence. It answers one simple question:{" "}
            <em className="not-italic font-medium text-ink">What is the user trying to do?</em>
          </p>
          <p className="mt-3 max-w-prose text-[15px] leading-[1.75] text-ink-2">
            Different sentences can share one intent. Whether someone writes in English or Bengali, the system
            should understand that both people want the same thing.
          </p>
        </div>

        <div className="space-y-3">
          {SAMPLES.map((example, i) => {
            const language = LANGUAGES[example.language];
            const intent = INTENTS[example.intent];
            return (
              <motion.div
                key={example.id}
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.4, delay: i * 0.1, ease: "easeOut" }}
                className="rounded-card border border-line bg-card p-5 shadow-card"
              >
                <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-muted">
                  {language.code} · <span lang={language.lang}>{language.name}</span> input
                </p>
                <p lang={language.lang} className="mt-2 text-lg text-ink">
                  &ldquo;{example.text}&rdquo;
                </p>

                <div className="mt-4 flex items-center gap-3 border-t border-line pt-4">
                  <ArrowRight className="size-4 shrink-0 text-muted" aria-hidden />
                  <span className="text-xs text-ink-2">Detected intent</span>
                  <span className="inline-flex items-center gap-2 rounded-chip bg-soft px-2.5 py-1 font-mono text-[13px] font-semibold text-accent">
                    <IntentIcon name={intent.icon} className="size-3.5" />
                    {example.intent}
                  </span>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
