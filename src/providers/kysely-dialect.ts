import {PostgresDialect} from "kysely";
import {Pool} from "pg";
import * as dotenv from "dotenv";
import {env} from "./env";

dotenv.config();

let connectionString = env.DATABASE_URL;

const USE_SSL = false;

const pool = new Pool({
  connectionString: connectionString,
  max: 2,
  application_name: "nonstopfm",
  connectionTimeoutMillis: 15_000,
  idleTimeoutMillis: 15_000,
  query_timeout: 15_000,
  keepAlive: false,
  keepAliveInitialDelayMillis: 20_000,
  maxLifetimeSeconds: 3600,
  allowExitOnIdle: true,
  ssl: !USE_SSL ? false : {rejectUnauthorized: false},
});

const kyselyDialect = new PostgresDialect({
  pool,
});

pool.on("error", (err) => {
  console.error("Unexpected pool error", err);
});

export {pool, kyselyDialect};
