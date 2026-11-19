import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import SectionHeading from "@/components/shared/SectionHeading";
import IntentExplanation from "@/components/about/IntentExplanation";
import SlotExplanation from "@/components/about/SlotExplanation";
import ProcessingFlow from "@/components/about/ProcessingFlow";
import MultilingualChallenges from "@/components/about/MultilingualChallenges";

export const metadata: Metadata = {
  title: "How It Works",
  description: "A simple explanation of how a multilingual NLP system understands language.",
};

export default function HowItWorksPage() {
  return (
    <>
      <header className="mx-auto max-w-[1120px] px-5 pb-12 pt-14 sm:pt-20">
        <SectionHeading
          as="h1"
          eyebrow="Explained simply"
          title="How It Works"
          subtitle="A simple explanation of how our multilingual NLP system understands language."
        />
      </header>

      <div className="space-y-20 sm:space-y-24">
        <IntentExplanation />
        <SlotExplanation />
        <ProcessingFlow />
        <MultilingualChallenges />

        <section className="mx-auto max-w-[1120px] px-5">
          <div className="flex flex-col items-start justify-between gap-5 rounded-panel border border-line bg-soft px-6 py-7 sm:flex-row sm:items-center sm:px-8">
            <div>
              <h2 className="text-xl font-semibold tracking-tight text-ink">See it in action</h2>
              <p className="mt-1 text-[15px] text-ink-2">
                Pick a sample sentence and watch the intent and slots appear.
              </p>
            </div>
            <Link
              href="/"
              className="focus-ring inline-flex h-11 shrink-0 items-center gap-2 rounded-field bg-accent px-6 text-[15px] font-medium text-on-accent shadow-button transition hover:bg-accent-2"
            >
              Open the demo
              <ArrowRight className="size-4" aria-hidden />
            </Link>
          </div>
        </section>
      </div>
    </>
  );
}
