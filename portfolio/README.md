# Lasal Rathnayake — Portfolio

AI-engineering portfolio. Next.js 16 (App Router) + TypeScript + Tailwind CSS v4,
built in phases — see the phase list below for what exists and what's next.

## Stack

- **Next.js 16** (App Router, Turbopack) + **TypeScript** (strict)
- **Tailwind CSS v4**, tokens defined in [`src/app/globals.css`](src/app/globals.css)
- **Motion** for interaction motion (added when Phase 2 needs it)
- **next-themes** for light/dark mode
- **Zod** for the content schema
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

Every fact about Lasal — timeline, projects, posts, profile — is typed under
[`/content`](content) and validated against a Zod schema in
[`content/schema.ts`](content/schema.ts). `src/lib/content.ts` parses each
file at import time, so a malformed entry fails the build instead of
shipping.

**Add a role, project, or post by editing the relevant file under
`/content` — never a component:**

- New timeline role → add an entry to the `roles` array of the right
  organisation in [`content/timeline.ts`](content/timeline.ts).
- New project → add an entry to [`content/projects.ts`](content/projects.ts).
  Set `status: "draft"` until the case study is ready; only `"ready"`
  projects appear on the public `/projects` list.
- New post → add an entry to [`content/posts.ts`](content/posts.ts). Set
  `kind` to `"engineering"` or `"personal"` and `source` to where it's
  hosted (`"dev.to"`, `"medium"`, or `"site"` for a post written directly
  on this site).

A `TODO(lasal): ...` comment in a content file marks a fact that hasn't
been confirmed yet — grep for it before treating any placeholder as real.

## Environment variables

None required yet. The RAG assistant (Phase 6) and live GitHub data
(Phase 7) will need API keys — this section gets filled in when those
phases land, along with an `.env.example`.

## Ingest script (RAG assistant)

Not built yet — lands in Phase 6.

## Redeploying

Push to `main`; Vercel builds and deploys automatically. No custom domain —
the site stays on the existing Vercel URL.

## Build phases

1. ✅ Scaffold + design tokens + content schema
2. Hero + shell (Latent Space concept)
3. Timeline
4. Projects as case studies
5. Blog / writing section
6. RAG assistant ("Ask about my work")
7. Live GitHub integration
8. Polish: accessibility, performance, OG image, sitemap, JSON-LD
