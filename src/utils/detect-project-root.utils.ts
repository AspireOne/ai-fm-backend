import { join, resolve, sep } from "node:path";
import { existsSync } from "node:fs";

let projectRoot: string | undefined;

const MARKERS = ["package.json", "nest-cli.json"] as const;
const MAX_DEPTH = 10;

export function detectProjectRoot(startDir: string = __dirname): string {
  if (projectRoot) return projectRoot;

  const normalizedStartDir = resolve(startDir);
  let currentDir = normalizedStartDir;

  // Only this part should be platform-specific
  const systemRoot =
    process.platform === "win32"
      ? currentDir.split(sep)[0] + sep // e.g. "C:\"
      : sep; // "/"

  let depth = 0;

  while (currentDir !== systemRoot && depth < MAX_DEPTH) {
    if (MARKERS.some((marker) => existsSync(join(currentDir, marker)))) {
      projectRoot = currentDir;
      return currentDir;
    }

    const parentDir = join(currentDir, "..");
    if (parentDir === currentDir) break;

    currentDir = parentDir;
    depth++;
  }

  throw new Error(
    `Failed to detect project root from ${normalizedStartDir}.\n` +
      `Searched ${depth} levels up for: ${MARKERS.join(", ")}`,
  );
}
