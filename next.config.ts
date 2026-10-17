import type { NextConfig } from "next";

// GitHub Pages serves this repo from https://<user>.github.io/gtview/, so every
// asset and route reference needs the /gtview prefix baked in at build time.
// Local dev (npm run dev) and Cloudflare Worker deploys don't use this path,
// so only apply it when explicitly building for the static GitHub Pages export.
const isGithubPagesBuild = process.env.GH_PAGES_BUILD === "true";
// Override to publish a second copy under a sub-path, e.g. GH_PAGES_BASE_PATH=/gtview/new.
const pagesBasePath = process.env.GH_PAGES_BASE_PATH || "/gtview";

const nextConfig: NextConfig = {
  ...(isGithubPagesBuild
    ? { basePath: pagesBasePath, assetPrefix: pagesBasePath }
    : {}),
  // basePath only rewrites framework-managed asset/route references.
  // Hardcoded `public/` paths (plain <img src="/assets/...">) need this
  // themselves — see lib/gtview/base-path.ts.
  env: {
    NEXT_PUBLIC_BASE_PATH: isGithubPagesBuild ? pagesBasePath : "",
  },
};

export default nextConfig;
