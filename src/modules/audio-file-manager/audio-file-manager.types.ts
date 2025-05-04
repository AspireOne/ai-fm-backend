import { Block, ParsedRadio } from "../radio/radio.types";

export type DownloadOrGenerateBlockAudio = {
  radio: ParsedRadio;
  blockIndex: number;
};
