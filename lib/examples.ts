import type { IntentName, LanguageCode, SlotType } from "@/types/nlp";

/** A piece of a sentence: plain text, or text that is a slot */
export type Piece = string | { value: string; type: SlotType };

export interface Example {
  id: string;
  language: LanguageCode;
  /** The sentence exactly as shown to the user */
  text: string;
  intent: IntentName;
  /** The same sentence, cut into plain parts and slots */
  pieces: Piece[];
}

function define(
  id: string,
  language: LanguageCode,
  intent: IntentName,
  pieces: Piece[],
): Example {
  const text = pieces.map((p) => (typeof p === "string" ? p : p.value)).join("");
  return { id, language, text, intent, pieces };
}

export const EXAMPLES: Example[] = [
  define("en-flight", "en", "FLIGHT_BOOKING", [
    "Book a flight to ",
    { value: "Dhaka", type: "DESTINATION" },
    " for ",
    { value: "tomorrow", type: "DATE" },
    ".",
  ]),
  define("en-pizza", "en", "FOOD_ORDER", [
    "I want to order ",
    { value: "a", type: "QUANTITY" },
    " ",
    { value: "large pepperoni pizza", type: "FOOD_ITEM" },
    ".",
  ]),
  define("bn-flight", "bn", "FLIGHT_BOOKING", [
    { value: "আগামীকাল", type: "DATE" },
    " ",
    { value: "ঢাকার", type: "DESTINATION" },
    " একটি টিকিট চাই।",
  ]),
  define("bn-pizza", "bn", "FOOD_ORDER", [
    "আমি ",
    { value: "একটি", type: "QUANTITY" },
    " ",
    { value: "বড় পিজ্জা", type: "FOOD_ITEM" },
    " অর্ডার করতে চাই।",
  ]),
  define("bl-flight", "bl", "FLIGHT_BOOKING", [
    { value: "agami kal", type: "DATE" },
    " ",
    { value: "dhakar", type: "DESTINATION" },
    " ekta ticket chai",
  ]),
  define("bl-pizza", "bl", "FOOD_ORDER", [
    "ami ",
    { value: "ekta", type: "QUANTITY" },
    " ",
    { value: "large pizza", type: "FOOD_ITEM" },
    " order korte chai",
  ]),
];
