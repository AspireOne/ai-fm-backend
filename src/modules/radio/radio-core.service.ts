import { CreateRadioInputSchema } from "./schemas/create-radio-input.schema";
import { db } from "../../providers/db";
import { Block, ParsedRadio, RadiosResponse } from "./radio.types";
import { uuid } from "../../helpers/uuid";
import ytService from "../yt/yt.service";
import { moderators } from "../voiceover/voiceover-moderators";

/**
 * @throws Error if the radio is not found
 * @param radioId
 */
async function getRadioOrThrow(radioId: string): Promise<ParsedRadio> {
  const radio = await db
    .selectFrom("radios")
    .where("id", "=", radioId)
    .select(["blocks", "title", "description", "id", "voice_id", "voice_description"])
    .executeTakeFirst();

  if (!radio) {
    throw new Error(`Radio with ID ${radioId} not found`);
  }

  const blocks: Block[] = radio.blocks as object as Block[];

  const isVoiceIdValid = moderators.list.some((mod) => mod.id === radio.voice_id);
  if (radio.voice_id && !isVoiceIdValid) {
    console.error(`Invalid voice ID: ${radio.voice_id} unsetting it from the radio`);
    db.updateTable("radios")
      .set("voice_id", null)
      .where("id", "=", radioId)
      .execute()
      .catch((e) => console.error("Could not unset voice id", e));
  }

  return {
    ...radio,
    voice_id: radio.voice_id ?? moderators.default.id,
    voice_description: radio.voice_description ?? moderators.default.personality,
    blocks,
  };
}

async function getRadios(): Promise<RadiosResponse> {
  const radios = await db
    .selectFrom("radios")
    .select(["id", "title", "description", "is_public", "blocks", "created_at"])
    .execute();

  return radios.map((radio) => ({
    ...radio,
    blockCount: (radio.blocks as Block[])?.length,
    songCount: (radio.blocks as Block[])?.filter((b) => b.type === "song").length,
    createdAt:
      typeof radio.created_at === "string"
        ? radio.created_at
        : radio.created_at.toISOString(),
    blocks: undefined,
  }));
}

async function createRadio(props: CreateRadioInputSchema) {
  const withTitles = await ytService.fetchTitles(props.songs);
  if (!withTitles.some((s) => s.title)) {
    throw new Error("Could not fetch title for any song.");
  }
  const feed = createFeed(withTitles);

  let voiceId = props.voice_id;
  const voiceDescription =
    props.voice_description && props.voice_description.trim().length > 5
      ? props.voice_description
      : undefined;

  if (props.voice_id) {
    const isVoiceIdValid = moderators.list.some((mod) => mod.id === props.voice_id);
    if (!isVoiceIdValid) {
      console.error(`Invalid voice ID: ${props.voice_id}`);
      voiceId = undefined;
    }
  }

  return await db
    .insertInto("radios")
    .values({
      title: props.title,
      is_public: props.is_public,
      description: props.description,
      voice_id: voiceId,
      voice_description: voiceDescription,
      blocks: JSON.stringify(feed),
    })
    .returningAll()
    .execute();
}

/**
 * The goal is to create a complete radio feed. Meaning that in between each song (almost always), there should be an
 * input (moderator voiceover), and sometimes (not always) there should also be a "sweeper" right after a song,
 * regardless of whether it is immediately followed by an input or directly a song.
 * @param songs
 */
function createFeed(songs: { url: string; title: string | null }[]): Block[] {
  const feed: Block[] = [];

  // Configuration for randomization
  const inputProbability = 0.9; // 90% chance of having an input after a song
  const sweeperProbability = 0.3; // 30% chance of having a sweeper after a song

  feed.push({
    type: "sweeper",
    id: `sweeper-${uuid()}`,
  });

  // Process each song
  songs.forEach((song, index) => {
    // Add the song to the feed
    feed.push({
      type: "song",
      id: `song-${uuid()}`,
      yt: {
        url: song.url,
        title: song.title,
      },
    });

    // Determine if we should add a sweeper after this song
    const addSweeper = Math.random() < sweeperProbability;
    if (addSweeper) {
      feed.push({
        type: `sweeper`,
        id: `sweeper-${uuid()}`,
      });
    }

    // Determine if we should add an input after this song (or after the sweeper if present)
    // Always add an input after the last song
    const addInput = index === songs.length - 1 || Math.random() < inputProbability;
    if (addInput) {
      feed.push({
        type: "voiceover",
        id: `voiceover-${uuid()}`,
      });
    }
  });

  return feed;
}

export default {
  createRadio,
  getRadios,
  getRadioOrThrow,
};
