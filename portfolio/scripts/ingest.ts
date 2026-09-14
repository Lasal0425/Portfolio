/**
 * Ingest pipeline: chunk -> embed -> store.
 *
 * Run with: npm run ingest
 * Requires GEMINI_API_KEY in the environment (.env.local or exported).
 *
 * Reads every real content source (profile, timeline, projects — including
 * the case-study MDX bodies — and post metadata), splits it into chunks,
 * embeds each chunk with Gemini's gemini-embedding-001, and writes the
 * result to content/index/embeddings.json — a prebuilt local index
 * committed to the repo, loaded into memory by the route handler at
 * request time. No pgvector/Postgres: the corpus here is a personal
 * site's worth of content (a few dozen chunks), well within what a flat
 * cosine-similarity scan over an in-memory array handles instantly, and
 * that avoids a second piece of infrastructure (a database) for a corpus
 * this small.
 *
 * The embedding model is pinned to an exact version (not a "-latest"
 * alias): swapping the embedding model after ingestion would shift the
 * vector space and silently break retrieval against the existing index,
 * so a model change here should be a deliberate re-ingest, not an
 * automatic upgrade.
 */
import { GoogleGenAI } from "@google/genai";
import { writeFile, mkdir } from "node:fs/promises";
import path from "node:path";
import { getSourceDocuments } from "../src/lib/rag/source-documents";
import { chunkAllDocuments } from "../src/lib/rag/chunk";

const EMBEDDING_MODEL = "gemini-embedding-001";
const BATCH_SIZE = 20;

async function main() {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    console.error(
      "GEMINI_API_KEY is not set. Add it to .env.local (see .env.example) and re-run `npm run ingest`.",
    );
    process.exit(1);
  }

  const ai = new GoogleGenAI({ apiKey });

  console.log("Gathering source documents...");
  const docs = await getSourceDocuments();
  const chunks = await chunkAllDocuments(docs);
  console.log(`${docs.length} documents -> ${chunks.length} chunks.`);

  const embedded: { id: string; url: string; title: string; text: string; embedding: number[] }[] = [];

  for (let i = 0; i < chunks.length; i += BATCH_SIZE) {
    const batch = chunks.slice(i, i + BATCH_SIZE);
    console.log(`Embedding chunks ${i + 1}-${i + batch.length} of ${chunks.length}...`);
    const response = await ai.models.embedContent({
      model: EMBEDDING_MODEL,
      contents: batch.map((c) => c.text),
    });
    const vectors = response.embeddings ?? [];
    batch.forEach((chunk, j) => {
      const values = vectors[j]?.values;
      if (!values) {
        console.warn(`No embedding returned for chunk ${chunk.id}, skipping.`);
        return;
      }
      embedded.push({ id: chunk.id, url: chunk.url, title: chunk.title, text: chunk.text, embedding: values });
    });
  }

  const outDir = path.join(process.cwd(), "content", "index");
  await mkdir(outDir, { recursive: true });
  const outFile = path.join(outDir, "embeddings.json");
  await writeFile(
    outFile,
    JSON.stringify(
      {
        model: EMBEDDING_MODEL,
        generatedAt: new Date().toISOString(),
        chunks: embedded,
      },
      null,
      2,
    ),
  );

  console.log(`Wrote ${embedded.length} embedded chunks to ${path.relative(process.cwd(), outFile)}.`);
}

main().catch((err) => {
  console.error("Ingest failed:", err);
  process.exit(1);
});
