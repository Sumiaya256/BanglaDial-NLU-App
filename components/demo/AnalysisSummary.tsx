import type { AnalysisResult } from "@/types/nlp";
import { intentMeta } from "@/lib/intents";
import { LANGUAGES } from "@/lib/language";
import { cn } from "@/lib/utils";

function Item({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="bg-card px-4 py-3.5">
      <dt className="text-[11px] font-semibold uppercase tracking-[0.14em] text-ink-2">{label}</dt>
      <dd className="mt-1.5 text-[15px] font-medium text-ink">{children}</dd>
    </div>
  );
}

export default function AnalysisSummary({ result }: { result: AnalysisResult }) {
  const language = LANGUAGES[result.detectedLanguage];
  const recognized = result.intent.name !== "UNKNOWN";

  return (
    <dl className="grid grid-cols-2 gap-px overflow-hidden rounded-card border border-line bg-line md:grid-cols-4">
      <Item label="Language">
        <span className="inline-flex items-center gap-2">
          <span className="rounded-chip bg-soft px-1.5 py-0.5 font-mono text-[11px] font-semibold text-accent">
            {language?.code ?? "--"}
          </span>
          <span lang={language?.lang}>{language?.name ?? "Unknown"}</span>
        </span>
      </Item>
      <Item label="Intent">{intentMeta(result.intent.name).label}</Item>
      <Item label="Slots found">{result.slots.length}</Item>
      <Item label="Status">
        <span className="inline-flex items-center gap-2">
          <span
            aria-hidden
            className={cn("size-2 rounded-full", recognized ? "bg-emerald-500 dark:bg-emerald-400" : "bg-amber-500 dark:bg-amber-400")}
          />
          {recognized ? "Completed" : "No match"}
        </span>
      </Item>
    </dl>
  );
}
