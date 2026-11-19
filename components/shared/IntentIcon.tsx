import {
  Banknote,
  CircleHelp,
  GraduationCap,
  HeartPulse,
  Landmark,
  MessageSquare,
  Plane,
  ShoppingCart,
  UtensilsCrossed,
  type LucideProps,
} from "lucide-react";

const ICONS = {
  plane: Plane,
  utensils: UtensilsCrossed,
  help: CircleHelp,
  heart: HeartPulse,
  cart: ShoppingCart,
  graduation: GraduationCap,
  bank: Banknote,
  landmark: Landmark,
  message: MessageSquare,
} as const;

/** Shows the icon for an intent. An unknown key falls back to a help icon. */
export default function IntentIcon({ name, ...props }: { name: string } & LucideProps) {
  const Icon = ICONS[name as keyof typeof ICONS] ?? CircleHelp;
  return <Icon aria-hidden {...props} />;
}
