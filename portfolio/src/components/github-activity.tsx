import { getRecentActivity } from "@/lib/github";

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
    <section className="mx-auto max-w-5xl border-t border-[var(--color-border)] px-4 py-12 sm:px-6">
      <div className="flex items-baseline justify-between">
        <h2 className="text-sm font-medium text-[var(--color-fg-muted)]">Recent GitHub activity</h2>
        <a
          href="https://github.com/Lasal0425"
          target="_blank"
          rel="noopener noreferrer"
          className="text-xs text-[var(--color-fg-muted)] underline underline-offset-2 hover:text-[var(--color-fg)]"
        >
          @Lasal0425
        </a>
      </div>
      <ul className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2 md:grid-cols-3">
        {repos.map((repo) => (
          <li key={repo.name} className="rounded-lg border border-[var(--color-border)] p-4">
            <a
              href={repo.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm font-medium text-[var(--color-fg)] underline-offset-2 hover:underline"
            >
              {repo.name}
            </a>
            {repo.description && (
              <p className="mt-1.5 line-clamp-2 text-xs text-[var(--color-fg-muted)]">
                {repo.description}
              </p>
            )}
            <p className="mt-2 flex items-center gap-2 text-xs text-[var(--color-fg-muted)]">
              {repo.language && <span>{repo.language}</span>}
              {repo.stars > 0 && <span>★ {repo.stars}</span>}
              {repo.pushedAt && <span>{timeAgo(repo.pushedAt)}</span>}
            </p>
          </li>
        ))}
      </ul>
    </section>
  );
}
