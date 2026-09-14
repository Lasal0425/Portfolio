# Lasal Rathnayake — Portfolio

AI-engineering portfolio. Next.js 16 (App Router) + TypeScript + Tailwind CSS v4.
Built around the "Latent Space" concept: the home page's node field is a real,
navigable map of every project, timeline role, and post — not a decorative
canvas — and the "Ask about my work" assistant is a real RAG pipeline over
the site's own content.

## Stack

- **Next.js 16** (App Router, Turbopack) + **TypeScript** (strict)
- **Tailwind CSS v4**, tokens defined in [`src/app/globals.css`](src/app/globals.css)
- **next-themes** for light/dark mode
- **Zod** for the content schema
- **@mdx-js/mdx** for project case studies and the RAG pipeline write-up
  (rendered directly via `evaluate()`, not `next-mdx-remote` — see the note
  in [`src/lib/compile-mdx.tsx`](src/lib/compile-mdx.tsx) if you're wondering why)
- **@google/genai** (Gemini) for the RAG assistant's embeddings and generation
- Deployed on **Vercel**

## Local setup

```bash
npm install
npm run dev       # http://localhost:3000
npm run build     # production build
npm run typecheck # tsc --noEmit
npm run lint      # eslint
```

Requires Node.js 20.9+ (Next.js 16's minimum).

## Content model

Every fact about Lasal — timeline, projects, posts, profile, stack — is
typed under [`/content`](content) and validated against a Zod schema in
[`content/schema.ts`](content/schema.ts). `src/lib/content.ts` parses each
file at import time, so a malformed entry fails the build instead of
shipping.

**Add a role, project, or post by editing the relevant file under
`/content` — never a component:**

- **New timeline role** → add an entry to the `roles` array of the right
  organisation in [`content/timeline.ts`](content/timeline.ts). Set
  `featured: true` to surface it by default on `/timeline`; otherwise it
  sits behind "+N more roles".
- **New project** → add an entry to [`content/projects.ts`](content/projects.ts),
  and optionally a case study at `content/projects/<slug>.mdx` (set
  `hasCaseStudy: true` once it exists). Only `status: "ready"` projects are
  meant for public case studies — `"draft"` is for something real but not
  written up yet.
- **New post** → add an entry to [`content/posts.ts`](content/posts.ts). Set
  `source` to `"dev.to"`, `"medium"` (external — links out, content isn't
  mirrored), or `"site"` for a post written directly here, with a matching
  `content/posts/<slug>.mdx` file.

Re-run `npm run ingest` after adding or changing any content the RAG
assistant should know about — it doesn't pick up changes automatically.

A `TODO(lasal): ...` comment in a content file marks a fact that hasn't
been confirmed yet — grep for it before treating any placeholder as real.

## Environment variables

Copy `.env.example` to `.env.local` and fill in what you have. Both are
optional — every feature that needs a key degrades gracefully without one:

- `GEMINI_API_KEY` — powers `npm run ingest` and the live half of the "Ask
  about my work" assistant. Free at https://aistudio.google.com/apikey, no
  card required. Without it, `/api/ask` serves the prewritten fallback
  answers in [`src/lib/rag/fallback.ts`](src/lib/rag/fallback.ts) instead.
- `GITHUB_TOKEN` — raises the GitHub API rate limit for the home page's
  live activity section (60/hour unauthenticated is tight once hourly ISR
  is running in production). A token with no scopes is enough. Without it,
  that section still works, just against a lower rate limit.

## Ingest script (RAG assistant)

```bash
npm run ingest
```

Reads every real content source — profile, timeline, project summaries
and case-study MDX bodies, post metadata — chunks it, embeds each chunk
with `gemini-embedding-001`, and writes the result to
`content/index/embeddings.json`, a prebuilt index committed to the repo
(not a live vector database — the corpus is small enough that an in-memory
cosine-similarity scan is instant). Requires `GEMINI_API_KEY`. Full
pipeline details: [`/writing/rag-pipeline`](content/posts/rag-pipeline.mdx).

**This has not been run in this repo** — there's no `GEMINI_API_KEY`
available in the environment this was built in, so `content/index/embeddings.json`
doesn't exist yet and the assistant is currently running entirely on the
static fallback path. Run `npm run ingest` once a key is available to turn
on live retrieval; nothing else needs to change.

## Redeploying

Push to `main`; Vercel builds and deploys automatically. No custom domain —
the site stays on the existing Vercel URL.

## Build phases

1. ✅ Scaffold + design tokens + content schema
2. ✅ Hero + shell (Latent Space concept: node field, header, footer, theme toggle)
3. ✅ Timeline (grouped by org, progressive disclosure)
4. ✅ Projects as case studies (real architecture diagrams, honest tradeoffs)
5. ✅ Blog / writing section (live dev.to metadata, split by kind)
6. ✅ RAG assistant ("Ask about my work") — see the note above on ingest
7. ✅ Live GitHub integration (hourly ISR, graceful fallback)
8. ✅ Polish: sitemap, robots.txt, JSON-LD `Person`, dynamic OG image,
   focus states, reduced-motion, WCAG AA contrast

## Known open items

- `npm run ingest` hasn't been run — see above.
- A handful of `TODO(lasal)` comments remain in `/content` for facts only
  Lasal can confirm (e.g. exact scope of the Nebule/nebule.co work,
  latency/scale numbers for knowledge_assistant).
- The Nebule and AIESEC roles below "featured" still have no bullets —
  honest title + dates, not invented accomplishments.
