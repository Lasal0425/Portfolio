export interface RepoActivity {
  name: string;
  url: string;
  description: string | null;
  language: string | null;
  stars: number;
  pushedAt: string;
}

const GITHUB_USERNAME = "Lasal0425";

// Used only if the live fetch has never succeeded (no cached response to
// serve either) — no live stats, just enough to not show an empty section.
// Deliberately not "github-readme-stats" badge images (brief §7).
const STATIC_FALLBACK: RepoActivity[] = [
  {
    name: "knowledge_assistant",
    url: "https://github.com/Lasal0425/knowledge_assistant",
    description: null,
    language: "Python",
    stars: 0,
    pushedAt: "",
  },
  {
    name: "natcon-website",
    url: "https://github.com/Lasal0425/natcon-website",
    description: null,
    language: "TypeScript",
    stars: 0,
    pushedAt: "",
  },
];

/**
 * Server-only — never called from a client component, so GITHUB_TOKEN
 * (optional; raises the rate limit from 60/hour to 5,000/hour) never
 * reaches the browser. Cached via Next's fetch cache with an hourly
 * revalidate; a failed fetch after a prior success still serves that
 * stale-but-real cached data rather than falling through immediately.
 */
export async function getRecentActivity(limit = 6): Promise<RepoActivity[]> {
  try {
    const headers: Record<string, string> = { Accept: "application/vnd.github+json" };
    if (process.env.GITHUB_TOKEN) {
      headers.Authorization = `Bearer ${process.env.GITHUB_TOKEN}`;
    }

    const res = await fetch(
      `https://api.github.com/users/${GITHUB_USERNAME}/repos?sort=pushed&per_page=${limit}&type=owner`,
      { headers, next: { revalidate: 3600 } },
    );
    if (!res.ok) throw new Error(`GitHub API responded ${res.status}`);

    const repos = (await res.json()) as Array<{
      name: string;
      html_url: string;
      description: string | null;
      language: string | null;
      stargazers_count: number;
      pushed_at: string;
      fork: boolean;
    }>;

    return repos
      .filter((r) => !r.fork)
      .map((r) => ({
        name: r.name,
        url: r.html_url,
        description: r.description,
        language: r.language,
        stars: r.stargazers_count,
        pushedAt: r.pushed_at,
      }));
  } catch (err) {
    console.error("GitHub activity fetch failed, using static fallback:", err);
    return STATIC_FALLBACK;
  }
}
