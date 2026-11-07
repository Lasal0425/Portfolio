import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { publishedProjects } from "@/lib/content";
import { SectionHeading } from "./section-heading";

export function WorkSection() {
  return (
    <section id="projects" data-build-section="Work" className="scroll-mt-20 py-24 sm:py-32">
      <div className="mx-auto max-w-[92rem] px-4 sm:px-8">
        <SectionHeading
          kicker="Selected work"
          line1="Work that"
          line2="ships."
          intro="Real projects with real repos — each one has a case study covering how it's built, what it measures, and the tradeoffs, written honestly."
        />

        <ol className="mt-16 grid grid-cols-1 gap-5 lg:grid-cols-2">
          {publishedProjects.map((project, i) => (
            <li
              key={project.slug}
              data-build="block"
              data-label={`card · ${project.slug}`}
              className={`group relative flex flex-col overflow-hidden rounded-2xl border border-[var(--color-border)] bg-[var(--color-bg-raised)] p-6 transition-colors hover:border-[var(--color-accent)]/60 sm:p-8 ${
                i === 0 ? "lg:col-span-2" : ""
              }`}
            >
              <div
                aria-hidden="true"
                className="pointer-events-none absolute -right-24 -top-24 h-64 w-64 rounded-full bg-[var(--color-accent)] opacity-0 blur-[80px] transition-opacity duration-500 group-hover:opacity-20"
              />
              <div className="flex items-start justify-between gap-4">
                <span
                  data-build="stat"
                  data-label="index"
                  className="font-display text-5xl text-[var(--color-accent)] sm:text-6xl"
                >
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span
                  data-build="label"
                  data-label="tags"
                  className="pt-2 text-right font-mono text-[0.6rem] uppercase tracking-[0.2em] text-[var(--color-fg-muted)]"
                >
                  {project.stack.slice(0, 3).join(" · ")}
                </span>
              </div>

              <h3
                data-build="title"
                data-label="h3 · title"
                className="font-display mt-6 text-[clamp(2rem,4vw,3.4rem)] text-[var(--color-fg)]"
              >
                {project.title.replace(/_/g, " ")}
                <span className="text-[var(--color-accent)]">.</span>
              </h3>

              <p
                data-build="text"
                data-label="summary"
                className={`mt-4 text-[0.95rem] leading-relaxed text-[var(--color-fg-muted)] ${i === 0 ? "max-w-3xl" : ""}`}
              >
                {project.summary}
              </p>

              {project.forkOf && (
                <p data-build="label" data-label="provenance" className="mt-3 font-mono text-[0.65rem] uppercase tracking-[0.15em] text-[var(--color-fg-muted)]">
                  Started as a fork of {project.forkOf}
                </p>
              )}

              {project.metrics.length > 0 && (
                <dl className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-3">
                  {project.metrics.map((m) => (
                    <div
                      key={m.label}
                      data-build="block"
                      data-label="metric"
                      className="rounded-xl border border-[var(--color-border)] bg-[var(--color-bg-sunken)] p-4"
                    >
                      <dt className="font-mono text-[0.6rem] uppercase tracking-[0.15em] text-[var(--color-fg-muted)]">{m.label}</dt>
                      <dd className="font-display mt-2 text-3xl text-[var(--color-fg)]">{m.value}</dd>
                    </div>
                  ))}
                </dl>
              )}

              <ul className="mt-6 flex flex-wrap gap-1.5">
                {project.stack.map((tech) => (
                  <li
                    key={tech}
                    data-build="chip"
                    data-label="tag"
                    className="rounded-full border border-[var(--color-border-strong)] px-2.5 py-1 font-mono text-[0.65rem] text-[var(--color-fg)]/80"
                  >
                    {tech}
                  </li>
                ))}
              </ul>

              <div className="mt-auto flex flex-wrap items-center gap-x-5 gap-y-2 pt-8 text-sm">
                {project.hasCaseStudy && (
                  <Link
                    href={`/projects/${project.slug}`}
                    data-build="chip"
                    data-label="link"
                    className="inline-flex items-center gap-1.5 rounded-full bg-[var(--color-fg)] px-4 py-2 font-semibold text-[var(--color-bg)] transition-colors hover:bg-[var(--color-accent)] hover:text-[var(--color-accent-ink)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-accent)]"
                  >
                    Read case study
                    <ArrowUpRight size={15} aria-hidden="true" />
                  </Link>
                )}
                {project.repoUrl && (
                  <a
                    href={project.repoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    data-build="chip"
                    data-label="link"
                    className="inline-flex items-center gap-1 text-[var(--color-fg-muted)] underline-offset-4 hover:text-[var(--color-fg)] hover:underline"
                  >
                    Repo <ArrowUpRight size={14} aria-hidden="true" />
                  </a>
                )}
                {project.liveUrl && (
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    data-build="chip"
                    data-label="link"
                    className="inline-flex items-center gap-1 text-[var(--color-fg-muted)] underline-offset-4 hover:text-[var(--color-fg)] hover:underline"
                  >
                    Live site <ArrowUpRight size={14} aria-hidden="true" />
                  </a>
                )}
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
