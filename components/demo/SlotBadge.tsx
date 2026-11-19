"use client";

import { motion } from "framer-motion";
import {
  CalendarDays,
  Clock,
  Hash,
  MapPin,
  PlaneLanding,
  Pizza,
  Tag,
  User,
  type LucideIcon,
} from "lucide-react";
import type { Slot, SlotType } from "@/types/nlp";
import { slotClasses } from "@/lib/slots";
import { cn } from "@/lib/utils";

// Each slot type also has its own icon, so colour is never the only clue
const ICONS: Record<SlotType, LucideIcon> = {
  DESTINATION: PlaneLanding,
  DATE: CalendarDays,
  LOCATION: MapPin,
  FOOD_ITEM: Pizza,
  QUANTITY: Hash,
  TIME: Clock,
  PERSON: User,
};

const typeText = (type: string) => type.replace(/_/g, " ");

/** The small "DESTINATION" style label, with icon */
export function SlotTypeTag({ slot, className }: { slot: Slot; className?: string }) {
  const Icon = ICONS[slot.type] ?? Tag;
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 text-[10px] font-semibold uppercase tracking-[0.08em]",
        slotClasses(slot.color).tag,
        className,
      )}
    >
      <Icon className="size-3" aria-hidden />
      {typeText(slot.type)}
    </span>
  );
}

type Props = {
  slot: Slot;
  /** Draws a ring around the badge (used when its table row is hovered) */
  active?: boolean;
  /** Seconds to wait before the badge fades in */
  delay?: number;
  onHover?: (hovering: boolean) => void;
};

/** An extracted word shown inline, inside the sentence */
export default function SlotBadge({ slot, active, delay = 0, onHover }: Props) {
  const classes = slotClasses(slot.color);

  return (
    <motion.span
      initial={{ opacity: 0, scale: 0.94 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3, delay, ease: "easeOut" }}
      onMouseEnter={() => onHover?.(true)}
      onMouseLeave={() => onHover?.(false)}
      className={cn(
        "mx-0.5 inline-flex items-center gap-2 rounded-chip border px-2 py-0.5 align-middle text-[0.95em] transition-shadow",
        classes.badge,
        active && cn("ring-2", classes.ring),
      )}
    >
      <span className="font-medium">{slot.value}</span>
      <SlotTypeTag slot={slot} />
    </motion.span>
  );
}
