import { ParsedRadio, RadioState } from "./radio.types";
import radioCoreService from "./radio-core.service";
import websocketService from "../websocket/websocket.service";
import audioManagerService from "../audio-file-manager/audio-file-manager.service";
import fs from "fs";
import voiceoverService from "../voiceover/voiceover.service";
import { moderators } from "../voiceover/voiceover-moderators";

const currentBlockIndices: Record<string, number> = {};

// Track ongoing audio processing operations to prevent duplicates
// Key format: `${radioId}:${blockId}`
const ongoingOperations = new Map<string, Promise<void>>();

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
  radio: ParsedRadio,
  blockIndex: number,
  statusInfo: RadioState["status"],
): RadioState {
  const currentBlock = radio.blocks[blockIndex];

  const getTitle = () => {
    if (currentBlock.type === "song") return currentBlock.yt?.title || "Unknown song";
    if (currentBlock.type === "sweeper") return radio.title;
    if (currentBlock.type === "voiceover") {
      const moderator = moderators.list.find((mod) => mod.id === radio.voice_id)!;
      return moderator.name;
    }
    throw new Error("Unknown block type");
  };

  // Calculate song download statistics
  const songStats = (() => {
    // Get all song blocks
    const songBlocks = radio.blocks.filter((block) => block.type === "song");
    const totalSongs = songBlocks.length;

    // Count downloaded songs
    let downloadedSongs = 0;
    for (const block of songBlocks) {
      const audioPath = audioManagerService.getBlockAudioPath(block.id, "song");
      if (isFileComplete(audioPath)) {
        downloadedSongs++;
      }
    }

    return { totalSongs, totalDownloadedSongs: downloadedSongs };
  })();

  return {
    radioId: radio.id,
    radioTitle: radio.title,
    radioDescription: radio.description ?? undefined,
    block: {
      id: currentBlock.id,
      type: currentBlock.type,
      position: blockIndex,
      title: getTitle(),
      streamUrl: `/radios/${radio.id}/stream/${currentBlock.id}`,
    },
    moderator: {
      id: radio.voice_id,
      name: moderators.list.find((mod) => mod.id === radio.voice_id)!.name,
      personality: radio.voice_description,
    },
    totalBlocks: radio.blocks.length,
    hasNext: blockIndex < radio.blocks.length - 1,
    hasPrev: blockIndex > 0,
    status: statusInfo,
    totalSongs: songStats.totalSongs,
    totalDownloadedSongs: songStats.totalDownloadedSongs,
  };
}

/**
 * Preloads the next N blocks' audio in the background
 */
function preloadNextBlocks(
  radio: ParsedRadio,
  currentBlockIndex: number,
  count: number = 2,
): void {
  for (let i = 1; i <= count; i++) {
    const nextBlockIndex = currentBlockIndex + i;

    // Skip if we've reached the end of the blocks
    if (nextBlockIndex >= radio.blocks.length) {
      break;
    }

    const nextBlock = radio.blocks[nextBlockIndex];
    
    // Skip song blocks - they won't be downloaded automatically
    if (nextBlock.type === "song") {
      console.log(
        `[Radio ${radio.id}] Skipping preload of song block (${nextBlockIndex}) - songs must be uploaded manually`,
      );
      continue;
    }
    
    const nextAudioPath = audioManagerService.getBlockAudioPath(
      nextBlock.id,
      nextBlock.type,
    );
    const operationKey = `${radio.id}:${nextBlock.id}`;

    // Check if this block's audio is already complete or being downloaded
    if (isFileComplete(nextAudioPath) || ongoingOperations.has(operationKey)) {
      console.log(
        `[Radio ${radio.id}] Block (${nextBlockIndex}) already downloaded or download in progress, skipping preload`,
      );
      continue;
    }

    console.log(
      `[Radio ${radio.id}] Preloading block (${nextBlockIndex}, ${nextBlock.type}) in background`,
    );

    // Create and track the preload operation
    const preloadOperation = audioManagerService
      .downloadOrGenerateBlockAudio({
        radio: radio,
        blockIndex: nextBlockIndex,
      })
      .then(() => {
        return;
      })
      .catch((err) => {
        console.error(
          `[Radio ${radio.id}] Error preloading block audio for index ${nextBlockIndex}: ${err.message}`,
        );
      })
      .finally(() => {
        // Clean up the operation reference when done
        ongoingOperations.delete(operationKey);
      });

    // Store the operation but don't await it - let it happen in the background
    ongoingOperations.set(operationKey, preloadOperation);
  }
}

/**
 * Checks if file exists and is fully downloaded (non-zero size)
 */
function isFileComplete(filePath: string): boolean {
  if (!fs.existsSync(filePath)) return false;

  try {
    const stats = fs.statSync(filePath);
    return stats.size > 0;
  } catch (err) {
    console.error(`Error checking file status: ${err}`);
    return false;
  }
}

/**
 * Ensures the audio for the current block exists, downloading it if needed
 * Returns a boolean indicating if the audio is already complete
 */
function ensureBlockAudioExists(
  radioId: string,
  radio: any,
  blockIndex: number,
): boolean {
  const currentBlock = radio.blocks[blockIndex];
  const blockId = currentBlock.id;
  const audioFilePath = audioManagerService.getBlockAudioPath(blockId, currentBlock.type);
  const operationKey = `${radioId}:${blockId}`;

  // Check if this block's audio is already complete
  const isAudioComplete = isFileComplete(audioFilePath);
  console.log(
    `[Radio ${radioId}] Audio file ${isAudioComplete ? "exists and is complete" : "does not exist or is incomplete"} at: ${audioFilePath}`,
  );

  // If audio is complete, we're done
  if (isAudioComplete) return true;

  // Special handling for song blocks - don't attempt to download them
  if (currentBlock.type === "song") {
    console.log(
      `[Radio ${radioId}] Song block ${blockIndex} needs to be uploaded manually - broadcasting status`
    );
    
    // Send a status to indicate the song needs to be uploaded
    const songMissingState = createRadioState(radio, blockIndex, {
      status: "downloading", // Using "downloading" status to indicate it's missing
      progress: 0, // 0 progress to show it needs to be uploaded
    });
    
    // Broadcast the status
    websocketService.broadcastUpdate(radioId, songMissingState);
    
    // Return false to indicate audio is not ready
    return false;
  }

  // Check if there's already an ongoing operation for this block
  const existingOperation = ongoingOperations.get(operationKey);
  if (existingOperation) {
    console.log(
      `[Radio ${radioId}] Download/generation already in progress for block ${blockIndex}, not starting a new one`,
    );
    return false;
  }

  // First send a loading state to the client
  const loadingState = createRadioState(radio, blockIndex, {
    status: currentBlock.type === "voiceover" ? "generating" : "downloading",
    progress: 0,
  });

  // Broadcast the loading state
  websocketService.broadcastUpdate(radioId, loadingState);
  console.log(`[Radio ${radioId}] Broadcasted loading state for block ${blockIndex}`);

  // Create a new download/generation operation that will broadcast when complete
  const downloadOperation = (async () => {
    try {
      console.log(
        `[Radio ${radioId}] Starting download/generation for block ${blockIndex} (${currentBlock.type})`,
      );

      await audioManagerService.downloadOrGenerateBlockAudio({
        radio: radio,
        blockIndex: blockIndex,
      });

      console.log(
        `[Radio ${radioId}] Successfully downloaded/generated audio for block ${blockIndex}`,
      );

      // Check if this block is still the current one after download completes
      if (currentBlockIndices[radioId] === blockIndex) {
        // Create the final radio state and broadcast it
        console.log(
          `[Radio ${radioId}] Creating final ready state for block ${blockIndex}`,
        );
        const readyState = createRadioState(radio, blockIndex, {
          status: "ready",
        });
        websocketService.broadcastUpdate(radioId, readyState);
        console.log(
          `[Radio ${radioId}] Successfully broadcasted ready state for block ${blockIndex}`,
        );

        // Start preloading the next blocks
        preloadNextBlocks(radio, blockIndex);
      } else {
        console.log(
          `[Radio ${radioId}] Block index changed during download from ${blockIndex} to ${currentBlockIndices[radioId]}, not broadcasting ready state`,
        );
      }
    } catch (error) {
      console.error(
        `[Radio ${radioId}] Error during download/generation for block ${blockIndex}:`,
        error,
      );

      // Broadcast error state if this is still the current block
      if (currentBlockIndices[radioId] === blockIndex) {
        console.error(
          `[Radio ${radioId}] Broadcasting error state for block ${blockIndex}`,
        );
        const errorState = createRadioState(radio, blockIndex, {
          status: "ready", // Use a valid status type
          progress: -1, // Use negative progress as an indicator of error
        });
        // Add extra logging for the error
        console.error(
          `[Radio ${radioId}] Media preparation failed: ${
            error instanceof Error ? error.message : "Unknown error"
          }`,
        );
        websocketService.broadcastUpdate(radioId, errorState);
      }
    } finally {
      // Clean up the operation reference when done
      ongoingOperations.delete(operationKey);
    }
  })();

  // Store the operation
  ongoingOperations.set(operationKey, downloadOperation);

  // Return false to indicate audio is not yet ready
  return false;
}

/**
 * Updates the current playing block and broadcasts the update to connected clients
 * This function is non-blocking - it will immediately return after starting any
 * necessary downloads and broadcasting the appropriate state.
 *
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

    // Check if audio for this block exists - this function is now non-blocking
    const isAudioReady = ensureBlockAudioExists(radioId, radio, blockIndex);

    // If audio is already ready, broadcast the ready state immediately
    if (isAudioReady) {
      // Preload the next blocks' audio in the background
      preloadNextBlocks(radio, blockIndex);

      // Create the final radio state
      console.log(
        `[Radio ${radioId}] Creating final ready state for block ${blockIndex}`,
      );
      const state = createRadioState(radio, blockIndex, { status: "ready" });

      // Broadcast the update to all connected clients
      websocketService.broadcastUpdate(radioId, state);
      console.log(
        `[Radio ${radioId}] Successfully broadcasted ready state for block ${blockIndex}`,
      );
    }
    // If audio is not ready, ensureBlockAudioExists has already started the download
    // and broadcast a "downloading" state. It will broadcast "ready" when done.

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
 * This function immediately returns after initiating the skip
 * @param radioId The ID of the radio
 */
async function skipNext(radioId: string): Promise<void> {
  try {
    console.log(`[Radio ${radioId}] Initiating skip to next block`);
    // Get the current block index
    const currentIndex = currentBlockIndices[radioId] ?? 0;
    const radio = await radioCoreService.getRadioOrThrow(radioId);

    // Check if we can go to the next block
    if (currentIndex < radio.blocks.length - 1) {
      // We use void to explicitly indicate we're not waiting for the result
      void setBlockAndBroadcast(radioId, currentIndex + 1);
      console.log(
        `[Radio ${radioId}] Skip to next block initiated (${currentIndex + 1})`,
      );
    } else {
      console.log(`[Radio ${radioId}] Already at last block, can't skip next`);
    }

    // Return immediately - the actual transition happens asynchronously
    return;
  } catch (error) {
    console.error(`Error initiating skip to next block:`, error);
    throw error;
  }
}

/**
 * Skip to the previous block in the radio
 * This function immediately returns after initiating the skip
 * @param radioId The ID of the radio
 */
async function skipPrevious(radioId: string): Promise<void> {
  try {
    console.log(`[Radio ${radioId}] Initiating skip to previous block`);
    // Get the current block index
    const currentIndex = currentBlockIndices[radioId] ?? 0;

    // Check if we can go to the previous block
    if (currentIndex > 0) {
      // We use void to explicitly indicate we're not waiting for the result
      void setBlockAndBroadcast(radioId, currentIndex - 1);
      console.log(
        `[Radio ${radioId}] Skip to previous block initiated (${currentIndex - 1})`,
      );
    } else {
      console.log(`[Radio ${radioId}] Already at first block, can't skip previous`);
    }

    // Return immediately - the actual transition happens asynchronously
    return;
  } catch (error) {
    console.error(`Error initiating skip to previous block:`, error);
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
 * This function immediately returns after initiating state broadcast
 * @param radioId The ID of the radio
 */
async function sendCurrentState(radioId: string): Promise<void> {
  try {
    console.log(`[Radio ${radioId}] Sending current state to clients`);
    // Get the current block index or default to 0
    const currentIndex = currentBlockIndices[radioId] ?? 0;

    // Update the current block (this will broadcast the state)
    // We use void to explicitly indicate we're not waiting for the result
    void setBlockAndBroadcast(radioId, currentIndex);

    console.log(`[Radio ${radioId}] Current state broadcast initiated`);
    // Return immediately - the actual broadcast happens asynchronously
    return;
  } catch (error) {
    console.error(`Error initiating current state broadcast:`, error);
    throw error;
  }
}

export default {
  skipNext,
  skipPrevious,
  sendCurrentState,
};
