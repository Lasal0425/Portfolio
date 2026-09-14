import Link from "next/link";
import { FileDown } from "lucide-react";
import { profile } from "@/lib/content";
import { ThemeToggle } from "@/components/theme-toggle";

// The home page is a one-pager — Timeline/Projects/Writing are sections
// there (with matching ids), so nav jumps to them by anchor instead of
// navigating to the standalone /timeline, /projects, /writing pages.
// Those pages still exist and still work (deep links, sharing a specific
// list on its own URL) — they're just not the primary nav destination
// anymore. Ask stays a real separate page; it's a tool, not a list.
const NAV = [
  { href: "/#timeline", label: "Timeline" },
  { href: "/#projects", label: "Projects" },
  { href: "/#writing", label: "Writing" },
  { href: "/ask", label: "Ask" },
];

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-20 border-b border-[var(--color-border)] bg-[var(--color-bg)]/90 backdrop-blur-sm">
      <div className="mx-auto flex h-14 max-w-5xl items-center justify-between gap-3 px-4 sm:px-6">
        <Link
          href="/"
          className="shrink-0 rounded text-sm font-semibold text-[var(--color-fg)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-accent)]"
        >
          {profile.name}
        </Link>

        <nav aria-label="Primary" className="flex items-center gap-1 overflow-x-auto">
          {NAV.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="rounded px-2 py-1 text-sm text-[var(--color-fg-muted)] transition-colors hover:text-[var(--color-fg)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-accent)]"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex shrink-0 items-center gap-2">
          <a
            href={profile.resumeUrl}
            download
            className="hidden items-center gap-1.5 rounded-md border border-[var(--color-border)] px-2.5 py-1.5 text-sm text-[var(--color-fg-muted)] transition-colors hover:text-[var(--color-fg)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-accent)] sm:flex"
          >
            <FileDown size={14} aria-hidden="true" />
            Resume
          </a>
          <a
            href={profile.resumeUrl}
            download
            aria-label="Download resume"
            className="flex h-9 w-9 items-center justify-center rounded-md border border-[var(--color-border)] text-[var(--color-fg-muted)] transition-colors hover:text-[var(--color-fg)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-accent)] sm:hidden"
          >
            <FileDown size={16} aria-hidden="true" />
          </a>
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
