"use client";

import { motion } from "framer-motion";
import { EXAMPLES } from "@/lib/examples";
import { LANGUAGES } from "@/lib/language";
import { SLOT_META, SLOT_ORDER, slotClasses } from "@/lib/slots";
import { cn } from "@/lib/utils";
import SectionHeading from "@/components/shared/SectionHeading";
import HighlightedSentence from "@/components/demo/HighlightedSentence";
import { SlotTypeTag } from "@/components/demo/SlotBadge";
import type { Slot } from "@/types/nlp";
import { buildSegments } from "@/lib/utils";

const SAMPLES = [EXAMPLES[0], EXAMPLES[2]];

/** Turns the prepared example pieces into Slot objects */
function slotsOf(pieces: (typeof EXAMPLES)[number]["pieces"]): { text: string; slots: Slot[] } {
  const slots: Slot[] = [];
  let cursor = 0;
  for (const piece of pieces) {
    const value = typeof piece === "string" ? piece : piece.value;
    if (typeof piece !== "string") {
      slots.push({ value, type: piece.type, color: SLOT_META[piece.type].color, start: cursor, end: cursor + value.length });
    }
    cursor += value.length;
  }
  return { text: pieces.map((p) => (typeof p === "string" ? p : p.value)).join(""), slots };
}

export default function SlotExplanation() {
  return (
    <section aria-labelledby="slots-explained" className="mx-auto max-w-[1120px] px-5">
      <div className="grid gap-8 lg:grid-cols-[1fr_1.1fr] lg:gap-14">
        <div className="lg:order-2">
          <p className="mb-2 flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.16em] text-accent">
            <span className="font-mono">02</span> The details
          </p>
          <SectionHeading id="slots-explained" title="Slots — Identifying the Details" />
          <p className="mt-4 max-w-prose text-[15px] leading-[1.75] text-ink-2">
            Slots represent the specific information contained in a user&apos;s request. They help identify
            important details such as destination, date, time, and quantity.
          </p>

          <div className="mt-5 flex flex-wrap gap-2" aria-label="Slot types">
            {SLOT_ORDER.map((type) => {
              const meta = SLOT_META[type];
              const slot: Slot = { value: "", type, color: meta.color };
              return (
                <span
                  key={type}
                  className={cn(
                    "inline-flex items-center rounded-chip border px-2.5 py-1",
                    slotClasses(meta.color).badge,
                  )}
                >
                  <SlotTypeTag slot={slot} />
                </span>
              );
            })}
          </div>
        </div>

        <div className="space-y-3 lg:order-1">
          {SAMPLES.map((example, i) => {
            const language = LANGUAGES[example.language];
            const { text, slots } = slotsOf(example.pieces);
            const segments = buildSegments(text, slots);
            const slotCount = segments.filter((s) => s.slotIndex !== null).length;

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

                <HighlightedSentence
                  text={text}
                  slots={slots}
                  lang={language.lang}
                  baseDelay={0.2 + i * 0.1}
                  className="mt-2 text-lg leading-[2.3] text-ink"
                />

                <ul className="mt-3 space-y-1.5 border-t border-line pt-4 text-sm" aria-label={`${slotCount} slots`}>
                  {slots.map((slot) => (
                    <li key={slot.value} className="flex flex-wrap items-center gap-2 text-ink-2">
                      <span lang={language.lang} className="font-medium text-ink">
                        {slot.value}
                      </span>
                      <span aria-hidden>→</span>
                      <SlotTypeTag slot={slot} />
                    </li>
                  ))}
                </ul>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
