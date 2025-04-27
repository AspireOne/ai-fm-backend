import * as path from "path";
import {existsSync, promises as fs} from "fs";
import {FileMigrationProvider, Kysely, Migrator} from "kysely";
import {run} from "kysely-migration-cli";
import {DB} from "kysely-codegen";
import * as dotenv from "dotenv";
import {kyselyDialect} from "../providers/kysely-dialect";
import {Paths} from "../providers/paths";

dotenv.config();

// check if fs and path are available
if (!existsSync || !path.join || !fs) {
  throw new Error("fs or path are not available");
}

const migrationsDirPath = Paths.migrationsDir;

if (!existsSync(migrationsDirPath)) {
  throw new Error("Migrations directory does not exist");
}

const db = new Kysely<DB>({
  dialect: kyselyDialect,
});

const migrator = new Migrator({
  db,
  provider: new FileMigrationProvider({
    fs,
    path,
    migrationFolder: migrationsDirPath,
  }),
});

run(db, migrator, migrationsDirPath);
