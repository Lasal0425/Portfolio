import Image from "next/image";
import Link from "next/link";
import { timeline, featuredRoles, collapsedRoles, type Role } from "@/lib/content";
import { SectionHeading } from "./section-heading";
import { MoreRoles } from "./more-roles";

function yearTag(role: Role) {
  const y = role.startDate.match(/\d{4}/)?.[0];
  return y ? `'${y.slice(2)}` : "";
}

export function RoleRow({ role }: { role: Role }) {
  const current = role.endDate === "Present";
  return (
    <li
      data-build="block"
      data-label={`role · ${role.id}`}
      className="group grid grid-cols-[minmax(0,1fr)_auto] gap-4 border-t border-[var(--color-border)] py-5 transition-colors hover:bg-white/[0.015]"
    >
      <div>
        <p className="flex flex-wrap items-center gap-2 text-[1.02rem] font-medium text-[var(--color-fg)]">
          {role.title}
          {current && (
            <span className="rounded-full border border-[#3ddc84]/40 px-2 py-0.5 font-mono text-[0.55rem] uppercase tracking-[0.18em] text-[#3ddc84]">
              Now
            </span>
          )}
        </p>
        <p className="mt-1 font-mono text-[0.65rem] uppercase tracking-[0.14em] text-[var(--color-fg-muted)]">
          {role.startDate} – {role.endDate}
          {role.employmentType ? ` · ${role.employmentType}` : ""}
          {role.workMode ? ` · ${role.workMode}` : ""}
        </p>
        {role.note && <p className="mt-2 text-sm text-[var(--color-fg-muted)]">{role.note}</p>}
        {role.bullets.length > 0 && (
          <ul className="mt-2 flex flex-col gap-1 text-sm text-[var(--color-fg)]/85">
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
            className="mt-2 inline-block font-mono text-[0.65rem] uppercase tracking-[0.14em] text-[var(--color-accent)] underline underline-offset-4"
          >
            Related project →
          </Link>
        )}
      </div>
      <span className="font-display text-2xl text-[var(--color-fg-muted)] transition-colors group-hover:text-[var(--color-accent)] sm:text-3xl">
        {yearTag(role)}
      </span>
    </li>
  );
}

export function ExperienceSection() {
  const roleCount = timeline.reduce((n, org) => n + org.roles.length, 0);

  return (
    <section id="timeline" data-build-section="Experience" className="scroll-mt-20 border-t border-[var(--color-border)] py-24 sm:py-32">
      <div className="mx-auto max-w-[92rem] px-4 sm:px-8">
        <SectionHeading
          kicker="Track record"
          line1="Built fast."
          line2="Shipped real."
          intro="Titles and dates exactly as they are on LinkedIn — engineering roles up front, the rest of the story one click away."
        />

        <div className="mt-16 grid grid-cols-1 gap-12 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.6fr)]">
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
          </div>

          <div className="flex flex-col gap-14">
            {timeline.map((org) => {
              const featured = featuredRoles(org);
              const collapsed = collapsedRoles(org);
              return (
                <section key={org.id} id={org.id} className="scroll-mt-24">
                  <div data-build="block" data-label={`org · ${org.id}`} className="mb-4 flex items-center gap-4">
                    {org.logoUrl && (
                      <span className="flex h-11 w-20 items-center justify-center rounded-lg bg-white">
                        <Image src={org.logoUrl} alt={org.name} width={64} height={28} className="max-h-7 w-auto object-contain" />
                      </span>
                    )}
                    <div>
                      <h3 className="font-display text-3xl text-[var(--color-fg)]">{org.name}</h3>
                      {org.totalDuration && (
                        <p className="font-mono text-[0.62rem] uppercase tracking-[0.16em] text-[var(--color-fg-muted)]">
                          {org.totalDuration}
                        </p>
                      )}
                    </div>
                  </div>
                  <ol>
                    {featured.map((role) => (
                      <RoleRow key={role.id} role={role} />
                    ))}
                  </ol>
                  {collapsed.length > 0 && <MoreRoles count={collapsed.length}>{collapsed.map((role) => <RoleRow key={role.id} role={role} />)}</MoreRoles>}
                </section>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
