# AGENTS.md

This is Aladdin Ali's personal portfolio, a Next.js App Router site built with `output: 'export'` as a static `out/` folder and deployed to GitHub Pages by `.github/workflows/nextjs.yml` on every push to `main`. All copy lives in `data/*.json` and is validated with Zod schemas (`types/*.ts`) through `lib/data-loader.ts` at build time. The UI uses Tailwind, shadcn-style primitives (`components/ui/`), and `@stargazers-stella/cosmic-ui` from GitHub Packages.

Commands: `npm ci`, `npm run dev`, `npm run build` (static export via `scripts/rename-fallback.cjs`), `npm run lint`.

## Code Review Rules

A push to `main` deploys straight to production. Focus on anything that breaks the static export, leaks data, or makes the portfolio say something false. Formatting and lint are left to tooling.

### Always flag (P0/P1)

- **Breaking the static export.** Flag server-only features that don't work with `output: 'export'`: API routes, `cookies()`/`headers()`, middleware, ISR/`revalidate`, Server Actions, or `next/image` optimization (`images.unoptimized` must stay true). New dynamic routes must provide `generateStaticParams`. `app/projects/[slug]` must produce a page for every slug in `data/projects.json`.
- **Unvalidated data.** Every `data/*.json` file must be loaded through its Zod schema in `lib/data-loader.ts`. Flag direct JSON imports in components, schema changes that loosen URL validation (`z.string().url()` on `github`/`demo`), and schema/data mismatches that would only fail at build time.
- **Workflow token exposure.** In `nextjs.yml`, the GitHub Packages token is written to `~/.npmrc` at build time. Flag echoing or printing it, committing a token into the repo `.npmrc` (it must stay registry-only), widening `permissions:` beyond `contents: read`, `pages: write`, `id-token: write`, `packages: read`, and running the deploy job on `pull_request` from forks.
- **Secrets or private data in the bundle.** Anything under `NEXT_PUBLIC_*` or in `data/*.json` ships to every visitor. Flag tokens, a private email or phone number beyond what `data/profile.json` already publishes, and internal URLs.
- **False claims.** Flag project or experience entries in `data/*.json` whose claims (status, metrics, "live" demo links, dates, employers) contradict the linked repo or earlier entries, or that link to private repos. The portfolio must stay factual.

### Flag when relevant

- External links with `target="_blank"` but no `rel="noreferrer"` (or `noopener`).
- `dangerouslySetInnerHTML` with anything other than static, trusted strings.
- Analytics (`lib/analytics.ts`) events that send PII or full URLs with query strings. Removing the `NEXT_PUBLIC_GA_ID` fallback is fine.
- `basePath` or `trailingSlash` changes. GitHub Pages user sites serve from `/`, and `trailingSlash: true` keeps `/projects/<slug>/` resolving.
- Heavy client-only animation or motion that ignores `prefers-reduced-motion` (`lib/motion.ts`).

### Don't flag

- `scripts/rename-fallback.cjs` patching `fs.rename` for EXDEV. It is intentional for sandboxed builds.
- Committed `tsconfig.tsbuildinfo`, `PLAN.md`, `Todo.md`, `PR_BODY.md`, and `.claude/settings.local.json` (pre-existing).
- Copywriting tone, Tailwind class order, and visual design choices.
