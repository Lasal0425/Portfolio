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
        const fallback = findFallbackAnswer(question);
        controller.enqueue(ndjson({ type: "retrieval", count: 0, fallback: true }));
        controller.enqueue(ndjson({ type: "token", text: fallback.answer }));
        controller.enqueue(ndjson({ type: "citations", items: fallback.citations }));
        controller.enqueue(ndjson({ type: "done" }));
        controller.close();
        return;
      }

      try {
        const ai = new GoogleGenAI({ apiKey: apiKey! });

        const embedRes = await ai.models.embedContent({
          model: EMBEDDING_MODEL,
          contents: [question],
        });
        const queryVector = embedRes.embeddings?.[0]?.values;
        if (!queryVector) throw new Error("Failed to embed question");

        const chunks = await retrieveTopK(queryVector, 5);
        const total = await indexSize();
        controller.enqueue(ndjson({ type: "retrieval", count: chunks.length, total }));

        const context = chunks
          .map((c, i) => `[${i + 1}] (${c.title})\n${c.text}`)
          .join("\n\n");

        const genStream = await ai.models.generateContentStream({
          model: GENERATION_MODEL,
          contents: `Context:\n${context}\n\nQuestion: ${question}`,
          config: {
            systemInstruction: SYSTEM_INSTRUCTION,
            maxOutputTokens: MAX_OUTPUT_TOKENS,
          },
        });

        for await (const chunk of genStream) {
          if (chunk.text) controller.enqueue(ndjson({ type: "token", text: chunk.text }));
        }

        const citations = chunks.map((c) => ({ label: c.title, url: c.url }));
        controller.enqueue(ndjson({ type: "citations", items: citations }));
        controller.enqueue(ndjson({ type: "done" }));
        controller.close();
      } catch (err) {
        // A live failure mid-stream still degrades to the fallback answer
        // rather than leaving the client with a half-finished response.
        console.error("Ask route live path failed, falling back:", err);
        const fallback = findFallbackAnswer(question);
        controller.enqueue(ndjson({ type: "retrieval", count: 0, fallback: true }));
        controller.enqueue(ndjson({ type: "token", text: fallback.answer }));
        controller.enqueue(ndjson({ type: "citations", items: fallback.citations }));
        controller.enqueue(ndjson({ type: "done" }));
        controller.close();
      }
    },
  });

  return new Response(stream, {
    headers: { "Content-Type": "application/x-ndjson; charset=utf-8" },
  });
}
