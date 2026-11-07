import Image from "next/image";
import { profile, timeline } from "@/lib/content";
import { stack } from "../../../content/stack";
import { SectionHeading } from "./section-heading";

export function AboutSection() {
  const edu = profile.education;
  const current = timeline.flatMap((org) =>
    org.roles.filter((r) => r.endDate === "Present").map((r) => `${r.title} at ${org.name}`),
  );
  const currentText =
    current.length > 1 ? `${current.slice(0, -1).join(", ")} and ${current[current.length - 1]}` : current[0];

  return (
    <section id="about" data-build-section="About" className="scroll-mt-20 border-t border-[var(--color-border)] py-24 sm:py-32">
      <div className="mx-auto max-w-[92rem] px-4 sm:px-8">
        <SectionHeading kicker="About" line1="Not just code." line2="Systems that ship." />

        <div className="mt-16 grid grid-cols-1 gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)_minmax(0,0.85fr)]">
          {/* Who */}
          <div className="flex flex-col gap-6">
            {edu?.show && (
              <p data-build="text" data-label="bio" className="text-[1.05rem] leading-relaxed text-[var(--color-fg)]/90">
                I&apos;m a {edu.yearOfStudy} reading {edu.degree} at the {edu.institution}
                {edu.affiliatedWith ? `, in association with the ${edu.affiliatedWith.name}` : ""}.
                {currentText ? ` Right now I'm a ${currentText}.` : ""}
              </p>
            )}

            {edu?.show && (
              <div
                data-build="block"
                data-label="education"
                className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-bg-raised)] p-5"
              >
                <p className="kicker">Education</p>
                <p className="font-display mt-3 text-2xl text-[var(--color-fg)]">{edu.degree}</p>
                <p className="mt-1 font-mono text-[0.62rem] uppercase tracking-[0.16em] text-[var(--color-fg-muted)]">
                  {edu.startDate} – {edu.endDate} · {edu.yearOfStudy}
                </p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {edu.logoUrl && (
                    <span className="flex h-10 items-center rounded-lg bg-white px-3">
                      <Image src={edu.logoUrl} alt={edu.institution} width={72} height={28} className="max-h-7 w-auto object-contain" />
                    </span>
                  )}
                  {edu.affiliatedWith?.logoUrl && (
                    <span className="flex h-10 items-center rounded-lg bg-white px-3">
                      <Image
                        src={edu.affiliatedWith.logoUrl}
                        alt={edu.affiliatedWith.name}
                        width={72}
                        height={28}
                        className="max-h-7 w-auto object-contain"
                      />
                    </span>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Stack, organised by what it's used for */}
          <dl className="flex flex-col">
            {stack.map((group) => (
              <div
                key={group.category}
                data-build="block"
                data-label={`stack · ${group.category.split(" ")[0].toLowerCase()}`}
                className="grid grid-cols-[7.5rem_minmax(0,1fr)] gap-4 border-t border-[var(--color-border)] py-4 first:border-t-0 first:pt-0"
              >
                <dt className="font-mono text-[0.6rem] uppercase leading-relaxed tracking-[0.16em] text-[var(--color-fg-muted)]">
                  {group.category}
                </dt>
                <dd className="text-sm leading-relaxed text-[var(--color-fg)]">{group.items.join(", ")}</dd>
              </div>
            ))}
          </dl>

          {/* Statement card */}
          <figure
            data-build="block"
            data-label="statement"
            className="relative flex flex-col justify-between overflow-hidden rounded-2xl bg-[var(--color-accent)] p-7 text-[var(--color-accent-ink)] lg:rotate-[1.5deg]"
          >
            <span aria-hidden="true" className="font-display absolute -right-2 -top-8 text-[9rem] leading-none opacity-15">
              “
            </span>
            <blockquote className="font-display relative text-[clamp(1.7rem,2.4vw,2.3rem)] leading-[1.06]">
              {profile.tagline}
            </blockquote>
            <figcaption className="mt-8 font-mono text-[0.65rem] uppercase tracking-[0.2em]">— {profile.name.split(" ")[0]}</figcaption>
          </figure>
        </div>
      </div>
    </section>
  );
}
