import { RadioState } from "./radio.types";
import radioCoreService from "./radio-core.service";
import websocketService from "../websocket/websocket.service";
import audioManagerService from "../audio-file-manager/audio-file-manager.service";
import fs from "fs";

const currentBlockIndices: Record<string, number> = {};

/**
 * Updates the current playing block and broadcasts the update to connected clients
 * @param radioId The ID of the radio
 * @param blockIndex The index of the current block
 * @param playState The current play state
 */
async function setBlockAndBroadcast(
  radioId: string,
  blockIndex: number,
  playState: RadioState["playState"] = "playing",
): Promise<void> {
  try {
    const radio = await radioCoreService.getRadioOrThrow(radioId);

    if (blockIndex < 0 || blockIndex >= radio.blocks.length) {
      throw new Error(`Invalid block index: ${blockIndex}`);
    }

    // Update the current block index
    currentBlockIndices[radioId] = blockIndex;

    const currentBlock = radio.blocks[blockIndex];

    const audioFilePath = audioManagerService.getBlockAudioPath(
      currentBlock.id,
      currentBlock.type,
    );
    const isAudioDownloaded = fs.existsSync(audioFilePath);

    // Handle loading/downloading state
    if (!isAudioDownloaded) {
      // First send a loading state to the client
      const loadingState: RadioState = {
        radioId,
        radioTitle: radio.title,
        radioDescription: radio.description ?? undefined,
        block: {
          id: currentBlock.id,
          type: currentBlock.type,
          position: blockIndex,
          title:
            currentBlock.type === "song" && currentBlock.yt?.title
              ? currentBlock.yt.title
              : currentBlock.type === "voiceover"
                ? "DJ Input"
                : "Station ID",
          streamUrl: `/radios/${radioId}/stream/${currentBlock.id}`,
        },
        totalBlocks: radio.blocks.length,
        hasNext: blockIndex < radio.blocks.length - 1,
        hasPrev: blockIndex > 0,
        playState: "loading",
        loadingProgress: {
          status: currentBlock.type === "voiceover" ? "generating" : "downloading",
          progress: 0,
        },
      };

      // Broadcast the loading state
      websocketService.broadcastUpdate(radioId, loadingState);

      // Download or generate the audio
      await audioManagerService.downloadOrGenerateBlockAudio({
        allBlocks: radio.blocks,
        blockIndex: blockIndex,
      });

      // Preload the next block's audio in the background if it exists
      if (blockIndex < radio.blocks.length - 1) {
        const nextBlock = radio.blocks[blockIndex + 1];
        const nextAudioPath = audioManagerService.getBlockAudioPath(
          nextBlock.id,
          nextBlock.type,
        );

        if (!fs.existsSync(nextAudioPath)) {
          // Don't await this - let it happen in the background
          audioManagerService
            .downloadOrGenerateBlockAudio({
              allBlocks: radio.blocks,
              blockIndex: blockIndex + 1,
            })
            .catch((err) => {
              console.error(`Error preloading next block audio: ${err.message}`);
            });
        }
      }
    }

    // Create the radio state
    const state: RadioState = {
      radioId,
      radioTitle: radio.title,
      radioDescription: radio.description ?? undefined,
      block: {
        id: currentBlock.id,
        type: currentBlock.type,
        position: blockIndex,
        title:
          currentBlock.type === "song" && currentBlock.yt?.title
            ? currentBlock.yt.title
            : currentBlock.type === "voiceover"
              ? "DJ Input"
              : "Station ID",
        streamUrl: `/radios/${radioId}/stream/${currentBlock.id}`,
      },
      totalBlocks: radio.blocks.length,
      hasNext: blockIndex < radio.blocks.length - 1,
      hasPrev: blockIndex > 0,
      playState,
      loadingProgress: {
        status: "ready",
      },
    };

    // Broadcast the update to all connected clients
    websocketService.broadcastUpdate(radioId, state);

    return;
  } catch (error) {
    console.error(`Error updating current block:`, error);
    throw error;
  }
}

/**
 * Skip to the next block in the radio
 * @param radioId The ID of the radio
 */
async function skipNext(radioId: string): Promise<void> {
  try {
    // Get the current block index
    const currentIndex = currentBlockIndices[radioId] ?? 0;
    const radio = await radioCoreService.getRadioOrThrow(radioId);

    // Check if we can go to the next block
    if (currentIndex < radio.blocks.length - 1) {
      await setBlockAndBroadcast(radioId, currentIndex + 1, "playing");
    }
  } catch (error) {
    console.error(`Error skipping to next block:`, error);
    throw error;
  }
}

/**
 * Skip to the previous block in the radio
 * @param radioId The ID of the radio
 */
async function skipPrevious(radioId: string): Promise<void> {
  try {
    // Get the current block index
    const currentIndex = currentBlockIndices[radioId] ?? 0;

    // Check if we can go to the previous block
    if (currentIndex > 0) {
      await setBlockAndBroadcast(radioId, currentIndex - 1, "playing");
    }
  } catch (error) {
    console.error(`Error skipping to previous block:`, error);
    throw error;
  }
}

/**
 * Set the play state of the radio
 * @param radioId The ID of the radio
 * @param playState The play state to set
 */

/*
async function setPlayState(
  radioId: string,
  playState: RadioState["playState"],
): Promise<void> {
  try {
    // Get the current block index
    const currentIndex = currentBlockIndices[radioId] ?? 0;

    // Update the current block with the new play state
    await setBlockAndBroadcast(radioId, currentIndex, playState);
  } catch (error) {
    console.error(`Error setting play state:`, error);
    throw error;
  }
}
*/

/**
 * Send the current state of the radio to connected clients
 * @param radioId The ID of the radio
 */
async function sendCurrentState(radioId: string): Promise<void> {
  try {
    // Get the current block index or default to 0
    const currentIndex = currentBlockIndices[radioId] ?? 0;

    // Update the current block (this will broadcast the state)
    await setBlockAndBroadcast(radioId, currentIndex, "playing");
  } catch (error) {
    console.error(`Error sending current state:`, error);
    throw error;
  }
}

export default {
  skipNext,
  skipPrevious,
  sendCurrentState,
};
