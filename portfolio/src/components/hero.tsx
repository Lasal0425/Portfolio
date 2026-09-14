import Link from "next/link";
import { profile, timeline } from "@/lib/content";
import { NodeField } from "@/components/node-field";
import { LogoChip } from "@/components/logo-chip";

export function Hero() {
  const education = profile.education;
  // Employer logos, most recent first, deduplicated, real-logo-only.
  const employers = timeline.filter((org) => org.logoUrl);

  return (
    <section className="mx-auto max-w-5xl px-4 pb-16 pt-10 sm:px-6 sm:pt-16">
      {/*
        DOM order is deliberate: name + tagline first, node field second.
        A phone visitor should see who this is before an exploratory graph —
        the grid only reflows this side-by-side at md+, it doesn't reorder.
      */}
      <div className="grid grid-cols-1 items-center gap-10 md:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] md:gap-8">
        <div>
          <h1 className="text-3xl font-semibold tracking-tight text-[var(--color-fg)] sm:text-4xl">
            {profile.name}
          </h1>
          <p className="mt-1 text-sm text-[var(--color-fg-muted)]">
            {profile.role} · {profile.location}
          </p>
          <p className="mt-6 max-w-md text-lg leading-relaxed text-[var(--color-fg)]">
            {profile.tagline}
          </p>

          <div className="mt-8 flex flex-wrap gap-x-6 gap-y-2 text-sm">
            <Link
              href="/#projects"
              className="border-b border-transparent text-[var(--color-fg)] transition-colors hover:border-[var(--color-accent)]"
            >
              View projects
            </Link>
            <Link
              href="/#timeline"
              className="border-b border-transparent text-[var(--color-fg)] transition-colors hover:border-[var(--color-accent)]"
            >
              See timeline
            </Link>
            <a
              href={profile.resumeUrl}
              download
              className="border-b border-transparent text-[var(--color-fg)] transition-colors hover:border-[var(--color-accent)]"
            >
              Download resume
            </a>
          </div>
        </div>

        {/*
          Plain stretched grid item — no width/margin classes here. Auto
          margins on a grid item cancel justify-self:stretch (the item
          shrinks to content size instead of filling the track), which
          cascaded into the node field's own w-full computing to 0. The
          size cap and centering live inside NodeField instead, where it's
          a normal block descendant and max-width + mx-auto behaves the
          way you'd expect.
        */}
        <div>
          <NodeField />
        </div>
      </div>

      {(education?.show || employers.length > 0) && (
        <div className="mt-16 flex flex-col gap-6 border-t border-[var(--color-border)] pt-8 sm:flex-row sm:gap-12">
          {education?.show && (
            <div>
              <p className="mb-2 text-xs text-[var(--color-fg-muted)]">Studied at</p>
              <div className="flex flex-wrap gap-2">
                {education.logoUrl && (
                  <LogoChip
                    src={education.logoUrl}
                    alt={education.institution}
                    label={`${education.institution}${education.yearOfStudy ? ` — ${education.yearOfStudy}` : ""}`}
                  />
                )}
                {education.affiliatedWith?.logoUrl && (
                  <LogoChip
                    src={education.affiliatedWith.logoUrl}
                    alt={education.affiliatedWith.name}
                    label={`in association with ${education.affiliatedWith.name}`}
                  />
                )}
              </div>
            </div>
          )}

          {employers.length > 0 && (
            <div>
              <p className="mb-2 text-xs text-[var(--color-fg-muted)]">Worked with</p>
              <div className="flex flex-wrap gap-2">
                {employers.map((org) => (
                  <LogoChip key={org.id} src={org.logoUrl!} alt={org.name} label={org.name} />
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </section>
  );
}
