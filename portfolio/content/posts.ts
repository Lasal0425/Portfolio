import type { Post } from "./schema";

/**
 * Metadata here is a checked-in snapshot for build-time rendering; Phase 5
 * refreshes read time / tags from the live dev.to and Medium APIs where
 * possible and falls back to these values. Full content is never mirrored —
 * every entry links out to the original (brief §7).
 */
export const posts: Post[] = [
  {
    slug: "choreo-wso2-ai-native-idp",
    title:
      "Choreo: Revolutionizing Development with WSO2's AI-Native Internal Developer Platform",
    kind: "engineering",
    source: "dev.to",
    url: "https://dev.to/lasal_rathnayake/choreo-revolutionizing-development-with-wso2s-ai-native-internal-developer-platform-7mb",
    publishedAt: "2025-07-20",
    tags: ["devops", "ai", "wso2", "cloud", "opensource"],
  },
  {
    slug: "first-internship-money-lessons",
    title: "What My First Internship Taught Me About Money",
    kind: "personal",
    source: "medium",
    url: "https://medium.com/@lasalrathnayake/what-my-first-internship-taught-me-about-money-133630738220",
    publishedAt: "2026-09-14",
    readTimeMinutes: 5,
    tags: ["financial discipline", "Colombo Stock Exchange", "investing journey"],
  },
  {
    slug: "rag-pipeline",
    title: "How the \"Ask about my work\" assistant is built",
    kind: "engineering",
    source: "site",
    url: "/writing/rag-pipeline",
    publishedAt: "2026-09-14",
    readTimeMinutes: 6,
    tags: ["rag", "gemini", "embeddings", "pgvector-free"],
  },
];
