import { evaluate } from "@mdx-js/mdx";
import * as runtime from "react/jsx-runtime";
import type { MDXComponents } from "mdx/types";

/**
 * Compiles and renders an MDX string as a Server Component.
 *
 * next-mdx-remote's serialize() pipeline (built for its older
 * server-serialize/client-hydrate architecture) was tried first, but it
 * silently drops JSX attributes on custom components — every
 * <ArchitectureDiagram rows="..." /> call came through with an empty props
 * object, reproducibly, across all three case studies. @mdx-js/mdx's own
 * evaluate() (which next-mdx-remote itself is built on) doesn't have that
 * problem, so this uses it directly instead.
 */
export async function renderMDX(source: string, components: MDXComponents) {
  const { default: Content } = await evaluate(source, {
    ...runtime,
    development: false,
  });
  return <Content components={components} />;
}
