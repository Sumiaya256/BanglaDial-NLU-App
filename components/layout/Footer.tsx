import { SITE } from "@/lib/site";

export default function Footer() {
  return (
    <footer className="mt-20 border-t border-line">
      <div className="mx-auto flex max-w-[1120px] flex-col gap-2 px-5 py-8 text-sm text-ink-2 sm:flex-row sm:items-center sm:justify-between">
        <p>
          <span className="font-medium text-ink">{SITE.name}</span> · {SITE.subtitle}
        </p>
        <p className="text-[13px]">
          A university Capstone research demo. Results shown here come from a demonstration service, not a
          trained model.
        </p>
      </div>
    </footer>
  );
}
