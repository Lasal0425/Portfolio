import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { readFile } from "node:fs/promises";
import path from "node:path";
import { renderMDX } from "@/lib/compile-mdx";
import { projects } from "@/lib/content";
import { mdxComponents } from "@/lib/mdx-components";

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
  return { title: project?.title ?? "Project", description: project?.summary };
}

async function readCaseStudy(slug: string): Promise<string | null> {
  try {
    const file = path.join(process.cwd(), "content", "projects", `${slug}.mdx`);
    return await readFile(file, "utf-8");
  } catch {
    return null;
  }
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);
  if (!project) notFound();

  const mdxSource = project.hasCaseStudy ? await readCaseStudy(slug) : null;

  return (
    <main className="mx-auto max-w-2xl px-4 py-16 sm:px-6">
      {project.status === "draft" && (
        <p className="mb-2 text-xs uppercase tracking-wide text-[var(--color-fg-muted)]">draft</p>
      )}
      <h1 className="text-2xl font-semibold text-[var(--color-fg)]">{project.title}</h1>
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

      {project.metrics.length > 0 && (
        <dl className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3">
          {project.metrics.map((m) => (
            <div
              key={m.label}
              className="rounded-md border border-[var(--color-border)] p-3"
            >
              <dt className="text-xs text-[var(--color-fg-muted)]">{m.label}</dt>
              <dd className="mt-0.5 text-lg font-semibold text-[var(--color-accent)]">
                {m.value}
              </dd>
            </div>
          ))}
        </dl>
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

      {mdxSource ? (
        <div className="mt-10 border-t border-[var(--color-border)] pt-8">
          {await renderMDX(mdxSource, mdxComponents)}
        </div>
      ) : (
        <p className="mt-10 border-t border-[var(--color-border)] pt-8 text-sm text-[var(--color-fg-muted)]">
          Full case study not written yet.
        </p>
      )}
    </main>
  );
}
