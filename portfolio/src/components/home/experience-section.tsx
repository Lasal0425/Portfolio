import Image from "next/image";
import Link from "next/link";
import { timeline, type Organisation, type Role } from "@/lib/content";
import { SectionHeading } from "./section-heading";
import { MoreRoles } from "./more-roles";

const MONTHS = ["jan", "feb", "mar", "apr", "may", "jun", "jul", "aug", "sep", "oct", "nov", "dec"];

/** "Aug 2026" → sortable number; "Present" sorts last. */
function monthValue(d: string) {
  if (/present/i.test(d)) return Infinity;
  const [m, y] = d.trim().split(/\s+/);
  return Number(y) * 12 + Math.max(0, MONTHS.indexOf(m.slice(0, 3).toLowerCase()));
}

interface Entry {
  role: Role;
  org: Organisation;
  anchorId?: string; // org id on the first card of each org (citation target)
}

/** Square logo tile: the org's square mark, or its wordmark on white. */
function OrgTile({ org, size = 48 }: { org: Organisation; size?: number }) {
  const src = org.iconUrl ?? org.logoUrl;
  const square = Boolean(org.iconUrl);
  return (
    <span
      className={`flex shrink-0 items-center justify-center overflow-hidden rounded-xl ${square ? "" : "bg-white p-1.5"}`}
      style={{ width: size, height: size }}
    >
      {src ? (
        <Image
          src={src}
          alt={`${org.name} logo`}
          width={size * 2}
          height={size * 2}
          className={square ? "h-full w-full object-cover" : "h-auto w-full object-contain"}
        />
      ) : (
        <span className="font-display text-lg text-[var(--color-accent)]">{org.name[0]}</span>
      )}
    </span>
  );
}

function RoleCard({ role, org, anchorId }: Entry) {
  const current = role.endDate === "Present";
  const meta = [role.employmentType, role.workMode].filter(Boolean).join(" · ");
  return (
    <li
      id={anchorId}
      className="relative grid scroll-mt-28 grid-cols-[1.25rem_minmax(0,1fr)] gap-3 pb-4 sm:gap-5"
    >
      {/* Timeline rail + node */}
      <span aria-hidden="true" className="absolute bottom-0 left-[0.6rem] top-0 w-px bg-[var(--color-border-strong)]" />
      <span
        aria-hidden="true"
        className={`relative mt-9 h-2.5 w-2.5 justify-self-center rounded-full ${
          current
            ? "bg-[var(--color-accent)] shadow-[0_0_0_4px_rgba(255,91,31,0.18),0_0_14px_var(--color-accent)]"
            : "bg-[var(--color-border-strong)]"
        }`}
      />

      <div
        data-build="block"
        data-label={`role · ${role.id}`}
        className="group rounded-2xl border border-[var(--color-border)] bg-[var(--color-bg-raised)] p-4 transition-colors hover:border-[var(--color-accent)]/50 sm:p-5"
      >
        <div className="flex items-start gap-4">
          <OrgTile org={org} />
          <div className="min-w-0 flex-1">
            <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between sm:gap-4">
              <div className="min-w-0">
                <h3 className="text-[1.05rem] font-semibold leading-snug text-[var(--color-fg)] sm:text-[1.15rem]">
                  {role.title}
                </h3>
                <p className="mt-0.5 text-sm font-medium text-[var(--color-accent)]">{org.name}</p>
              </div>
              <span
                className={`w-fit shrink-0 whitespace-nowrap rounded-full border px-3 py-1 font-mono text-[0.68rem] tracking-wide ${
                  current
                    ? "border-[var(--color-accent)]/50 bg-[var(--color-accent)]/10 text-[var(--color-accent-soft)]"
                    : "border-[var(--color-border-strong)] text-[var(--color-fg-muted)]"
                }`}
              >
                {role.startDate} – {role.endDate}
              </span>
            </div>

            {(meta || role.location) && (
              <p className="mt-2 font-mono text-[0.62rem] uppercase tracking-[0.14em] text-[var(--color-fg-muted)]">
                {[meta, role.location].filter(Boolean).join(" · ")}
              </p>
            )}
            {role.note && <p className="mt-2 text-sm text-[var(--color-fg-muted)]">{role.note}</p>}
            {role.bullets.length > 0 && (
              <ul className="mt-3 flex flex-col gap-1 text-sm text-[var(--color-fg)]/85">
                {role.bullets.map((b, i) => (
                  <li key={i} className="flex gap-2">
                    <span aria-hidden="true" className="text-[var(--color-accent)]">
                      —
                    </span>
                    {b}
                  </li>
                ))}
              </ul>
            )}
            {role.projectSlug && (
              <Link
                href={`/projects/${role.projectSlug}`}
                className="mt-3 inline-block font-mono text-[0.65rem] uppercase tracking-[0.14em] text-[var(--color-accent)] underline underline-offset-4"
              >
                Related project →
              </Link>
            )}
          </div>
        </div>
      </div>
    </li>
  );
}

export function ExperienceSection() {
  const roleCount = timeline.reduce((n, org) => n + org.roles.length, 0);

  // One timeline across every organisation, newest start date first.
  const byDate = (a: Entry, b: Entry) =>
    monthValue(b.role.startDate) - monthValue(a.role.startDate) ||
    monthValue(b.role.endDate) - monthValue(a.role.endDate);
  const all: Entry[] = timeline.flatMap((org) => org.roles.map((role) => ({ role, org })));
  const featured = all.filter((e) => e.role.featured).sort(byDate);
  const more = all.filter((e) => !e.role.featured).sort(byDate);

  // Keep each organisation's id on its first card so the Ask panel's
  // citation links (#nebule, #aiesec-sri-lanka) still land somewhere real.
  const seen = new Set<string>();
  for (const e of [...featured, ...more]) {
    if (!seen.has(e.org.id)) {
      seen.add(e.org.id);
      e.anchorId = e.org.id;
    }
  }

  return (
    <section id="timeline" data-build-section="Experience" className="scroll-mt-20 border-t border-[var(--color-border)] py-24 sm:py-32">
      <div className="mx-auto max-w-[92rem] px-4 sm:px-8">
        <SectionHeading
          kicker="Track record"
          line1="Built fast."
          line2="Shipped real."
          intro="Titles and dates exactly as they are on LinkedIn — engineering roles up front, the rest of the story one click away."
        />

        <div className="mt-16 grid grid-cols-1 gap-12 lg:grid-cols-[minmax(0,0.75fr)_minmax(0,1.65fr)]">
          <div className="lg:sticky lg:top-28 lg:self-start">
            <p
              data-build="stat"
              data-label="roles held"
              className="font-display text-[clamp(7rem,18vw,15rem)] leading-[0.8] text-[var(--color-accent)]"
            >
              {roleCount}
              <span className="text-[var(--color-fg)]">.</span>
            </p>
            <p data-build="text" data-label="caption" className="mt-4 max-w-xs text-sm leading-relaxed text-[var(--color-fg-muted)]">
              roles across {timeline.length} organisations — from first-year member to leading a dev team.
            </p>

            <ul className="mt-8 flex flex-col gap-3">
              {timeline.map((org) => (
                <li key={org.id} data-build="block" data-label={`org · ${org.id}`} className="flex items-center gap-3">
                  <OrgTile org={org} size={40} />
                  <div>
                    <p className="text-sm font-medium text-[var(--color-fg)]">{org.name}</p>
                    <p className="font-mono text-[0.6rem] uppercase tracking-[0.16em] text-[var(--color-fg-muted)]">
                      {[`${org.roles.length} roles`, org.totalDuration].filter(Boolean).join(" · ")}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <ol>
              {featured.map((e) => (
                <RoleCard key={e.role.id} {...e} />
              ))}
            </ol>
            {more.length > 0 && (
              <MoreRoles count={more.length}>
                {more.map((e) => (
                  <RoleCard key={e.role.id} {...e} />
                ))}
              </MoreRoles>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
