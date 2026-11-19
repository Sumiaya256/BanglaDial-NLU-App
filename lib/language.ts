import type { LanguageCode } from "@/types/nlp";

export const LANGUAGES: Record<
  LanguageCode,
  { code: string; name: string; lang: string; hint: string }
> = {
  en: { code: "EN", name: "English", lang: "en", hint: "Latin script" },
  bn: { code: "BN", name: "বাংলা", lang: "bn", hint: "Bengali script" },
  bl: { code: "BL", name: "Banglish", lang: "bn-Latn", hint: "Bengali in Latin letters" },
};

export const LANGUAGE_ORDER: LanguageCode[] = ["en", "bn", "bl"];

const BENGALI_SCRIPT = /[ঀ-৿]/;

// A few very common Banglish words, enough for a demo guess
const BANGLISH_WORDS = new Set([
  "ami", "amar", "tumi", "tomar", "ekta", "ekti", "chai", "korte", "koro", "korbo",
  "kal", "agami", "aj", "ki", "kothay", "dhakar", "lagbe", "dao", "den",
  "ache", "nai", "hobe", "jabo", "jete", "kobe", "kemon", "bhalo",
]);

/** Very small language guess, used when the service does not tell us */
export function detectLanguage(text: string): LanguageCode {
  if (BENGALI_SCRIPT.test(text)) return "bn";

  const words = text.toLowerCase().match(/[a-z]+/g) ?? [];
  const banglishHits = words.filter((w) => BANGLISH_WORDS.has(w));
  return banglishHits.length >= 2 ? "bl" : "en";
}
