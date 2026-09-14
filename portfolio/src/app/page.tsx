import { Hero } from "@/components/hero";
import { TimelineOrgs } from "@/components/timeline-orgs";
import { ProjectList } from "@/components/project-list";
import { WritingGroups } from "@/components/writing-groups";
import { StackSection } from "@/components/stack-section";
import { GitHubActivity } from "@/components/github-activity";

export default function Home() {
  return (
    <main>
      <Hero />

      <section id="timeline" className="scroll-mt-16 border-t border-[var(--color-border)] py-12">
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          <h2 className="text-sm font-medium text-[var(--color-fg-muted)]">Timeline</h2>
          <div className="mt-6">
            <TimelineOrgs />
          </div>
        </div>
      </section>

      <section id="projects" className="scroll-mt-16 border-t border-[var(--color-border)] py-12">
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          <h2 className="text-sm font-medium text-[var(--color-fg-muted)]">Projects</h2>
          <div className="mt-6">
            <ProjectList />
          </div>
        </div>
      </section>

      <section id="writing" className="scroll-mt-16 border-t border-[var(--color-border)] py-12">
        <div className="mx-auto max-w-2xl px-4 sm:px-6">
          <h2 className="text-sm font-medium text-[var(--color-fg-muted)]">Writing</h2>
          <WritingGroups />
        </div>
      </section>

      <StackSection />
      <GitHubActivity />
    </main>
  );
}
