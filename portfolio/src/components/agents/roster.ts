/**
 * The twelve agents that assemble the home page. Purely presentational —
 * names describe the kind of work each one is shown doing, colors are the
 * cursor/tag color on the overlay canvas.
 */
export interface AgentProfile {
  name: string;
  color: string;
}

export const ROSTER: AgentProfile[] = [
  { name: "Planner", color: "#5b8cff" },
  { name: "Typesetter", color: "#ffd23f" },
  { name: "Copywriter", color: "#3ddc84" },
  { name: "Architect", color: "#ff6ea9" },
  { name: "Pixel", color: "#a78bfa" },
  { name: "Coder", color: "#2dd4bf" },
  { name: "Reviewer", color: "#ff8a3d" },
  { name: "Layout", color: "#38bdf8" },
  { name: "Tester", color: "#b5f23d" },
  { name: "Stylist", color: "#fb7185" },
  { name: "Researcher", color: "#fbbf24" },
  { name: "Deployer", color: "#e879f9" },
];

/** What a build target is — set as `data-build="<kind>"` in the markup. */
export type BuildKind = "title" | "text" | "label" | "block" | "media" | "chip" | "stat";

export const KIND_VERB: Record<BuildKind, { doing: string; done: string; noun: string }> = {
  title: { doing: "setting type", done: "set", noun: "heading" },
  text: { doing: "writing", done: "wrote", noun: "copy" },
  label: { doing: "labelling", done: "labelled", noun: "label" },
  block: { doing: "laying out", done: "laid out", noun: "card" },
  media: { doing: "rendering", done: "rendered", noun: "image" },
  chip: { doing: "tagging", done: "tagged", noun: "tag" },
  stat: { doing: "computing", done: "computed", noun: "metric" },
};
