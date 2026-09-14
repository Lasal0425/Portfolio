interface FlowStage {
  label: string;
  note?: string;
}

interface FlowRow {
  title?: string;
  stages: FlowStage[];
}

const BOX_W = 148;
const BOX_H = 56;
const GAP = 44;
const ROW_H = 110;
const LABEL_COL = 96;

/**
 * A real, hand-laid-out pipeline diagram — not clipart, not a screenshot of
 * a whiteboard. Each row is a sequence of labeled stages connected by
 * arrows; used in the project case studies to show actual data flow
 * (e.g. ingestion vs. query pipelines) rather than a decorative graphic.
 *
 * `rows` is a JSON string, not a JS array literal: next-mdx-remote's
 * serialize pipeline (built for the old server-serialize/client-hydrate
 * pattern) doesn't reliably carry an inline object/array literal used as a
 * JSX prop through to render — it comes through as undefined. A plain
 * string is unaffected, so the case-study .mdx files pass one and this
 * parses it.
 */
export function ArchitectureDiagram({ rows: rowsJson }: { rows: string }) {
  const rows: FlowRow[] = JSON.parse(rowsJson);
  const maxStages = Math.max(...rows.map((r) => r.stages.length));
  const width = LABEL_COL + maxStages * BOX_W + (maxStages - 1) * GAP + 20;
  const height = rows.length * ROW_H;

  return (
    <div className="my-8 overflow-x-auto rounded-lg border border-[var(--color-border)] bg-[var(--color-bg-raised)] p-4">
      <svg
        viewBox={`0 0 ${width} ${height}`}
        width={width}
        height={height}
        role="img"
        aria-label={rows
          .map((r) => `${r.title ? r.title + ": " : ""}${r.stages.map((s) => s.label).join(" to ")}`)
          .join(". ")}
        className="max-w-full"
      >
        <defs>
          <marker
            id="arrow"
            viewBox="0 0 10 10"
            refX="9"
            refY="5"
            markerWidth="7"
            markerHeight="7"
            orient="auto-start-reverse"
          >
            <path d="M0,0 L10,5 L0,10 z" fill="var(--color-fg-muted)" />
          </marker>
        </defs>

        {rows.map((row, rowIndex) => {
          const y = rowIndex * ROW_H + ROW_H / 2 - BOX_H / 2;
          return (
            <g key={rowIndex}>
              {row.title && (
                <text
                  x={0}
                  y={y + BOX_H / 2}
                  dominantBaseline="middle"
                  className="fill-[var(--color-fg-muted)]"
                  fontSize="12"
                  fontFamily="var(--font-mono)"
                >
                  {row.title}
                </text>
              )}
              {row.stages.map((stage, i) => {
                const x = LABEL_COL + i * (BOX_W + GAP);
                return (
                  <g key={i}>
                    {i > 0 && (
                      <line
                        x1={x - GAP + 4}
                        y1={y + BOX_H / 2}
                        x2={x - 4}
                        y2={y + BOX_H / 2}
                        stroke="var(--color-fg-muted)"
                        strokeWidth="1.5"
                        markerEnd="url(#arrow)"
                      />
                    )}
                    <rect
                      x={x}
                      y={y}
                      width={BOX_W}
                      height={BOX_H}
                      rx="6"
                      fill="var(--color-bg)"
                      stroke="var(--color-border)"
                    />
                    <text
                      x={x + BOX_W / 2}
                      y={y + BOX_H / 2 - (stage.note ? 7 : 0)}
                      textAnchor="middle"
                      dominantBaseline="middle"
                      className="fill-[var(--color-fg)]"
                      fontSize="13"
                      fontWeight="500"
                    >
                      {stage.label}
                    </text>
                    {stage.note && (
                      <text
                        x={x + BOX_W / 2}
                        y={y + BOX_H / 2 + 14}
                        textAnchor="middle"
                        dominantBaseline="middle"
                        className="fill-[var(--color-fg-muted)]"
                        fontSize="10.5"
                        fontFamily="var(--font-mono)"
                      >
                        {stage.note}
                      </text>
                    )}
                  </g>
                );
              })}
            </g>
          );
        })}
      </svg>
    </div>
  );
}
