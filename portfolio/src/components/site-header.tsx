import Link from "next/link";
import { FileDown } from "lucide-react";
import { profile } from "@/lib/content";

// The home page is a one-pager — nav jumps to its sections by anchor. The
// ids (#timeline, #projects, #writing) are the same ones the Ask panel's
// citations link to. Ask stays a real separate page; it's a tool.
const NAV = [
  { href: "/#projects", label: "Work" },
  { href: "/#timeline", label: "Experience" },
  { href: "/#about", label: "About" },
  { href: "/#writing", label: "Writing" },
  { href: "/ask", label: "Ask AI" },
];

export function SiteHeader() {
  return (
    <header className="pointer-events-none sticky top-0 z-50 flex justify-center px-3 pt-3 sm:pt-4">
      <div className="pointer-events-auto flex max-w-full items-center gap-1 rounded-full border border-[var(--color-border-strong)] bg-[#0d0d0f]/80 p-1 shadow-[0_8px_30px_rgba(0,0,0,0.5)] backdrop-blur-md">
        <Link
          href="/"
          aria-label={`${profile.name} — home`}
          className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[var(--color-accent)] font-display text-[0.8rem] text-[var(--color-accent-ink)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
        >
          LR
        </Link>

        <nav aria-label="Primary" className="flex items-center overflow-x-auto">
          {NAV.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`whitespace-nowrap rounded-full px-2.5 py-1.5 text-[0.78rem] text-[var(--color-fg-muted)] transition-colors hover:bg-white/5 hover:text-[var(--color-fg)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-[var(--color-accent)] sm:px-3 ${
                item.label === "About" || item.label === "Writing" ? "hidden sm:block" : ""
              }`}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <a
          href={profile.resumeUrl}
          download
          aria-label="Download resume"
          className="flex h-8 shrink-0 items-center gap-1.5 rounded-full border border-[var(--color-border-strong)] px-2.5 text-[0.78rem] text-[var(--color-fg)] transition-colors hover:border-[var(--color-accent)] hover:text-[var(--color-accent)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-[var(--color-accent)]"
        >
          <FileDown size={13} aria-hidden="true" />
          <span className="hidden sm:inline">Resume</span>
        </a>
      </div>
    </header>
  );
}
