# GTview — Driver Setup Portal

A responsive phone-installation guide walking a driver through **Position → Secure → Align → Power**. It includes an interactive mount demo, local progress tracking, manual diagnostics, local photo capture, troubleshooting help, and downloadable support drafts.

**Source code:** https://github.com/vamsi9090/gtview
**Live site:** https://gtview.prudhvi-gelli0.chatgpt.site _(preview link — see the note in [Deploying a public link](#deploying-a-public-link) for a permanent alternative)_

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
| `lib/gtview/` | Content, completion rules, browser photos, disabled analytics |
| `public/assets/` | WebP photographs and concept assets |
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

## Deploying a public link

This app needs a host that can run a **Cloudflare Worker** (it uses server rendering, not a static export), so it can't be hosted on plain GitHub Pages. The easiest free option, since Wrangler is already a dependency:

1. Sign in (or sign up) at [dash.cloudflare.com](https://dash.cloudflare.com) — free tier is enough.
2. Go to **Workers & Pages → Create → Import a Git repository**.
3. Connect your GitHub account and select `vamsi9090/gtview`.
4. Use build command `npm run build` and leave the output settings as detected — Cloudflare's Vite integration reads the Worker config directly from `vite.config.ts`.
5. Deploy. Cloudflare gives you a public URL like `https://gtview.<your-subdomain>.workers.dev`.
6. Every future `git push` to `main` will automatically redeploy that URL.

Once deployed, replace the preview URL at the top of this README under **Live site** with the permanent `*.workers.dev` (or custom domain) link.

> Note: the current **Live site** link (`*.chatgpt.site`) is a preview from an AI website builder, tied to that tool's own session. It works today but isn't guaranteed to stay up — treat it as temporary until the Cloudflare deployment above replaces it.

### Why GitHub Pages won't work

GitHub Pages only serves static files. This app's server output (`worker/index.ts`) needs to run as a Worker to handle routing, image optimization, and future data bindings — Pages has no runtime for that. Cloudflare Workers, which this project already targets, is the natural fit.

## Data and limitations

Progress and support drafts use local storage; optional photos use IndexedDB. Data stays in that browser and is not synchronized, and clearing browser data removes it.

This is an illustrative preview: there is no real camera access, calibration, activation, support submission, reward verification, or analytics transmission. Bracketed hardware instructions and contact information require approved program details, and images are concept assets, not mounting specifications.

## License

No project-wide open-source license has been selected yet. Public visibility on GitHub does not itself grant an open-source license — choose one (e.g. MIT) before inviting reuse, and keep the third-party notices in `vendor/` and in dependencies.
