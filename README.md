# evaaaaawu.com

The source code for [evaaaaawu.com](https://evaaaaawu.com), Eva's personal website.

> **Status:** Work in progress. The site is being rebuilt from scratch. This
> repository currently contains only the project scaffolding (slice 1 of 17).
> The existing coming-soon placeholder remains live at the domain until the
> new site reaches feature parity and DNS is cut over.

## About

This is a ground-up rebuild of my personal site, rethought around three goals:

- **Publishing should be near-frictionless**, especially for short posts on the go.
- **Content and code should be separable**, so I can open-source the craft without
  exposing unpublished drafts.
- **Bilingual content should not be forced to stay in lockstep** — some posts only
  make sense in one language, and that is fine.

The full problem statement, user stories, and implementation decisions live in
the PRD: [issue #1](https://github.com/evaaaaawu/evaaaaawu.com/issues/1).
Individual work items are tracked as issues #2 through #18.

## Architecture

The project is intentionally split across **two repositories**:

| Repository                                                                          | Visibility | Contents                                                |
| ----------------------------------------------------------------------------------- | ---------- | ------------------------------------------------------- |
| [`evaaaaawu/evaaaaawu.com`](https://github.com/evaaaaawu/evaaaaawu.com) (this repo) | Public     | Site code, build pipeline, sync scripts, styles, config |
| `evaaaaawu/evaaaaawu-content`                                                       | Private    | Markdown articles, short posts, images                  |

At build time, the code repo pulls content from the content repo. This lets the
craft be open-source while keeping drafts and future paid articles private. It
also means a content change can trigger a deploy without touching any code.

Short posts flow in from Bluesky via the AT Protocol public API (additive sync
only — existing files are never overwritten). Long-form articles flow in from
an Obsidian vault's `publish/` folder.

## Tech stack

- **[Astro v5](https://astro.build/)** — static output for MVP, with hybrid mode
  available as an upgrade path if paid articles are introduced later.
- **TypeScript** throughout.
- **[Tailwind CSS](https://tailwindcss.com/)** via `@astrojs/tailwind`.
- **[pnpm](https://pnpm.io/)** as the package manager.
- **[Cloudflare Pages](https://pages.cloudflare.com/)** for hosting, with
  [Cloudflare Web Analytics](https://www.cloudflare.com/web-analytics/) for
  privacy-respecting, server-side analytics.
- **[Pagefind](https://pagefind.app/)** for static-site search (planned).
- **[Husky](https://typicode.github.io/husky/)** + **[lint-staged](https://github.com/lint-staged/lint-staged)** +
  **[Prettier](https://prettier.io/)** for commit-time quality gates.

## Getting started

Requirements: Node.js 20+ and pnpm 10+ (developed against Node.js 24.14.0 and pnpm 10.32.1).

```bash
git clone --recurse-submodules https://github.com/evaaaaawu/evaaaaawu.com.git
cd evaaaaawu.com
pnpm install
pnpm dev
```

If you already cloned without `--recurse-submodules`, pull the content repo in
afterwards:

```bash
git submodule update --init --recursive
```

The private `evaaaaawu-content` repo is mounted at `./content/`. Astro reads
Markdown from there at build time via the content collection loaders in
`src/content.config.ts`. You need read access to the content repo for the
build to succeed; on Cloudflare Pages this is configured via a
`GITHUB_TOKEN` (or equivalent) environment variable that has access to the
private submodule, and Cloudflare's `Include submodules in build` option must
be enabled.

The dev server runs at [http://localhost:4321](http://localhost:4321).

### Scripts

| Command          | What it does                                           |
| ---------------- | ------------------------------------------------------ |
| `pnpm dev`       | Start the Astro dev server with hot module reload.     |
| `pnpm build`     | Produce a static build in `dist/`.                     |
| `pnpm preview`   | Serve the built site locally for a final sanity check. |
| `pnpm typecheck` | Run `astro check` (TypeScript + Astro diagnostics).    |
| `pnpm test`      | Run Vitest (schemas and other unit tests).             |

A Husky `pre-commit` hook runs Prettier on staged files, `astro check`, and
the Vitest suite on every commit, so the tree stays formatted, type-clean,
and green without waiting for CI.

## Project structure

```
.
├── content/                    # Submodule → evaaaaawu-content (private)
│   ├── articles/en|zh-tw/
│   ├── stream/en|zh-tw/
│   └── assets/
├── src/
│   ├── content/
│   │   ├── schemas.ts          # Zod schemas for articles and stream
│   │   └── schemas.test.ts     # Vitest tests for the schemas
│   ├── content.config.ts       # Astro content collection definitions
│   ├── layouts/
│   │   └── BaseLayout.astro
│   ├── pages/
│   │   ├── index.astro
│   │   └── demo-content.astro  # Throwaway demo (removed in a later slice)
│   ├── styles/
│   │   └── global.css
│   └── config.ts
├── astro.config.mjs
├── tailwind.config.mjs
└── tsconfig.json
```

More directories (`src/lib/`, `scripts/`) will appear in later slices as the
Bluesky sync and Obsidian sync land.

## A note on licensing

This repository does not ship with a formal open-source license. You are
welcome to read the code, learn from it, and use ideas in your own work — that
is exactly why it is public. Copying the site wholesale, reusing the branding,
or republishing the content is not permitted. If you are unsure whether some
use is fine, feel free to open an issue and ask.
