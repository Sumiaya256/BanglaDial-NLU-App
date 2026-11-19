"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import Logo from "@/components/layout/Logo";
import ThemeToggle from "@/components/layout/ThemeToggle";
import { NAV_LINKS } from "@/lib/site";
import { cn } from "@/lib/utils";

export default function Navbar() {
  const pathname = usePathname();

  // The mobile menu remembers the page it was opened on,
  // so it closes by itself when you go to another page.
  const [openOn, setOpenOn] = useState<string | null>(null);
  const menuOpen = openOn === pathname;

  return (
    <header className="sticky top-0 z-40 border-b border-line bg-bg/85 backdrop-blur supports-[backdrop-filter]:bg-bg/75">
      <div className="mx-auto flex h-16 max-w-[1120px] items-center justify-between px-5">
        <Logo />

        <div className="flex items-center gap-2">
          {/* Desktop links */}
          <nav aria-label="Main" className="hidden items-center md:flex">
            {NAV_LINKS.map((link) => {
              const active = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  aria-current={active ? "page" : undefined}
                  className={cn(
                    "focus-ring relative flex h-16 items-center px-4 text-sm font-medium transition-colors",
                    active ? "text-ink" : "text-ink-2 hover:text-ink",
                  )}
                >
                  {link.label}
                  {active && (
                    <motion.span
                      layoutId="nav-active"
                      className="absolute inset-x-3 -bottom-px h-0.5 rounded-full bg-accent"
                      transition={{ type: "spring", stiffness: 500, damping: 40 }}
                    />
                  )}
                </Link>
              );
            })}
          </nav>

          <span className="mx-2 hidden h-5 w-px bg-line md:block" aria-hidden />
          <ThemeToggle />

          {/* Mobile menu button */}
          <button
            type="button"
            onClick={() => setOpenOn(menuOpen ? null : pathname)}
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            className="focus-ring inline-flex size-9 items-center justify-center rounded-field border border-line bg-card text-ink-2 md:hidden"
          >
            {menuOpen ? <X className="size-[18px]" aria-hidden /> : <Menu className="size-[18px]" aria-hidden />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <motion.nav
          id="mobile-menu"
          aria-label="Mobile"
          initial={{ opacity: 0, y: -6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.2 }}
          className="border-t border-line bg-bg px-5 py-3 md:hidden"
        >
          <ul className="flex flex-col gap-1">
            {NAV_LINKS.map((link) => {
              const active = pathname === link.href;
              return (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    aria-current={active ? "page" : undefined}
                    className={cn(
                      "focus-ring block rounded-field px-3 py-3 text-[15px] font-medium",
                      active ? "bg-soft text-accent" : "text-ink-2 hover:bg-bg-2 hover:text-ink",
                    )}
                  >
                    {link.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </motion.nav>
      )}
    </header>
  );
}
