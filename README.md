# evaaaaawu.com

The source code for [evaaaaawu.com](https://evaaaaawu.com), Eva's personal website.

> **Status:** Work in progress. Slices 1–4 and 15 of 17 are shipped: project
> scaffolding, two-repo content pipeline, bilingual i18n routing with a
> language switcher, a first-visit Chinese-language suggestion banner, and
> CI quality gates (lint, typecheck, tests, Lighthouse). The existing
> coming-soon placeholder remains live at the domain until the new site
> reaches feature parity and DNS is cut over.

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
- **[Biome](https://biomejs.dev/)** for linting and formatting TypeScript,
  JavaScript, and JSON. Prettier continues to format `.astro` files because
  Biome does not yet support them.
- **[Lighthouse CI](https://github.com/GoogleChrome/lighthouse-ci)** as a
  merge gate on Performance, Accessibility, Best Practices, and SEO.
- **[Husky](https://typicode.github.io/husky/)** + **[lint-staged](https://github.com/lint-staged/lint-staged)** +
  **[Prettier](https://prettier.io/)** for commit-time quality gates.

## Getting started

Requirements: Node.js 20+ and pnpm 10+ (developed against Node.js 24.14.0 and pnpm 10.32.1).

> **Note for visitors:** `pnpm run content:fetch` clones a private content
> repo and will only succeed for the site owner. If you want to explore the
> code, you can run `pnpm install` and read the source directly. Running
> `pnpm dev` or `pnpm build` requires content files in `./content/` — see
> [Forking this repo](#forking-this-repo) if you want to set up your own.

```bash
git clone https://github.com/evaaaaawu/evaaaaawu.com.git
cd evaaaaawu.com
pnpm install
pnpm run content:fetch
pnpm dev
```

`pnpm run content:fetch` clones the private `evaaaaawu-content` repo into
`./content/` (which is gitignored in this repo). For local development it
uses your existing GitHub credentials via the `gh` CLI credential helper or
a GitHub SSH key; no extra setup is needed if you can already `git clone`
from `evaaaaawu/evaaaaawu-content` manually.

On Cloudflare Pages the same script is invoked by the build command with a
`CONTENT_REPO_TOKEN` environment variable set to a fine-grained GitHub PAT
that has read access to the content repo. The script detects the variable
and swaps in an HTTPS URL with an embedded token so the clone works without
interactive auth.

Astro reads the Markdown files from `./content/` at build time via the
content collection loaders in `src/content.config.ts`.

The dev server runs at [http://localhost:4321](http://localhost:4321).

### Scripts

| Command                  | What it does                                                                 |
| ------------------------ | ---------------------------------------------------------------------------- |
| `pnpm dev`               | Start the Astro dev server with hot module reload.                           |
| `pnpm build`             | Produce a static build in `dist/`.                                           |
| `pnpm preview`           | Serve the built site locally for a final sanity check.                       |
| `pnpm typecheck`         | Run `astro check` (TypeScript + Astro diagnostics).                          |
| `pnpm test`              | Run Vitest (schemas and other unit tests).                                   |
| `pnpm lint`              | Biome lint on TS/JS/JSON.                                                    |
| `pnpm lint:fix`          | Same as `lint`, applies safe fixes in place.                                 |
| `pnpm format`            | Biome format on TS/JS/JSON + Prettier on `.astro`.                           |
| `pnpm format:check`      | Read-only format verification (matches what CI runs).                        |
| `pnpm run ci:lint`       | `biome ci .` + `prettier --check "**/*.astro"`; what the `Lint` CI job runs. |
| `pnpm run content:fetch` | Clone or update the private content repo into `./content/`.                  |

A Husky `pre-commit` hook runs Biome (on TS/JS/JSON) and Prettier (on
`.astro` and other files) via lint-staged, then `astro check`, then the
Vitest suite. GitHub Actions runs the same four checks plus Lighthouse CI
on every pull request — see `.github/workflows/ci.yml`.

## Project structure

```
.
├── .github/
│   └── workflows/
│       └── ci.yml              # Lint, typecheck, test, Lighthouse CI
├── content/                    # Fetched from evaaaaawu-content (gitignored)
│   ├── articles/en|zh-tw/
│   ├── stream/en|zh-tw/
│   └── assets/
├── content.example/            # Sample content showing the frontmatter contract
│   ├── articles/en|zh-tw/
│   └── stream/en|zh-tw/
├── public/
│   └── favicon.svg             # Placeholder favicon (design slice will replace)
├── scripts/
│   └── fetch-content.sh        # Clones or updates ./content/ for local + CI
├── src/
│   ├── components/
│   │   ├── SiteHeader.astro    # Site header with language switcher
│   │   └── LanguageBanner.astro # First-visit Chinese-language suggestion banner
│   ├── content/
│   │   ├── schemas.ts          # Zod schemas for articles and stream
│   │   └── schemas.test.ts     # Vitest tests for the schemas
│   ├── content.config.ts       # Astro content collection definitions
│   ├── i18n/
│   │   ├── config.ts           # Locale definitions (mirrors astro.config.mjs)
│   │   ├── path.ts             # Locale-aware path helpers + switcher logic
│   │   ├── path.test.ts
│   │   ├── translations.ts     # useTranslations + dot-path key lookup
│   │   ├── translations.test.ts
│   │   ├── languageBanner.ts   # shouldShowBanner predicate + dismiss key
│   │   └── languageBanner.test.ts
│   ├── layouts/
│   │   └── BaseLayout.astro
│   ├── pages/
│   │   ├── index.astro
│   │   ├── stream.astro        # Scaffold stream page (replaced in later slice)
│   │   ├── demo-content.astro  # Throwaway demo (removed in a later slice)
│   │   ├── articles/
│   │   │   ├── index.astro     # Scaffold articles list
│   │   │   └── [slug].astro    # Scaffold article detail
│   │   └── zh-tw/
│   │       ├── index.astro
│   │       ├── stream.astro
│   │       └── articles/
│   │           ├── index.astro
│   │           └── [slug].astro
│   ├── styles/
│   │   └── global.css
│   └── config.ts
├── astro.config.mjs
├── biome.json                  # Biome lint + format config
├── lighthouserc.json           # Lighthouse CI thresholds and audited routes
├── tailwind.config.mjs
└── tsconfig.json
```

More directories (`src/lib/`) will appear in later slices as the Bluesky
sync and Obsidian sync land.

## Forking this repo

You are welcome to fork this repo and adapt it into your own site. Here is
how to get it running with your own content:

1. **Create your own content repo** (public or private). Use the files in
   `content.example/` as a starting point — they show the expected folder
   structure and frontmatter fields. The canonical schema definitions live in
   `src/content/schemas.ts`.
2. **Set the `CONTENT_REPO_SLUG` environment variable** to point to your
   repo (e.g. `yourname/yourname-content`). The fetch script defaults to
   `evaaaaawu/evaaaaawu-content` when the variable is not set.
3. **If your content repo is private**, also set `CONTENT_REPO_TOKEN` to a
   fine-grained GitHub PAT with read access to that repo.
4. Run `pnpm run content:fetch && pnpm dev`.

Hosting is not tied to Cloudflare Pages. This is a standard Astro static
site and can be deployed to any static hosting provider (Vercel, Netlify,
GitHub Pages, etc.). If you use a CI-based host, set the environment
variables above in its dashboard and use
`pnpm run content:fetch && pnpm build` as the build command.

## Licensing

The **source code** in this repository is released under the
[MIT License](./LICENSE). You are free to fork, modify, and use it in your
own projects.

**Content** (articles, stream posts, images) lives in a separate private
repository and is not covered by the MIT License — all rights are reserved.

**Branding** (the name "evaaaaawu.com", visual identity, and design) is
personal. If you fork this repo, please replace the branding with your own.

If you are unsure whether a particular use is fine, feel free to open an
issue and ask.
