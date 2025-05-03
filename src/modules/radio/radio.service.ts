import { CreateRadioInputSchema } from "./schemas/create-radio-input.schema";
import { db } from "../../providers/kysely";
import { DbBlock } from "./radio.types";
import { uuid } from "../../helpers/uuid";

async function createRadio(props: CreateRadioInputSchema) {
  const feed = createFeed(props.songs);

  return await db
    .insertInto("radios")
    .values({
      title: props.title,
      is_public: true,
      description: "Default description",
      songs: JSON.stringify(feed),
    })
    .returningAll()
    .execute();
}

// Create a radio feed.
/**
 * The goal is to create a complete radio feed. Meaning that in between each song (almost always), there should be an
 * input (moderator voiceover), and sometimes (not always) there should also be a "sweeper" right after a song,
 * regardless of whether it is immediately followed by an input or directly a song.
 * @param songs
 */
function createFeed(songs: { url: string }[]): DbBlock[] {
  const feed: DbBlock[] = [];

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
      url: song.url,
    });

    // Determine if we should add a sweeper after this song
    const addSweeper = Math.random() < sweeperProbability;
    if (addSweeper) {
      // Add a sweeper (random number between 1-8)
      const sweeperNumber = Math.floor(Math.random() * 8) + 1;
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
        type: "input",
        id: `input-${uuid()}`,
      });
    }
  });

  return feed;
}

export default {
  createRadio,
  createFeed,
};
