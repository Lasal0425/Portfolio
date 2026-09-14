import type { Metadata } from "next";
import Link from "next/link";
import { projects } from "@/lib/content";

export const metadata: Metadata = { title: "Projects" };

/**
 * Phase 4 scope (not yet built): full case studies with real architecture
 * diagrams and the decisions/tradeoffs narrative. Every project here is
 * shown regardless of `status` for now, since hiding all four (all still
 * "draft") would make this nav link lead to an empty page — once real case
 * studies exist, this list should filter to `status === "ready"` and drop
 * the draft badge.
 */
export default function ProjectsPage() {
  return (
    <main className="mx-auto max-w-3xl px-4 py-16 sm:px-6">
      <h1 className="text-2xl font-semibold text-[var(--color-fg)]">Projects</h1>
      <p className="mt-2 max-w-lg text-sm text-[var(--color-fg-muted)]">
        Case studies land in Phase 4. These are the real projects, honestly
        labeled while the write-ups are still in progress.
      </p>

      <ul className="mt-10 flex flex-col gap-6">
        {projects.map((project) => (
          <li
            key={project.slug}
            className="rounded-lg border border-[var(--color-border)] p-5"
          >
            <div className="flex items-baseline justify-between gap-3">
              <Link
                href={`/projects/${project.slug}`}
                className="text-base font-medium text-[var(--color-fg)] underline-offset-2 hover:underline"
              >
                {project.title}
              </Link>
              {project.status === "draft" && (
                <span className="shrink-0 rounded-full border border-[var(--color-border)] px-2 py-0.5 text-[0.65rem] uppercase tracking-wide text-[var(--color-fg-muted)]">
                  draft
                </span>
              )}
            </div>
            <p className="mt-2 text-sm text-[var(--color-fg-muted)]">{project.summary}</p>
            {project.forkOf && (
              <p className="mt-2 text-xs text-[var(--color-fg-muted)]">
                Fork of {project.forkOf}
              </p>
            )}
            {project.stack.length > 0 && (
              <div className="mt-3 flex flex-wrap gap-1.5">
                {project.stack.map((tech) => (
                  <span
                    key={tech}
                    className="rounded-full border border-[var(--color-border)] px-2 py-0.5 text-xs text-[var(--color-fg-muted)]"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            )}
          </li>
        ))}
      </ul>
    </main>
  );
}
