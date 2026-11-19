import { cn } from "@/lib/utils";

type Props = {
  title: string;
  subtitle?: string;
  eyebrow?: string;
  id?: string;
  /** Use "h1" only for the one main heading of a page */
  as?: "h1" | "h2";
  align?: "left" | "center";
  className?: string;
};

export default function SectionHeading({
  title,
  subtitle,
  eyebrow,
  id,
  as: Tag = "h2",
  align = "left",
  className,
}: Props) {
  return (
    <div className={cn(align === "center" && "text-center", className)}>
      {eyebrow && (
        <p className="mb-2 text-[11px] font-semibold uppercase tracking-[0.16em] text-accent">
          {eyebrow}
        </p>
      )}
      <Tag
        id={id}
        className={cn(
          "font-semibold tracking-tight text-ink",
          Tag === "h1" ? "text-[2rem] leading-tight sm:text-4xl" : "text-2xl sm:text-[1.75rem]",
        )}
      >
        {title}
      </Tag>
      {subtitle && (
        <p
          className={cn(
            "mt-2 max-w-2xl text-[15px] leading-relaxed text-ink-2",
            align === "center" && "mx-auto",
          )}
        >
          {subtitle}
        </p>
      )}
    </div>
  );
}
