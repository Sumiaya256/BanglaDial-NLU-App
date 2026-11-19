import type { IntentName } from "@/types/nlp";

export const INTENTS: Record<
  string,
  { label: string; description: string; icon: string }
> = {
  FLIGHT_BOOKING: {
    label: "Flight booking",
    description: "The user wants to book a flight to a specified destination.",
    icon: "plane",
  },
  FOOD_ORDER: {
    label: "Food order",
    description: "The user wants to order a specific food item.",
    icon: "utensils",
  },
  UNKNOWN: {
    label: "Not recognized",
    description: "The demo has no prediction for this sentence.",
    icon: "help",
  },
};

/** Turns "check_account_balance" into "Check account balance" */
export function humanize(name: string): string {
  const text = name.replace(/[_-]+/g, " ").trim().toLowerCase();
  return text.charAt(0).toUpperCase() + text.slice(1);
}

/** Safe lookup: intents that come from a trained model get a readable label */
export function intentMeta(name: IntentName) {
  return INTENTS[name] ?? { label: humanize(name), description: "", icon: "message" };
}
