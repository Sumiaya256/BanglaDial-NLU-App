"use client";

import { motion } from "framer-motion";
import { EXAMPLES, type Example } from "@/lib/examples";
import { LANGUAGES } from "@/lib/language";

// One suggestion per language
const SUGGESTIONS = [EXAMPLES[0], EXAMPLES[2], EXAMPLES[5]];

export default function EmptyState({ onPick }: { onPick: (example: Example) => void }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="rounded-panel border border-dashed border-line bg-card/60 px-6 py-10 text-center sm:py-12"
    >
      {/* A sentence drawn as small blocks, two of them highlighted like slots */}
      <svg
        viewBox="0 0 300 92"
        className="mx-auto h-[92px] w-[300px] max-w-full"
        role="img"
        aria-label="A sentence broken into words, with two words highlighted"
      >
        <g className="fill-line">
          <rect x="6" y="10" width="64" height="12" rx="6" />
          <rect x="78" y="10" width="40" height="12" rx="6" />
          <rect x="196" y="10" width="62" height="12" rx="6" />
          <rect x="6" y="64" width="52" height="12" rx="6" />
          <rect x="204" y="64" width="86" height="12" rx="6" />
        </g>
        <rect x="126" y="4" width="62" height="24" rx="8" className="fill-soft stroke-accent" strokeWidth="1.2" />
        <rect x="136" y="13" width="42" height="6" rx="3" className="fill-accent" />
        <rect x="66" y="58" width="130" height="24" rx="8" className="fill-soft stroke-accent-2" strokeWidth="1.2" strokeDasharray="4 3" />
        <rect x="76" y="67" width="110" height="6" rx="3" className="fill-accent-2" />
        <path d="M157 28 V46 M131 58 V46 H157" className="stroke-muted" strokeWidth="1.2" fill="none" strokeLinecap="round" strokeLinejoin="round" />
      </svg>

      <h3 className="mt-5 text-lg font-semibold text-ink">No analysis yet</h3>
      <p className="mx-auto mt-2 max-w-md text-[15px] leading-relaxed text-ink-2">
        Choose a sample sentence or type your own, then press{" "}
        <span className="font-medium text-ink">Analyze Sentence</span> to see the detected intent and the
        extracted details.
      </p>

      <div className="mt-6 flex flex-wrap justify-center gap-2">
        {SUGGESTIONS.map((example) => (
          <button
            key={example.id}
            type="button"
            onClick={() => onPick(example)}
            lang={LANGUAGES[example.language].lang}
            className="focus-ring max-w-full truncate rounded-chip border border-line bg-card px-3 py-1.5 text-sm text-ink-2 transition hover:border-accent/50 hover:text-ink"
          >
            {example.text}
          </button>
        ))}
      </div>
    </motion.div>
  );
}
