import Link from "next/link";
import { FileDown } from "lucide-react";
import { profile } from "@/lib/content";
import { ThemeToggle } from "@/components/theme-toggle";

const NAV = [
  { href: "/timeline", label: "Timeline" },
  { href: "/projects", label: "Projects" },
  { href: "/writing", label: "Writing" },
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
