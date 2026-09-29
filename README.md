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

---
<sub>Built by [Aladdin Ali](https://github.com/NaxeCode) · [naxecode.github.io](https://naxecode.github.io)</sub>
