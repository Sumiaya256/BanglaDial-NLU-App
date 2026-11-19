import type { SlotType } from "@/types/nlp";

export type SlotColor = "emerald" | "amber" | "blue" | "violet" | "cyan" | "orange" | "rose";

/** Readable name and colour key for every slot type */
export const SLOT_META: Record<string, { label: string; color: SlotColor }> = {
  DESTINATION: { label: "Destination", color: "emerald" },
  DATE: { label: "Date", color: "amber" },
  LOCATION: { label: "Location", color: "blue" },
  FOOD_ITEM: { label: "Food item", color: "violet" },
  QUANTITY: { label: "Quantity", color: "cyan" },
  TIME: { label: "Time", color: "orange" },
  PERSON: { label: "Person", color: "rose" },
};

export const SLOT_ORDER = Object.keys(SLOT_META) as SlotType[];

const FALLBACK_COLORS: SlotColor[] = ["emerald", "amber", "blue", "violet", "cyan", "orange", "rose"];

/** Safe lookup: slot names that come from a trained model get a label and a stable colour */
export function slotMeta(type: SlotType): { label: string; color: SlotColor } {
  const known = SLOT_META[type];
  if (known) return known;
  const text = type.replace(/[_-]+/g, " ").trim().toLowerCase();
  const sum = [...type].reduce((n, c) => n + c.charCodeAt(0), 0);
  return { label: text.charAt(0).toUpperCase() + text.slice(1), color: FALLBACK_COLORS[sum % FALLBACK_COLORS.length] };
}

/*
  Every slot colour has the same three parts, for light and dark mode.
  The class names are written out in full so Tailwind can find them.
  Colour is never the only signal: badges also show an icon and the type name.
*/
export const SLOT_CLASSES: Record<
  SlotColor,
  { badge: string; tag: string; dot: string; ring: string }
> = {
  emerald: {
    badge:
      "border-emerald-200 bg-emerald-50 text-emerald-900 dark:border-emerald-400/25 dark:bg-emerald-400/10 dark:text-emerald-100",
    tag: "text-emerald-700 dark:text-emerald-300",
    dot: "bg-emerald-500 dark:bg-emerald-400",
    ring: "ring-emerald-400/60",
  },
  amber: {
    badge:
      "border-amber-200 bg-amber-50 text-amber-900 dark:border-amber-400/25 dark:bg-amber-400/10 dark:text-amber-100",
    tag: "text-amber-700 dark:text-amber-300",
    dot: "bg-amber-500 dark:bg-amber-400",
    ring: "ring-amber-400/60",
  },
  blue: {
    badge:
      "border-blue-200 bg-blue-50 text-blue-900 dark:border-blue-400/25 dark:bg-blue-400/10 dark:text-blue-100",
    tag: "text-blue-700 dark:text-blue-300",
    dot: "bg-blue-500 dark:bg-blue-400",
    ring: "ring-blue-400/60",
  },
  violet: {
    badge:
      "border-violet-200 bg-violet-50 text-violet-900 dark:border-violet-400/25 dark:bg-violet-400/10 dark:text-violet-100",
    tag: "text-violet-700 dark:text-violet-300",
    dot: "bg-violet-500 dark:bg-violet-400",
    ring: "ring-violet-400/60",
  },
  cyan: {
    badge:
      "border-cyan-200 bg-cyan-50 text-cyan-900 dark:border-cyan-400/25 dark:bg-cyan-400/10 dark:text-cyan-100",
    tag: "text-cyan-700 dark:text-cyan-300",
    dot: "bg-cyan-500 dark:bg-cyan-400",
    ring: "ring-cyan-400/60",
  },
  orange: {
    badge:
      "border-orange-200 bg-orange-50 text-orange-900 dark:border-orange-400/25 dark:bg-orange-400/10 dark:text-orange-100",
    tag: "text-orange-700 dark:text-orange-300",
    dot: "bg-orange-500 dark:bg-orange-400",
    ring: "ring-orange-400/60",
  },
  rose: {
    badge:
      "border-rose-200 bg-rose-50 text-rose-900 dark:border-rose-400/25 dark:bg-rose-400/10 dark:text-rose-100",
    tag: "text-rose-700 dark:text-rose-300",
    dot: "bg-rose-500 dark:bg-rose-400",
    ring: "ring-rose-400/60",
  },
};

/** Safe lookup: an unknown colour from a future API falls back to blue */
export function slotClasses(color: string) {
  return SLOT_CLASSES[color as SlotColor] ?? SLOT_CLASSES.blue;
}
