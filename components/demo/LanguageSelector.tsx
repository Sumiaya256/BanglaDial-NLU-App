"use client";

import { Check } from "lucide-react";
import type { LanguageCode } from "@/types/nlp";
import { LANGUAGES, LANGUAGE_ORDER } from "@/lib/language";
import { cn } from "@/lib/utils";

type Props = {
  /** The language the examples are filtered by (null = all) */
  value: LanguageCode | null;
  onChange: (language: LanguageCode | null) => void;
  /** The language found in the last analysis */
  detected?: LanguageCode | null;
};

/**
 * Shows the three supported languages. Pressing one filters the example
 * sentences below, pressing it again shows all of them. After an analysis
 * the detected language gets a check mark.
 */
export default function LanguageSelector({ value, onChange, detected = null }: Props) {
  return (
    <div className="mx-auto max-w-[1120px] px-5">
      <div
        role="group"
        aria-label="Supported languages. Choose one to show only its examples."
        className="flex flex-wrap items-center justify-center gap-2"
      >
        <span className="mr-1 hidden text-[11px] font-semibold uppercase tracking-[0.14em] text-muted sm:inline">
          Supports
        </span>

        {LANGUAGE_ORDER.map((code) => {
          const language = LANGUAGES[code];
          const selected = value === code;
          const isDetected = detected === code;

          return (
            <button
              key={code}
              type="button"
              aria-pressed={selected}
              onClick={() => onChange(selected ? null : code)}
              className={cn(
                "focus-ring inline-flex items-center gap-2 rounded-chip border px-3 py-1.5 text-sm transition-colors",
                selected
                  ? "border-accent/50 bg-soft text-accent"
                  : "border-line bg-card text-ink-2 hover:border-accent/40 hover:text-ink",
                isDetected && !selected && "border-accent/40",
              )}
            >
              <span className="font-mono text-[11px] font-semibold tracking-wide">{language.code}</span>
              <span className="h-3 w-px bg-line" aria-hidden />
              <span lang={language.lang}>{language.name}</span>
              {isDetected && (
                <span className="inline-flex items-center gap-1 text-[11px] font-medium text-accent">
                  <Check className="size-3" aria-hidden />
                  Detected
                </span>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
