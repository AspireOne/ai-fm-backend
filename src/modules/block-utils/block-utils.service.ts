import { Block } from "../radio/radio.types";

function getPreviousSongBlock(blocks: Block[], currIndex: number): Block | null {
  if (currIndex === 0) return null;

  return blocks.slice(0, currIndex).findLast((b) => b.type === "song") || null;
}

function getNextSongBlock(blocks: Block[], currIndex: number): Block | null {
  if (currIndex === blocks.length - 1) return null;

  return blocks.slice(currIndex + 1).find((b) => b.type === "song") || null;
}

/**
 * Returns an array of the next X song blocks after the current index
 * @param blocks The array of blocks to search in
 * @param currIndex The current position in the blocks array
 * @param count The number of song blocks to return
 * @returns Array of the next X song blocks, or an empty array if none found
 */
function getNextXSongBlocks(
  blocks: Block[],
  currIndex: number,
  count: number,
): Block[] {
  if (currIndex >= blocks.length - 1 || count <= 0) return [];

  const result: Block[] = [];
  const remainingBlocks = blocks.slice(currIndex + 1);

  for (const block of remainingBlocks) {
    if (block.type === "song") {
      result.push(block);
      if (result.length >= count) break;
    }
  }

  return result;
}

export default {
  getNextXSongBlocks,
  getPreviousSongBlock,
  getNextSongBlock,
};
