import type { Metadata } from "next";
import { ProjectList } from "@/components/project-list";

export const metadata: Metadata = { title: "Projects" };

export default function ProjectsPage() {
  return (
    <main className="mx-auto max-w-3xl px-4 py-16 sm:px-6">
      <h1 className="font-display text-[clamp(2.6rem,7vw,4.5rem)] text-[var(--color-fg)]">Projects</h1>
      <p className="mt-2 max-w-lg text-sm text-[var(--color-fg-muted)]">
        Real projects — case studies where they exist, honestly labeled
        where they do not yet.
      </p>

      <div className="mt-10">
        <ProjectList />
      </div>
    </main>
  );
}
