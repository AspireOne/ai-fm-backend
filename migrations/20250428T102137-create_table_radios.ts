import { type Kysely, sql } from "kysely";

export async function up(db: Kysely<any>): Promise<void> {
  await db.schema
    .createTable("radios")
    // @formatter:off
    .addColumn("id", "uuid", (col) => col.primaryKey().defaultTo(sql`gen_random_uuid()`))
    // @formatter:on
    .addColumn("title", "varchar(255)", (col) => col.notNull())
    .addColumn("description", "varchar(255)")
    // @formatter:off
    .addColumn("created_at", "timestamptz", (col) => col.notNull().defaultTo(sql`now()`))
    .addColumn("updated_at", "timestamptz", (col) => col.notNull().defaultTo(sql`now()`))
    // @formatter:on
    .addColumn("is_public", "boolean", (col) => col.notNull().defaultTo(true))
    .addColumn("blocks", "jsonb", (col) => col.notNull().defaultTo(sql`'[]'::jsonb`))
    
    .execute();
}

export async function down(db: Kysely<any>): Promise<void> {
  await db.schema.dropTable("radios").execute();
}
