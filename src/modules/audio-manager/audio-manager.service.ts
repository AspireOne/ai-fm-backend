import { BlockType } from "../radio/radio.types";
import { Paths } from "../../helpers/paths";
import fs from "fs";
import { downloadYoutubeAudio } from "../youtube-downloader/youtube-downloader.service";
import * as path from "node:path";
import voiceoverService from "../voiceover/voiceover.service";
import sweeperService from "../sweeper/sweeper.service";
import { PrepareBlockAudioProps } from "./audio-manager.types";
import * as assert from "node:assert";

const DOWNLOADED_AUDIO_DIR = Paths.downloadedFilesDir;

function getYtSongPath(blockId: string) {
  return path.join(DOWNLOADED_AUDIO_DIR, `${blockId}.mp3`);
}

function getSweeperPath(blockId: string, currentIndex: number) {
  return path.join(DOWNLOADED_AUDIO_DIR, `${currentIndex}-${blockId}.mp3`);
}

function getVoiceoverPath(blockId: string, currentIndex: number) {
  return path.join(DOWNLOADED_AUDIO_DIR, `${currentIndex}-${blockId}.mp3`);
}

function getVoiceoverTextPath(blockId: string, currentIndex: number) {
  return path.join(DOWNLOADED_AUDIO_DIR, `${currentIndex}-${blockId}.text.txt`);
}

function getBlockAudioPath(blockId: string, type: BlockType, currentIndex?: number) {
  switch (type) {
    case "song":
      return getYtSongPath(blockId);
    case "sweeper":
      assert.ok(currentIndex, "currentIndex is required for sweeper");
      return getSweeperPath(blockId, currentIndex);
    case "input":
      assert.ok(currentIndex, "currentIndex is required for voiceover/input");
      return getVoiceoverPath(blockId, currentIndex);
    default:
      throw new Error("Invalid block type");
  }
}

/**
 * Downloads/generates the audio files if they don't exist.
 */
async function prepareBlockAudio(
  props: PrepareBlockAudioProps,
): Promise<string | undefined> {
  const { blockId, blockType, ytUrl, currentSongIndex, voiceoverProps } = props;
  const audioFilePath = getBlockAudioPath(blockId, blockType, currentSongIndex);
  if (fs.existsSync(audioFilePath)) return;

  switch (blockType) {
    case "song":
      await downloadYoutubeAudio(ytUrl, audioFilePath);
      break;
    case "sweeper":
      const randomSweeperPath = sweeperService.getRandomSweeper();
      if (!randomSweeperPath) throw new Error("No sweeper found");
      fs.copyFileSync(randomSweeperPath, audioFilePath);
      break;
    case "input":
      const previousVoiceovers = getPreviousVoiceoverTexts(blockId, currentSongIndex);
      const text = await voiceoverService.generateVoiceoverText({
        previousVoiceovers,
        currentSongIndex,
        nextSongName: voiceoverProps?.nextSongName,
        previousSongName: voiceoverProps?.previousSongName,
        totalSongs: voiceoverProps?.totalSongs,
      });
      const audio = await voiceoverService.generateVoiceoverAudio(text);
      const textPath = getVoiceoverTextPath(blockId, currentSongIndex);
      fs.writeFileSync(textPath, text);
      audio.pipe(fs.createWriteStream(audioFilePath));
      break;
    default:
      throw new Error("Invalid block type");
  }

  return audioFilePath;
}

function getPreviousVoiceoverTexts(blockId: string, currentIndex: number): string[] {
  if (currentIndex === 0) return [];
  // 1. build paths
  // 2. read files
  // 3. return array of strings

  // to build paths: iterate from index 0 up to currentIndex (the file might not exist)
  const paths = Array.from({ length: currentIndex }, (_, i) =>
    getVoiceoverTextPath(blockId, i),
  );
  const texts = [];

  for (const path of paths) {
    const exists = fs.existsSync(path);
    if (!exists) continue;
    const content = fs.readFileSync(path, { encoding: "utf-8" });
    texts.push(content);
  }

  console.debug(`Previous voiceover texts for block ${blockId}: ${texts}`);

  return texts;
}

export default {
  prepareBlockAudio,
  getBlockAudioPath,
};
