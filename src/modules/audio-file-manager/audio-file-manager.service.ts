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
import { moderators } from "../voiceover/voiceover-moderators";

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

  const { blockIndex, radio } = props;
  const block = radio.blocks[blockIndex];

  const audioFilePath = getBlockAudioPath(block.id, block.type);
  if (fs.existsSync(audioFilePath)) return;

  switch (block.type) {
    case "song":
      assert.ok(block.yt?.url, "YouTube URL is required for song blocks");
      await ytService.downloadYoutubeAudio(block.yt.url, getYtSongPath(block.id));
      break;
    case "sweeper":
      const randomSweeperPath = sweeperService.getRandomSweeper();
      if (!randomSweeperPath) throw new Error("No sweeper found");
      fs.copyFileSync(randomSweeperPath, audioFilePath);
      break;
    case "voiceover":
      const previousVoiceovers = voiceoverService.getPreviousVoiceoverTexts(
        radio.blocks,
        blockIndex,
      );
      const nextSongBlock = blockUtilsService.getNextSongBlock(radio.blocks, blockIndex);
      const prevSongBlock = blockUtilsService.getPreviousSongBlock(
        radio.blocks,
        blockIndex,
      );
      const currentSongIndex = prevSongBlock?.id
        ? radio.blocks.findIndex((b) => b.id === prevSongBlock.id)
        : 0;

      const text = await voiceoverService.generateVoiceoverText({
        previousVoiceovers: previousVoiceovers,
        currentSongIndex: currentSongIndex,
        totalSongs: radio.blocks.filter((b) => b.type === "song").length,
        nextSongTitle: !nextSongBlock ? null : nextSongBlock?.yt?.title || undefined,
        previousSongTitle: !prevSongBlock ? null : prevSongBlock?.yt?.title || undefined,
        radioTitle: radio.title,
        voiceId: radio.voice_id,
        voiceDescription: radio.voice_description,
      });
      let moderator = moderators.list.find((mod) => mod.id === radio.voice_id)!;
      if (!moderator) {
        console.error(`Moderator not found for ID: ${radio.voice_id}!!!`);
        moderator = moderators.default;
      }
      const audio = await voiceoverService.generateVoiceoverAudio(text, moderator);
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
