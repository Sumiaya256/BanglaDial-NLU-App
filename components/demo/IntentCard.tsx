"use client";

import { motion } from "framer-motion";
import type { Intent } from "@/types/nlp";
import IntentIcon from "@/components/shared/IntentIcon";
import { intentMeta } from "@/lib/intents";

export default function IntentCard({ intent }: { intent: Intent }) {
  const known = intent.name !== "UNKNOWN";
  const hasConfidence = typeof intent.confidence === "number";

  return (
    <motion.section
      aria-labelledby="intent-title"
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className="rounded-card border border-line bg-card p-5 shadow-card"
    >
      <h3
        id="intent-title"
        className="text-[11px] font-semibold uppercase tracking-[0.16em] text-ink-2"
      >
        Intent classification
      </h3>

      <div className="mt-4 flex items-start gap-4">
        <span className="flex size-11 shrink-0 items-center justify-center rounded-field bg-soft text-accent">
          <IntentIcon name={intent.icon} className="size-5" />
        </span>

        <div className="min-w-0">
          <p className="break-words font-mono text-lg font-semibold tracking-tight text-ink sm:text-xl">
            {intent.name}
          </p>
          {known && <p className="mt-0.5 text-sm text-accent">{intentMeta(intent.name).label}</p>}
          <p className="mt-2 text-[15px] leading-relaxed text-ink-2">{intent.description}</p>
        </div>
      </div>

      {hasConfidence && (
        <div className="mt-5 border-t border-line pt-4">
          <div className="flex items-center justify-between text-xs text-ink-2">
            <span>Model confidence</span>
            <span className="font-medium tabular-nums text-ink">
              {Math.round((intent.confidence as number) * 100)}%
            </span>
          </div>
          <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-bg-2">
            <div
              className="h-full rounded-full bg-accent"
              style={{ width: `${Math.round((intent.confidence as number) * 100)}%` }}
            />
          </div>
        </div>
      )}
    </motion.section>
  );
}
