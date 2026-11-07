import Image from "next/image";
import Link from "next/link";
import { ArrowDownRight, ArrowUpRight } from "lucide-react";
import { profile, publishedProjects, timeline } from "@/lib/content";

function pad(n: number) {
  return String(n).padStart(2, "0");
}

export function Hero() {
  const roleCount = timeline.reduce((n, org) => n + org.roles.length, 0);
  const [first, ...rest] = profile.name.split(" ");
  const last = rest.join(" ");
  const edu = profile.education;

  const stats = [
    { value: pad(publishedProjects.length), label: "Projects with\ncase studies" },
    { value: pad(roleCount), label: "Roles across\nengineering & leadership" },
    { value: pad(timeline.length), label: "Organisations\nworked with" },
  ];

  return (
    <section
      id="top"
      data-build-section="Hero"
      className="relative isolate -mt-[3.75rem] overflow-hidden pt-[3.75rem] md:min-h-[100svh]"
    >
      {/* Atmosphere */}
      <div aria-hidden="true" className="blueprint absolute inset-0 -z-10" />
      <div
        aria-hidden="true"
        className="absolute left-1/2 top-[38%] -z-10 h-[70vmin] w-[70vmin] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-40 blur-[90px]"
        style={{ background: "radial-gradient(circle, var(--color-accent) 0%, transparent 65%)" }}
      />

      {/* Giant backdrop word — decorative, sits behind the portrait. */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 top-[4.5rem] -z-[5] flex justify-center sm:top-[5.5rem]">
        <div
          data-build="title"
          data-label="backdrop · type"
          className="font-display select-none whitespace-nowrap bg-gradient-to-b from-[#ff6a2b] via-[#ff5b1f] to-[#7a2306] bg-clip-text text-[23vw] leading-[0.8] text-transparent md:text-[19vw]"
        >
          Portfolio
        </div>
      </div>

      <div className="mx-auto grid max-w-[92rem] grid-cols-1 px-4 sm:px-8 md:min-h-[calc(100svh-3.75rem)] md:grid-cols-[minmax(0,1.15fr)_minmax(0,1fr)_minmax(0,0.42fr)] md:gap-6">
        {/* Portrait — on phones it comes first, under the backdrop word. */}
        <div className="relative order-1 flex justify-center pt-[12vw] md:order-2 md:items-end md:pt-0">
          <div
            data-build="media"
            data-label="portrait.png"
            className="relative h-[58svh] w-[min(80vw,26rem)] md:h-[82svh] md:w-full md:max-w-[30rem]"
          >
            <Image
              src="/portrait-lead.png"
              alt={`Portrait of ${profile.name}`}
              fill
              priority
              sizes="(min-width: 768px) 30rem, 80vw"
              className="object-contain object-bottom [filter:grayscale(1)_contrast(1.12)_brightness(0.95)_drop-shadow(0_0_40px_rgba(255,91,31,0.25))] [mask-image:linear-gradient(to_bottom,black_70%,transparent_100%)]"
            />
          </div>
        </div>

        {/* Name + pitch */}
        <div className="relative z-10 order-2 -mt-[18svh] pb-10 md:order-1 md:mt-0 md:self-end md:pb-[12svh]">
          <p data-build="label" data-label="greeting" className="font-mono text-sm text-[var(--color-fg)]">
            Hello, I&apos;m
          </p>
          <h1
            data-build="title"
            data-label="h1 · name"
            className="font-display mt-2 text-[clamp(3.4rem,7.6vw,8.6rem)] text-[var(--color-fg)] [text-shadow:0_4px_30px_rgba(0,0,0,0.6)]"
          >
            <span className="block">{first}</span>
            <span className="block">
              {last}
              <span className="text-[var(--color-accent)]">.</span>
            </span>
          </h1>
          <p
            data-build="title"
            data-label="h2 · role"
            className="font-display mt-4 text-[clamp(1.6rem,3vw,2.6rem)] leading-[0.95] text-[var(--color-accent)]"
          >
            {profile.role} &amp;
            <br />
            agent systems builder
          </p>
          <p
            data-build="text"
            data-label="tagline"
            className="mt-5 max-w-md text-[0.98rem] leading-relaxed text-[var(--color-fg)]/85"
          >
            {profile.tagline}
          </p>

          <div className="mt-7 flex flex-wrap items-center gap-3">
            <Link
              href="/#projects"
              data-build="chip"
              data-label="cta"
              className="group inline-flex items-center gap-2 rounded-full bg-[var(--color-accent)] px-5 py-2.5 text-sm font-semibold text-[var(--color-accent-ink)] transition-transform hover:scale-[1.03] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
            >
              View work
              <ArrowDownRight size={16} className="transition-transform group-hover:rotate-[-45deg]" aria-hidden="true" />
            </Link>
            <Link
              href="/ask"
              data-build="chip"
              data-label="cta"
              className="inline-flex items-center gap-2 rounded-full border border-[var(--color-border-strong)] px-5 py-2.5 text-sm text-[var(--color-fg)] transition-colors hover:border-[var(--color-accent)] hover:text-[var(--color-accent)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-[var(--color-accent)]"
            >
              Ask my AI about me
              <ArrowUpRight size={15} aria-hidden="true" />
            </Link>
          </div>

          <p
            data-build="label"
            data-label="meta"
            className="mt-7 font-mono text-[0.62rem] uppercase tracking-[0.2em] text-[var(--color-fg-muted)]"
          >
            Based in {profile.location.split(",")[0]}
            {edu?.show && edu.degree ? ` · ${edu.degree.replace(" (Hons)", "")} · ${edu.yearOfStudy?.replace(" undergraduate", "")}` : ""}
          </p>
        </div>

        {/* Stats column */}
        <dl className="order-3 grid grid-cols-3 gap-4 border-t border-[var(--color-border)] py-8 md:flex md:flex-col md:justify-end md:gap-8 md:self-end md:border-0 md:pb-[14svh] md:text-right">
          {stats.map((s) => (
            <div key={s.label}>
              <dt className="sr-only">{s.label.replace("\n", " ")}</dt>
              <dd
                data-build="stat"
                data-label="metric"
                className="font-display text-[clamp(2.6rem,5vw,4.5rem)] text-[var(--color-fg)]"
              >
                {s.value}
                <span className="text-[var(--color-accent)]">.</span>
              </dd>
              <dd
                aria-hidden="true"
                data-build="label"
                data-label="caption"
                className="mt-1 whitespace-pre-line font-mono text-[0.58rem] uppercase leading-relaxed tracking-[0.16em] text-[var(--color-fg-muted)]"
              >
                {s.label}
              </dd>
            </div>
          ))}
        </dl>
      </div>

    </section>
  );
}
