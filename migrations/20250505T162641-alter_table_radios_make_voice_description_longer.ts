import { type Kysely } from "kysely";

export async function up(db: Kysely<any>): Promise<void> {
  await db.schema
    .alterTable("radios")
    .alterColumn("voice_description", (col) => col.setDataType("varchar(2000)"))
    .execute();
}

export async function down(db: Kysely<any>): Promise<void> {
  await db.schema
    .alterTable("radios")
    .alterColumn("voice_description", (col) => col.setDataType("varchar(255)"))
    .execute();
}
