import type { Metadata } from "next";
import { AskPanel } from "@/components/ask-panel";

export const metadata: Metadata = { title: "Ask about my work" };

export default function AskPage() {
  return (
    <main>
      <AskPanel />
    </main>
  );
}
