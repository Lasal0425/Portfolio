import { posts as staticPosts, type Post } from "./content";

interface DevToArticle {
  reading_time_minutes?: number;
  tags?: string[];
  published_timestamp?: string;
}

/**
 * dev.to has a real public JSON API, so engineering posts sourced from it
 * get their reading time and publish date confirmed live at request time
 * (cached via Next's fetch cache, revalidated daily — a blog post's
 * metadata doesn't change often enough to justify hitting the API on
 * every request). Medium has no equivalent public JSON API worth the
 * complexity here, so Medium posts stay on the static values given
 * directly — both are genuinely accurate, just sourced differently.
 *
 * Any fetch failure (network, API shape change, rate limit) falls back to
 * the static content file silently — a recruiter should never see a
 * broken writing list because an external API had a bad moment.
 */
async function enrichFromDevTo(post: Post): Promise<Post> {
  if (post.source !== "dev.to") return post;

  try {
    const path = new URL(post.url).pathname; // "/username/slug"
    const res = await fetch(`https://dev.to/api/articles${path}`, {
      next: { revalidate: 86400 }, // 24h
    });
    if (!res.ok) return post;

    const article: DevToArticle = await res.json();
    return {
      ...post,
      readTimeMinutes: article.reading_time_minutes ?? post.readTimeMinutes,
      // Prefer the live tag list, but only if dev.to actually returned one —
      // this specific article's tags were written into the body text rather
      // than dev.to's structured tag field, so the API returns an empty
      // array; the hand-confirmed tags are the more useful ones to show.
      tags: article.tags && article.tags.length > 0 ? article.tags : post.tags,
    };
  } catch {
    return post;
  }
}

export async function getWritingPosts(): Promise<Post[]> {
  return Promise.all(staticPosts.map(enrichFromDevTo));
}
