/*
  The only place the interface talks to an NLP system.

  - Without NEXT_PUBLIC_NLP_API_URL it uses the mock service (demo mode).
  - With it, the sentence is sent to  POST {url}/analyze  as  { "text": "..." }
    and the API answers with JSON in the AnalysisResult shape (types/nlp.ts).
*/
import type { AnalysisResult } from "@/types/nlp";
import { mockAnalyze } from "@/lib/mock-nlp";

const API_URL = (process.env.NEXT_PUBLIC_NLP_API_URL ?? "").replace(/\/+$/, "");

function isAnalysisResult(value: unknown): value is AnalysisResult {
  if (!value || typeof value !== "object") return false;
  const v = value as Partial<AnalysisResult>;
  return (
    typeof v.originalText === "string" &&
    typeof v.detectedLanguage === "string" &&
    !!v.intent &&
    typeof v.intent.name === "string" &&
    Array.isArray(v.slots)
  );
}

export async function analyzeSentence(text: string): Promise<AnalysisResult> {
  if (!API_URL) return mockAnalyze(text);

  const res = await fetch(`${API_URL}/analyze`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ text }),
  });
  if (!res.ok) throw new Error(`The NLP service answered with status ${res.status}.`);

  const data: unknown = await res.json();
  if (!isAnalysisResult(data)) throw new Error("The NLP service sent an unexpected answer.");

  return { ...data, isMock: false };
}
