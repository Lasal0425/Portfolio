import { readFile } from "node:fs/promises";
import path from "node:path";
import { profile } from "../../../content/profile";
import { timeline } from "../../../content/timeline";
import { projects } from "../../../content/projects";
import { posts } from "../../../content/posts";

export interface SourceDocument {
  id: string;
  url: string; // where a citation should link to and scroll/highlight
  title: string;
  text: string;
}

/**
 * Every real fact on the site, gathered into one place the ingest script
 * chunks and embeds. Nothing here is fetched from outside the repo's own
 * content files (and the case-study MDX bodies) — no resume PDF text, no
 * external post content mirrored (brief §7: link out, don't mirror), and
 * deliberately no referee contact information from the resume (two real
 * people's personal phone numbers — not Lasal's to publish into a public,
 * queryable index).
 */
export async function getSourceDocuments(): Promise<SourceDocument[]> {
  const docs: SourceDocument[] = [];

  docs.push({
    id: "profile",
    url: "/",
    title: "Profile",
    text: [
      `${profile.name} — ${profile.role}, based in ${profile.location}.`,
      profile.tagline,
      profile.education?.show
        ? `Education: ${profile.education.degree ?? "degree in progress"} at ${profile.education.institution}${
            profile.education.affiliatedWith ? `, in association with ${profile.education.affiliatedWith.name}` : ""
          }${profile.education.yearOfStudy ? ` (${profile.education.yearOfStudy})` : ""}.`
        : "",
    ]
      .filter(Boolean)
      .join(" "),
  });

  for (const org of timeline) {
    for (const role of org.roles) {
      const parts = [
        `${role.title} at ${org.name}, ${role.startDate} to ${role.endDate}.`,
        role.location ? `Location: ${role.location}.` : "",
        role.note ?? "",
        ...role.bullets,
      ].filter(Boolean);
      docs.push({
        id: `timeline-${role.id}`,
        url: `/timeline#${org.id}`,
        title: `${role.title} — ${org.name}`,
        text: parts.join(" "),
      });
    }
  }

  for (const project of projects) {
    let caseStudyText = "";
    try {
      const file = path.join(process.cwd(), "content", "projects", `${project.slug}.mdx`);
      const raw = await readFile(file, "utf-8");
      // Strip JSX/MDX component tags and markdown syntax roughly — good
      // enough for embeddings, doesn't need to be pretty.
      caseStudyText = raw
        .replace(/<[^>]+>/g, " ")
        .replace(/[#>*_`]/g, " ")
        .replace(/\s+/g, " ")
        .trim();
    } catch {
      // no case study yet — fine, summary alone still gets indexed below
    }

    const metricsText = project.metrics.map((m) => `${m.label}: ${m.value}`).join(". ");
    docs.push({
      id: `project-${project.slug}`,
      url: `/projects/${project.slug}`,
      title: project.title,
      text: [project.summary, metricsText, caseStudyText].filter(Boolean).join(" "),
    });
  }

  for (const post of posts) {
    docs.push({
      id: `post-${post.slug}`,
      url: post.source === "site" ? post.url : `/writing`,
      title: post.title,
      text: `${post.title} — a ${post.kind} post published on ${post.source}${
        post.tags.length ? `, tagged ${post.tags.join(", ")}` : ""
      }.`,
    });
  }

  return docs;
}
