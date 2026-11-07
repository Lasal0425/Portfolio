"use client";

import { useState, type ReactNode } from "react";

/**
 * Progressive disclosure, not omission: the extra roles are always in the
 * DOM (find-in-page, screen readers and print see them), only hidden.
 */
export function MoreRoles({ count, children }: { count: number; children: ReactNode }) {
  const [open, setOpen] = useState(false);
  return (
    <>
      <ol hidden={!open}>{children}</ol>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        className="ml-8 mt-1 inline-flex items-center gap-2 rounded-full border border-[var(--color-border-strong)] px-4 py-2 font-mono text-[0.65rem] uppercase tracking-[0.16em] text-[var(--color-fg-muted)] transition-colors hover:border-[var(--color-accent)] hover:text-[var(--color-fg)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-[var(--color-accent)]"
      >
        <span aria-hidden="true" className="text-[var(--color-accent)]">
          {open ? "−" : "+"}
        </span>
        {open ? "Show fewer roles" : `${count} more roles`}
      </button>
    </>
  );
}
