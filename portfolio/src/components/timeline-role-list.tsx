"use client";

import { useState } from "react";
import Link from "next/link";
import type { Role } from "@/lib/content";

function RoleItemContent({ role }: { role: Role }) {
  return (
    <>
      <span
        aria-hidden="true"
        className="absolute -left-[1.4rem] top-1.5 h-2 w-2 rounded-full"
        style={{ background: role.featured ? "var(--color-accent)" : "var(--color-border)" }}
      />
      <p className="text-sm font-medium text-[var(--color-fg)]">{role.title}</p>
      <p className="text-xs text-[var(--color-fg-muted)]">
        {role.startDate} – {role.endDate}
        {role.location ? ` · ${role.location}` : ""}
        {role.workMode ? ` · ${role.workMode}` : ""}
      </p>
      {role.note && (
        <p className="mt-1 text-xs italic text-[var(--color-fg-muted)]">{role.note}</p>
      )}
      {role.bullets.length > 0 && (
        <ul className="mt-2 list-disc pl-4 text-sm text-[var(--color-fg)]">
          {role.bullets.map((b, i) => (
            <li key={i}>{b}</li>
          ))}
        </ul>
      )}
      {role.projectSlug && (
        <Link
          href={`/projects/${role.projectSlug}`}
          className="mt-1 inline-block text-xs text-[var(--color-accent)] underline underline-offset-2"
        >
          related project
        </Link>
      )}
    </>
  );
}

function RoleItem({ role }: { role: Role }) {
  return (
    <li className="relative">
      <RoleItemContent role={role} />
    </li>
  );
}

/**
 * Progressive disclosure, not omission (brief §3): the engineering track
 * shows by default, everything else is one real click away and still
 * fully present in the DOM (a screen reader / find-in-page / print view
 * sees all of it — this only affects visibility, not existence).
 */
export function TimelineRoleList({
  featured,
  collapsed,
}: {
  featured: Role[];
  collapsed: Role[];
}) {
  const [expanded, setExpanded] = useState(false);

  return (
    <ol className="mt-6 flex flex-col gap-6 border-l border-[var(--color-border)] pl-5">
      {featured.map((role) => (
        <RoleItem key={role.id} role={role} />
      ))}

      {collapsed.length > 0 && (
        <>
          {/* Each collapsed role stays a direct <li> child of the <ol> (a
              wrapping <div> here would be invalid list markup, even with
              display:contents) — individually hidden instead. */}
          {collapsed.map((role) => (
            <li key={role.id} hidden={!expanded} className="relative">
              <RoleItemContent role={role} />
            </li>
          ))}
          <li className="relative list-none">
            <button
              type="button"
              onClick={() => setExpanded((v) => !v)}
              aria-expanded={expanded}
              className="text-xs text-[var(--color-fg-muted)] underline underline-offset-2 hover:text-[var(--color-fg)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-accent)]"
            >
              {expanded ? "Show fewer roles" : `+${collapsed.length} more roles`}
            </button>
          </li>
        </>
      )}
    </ol>
  );
}
