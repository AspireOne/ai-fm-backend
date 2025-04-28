import {join} from "node:path";
import {access} from "node:fs/promises";
import {constants} from "node:fs";
import {detectProjectRoot} from "../utils/detect-project-root.utils";

const PROJECT_ROOT = detectProjectRoot();

/** Pre-defined file/directory paths for the project. */
export const Paths = {
  /** Root directory of the project (where for example package.json resides). */
  projectRoot: PROJECT_ROOT,
  /** Directory that contains static resources. */
  resourcesDir: join(PROJECT_ROOT, "src", "resources"),
  /** Directory that contains static sweepers (resources). */
  sweepersDir: join(PROJECT_ROOT, "src", "resources", "sweepers"),
  /** DB Migrations directory. */
  migrationsDir: join(PROJECT_ROOT, "migrations"),
  // ... other paths
} as const;

/** Pre-defined file/directory paths for the project that are valid even if they do NOT exist. */
export const OptionalPaths = {
  /** Directory that contains locally downloaded files not part of the project. */
  downloadedFilesDir: join(PROJECT_ROOT, "downloaded-files"),
};

export const validatePredefinedPathsExistOrThrow = async (): Promise<void> => {
  const errors: Error[] = [];

  const pathValidations = Object.entries(Paths).map(async ([key, path]) => {
    try {
      await access(path, constants.R_OK);
      console.debug(`✓ Path "${key}" is valid: ${path}`);
    } catch (error: unknown) {
      // Collect errors instead of throwing immediately
      const errorMessage = error instanceof Error ? error.message : String(error);
      errors.push(
        new Error(
          `Critical pre-defined system path "${key}" is not accessible at ${path}: ${errorMessage}`,
        ),
      );
    }
  });

  await Promise.all(pathValidations);

  // If any paths failed validation, throw a combined error
  if (errors.length > 0) {
    const combinedMessage = errors.map((e) => e.message).join("\n");
    throw new Error(`Path validation failed:\n${combinedMessage}`);
  }
};
