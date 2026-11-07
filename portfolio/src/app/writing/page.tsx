import type { Metadata } from "next";
import { WritingGroups } from "@/components/writing-groups";

export const metadata: Metadata = { title: "Writing" };

export default function WritingPage() {
  return (
    <main className="mx-auto max-w-2xl px-4 py-16 sm:px-6">
      <h1 className="font-display text-[clamp(2.6rem,7vw,4.5rem)] text-[var(--color-fg)]">Writing</h1>
      <p className="mt-2 max-w-lg text-sm text-[var(--color-fg-muted)]">
        Every post links out to where it was actually published.
      </p>

      <WritingGroups />
    </main>
  );
}
