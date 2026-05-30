# AfterTone Hospitality Lab — Agent Guide

## Read first
Before making changes, read these files in order:
1. `README.md`
2. `docs/agents/project-rules.md`
3. `src/lib/content.ts` for site copy and content structure
4. The relevant file under `node_modules/next/dist/docs/` before changing Next.js behavior

## Core project constraints
- This project uses Next.js 16 App Router with static export.
- Current deployment assumes `output: "export"` and `trailingSlash: true` in `next.config.ts`.
- Vercel reads `out/` via `vercel.json`.
- `main` branch push triggers production deployment through `.github/workflows/vercel-production-deploy.yml`.
- Before claiming work is done, run `pnpm build`.

## Collaboration habits for this project owner
- Communicate in Traditional Chinese unless a file explicitly requires another language.
- Show step-by-step progress and verification clearly.
- Report blockers honestly; do not pretend a build, deploy, or test succeeded.
- When copy or design changes touch multiple files, keep them in sync and say exactly what changed.

## Brand / UX guardrails
- Tone should feel calm, refined, immersive, and editorial.
- Prefer clean layouts and clear information hierarchy over flashy effects.
- Do not add retro envelope / room / window-style atmosphere effects unless explicitly requested.
- Homepage headline style currently prefers minimal punctuation for a cleaner visual rhythm.
- Any factual or numeric claim must be traceable to proposal content or another verified source.
- Keep `✎ 待定稿` markers unless the owner explicitly finalizes that copy.

## Content editing notes
- Canonical structured content lives primarily in `src/lib/content.ts`.
- Some homepage / CTA text may still be hard-coded in components such as `src/components/Sections2.tsx`; check for duplicates when updating copy.
- Hero images belong in `public/images/hero/`.
- Case images belong in `public/images/cases/`.

<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->
