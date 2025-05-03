import fs from "fs";

import voiceoverService from "../voiceover/voiceover.service";
import sweeperService from "../sweeper/sweeper.service";
import { DownloadOrGenerateBlockAudio } from "./audio-file-manager.types";
import * as assert from "node:assert";
import { Paths } from "../../helpers/paths";
import path from "node:path";
import { Block } from "../radio/radio.types";
import blockUtilsService from "../block-utils/block-utils.service";
import ytService from "../yt/yt.service";
import { elevenlabsAudioToFile } from "../../helpers/elevenlabs-audio-to-file";

const DOWNLOADED_AUDIO_DIR = Paths.downloadedFilesDir;

// Ensure download directory exists
function ensureDownloadDirExists() {
  if (!DOWNLOADED_AUDIO_DIR || DOWNLOADED_AUDIO_DIR.trim() === "") {
    throw new Error("Downloaded files directory path is empty or not defined");
  }

  if (!fs.existsSync(DOWNLOADED_AUDIO_DIR)) {
    // Create directory recursively
    fs.mkdirSync(DOWNLOADED_AUDIO_DIR, { recursive: true });
    console.log(`Created download directory: ${DOWNLOADED_AUDIO_DIR}`);
  }
}

function getYtSongPath(blockId: string) {
  return path.join(DOWNLOADED_AUDIO_DIR, `${blockId}.mp3`);
}

function getSweeperPath(blockId: string) {
  return path.join(DOWNLOADED_AUDIO_DIR, `${blockId}.mp3`);
}

function getVoiceoverPath(blockId: string) {
  return path.join(DOWNLOADED_AUDIO_DIR, `${blockId}.mp3`);
}

function getVoiceoverTextPath(blockId: string) {
  return path.join(DOWNLOADED_AUDIO_DIR, `${blockId}.text.txt`);
}

function getBlockAudioPath(blockId: string, type: Block["type"]) {
  if (type === "song") return getYtSongPath(blockId);
  if (type === "sweeper") return getSweeperPath(blockId);
  if (type === "voiceover") return getVoiceoverPath(blockId);
  throw new Error("Invalid block type");
}

/**
 * Downloads/generates the audio files if they don't exist.
 */
async function downloadOrGenerateBlockAudio(
  props: DownloadOrGenerateBlockAudio,
): Promise<string | undefined> {
  // Ensure the download directory exists
  ensureDownloadDirExists();

  const { allBlocks, blockIndex } = props;
  const block = allBlocks[blockIndex];

  const audioFilePath = getBlockAudioPath(block.id, block.type);
  if (fs.existsSync(audioFilePath)) return;

  switch (block.type) {
    case "song":
      assert.ok(block.yt?.url, "YouTube URL is required for song blocks");
      await ytService.downloadYoutubeAudio(block.yt.url, getYtSongPath(block.id));
      /*const nextSong = blockUtilsService.getNextSongBlock(allBlocks, blockIndex);
      // Download one song in advance.
      if (nextSong) {
        assert.ok(nextSong.yt?.url, "YouTube URL is required for song blocks");
        // Do not await.
        ytService
          .downloadYoutubeAudio(nextSong.yt.url, getYtSongPath(nextSong.id))
          .catch((error) => {
            console.error(`Error downloading next song: ${error}`);
          });
      }*/
      break;
    case "sweeper":
      const randomSweeperPath = sweeperService.getRandomSweeper();
      if (!randomSweeperPath) throw new Error("No sweeper found");
      fs.copyFileSync(randomSweeperPath, audioFilePath);
      break;
    case "voiceover":
      const previousVoiceovers = voiceoverService.getPreviousVoiceoverTexts(
        allBlocks,
        blockIndex,
      );
      const nextSongBlock = blockUtilsService.getNextSongBlock(allBlocks, blockIndex);
      const prevSongBlock = blockUtilsService.getPreviousSongBlock(allBlocks, blockIndex);
      const currentSongIndex = prevSongBlock?.id
        ? allBlocks.findIndex((b) => b.id === prevSongBlock.id)
        : 0;

      const text = await voiceoverService.generateVoiceoverText({
        previousVoiceovers: previousVoiceovers,
        currentSongIndex: currentSongIndex,
        totalSongs: allBlocks.filter((b) => b.type === "song").length,
        nextSongTitle: !nextSongBlock ? null : nextSongBlock?.yt?.title,
        previousSongTitle: !prevSongBlock ? null : prevSongBlock?.yt?.title,
      });
      const audio = await voiceoverService.generateVoiceoverAudio(text);
      await elevenlabsAudioToFile(audio, audioFilePath);
      const textPath = getVoiceoverTextPath(block.id);
      fs.writeFileSync(textPath, text);
      break;
    default:
      throw new Error("Invalid block type");
  }

  return audioFilePath;
}

export default {
  downloadOrGenerateBlockAudio,
  getBlockAudioPath,
  getVoiceoverTextPath,
  ensureDownloadDirExists,
};
