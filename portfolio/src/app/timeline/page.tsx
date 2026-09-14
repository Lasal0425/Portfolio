import type { Metadata } from "next";
import Image from "next/image";
import { timeline, featuredRoles, collapsedRoles } from "@/lib/content";
import { TimelineRoleList } from "@/components/timeline-role-list";

export const metadata: Metadata = { title: "Timeline" };

export default function TimelinePage() {
  return (
    <main className="mx-auto max-w-3xl px-4 py-16 sm:px-6">
      <h1 className="text-2xl font-semibold text-[var(--color-fg)]">Timeline</h1>
      <p className="mt-2 max-w-lg text-sm text-[var(--color-fg-muted)]">
        Grouped by organisation, engineering roles surfaced by default —
        everything else is one click away, not omitted.
      </p>

      <div className="mt-12 flex flex-col gap-14">
        {timeline.map((org) => {
          const featured = featuredRoles(org);
          const collapsed = collapsedRoles(org);
          return (
            <section key={org.id} id={org.id} className="scroll-mt-20">
              <div className="flex items-center gap-3">
                {org.logoUrl && (
                  <span className="flex h-9 w-16 items-center justify-center rounded bg-white">
                    <Image
                      src={org.logoUrl}
                      alt={org.name}
                      width={56}
                      height={24}
                      className="max-h-6 w-auto object-contain"
                    />
                  </span>
                )}
                <div>
                  <h2 className="text-lg font-medium text-[var(--color-fg)]">{org.name}</h2>
                  <p className="text-xs text-[var(--color-fg-muted)]">
                    {[org.location, org.totalDuration].filter(Boolean).join(" — ")}
                  </p>
                </div>
              </div>

              <TimelineRoleList featured={featured} collapsed={collapsed} />
            </section>
          );
        })}
      </div>
    </main>
  );
}
