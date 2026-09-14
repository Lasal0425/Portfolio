import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { readFile } from "node:fs/promises";
import path from "node:path";
import { posts } from "@/lib/content";
import { renderMDX } from "@/lib/compile-mdx";
import { mdxComponents } from "@/lib/mdx-components";

export function generateStaticParams() {
  return posts.filter((p) => p.source === "site").map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = posts.find((p) => p.slug === slug && p.source === "site");
  return { title: post?.title ?? "Writing" };
}

export default async function SitePostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = posts.find((p) => p.slug === slug && p.source === "site");
  if (!post) notFound();

  const file = path.join(process.cwd(), "content", "posts", `${slug}.mdx`);
  const mdxSource = await readFile(file, "utf-8").catch(() => null);
  if (!mdxSource) notFound();

  return (
    <main className="mx-auto max-w-2xl px-4 py-16 sm:px-6">
      <p className="text-xs text-[var(--color-fg-muted)]">
        {new Date(post.publishedAt).toLocaleDateString("en-US", {
          year: "numeric",
          month: "short",
          day: "numeric",
        })}
        {post.readTimeMinutes ? ` · ${post.readTimeMinutes} min read` : ""}
      </p>
      <h1 className="mt-2 text-2xl font-semibold text-[var(--color-fg)]">{post.title}</h1>
      <div className="mt-8">{await renderMDX(mdxSource, mdxComponents)}</div>
    </main>
  );
}
