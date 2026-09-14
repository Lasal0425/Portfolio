/**
 * Organized by what each thing is used for, not an unsorted badge wall
 * (brief §7). Every entry here is backed by something verifiable — the
 * knowledge_assistant README, the natcon-website package.json diff, the
 * resume's technical-skills section, or this site's own package.json.
 * Design tools (Figma, Canva, Photoshop, After Effects) are deliberately
 * excluded — see brief §2.
 */
export const stack: { category: string; items: string[] }[] = [
  {
    category: "LLM & agent tooling",
    items: ["LangChain", "Ollama (Llama 3)", "Google Gemini", "RAG pipelines", "pgvector"],
  },
  {
    category: "Backend & APIs",
    items: ["Python", "FastAPI", "Java", "Spring Boot", "Node.js", "Express.js"],
  },
  {
    category: "Frontend",
    items: ["React", "Next.js", "TypeScript", "Tailwind CSS"],
  },
  {
    category: "Data & vector stores",
    items: ["PostgreSQL", "pgvector", "MySQL", "Supabase"],
  },
  {
    category: "Infra & tooling",
    items: ["Vercel", "Git", "Postman"],
  },
];
