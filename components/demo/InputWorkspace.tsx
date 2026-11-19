"use client";

import type { KeyboardEvent, Ref } from "react";
import { Loader2, MessageSquareText, ScanSearch, X } from "lucide-react";
import SectionHeading from "@/components/shared/SectionHeading";
import { cn } from "@/lib/utils";

export const MAX_LENGTH = 280;

type Props = {
  value: string;
  onChange: (value: string) => void;
  onSubmit: () => void;
  onClear: () => void;
  isScanning: boolean;
  /** Message shown when the input is not valid */
  error: string | null;
  textareaRef: Ref<HTMLTextAreaElement>;
};

export default function InputWorkspace({
  value,
  onChange,
  onSubmit,
  onClear,
  isScanning,
  error,
  textareaRef,
}: Props) {
  function handleKeyDown(event: KeyboardEvent<HTMLTextAreaElement>) {
    // Ctrl + Enter (or Cmd + Enter) analyzes
    if (event.key === "Enter" && (event.ctrlKey || event.metaKey)) {
      event.preventDefault();
      if (!isScanning) onSubmit();
    }
  }

  return (
    <section aria-labelledby="input-title" className="mx-auto mt-14 max-w-[1120px] px-5">
      <SectionHeading id="input-title" title="Enter Your Sentence" />

      <form
        noValidate
        onSubmit={(event) => {
          event.preventDefault();
          if (!isScanning) onSubmit();
        }}
        className="mt-6 rounded-panel border border-line bg-card p-4 shadow-card sm:p-5"
      >
        <label htmlFor="sentence" className="sr-only">
          Sentence to analyze
        </label>

        <div className="relative">
          <MessageSquareText
            className="pointer-events-none absolute left-4 top-4 size-[18px] text-muted"
            aria-hidden
          />
          <textarea
            id="sentence"
            ref={textareaRef}
            value={value}
            rows={3}
            maxLength={MAX_LENGTH}
            onChange={(event) => onChange(event.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Type in English, বাংলা, or Banglish..."
            aria-invalid={error ? true : undefined}
            aria-describedby={error ? "sentence-error" : "sentence-help"}
            className={cn(
              "focus-ring min-h-[110px] w-full resize-y rounded-field border bg-bg px-11 py-3.5 text-base leading-relaxed text-ink placeholder:text-muted",
              error ? "border-rose-400 dark:border-rose-400/70" : "border-line focus:border-accent/60",
            )}
          />
          {value && (
            <button
              type="button"
              onClick={onClear}
              aria-label="Clear input"
              className="focus-ring absolute right-2.5 top-2.5 inline-flex size-8 items-center justify-center rounded-chip text-muted transition hover:bg-bg-2 hover:text-ink"
            >
              <X className="size-4" aria-hidden />
            </button>
          )}
        </div>

        <div className="mt-3 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="min-h-5 text-[13px]">
            {error ? (
              <p id="sentence-error" role="alert" className="text-rose-600 dark:text-rose-300">
                {error}
              </p>
            ) : (
              <p id="sentence-help" className="text-ink-2">
                Press <kbd className="rounded border border-line bg-bg-2 px-1.5 py-0.5 font-mono text-[11px]">Ctrl</kbd>{" "}
                + <kbd className="rounded border border-line bg-bg-2 px-1.5 py-0.5 font-mono text-[11px]">Enter</kbd> to
                analyze
              </p>
            )}
          </div>

          <div className="flex items-center justify-between gap-4 sm:justify-end">
            <span
              className={cn("text-[13px] tabular-nums", value.length >= MAX_LENGTH ? "text-rose-600 dark:text-rose-300" : "text-muted")}
              aria-label={`${value.length} of ${MAX_LENGTH} characters`}
            >
              {value.length} / {MAX_LENGTH}
            </span>
          </div>
        </div>

        <button
          type="submit"
          disabled={isScanning}
          className="focus-ring mt-4 inline-flex h-11 w-full items-center justify-center gap-2 rounded-field bg-accent px-6 text-[15px] font-medium text-on-accent shadow-button transition duration-200 hover:-translate-y-px hover:bg-accent-2 disabled:translate-y-0 disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
        >
          {isScanning ? (
            <>
              <Loader2 className="size-4 motion-safe:animate-spin" aria-hidden />
              Analyzing...
            </>
          ) : (
            <>
              <ScanSearch className="size-4" aria-hidden />
              Analyze Sentence
            </>
          )}
        </button>
      </form>
    </section>
  );
}
