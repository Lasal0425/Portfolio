import type { SourceDocument } from "./source-documents";

export interface Chunk {
  id: string;
  docId: string;
  url: string;
  title: string;
  text: string;
}

const MAX_WORDS = 120;

/**
 * Sentence-boundary chunking with a word-count cap. The corpus here is
 * small (a personal site's worth of content, not a document library), so
 * this doesn't need to be clever — most source documents are already
 * under the cap and come out as a single chunk; only the longer case
 * studies actually split.
 */
export function chunkDocument(doc: SourceDocument): Chunk[] {
  const sentences = doc.text.split(/(?<=[.!?])\s+/).filter(Boolean);
  const chunks: Chunk[] = [];
  let current: string[] = [];
  let wordCount = 0;

  function flush() {
    if (current.length === 0) return;
    chunks.push({
      id: `${doc.id}-${chunks.length}`,
      docId: doc.id,
      url: doc.url,
      title: doc.title,
      text: current.join(" "),
    });
    current = [];
    wordCount = 0;
  }

  for (const sentence of sentences) {
    const words = sentence.split(/\s+/).length;
    if (wordCount + words > MAX_WORDS && current.length > 0) {
      flush();
    }
    current.push(sentence);
    wordCount += words;
  }
  flush();

  // A document with no sentence-ending punctuation at all still needs a
  // chunk (e.g. very short titles-only text).
  if (chunks.length === 0 && doc.text.trim()) {
    chunks.push({ id: `${doc.id}-0`, docId: doc.id, url: doc.url, title: doc.title, text: doc.text });
  }

  return chunks;
}

export async function chunkAllDocuments(docs: SourceDocument[]): Promise<Chunk[]> {
  return docs.flatMap(chunkDocument);
}
