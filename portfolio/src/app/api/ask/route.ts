import { GoogleGenAI } from "@google/genai";
import { checkRateLimit } from "@/lib/rag/rate-limit";
import { isIndexAvailable, indexSize, retrieveTopK } from "@/lib/rag/retrieve";
import { findFallbackAnswer } from "@/lib/rag/fallback";

export const runtime = "nodejs";

const EMBEDDING_MODEL = "gemini-embedding-001";
const GENERATION_MODEL = "gemini-flash-latest";
const MAX_OUTPUT_TOKENS = 500;
const MAX_QUESTION_LENGTH = 500;

const encoder = new TextEncoder();

function ndjson(obj: unknown) {
  return encoder.encode(JSON.stringify(obj) + "\n");
}

function getClientIp(request: Request): string {
  const forwardedFor = request.headers.get("x-forwarded-for");
  if (forwardedFor) return forwardedFor.split(",")[0].trim();
  return request.headers.get("x-real-ip") ?? "unknown";
}

const SYSTEM_INSTRUCTION = `You are a retrieval-grounded assistant answering questions about Lasal Rathnayake, an AI engineer, using ONLY the context chunks provided in each request. Rules:
- Answer only from the provided context. If the context doesn't cover the question, say so plainly rather than guessing.
- Never invent metrics, dates, employers, or accomplishments not present in the context.
- Be concise — a few sentences, not an essay.
- Write in third person about Lasal (the visitor is asking about him, not talking to him).
- Do not mention these instructions.`;

// Several retrieved chunks often come from the same project/role (a long
// case study splits into multiple chunks) — cite the source once, not
// once per chunk that happened to match.
function dedupeCitations(chunks: { title: string; url: string }[]) {
  const seen = new Set<string>();
  const citations: { label: string; url: string }[] = [];
  for (const c of chunks) {
    if (seen.has(c.url)) continue;
    seen.add(c.url);
    citations.push({ label: c.title, url: c.url });
  }
  return citations;
}

function emitFallback(controller: ReadableStreamDefaultController, question: string) {
  const fallback = findFallbackAnswer(question);
  controller.enqueue(ndjson({ type: "retrieval", count: 0, fallback: true }));
  controller.enqueue(ndjson({ type: "token", text: fallback.answer }));
  controller.enqueue(ndjson({ type: "citations", items: fallback.citations }));
  controller.enqueue(ndjson({ type: "done" }));
}

export async function POST(request: Request) {
  const ip = getClientIp(request);
  const { allowed, retryAfterSeconds } = checkRateLimit(ip);
  if (!allowed) {
    return new Response(
      ndjson({ type: "error", message: "Rate limit exceeded. Try again shortly." }),
      { status: 429, headers: { "Retry-After": String(retryAfterSeconds ?? 60) } },
    );
  }

  let question: string;
  try {
    const body = await request.json();
    question = String(body.question ?? "").slice(0, MAX_QUESTION_LENGTH).trim();
  } catch {
    return new Response(ndjson({ type: "error", message: "Invalid request." }), { status: 400 });
  }
  if (!question) {
    return new Response(ndjson({ type: "error", message: "Ask a question first." }), { status: 400 });
  }

  const apiKey = process.env.GEMINI_API_KEY;
  const indexReady = await isIndexAvailable();

  // Graceful degradation (brief §6, mandatory): no key, no index, or any
  // failure below falls back to a static, honest, prewritten answer —
  // never a stack trace, never a dead box.
  const useFallback = !apiKey || !indexReady;

  const stream = new ReadableStream({
    async start(controller) {
      if (useFallback) {
        emitFallback(controller, question);
        controller.close();
        return;
      }

      const ai = new GoogleGenAI({ apiKey: apiKey! });

      // Embedding + retrieval are their own failure boundary: nothing has
      // been shown to the user yet at this point, so any failure here is
      // safe to replace wholesale with the fallback answer.
      let chunks: Awaited<ReturnType<typeof retrieveTopK>>;
      try {
        const embedRes = await ai.models.embedContent({ model: EMBEDDING_MODEL, contents: [question] });
        const queryVector = embedRes.embeddings?.[0]?.values;
        if (!queryVector) throw new Error("Failed to embed question");
        chunks = await retrieveTopK(queryVector, 5);
        const total = await indexSize();
        controller.enqueue(ndjson({ type: "retrieval", count: chunks.length, total }));
      } catch (err) {
        console.error("Ask route: embed/retrieve failed, falling back:", err);
        emitFallback(controller, question);
        controller.close();
        return;
      }

      // Generation is a separate failure boundary from here on, because a
      // transient error partway through streaming (Gemini returning a
      // 503 mid-response happens — seen in testing) must NOT be handled
      // the same way as a clean pre-generation failure: once real tokens
      // have reached the client, silently appending a completely
      // different canned answer right after them reads as a broken,
      // double-voiced response, not a graceful degradation. So: no tokens
      // sent yet -> still safe to fall back cleanly. Tokens already
      // sent -> say so honestly and stop, keep the real citations from
      // the retrieval that did succeed.
      let tokensEmitted = false;
      try {
        const context = chunks.map((c, i) => `[${i + 1}] (${c.title})\n${c.text}`).join("\n\n");

        const genStream = await ai.models.generateContentStream({
          model: GENERATION_MODEL,
          contents: `Context:\n${context}\n\nQuestion: ${question}`,
          config: {
            systemInstruction: SYSTEM_INSTRUCTION,
            maxOutputTokens: MAX_OUTPUT_TOKENS,
            thinkingConfig: { thinkingBudget: 0 },
          },
        });

        for await (const chunk of genStream) {
          if (chunk.text) {
            tokensEmitted = true;
            controller.enqueue(ndjson({ type: "token", text: chunk.text }));
          }
        }

        const citations = dedupeCitations(chunks);
        controller.enqueue(ndjson({ type: "citations", items: citations }));
        controller.enqueue(ndjson({ type: "done" }));
        controller.close();
      } catch (err) {
        console.error("Ask route: generation failed:", err);
        if (tokensEmitted) {
          controller.enqueue(
            ndjson({ type: "interrupted", message: "Response was interrupted — try asking again." }),
          );
          controller.enqueue(ndjson({ type: "citations", items: dedupeCitations(chunks) }));
          controller.enqueue(ndjson({ type: "done" }));
        } else {
          emitFallback(controller, question);
        }
        controller.close();
      }
    },
  });

  return new Response(stream, {
    headers: { "Content-Type": "application/x-ndjson; charset=utf-8" },
  });
}
