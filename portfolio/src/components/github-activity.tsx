import { ArrowUpRight } from "lucide-react";
import { getRecentActivity } from "@/lib/github";
import { SectionHeading } from "@/components/home/section-heading";

function timeAgo(iso: string): string {
  if (!iso) return "";
  const diffMs = Date.now() - new Date(iso).getTime();
  const days = Math.floor(diffMs / 86_400_000);
  if (days < 1) return "today";
  if (days === 1) return "yesterday";
  if (days < 30) return `${days}d ago`;
  const months = Math.floor(days / 30);
  if (months < 12) return `${months}mo ago`;
  return `${Math.floor(months / 12)}y ago`;
}

export async function GitHubActivity() {
  const repos = await getRecentActivity();
  if (repos.length === 0) return null;

  return (
    <section id="github" data-build-section="GitHub" className="scroll-mt-20 border-t border-[var(--color-border)] py-24 sm:py-32">
      <div className="mx-auto max-w-[92rem] px-4 sm:px-8">
        <SectionHeading
          kicker="Live from GitHub · @Lasal0425"
          line1="Fresh off"
          line2="the commit."
          intro="Pulled from the GitHub API and refreshed hourly — whatever I pushed most recently."
        />
        <ul className="mt-14 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {repos.map((repo, i) => (
            <li key={repo.name} data-build="block" data-label={`repo · ${repo.name}`}>
              <a
                href={repo.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex h-full flex-col rounded-2xl border border-[var(--color-border)] bg-[var(--color-bg-raised)] p-5 transition-colors hover:border-[var(--color-accent)]/60 focus-visible:outline focus-visible:outline-2 focus-visible:outline-[var(--color-accent)]"
              >
                <span className="flex items-center justify-between font-mono text-[0.6rem] uppercase tracking-[0.18em] text-[var(--color-fg-muted)]">
                  <span>
                    {String(i + 1).padStart(2, "0")} {repo.language ? `· ${repo.language}` : ""}
                  </span>
                  <ArrowUpRight size={16} aria-hidden="true" className="text-[var(--color-fg)] transition-colors group-hover:text-[var(--color-accent)]" />
                </span>
                <span className="mt-4 break-words text-lg font-medium text-[var(--color-fg)]">{repo.name}</span>
                {repo.description && (
                  <span className="mt-2 line-clamp-2 text-sm text-[var(--color-fg-muted)]">{repo.description}</span>
                )}
                <span className="mt-auto flex gap-3 pt-5 font-mono text-[0.62rem] uppercase tracking-[0.14em] text-[var(--color-fg-muted)]">
                  {repo.stars > 0 && <span>★ {repo.stars}</span>}
                  {repo.pushedAt && <span>pushed {timeAgo(repo.pushedAt)}</span>}
                </span>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
