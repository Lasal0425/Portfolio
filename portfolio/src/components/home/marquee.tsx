import { stack } from "../../../content/stack";

/** Endless band of the real stack, between the hero and the work. */
export function StackMarquee() {
  const items = Array.from(new Set(stack.flatMap((g) => g.items)));
  const run = [...items, ...items];
  return (
    <div data-build-section="Stack band" className="relative z-10 -rotate-[1.2deg] py-6">
      <div
        data-build="block"
        data-label="marquee"
        className="overflow-hidden border-y border-[var(--color-accent)] bg-[var(--color-accent)] py-3 text-[var(--color-accent-ink)]"
      >
        <ul className="marquee-track flex w-max items-center gap-8 whitespace-nowrap" aria-label="Stack">
          {run.map((item, i) => (
            <li key={i} aria-hidden={i >= items.length} className="flex items-center gap-8 font-display text-2xl sm:text-3xl">
              {item}
              <span aria-hidden="true" className="text-lg">✦</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
