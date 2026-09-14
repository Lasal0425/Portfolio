import type { Metadata } from "next";
import Link from "next/link";
import { getWritingPosts } from "@/lib/writing";
import type { Post } from "@/lib/content";

export const metadata: Metadata = { title: "Writing" };

function PostList({ posts }: { posts: Post[] }) {
  return (
    <ul className="flex flex-col gap-4">
      {posts.map((post) => {
        const isExternal = post.source !== "site";
        const titleEl = isExternal ? (
          <a
            href={post.url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm font-medium text-[var(--color-fg)] underline-offset-2 hover:underline"
          >
            {post.title}
          </a>
        ) : (
          <Link
            href={post.url}
            className="text-sm font-medium text-[var(--color-fg)] underline-offset-2 hover:underline"
          >
            {post.title}
          </Link>
        );

        return (
          <li key={post.slug} className="rounded-lg border border-[var(--color-border)] p-4">
            {titleEl}
            <p className="mt-1.5 text-xs text-[var(--color-fg-muted)]">
              {post.source} ·{" "}
              {new Date(post.publishedAt).toLocaleDateString("en-US", {
                year: "numeric",
                month: "short",
                day: "numeric",
              })}
              {post.readTimeMinutes ? ` · ${post.readTimeMinutes} min read` : ""}
            </p>
            {post.tags.length > 0 && (
              <div className="mt-2 flex flex-wrap gap-1.5">
                {post.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full border border-[var(--color-border)] px-2 py-0.5 text-xs text-[var(--color-fg-muted)]"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}
          </li>
        );
      })}
    </ul>
  );
}

/**
 * Split by kind per brief §7 — the WSO2/Choreo platform write-up and a
 * personal-finance post are different animals and shouldn't share a feed.
 * Engineering posts sourced from dev.to get their reading time and tags
 * confirmed live (src/lib/writing.ts); Medium and site posts use their
 * given metadata directly.
 */
export default async function WritingPage() {
  const posts = await getWritingPosts();
  const engineeringPosts = posts.filter((p) => p.kind === "engineering");
  const personalPosts = posts.filter((p) => p.kind === "personal");

  return (
    <main className="mx-auto max-w-2xl px-4 py-16 sm:px-6">
      <h1 className="text-2xl font-semibold text-[var(--color-fg)]">Writing</h1>
      <p className="mt-2 max-w-lg text-sm text-[var(--color-fg-muted)]">
        Every post links out to where it was actually published.
      </p>

      {engineeringPosts.length > 0 && (
        <section className="mt-10">
          <h2 className="mb-4 text-sm font-medium text-[var(--color-fg-muted)]">Engineering</h2>
          <PostList posts={engineeringPosts} />
        </section>
      )}

      {personalPosts.length > 0 && (
        <section className="mt-10">
          <h2 className="mb-4 text-sm font-medium text-[var(--color-fg-muted)]">Personal</h2>
          <PostList posts={personalPosts} />
        </section>
      )}
    </main>
  );
}
