import Link from "next/link";
import { SITE } from "@/lib/site";

/** Small custom mark: a sentence line with a highlighted "slot" inside brackets */
function LogoMark() {
  return (
    <svg viewBox="0 0 32 32" className="size-8" aria-hidden>
      <rect width="32" height="32" rx="8" className="fill-accent" />
      <path
        d="M11 9.5 H8.5 V22.5 H11 M21 9.5 H23.5 V22.5 H21"
        fill="none"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="stroke-on-accent"
      />
      <rect x="12.5" y="13" width="7" height="2.4" rx="1.2" className="fill-on-accent" />
      <rect x="12.5" y="17.2" width="4.4" height="2.4" rx="1.2" className="fill-on-accent" opacity="0.6" />
    </svg>
  );
}

export default function Logo() {
  return (
    <Link href="/" className="focus-ring flex items-center gap-2.5 rounded-chip" aria-label={`${SITE.name} home`}>
      <LogoMark />
      <span className="leading-tight">
        <span className="block text-[15px] font-semibold tracking-tight text-ink">{SITE.name}</span>
        <span className="block text-[11px] text-ink-2">{SITE.subtitle}</span>
      </span>
    </Link>
  );
}
