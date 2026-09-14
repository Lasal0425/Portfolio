import { profile as rawProfile } from "../../content/profile";
import { timeline as rawTimeline } from "../../content/timeline";
import { projects as rawProjects } from "../../content/projects";
import { posts as rawPosts } from "../../content/posts";
import {
  profileSchema,
  organisationSchema,
  projectSchema,
  postSchema,
  type Organisation,
  type Project,
  type Post,
  type Role,
} from "../../content/schema";
import { z } from "zod";

export type { Organisation, Project, Post, Role };

/**
 * Every content file is parsed against its Zod schema here, once, at import
 * time. A malformed entry (typo'd enum value, missing required field) fails
 * loudly instead of shipping — this is the enforcement half of "add a role
 * by editing one file, never a component."
 */

function parseOrThrow<T>(schema: z.ZodType<T>, data: unknown, label: string): T {
  const result = schema.safeParse(data);
  if (!result.success) {
    throw new Error(
      `content/${label} failed schema validation:\n${result.error.message}`,
    );
  }
  return result.data;
}

export const profile = parseOrThrow(profileSchema, rawProfile, "profile.ts");

export const timeline: Organisation[] = rawTimeline.map((org, i) =>
  parseOrThrow(organisationSchema, org, `timeline.ts[${i}]`),
);

export const projects: Project[] = rawProjects.map((p, i) =>
  parseOrThrow(projectSchema, p, `projects.ts[${i}]`),
);

export const posts: Post[] = rawPosts.map((p, i) =>
  parseOrThrow(postSchema, p, `posts.ts[${i}]`),
);

/** Only projects with real content are ever shown publicly. */
export const publishedProjects = projects.filter((p) => p.status === "ready");

/** Posts split by kind for the two-track writing section (brief §7). */
export const engineeringPosts = posts.filter((p) => p.kind === "engineering");
export const personalPosts = posts.filter((p) => p.kind === "personal");

/** Flattened, featured-first role list — the engineering track shown by
 * default before the "+N more roles" disclosure. */
export function featuredRoles(org: Organisation) {
  return org.roles.filter((r) => r.featured);
}
export function collapsedRoles(org: Organisation) {
  return org.roles.filter((r) => !r.featured);
}
