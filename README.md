<img src=".github/brand/logo.svg" width="80" alt="" />

# naxecode.github.io

Personal site for Aladdin Ali (Naxe): backend & platform engineer, making games since 2015.

[![status](https://img.shields.io/badge/status-active-a7c080?style=flat&labelColor=2d353b)](https://naxecode.github.io)
![Next.js](https://img.shields.io/badge/Next.js-7fbbb3?style=flat&labelColor=2d353b&logo=nextdotjs&logoColor=d3c6aa)
![TypeScript](https://img.shields.io/badge/TypeScript-7fbbb3?style=flat&labelColor=2d353b&logo=typescript&logoColor=d3c6aa)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-7fbbb3?style=flat&labelColor=2d353b&logo=tailwindcss&logoColor=d3c6aa)
[![demo](https://img.shields.io/badge/demo-live-a7c080?style=flat&labelColor=2d353b)](https://naxecode.github.io)

## What it does
- Single-page portfolio: projects, experience, about, and journey sections, plus a detail page per project.
- All copy lives in `data/*.json` and is validated with Zod at build time (`types/`, `lib/data-loader.ts`).

## How it works
Next.js App Router with `output: 'export'`, so the build is a static `out/` folder. Pushing to `main` runs `.github/workflows/nextjs.yml`, which builds the site and deploys it to GitHub Pages.

## Getting started
```bash
npm ci
npm run dev     # local dev server
npm run build   # static export to out/
```

## Status
Live at https://naxecode.github.io.

## How this project is run

[![Tracked in Linear](https://img.shields.io/badge/tracked_in-Linear-5e6ad2?style=flat&labelColor=2d353b&logo=linear&logoColor=d3c6aa)](https://linear.app)
[![AI code review](https://img.shields.io/badge/code_review-Codex-7fbbb3?style=flat&labelColor=2d353b&logo=openai&logoColor=d3c6aa)](AGENTS.md)
[![main is PR-only](https://img.shields.io/badge/main-PR--only-a7c080?style=flat&labelColor=2d353b&logo=github&logoColor=d3c6aa)](#how-this-project-is-run)

- **Planning:** work is tracked in Linear as initiatives → projects → milestones → issues; branches and PR titles carry the issue ID so status moves automatically from In Progress to Done.
- **Review:** every pull request gets an automatic Codex review guided by this repo's own Code Review Rules in [`AGENTS.md`](AGENTS.md), and review threads must be resolved before merge.
- **Guardrails:** the default branch (`main`) only changes through pull requests — no direct pushes or force-pushes.

## License

MIT. See [LICENSE](LICENSE).

---
<sub>Built by [Aladdin Ali](https://github.com/NaxeCode) · [naxecode.github.io](https://naxecode.github.io)</sub>
