import Link from "next/link";
import { buildSiteGraph, type SiteNode } from "@/lib/graph";

const KIND_COLOR: Record<SiteNode["kind"], string> = {
  home: "var(--color-accent)",
  project: "var(--color-edge)",
  organisation: "var(--color-fg-muted)",
  post: "var(--color-fg-muted)",
};

function pct(v: number) {
  // map -1..1 to 8%..92% so nodes never touch the container edge
  return `${50 + v * 42}%`;
}

/**
 * The site's core visual device: every project, organisation, and post is a
 * real node positioned by src/lib/graph.ts. Nodes are real <a>/<Link>
 * elements — this is a navigable map, not a decorative canvas — so it works
 * with no JavaScript, is fully keyboard-reachable, and reads correctly to a
 * screen reader as an ordered list of links.
 *
 * `currentId` marks the node for the page you're currently on (defaults to
 * "home"); that node renders as the "you are here" marker instead of a link.
 */
export function NodeField({ currentId = "home" }: { currentId?: string }) {
  const { nodes, edges } = buildSiteGraph();

  return (
    <div
      className="relative mx-auto aspect-square w-full max-w-[280px] sm:max-w-[380px] md:max-w-[520px]"
      role="group"
      aria-label="Site map — projects, roles, and writing, arranged by kind"
    >
      <svg
        viewBox="0 0 100 100"
        className="pointer-events-none absolute inset-0 h-full w-full"
        aria-hidden="true"
      >
        {edges.map((edge, i) => {
          const from = nodes.find((n) => n.id === edge.from)!;
          const to = nodes.find((n) => n.id === edge.to)!;
          const isReference = edge.kind === "reference";
          return (
            <line
              key={i}
              x1={50 + from.x * 42}
              y1={50 + from.y * 42}
              x2={50 + to.x * 42}
              y2={50 + to.y * 42}
              stroke={isReference ? "var(--color-edge)" : "var(--color-border)"}
              strokeWidth={isReference ? 0.5 : 0.3}
              opacity={isReference ? 0.8 : 0.5}
            />
          );
        })}
      </svg>

      <ol className="contents list-none">
        {nodes.map((node) => {
          const isCurrent = node.id === currentId;
          const dotSize = node.kind === "home" ? 14 : 9;

          const content = (
            <>
              <span
                aria-hidden="true"
                className="block rounded-full ring-2 ring-offset-2 ring-offset-[var(--color-bg)] transition-transform group-hover:scale-125 group-focus-visible:scale-125"
                style={{
                  width: dotSize,
                  height: dotSize,
                  background: KIND_COLOR[node.kind],
                  ["--tw-ring-color" as string]: isCurrent
                    ? "var(--color-accent)"
                    : "transparent",
                }}
              />
              <span className="mt-1.5 line-clamp-2 w-20 font-mono text-[0.6rem] leading-tight text-[var(--color-fg-muted)] group-hover:text-[var(--color-fg)] sm:w-24 sm:text-[0.65rem]">
                {node.label}
                {node.sublabel ? (
                  <span className="hidden opacity-60 sm:inline"> · {node.sublabel}</span>
                ) : null}
              </span>
            </>
          );

          // Positioning + centering live on the <li> (the actual absolutely
          // positioned box); the link inside is a plain flex container so
          // it doesn't fight its parent for placement.
          const liClass =
            "absolute flex -translate-x-1/2 -translate-y-1/2 flex-col items-center text-center";
          const linkClass = "group flex flex-col items-center text-center focus:outline-none";
          const style = { left: pct(node.x), top: pct(node.y) };

          if (isCurrent) {
            return (
              <li
                key={node.id}
                style={style}
                className={`${liClass} group cursor-default`}
                aria-current="page"
              >
                {content}
              </li>
            );
          }

          if (node.external) {
            return (
              <li key={node.id} style={style} className={liClass}>
                <a
                  href={node.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={linkClass}
                  aria-label={`${node.label} (opens ${node.sublabel})`}
                >
                  {content}
                </a>
              </li>
            );
          }

          return (
            <li key={node.id} style={style} className={liClass}>
              <Link href={node.href} className={linkClass}>
                {content}
              </Link>
            </li>
          );
        })}
      </ol>
    </div>
  );
}
