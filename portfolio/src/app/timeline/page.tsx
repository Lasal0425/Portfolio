import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { timeline, featuredRoles, collapsedRoles } from "@/lib/content";

export const metadata: Metadata = { title: "Timeline" };

/**
 * Phase 3 scope (not yet built): grouped-by-org rail with the "+N more
 * roles" progressive disclosure and proper overlap handling. This is a
 * real, working page in the meantime — every fact is already accurate —
 * just without that final interaction layer, and every org has an id
 * anchor the home page's node field already links to.
 */
export default function TimelinePage() {
  return (
    <main className="mx-auto max-w-3xl px-4 py-16 sm:px-6">
      <h1 className="text-2xl font-semibold text-[var(--color-fg)]">Timeline</h1>
      <p className="mt-2 max-w-lg text-sm text-[var(--color-fg-muted)]">
        Grouped by organisation, engineering roles surfaced by default. The
        real progressive-disclosure interaction lands in Phase 3 — for now,
        every role below is shown.
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

              <ol className="mt-6 flex flex-col gap-6 border-l border-[var(--color-border)] pl-5">
                {[...featured, ...collapsed].map((role) => (
                  <li key={role.id} className="relative">
                    <span
                      aria-hidden="true"
                      className="absolute -left-[1.4rem] top-1.5 h-2 w-2 rounded-full"
                      style={{
                        background: role.featured
                          ? "var(--color-accent)"
                          : "var(--color-border)",
                      }}
                    />
                    <p className="text-sm font-medium text-[var(--color-fg)]">{role.title}</p>
                    <p className="text-xs text-[var(--color-fg-muted)]">
                      {role.startDate} – {role.endDate}
                      {role.location ? ` · ${role.location}` : ""}
                      {role.workMode ? ` · ${role.workMode}` : ""}
                    </p>
                    {role.note && (
                      <p className="mt-1 text-xs italic text-[var(--color-fg-muted)]">{role.note}</p>
                    )}
                    {role.bullets.length > 0 && (
                      <ul className="mt-2 list-disc pl-4 text-sm text-[var(--color-fg)]">
                        {role.bullets.map((b, i) => (
                          <li key={i}>{b}</li>
                        ))}
                      </ul>
                    )}
                    {role.projectSlug && (
                      <Link
                        href={`/projects/${role.projectSlug}`}
                        className="mt-1 inline-block text-xs text-[var(--color-accent)] underline underline-offset-2"
                      >
                        related project
                      </Link>
                    )}
                  </li>
                ))}
              </ol>
            </section>
          );
        })}
      </div>
    </main>
  );
}
