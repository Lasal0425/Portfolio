import { Mail, FileDown } from "lucide-react";
import { profile } from "@/lib/content";

// lucide-react dropped brand/logo icons (GitHub, LinkedIn, dev.to) from its
// core set — these are the official simple, single-path brand marks used
// directly as inline SVG instead of depending on a brand-icon package.
const GITHUB_ICON_PATH =
  "M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12";
const LINKEDIN_ICON_PATH =
  "M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z";
const DEVTO_ICON_PATH =
  "M7.42 10.05c-.18-.16-.46-.23-.84-.23H6l.02 2.44.04 2.45.56-.02c.41 0 .63-.07.83-.26.24-.24.26-.36.26-2.2 0-1.91-.02-1.96-.29-2.18zM0 4.94v14.12h24V4.94H0zM8.56 15.3c-.44.58-1.06.77-2.53.77H4.71V8.53h1.4c1.67 0 2.16.18 2.6.9.13.15.13.13.14 2.55.02 2.53-.06 2.9-.29 3.32zm5.05-5.06H12v.36c0 .18-.02.34-.02.36-.02 0-.6.02-1.28.02H10v1.65h.72c.85 0 .95.05.95.5v.6h-.72c-.65 0-.72.03-.72.32 0 .1.02.24.02.32l.02.03h1.4c1.28 0 1.28 0 1.28.02v.71h-1.53c-1.05 0-1.06 0-1.06-.02V8.53h1.3c1.31 0 1.31.02 1.31 0v1.71zm5.13 5.65c-.29.53-.72.75-1.5.75-.66 0-.98-.1-1.28-.4-.4-.4-.4-.5-.43-3.13l-.02-2.4h.72c.63 0 .72.02.72.06 0 .02.02 1.02.04 2.2.02 1.72.05 2.2.15 2.34.16.24.6.24.76-.02.1-.15.13-.6.15-2.32l.02-2.26h1.4l-.02 2.42c-.02 2.36-.02 2.42-.29 2.76z";

export function SiteFooter() {
  return (
    <footer className="mt-24 border-t border-[var(--color-border)]">
      <div className="mx-auto flex max-w-5xl flex-col gap-6 px-4 py-10 sm:px-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm font-medium text-[var(--color-fg)]">{profile.name}</p>
            <p className="text-sm text-[var(--color-fg-muted)]">{profile.location}</p>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <a
              href={`mailto:${profile.email}`}
              className="flex h-9 w-9 items-center justify-center rounded-md border border-[var(--color-border)] text-[var(--color-fg-muted)] transition-colors hover:text-[var(--color-fg)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-accent)]"
              aria-label="Email Lasal"
            >
              <Mail size={16} aria-hidden="true" />
            </a>
            <a
              href={profile.links.github}
              target="_blank"
              rel="noopener noreferrer"
              className="flex h-9 w-9 items-center justify-center rounded-md border border-[var(--color-border)] text-[var(--color-fg-muted)] transition-colors hover:text-[var(--color-fg)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-accent)]"
              aria-label="GitHub (opens in a new tab)"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d={GITHUB_ICON_PATH} />
              </svg>
            </a>
            <a
              href={profile.links.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="flex h-9 w-9 items-center justify-center rounded-md border border-[var(--color-border)] text-[var(--color-fg-muted)] transition-colors hover:text-[var(--color-fg)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-accent)]"
              aria-label="LinkedIn (opens in a new tab)"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d={LINKEDIN_ICON_PATH} />
              </svg>
            </a>
            <a
              href={profile.links.devto}
              target="_blank"
              rel="noopener noreferrer"
              className="flex h-9 w-9 items-center justify-center rounded-md border border-[var(--color-border)] text-[var(--color-fg-muted)] transition-colors hover:text-[var(--color-fg)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-accent)]"
              aria-label="dev.to (opens in a new tab)"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d={DEVTO_ICON_PATH} />
              </svg>
            </a>
            <a
              href={profile.links.medium}
              target="_blank"
              rel="noopener noreferrer"
              className="flex h-9 items-center gap-1 rounded-md border border-[var(--color-border)] px-2.5 text-sm text-[var(--color-fg-muted)] transition-colors hover:text-[var(--color-fg)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-accent)]"
              aria-label="Medium (opens in a new tab)"
            >
              Medium
            </a>
            <a
              href={profile.resumeUrl}
              download
              className="flex h-9 items-center gap-1.5 rounded-md border border-[var(--color-border)] px-2.5 text-sm text-[var(--color-fg-muted)] transition-colors hover:text-[var(--color-fg)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-accent)]"
            >
              <FileDown size={14} aria-hidden="true" />
              Resume
            </a>
          </div>
        </div>

        <p className="text-xs text-[var(--color-fg-muted)]">
          © {new Date().getFullYear()} {profile.name}.
        </p>
      </div>
    </footer>
  );
}
