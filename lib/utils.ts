import type { AnalysisResult, SentenceSegment, Slot } from "@/types/nlp";
import { intentMeta } from "@/lib/intents";
import { LANGUAGES } from "@/lib/language";
import { slotMeta } from "@/lib/slots";

/** Join class names, skipping empty ones */
export function cn(...parts: Array<string | false | null | undefined>): string {
  return parts.filter(Boolean).join(" ");
}

/**
 * Cut a sentence into plain pieces and slot pieces, in reading order.
 * Uses the start/end positions when the service sends them, and otherwise
 * looks the value up in the sentence.
 */
export function buildSegments(text: string, slots: Slot[]): SentenceSegment[] {
  const lowerText = text.toLowerCase();
  const located: { start: number; end: number; slotIndex: number }[] = [];
  let searchFrom = 0;

  slots.forEach((slot, slotIndex) => {
    let start = slot.start;
    let end = slot.end;

    if (start === undefined || end === undefined) {
      const found = lowerText.indexOf(slot.value.toLowerCase(), searchFrom);
      if (found === -1) return; // the value is not in the sentence, skip it
      start = found;
      end = found + slot.value.length;
    }
    located.push({ start, end, slotIndex });
    searchFrom = Math.max(searchFrom, end);
  });

  located.sort((a, b) => a.start - b.start);

  const segments: SentenceSegment[] = [];
  let cursor = 0;

  for (const item of located) {
    if (item.start < cursor) continue; // overlapping slot, ignore it
    if (item.start > cursor) {
      segments.push({ text: text.slice(cursor, item.start), slotIndex: null });
    }
    segments.push({ text: text.slice(item.start, item.end), slotIndex: item.slotIndex });
    cursor = item.end;
  }
  if (cursor < text.length) {
    segments.push({ text: text.slice(cursor), slotIndex: null });
  }
  return segments;
}

/** A short plain-English sentence that describes the actual result */
export function buildExplanation(result: AnalysisResult): string {
  if (result.intent.name === "UNKNOWN") {
    return "The demo could not match this sentence to a known intent. This prototype understands the sample sentences only. A trained model connected through the API will handle free text.";
  }

  const intentLabel = intentMeta(result.intent.name).label.toLowerCase();
  const count = result.slots.length;

  if (count === 0) {
    return `The system identified the user's main intention as ${intentLabel}. No additional details were found in the sentence.`;
  }

  const details = result.slots
    .map((slot) => `“${slot.value}” (${slotMeta(slot.type).label.toLowerCase()})`)
    .join(", ");

  return `The system identified the user's main intention as ${intentLabel} and extracted ${count} relevant ${
    count === 1 ? "piece" : "pieces"
  } of information: ${details}.`;
}

/** Plain-text version of a result, used by the Copy analysis button */
export function formatReport(result: AnalysisResult): string {
  const lines = [
    "Multilingual NLP analysis",
    `Sentence: ${result.originalText}`,
    `Language: ${(LANGUAGES[result.detectedLanguage]?.name ?? result.detectedLanguage)}`,
    `Intent: ${result.intent.name}`,
  ];
  if (typeof result.intent.confidence === "number") {
    lines.push(`Confidence: ${result.intent.confidence}`);
  }
  lines.push(
    result.slots.length
      ? "Slots:\n" + result.slots.map((s) => `  - ${s.value} -> ${s.type}`).join("\n")
      : "Slots: none",
  );
  if (result.isMock) lines.push("Note: demonstration output from a mock service, not a trained model.");
  return lines.join("\n");
}

/** Copy text to the clipboard. Returns true when it worked. */
export async function copyToClipboard(text: string): Promise<boolean> {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch {
    // Older browsers or blocked clipboard: try the classic way
    try {
      const area = document.createElement("textarea");
      area.value = text;
      area.setAttribute("readonly", "");
      area.style.position = "fixed";
      area.style.opacity = "0";
      document.body.appendChild(area);
      area.select();
      const ok = document.execCommand("copy");
      document.body.removeChild(area);
      return ok;
    } catch {
      return false;
    }
  }
}
