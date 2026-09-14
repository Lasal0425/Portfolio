export interface FallbackAnswer {
  question: string;
  // Loose matching keywords — the fallback path doesn't have an embedding
  // model available (that's exactly why it's the fallback), so matching is
  // simple substring/keyword overlap rather than semantic search.
  keywords: string[];
  answer: string;
  citations: { label: string; url: string }[];
}

/**
 * Graceful-degradation content (brief §6, mandatory): if there's no
 * GEMINI_API_KEY, no prebuilt embeddings index, or a live request fails,
 * these are the answers a visitor gets instead of an error or a dead box.
 * Every claim here is grounded in what's actually on the site — nothing
 * invented for the fallback path that wouldn't also be true of a live
 * retrieval answer.
 */
export const FALLBACK_ANSWERS: FallbackAnswer[] = [
  {
    question: "What's the hardest thing he's built?",
    keywords: ["hardest", "hard", "challenging", "difficult", "impressive"],
    answer:
      "Hard to answer for him rather than as him, so here's what the record actually shows: knowledge_assistant is the deepest system — a full local RAG pipeline (FastAPI, LangChain, Ollama, pgvector) with two real pipelines (ingest and query). Separately, the breast cancer coursework project is a good example of catching a real mistake: an early version leaked its target variable into the training features (88.9% accuracy that didn't hold up), and a corrected version without the leak reports a more honest 85.0%.",
    citations: [
      { label: "knowledge_assistant", url: "/projects/knowledge-assistant" },
      { label: "Breast Cancer Detection Model", url: "/projects/breast-cancer-detection" },
    ],
  },
  {
    question: "Does he know vector databases?",
    keywords: ["vector", "database", "pgvector", "embedding", "retrieval"],
    answer:
      "Yes — knowledge_assistant retrieves over pgvector (the Postgres vector extension) for its RAG pipeline, and this site's own \"Ask about my work\" assistant is built the same way: chunk, embed, store, retrieve by cosine similarity.",
    citations: [
      { label: "knowledge_assistant", url: "/projects/knowledge-assistant" },
      { label: "How this assistant works", url: "/writing/rag-pipeline" },
    ],
  },
  {
    question: "What did he do at Nebule?",
    keywords: ["nebule", "work", "job", "employer", "trainee", "intern"],
    answer:
      "Built the nebule.co company website. He's been at Nebule since July 2025 — Software Engineer Intern through December 2025, then Software Engineer Trainee from December 2025.",
    citations: [{ label: "Timeline — Nebule", url: "/timeline#nebule" }],
  },
];

const GENERIC_FALLBACK: Omit<FallbackAnswer, "question" | "keywords"> = {
  answer:
    "Live answering isn't available right now — either the API key isn't configured or the request failed. Try one of the suggested questions, or browse the Timeline, Projects, and Writing pages directly for the same information this assistant would have used.",
  citations: [
    { label: "Timeline", url: "/timeline" },
    { label: "Projects", url: "/projects" },
  ],
};

export function findFallbackAnswer(question: string): FallbackAnswer {
  const lower = question.toLowerCase();
  const match = FALLBACK_ANSWERS.find((f) => f.keywords.some((kw) => lower.includes(kw)));
  return match ?? { question, keywords: [], ...GENERIC_FALLBACK };
}
