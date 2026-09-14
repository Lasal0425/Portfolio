import { profile, timeline, projects, posts } from "./content";

/**
 * Structural layout for the "Latent Space" node field.
 *
 * IMPORTANT: these are NOT real embeddings yet. Phase 6 computes actual
 * vectors for every piece of content as part of the RAG ingest pipeline —
 * at that point this module should read precomputed coordinates (e.g. a
 * UMAP/PCA projection stored alongside the embeddings) instead of the
 * deterministic hash-based placement below. Until then, this gives an
 * honest, real, content-driven graph (every node is a real project, role,
 * or post) arranged by *kind*, not by claimed semantic similarity.
 *
 * The hash is a stand-in for randomness that must stay stable across
 * server and client renders and across rebuilds — Math.random() would
 * cause a hydration mismatch.
 */

export type NodeKind = "home" | "project" | "organisation" | "post";

export interface SiteNode {
  id: string;
  label: string;
  sublabel?: string;
  kind: NodeKind;
  href: string;
  external?: boolean;
  x: number; // -1..1, relative to center
  y: number; // -1..1
}

export interface SiteEdge {
  from: string;
  to: string;
  /** "reference" = a real content cross-link (a role that produced this
   * project); "structural" = just "reachable from home". */
  kind: "structural" | "reference";
}

export interface SiteGraph {
  nodes: SiteNode[];
  edges: SiteEdge[];
}

function hash01(input: string): number {
  let h = 2166136261;
  for (let i = 0; i < input.length; i++) {
    h ^= input.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return (h >>> 0) / 4294967295;
}

const TAU = Math.PI * 2;
const SECTOR_SPAN = TAU / 3;
// Start each sector at -90deg (top) and go clockwise: projects, then
// timeline, then writing.
const SECTORS: Record<Exclude<NodeKind, "home">, number> = {
  project: -Math.PI / 2,
  organisation: -Math.PI / 2 + SECTOR_SPAN,
  post: -Math.PI / 2 + SECTOR_SPAN * 2,
};

function place(id: string, kind: Exclude<NodeKind, "home">, index: number, count: number) {
  const sectorStart = SECTORS[kind];
  const angle = sectorStart + (SECTOR_SPAN * (index + 0.5)) / count;
  const radius = 0.5 + hash01(id) * 0.4; // 0.5..0.9 — enough clearance from
  // the home hub at center that labels don't collide with it
  return { x: Math.cos(angle) * radius, y: Math.sin(angle) * radius };
}

export function buildSiteGraph(): SiteGraph {
  const nodes: SiteNode[] = [
    { id: "home", label: profile.name, kind: "home", href: "/", x: 0, y: 0 },
  ];
  const edges: SiteEdge[] = [];

  projects.forEach((p, i) => {
    const id = `project:${p.slug}`;
    nodes.push({
      id,
      label: p.title,
      sublabel: "project",
      kind: "project",
      href: `/projects/${p.slug}`,
      ...place(id, "project", i, projects.length),
    });
    edges.push({ from: "home", to: id, kind: "structural" });
  });

  timeline.forEach((org, i) => {
    const id = `org:${org.id}`;
    nodes.push({
      id,
      label: org.name,
      sublabel: "role",
      kind: "organisation",
      href: `/#${org.id}`, // home page is a one-pager; /timeline still works standalone
      ...place(id, "organisation", i, timeline.length),
    });
    edges.push({ from: "home", to: id, kind: "structural" });

    // Real content cross-links: a role that produced a featured project.
    for (const role of org.roles) {
      if (role.projectSlug && projects.some((p) => p.slug === role.projectSlug)) {
        edges.push({
          from: id,
          to: `project:${role.projectSlug}`,
          kind: "reference",
        });
      }
    }
  });

  posts.forEach((post, i) => {
    const id = `post:${post.slug}`;
    nodes.push({
      id,
      label: post.title,
      sublabel: post.source,
      kind: "post",
      href: post.url,
      external: true,
      ...place(id, "post", i, posts.length),
    });
    edges.push({ from: "home", to: id, kind: "structural" });
  });

  return { nodes, edges };
}
