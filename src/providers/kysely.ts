import { DB } from "kysely-codegen";
import { kyselyDialect } from "./kysely-dialect";
import { Kysely } from "kysely";

export const db = new Kysely<DB>({
  dialect: kyselyDialect,
});
