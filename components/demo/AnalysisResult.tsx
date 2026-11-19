"use client";

import { useEffect, useRef, useState, type Ref } from "react";
import { motion } from "framer-motion";
import { Check, Copy, Eraser, RotateCcw } from "lucide-react";
import type { AnalysisResult as Result } from "@/types/nlp";
import { buildExplanation, copyToClipboard, formatReport } from "@/lib/utils";
import AnalysisSummary from "@/components/demo/AnalysisSummary";
import AnalysisTimeline from "@/components/demo/AnalysisTimeline";
import IntentCard from "@/components/demo/IntentCard";
import SlotExtraction from "@/components/demo/SlotExtraction";

type Props = {
  result: Result;
  /** Lets the page move keyboard focus to the report when it appears */
  headingRef: Ref<HTMLHeadingElement>;
  /** Remove the report but keep the sentence in the input */
  onClear: () => void;
  /** Empty the input and the report, ready for a new sentence */
  onAnalyzeAnother: () => void;
};

const buttonClass =
  "focus-ring inline-flex h-10 items-center justify-center gap-2 rounded-field border border-line bg-card px-4 text-sm font-medium text-ink transition hover:border-accent/50 hover:text-accent";

export default function AnalysisResult({ result, headingRef, onClear, onAnalyzeAnother }: Props) {
  const [copied, setCopied] = useState<"idle" | "done" | "failed">("idle");
  const resetTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(
    () => () => {
      if (resetTimer.current) clearTimeout(resetTimer.current);
    },
    [],
  );

  async function handleCopy() {
    const ok = await copyToClipboard(formatReport(result));
    setCopied(ok ? "done" : "failed");
    if (resetTimer.current) clearTimeout(resetTimer.current);
    resetTimer.current = setTimeout(() => setCopied("idle"), 2200);
  }

  return (
    <motion.article
      aria-labelledby="result-title"
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className="rounded-panel border border-line bg-bg-2/60 p-4 sm:p-6"
    >
      {/* Report header */}
      <header className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-accent">Analysis report</p>
          <h3
            id="result-title"
            ref={headingRef}
            tabIndex={-1}
            className="mt-1 text-xl font-semibold tracking-tight text-ink outline-none sm:text-2xl"
          >
            Here is what the system found
          </h3>
        </div>
        {result.isMock && (
          <span className="rounded-chip border border-amber-200 bg-amber-50 px-2.5 py-1 text-[11px] font-medium text-amber-900 dark:border-amber-400/25 dark:bg-amber-400/10 dark:text-amber-200">
            Demonstration output · mock service
          </span>
        )}
      </header>

      <AnalysisTimeline complete className="mt-5 max-w-md" />

      <div className="mt-6 space-y-4">
        <AnalysisSummary result={result} />
        <IntentCard intent={result.intent} />
        <SlotExtraction result={result} />
      </div>

      {/* Explanation, written from the actual result */}
      <p className="mt-6 border-t border-line pt-5 text-[15px] leading-relaxed text-ink-2">
        {buildExplanation(result)}
      </p>

      {/* Actions */}
      <div className="mt-5 flex flex-wrap gap-2">
        <button type="button" onClick={handleCopy} className={buttonClass}>
          {copied === "done" ? (
            <Check className="size-4 text-emerald-600 dark:text-emerald-400" aria-hidden />
          ) : (
            <Copy className="size-4" aria-hidden />
          )}
          {copied === "done" ? "Copied" : copied === "failed" ? "Copy failed" : "Copy analysis"}
        </button>
        <button type="button" onClick={onAnalyzeAnother} className={buttonClass}>
          <RotateCcw className="size-4" aria-hidden />
          Analyze another sentence
        </button>
        <button type="button" onClick={onClear} className={buttonClass}>
          <Eraser className="size-4" aria-hidden />
          Clear result
        </button>
      </div>
      <span className="sr-only" role="status">
        {copied === "done" ? "Analysis copied to the clipboard." : copied === "failed" ? "Could not copy." : ""}
      </span>
    </motion.article>
  );
}
