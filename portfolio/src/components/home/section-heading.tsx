import type { ReactNode } from "react";

/**
 * Two-line poster heading used by every home section: a mono kicker, a
 * white first line and an orange second line, with an optional intro
 * paragraph on the right. All three are agent build targets.
 */
export function SectionHeading({
  kicker,
  line1,
  line2,
  intro,
  as: Tag = "h2",
}: {
  kicker: string;
  line1: string;
  line2: string;
  intro?: ReactNode;
  as?: "h2" | "h3";
}) {
  return (
    <div className="grid gap-8 md:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)] md:items-end">
      <div>
        <p data-build="label" data-label="kicker" className="kicker flex items-center gap-3">
          <span className="inline-block h-px w-8 bg-[var(--color-accent)]" aria-hidden="true" />
          {kicker}
        </p>
        <Tag
          data-build="title"
          data-label={`${Tag} · display`}
          className="font-display mt-5 text-[clamp(3.2rem,9vw,8rem)]"
        >
          <span className="block text-[var(--color-fg)]">{line1}</span>
          <span className="block text-[var(--color-accent)]">{line2}</span>
        </Tag>
      </div>
      {intro && (
        <p
          data-build="text"
          data-label="intro copy"
          className="max-w-md text-[0.95rem] leading-relaxed text-[var(--color-fg-muted)] md:justify-self-end md:pb-3"
        >
          {intro}
        </p>
      )}
    </div>
  );
}
