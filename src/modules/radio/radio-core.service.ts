import { CreateRadioInputSchema } from "./schemas/create-radio-input.schema";
import { db } from "../../providers/db";
import { Block, ParsedRadio, RadiosResponse } from "./radio.types";
import { uuid } from "../../helpers/uuid";
import ytService from "../yt/yt.service";

/**
 * @throws Error if the radio is not found
 * @param radioId
 */
async function getRadioOrThrow(radioId: string): Promise<ParsedRadio> {
  const radio = await db
    .selectFrom("radios")
    .where("id", "=", radioId)
    .select(["blocks", "title", "description", "id"])
    .executeTakeFirst();

  if (!radio) {
    throw new Error(`Radio with ID ${radioId} not found`);
  }

  const blocks: Block[] = radio.blocks as object as Block[];

  return {
    ...radio,
    blocks,
  };
}

async function getRadios(): Promise<RadiosResponse> {
  const radios = await db
    .selectFrom("radios")
    .select(["id", "title", "description", "is_public", "blocks"])
    .execute();

  return radios.map((radio) => ({
    ...radio,
    blockCount: (radio.blocks as [])?.length,
    blocks: undefined,
  }));
}

async function createRadio(props: CreateRadioInputSchema) {
  const withTitles = await ytService.fetchTitles(props.songs);
  if (!withTitles.some((s) => s.title)) {
    throw new Error("Could not fetch title for any song.");
  }
  const feed = createFeed(withTitles);

  return await db
    .insertInto("radios")
    .values({
      title: props.title,
      is_public: props.is_public,
      description: props.description,
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
