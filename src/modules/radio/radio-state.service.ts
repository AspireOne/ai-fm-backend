import { RadioState } from "./radio.types";
import radioCoreService from "./radio-core.service";
import websocketService from "../websocket/websocket.service";
import audioManagerService from "../audio-file-manager/audio-file-manager.service";
import fs from "fs";

const currentBlockIndices: Record<string, number> = {};

/**
 * Validates if a block index is within the valid range for a radio
 */
function validateBlockIndex(radioId: string, radio: any, blockIndex: number): void {
  if (blockIndex < 0 || blockIndex >= radio.blocks.length) {
    throw new Error(`Invalid block index: ${blockIndex}`);
  }
  console.log(`[Radio ${radioId}] Block index ${blockIndex} is valid`);
}

/**
 * Creates a RadioState object based on the current state
 */
function createRadioState(
  radioId: string,
  radio: any,
  blockIndex: number,
  statusInfo: RadioState["status"],
): RadioState {
  const currentBlock = radio.blocks[blockIndex];

  return {
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
    status: statusInfo,
  };
}

/**
 * Preloads the next block's audio in the background
 */
function preloadNextBlockAudio(
  radioId: string,
  radio: any,
  currentBlockIndex: number,
): void {
  if (currentBlockIndex >= radio.blocks.length - 1) {
    return;
  }

  const nextBlock = radio.blocks[currentBlockIndex + 1];
  const nextAudioPath = audioManagerService.getBlockAudioPath(
    nextBlock.id,
    nextBlock.type,
  );

  if (!fs.existsSync(nextAudioPath)) {
    console.log(
      `[Radio ${radioId}] Preloading next block (${currentBlockIndex + 1}, ${nextBlock.type}) in background`,
    );
    // Don't await this - let it happen in the background
    audioManagerService
      .downloadOrGenerateBlockAudio({
        allBlocks: radio.blocks,
        blockIndex: currentBlockIndex + 1,
      })
      .catch((err) => {
        console.error(
          `[Radio ${radioId}] Error preloading next block audio: ${err.message}`,
        );
      });
  } else {
    console.log(
      `[Radio ${radioId}] Next block (${currentBlockIndex + 1}) already downloaded, skipping preload`,
    );
  }
}

/**
 * Ensures the audio for the current block exists, downloading it if needed
 */
async function ensureBlockAudioExists(
  radioId: string,
  radio: any,
  blockIndex: number,
): Promise<void> {
  const currentBlock = radio.blocks[blockIndex];
  const audioFilePath = audioManagerService.getBlockAudioPath(
    currentBlock.id,
    currentBlock.type,
  );

  const isAudioDownloaded = fs.existsSync(audioFilePath);
  console.log(
    `[Radio ${radioId}] Audio file ${isAudioDownloaded ? "exists" : "does not exist"} at: ${audioFilePath}`,
  );
  if (isAudioDownloaded) return;

  console.log(`[Radio ${radioId}] Audio not downloaded yet, sending loading state`);

  // First send a loading state to the client
  const loadingState = createRadioState(radioId, radio, blockIndex, {
    status: currentBlock.type === "voiceover" ? "generating" : "downloading",
    progress: 0,
  });

  // Broadcast the loading state
  websocketService.broadcastUpdate(radioId, loadingState);
  console.log(`[Radio ${radioId}] Broadcasted loading state for block ${blockIndex}`);

  // Download or generate the audio
  console.log(
    `[Radio ${radioId}] Starting download/generation for block ${blockIndex} (${currentBlock.type})`,
  );
  await audioManagerService.downloadOrGenerateBlockAudio({
    allBlocks: radio.blocks,
    blockIndex: blockIndex,
  });
  console.log(
    `[Radio ${radioId}] Successfully downloaded/generated audio for block ${blockIndex}`,
  );
}

/**
 * Updates the current playing block and broadcasts the update to connected clients
 * @param radioId The ID of the radio
 * @param blockIndex The index of the current block
 */
async function setBlockAndBroadcast(radioId: string, blockIndex: number): Promise<void> {
  console.log(`[Radio ${radioId}] Setting block index to ${blockIndex}`);

  try {
    const radio = await radioCoreService.getRadioOrThrow(radioId);
    console.log(
      `[Radio ${radioId}] Found radio: "${radio.title}" with ${radio.blocks.length} blocks`,
    );

    // Validate the block index
    validateBlockIndex(radioId, radio, blockIndex);

    // Update the current block index
    currentBlockIndices[radioId] = blockIndex;
    console.log(`[Radio ${radioId}] Current block index updated to ${blockIndex}`);

    const currentBlock = radio.blocks[blockIndex];
    console.log(
      `[Radio ${radioId}] Current block type: ${currentBlock.type}, id: ${currentBlock.id}`,
    );

    // Ensure we have the audio file for this block
    await ensureBlockAudioExists(radioId, radio, blockIndex);

    // Preload the next block's audio in the background
    preloadNextBlockAudio(radioId, radio, blockIndex);

    // Create the final radio state
    console.log(`[Radio ${radioId}] Creating final ready state for block ${blockIndex}`);
    const state = createRadioState(radioId, radio, blockIndex, { status: "ready" });

    // Broadcast the update to all connected clients
    websocketService.broadcastUpdate(radioId, state);
    console.log(
      `[Radio ${radioId}] Successfully broadcasted ready state for block ${blockIndex}`,
    );

    return;
  } catch (error) {
    console.error(
      `[Radio ${radioId}] Error updating current block at index ${blockIndex}:`,
      error,
    );
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
      await setBlockAndBroadcast(radioId, currentIndex + 1);
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
      await setBlockAndBroadcast(radioId, currentIndex - 1);
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
    await setBlockAndBroadcast(radioId, currentIndex);
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
