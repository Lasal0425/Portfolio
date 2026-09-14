import { profile, timeline, publishedProjects, posts } from "@/lib/content";

/**
 * Placeholder home page — Phase 1 scope is scaffold + tokens + content
 * schema, not the real hero. This exists to prove the pipeline end to end
 * (content -> schema -> render) and to smoke-test the token layer. The
 * actual "Latent Space" hero and node-field visualization land in Phase 2.
 */
export default function Home() {
  const roleCount = timeline.reduce((n, org) => n + org.roles.length, 0);

  return (
    <main className="mx-auto flex min-h-screen max-w-2xl flex-col justify-center gap-6 px-6 py-24">
      <p className="font-mono text-sm text-[var(--color-fg-muted)]">
        phase 1 — scaffold
      </p>
      <h1 className="text-3xl font-semibold text-[var(--color-fg)]">
        {profile.name}
      </h1>
      <p className="max-w-md text-[var(--color-fg-muted)]">{profile.tagline}</p>
      <dl className="grid grid-cols-2 gap-4 text-sm">
        <div className="rounded-md border border-[var(--color-border)] bg-[var(--color-bg-raised)] p-4">
          <dt className="text-[var(--color-fg-muted)]">Timeline entries</dt>
          <dd className="text-[var(--color-accent)]">{roleCount} roles loaded</dd>
        </div>
        <div className="rounded-md border border-[var(--color-border)] bg-[var(--color-bg-raised)] p-4">
          <dt className="text-[var(--color-fg-muted)]">Content status</dt>
          <dd className="text-[var(--color-edge)]">
            {publishedProjects.length} of {publishedProjects.length + 2} projects
            published, {posts.length} posts
          </dd>
        </div>
      </dl>
      <p className="text-xs text-[var(--color-fg-muted)]">
        Real hero, node-field visualization, and navigation arrive in Phase 2.
      </p>
    </main>
  );
}
