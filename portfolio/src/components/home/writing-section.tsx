import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { getWritingPosts } from "@/lib/writing";
import { SectionHeading } from "./section-heading";

export async function WritingSection() {
  const posts = (await getWritingPosts()).sort((a, b) => b.publishedAt.localeCompare(a.publishedAt));

  return (
    <section id="writing" data-build-section="Writing" className="scroll-mt-20 border-t border-[var(--color-border)] py-24 sm:py-32">
      <div className="mx-auto max-w-[92rem] px-4 sm:px-8">
        <SectionHeading
          kicker="Writing"
          line1="Notes from"
          line2="the build."
          intro="Engineering write-ups and the occasional personal one — originals stay where they were published."
        />

        <ul className="mt-14">
          {posts.map((post) => {
            const external = post.source !== "site";
            const date = new Date(post.publishedAt).toLocaleDateString("en-US", {
              year: "numeric",
              month: "short",
              day: "numeric",
            });
            const inner = (
              <>
                <span className="font-mono text-[0.62rem] uppercase tracking-[0.18em] text-[var(--color-accent)]">
                  {post.kind}
                </span>
                <span className="text-[1.05rem] font-medium leading-snug text-[var(--color-fg)] transition-colors group-hover:text-[var(--color-accent)] sm:text-[1.3rem]">
                  {post.title}
                </span>
                <span className="flex items-center gap-3 font-mono text-[0.62rem] uppercase tracking-[0.14em] text-[var(--color-fg-muted)] sm:justify-end">
                  {post.source} · {date}
                  {post.readTimeMinutes ? ` · ${post.readTimeMinutes} min` : ""}
                  <ArrowUpRight
                    size={18}
                    aria-hidden="true"
                    className="text-[var(--color-fg)] transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-[var(--color-accent)]"
                  />
                </span>
              </>
            );
            const cls =
              "group grid grid-cols-1 gap-2 border-t border-[var(--color-border)] py-6 sm:grid-cols-[7rem_minmax(0,1fr)_auto] sm:items-center sm:gap-8 focus-visible:outline focus-visible:outline-2 focus-visible:outline-[var(--color-accent)]";
            return (
              <li key={post.slug} data-build="block" data-label={`post · ${post.source}`}>
                {external ? (
                  <a href={post.url} target="_blank" rel="noopener noreferrer" className={cls}>
                    {inner}
                  </a>
                ) : (
                  <Link href={post.url} className={cls}>
                    {inner}
                  </Link>
                )}
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
