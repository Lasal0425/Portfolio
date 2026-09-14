import type { Metadata } from "next";
import { TimelineOrgs } from "@/components/timeline-orgs";

export const metadata: Metadata = { title: "Timeline" };

export default function TimelinePage() {
  return (
    <main className="mx-auto max-w-3xl px-4 py-16 sm:px-6">
      <h1 className="text-2xl font-semibold text-[var(--color-fg)]">Timeline</h1>
      <p className="mt-2 max-w-lg text-sm text-[var(--color-fg-muted)]">
        Grouped by organisation, engineering roles surfaced by default —
        everything else is one click away, not omitted.
      </p>

      <div className="mt-12">
        <TimelineOrgs />
      </div>
    </main>
  );
}
