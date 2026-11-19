"use client";

import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

const STEPS = ["Understand sentence", "Identify intent", "Extract details"];

type Props = {
  /** Which stage is running now (0, 1 or 2) */
  activeStep?: number;
  /** Shows every stage as finished */
  complete?: boolean;
  className?: string;
};

export default function AnalysisTimeline({ activeStep = 0, complete = false, className }: Props) {
  return (
    <ol className={cn("grid grid-cols-3", className)} aria-label="Analysis stages">
      {STEPS.map((label, i) => {
        const done = complete || i < activeStep;
        const active = !complete && i === activeStep;

        return (
          <li key={label} className="relative flex flex-col items-center text-center">
            {/* line to the next stage */}
            {i < STEPS.length - 1 && (
              <span
                aria-hidden
                className={cn(
                  "absolute left-[calc(50%+18px)] right-[calc(-50%+18px)] top-[13px] h-px transition-colors duration-500",
                  done ? "bg-accent" : "bg-line",
                )}
              />
            )}

            <span
              className={cn(
                "relative z-10 flex size-[26px] items-center justify-center rounded-full border text-[11px] font-semibold transition-colors duration-300",
                done && "border-accent bg-accent text-on-accent",
                active && "border-accent bg-soft text-accent",
                !done && !active && "border-line bg-card text-muted",
              )}
            >
              {done ? <Check className="size-3.5" aria-hidden /> : i + 1}
              {active && (
                <span
                  aria-hidden
                  className="absolute inset-0 rounded-full border border-accent motion-safe:animate-ping opacity-40"
                />
              )}
            </span>

            <span
              className={cn(
                "mt-2 px-1 text-[12px] leading-tight",
                done || active ? "font-medium text-ink" : "text-muted",
              )}
            >
              {label}
              <span className="sr-only">{done ? " (done)" : active ? " (in progress)" : ""}</span>
            </span>
          </li>
        );
      })}
    </ol>
  );
}
