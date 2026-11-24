<img src=".github/brand/logo.svg" width="68" alt="" />

# Aladdin Ali’s engineering portfolio

A static portfolio for exploring public work in applied AI, C# and .NET, graphics, financial reconciliation, physics simulations and audio tooling. The home page pairs a draggable render comparison with a synthetic ledger. Project pages link to working labs, implementation decisions and public evidence.

## Run locally

```sh
npm ci
npm run dev
```

For the production export, run `npm run build` and serve the resulting `out/` folder with `python3 scripts/serve-preview.py --port 8000`. Open [localhost:8000](http://localhost:8000/). The labs under `public/labs/` are standalone documents and also work from the static export.

## Where to look

- [Case studies](lib/case-studies.ts) hold the selected project descriptions, actions and source references.
- [Portfolio sections](components/Portfolio.tsx) present the project visuals, background and archive.
- The [project catalog](data/projects.json) retains the existing project URLs.
- The [Naxe generator](https://github.com/NaxeCode/NaxeCode/tree/main/.github/brand) supplies the static sky, mark and palette. The site self-hosts Geist and Geist Mono.

The Pages workflow publishes changes merged into the default branch. [Live portfolio](https://naxe.dev/) · [MIT license](LICENSE)

To refresh a lab, build its original project, then run `node scripts/mirror-lab.mjs LAB EXPORT_DIRECTORY PUBLIC_SOURCE_URL UPSTREAM_LICENSE_FILE`. The script copies the reviewed files, adds the return navigation, preserves the upstream license and records SHA-256 hashes of the original files in each lab’s `provenance.json`.
