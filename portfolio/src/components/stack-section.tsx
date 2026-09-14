import { stack } from "../../content/stack";

export function StackSection() {
  return (
    <section className="mx-auto max-w-5xl border-t border-[var(--color-border)] px-4 py-12 sm:px-6">
      <h2 className="text-sm font-medium text-[var(--color-fg-muted)]">Stack</h2>
      <div className="mt-4 grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3">
        {stack.map((group) => (
          <div key={group.category}>
            <p className="text-xs text-[var(--color-fg-muted)]">{group.category}</p>
            <ul className="mt-2 flex flex-wrap gap-1.5">
              {group.items.map((item) => (
                <li
                  key={item}
                  className="rounded-full border border-[var(--color-border)] px-2.5 py-1 text-xs text-[var(--color-fg)]"
                >
                  {item}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}
