# GTview — Driver Setup Portal

A responsive phone-installation guide: **Position → Secure → Align → Power**. Includes interactive mount examples, local progress, manual diagnostics, local photos, troubleshooting, and downloadable support drafts.

## Quick start

Install Node.js 24 LTS and npm. Extract the ZIP and open a terminal inside `gtview`:

```sh
npm ci
npm run dev
```

Open the local URL printed in the terminal. No API keys or database account are required for the current checklist features.

```sh
npm run build
npm start
```

Stack: React 19, TypeScript, Vinext, Vite, Tailwind CSS 4, Radix/Shadcn, and Zod. The app uses Next.js App Router conventions through Vinext and builds a Cloudflare-compatible Worker. This is not a static HTML project or a standard Next.js deployment.

## Project structure

| Location | Purpose |
| --- | --- |
| `app/` | Fourteen routes, metadata, global styles |
| `components/gtview/` | Homepage, four-step guide, mount demo, review, support |
| `components/ui/` | Reusable UI primitives |
| `lib/gtview/` | Content, completion rules, browser photos, disabled analytics |
| `public/assets/` | WebP photographs and concept assets |
| `tests/` | Progress and server-render checks |
| `docs/` | Product notes, approval checklist, validation notes |
| `worker/` | Cloudflare server entrypoint |
| `build/` | Build metadata helper |
| `db/`, `drizzle/` | Optional database scaffolding, unused by current guide |
| `vite.config.ts` | Build and development configuration |
| `.openai/hosting.json` | Unbound configuration; original hosting ID removed |

## Customize

- Branding/navigation: `components/gtview/shell.tsx`
- Homepage: `components/gtview/home.tsx`
- Installation: `components/gtview/install.tsx`
- Interactive examples: `components/gtview/mount-lab.tsx`
- Instructions, FAQs, placeholders: `lib/gtview/content.ts`
- Colors/layout: `app/globals.css` and `app/phone-guide.css`
- Browser title/description: `app/layout.tsx`

## Validate

```sh
npm run typecheck
npm test
```

Tests build the project, check progress rules, and render all fourteen routes. They do not test a physical device or simulate browser interactions.

## Publish the source on GitHub

Sign in as `vamsi9090`, create an empty **public** repository named `gtview`, and leave automatic README/license creation unchecked. Then run inside this folder:

```sh
git init
git add .
git commit -m "Initial GTview driver setup portal"
git branch -M main
git remote add origin https://github.com/vamsi9090/gtview.git
git push -u origin main
```

Authenticate through your Git client when prompted. No credentials or Git history are included. Making the repository public does not deploy the website.

## Website hosting

Use a host supporting Vinext and Cloudflare Worker output. Configure your own account/project, server entrypoint, and generated client assets. The server output is `dist/server/index.js`. GitHub Pages cannot directly run this Worker application. For Sites hosting, register this copy as a new project; its original project identity has been removed.

## Data and limitations

Progress and support drafts use local storage; optional photos use IndexedDB. Data stays on that browser and is not synchronized. Clearing browser data removes records.

The preview is illustrative. There is no actual camera access, calibration, activation, support submission, reward verification, or analytics transmission. Bracketed hardware instructions and contact information require approved program details. Images are concepts, not mounting specifications.

This export uses GTview folder names and storage keys. Existing data from another domain or earlier naming is not migrated. Some historical documents describe earlier iterations; the four-step phone guide and current source take precedence.

## License

No project-wide open-source license has been selected. Public source visibility does not itself grant an open-source license. Choose one before inviting reuse and retain third-party notices in `vendor/` and dependencies.

## Archive contents

Source, assets, lockfile, documentation, and configuration are included. Dependencies, build output, credentials, Git history, and original hosting identity are excluded. Run `npm ci` after extraction.
