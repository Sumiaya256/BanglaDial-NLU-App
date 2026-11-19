"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import AnalysisTimeline from "@/components/demo/AnalysisTimeline";

const MESSAGES = [
  "Understanding your sentence...",
  "Identifying intent...",
  "Extracting meaningful details...",
];

const STEP_MS = 650;

export default function LoadingState() {
  const [step, setStep] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => setStep((s) => Math.min(s + 1, MESSAGES.length - 1)), STEP_MS);
    return () => clearInterval(timer);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
      className="rounded-panel border border-line bg-card p-6 shadow-card sm:p-8"
    >
      <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-ink-2">
        Analysis in progress
      </p>
      <p className="mt-3 text-lg font-medium text-ink">{MESSAGES[step]}</p>

      {/* thin progress line */}
      <div className="mt-5 h-1 overflow-hidden rounded-full bg-bg-2">
        <motion.div
          className="h-full rounded-full bg-accent"
          initial={{ width: "8%" }}
          animate={{ width: `${((step + 1) / MESSAGES.length) * 100}%` }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        />
      </div>

      <AnalysisTimeline activeStep={step} className="mt-6" />
    </motion.div>
  );
}
