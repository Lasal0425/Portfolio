import type { Project } from "./schema";

/**
 * TODO(lasal): this list is a placeholder shape, not a real project list.
 * Brief §9 question 1 is still open — which 4-6 projects to feature, in
 * what order, and whether any has a real number (dataset size, accuracy,
 * latency, users). Both entries below are stubs: `status: "draft"` keeps
 * them out of the public /projects list until they're filled in, so
 * nothing invented ships.
 *
 * `knowledge_assistant` is named directly in the brief as the project to
 * lead with — no description or architecture detail has been given yet.
 *
 * `natcon-website` is authorized in the brief (§2, §3): a real delivery
 * project, explicitly a fork of yashbim/nlds-website. I'll pull the actual
 * diff from GitHub myself when writing this case study (Phase 4) rather
 * than ask Lasal to describe it — that's independently verifiable.
 */
export const projects: Project[] = [
  {
    slug: "knowledge-assistant",
    title: "knowledge_assistant",
    summary: "TODO(lasal): one-line summary — what does this system do?",
    status: "draft",
    stack: [],
    metrics: [],
    hasCaseStudy: false,
  },
  {
    slug: "natcon-website",
    title: "NatCon Website",
    summary: "TODO(lasal): one-line summary once the GitHub diff is reviewed.",
    status: "draft",
    forkOf: "yashbim/nlds-website",
    stack: [],
    metrics: [],
    hasCaseStudy: false,
  },
];
