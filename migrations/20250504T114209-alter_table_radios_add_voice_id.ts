import { type Kysely } from "kysely";

export async function up(db: Kysely<any>): Promise<void> {
  await db.schema
    .alterTable("radios")
    .addColumn("voice_id", "varchar(255)")
    .addColumn("voice_description", "varchar(255)")
    .execute();
}

export async function down(db: Kysely<any>): Promise<void> {
  await db.schema
    .alterTable("radios")
    .dropColumn("voice_id")
    .dropColumn("voice_description")
    .execute();
}
