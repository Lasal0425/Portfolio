import Link from "next/link";
import { ArrowUpRight, FileDown, Mail, Sparkles } from "lucide-react";
import { profile } from "@/lib/content";
import { SectionHeading } from "./section-heading";

export function ContactSection() {
  const links = [
    { label: "GitHub", href: profile.links.github },
    { label: "LinkedIn", href: profile.links.linkedin },
    { label: "dev.to", href: profile.links.devto },
    { label: "Medium", href: profile.links.medium },
  ];

  return (
    <section id="contact" data-build-section="Contact" className="relative isolate scroll-mt-20 overflow-hidden border-t border-[var(--color-border)] py-24 sm:py-32">
      <div
        aria-hidden="true"
        className="absolute -bottom-40 left-1/2 -z-10 h-[60vmin] w-[90vmin] -translate-x-1/2 rounded-full opacity-30 blur-[100px]"
        style={{ background: "radial-gradient(ellipse, var(--color-accent) 0%, transparent 65%)" }}
      />
      <div className="mx-auto max-w-[92rem] px-4 sm:px-8">
        <SectionHeading
          kicker="Contact"
          line1="Let's build"
          line2="together."
          intro="Internships, engineering roles, or an LLM / RAG / agent system you want built properly — my inbox is open."
        />

        <div className="mt-14 grid grid-cols-1 gap-5 lg:grid-cols-[minmax(0,1.5fr)_minmax(0,1fr)]">
          <a
            href={`mailto:${profile.email}`}
            data-build="block"
            data-label="email"
            className="group relative flex flex-col justify-between gap-10 overflow-hidden rounded-2xl bg-[var(--color-accent)] p-7 text-[var(--color-accent-ink)] transition-transform hover:scale-[1.01] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white sm:p-10"
          >
            <span className="flex items-center justify-between font-mono text-[0.68rem] uppercase tracking-[0.2em]">
              <span className="flex items-center gap-2">
                <Mail size={14} aria-hidden="true" /> Email me
              </span>
              <ArrowUpRight size={28} aria-hidden="true" className="transition-transform group-hover:-translate-y-1 group-hover:translate-x-1" />
            </span>
            <span className="font-display text-[clamp(1.35rem,3.6vw,3.6rem)] leading-[0.95] normal-case [overflow-wrap:anywhere]">
              {profile.email}
            </span>
          </a>

          <div className="flex flex-col gap-5">
            <Link
              href="/ask"
              data-build="block"
              data-label="ask · rag"
              className="group flex items-center justify-between gap-4 rounded-2xl border border-[var(--color-border-strong)] bg-[var(--color-bg-raised)] p-6 transition-colors hover:border-[var(--color-accent)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-[var(--color-accent)]"
            >
              <span>
                <span className="flex items-center gap-2 font-mono text-[0.62rem] uppercase tracking-[0.18em] text-[var(--color-accent)]">
                  <Sparkles size={13} aria-hidden="true" /> RAG assistant
                </span>
                <span className="font-display mt-2 block text-3xl text-[var(--color-fg)]">Ask my AI about me</span>
                <span className="mt-1 block text-sm text-[var(--color-fg-muted)]">Answers from this site&apos;s own content, with citations.</span>
              </span>
              <ArrowUpRight size={22} aria-hidden="true" className="shrink-0 text-[var(--color-fg)] group-hover:text-[var(--color-accent)]" />
            </Link>

            <ul data-build="block" data-label="links" className="grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-[var(--color-border)] bg-[var(--color-border)]">
              {links.map((l) => (
                <li key={l.label}>
                  <a
                    href={l.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between bg-[var(--color-bg-raised)] px-5 py-4 text-sm text-[var(--color-fg)] transition-colors hover:bg-[var(--color-bg)] hover:text-[var(--color-accent)]"
                  >
                    {l.label}
                    <ArrowUpRight size={14} aria-hidden="true" />
                  </a>
                </li>
              ))}
              <li className="col-span-2">
                <a
                  href={profile.resumeUrl}
                  download
                  className="flex items-center justify-between bg-[var(--color-bg-raised)] px-5 py-4 text-sm text-[var(--color-fg)] transition-colors hover:bg-[var(--color-bg)] hover:text-[var(--color-accent)]"
                >
                  Download resume (PDF)
                  <FileDown size={14} aria-hidden="true" />
                </a>
              </li>
            </ul>
          </div>
        </div>

        <p
          data-build="title"
          data-label="sign-off"
          aria-hidden="true"
          className="font-display mt-24 select-none text-center text-[clamp(3rem,13vw,12rem)] text-transparent [-webkit-text-stroke:1px_var(--color-border-strong)]"
        >
          Ship it for real.
        </p>
      </div>
    </section>
  );
}
