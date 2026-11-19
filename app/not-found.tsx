import Link from "next/link";

export default function NotFound() {
  return (
    <section className="mx-auto max-w-[1120px] px-5 py-24 text-center">
      <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-accent">Error 404</p>
      <h1 className="mt-3 text-3xl font-semibold tracking-tight text-ink">This page could not be found</h1>
      <p className="mx-auto mt-3 max-w-md text-[15px] text-ink-2">
        The page you are looking for does not exist or has moved.
      </p>
      <Link
        href="/"
        className="focus-ring mt-7 inline-flex h-11 items-center rounded-field bg-accent px-6 text-[15px] font-medium text-on-accent shadow-button"
      >
        Back to the demo
      </Link>
    </section>
  );
}
