"use client";

import { MotionConfig } from "framer-motion";
import type { ReactNode } from "react";

// "user" = people who turned animations off in their system get no movement
export default function MotionProvider({ children }: { children: ReactNode }) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}
