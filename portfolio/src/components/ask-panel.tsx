"use client";

import { useState, useRef } from "react";
import Link from "next/link";
import { Send } from "lucide-react";

const STARTER_QUESTIONS = [
  "What's the hardest thing he's built?",
  "Does he know vector databases?",
  "What did he do at Nebule?",
];

interface Citation {
  label: string;
  url: string;
}

interface Exchange {
  question: string;
  answer: string;
  citations: Citation[];
  retrievalCount: number | null;
  usedFallback: boolean;
  streaming: boolean;
  error?: string;
  // Set when generation failed after some real tokens had already
  // reached the client — the partial answer above is real and stays
  // visible; this is an honest note, not a replacement for it.
  interrupted?: string;
}

async function streamAsk(
  question: string,
  onEvent: (evt: Record<string, unknown>) => void,
) {
  const res = await fetch("/api/ask", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ question }),
  });

  if (!res.ok || !res.body) {
    const body = await res.json().catch(() => ({}));
    onEvent({ type: "error", message: body.message ?? "Something went wrong." });
    return;
  }

  const reader = res.body.getReader();
  const decoder = new TextDecoder();
  let buffer = "";

  while (true) {
    const { done, value } = await reader.read();
    if (done) break;
    buffer += decoder.decode(value, { stream: true });
    const lines = buffer.split("\n");
    buffer = lines.pop() ?? "";
    for (const line of lines) {
      if (!line.trim()) continue;
      try {
        onEvent(JSON.parse(line));
      } catch {
        // ignore a malformed line rather than breaking the whole stream
      }
    }
  }
}

export function AskPanel() {
  const [input, setInput] = useState("");
  const [exchanges, setExchanges] = useState<Exchange[]>([]);
  const busy = useRef(false);

  async function ask(question: string) {
    if (busy.current || !question.trim()) return;
    busy.current = true;
    setInput("");

    const index = exchanges.length;
    setExchanges((prev) => [
      ...prev,
      { question, answer: "", citations: [], retrievalCount: null, usedFallback: false, streaming: true },
    ]);

    await streamAsk(question, (evt) => {
      setExchanges((prev) => {
        const next = [...prev];
        const current = { ...next[index] };
        if (evt.type === "retrieval") {
          current.retrievalCount = evt.count as number;
          current.usedFallback = !!evt.fallback;
        } else if (evt.type === "token") {
          current.answer += evt.text as string;
        } else if (evt.type === "citations") {
          current.citations = evt.items as Citation[];
        } else if (evt.type === "error") {
          current.error = evt.message as string;
          current.streaming = false;
        } else if (evt.type === "interrupted") {
          current.interrupted = evt.message as string;
        } else if (evt.type === "done") {
          current.streaming = false;
        }
        next[index] = current;
        return next;
      });
    });

    setExchanges((prev) => {
      const next = [...prev];
      next[index] = { ...next[index], streaming: false };
      return next;
    });
    busy.current = false;
  }

  return (
    <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6">
      <h1 className="text-2xl font-semibold text-[var(--color-fg)]">Ask about my work</h1>
      <p className="mt-2 max-w-lg text-sm text-[var(--color-fg-muted)]">
        Answers are grounded in the real content on this site — projects, timeline, and writing —
        with citations you can follow to the source.{" "}
        <Link href="/writing/rag-pipeline" className="underline underline-offset-2">
          How this works
        </Link>
        .
      </p>

      {exchanges.length === 0 && (
        <div className="mt-8 flex flex-wrap gap-2">
          {STARTER_QUESTIONS.map((q) => (
            <button
              key={q}
              type="button"
              onClick={() => ask(q)}
              className="rounded-full border border-[var(--color-border)] px-3 py-1.5 text-sm text-[var(--color-fg-muted)] transition-colors hover:border-[var(--color-accent)] hover:text-[var(--color-fg)]"
            >
              {q}
            </button>
          ))}
        </div>
      )}

      <div className="mt-8 flex flex-col gap-8">
        {exchanges.map((ex, i) => (
          <div key={i} className="border-t border-[var(--color-border)] pt-6 first:border-t-0 first:pt-0">
            <p className="text-sm font-medium text-[var(--color-fg)]">{ex.question}</p>

            {ex.retrievalCount === null && ex.streaming && (
              <p className="mt-2 font-mono text-xs text-[var(--color-fg-muted)]">Searching…</p>
            )}
            {ex.retrievalCount !== null && !ex.usedFallback && (
              <p className="mt-2 font-mono text-xs text-[var(--color-fg-muted)]">
                Searched {ex.retrievalCount} chunks…
              </p>
            )}
            {ex.usedFallback && (
              <p className="mt-2 text-xs text-[var(--color-fg-muted)]">
                (Live retrieval isn&apos;t configured — showing a prewritten answer.)
              </p>
            )}

            {ex.error ? (
              <p className="mt-2 text-sm text-[var(--color-fg-muted)]">{ex.error}</p>
            ) : (
              <p className="mt-2 whitespace-pre-wrap text-[var(--color-fg)]">
                {ex.answer}
                {ex.streaming && ex.answer && (
                  <span className="ml-0.5 inline-block h-4 w-1.5 animate-pulse bg-[var(--color-fg-muted)] align-middle" />
                )}
              </p>
            )}
            {ex.interrupted && (
              <p className="mt-1 text-xs italic text-[var(--color-fg-muted)]">{ex.interrupted}</p>
            )}

            {ex.citations.length > 0 && (
              <div className="mt-3 flex flex-wrap gap-2">
                {ex.citations.map((c, ci) => (
                  <Link
                    key={ci}
                    href={c.url}
                    className="rounded-full border border-[var(--color-border)] px-2.5 py-1 text-xs text-[var(--color-fg-muted)] hover:border-[var(--color-accent)] hover:text-[var(--color-fg)]"
                  >
                    [{ci + 1}] {c.label}
                  </Link>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          ask(input);
        }}
        className="sticky bottom-4 mt-8 flex items-center gap-2 rounded-full border border-[var(--color-border)] bg-[var(--color-bg-raised)] p-1.5 shadow-sm"
      >
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask a question…"
          maxLength={500}
          className="flex-1 bg-transparent px-3 py-1.5 text-sm text-[var(--color-fg)] outline-none placeholder:text-[var(--color-fg-muted)]"
        />
        <button
          type="submit"
          aria-label="Ask"
          className="flex h-8 w-8 items-center justify-center rounded-full bg-[var(--color-accent)] text-[var(--color-bg)] transition-opacity hover:opacity-90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-accent)]"
        >
          <Send size={14} aria-hidden="true" />
        </button>
      </form>
    </div>
  );
}
