import type { MDXComponents } from "mdx/types";
import type { ComponentPropsWithoutRef } from "react";
import { ArchitectureDiagram } from "@/components/architecture-diagram";

/**
 * Passed to <MDXRemote components={...}> (src/app/projects/[slug]/page.tsx)
 * — case study content isn't file-based routing, so this is a plain object,
 * not the @next/mdx special-file convention. Case-study prose gets a
 * readable type scale; ArchitectureDiagram is the one component case
 * studies can drop into their MDX body.
 *
 * `{...props}` is spread BEFORE the className on every tag, on purpose: if
 * MDX content ever passes its own className (accidentally or otherwise) it
 * can't silently blow away the base typography, since these are the last
 * (winning) attribute in each element.
 */
export const mdxComponents: MDXComponents = {
  h2: (props: ComponentPropsWithoutRef<"h2">) => (
    <h2 {...props} className="mt-10 mb-3 text-xl font-semibold text-[var(--color-fg)]" />
  ),
  h3: (props: ComponentPropsWithoutRef<"h3">) => (
    <h3 {...props} className="mt-8 mb-2 text-base font-semibold text-[var(--color-fg)]" />
  ),
  p: (props: ComponentPropsWithoutRef<"p">) => (
    <p {...props} className="mb-4 leading-relaxed text-[var(--color-fg)]" />
  ),
  ul: (props: ComponentPropsWithoutRef<"ul">) => (
    <ul {...props} className="mb-4 list-disc pl-5 text-[var(--color-fg)]" />
  ),
  ol: (props: ComponentPropsWithoutRef<"ol">) => (
    <ol {...props} className="mb-4 list-decimal pl-5 text-[var(--color-fg)]" />
  ),
  li: (props: ComponentPropsWithoutRef<"li">) => <li {...props} className="mb-1.5" />,
  a: (props: ComponentPropsWithoutRef<"a">) => (
    <a {...props} className="underline underline-offset-2 hover:text-[var(--color-accent)]" />
  ),
  code: (props: ComponentPropsWithoutRef<"code">) => (
    <code
      {...props}
      className="rounded bg-[var(--color-bg-raised)] px-1.5 py-0.5 font-mono text-[0.85em]"
    />
  ),
  blockquote: (props: ComponentPropsWithoutRef<"blockquote">) => (
    <blockquote
      {...props}
      className="my-4 border-l-2 border-[var(--color-border)] pl-4 italic text-[var(--color-fg-muted)]"
    />
  ),
  ArchitectureDiagram,
};
