# GTview — Driver Setup Portal

A responsive phone-installation guide walking a driver through **Position → Secure → Align → Power**. It includes an interactive mount demo, local progress tracking, manual diagnostics, local photo capture, troubleshooting help, and downloadable support drafts.

**Live site:** https://vamsi9090.github.io/gtview/
**Source code:** https://github.com/vamsi9090/gtview

Hosted free on GitHub Pages. Every push to `main` rebuilds and republishes the site automatically — see [How the site is published](#how-the-site-is-published).

## Tech stack

React 19, TypeScript, [Vinext](https://www.npmjs.com/package/vinext) (Next.js App Router conventions on top of Vite), Tailwind CSS 4, Radix/Shadcn UI, and Zod. The app builds to a **Cloudflare Worker**, not static HTML — see [Why GitHub Pages won't work](#why-github-pages-wont-work).

## Quick start (run it locally)

Install Node.js 22+ and npm, then from the repo root:

```sh
npm ci
npm run dev
```

Open the local URL printed in the terminal. No API keys or database are required for the current checklist features.

To build and run a production build locally:

```sh
npm run build
npm start
```

## Project structure

| Location | Purpose |
| --- | --- |
| `app/` | Routes, metadata, global styles |
| `components/gtview/` | Homepage, four-step guide, mount demo, review, support |
| `components/ui/` | Reusable UI primitives |
| `lib/gtview/` | Content, completion rules, browser photos, disabled analytics, base-path helper |
| `public/assets/` | WebP photographs and concept assets |
| `scripts/` | Static export for GitHub Pages |
| `tests/` | Progress and server-render checks |
| `docs/` | Product notes, approval checklist, validation notes |
| `worker/` | Cloudflare Worker entrypoint |
| `build/` | Build metadata helper |
| `db/`, `drizzle/` | Optional database scaffolding, unused by the current guide |
| `vite.config.ts` | Build/dev configuration (includes inline Cloudflare Worker bindings) |

## Customize

- Branding/navigation: `components/gtview/shell.tsx`
- Homepage: `components/gtview/home.tsx`
- Installation flow: `components/gtview/install.tsx`
- Interactive mount demo: `components/gtview/mount-lab.tsx`
- Copy, FAQs, placeholders: `lib/gtview/content.ts`
- Colors/layout: `app/globals.css` and `app/phone-guide.css`
- Page title/description: `app/layout.tsx`

## Validate

```sh
npm run typecheck
npm test
```

Tests build the project, check progress rules, and render every route. They do not test a physical device or simulate real browser interactions.

## How the site is published

GitHub Pages serves only static files, and this app is built around React Server Components — so it is exported to a fully static bundle first, then published. No paid hosting, no external service, no account beyond GitHub.

```sh
npm run build:pages   # writes gh-pages-dist/
```

`.github/workflows/deploy-pages.yml` runs exactly that on every push to `main` and publishes `gh-pages-dist/` to GitHub Pages.

### What the export does

`scripts/build-static.mjs` builds the app, starts the production server locally, and saves each route's two responses to disk:

| File | Served when |
| --- | --- |
| `<route>.html` | A visitor loads the URL directly or refreshes |
| `<route>.rsc` | The client router navigates between pages without a reload |

Routes are discovered from the `app/` directory, so a new `app/<name>/page.tsx` is picked up automatically. Client assets, `favicon.svg`, a `404.html`, and `.nojekyll` are copied alongside.

It does not use `vinext build --prerender-all`: that flag's route discovery crawls from `/`, which returns 404 once `basePath` is set for this build, so it finds no routes.

### About the `/gtview` base path

A GitHub Pages project site lives at `https://vamsi9090.github.io/gtview/`, not at a domain root, so every absolute path needs the `/gtview` prefix. `next.config.ts` sets `basePath`/`assetPrefix` when `GH_PAGES_BUILD=true`, which covers framework-generated links, scripts, and styles.

It does **not** cover hardcoded `public/` paths — a plain `<img src="/assets/x.webp">` would break. Those go through `withBasePath()` in `lib/gtview/base-path.ts`. **Use it for any new `public/` asset reference.**

Renaming the repository means changing `BASE_PATH` in `scripts/build-static.mjs` and the `basePath`/`assetPrefix` values in `next.config.ts` to match.

### Known limitation

Hovering the header logo triggers a prefetch of `/gtview.rsc`, which 404s — vinext builds that URL without the separator for the root route. Navigation still works (the router falls back to a normal page load); the failed request is visible only in devtools.

### Deploying to Cloudflare Workers instead

The project still builds as a Worker (`worker/index.ts`, `vite.config.ts`), which adds real server rendering and image optimization. Import the repo at [dash.cloudflare.com](https://dash.cloudflare.com) under **Workers & Pages → Create → Import a Git repository** with build command `npm run build`. The free tier covers this app's traffic; the GitHub Pages setup above avoids signing up for another service at all.

## Data and limitations

Progress and support drafts use local storage; optional photos use IndexedDB. Data stays in that browser and is not synchronized, and clearing browser data removes it.

This is an illustrative preview: there is no real camera access, calibration, activation, support submission, reward verification, or analytics transmission. Bracketed hardware instructions and contact information require approved program details, and images are concept assets, not mounting specifications.

## License

No project-wide open-source license has been selected yet. Public visibility on GitHub does not itself grant an open-source license — choose one (e.g. MIT) before inviting reuse, and keep the third-party notices in `vendor/` and in dependencies.
