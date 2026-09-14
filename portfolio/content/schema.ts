import { z } from "zod";

/**
 * Every fact about Lasal that appears on the site is typed here and lives in
 * a sibling data file (profile.ts, timeline.ts, projects.ts, posts.ts).
 * Add a role, a project, or a post by editing one of those files — never a
 * component. `src/lib/content.ts` parses each file against these schemas at
 * import time, so a malformed entry fails the build instead of shipping.
 */

// ---------------------------------------------------------------------------
// Profile
// ---------------------------------------------------------------------------

export const linkSchema = z.object({
  label: z.string(),
  url: z.string().url(),
});

export const profileSchema = z.object({
  name: z.string(),
  role: z.string(), // e.g. "AI Engineer"
  // The one-line, phone-first hero claim. Specific enough to exclude most
  // CS students — see brief §7. TODO(lasal) until the real one is written.
  tagline: z.string(),
  location: z.string(),
  email: z.string().email(),
  links: z.object({
    github: z.string().url(),
    linkedin: z.string().url(),
    devto: z.string().url(),
    medium: z.string().url(),
  }),
  resumeUrl: z.string(), // path under /public
  headshotUrl: z.string().optional(), // path under /public
  education: z
    .object({
      institution: z.string(),
      logoUrl: z.string().optional(), // path under /public
      // Degree programmes run jointly with a foreign university (common for
      // Sri Lankan private higher-ed) are named here rather than invented
      // as a second "employer" — e.g. "University of Westminster".
      affiliatedWith: z
        .object({ name: z.string(), logoUrl: z.string().optional() })
        .optional(),
      // TODO(lasal): exact degree title and start/end dates — only "4th
      // year undergraduate" has been confirmed so far.
      degree: z.string().optional(),
      yearOfStudy: z.string().optional(),
      startDate: z.string().optional(),
      endDate: z.string().optional(),
      show: z.boolean().default(true),
    })
    .optional(),
});

export type Profile = z.infer<typeof profileSchema>;

// ---------------------------------------------------------------------------
// Timeline — grouped by organisation, each with nested roles.
// ---------------------------------------------------------------------------

export const roleTrackSchema = z.enum([
  "engineering",
  "leadership",
  "design",
  "member",
]);

export const roleSchema = z.object({
  id: z.string(),
  title: z.string(),
  employmentType: z.enum(["Full-time", "Part-time"]).optional(),
  startDate: z.string(), // "Jul 2025" — verbatim from source, not reformatted
  endDate: z.string(), // "Dec 2025" | "Present"
  location: z.string().optional(),
  workMode: z.enum(["Remote", "Hybrid", "On-site"]).optional(),
  track: roleTrackSchema,
  // Surfaced by default vs. collapsed behind "+N more roles" (brief §3).
  featured: z.boolean().default(false),
  // Skills explicitly tagged on the source role (e.g. LinkedIn skill tags).
  skills: z.array(z.string()).default([]),
  // Free-text context that doesn't fit another field (e.g. board/term info).
  note: z.string().optional(),
  // What was actually built/shipped. Empty until Lasal supplies bullets —
  // an honest title + dates beats an invented accomplishment (brief §3).
  bullets: z.array(z.string()).default([]),
  // Link to a /projects/[slug] entry when the role produced a real project.
  projectSlug: z.string().optional(),
});

export const organisationSchema = z.object({
  id: z.string(),
  name: z.string(),
  location: z.string().optional(),
  logoUrl: z.string().optional(), // path under /public
  // Verbatim total duration string from the source (e.g. "1 yr 3 mos total"),
  // not recomputed — overlapping concurrent roles make computing this from
  // the individual role dates unreliable.
  totalDuration: z.string().optional(),
  roles: z.array(roleSchema),
});

export type Role = z.infer<typeof roleSchema>;
export type Organisation = z.infer<typeof organisationSchema>;

// ---------------------------------------------------------------------------
// Projects — case studies, not cards.
// ---------------------------------------------------------------------------

export const projectStatusSchema = z.enum(["ready", "draft"]);

export const projectSchema = z.object({
  slug: z.string(),
  title: z.string(),
  summary: z.string(), // one-line, for list views
  status: projectStatusSchema, // "draft" gates it out of the public list
  repoUrl: z.string().url().optional(),
  liveUrl: z.string().url().optional(),
  stack: z.array(z.string()).default([]),
  // Real numbers only — dataset size, accuracy, latency, users. Omit
  // entirely rather than estimate (brief: never invent metrics).
  metrics: z
    .array(z.object({ label: z.string(), value: z.string() }))
    .default([]),
  // Was this a fork? Say so plainly (brief §3 — natcon-website).
  forkOf: z.string().optional(),
  // MDX case-study body lives at content/projects/<slug>.mdx once written;
  // this flag is set once that file exists so the route can render it.
  hasCaseStudy: z.boolean().default(false),
});

export type Project = z.infer<typeof projectSchema>;

// ---------------------------------------------------------------------------
// Writing — posts split by kind, metadata fetched at build time and linked
// out rather than mirrored (brief §7).
// ---------------------------------------------------------------------------

export const postKindSchema = z.enum(["engineering", "personal"]);
export const postSourceSchema = z.enum(["dev.to", "medium", "site"]);

export const postSchema = z.object({
  slug: z.string(),
  title: z.string(),
  kind: postKindSchema,
  source: postSourceSchema,
  // External link for dev.to/medium; a relative path (e.g. "/writing/foo")
  // for "site" posts — not .url(), since that would reject the relative
  // form Next's <Link> expects for internal posts.
  url: z.string().min(1),
  publishedAt: z.string(), // ISO date
  readTimeMinutes: z.number().optional(),
  tags: z.array(z.string()).default([]),
});

export type Post = z.infer<typeof postSchema>;
