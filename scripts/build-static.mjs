// Builds a fully static export of the site for GitHub Pages.
//
// `vinext build --prerender-all` can't be used directly: its route auto-discovery
// crawls from "/" and, once next.config.ts sets basePath for this build, "/" 404s
// (the app only answers under "/gtview"), so it silently discovers zero routes.
// Instead this script starts the built production server itself, and fetches every
// known route (auto-discovered from the app/ directory) plus its .rsc payload
// directly — the same pair of responses the client's own router fetches for a full
// page load vs. a client-side soft navigation, verified against `dist/server/ssr`.
//
// Output goes to gh-pages-dist/, ready to publish as the site root.
import { spawn } from "node:child_process";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = path.dirname(path.dirname(fileURLToPath(import.meta.url)));
const OUT_DIR = path.join(ROOT, "gh-pages-dist");
const BASE_PATH = "/gtview";
const PORT = 3000;
const SERVER_ORIGIN = `http://127.0.0.1:${PORT}`;

function discoverRoutes() {
  const appDir = path.join(ROOT, "app");
  const routes = [""];
  for (const entry of fs.readdirSync(appDir, { withFileTypes: true })) {
    if (!entry.isDirectory()) continue;
    if (fs.existsSync(path.join(appDir, entry.name, "page.tsx"))) {
      routes.push(entry.name);
    }
  }
  return routes;
}

async function waitForServer() {
  for (let i = 0; i < 60; i++) {
    try {
      const res = await fetch(`${SERVER_ORIGIN}${BASE_PATH}/`);
      if (res.ok) return;
    } catch {
      // not up yet
    }
    await new Promise((r) => setTimeout(r, 500));
  }
  throw new Error("vinext start did not become ready in time");
}

async function crawlRoutes(routes) {
  for (const route of routes) {
    const htmlRes = await fetch(`${SERVER_ORIGIN}${BASE_PATH}/${route}`, {
      headers: { Accept: "text/html" },
    });
    const rscRes = await fetch(`${SERVER_ORIGIN}${BASE_PATH}/${route}.rsc`);
    if (!htmlRes.ok) throw new Error(`HTML fetch failed for /${route}: ${htmlRes.status}`);
    if (!rscRes.ok) throw new Error(`RSC fetch failed for /${route}: ${rscRes.status}`);
    const base = route === "" ? "index" : route;
    fs.writeFileSync(path.join(OUT_DIR, `${base}.html`), await htmlRes.text());
    fs.writeFileSync(path.join(OUT_DIR, `${base}.rsc`), await rscRes.text());
    console.log(`  ${base}.html + ${base}.rsc`);
  }
}

async function main() {
  console.log("Building (GH_PAGES_BUILD=true)...");
  await run("npx", ["vinext", "build"], { GH_PAGES_BUILD: "true" });

  fs.rmSync(OUT_DIR, { recursive: true, force: true });
  fs.mkdirSync(OUT_DIR, { recursive: true });

  console.log("Starting production server...");
  const server = spawn("npx", ["vinext", "start"], {
    cwd: ROOT,
    env: { ...process.env, GH_PAGES_BUILD: "true", PORT: String(PORT) },
    stdio: "inherit",
    shell: true,
    detached: process.platform !== "win32",
  });

  const killServer = () => {
    if (server.killed) return;
    if (process.platform === "win32") {
      // vinext start spawns child processes on Windows; taskkill /T is the
      // only way to reap the whole tree.
      try {
        spawn("taskkill", ["/F", "/T", "/PID", String(server.pid)], { shell: true });
      } catch {
        server.kill();
      }
    } else {
      try {
        process.kill(-server.pid, "SIGTERM");
      } catch {
        server.kill();
      }
    }
  };

  try {
    await waitForServer();

    const routes = discoverRoutes();
    console.log(`Crawling ${routes.length} routes...`);
    await crawlRoutes(routes);

    console.log("Copying client assets...");
    fs.cpSync(path.join(ROOT, "dist/client/assets"), path.join(OUT_DIR, "assets"), {
      recursive: true,
    });
    fs.copyFileSync(path.join(ROOT, "dist/client/favicon.svg"), path.join(OUT_DIR, "favicon.svg"));

    console.log("Fetching 404 page...");
    const notFoundRes = await fetch(`${SERVER_ORIGIN}${BASE_PATH}/this-route-does-not-exist`);
    fs.writeFileSync(path.join(OUT_DIR, "404.html"), await notFoundRes.text());

    fs.writeFileSync(path.join(OUT_DIR, ".nojekyll"), "");
  } finally {
    killServer();
  }

  console.log(`\nStatic site ready at ${path.relative(ROOT, OUT_DIR)}/`);
  // Force exit even if the killed server left descriptors hanging on Windows.
  setTimeout(() => process.exit(0), 500).unref();
}

function run(cmd, args, extraEnv) {
  return new Promise((resolve, reject) => {
    const child = spawn(cmd, args, {
      cwd: ROOT,
      env: { ...process.env, ...extraEnv },
      stdio: "inherit",
      shell: true,
    });
    child.on("exit", (code) => (code === 0 ? resolve() : reject(new Error(`${cmd} exited with ${code}`))));
  });
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
