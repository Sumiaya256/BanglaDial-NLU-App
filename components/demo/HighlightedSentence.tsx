"use client";

import { useMemo } from "react";
import type { Slot } from "@/types/nlp";
import { buildSegments } from "@/lib/utils";
import SlotBadge from "@/components/demo/SlotBadge";

type Props = {
  text: string;
  slots: Slot[];
  lang?: string;
  /** Index of the slot to highlight with a ring */
  activeIndex?: number | null;
  onActiveChange?: (index: number | null) => void;
  /** Seconds before the first badge appears (the next ones follow one by one) */
  baseDelay?: number;
  className?: string;
};

/** The sentence with its extracted words turned into colored badges */
export default function HighlightedSentence({
  text,
  slots,
  lang,
  activeIndex = null,
  onActiveChange,
  baseDelay = 0,
  className,
}: Props) {
  const segments = useMemo(() => buildSegments(text, slots), [text, slots]);
  let badgeNumber = 0;

  return (
    <p lang={lang} className={className}>
      {segments.map((segment, i) => {
        if (segment.slotIndex === null) return <span key={i}>{segment.text}</span>;

        const slotIndex = segment.slotIndex;
        const delay = baseDelay + 0.1 * badgeNumber++;
        return (
          <SlotBadge
            key={i}
            slot={{ ...slots[slotIndex], value: segment.text }}
            active={activeIndex === slotIndex}
            delay={delay}
            onHover={(hovering) => onActiveChange?.(hovering ? slotIndex : null)}
          />
        );
      })}
    </p>
  );
}
