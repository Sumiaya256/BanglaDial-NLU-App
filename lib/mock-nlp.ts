/*
  MOCK NLP SERVICE (demonstration only)

  This is NOT a machine-learning model. It recognizes the six sample
  sentences from lib/examples.ts and answers with their prepared analysis.
  Any other sentence gets an honest "not recognized" result.

  To use a real model, set NEXT_PUBLIC_NLP_API_URL (see lib/nlp-service.ts).
  Nothing in the interface has to change.
*/
import type { AnalysisResult, Slot } from "@/types/nlp";
import { EXAMPLES, type Example } from "@/lib/examples";
import { INTENTS } from "@/lib/intents";
import { detectLanguage } from "@/lib/language";
import { SLOT_META } from "@/lib/slots";

/** Pretend the model needs a moment, so the loading state is visible */
export const MOCK_DELAY_MS = 1800;

const wait = (ms: number) => new Promise<void>((resolve) => setTimeout(resolve, ms));

/** Lowercase, trim, collapse spaces and drop the final punctuation */
function normalize(text: string): string {
  return text
    .trim()
    .replace(/\s+/g, " ")
    .replace(/[.?!।]+$/u, "")
    .toLowerCase();
}

function fromExample(example: Example): AnalysisResult {
  const slots: Slot[] = [];
  let cursor = 0;

  for (const piece of example.pieces) {
    const value = typeof piece === "string" ? piece : piece.value;
    if (typeof piece !== "string") {
      slots.push({
        value,
        type: piece.type,
        color: SLOT_META[piece.type].color,
        start: cursor,
        end: cursor + value.length,
      });
    }
    cursor += value.length;
  }

  const intent = INTENTS[example.intent];
  return {
    originalText: example.text,
    detectedLanguage: example.language,
    intent: { name: example.intent, description: intent.description, icon: intent.icon },
    slots,
    isMock: true,
  };
}

export async function mockAnalyze(text: string): Promise<AnalysisResult> {
  await wait(MOCK_DELAY_MS);

  const key = normalize(text);
  const match = EXAMPLES.find((example) => normalize(example.text) === key);
  if (match) return fromExample(match);

  const intent = INTENTS.UNKNOWN;
  return {
    originalText: text.trim(),
    detectedLanguage: detectLanguage(text),
    intent: { name: "UNKNOWN", description: intent.description, icon: intent.icon },
    slots: [],
    isMock: true,
  };
}
