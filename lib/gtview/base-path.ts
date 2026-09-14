/** Prefixes a root-relative `public/` asset path with the configured base path (see next.config.ts). */
export function withBasePath(assetPath: string): string {
  return `${process.env.NEXT_PUBLIC_BASE_PATH ?? ""}${assetPath}`;
}
