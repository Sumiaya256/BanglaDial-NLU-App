"use client";

import { useSyncExternalStore } from "react";
import { Moon, Sun } from "lucide-react";

/*
  The theme lives on <html class="dark">. A tiny script in app/layout.tsx sets it
  before the page paints (saved choice first, then the system setting), so there
  is no flash and no hydration mismatch. This button only reads and changes that class.
*/
function subscribe(callback: () => void) {
  const observer = new MutationObserver(callback);
  observer.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });
  return () => observer.disconnect();
}

const getSnapshot = () => document.documentElement.classList.contains("dark");
const getServerSnapshot = () => false;

export default function ThemeToggle() {
  const darkMode = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  function toggle() {
    const root = document.documentElement;
    const next = !darkMode;

    // lets the colours fade smoothly for a moment (see globals.css)
    root.classList.add("theme-switching");
    root.classList.toggle("dark", next);
    window.setTimeout(() => root.classList.remove("theme-switching"), 350);

    try {
      localStorage.setItem("theme", next ? "dark" : "light");
    } catch {
      // private mode: the theme still changes, it is just not remembered
    }
  }

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={darkMode ? "Switch to light theme" : "Switch to dark theme"}
      title={darkMode ? "Light theme" : "Dark theme"}
      className="focus-ring inline-flex size-9 items-center justify-center rounded-field border border-line bg-card text-ink-2 transition hover:text-ink"
    >
      {darkMode ? <Sun className="size-[18px]" aria-hidden /> : <Moon className="size-[18px]" aria-hidden />}
    </button>
  );
}
