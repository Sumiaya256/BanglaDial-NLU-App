/** Language codes used across the interface */
export type LanguageCode = "en" | "bn" | "bl";

/** Slot names come from the model (for example "destination"), so any text is allowed */
export type SlotType = string;

/** Intent names come from the model, so any text is allowed. "UNKNOWN" is used by the demo. */
export type IntentName = string;

export interface Slot {
  /** The exact words taken from the sentence */
  value: string;
  type: SlotType;
  /** Semantic colour key, for example "emerald" or "amber" */
  color: string;
  /** Character positions inside originalText (end is exclusive) */
  start?: number;
  end?: number;
}

export interface Intent {
  name: IntentName;
  description: string;
  /** Only set when a real model returns a score. The mock service never sets it. */
  confidence?: number;
  /** Icon key, see components/shared/IntentIcon.tsx */
  icon: string;
}

/**
 * The one shape the interface understands. A real NLP API only needs to
 * return this JSON and nothing in the UI has to change.
 */
export interface AnalysisResult {
  originalText: string;
  detectedLanguage: LanguageCode;
  intent: Intent;
  slots: Slot[];
  /** true while the demo mock service produces the answer */
  isMock: boolean;
  /** Optional extras sent by the real API */
  domain?: string;
  topIntents?: { name: string; confidence: number }[];
  model?: { language: string; backbone: string; fallback: boolean };
}

/** One piece of a sentence, with the slot that covers it (if any) */
export interface SentenceSegment {
  text: string;
  slotIndex: number | null;
}
