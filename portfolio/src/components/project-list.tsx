import Link from "next/link";
import { projects } from "@/lib/content";

/**
 * Shared between the standalone /projects page and the home page's
 * one-pager Projects section. `status: "draft"` projects (if any exist in
 * the future) still show here, honestly labeled, rather than being hidden.
 */
export function ProjectList() {
  return (
    <ul className="flex flex-col gap-6">
      {projects.map((project) => (
        <li key={project.slug} className="rounded-lg border border-[var(--color-border)] p-5">
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
            <p className="mt-2 text-xs text-[var(--color-fg-muted)]">Fork of {project.forkOf}</p>
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
  );
}
