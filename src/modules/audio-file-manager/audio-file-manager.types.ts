import { Block } from "../radio/radio.types";

export type DownloadOrGenerateBlockAudio = {
  allBlocks: Block[];
  blockIndex: number;
};
