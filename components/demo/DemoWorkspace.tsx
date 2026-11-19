"use client";

import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "framer-motion";
import type { AnalysisResult as Result, LanguageCode } from "@/types/nlp";
import type { Example } from "@/lib/examples";
import { EXAMPLES } from "@/lib/examples";
import { intentMeta } from "@/lib/intents";
import { analyzeSentence } from "@/lib/nlp-service";
import HeroSection from "@/components/demo/HeroSection";
import LanguageSelector from "@/components/demo/LanguageSelector";
import ExampleExplorer from "@/components/demo/ExampleExplorer";
import InputWorkspace, { MAX_LENGTH } from "@/components/demo/InputWorkspace";
import AnalysisResult from "@/components/demo/AnalysisResult";
import EmptyState from "@/components/shared/EmptyState";
import LoadingState from "@/components/shared/LoadingState";

/** Holds all the state of the Demo page */
export default function DemoWorkspace() {
  const [inputText, setInputText] = useState("");
  const [isScanning, setIsScanning] = useState(false);
  const [result, setResult] = useState<Result | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [languageFilter, setLanguageFilter] = useState<LanguageCode | null>(null);
  const [announcement, setAnnouncement] = useState("");

  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const resultHeadingRef = useRef<HTMLHeadingElement>(null);
  const latestRequest = useRef(0);
  const reduceMotion = useReducedMotion();

  // When a report appears, bring it into view and move keyboard focus to it
  useEffect(() => {
    if (!result) return;
    const heading = resultHeadingRef.current;
    if (!heading) return;
    heading.focus({ preventScroll: true });
    heading.scrollIntoView({ behavior: reduceMotion ? "auto" : "smooth", block: "center" });
  }, [result, reduceMotion]);

  function focusInput() {
    const textarea = textareaRef.current;
    if (!textarea) return;
    textarea.focus({ preventScroll: true });
    textarea.scrollIntoView({ behavior: reduceMotion ? "auto" : "smooth", block: "center" });
  }

  function handleSelectExample(example: Example) {
    setInputText(example.text);
    setError(null);
    focusInput();
  }

  async function handleAnalyze() {
    const text = inputText.trim();

    if (!text) {
      setError("Please enter a sentence to analyze.");
      textareaRef.current?.focus();
      return;
    }
    if (text.length > MAX_LENGTH) {
      setError(`Please keep the sentence under ${MAX_LENGTH} characters.`);
      return;
    }

    const requestId = ++latestRequest.current;
    setError(null);
    setResult(null);
    setIsScanning(true);
    setAnnouncement("Analyzing your sentence.");

    try {
      const analysis = await analyzeSentence(text);
      if (requestId !== latestRequest.current) return; // an older request, ignore it

      setResult(analysis);
      setAnnouncement(
        analysis.intent.name === "UNKNOWN"
          ? "Analysis complete. The demo did not recognize this sentence."
          : `Analysis complete. Intent: ${intentMeta(analysis.intent.name).label}. ${analysis.slots.length} ${
              analysis.slots.length === 1 ? "slot" : "slots"
            } found.`,
      );
    } catch {
      if (requestId !== latestRequest.current) return;
      setError("Something went wrong while analyzing the sentence. Please try again.");
      setAnnouncement("The analysis failed.");
    } finally {
      if (requestId === latestRequest.current) setIsScanning(false);
    }
  }

  function handleClearResult() {
    latestRequest.current++;
    setResult(null);
    setAnnouncement("Result cleared.");
  }

  function handleAnalyzeAnother() {
    latestRequest.current++;
    setResult(null);
    setInputText("");
    setError(null);
    setAnnouncement("Ready for a new sentence.");
    focusInput();
  }

  const selectedExample = EXAMPLES.find((e) => e.text === inputText.trim());

  return (
    <>
      <HeroSection />

      <LanguageSelector
        value={languageFilter}
        onChange={setLanguageFilter}
        detected={result?.detectedLanguage ?? null}
      />

      <ExampleExplorer
        onSelect={handleSelectExample}
        language={languageFilter}
        selectedId={selectedExample?.id ?? null}
      />

      <InputWorkspace
        value={inputText}
        onChange={(value) => {
          setInputText(value);
          if (error) setError(null);
        }}
        onSubmit={handleAnalyze}
        onClear={() => {
          setInputText("");
          setError(null);
          textareaRef.current?.focus();
        }}
        isScanning={isScanning}
        error={error}
        textareaRef={textareaRef}
      />

      <section aria-label="Analysis result" className="mx-auto mt-8 max-w-[1120px] px-5">
        {isScanning ? (
          <LoadingState />
        ) : result ? (
          <AnalysisResult
            result={result}
            headingRef={resultHeadingRef}
            onClear={handleClearResult}
            onAnalyzeAnother={handleAnalyzeAnother}
          />
        ) : (
          <EmptyState onPick={handleSelectExample} />
        )}
      </section>

      {/* Read out by screen readers when the state changes */}
      <p className="sr-only" role="status" aria-live="polite">
        {announcement}
      </p>
    </>
  );
}
