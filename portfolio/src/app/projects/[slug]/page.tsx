import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { projects } from "@/lib/content";

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);
  return { title: project?.title ?? "Project" };
}

/**
 * Phase 4 scope (not yet built): the real case study — architecture
 * diagram, decisions and tradeoffs rejected, what broke, what I'd change.
 * This stub exists so links from the home page's node field and the
 * projects list resolve to something real instead of a 404.
 */
export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);
  if (!project) notFound();

  return (
    <main className="mx-auto max-w-2xl px-4 py-16 sm:px-6">
      <p className="text-xs text-[var(--color-fg-muted)]">Case study coming in Phase 4</p>
      <h1 className="mt-2 text-2xl font-semibold text-[var(--color-fg)]">{project.title}</h1>
      <p className="mt-4 text-[var(--color-fg)]">{project.summary}</p>

      {project.forkOf && (
        <p className="mt-4 text-sm text-[var(--color-fg-muted)]">
          Started as a fork of{" "}
          <a
            href={`https://github.com/${project.forkOf}`}
            target="_blank"
            rel="noopener noreferrer"
            className="underline underline-offset-2"
          >
            {project.forkOf}
          </a>
          .
        </p>
      )}

      {project.stack.length > 0 && (
        <div className="mt-6 flex flex-wrap gap-1.5">
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

      <div className="mt-8 flex gap-4 text-sm">
        {project.repoUrl && (
          <a
            href={project.repoUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="border-b border-transparent text-[var(--color-fg)] hover:border-[var(--color-accent)]"
          >
            View source
          </a>
        )}
        {project.liveUrl && (
          <a
            href={project.liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="border-b border-transparent text-[var(--color-fg)] hover:border-[var(--color-accent)]"
          >
            View live
          </a>
        )}
      </div>
    </main>
  );
}
