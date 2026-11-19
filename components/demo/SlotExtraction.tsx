"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import type { AnalysisResult } from "@/types/nlp";
import { LANGUAGES } from "@/lib/language";
import { slotMeta, slotClasses } from "@/lib/slots";
import { cn } from "@/lib/utils";
import HighlightedSentence from "@/components/demo/HighlightedSentence";
import { SlotTypeTag } from "@/components/demo/SlotBadge";

export default function SlotExtraction({ result }: { result: AnalysisResult }) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const { slots } = result;

  return (
    <motion.section
      aria-labelledby="slots-title"
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      // the intent card appears first, this one follows about 0.2 s later
      transition={{ duration: 0.4, delay: 0.2, ease: "easeOut" }}
      className="rounded-card border border-line bg-card p-5 shadow-card"
    >
      <h3 id="slots-title" className="text-[11px] font-semibold uppercase tracking-[0.16em] text-ink-2">
        Slot extraction
      </h3>

      <p className="mt-4 text-xs text-ink-2">Sentence with extracted details</p>
      <HighlightedSentence
        text={result.originalText}
        slots={slots}
        lang={LANGUAGES[result.detectedLanguage]?.lang}
        activeIndex={activeIndex}
        onActiveChange={setActiveIndex}
        baseDelay={0.45}
        className="mt-2 rounded-field bg-bg px-4 py-4 text-lg leading-[2.4] text-ink sm:text-xl sm:leading-[2.4]"
      />

      {slots.length > 0 ? (
        <div className="mt-5 overflow-hidden rounded-field border border-line">
          <table className="w-full text-left text-sm">
            <caption className="sr-only">Extracted values and their slot types</caption>
            <thead className="bg-bg-2 text-[11px] uppercase tracking-[0.12em] text-ink-2">
              <tr>
                <th scope="col" className="px-4 py-2.5 font-semibold">
                  Extracted value
                </th>
                <th scope="col" className="px-4 py-2.5 font-semibold">
                  Slot type
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-line">
              {slots.map((slot, i) => (
                <tr
                  key={`${slot.type}-${slot.value}-${i}`}
                  onMouseEnter={() => setActiveIndex(i)}
                  onMouseLeave={() => setActiveIndex(null)}
                  className={cn("transition-colors", activeIndex === i && "bg-bg-2/70")}
                >
                  <td className="px-4 py-3 font-medium text-ink">
                    <span className="flex items-center gap-2.5">
                      <span
                        aria-hidden
                        className={cn("size-2 shrink-0 rounded-full", slotClasses(slot.color).dot)}
                      />
                      <span lang={LANGUAGES[result.detectedLanguage]?.lang}>{slot.value}</span>
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <SlotTypeTag slot={slot} />
                    <span className="sr-only"> {slotMeta(slot.type).label}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p className="mt-5 rounded-field border border-dashed border-line px-4 py-3 text-sm text-ink-2">
          No slots were extracted from this sentence.
        </p>
      )}
    </motion.section>
  );
}
