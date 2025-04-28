import { sql, type Kysely } from "kysely";

export async function up(db: Kysely<any>): Promise<void> {
  await db.schema
    .createTable("songs")
    // @formatter:off
    .addColumn("id", "uuid", (col) => col.primaryKey().defaultTo(sql`gen_random_uuid()`))
    .addColumn("radio_id", "uuid", (col) =>
      col.notNull().references("radios.id").onDelete("cascade"),
    )
    .addColumn("yt_url", "varchar(255)", (col) => col.notNull())
    .execute();

  await db.schema
    .createIndex("songs_radio_idx")
    .on("songs")
    .columns(["radio_id", "id"])
    .execute();
}

export async function down(db: Kysely<any>): Promise<void> {
  await db.schema.dropTable("songs").execute();
}
