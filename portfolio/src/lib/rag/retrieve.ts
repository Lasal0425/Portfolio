import { readFile } from "node:fs/promises";
import path from "node:path";

export interface EmbeddedChunk {
  id: string;
  url: string;
  title: string;
  text: string;
  embedding: number[];
}

interface EmbeddingsIndex {
  model: string;
  generatedAt: string;
  chunks: EmbeddedChunk[];
}

let cachedIndex: EmbeddingsIndex | null | undefined; // undefined = not loaded yet

/**
 * Loads content/index/embeddings.json once per server instance. Returns
 * null (not throws) if the file doesn't exist — the expected state before
 * `npm run ingest` has ever been run with a real API key, and part of the
 * signal the route handler uses to fall back to static answers.
 */
async function loadIndex(): Promise<EmbeddingsIndex | null> {
  if (cachedIndex !== undefined) return cachedIndex;
  try {
    const file = path.join(process.cwd(), "content", "index", "embeddings.json");
    const raw = await readFile(file, "utf-8");
    cachedIndex = JSON.parse(raw) as EmbeddingsIndex;
  } catch {
    cachedIndex = null;
  }
  return cachedIndex;
}

function cosineSimilarity(a: number[], b: number[]): number {
  let dot = 0;
  let normA = 0;
  let normB = 0;
  for (let i = 0; i < a.length; i++) {
    dot += a[i] * b[i];
    normA += a[i] * a[i];
    normB += b[i] * b[i];
  }
  return dot / (Math.sqrt(normA) * Math.sqrt(normB) || 1);
}

export async function isIndexAvailable(): Promise<boolean> {
  const index = await loadIndex();
  return !!index && index.chunks.length > 0;
}

export async function indexSize(): Promise<number> {
  const index = await loadIndex();
  return index?.chunks.length ?? 0;
}

export async function retrieveTopK(
  queryEmbedding: number[],
  k = 5,
): Promise<(EmbeddedChunk & { score: number })[]> {
  const index = await loadIndex();
  if (!index) return [];
  return index.chunks
    .map((chunk) => ({ ...chunk, score: cosineSimilarity(queryEmbedding, chunk.embedding) }))
    .sort((a, b) => b.score - a.score)
    .slice(0, k);
}
